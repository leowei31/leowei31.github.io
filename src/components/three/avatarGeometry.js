import {
  BufferGeometry,
  CatmullRomCurve3,
  Float32BufferAttribute,
  MathUtils,
  SphereGeometry,
  Vector3,
} from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/*
 * Procedural, high-resolution geometry for the avatar (the room itself stays low poly).
 *
 * The character follows "balanced" anime-chibi proportions, about 2.4 heads tall: a big head with
 * an oval face, a soft pear-shaped torso with sloping shoulders, legs about as long as the torso,
 * thick simple limbs and hands that reach the top of the thighs. Hair is a few thick clumps with
 * softly rounded tips that add volume without overwhelming the face.
 *
 * Head shapes are in head space: origin at the centre of the skull, +z = facing direction,
 * +x = the avatar's left (the viewer's right). The body is in avatar space with the feet at y = 0.
 */

const smoothstep = (a, b, x) => {
  const t = MathUtils.clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

/* ------------------------------------------------------------------ head */

// An oval face: a rounded cranium over a longer lower face whose cheeks curve gently in to a soft,
// slightly pointed chin
export const HEAD = { rx: 0.318, ryTop: 0.37, ryBottom: 0.41, rz: 0.345 };
export const HEAD_SCALE = 0.82;

/** Vertical shape: the lower face can be a little shorter/longer than the cranium, smoothly. */
const stretchY = (dy) => dy * (dy >= 0 ? HEAD.ryTop : HEAD.ryTop + (HEAD.ryBottom - HEAD.ryTop) * dy * dy);

// Horizontal half-width of the head at height v (unit sphere): round on top; below the eyes an
// ellipse with slightly full cheeks, narrowing at the very bottom into a soft, rounded chin.
const widthAt = (v, squareness, jaw) =>
  v >= 0
    ? Math.sqrt(Math.max(0, 1 - v * v))
    : Math.pow(1 - Math.pow(-v, squareness), 1 / squareness) * (1 - jaw * Math.pow(-v, 6));
const widthX = (v) => widthAt(v, 2.1, 0.25);
const widthZ = (v) => widthAt(v, 2, 0.1);

/** Point on the head surface in the direction of the unit vector (dx, dy, dz). */
const headPoint = (dx, dy, dz) => {
  const h = Math.sqrt(Math.max(1e-9, 1 - dy * dy));
  return [(dx * HEAD.rx * widthX(dy)) / h, stretchY(dy), (dz * HEAD.rz * widthZ(dy)) / h];
};

export const buildHeadGeometry = () => {
  const sphere = new SphereGeometry(1, 160, 120);
  const pos = sphere.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const [x, y, z] = headPoint(pos.getX(i), pos.getY(i), pos.getZ(i));
    pos.setXYZ(i, x, y, z);
  }
  // Weld the UV seam and poles so normals are smooth all the way round (no shading seam)
  sphere.deleteAttribute("uv");
  sphere.deleteAttribute("normal");
  const geometry = mergeVertices(sphere, 1e-5);
  sphere.dispose();
  geometry.computeVertexNormals();
  return geometry;
};

/* ------------------------------------------------------------------ body */

export const BODY = {
  hip: 0.5, // top of the legs (hidden inside the blazer)
  hem: 0.46, // bottom of the blazer
  legX: 0.078,
  shoulderX: 0.162,
  shoulderY: 0.83,
  neck: 0.935, // where the blazer closes around the neck
  chin: 0.95,
};

// Blazer silhouette as (height, half-width): a soft pear shape - fullest near the hem, gently
// narrowing up to small, sloping shoulders, closing in at the collar
const TORSO_PROFILE = [
  [0.46, 0.168],
  [0.49, 0.178],
  [0.55, 0.177],
  [0.63, 0.166],
  [0.71, 0.158],
  [0.78, 0.158],
  [0.835, 0.15],
  [0.885, 0.13],
  [0.92, 0.082],
  [0.935, 0.042],
];
const TORSO_DEPTH = 0.8; // front-to-back size relative to the width
const TORSO_N = 2.3; // superellipse exponent: squares the cross-section off a little, like a jacket

