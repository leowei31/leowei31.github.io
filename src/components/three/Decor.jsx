import { useMemo, useRef } from "react";
import { RoundedBox, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CatmullRomCurve3, MathUtils, Vector3 } from "three";
import portrait from "../../assets/me.webp";
import { useNight } from "./night";
import { useCanvasTexture } from "./useCanvasTexture";
import { DESK, ROOM } from "./layout";

const STEEL = { color: "#1b1c20", roughness: 0.35, metalness: 0.7 };

/* ------------------------------------------------------------------ string lights */

export const StringLights = () => {
  const night = useNight();
  const mats = useRef([]);
  const { curve, bulbs } = useMemo(() => {
    const y = ROOM.height - 0.45;
    const z = ROOM.backZ + 0.14;
    const points = Array.from({ length: 9 }, (_, i) => {
      const x = -4.3 + (i / 8) * 8.6;
      // three gentle swags across the wall
      return new Vector3(x, y - 0.22 * Math.abs(Math.sin((i / 8) * Math.PI * 3)), z);
    });
    const c = new CatmullRomCurve3(points);
    return { curve: c, bulbs: Array.from({ length: 26 }, (_, i) => c.getPoint(i / 25)) };
  }, []);

  useFrame(({ clock }) => {
    mats.current.forEach((m, i) => {
      if (!m) return;
      const twinkle = 0.88 + Math.sin(clock.elapsedTime * 1.6 + i * 1.7) * 0.12;
      const k = MathUtils.lerp(0.55, 1.5, night.current) * twinkle;
      m.color.setRGB(3 * k, 2.1 * k, 1.1 * k);
    });
  });

  return (
    <group>
      <mesh userData={{ noOutline: true }}>
        <tubeGeometry args={[curve, 64, 0.004, 4, false]} />
        <meshStandardMaterial color="#222" roughness={0.8} />
      </mesh>
      {bulbs.map((p, i) => (
        <mesh key={i} position={[p.x, p.y - 0.035, p.z]}>
          <sphereGeometry args={[0.032, 10, 8]} />
          <meshBasicMaterial ref={(m) => (mats.current[i] = m)} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
};

/* ------------------------------------------------------------------ wall clock */

const drawClockFace = (ctx, w, h) => {
  ctx.fillStyle = "#f4f1ea";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#17181c";
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const r1 = w * (i % 3 === 0 ? 0.36 : 0.41);
    const r2 = w * 0.45;
    ctx.lineWidth = i % 3 === 0 ? 8 : 4;
    ctx.strokeStyle = "#17181c";
    ctx.beginPath();
    ctx.moveTo(w / 2 + Math.sin(a) * r1, h / 2 - Math.cos(a) * r1);
    ctx.lineTo(w / 2 + Math.sin(a) * r2, h / 2 - Math.cos(a) * r2);
    ctx.stroke();
  }
};

export const WallClock = ({ position }) => {
  const hour = useRef();
  const minute = useRef();
  const second = useRef();
  const face = useCanvasTexture(256, 256, drawClockFace);

  useFrame(() => {
    const d = new Date();
    const s = d.getSeconds() + d.getMilliseconds() / 1000;
    const m = d.getMinutes() + s / 60;
    const h = (d.getHours() % 12) + m / 60;
    if (second.current) second.current.rotation.z = -(s / 60) * Math.PI * 2;
    if (minute.current) minute.current.rotation.z = -(m / 60) * Math.PI * 2;
    if (hour.current) hour.current.rotation.z = -(h / 12) * Math.PI * 2;
  });

  return (
    <group position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.31, 0.31, 0.05, 40]} />
        <meshStandardMaterial {...STEEL} />
      </mesh>
      <mesh position={[0, 0, 0.0255]}>
        <circleGeometry args={[0.285, 40]} />
        <meshStandardMaterial map={face.texture} roughness={0.6} />
      </mesh>
      <group position={[0, 0, 0.04]}>
        <group ref={hour}>
          <mesh position={[0, 0.07, 0]}>
            <boxGeometry args={[0.02, 0.15, 0.006]} />
            <meshStandardMaterial color="#17181c" />
          </mesh>
        </group>
        <group ref={minute} position={[0, 0, 0.007]}>
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.014, 0.22, 0.006]} />
            <meshStandardMaterial color="#17181c" />
          </mesh>
        </group>
        <group ref={second} position={[0, 0, 0.014]}>
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.005, 0.24, 0.004]} />
            <meshStandardMaterial color="#ff4d1a" />
          </mesh>
        </group>
      </group>
    </group>
  );
};

