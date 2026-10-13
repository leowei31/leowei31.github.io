import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import RoomObject from "./RoomObject";
import { useNight } from "./night";
import { useCanvasTexture } from "./useCanvasTexture";
import { ROOM } from "./layout";

const W = 3.2;
const H = 2.0;
const TEX_W = 1024;
const TEX_H = 640;

// Deterministic pseudo random so the skyline is identical every render
const rand = (i) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const buildings = Array.from({ length: 22 }, (_, i) => ({
  x: i * 50 - 20 + rand(i) * 18,
  w: 38 + rand(i + 40) * 42,
  h: 130 + rand(i + 80) * 250,
}));

const drawDay = (ctx, w, h) => {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#7ec3f5");
  g.addColorStop(0.7, "#cfe9fb");
  g.addColorStop(1, "#ffeccb");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  const sun = ctx.createRadialGradient(780, 170, 4, 780, 170, 160);
  sun.addColorStop(0, "rgba(255,248,220,1)");
  sun.addColorStop(0.25, "rgba(255,230,160,0.8)");
  sun.addColorStop(1, "rgba(255,230,160,0)");
  ctx.fillStyle = sun;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "rgba(255,255,255,0.85)";
  [[180, 150, 1], [420, 110, 0.7], [620, 230, 0.9]].forEach(([cx, cy, s]) => {
    [[0, 0, 46], [-44, 12, 32], [46, 14, 34], [10, 20, 40]].forEach(([dx, dy, r]) => {
      ctx.beginPath();
      ctx.arc(cx + dx * s, cy + dy * s, r * s, 0, Math.PI * 2);
      ctx.fill();
    });
  });

  buildings.forEach((b, i) => {
    ctx.fillStyle = i % 2 ? "#9db9d4" : "#86a6c6";
    ctx.fillRect(b.x, h - b.h, b.w, b.h);
  });
};

const drawNight = (ctx, w, h) => {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#050816");
  g.addColorStop(0.65, "#141f45");
  g.addColorStop(1, "#3a2d5c");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 140; i++) {
    ctx.fillStyle = `rgba(255,255,255,${0.3 + rand(i + 7) * 0.7})`;
    const r = rand(i + 99) * 1.4 + 0.3;
    ctx.fillRect(rand(i) * w, rand(i + 300) * h * 0.7, r, r);
  }

  const moon = ctx.createRadialGradient(780, 150, 6, 780, 150, 110);
  moon.addColorStop(0, "rgba(255,252,235,1)");
  moon.addColorStop(0.18, "rgba(255,252,235,1)");
  moon.addColorStop(0.2, "rgba(210,220,255,0.35)");
  moon.addColorStop(1, "rgba(210,220,255,0)");
  ctx.fillStyle = moon;
  ctx.fillRect(0, 0, w, h);

  buildings.forEach((b, i) => {
    ctx.fillStyle = i % 2 ? "#0c1228" : "#111a36";
    ctx.fillRect(b.x, h - b.h, b.w, b.h);
    for (let wy = h - b.h + 12; wy < h - 10; wy += 16) {
      for (let wx = b.x + 6; wx < b.x + b.w - 8; wx += 12) {
        if (rand(wx * 3.1 + wy * 1.7 + i) > 0.62) {
          ctx.fillStyle = rand(wx + wy) > 0.5 ? "#ffcf7a" : "#9fd8ff";
          ctx.fillRect(wx, wy, 5, 8);
        }
      }
    }
  });
};

const Mullion = ({ position, size }) => (
  <mesh position={position} castShadow>
    <boxGeometry args={size} />
    <meshStandardMaterial color="#17181c" roughness={0.45} metalness={0.4} />
  </mesh>
);

const WindowView = ({ isNight, onToggle }) => {
  const night = useNight();
  const dayMat = useRef();
  const nightMat = useRef();
  const day = useCanvasTexture(TEX_W, TEX_H, drawDay);
  const dark = useCanvasTexture(TEX_W, TEX_H, drawNight);

  useFrame(() => {
    if (nightMat.current) nightMat.current.opacity = MathUtils.clamp(night.current, 0, 1);
    if (dayMat.current) dayMat.current.opacity = 1;
  });

  const cy = 3.3;
  const z = ROOM.backZ + 0.03;

  return (
    <RoomObject
      onClick={onToggle}
      label={isNight ? "Switch to day" : "Switch to night"}
      baseY={0}
      hoverLift={0}
      labelOffset={[0, cy, z + 0.5]}
    >
      <group position={[0, cy, z]}>
        {/* Sky layers (day below, night cross-fades on top) */}
        <mesh>
          <planeGeometry args={[W, H]} />
          <meshBasicMaterial ref={dayMat} map={day.texture} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, 0.002]}>
          <planeGeometry args={[W, H]} />
          <meshBasicMaterial ref={nightMat} map={dark.texture} toneMapped={false} transparent opacity={0} />
        </mesh>

        {/* Steel frame + mullions */}
        <Mullion position={[0, H / 2 + 0.04, 0.03]} size={[W + 0.16, 0.08, 0.1]} />
        <Mullion position={[0, -H / 2 - 0.04, 0.03]} size={[W + 0.16, 0.08, 0.1]} />
        <Mullion position={[-W / 2 - 0.04, 0, 0.03]} size={[0.08, H + 0.16, 0.1]} />
        <Mullion position={[W / 2 + 0.04, 0, 0.03]} size={[0.08, H + 0.16, 0.1]} />
        <Mullion position={[0, 0, 0.03]} size={[0.04, H, 0.06]} />
        <Mullion position={[-W / 6, 0, 0.03]} size={[0.03, H, 0.05]} />
        <Mullion position={[W / 6, 0, 0.03]} size={[0.03, H, 0.05]} />
        <Mullion position={[0, -H / 6, 0.03]} size={[W, 0.03, 0.05]} />

        {/* Sill */}
        <mesh position={[0, -H / 2 - 0.1, 0.1]} castShadow receiveShadow>
          <boxGeometry args={[W + 0.4, 0.05, 0.28]} />
          <meshStandardMaterial color="#efe9de" roughness={0.6} />
        </mesh>
      </group>
    </RoomObject>
  );
};

export default WindowView;
