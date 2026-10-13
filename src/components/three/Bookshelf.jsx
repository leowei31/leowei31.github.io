import { useMemo } from "react";
import { Color } from "three";
import RoomObject from "./RoomObject";
import { useCanvasTexture } from "./useCanvasTexture";
import { skills } from "../../data/skills";
import { ROOM } from "./layout";

const HUES = [0.6, 0.78, 0.38, 0.07]; // blue, violet, green, orange
const WIDTH = 1.5;
const DEPTH = 0.4;
const HEIGHT = 3.7;
const BOARD_YS = [0.12, 0.98, 1.84, 2.7, 3.56];
const STEEL = "#1b1c20";

const rand = (i) => {
  const x = Math.sin(i * 91.7 + 17.3) * 43758.5453;
  return x - Math.floor(x);
};

const Label = ({ text }) => {
  const draw = useMemo(
    () => (ctx, w, h) => {
      ctx.fillStyle = "#17181c";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#f4f1ea";
      ctx.font = '500 30px "JetBrains Mono", monospace';
      ctx.textBaseline = "middle";
      ctx.fillText(text.toUpperCase().replace("TECHNOLOGIES", "TECH").replace("DEVELOPMENT", "DEV"), 18, h / 2 + 2);
    },
    [text]
  );
  const { texture } = useCanvasTexture(512, 64, draw, ['500 20px "JetBrains Mono"']);
  return (
    <mesh position={[-0.2, 0, DEPTH / 2 + 0.003]}>
      <planeGeometry args={[0.9, 0.1125]} />
      <meshStandardMaterial map={texture} roughness={0.5} />
    </mesh>
  );
};

const Bookshelf = ({ onClick }) => {
  const shelves = useMemo(
    () =>
      skills.slice(0, 4).map((group, s) => {
        let cursor = -WIDTH / 2 + 0.1;
        const books = [];
        group.items.slice(0, 9).forEach((name, i) => {
          const w = 0.07 + rand(s * 20 + i) * 0.05;
          if (cursor + w > WIDTH / 2 - 0.08) return;
          const h = 0.42 + rand(s * 30 + i + 5) * 0.28;
          const color = new Color().setHSL(HUES[s], 0.55 + rand(i + s) * 0.2, 0.42 + rand(i * 3 + s) * 0.2);
          books.push({ name, x: cursor + w / 2, w, h, color, tilt: 0 });
          cursor += w + 0.012;
        });
        return { label: group.category, books };
      }),
    []
  );

  return (
    <RoomObject onClick={onClick} label="Skills" baseY={0} hoverLift={0} labelOffset={[0, HEIGHT / 2 + 0.2, 0.4]}>
      <group position={[-3.3, 0, ROOM.backZ + DEPTH / 2]}>
        {/* Steel uprights */}
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * (WIDTH / 2 - 0.02), HEIGHT / 2, 0]} castShadow>
            <boxGeometry args={[0.04, HEIGHT, DEPTH]} />
            <meshStandardMaterial color={STEEL} roughness={0.4} metalness={0.6} />
          </mesh>
        ))}
        {/* Back panel */}
        <mesh position={[0, HEIGHT / 2, -DEPTH / 2 + 0.01]} receiveShadow>
          <boxGeometry args={[WIDTH - 0.08, HEIGHT, 0.02]} />
          <meshStandardMaterial color="#d9d2c4" roughness={0.9} />
        </mesh>

        {/* Boards */}
        {BOARD_YS.map((y) => (
          <mesh key={y} position={[0, y, 0]} castShadow receiveShadow>
            <boxGeometry args={[WIDTH - 0.04, 0.04, DEPTH]} />
            <meshStandardMaterial color="#c99a68" roughness={0.5} />
          </mesh>
        ))}

        {/* Books + category plaques */}
        {shelves.map((shelf, s) => {
          const y = BOARD_YS[s] + 0.02;
          return (
            <group key={shelf.label}>
              {shelf.books.map((b) => (
                <mesh
                  key={b.name}
                  position={[b.x, y + b.h / 2, -0.02]}
                  rotation={[0, 0, b.tilt]}
                  castShadow
                >
                  <boxGeometry args={[b.w, b.h, DEPTH - 0.1]} />
                  <meshStandardMaterial color={b.color} roughness={0.75} />
                </mesh>
              ))}
              <group position={[0, BOARD_YS[s], 0]}>
                <Label text={shelf.label} />
              </group>
            </group>
          );
        })}
      </group>
    </RoomObject>
  );
};

export default Bookshelf;