/* ------------------------------------------------------------------ framed pictures */

export const PortraitFrame = ({ position }) => {
  const map = useTexture(portrait);
  map.colorSpace = "srgb";
  map.anisotropy = 8;
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.62, 0.78, 0.05]} />
        <meshStandardMaterial color="#17181c" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.0265]}>
        <planeGeometry args={[0.56, 0.72]} />
        <meshStandardMaterial color="#f4f1ea" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.01, 0.028]}>
        <planeGeometry args={[0.46, 0.575]} />
        <meshStandardMaterial map={map} roughness={0.6} />
      </mesh>
    </group>
  );
};

const drawRocket = (ctx, w, h) => {
  ctx.fillStyle = "#14325c";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 24) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
  for (let y = 0; y < h; y += 24) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(w / 2, 40);
  ctx.quadraticCurveTo(w / 2 + 40, 110, w / 2 + 34, 250);
  ctx.lineTo(w / 2 - 34, 250);
  ctx.quadraticCurveTo(w / 2 - 40, 110, w / 2, 40);
  ctx.moveTo(w / 2 + 34, 250); ctx.lineTo(w / 2 + 70, 310); ctx.lineTo(w / 2 + 34, 290);
  ctx.moveTo(w / 2 - 34, 250); ctx.lineTo(w / 2 - 70, 310); ctx.lineTo(w / 2 - 34, 290);
  ctx.stroke();
  ctx.beginPath(); ctx.arc(w / 2, 150, 14, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = "#fff";
  ctx.font = '500 20px "JetBrains Mono", monospace';
  ctx.fillText("3,000 FT", 24, h - 26);
};

const drawChart = (ctx, w, h) => {
  ctx.fillStyle = "#f4f1ea";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "#17181c";
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(40, 40); ctx.lineTo(40, h - 60); ctx.lineTo(w - 30, h - 60); ctx.stroke();
  ctx.strokeStyle = "#ff4d1a";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(40, h - 60);
  ctx.bezierCurveTo(120, h - 70, 160, 80, w / 2 + 40, 70);
  ctx.bezierCurveTo(w / 2 + 110, 64, w - 70, 160, w - 30, h - 62);
  ctx.stroke();
  ctx.fillStyle = "#17181c";
  ctx.font = '500 20px "JetBrains Mono", monospace';
  ctx.fillText("ALTITUDE / TIME", 48, h - 24);
};

const drawNetwork = (ctx, w, h) => {
  ctx.fillStyle = "#17181c";
  ctx.fillRect(0, 0, w, h);
  const layers = [3, 5, 5, 2];
  const pts = layers.map((n, li) =>
    Array.from({ length: n }, (_, i) => [60 + li * ((w - 120) / 3), h / 2 + (i - (n - 1) / 2) * 56])
  );
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 1.5;
  pts.forEach((layer, li) => {
    if (!pts[li + 1]) return;
    layer.forEach((a) => pts[li + 1].forEach((b) => { ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.stroke(); }));
  });
  pts.flat().forEach(([x, y], i) => {
    ctx.fillStyle = i % 4 === 0 ? "#ff6b3d" : "#f4f1ea";
    ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI * 2); ctx.fill();
  });
};

const POSTERS = { rocket: drawRocket, chart: drawChart, network: drawNetwork };

/** A framed canvas-drawn print. `facing` rotates it to hang on the left (+1) or right (-1) wall. */
export const Poster = ({ kind, position, size = [0.85, 1.15], facing = 1 }) => {
  const { texture } = useCanvasTexture(340, 460, POSTERS[kind], ['500 20px "JetBrains Mono"']);
  return (
    <group position={position} rotation={[0, facing * (Math.PI / 2), 0]}>
      <mesh castShadow>
        <boxGeometry args={[size[0] + 0.06, size[1] + 0.06, 0.04]} />
        <meshStandardMaterial color="#17181c" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.021]}>
        <planeGeometry args={size} />
        <meshStandardMaterial map={texture} roughness={0.7} />
      </mesh>
    </group>
  );
};