/** Half-width of the torso at height y (Catmull-Rom through the profile). */
const torsoRadius = (y) => {
  const p = TORSO_PROFILE;
  if (y <= p[0][0]) return p[0][1];
  if (y >= p[p.length - 1][0]) return p[p.length - 1][1];
  let i = 0;
  while (y > p[i + 1][0]) i++;
  const r0 = p[Math.max(0, i - 1)][1];
  const r1 = p[i][1];
  const r2 = p[i + 1][1];
  const r3 = p[Math.min(p.length - 1, i + 2)][1];
  const t = (y - p[i][0]) / (p[i + 1][0] - p[i][0]);
  const t2 = t * t;
  return 0.5 * (2 * r1 + (r2 - r0) * t + (2 * r0 - 5 * r1 + 4 * r2 - r3) * t2 + (3 * r1 - r0 - 3 * r2 + r3) * t2 * t);
};

const superellipse = (a) => Math.sign(a) * Math.pow(Math.abs(a), 2 / TORSO_N);

/** The blazer: rings of superellipse cross-sections through the profile, capped at both ends. */
export const buildTorsoGeometry = ({ rings = 60, segments = 72 } = {}) => {
  const y0 = TORSO_PROFILE[0][0];
  const y1 = TORSO_PROFILE[TORSO_PROFILE.length - 1][0];
  const positions = [];
  const indices = [];

  const pushRing = (y) => {
    const start = positions.length / 3;
    const r = torsoRadius(y);
    for (let j = 0; j < segments; j++) {
      const a = (j / segments) * Math.PI * 2; // 0 = front
      positions.push(r * superellipse(Math.sin(a)), y, r * TORSO_DEPTH * superellipse(Math.cos(a)));
    }
    return start;
  };

  const starts = [];
  for (let i = 0; i <= rings; i++) starts.push(pushRing(y0 + ((y1 - y0) * i) / rings));
  for (let i = 0; i < rings; i++) {
    for (let j = 0; j < segments; j++) {
      const j2 = (j + 1) % segments;
      const a = starts[i] + j;
      const b = starts[i] + j2;
      const c = starts[i + 1] + j;
      const d = starts[i + 1] + j2;
      indices.push(a, b, c, b, d, c);
    }
  }

  // Caps get their own vertices so the hem keeps a crisp edge
  const cap = (y, up) => {
    const start = pushRing(y);
    const centre = positions.length / 3;
    positions.push(0, y, 0);
    for (let j = 0; j < segments; j++) {
      const j2 = (j + 1) % segments;
      if (up) indices.push(centre, start + j, start + j2);
      else indices.push(centre, start + j2, start + j);
    }
  };
  cap(y0, false);
  cap(y1, true);

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
};

/* ------------------------------------------------------------------ texturing */

/**
 * Projects `rect` (x/y ranges in the mesh's own space) straight onto the front of a mesh as UVs,
 * so artwork drawn for that rectangle is painted onto the surface itself - no separate decal layer
 * that could fight hair or arms for depth at steep viewing angles.
 * Back-facing vertices are sent below the artwork, where the texture's clamped edge (plain skin or
 * cloth) shows, so nothing is mirrored onto the back.
 */
export const applyPlanarUVs = (geometry, rect) => {
  const pos = geometry.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  const [x0, x1] = rect.x;
  const [y0, y1] = rect.y;
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = (pos.getX(i) - x0) / (x1 - x0);
    uv[i * 2 + 1] = pos.getZ(i) >= -1e-4 ? (pos.getY(i) - y0) / (y1 - y0) : -2;
  }
  geometry.setAttribute("uv", new Float32BufferAttribute(uv, 2));
  return geometry;
};

/* ------------------------------------------------------------------ hair */

const DEG = Math.PI / 180;
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));

