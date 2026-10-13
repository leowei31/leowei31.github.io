import { useEffect, useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CanvasTexture, SRGBColorSpace } from "three";
import RoomObject from "./RoomObject";
import { DESK } from "./layout";

const SCREEN_W = 1280;
const SCREEN_H = 540;

// [text, colour] tokens per line, typed out one character at a time
const COLORS = { k: "#c586c0", v: "#9cdcfe", s: "#ce9178", p: "#d4d4d4", c: "#6a9955", f: "#dcdcaa" };
const CODE = [
  [["// portfolio.ts", "c"]],
  [["export const ", "k"], ["leo", "v"], [" = {", "p"]],
  [["  role: ", "v"], ['"Software Engineer"', "s"], [",", "p"]],
  [["  focus: ", "v"], ['["full-stack", "ML research"]', "s"], [",", "p"]],
  [["  base: ", "v"], ['"Calgary, AB"', "s"], [",", "p"]],
  [["};", "p"]],
  [],
  [["leo", "v"], [".", "p"], ["build", "f"], ["(", "p"], ['"things that matter"', "s"], [");", "p"]],
];
const TOTAL_CHARS = CODE.reduce((n, line) => n + line.reduce((m, [t]) => m + t.length, 0) + 1, 0);

const paintScreen = (ctx, typed, caretOn) => {
  ctx.fillStyle = "#0d1117";
  ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);

  // Window chrome
  ctx.fillStyle = "#161b22";
  ctx.fillRect(0, 0, SCREEN_W, 54);
  ["#ff5f57", "#febc2e", "#28c840"].forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(34 + i * 30, 27, 8, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = "#8b949e";
  ctx.font = '500 20px "JetBrains Mono", ui-monospace, monospace';
  ctx.textBaseline = "middle";
  ctx.fillText("portfolio.ts", 150, 28);
  ctx.fillStyle = "#ff6b3d";
  ctx.fillRect(140, 50, 150, 4);

  ctx.font = '500 34px "JetBrains Mono", ui-monospace, monospace';
  ctx.textBaseline = "alphabetic";
  const lineH = 54;
  let remaining = typed;
  let caretX = 110;
  let caretY = 118;

  for (let i = 0; i < CODE.length && remaining >= 0; i++) {
    const y = 118 + i * lineH;
    ctx.fillStyle = "#3b434d";
    ctx.fillText(String(i + 1).padStart(2, " "), 28, y);
    let x = 110;
    for (const [text, color] of CODE[i]) {
      const shown = text.slice(0, Math.max(0, remaining));
      ctx.fillStyle = COLORS[color];
      ctx.fillText(shown, x, y);
      x += ctx.measureText(shown).width;
      remaining -= text.length;
    }
    caretX = x;
    caretY = y;
    remaining -= 1; // newline
  }

  if (caretOn) {
    ctx.fillStyle = "#ff6b3d";
    ctx.fillRect(caretX + 3, caretY - 30, 14, 36);
  }

  // Click hint
  ctx.fillStyle = "#58a6ff";
  ctx.font = '500 22px "JetBrains Mono", ui-monospace, monospace';
  ctx.fillText("> click to see projects", SCREEN_W - 380, SCREEN_H - 26);
};

const Monitor = ({ onClick, lowPower = false }) => {
  const screenRef = useRef();
  const clock = useRef({ acc: 0, t: 0 });
  const state = useRef(null);

  if (!state.current && typeof document !== "undefined") {
    const canvas = document.createElement("canvas");
    canvas.width = SCREEN_W;
    canvas.height = SCREEN_H;
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = 8;
    state.current = { canvas, texture, ctx: canvas.getContext("2d") };
    paintScreen(state.current.ctx, TOTAL_CHARS, true);
  }

  useEffect(() => {
    const { texture, ctx } = state.current;
    // Repaint once the code font arrives
    document.fonts.load('500 34px "JetBrains Mono"').then(() => {
      paintScreen(ctx, TOTAL_CHARS, true);
      texture.needsUpdate = true;
    });
    return () => texture.dispose();
  }, []);

  // Typewriter loop, repainted at ~15fps (texture upload is the expensive part)
  useFrame((_, delta) => {
    const c = clock.current;
    c.t += delta;
    c.acc += delta;
    if (c.acc < (lowPower ? 1 / 8 : 1 / 15)) return;
    c.acc = 0;

    const cycle = TOTAL_CHARS / 18 + 5; // 18 chars/s, then a 5s pause
    const t = c.t % cycle;
    const typed = Math.min(TOTAL_CHARS, Math.floor(t * 18));
    const caretOn = Math.floor(c.t * 2) % 2 === 0;
    const { ctx, texture } = state.current;
    paintScreen(ctx, typed, caretOn);
    texture.needsUpdate = true;
  });

  const cy = 0.78;

  return (
    <RoomObject onClick={onClick} label="Projects" baseY={DESK.top} hoverLift={0} labelOffset={[0, 1.5, 0.4]}>
      <group position={[0, 0, DESK.z - 0.3]}>
        {/* Bezel */}
        <RoundedBox args={[2.0, 0.86, 0.045]} radius={0.02} smoothness={3} position={[0, cy, 0]} castShadow>
          <meshStandardMaterial color="#0f1013" roughness={0.35} metalness={0.5} />
        </RoundedBox>

        {/* Screen */}
        <mesh ref={screenRef} position={[0, cy, 0.0235]}>
          <planeGeometry args={[1.94, 0.8]} />
          <meshBasicMaterial map={state.current?.texture} toneMapped={false} />
        </mesh>

        {/* Stand */}
        <mesh position={[0, 0.2, -0.05]} castShadow>
          <boxGeometry args={[0.07, 0.4, 0.04]} />
          <meshStandardMaterial color="#2a2b31" roughness={0.35} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.008, 0.02]} castShadow>
          <boxGeometry args={[0.5, 0.016, 0.26]} />
          <meshStandardMaterial color="#2a2b31" roughness={0.35} metalness={0.7} />
        </mesh>

        {/* Soft screen spill on the desk */}
        <pointLight position={[0, cy - 0.1, 0.6]} intensity={0.9} color="#8ec5ff" distance={2.5} decay={2} />
      </group>
    </RoomObject>
  );
};

export default Monitor;
