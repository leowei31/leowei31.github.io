import { useEffect, useMemo, useRef, useState } from "react";
import { useCursor } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import { HAIR_GRADIENT, SKIN_GRADIENT } from "./cel";
import {
  BODY,
  HEAD,
  HEAD_SCALE,
  applyPlanarUVs,
  buildHairGeometries,
  buildHeadGeometry,
  buildStrandGeometry,
  buildTorsoGeometry,
} from "./avatarGeometry";
import {
  BLAZER,
  FACE_RECT,
  FACE_SIZE,
  OUTFIT_RECT,
  OUTFIT_SIZE,
  SHIRT,
  SKIN,
  drawFace,
  drawOutfit,
  makeCanvasTexture,
} from "./avatarTextures";

const HAIR = "#2a2421";
const PANTS = "#34363f";
const ACCENT = "#ff6b3d";
const EAR_SHADE = "#d99a74";
const NECK = "#dfa985"; // skin in the shadow under the chin

// One stray strand (ahoge) standing up from the crown
const STRAND = [
  [0.01, 0.4, 0.0],
  [0.025, 0.49, 0.02],
  [0.005, 0.55, 0.045],
  [-0.03, 0.57, 0.045],
];

const skin = <meshToonMaterial color={SKIN} gradientMap={SKIN_GRADIENT} />;

// Turning to face the viewer: how fast (exponential damping rate) and how far from straight ahead
const TURN_SPEED = 3.5;
const MAX_TURN = 1.2;

/** Short, thick blazer sleeve with an elbow, a shirt cuff peeking out and a mitten hand. */
const Arm = ({ side, upperRef, foreRef }) => (
  <group ref={upperRef} position={[side * BODY.shoulderX, BODY.shoulderY, 0]}>
    <mesh position={[0, -0.065, 0]} castShadow>
      <capsuleGeometry args={[0.05, 0.08, 10, 24]} />
      <meshStandardMaterial color={BLAZER} />
    </mesh>
    <group ref={foreRef} position={[0, -0.15, 0]}>
      <mesh position={[0, -0.055, 0]} castShadow>
        <capsuleGeometry args={[0.046, 0.06, 10, 24]} />
        <meshStandardMaterial color={BLAZER} />
      </mesh>
      <mesh position={[0, -0.14, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.026, 24]} />
        <meshStandardMaterial color={SHIRT} />
      </mesh>
      <group position={[0, -0.185, 0]}>
        <mesh scale={[0.88, 1, 0.72]} castShadow>
          <sphereGeometry args={[0.05, 28, 20]} />
          {skin}
        </mesh>
        <mesh position={[-side * 0.034, 0.012, 0.02]} scale={[0.7, 1, 0.7]}>
          <sphereGeometry args={[0.022, 16, 12]} />
          {skin}
        </mesh>
      </group>
    </group>
  </group>
);

/**
 * An anime-chibi version of me, about 2.4 heads tall: an oval head with an illustrated face (big
 * eyes, thick brows and my grin) and short black hair in soft clumps, on a small pear-shaped body
 * in a charcoal blazer over a teal shirt, dark trousers and sneakers.
 * Waves at visitors, blinks, breathes - and hops if you click it.
 *
 * With `faceCamera`, he keeps turning (smoothly, yaw only) to face the viewer as the camera moves,
 * so his face is always seen front-on rather than in profile.
 */
