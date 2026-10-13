import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { BackSide, Color, Mesh, ShaderMaterial, Vector2 } from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const FLAT_GEOMETRIES = new Set(["PlaneGeometry", "CircleGeometry", "RingGeometry", "ShapeGeometry"]);
const PER_PASS = 150;

// Ink lines are drawn as an inflated, back-face-only copy of each mesh ("inverted hull").
// Inflation happens in clip space, so lines keep a constant pixel width at any distance.
const vertexShader = /* glsl */ `
  uniform vec2 uPx;
  void main() {
    vec4 clip = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vec3 n = normalize(normalMatrix * normal);
    vec2 dir = n.xy;
    float len = length(dir);
    dir = len > 0.0001 ? dir / len : vec2(0.0);
    clip.xy += dir * uPx * clip.w;
    gl_Position = clip;
  }
`;
const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  void main() { gl_FragColor = vec4(uColor, 1.0); }
`;

// Hull geometry needs smooth, merged normals or box corners tear apart when inflated
const hullCache = new WeakMap();
const getHull = (geometry) => {
  let hull = hullCache.get(geometry);
  if (!hull) {
    const copy = geometry.clone();
    Object.keys(copy.attributes).forEach((name) => name !== "position" && copy.deleteAttribute(name));
    hull = mergeVertices(copy, 1e-4);
    hull.computeVertexNormals();
    hullCache.set(geometry, hull);
  }
  return hull;
};

/**
 * Adds ink outlines to every cel-shaded mesh in the scene, including meshes that mount later
 * (suspended textures, plant flower). Work is spread over frames, and `enabled` hides all lines
 * (used when the device can't keep up).
 */
const Outlines = ({ enabled = true, pixels = 1.6, color = "#140d0b" }) => {
  const scene = useThree((s) => s.scene);
  const size = useThree((s) => s.size);
  const hulls = useRef([]);
  const enabledRef = useRef(enabled);
  const frame = useRef(0);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: { uPx: { value: new Vector2() }, uColor: { value: new Color() } },
        vertexShader,
        fragmentShader,
        side: BackSide,
      }),
    []
  );

  useEffect(() => {
    material.uniforms.uColor.value.set(color);
  }, [color, material]);

  useEffect(() => {
    enabledRef.current = enabled;
    hulls.current.forEach((h) => (h.visible = enabled));
  }, [enabled]);

  useEffect(() => {
    const list = hulls.current;
    return () => {
      list.forEach((h) => h.parent?.remove(h));
      material.dispose();
    };
  }, [material]);

  useFrame(() => {
    material.uniforms.uPx.value.set((pixels * 2) / size.width, (pixels * 2) / size.height);

    frame.current++;
    // scan every frame while the scene builds, then a few times a second for late arrivals
    if (frame.current > 90 && frame.current % 20 !== 1) return;

    let added = 0;
    scene.traverse((obj) => {
      if (added >= PER_PASS) return;
      if (!obj.isMesh || obj.userData.isOutline || obj.userData.outlined) return;
      if (!obj.material?.isMeshToonMaterial) return;
      obj.userData.outlined = true;
      if (obj.userData.noOutline || FLAT_GEOMETRIES.has(obj.geometry.type)) return;

      const hull = new Mesh(getHull(obj.geometry), material);
      hull.userData.isOutline = true;
      hull.raycast = () => {}; // never steal clicks from the real mesh
      hull.visible = enabledRef.current;
      obj.add(hull);
      hulls.current.push(hull);
      added++;
    });
  });

  return null;
};

export default Outlines;
