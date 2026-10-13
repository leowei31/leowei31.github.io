import { useMemo, useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { useNight } from "./night";
import { ROOM } from "./layout";
import { useCanvasTexture } from "./useCanvasTexture";

const WALL = "#e6e0d4";
const WALL_SIDE = "#d9d2c4";
const FLOOR = "#c9a679";
const OAK = "#c99a68";

const rand = (i) => {
  const x = Math.sin(i * 78.233 + 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/** Oak planks with staggered joints, drawn once to a texture. */
const drawPlanks = (ctx, w, h) => {
  const rows = 14;
  const rowH = h / rows;
  for (let r = 0; r < rows; r++) {
    let x = -rand(r) * 260;
    while (x < w) {
      const len = 260 + rand(r * 31 + x) * 230;
      const shade = 0.9 + rand(r * 7 + len) * 0.18;
      ctx.fillStyle = `rgb(${201 * shade}, ${166 * shade}, ${121 * shade})`;
      ctx.fillRect(x, r * rowH, len, rowH);
      ctx.strokeStyle = "rgba(90,60,30,0.07)";
      ctx.lineWidth = 1;
      for (let g = 0; g < 3; g++) {
        const gy = r * rowH + rowH * (0.2 + g * 0.3);
        ctx.beginPath();
        ctx.moveTo(x, gy);
        ctx.lineTo(x + len, gy + (rand(g + x) - 0.5) * 3);
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(60,40,20,0.35)";
      ctx.fillRect(x, r * rowH, 2, rowH);
      x += len;
    }
    ctx.fillStyle = "rgba(60,40,20,0.35)";
    ctx.fillRect(0, r * rowH, w, 2);
  }
};

/** Woven-looking geometric rug. */
const drawRug = (ctx, w, h) => {
  ctx.fillStyle = "#2c3140";
  ctx.fillRect(0, 0, w, h);
  const inset = (n) => [n, n, w - n * 2, h - n * 2];
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#ff6b3d";
  ctx.strokeRect(...inset(34));
  ctx.strokeStyle = "#e9e3d6";
  ctx.lineWidth = 2;
  ctx.strokeRect(...inset(60));
  ctx.strokeStyle = "rgba(233,227,214,0.28)";
  for (let i = -h; i < w; i += 46) {
    ctx.beginPath();
    ctx.moveTo(i, h);
    ctx.lineTo(i + h, 0);
    ctx.moveTo(i, 0);
    ctx.lineTo(i + h, h);
    ctx.stroke();
  }
  ctx.fillStyle = "#2c3140";
  ctx.fillRect(...inset(120));
  ctx.strokeStyle = "#ff6b3d";
  ctx.lineWidth = 3;
  ctx.strokeRect(...inset(130));
  ctx.fillStyle = "#e9e3d6";
  for (let x = 6; x < w; x += 12) {
    ctx.fillRect(x, 0, 3, 10);
    ctx.fillRect(x, h - 10, 3, 10);
  }
};

/** Emissive accent strip that glows brighter at night. */
const LedStrip = ({ position, size, color = [3.2, 1.1, 0.4] }) => {
  const night = useNight();
  const mat = useRef();
  useFrame(() => {
    if (mat.current) mat.current.opacity = MathUtils.lerp(0.55, 1, night.current);
  });
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshBasicMaterial ref={mat} color={color} toneMapped={false} transparent />
    </mesh>
  );
};

/** Vertical oak slat panel behind the desk. */
const SlatPanel = () => {
  const slats = useMemo(() => Array.from({ length: 34 }, (_, i) => -1.8 + i * 0.1091), []);
  return (
    <group position={[0, 0, ROOM.backZ + 0.06]}>
      <mesh position={[0, 1.075, 0]}>
        <boxGeometry args={[3.9, 2.15, 0.02]} />
        <meshStandardMaterial color="#2a2118" roughness={1} />
      </mesh>
      {slats.map((x, i) => (
        <mesh key={x} position={[x, 1.075, 0.04]} castShadow>
          <boxGeometry args={[0.07, 2.15, 0.05]} />
          <meshStandardMaterial color={i % 3 === 0 ? "#bd8d5b" : OAK} roughness={0.55} />
        </mesh>
      ))}
    </group>
  );
};

const RoomShell = () => {
  const depth = ROOM.frontZ - ROOM.backZ;
  const midZ = (ROOM.frontZ + ROOM.backZ) / 2;
  const halfW = ROOM.width / 2;
  const planks = useCanvasTexture(1024, 640, drawPlanks);
  const rug = useCanvasTexture(1024, 640, drawRug);

  return (
    <group>
      {/* Floor slab + plank surface */}
      <RoundedBox
        args={[ROOM.width, 0.3, depth]}
        radius={0.04}
        smoothness={3}
        position={[0, -0.15, midZ]}
        receiveShadow
      >
        <meshStandardMaterial color={FLOOR} roughness={0.55} />
      </RoundedBox>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, midZ]} receiveShadow>
        <planeGeometry args={[ROOM.width - 0.02, depth - 0.02]} />
        <meshStandardMaterial map={planks.texture} roughness={0.5} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, ROOM.height / 2, ROOM.backZ - 0.1]} receiveShadow>
        <boxGeometry args={[ROOM.width, ROOM.height, 0.2]} />
        <meshStandardMaterial color={WALL} roughness={0.95} />
      </mesh>

      {/* Side walls (cut-away so the camera can see in) */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (halfW + 0.1), ROOM.height / 2, midZ - 0.1]} receiveShadow>
          <boxGeometry args={[0.2, ROOM.height, depth + 0.2]} />
          <meshStandardMaterial color={WALL_SIDE} roughness={0.95} />
        </mesh>
      ))}

      {/* Baseboards */}
      <mesh position={[0, 0.07, ROOM.backZ + 0.015]}>
        <boxGeometry args={[ROOM.width, 0.14, 0.03]} />
        <meshStandardMaterial color="#f4f0e8" roughness={0.6} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (halfW - 0.015), 0.07, midZ]}>
          <boxGeometry args={[0.03, 0.14, depth]} />
          <meshStandardMaterial color="#f4f0e8" roughness={0.6} />
        </mesh>
      ))}

      <SlatPanel />

      {/* Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, -0.7]} receiveShadow>
        <planeGeometry args={[4.2, 2.6]} />
        <meshStandardMaterial map={rug.texture} roughness={1} />
      </mesh>

      {/* Ambient accent lighting: cove strips + cool strips along the base */}
      <LedStrip position={[0, ROOM.height - 0.06, ROOM.backZ + 0.02]} size={[ROOM.width - 0.4, 0.04, 0.03]} />
      {[-1, 1].map((s) => (
        <LedStrip key={s} position={[s * (halfW - 0.02), ROOM.height - 0.06, midZ]} size={[0.03, 0.04, depth - 0.3]} />
      ))}
      <LedStrip position={[-3.2, 0.16, ROOM.backZ + 0.02]} size={[2.6, 0.02, 0.02]} color={[0.3, 1.6, 2.6]} />
      <LedStrip position={[3.2, 0.16, ROOM.backZ + 0.02]} size={[2.6, 0.02, 0.02]} color={[0.3, 1.6, 2.6]} />
    </group>
  );
};

export default RoomShell;