const Avatar = ({
  position = [1.6, 0, 0.4],
  rotation = [0, -0.5, 0],
  scale = 1,
  lowDetail = false,
  faceCamera = false,
}) => {
  const turn = useRef();
  const turnReady = useRef(false);
  const root = useRef();
  const body = useRef();
  const head = useRef();
  const upperR = useRef();
  const foreR = useRef();
  const upperL = useRef();
  const foreL = useRef();
  const faceMaterial = useRef();
  const hop = useRef(0);
  const [hovered, setHovered] = useState(false);
  const gl = useThree((state) => state.gl);
  const camera = useThree((state) => state.camera);
  const viewer = useMemo(() => new Vector3(), []);
  useCursor(hovered);

  const geometry = useMemo(
    () => ({
      head: applyPlanarUVs(buildHeadGeometry(), FACE_RECT),
      torso: applyPlanarUVs(buildTorsoGeometry(), OUTFIT_RECT),
      hair: buildHairGeometries(lowDetail ? { columns: 200, rows: 32 } : { columns: 300, rows: 40 }),
      strand: buildStrandGeometry(STRAND, { radius: 0.014 }),
    }),
    [lowDetail]
  );
  const textures = useMemo(
    () => ({
      face: makeCanvasTexture(FACE_SIZE, (ctx, w, h) => drawFace(ctx, w, h, false)),
      blink: makeCanvasTexture(FACE_SIZE, (ctx, w, h) => drawFace(ctx, w, h, true)),
      outfit: makeCanvasTexture(OUTFIT_SIZE, drawOutfit),
    }),
    []
  );
  useEffect(() => () => Object.values(geometry).flat().forEach((g) => g.dispose()), [geometry]);
  useEffect(() => () => Object.values(textures).forEach((t) => t.dispose()), [textures]);
  // Upload the closed-eye drawing up front so the first blink doesn't hitch
  useEffect(() => gl.initTexture(textures.blink), [gl, textures]);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;

    // Face the viewer: yaw toward the camera, measured in the parent's space. Snap on the first
    // frame, then ease along the shortest way round.
    if (faceCamera && turn.current?.parent) {
      turn.current.parent.worldToLocal(viewer.copy(camera.position));
      const { x, z } = turn.current.position;
      const target = MathUtils.clamp(Math.atan2(viewer.x - x, viewer.z - z), -MAX_TURN, MAX_TURN);
      const current = turn.current.rotation.y;
      const step = Math.atan2(Math.sin(target - current), Math.cos(target - current));
      turn.current.rotation.y = turnReady.current ? current + step * (1 - Math.exp(-TURN_SPEED * delta)) : target;
      turnReady.current = true;
    }

    // click hop (decays)
    hop.current = Math.max(0, hop.current - delta * 2.2);
    if (root.current) root.current.position.y = Math.sin(hop.current * Math.PI) * 0.3;

    if (body.current) {
      const breathe = Math.sin(t * 1.7);
      body.current.scale.set(1 + breathe * 0.008, 1 + breathe * 0.012, 1 + breathe * 0.008);
    }
    if (head.current) {
      head.current.rotation.y = Math.sin(t * 0.55) * 0.04;
      head.current.rotation.z = Math.sin(t * 0.8) * 0.04 + 0.03;
      head.current.rotation.x = Math.sin(t * 0.7) * 0.025;
    }
    // waving arm: elbow out, forearm up, hand swinging
    if (upperR.current) upperR.current.rotation.z = 1.15 + Math.sin(t * 1.7) * 0.04;
    if (foreR.current) foreR.current.rotation.z = 1.62 + Math.sin(t * (hop.current > 0 ? 6 : 3.4)) * 0.3;
    // relaxed arm with a slight bend at the elbow
    if (upperL.current) upperL.current.rotation.z = -0.1 + Math.sin(t * 0.9) * 0.03;
    if (foreL.current) foreL.current.rotation.x = -0.28 + Math.sin(t * 0.9) * 0.04;

    // quick blink every ~3.6s: swap to the closed-eye drawing
    if (faceMaterial.current) {
      const map = (t % 3.6) / 3.6 > 0.965 ? textures.blink : textures.face;
      if (faceMaterial.current.map !== map) faceMaterial.current.map = map;
    }
  });

  return (
    <group ref={turn} position={position} rotation={faceCamera ? undefined : rotation} scale={scale}>
      <group
        ref={root}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          hop.current = 1;
        }}
      >
        <group ref={body}>
          {/* sneakers: white uppers on an orange sole */}
          {[-1, 1].map((s) => (
            <group key={s} position={[s * BODY.legX, 0, 0.03]}>
              <mesh position={[0, 0.058, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.82]} castShadow>
                <capsuleGeometry args={[0.06, 0.08, 10, 24]} />
                <meshStandardMaterial color="#f5f2ec" />
              </mesh>
              <mesh position={[0, 0.018, 0.004]} rotation={[Math.PI / 2, 0, 0]} scale={[1.06, 1.03, 0.32]}>
                <capsuleGeometry args={[0.062, 0.08, 8, 24]} />
                <meshStandardMaterial color={ACCENT} />
              </mesh>
            </group>
          ))}

          {/* trouser legs, tapering to the ankle */}
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * BODY.legX, (BODY.hip + 0.06) / 2, 0]} castShadow>
              <cylinderGeometry args={[0.08, 0.068, BODY.hip - 0.06, 32]} />
              <meshStandardMaterial color={PANTS} />
            </mesh>
          ))}

          {/* blazer, with the open-collar shirt and lapels painted on */}
          <mesh geometry={geometry.torso} castShadow>
            <meshStandardMaterial map={textures.outfit} />
          </mesh>

          {/* short neck, in the chin's shadow */}
          <mesh position={[0, BODY.neck + 0.01, 0.004]}>
            <cylinderGeometry args={[0.034, 0.038, 0.09, 28]} />
            <meshToonMaterial color={NECK} gradientMap={SKIN_GRADIENT} />
          </mesh>

          <Arm side={-1} upperRef={upperL} foreRef={foreL} />
          <Arm side={1} upperRef={upperR} foreRef={foreR} />

          {/* head */}
          <group ref={head} position={[0, BODY.chin + HEAD.ryBottom * HEAD_SCALE, 0.012]} scale={HEAD_SCALE}>
            {/* the face is painted onto the head itself */}
            <mesh geometry={geometry.head} castShadow>
              <meshToonMaterial ref={faceMaterial} map={textures.face} gradientMap={SKIN_GRADIENT} />
            </mesh>

            {/* ears at eye height, sticking out a little */}
            {[-1, 1].map((s) => (
              <group key={s} position={[s * 0.306, -0.095, -0.02]} rotation={[0, s * -0.45, s * -0.06]}>
                <mesh scale={[0.5, 1.2, 0.85]} castShadow>
                  <sphereGeometry args={[0.066, 28, 20]} />
                  {skin}
                </mesh>
                <mesh position={[s * 0.016, -0.004, 0.02]} scale={[0.35, 0.8, 0.5]}>
                  <sphereGeometry args={[0.044, 20, 14]} />
                  <meshToonMaterial color={EAR_SHADE} gradientMap={SKIN_GRADIENT} />
                </mesh>
              </group>
            ))}

            {geometry.hair.map((layer) => (
              <mesh key={layer.uuid} geometry={layer} castShadow>
                <meshToonMaterial color={HAIR} gradientMap={HAIR_GRADIENT} />
              </mesh>
            ))}
            <mesh geometry={geometry.strand} castShadow>
              <meshToonMaterial color={HAIR} gradientMap={HAIR_GRADIENT} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};

export default Avatar;
