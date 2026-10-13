import { useMemo } from "react";
import { Vector2 } from "three";
import RoomObject from "./RoomObject";
import { useCanvasTexture } from "./useCanvasTexture";
import { ROOM } from "./layout";

const GOLD = { color: "#e0b341", metalness: 0.95, roughness: 0.22 };
const SILVER = { color: "#cfd3d8", metalness: 0.95, roughness: 0.25 };

const CUP_PROFILE = [
  [0.0, 0.0],
  [0.075, 0.0],
  [0.075, 0.02],
  [0.04, 0.03],
  [0.02, 0.06],
  [0.02, 0.14],
  [0.05, 0.17],
  [0.085, 0.24],
  [0.075, 0.3],
  [0.0, 0.3],
].map(([x, y]) => new Vector2(x, y));

const Trophy = ({ position, scale = 1, metal = GOLD }) => (
  <group position={position} scale={scale}>
    <mesh position={[0, 0.0, 0]} castShadow>
      <cylinderGeometry args={[0.08, 0.09, 0.05, 20]} />
      <meshStandardMaterial color="#17181c" roughness={0.4} />
    </mesh>
    <mesh position={[0, 0.025, 0]} castShadow>
      <latheGeometry args={[CUP_PROFILE, 28]} />
      <meshStandardMaterial {...metal} />
    </mesh>
  </group>
);

const drawCertificate = (ctx, w, h) => {
  ctx.fillStyle = "#f6f2e9";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "#c9a24a";
  ctx.lineWidth = 6;
  ctx.strokeRect(14, 14, w - 28, h - 28);
  ctx.fillStyle = "#17181c";
  ctx.textAlign = "center";
  ctx.font = '600 26px "JetBrains Mono", monospace';
  ctx.fillText("BEST PAPER", w / 2, h / 2 - 10);
  ctx.font = '400 20px "JetBrains Mono", monospace';
  ctx.fillStyle = "#6b655c";
  ctx.fillText("IEEE ATC 2025", w / 2, h / 2 + 24);
};

const Frame = ({ position, size, children }) => (
  <group position={position}>
    <mesh castShadow>
      <boxGeometry args={[size[0], size[1], 0.04]} />
      <meshStandardMaterial color="#17181c" roughness={0.4} />
    </mesh>
    {children}
  </group>
);

const AwardShelf = ({ onClick }) => {
  const cert = useCanvasTexture(400, 270, drawCertificate, ['600 26px "JetBrains Mono"']);
  const x = 3.3;
  const z = ROOM.backZ + 0.16;
  const abstract = useMemo(() => ["#ff6b3d", "#17181c", "#f4f1ea"], []);

  return (
    <RoomObject onClick={onClick} label="Academics" baseY={0} hoverLift={0} labelOffset={[x, 3.6, z + 0.4]}>
      {/* Framed certificate + abstract print */}
      <Frame position={[x - 0.35, 3.45, ROOM.backZ + 0.03]} size={[0.8, 0.56, 0.04]}>
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[0.72, 0.486]} />
          <meshStandardMaterial map={cert.texture} roughness={0.6} />
        </mesh>
      </Frame>
      <Frame position={[x + 0.5, 3.4, ROOM.backZ + 0.03]} size={[0.44, 0.6, 0.04]}>
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[0.38, 0.54]} />
          <meshStandardMaterial color={abstract[2]} roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.05, 0.024]}>
          <circleGeometry args={[0.13, 32]} />
          <meshStandardMaterial color={abstract[0]} roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.17, 0.024]}>
          <planeGeometry args={[0.26, 0.04]} />
          <meshStandardMaterial color={abstract[1]} roughness={0.8} />
        </mesh>
      </Frame>

      {/* Floating shelves */}
      {[2.0, 2.85].map((y) => (
        <mesh key={y} position={[x, y, z]} castShadow receiveShadow>
          <boxGeometry args={[1.7, 0.05, 0.32]} />
          <meshStandardMaterial color="#c99a68" roughness={0.5} />
        </mesh>
      ))}

      {/* Trophies on the lower shelf */}
      <Trophy position={[x - 0.5, 2.05, z]} scale={0.9} />
      <Trophy position={[x - 0.1, 2.05, z]} scale={1.15} />
      <Trophy position={[x + 0.4, 2.05, z]} scale={0.8} metal={SILVER} />

      {/* Books + medal on the upper shelf */}
      {[
        ["#17181c", 0.32, -0.55],
        ["#ff6b3d", 0.26, -0.47],
        ["#f4f1ea", 0.3, -0.39],
      ].map(([c, h, dx]) => (
        <mesh key={dx} position={[x + dx, 2.875 + h / 2, z]} castShadow>
          <boxGeometry args={[0.06, h, 0.22]} />
          <meshStandardMaterial color={c} roughness={0.7} />
        </mesh>
      ))}
      <mesh position={[x + 0.4, 2.875 + 0.09, z]} castShadow>
        <cylinderGeometry args={[0.07, 0.055, 0.18, 24]} />
        <meshStandardMaterial color="#f1ede4" roughness={0.6} />
      </mesh>
      {[-0.35, 0, 0.35].map((a) => (
        <mesh key={a} position={[x + 0.4 + a * 0.12, 2.875 + 0.3, z]} rotation={[0, 0, -a]} scale={[1, 1.9, 0.35]} castShadow>
          <sphereGeometry args={[0.05, 14, 10]} />
          <meshStandardMaterial color="#3f8f4e" roughness={0.7} />
        </mesh>
      ))}
    </RoomObject>
  );
};

export default AwardShelf;