/* ------------------------------------------------------------------ plants */

export const FloorPlant = ({ position = [0, 0, 0] }) => {
  const leaves = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const a = i * 2.4;
        const h = 0.9 + (i / 16) * 1.1;
        const r = 0.12 + (1 - i / 16) * 0.28;
        return { x: Math.cos(a) * r, z: Math.sin(a) * r, y: h, a, tilt: 0.5 + (i % 3) * 0.15 };
      }),
    []
  );
  const group = useRef();
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.z = Math.sin(clock.elapsedTime * 0.6) * 0.012;
  });
  return (
    <group position={position}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.2, 0.6, 28]} />
        <meshStandardMaterial color="#e9e4d9" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.255, 0.255, 0.01, 28]} />
        <meshStandardMaterial color="#2a1c12" roughness={1} />
      </mesh>
      <group ref={group}>
        <mesh position={[0, 1.1, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.04, 1.0, 8]} />
          <meshStandardMaterial color="#6b4a2d" roughness={0.9} />
        </mesh>
        {leaves.map((l, i) => (
          <mesh
            key={i}
            position={[l.x, l.y, l.z]}
            rotation={[l.tilt * Math.sin(l.a), -l.a, l.tilt * Math.cos(l.a) + 0.4]}
            scale={[1, 0.12, 0.75]}
            castShadow
          >
            <sphereGeometry args={[0.2, 14, 10]} />
            <meshStandardMaterial color={i % 2 ? "#2f7a42" : "#3b8c4d"} roughness={0.65} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

/* ------------------------------------------------------------------ desk accessories */

export const Headphones = ({ position }) => (
  <group position={position}>
    <mesh position={[0, 0.012, 0]} castShadow>
      <cylinderGeometry args={[0.07, 0.08, 0.024, 20]} />
      <meshStandardMaterial {...STEEL} />
    </mesh>
    <mesh position={[0, 0.14, 0]}>
      <cylinderGeometry args={[0.01, 0.01, 0.26, 8]} />
      <meshStandardMaterial {...STEEL} />
    </mesh>
    {/* band + ear cups */}
    <mesh position={[0, 0.3, 0]} castShadow>
      <torusGeometry args={[0.095, 0.014, 8, 24, Math.PI]} />
      <meshStandardMaterial color="#2b2d33" roughness={0.6} />
    </mesh>
    {[-1, 1].map((s) => (
      <mesh key={s} position={[s * 0.095, 0.29, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.04, 20]} />
        <meshStandardMaterial color="#ff6b3d" roughness={0.5} />
      </mesh>
    ))}
  </group>
);

export const Speaker = ({ position }) => (
  <group position={position}>
    <RoundedBox args={[0.14, 0.24, 0.14]} radius={0.015} smoothness={2} position={[0, 0.12, 0]} castShadow>
      <meshStandardMaterial color="#e8e4dc" roughness={0.6} />
    </RoundedBox>
    <mesh position={[0, 0.08, 0.071]}>
      <circleGeometry args={[0.04, 20]} />
      <meshStandardMaterial color="#26282e" roughness={0.9} />
    </mesh>
    <mesh position={[0, 0.18, 0.071]}>
      <circleGeometry args={[0.022, 16]} />
      <meshStandardMaterial color="#26282e" roughness={0.9} />
    </mesh>
  </group>
);

/** Black pedestal with two drawers under the left of the desk. */
export const DrawerUnit = () => (
  <group position={[DESK.x - 1.15, 0, DESK.z + 0.05]}>
    <RoundedBox args={[0.46, 0.62, 0.62]} radius={0.015} smoothness={2} position={[0, 0.34, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#26282e" roughness={0.5} metalness={0.3} />
    </RoundedBox>
    {[0.2, 0.47].map((y) => (
      <group key={y}>
        <mesh position={[0, y, 0.312]}>
          <boxGeometry args={[0.4, 0.22, 0.004]} />
          <meshStandardMaterial color="#2f323a" roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[0, y + 0.07, 0.322]}>
          <boxGeometry args={[0.14, 0.012, 0.012]} />
          <meshStandardMaterial color="#ff6b3d" roughness={0.4} metalness={0.5} />
        </mesh>
      </group>
    ))}
  </group>
);
