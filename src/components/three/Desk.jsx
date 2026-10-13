import { RoundedBox } from "@react-three/drei";
import RoomObject from "./RoomObject";
import { useCanvasTexture } from "./useCanvasTexture";
import { DESK } from "./layout";

const STEEL = "#1b1c20";
const OAK = "#c99a68";

const drawKeys = (ctx, w, h) => {
  ctx.fillStyle = "#d9d5cc";
  ctx.fillRect(0, 0, w, h);
  const rows = [14, 14, 13, 12, 8];
  const gap = 6;
  const rowH = (h - gap * (rows.length + 1)) / rows.length;
  rows.forEach((count, r) => {
    const keyW = (w - gap * (count + 1)) / count;
    for (let c = 0; c < count; c++) {
      const accent = (r === 0 && c === 0) || (r === 2 && c === count - 1);
      ctx.fillStyle = accent ? "#ff6b3d" : "#f4f1ea";
      ctx.beginPath();
      ctx.roundRect(gap + c * (keyW + gap), gap + r * (rowH + gap), keyW, rowH, 4);
      ctx.fill();
    }
  });
};

const drawPlate = (ctx, w, h) => {
  ctx.fillStyle = "#17181c";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#f4f1ea";
  ctx.font = '84px "Instrument Serif", Georgia, serif';
  ctx.textBaseline = "middle";
  ctx.fillText("Leo Wei", 36, h / 2 - 8);
  ctx.fillStyle = "#ff6b3d";
  ctx.fillRect(36, h - 34, 56, 4);
};

const Desk = ({ onNameClick }) => {
  const keys = useCanvasTexture(512, 160, drawKeys);
  const plate = useCanvasTexture(512, 160, drawPlate, ['40px "Instrument Serif"']);
  const { x, z, top, width, depth } = DESK;

  return (
    <group position={[x, 0, z]}>
      {/* Top */}
      <RoundedBox
        args={[width, 0.07, depth]}
        radius={0.025}
        smoothness={3}
        position={[0, top - 0.035, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={OAK} roughness={0.5} />
      </RoundedBox>

      {/* Steel frame: two T-legs and a crossbar */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * (width / 2 - 0.25), 0, 0]}>
          <mesh position={[0, 0.02, 0]} castShadow>
            <boxGeometry args={[0.07, 0.04, depth - 0.2]} />
            <meshStandardMaterial color={STEEL} roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0, (top - 0.07) / 2, 0]} castShadow>
            <boxGeometry args={[0.07, top - 0.07, 0.07]} />
            <meshStandardMaterial color={STEEL} roughness={0.4} metalness={0.6} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, top - 0.14, -depth / 2 + 0.12]} castShadow>
        <boxGeometry args={[width - 0.5, 0.06, 0.04]} />
        <meshStandardMaterial color={STEEL} roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Desk mat */}
      <RoundedBox
        args={[1.7, 0.006, 0.66]}
        radius={0.003}
        smoothness={2}
        position={[0, top + 0.003, 0.18]}
        receiveShadow
      >
        <meshStandardMaterial color="#25272e" roughness={0.95} />
      </RoundedBox>

      {/* Keyboard */}
      <group position={[-0.1, top + 0.006, 0.28]} rotation={[0, 0.03, 0]}>
        <RoundedBox args={[0.58, 0.026, 0.2]} radius={0.01} smoothness={2} position={[0, 0.013, 0]} castShadow>
          <meshStandardMaterial color="#cfcac0" roughness={0.5} />
        </RoundedBox>
        <mesh position={[0, 0.0275, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.55, 0.17]} />
          <meshStandardMaterial map={keys.texture} roughness={0.6} />
        </mesh>
      </group>

      {/* Mouse */}
      <mesh position={[0.45, top + 0.02, 0.3]} scale={[1, 0.55, 1.5]} castShadow>
        <sphereGeometry args={[0.032, 20, 14]} />
        <meshStandardMaterial color="#e8e4dc" roughness={0.4} />
      </mesh>

      {/* Name plate - jumps to Experience */}
      <RoomObject onClick={onNameClick} label="Experience" baseY={top} hoverLift={0.03} labelOffset={[1.15, 0.25, 0.5]}>
        <group position={[1.2, 0, 0.45]} rotation={[0, -0.25, 0]}>
          <mesh position={[0, 0.07, 0]} rotation={[-0.18, 0, 0]} castShadow>
            <boxGeometry args={[0.46, 0.14, 0.025]} />
            <meshStandardMaterial color="#17181c" roughness={0.35} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0.07, 0.0135]} rotation={[-0.18, 0, 0]}>
            <planeGeometry args={[0.44, 0.1375]} />
            <meshStandardMaterial map={plate.texture} roughness={0.4} />
          </mesh>
        </group>
      </RoomObject>
    </group>
  );
};

export default Desk;