// Locks along the edge of each hair layer, in degrees of azimuth (0 = front, + = the avatar's
// left). `w`: half-width, `len`: how far past the layer's edge it reaches, `flick`: how far its
// tip lifts off what's underneath.
//
// Lower layer: a fringe of chunky clumps fanning from the crown (the brows show beneath them), side
// locks falling in front of the ears to frame the face, small flicks over the ears and at the nape.
const LOWER_LOCKS = [
  { at: -50, w: 13, len: 20 },
  { at: -27, w: 13, len: 26 },
  { at: -3, w: 14, len: 30 },
  { at: 22, w: 13, len: 25 },
  { at: 46, w: 13, len: 21 },
  { at: -70, w: 10, len: 27 },
  { at: 70, w: 10, len: 27 },
  { at: -96, w: 11, len: 3, flick: 0.05 },
  { at: 96, w: 11, len: 3, flick: 0.05 },
  { at: -122, w: 13, len: 10, flick: 0.08 },
  { at: 122, w: 13, len: 10, flick: 0.08 },
  { at: -150, w: 14, len: 13, flick: 0.06 },
  { at: 150, w: 14, len: 13, flick: 0.06 },
  { at: 180, w: 14, len: 14, flick: 0.05 },
];

// Upper layer: a few big clumps lying over the lower one, flicking out a little at the sides and
// back for a tousled outline
const UPPER_LOCKS = [
  { at: -35, w: 17, len: 14, flick: 0.03 },
  { at: 0, w: 17, len: 16, flick: 0.03 },
  { at: 35, w: 17, len: 14, flick: 0.03 },
  { at: -72, w: 16, len: 15, flick: 0.07 },
  { at: 72, w: 16, len: 15, flick: 0.07 },
  { at: -110, w: 17, len: 15, flick: 0.09 },
  { at: 110, w: 17, len: 15, flick: 0.09 },
  { at: -148, w: 18, len: 14, flick: 0.07 },
  { at: 148, w: 18, len: 14, flick: 0.07 },
  { at: 180, w: 16, len: 13, flick: 0.06 },
];

// The parting sits a little to the avatar's right, as in the portrait
const PART = -10 * DEG;

/**
 * Polar angle (from the crown) of the bare hairline: 52° on the forehead, 87° above the ears and
 * 135° at the back, so the hair covers the back of the head down to the nape.
 */
const hairline = (phi) => (90.25 - 41.5 * Math.cos(phi) + 3.25 * Math.cos(2 * phi)) * DEG;

const lockAt = (locks, phi) => {
  let len = 0;
  let flick = 0;
  let ridge = 0;
  for (const lock of locks) {
    const u = Math.abs(wrap(phi - lock.at * DEG)) / (lock.w * DEG);
    if (u >= 1) continue;
    len = Math.max(len, lock.len * Math.pow(1 - Math.pow(u, 1.8), 0.6)); // clump with a rounded tip
    flick = Math.max(flick, (lock.flick ?? 0) * Math.pow(1 - u, 0.6));
    ridge = Math.max(ridge, Math.cos((u * Math.PI) / 2) ** 2);
  }
  return { len: len * DEG, flick, ridge };
};

// Fringe locks fan away from the parting; nothing sweeps at the sides or back
const sweepAt = (phi) => 0.28 * Math.sin(wrap(phi - PART)) * Math.pow(Math.max(0, Math.cos(phi)), 1.5);

// How far the hair stands off the scalp, as a fraction of head radius
const CROWN = 0.11;
const TIP = 0.014;
const volumeAt = (phi) => 0.06 + 0.05 * (0.5 - 0.5 * Math.cos(phi)) + 0.08 * Math.sin(phi) ** 2;

const lowerBody = (s, f) =>
  (1 - Math.pow(s, 3)) *
  (CROWN + (f.volume - CROWN) * smoothstep(0, 0.5, s)) *
  (1 + 0.3 * f.lock.ridge * Math.sin(Math.PI * s));

// Bottom to top: each layer ends higher up and sits on the one below it
const LAYERS = [
  { locks: LOWER_LOCKS, edge: 1 },
  { locks: UPPER_LOCKS, edge: 0.55, extra: 0.05, tip: 0.016, exp: 2.5 },
];

/**
 * One layer of hair as a closed, smooth solid: an outer surface ending in pointed locks, joined at
 * the tips to an inner surface tucked inside what's underneath. Sculpted masses shade cleanly with
 * cel lighting and get crisp ink outlines along every lock.
 */
const buildShell = (fields, rows, outerK) => {
  const columns = fields.length;
  const positions = [];
  const indices = [];
  const ringStart = (pass, row) => pass * (1 + rows * columns) + 1 + (row - 1) * columns;

  for (let pass = 0; pass < 2; pass++) {
    const outer = pass === 0;
    // single pole vertex at the crown, so the top shades smoothly
    positions.push(0, HEAD.ryTop * (outer ? outerK(0, fields[0], 0) : 0.955), 0);

    for (let row = 1; row <= rows; row++) {
      const s = row / rows; // crown -> tips
      for (const f of fields) {
        const edge = f.edge + f.lock.len;
        const theta = s * edge;
        const az = f.phi + f.sweep * s * s;
        const [x, y, z] = headPoint(
          Math.sin(theta) * Math.sin(az),
          Math.cos(theta),
          Math.sin(theta) * Math.cos(az)
        );
        const k = outer
          ? outerK(s, f, theta) + f.lock.flick * smoothstep(0.65, 1, s)
          : MathUtils.lerp(0.955, outerK(1, f, edge) + f.lock.flick, smoothstep(0.82, 1, s));
        positions.push(x * k, y * k, z * k);
      }
    }

    // Same layout for both surfaces; the inner one is wound the other way so its normals face
    // inward (the outside of the hair solid there)
    const tri = outer ? (a, b, c) => indices.push(a, b, c) : (a, b, c) => indices.push(a, c, b);
    const pole = pass * (1 + rows * columns);
    for (let i = 0; i < columns; i++) {
      const i2 = (i + 1) % columns;
      tri(pole, ringStart(pass, 1) + i, ringStart(pass, 1) + i2);
    }
    for (let row = 1; row < rows; row++) {
      for (let i = 0; i < columns; i++) {
        const i2 = (i + 1) % columns;
        const a = ringStart(pass, row) + i;
        const b = ringStart(pass, row + 1) + i;
        const c = ringStart(pass, row) + i2;
        const d = ringStart(pass, row + 1) + i2;
        tri(a, b, c);
        tri(c, b, d);
      }
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
};

/**
 * Chibi hair in two overlapping tiers of clumps (fringe / side locks / nape at the bottom, a few big
 * clumps over the top), returned bottom layer first.
 */
export const buildHairGeometries = ({ columns = 360, rows = 48 } = {}) => {
  const columnData = Array.from({ length: columns }, (_, i) => {
    const phi = (i / columns) * Math.PI * 2;
    const sweep = sweepAt(phi);
    const volume = volumeAt(phi);
    return LAYERS.map((layer) => ({
      phi,
      sweep,
      volume,
      lock: lockAt(layer.locks, phi),
      edge: hairline(phi) * layer.edge,
    }));
  });

  // Radial factor of layer n's outer surface at polar angle theta (no flick), stacked on layer n-1
  const kOf = (n, theta, col) => {
    const f = col[n];
    const s = Math.min(1, theta / (f.edge + f.lock.len));
    if (n === 0) return 1 + TIP + lowerBody(s, f);
    const { extra, tip, exp } = LAYERS[n];
    return kOf(n - 1, theta, col) + (1 - Math.pow(s, exp)) * extra + tip;
  };

  return LAYERS.map((_, n) =>
    buildShell(
      columnData.map((col) => ({ ...col[n], col })),
      rows,
      (s, f, theta) => kOf(n, theta, f.col)
    )
  );
};

/** A tapered, slightly flattened tube along a curve (the stray strand on top of the head). */
export const buildStrandGeometry = (points, { radius = 0.02, segments = 40, radial = 12, flat = 0.65 } = {}) => {
  const curve = new CatmullRomCurve3(points.map((p) => new Vector3(...p)));
  const frames = curve.computeFrenetFrames(segments, false);
  const positions = [];
  const indices = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = curve.getPointAt(t);
    const r = radius * Math.pow(1 - t, 0.85);
    const n = frames.normals[i];
    const b = frames.binormals[i];
    for (let j = 0; j < radial; j++) {
      const a = (j / radial) * Math.PI * 2;
      const u = Math.cos(a) * r;
      const v = Math.sin(a) * r * flat;
      positions.push(p.x + n.x * u + b.x * v, p.y + n.y * u + b.y * v, p.z + n.z * u + b.z * v);
    }
  }
  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < radial; j++) {
      const a = i * radial + j;
      const b = i * radial + ((j + 1) % radial);
      const c = (i + 1) * radial + j;
      const d = (i + 1) * radial + ((j + 1) % radial);
      indices.push(a, b, c, b, d, c);
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
};
