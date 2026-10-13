import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";

/**
 * Camera shots along the hero scroll. `t` is scroll progress (0-1) when the camera
 * should be AT that pose; consecutive identical poses create a hold ("dwell").
 */
const WIDE = { pos: [0, 4.6, 9.6], look: [0, 1.25, -1.8] };
const MONITOR = { pos: [0.15, 1.95, 1.9], look: [0, 1.75, -2.7] };
const SHELF = { pos: [-2.4, 2.3, 2.1], look: [-3.3, 2.0, -3.0] };
const AWARDS = { pos: [2.5, 2.6, 2.4], look: [3.3, 2.5, -3.0] };

const build = (wide, monitor, shelf, awards) => [
  { t: 0.0, ...wide },
  { t: 0.1, ...wide },
  { t: 0.26, ...monitor },
  { t: 0.42, ...monitor },
  { t: 0.56, ...shelf },
  { t: 0.7, ...shelf },
  { t: 0.82, ...awards },
  { t: 0.9, ...awards },
  { t: 1.0, ...wide },
];

const SHOTS_LANDSCAPE = build(WIDE, MONITOR, SHELF, AWARDS);

// A portrait frame is narrow, so the opening shot becomes a high, isometric look at the
// whole room as a miniature, and the stops are framed tighter on a single subject.
const SHOTS_PORTRAIT = build(
  { pos: [6.4, 6.8, 14.2], look: [0, 1.9, -1] },
  { pos: [0.1, 1.9, 2.7], look: [0, 1.7, -2.7] },
  { pos: [-2.7, 2.4, 1.9], look: [-3.3, 2.0, -3.0] },
  { pos: [2.9, 2.8, 2.0], look: [3.3, 2.7, -3.0] }
);

const smooth = (x) => x * x * (3 - 2 * x);

const sampleShots = (shots, p, outPos, outLook) => {
  const t = MathUtils.clamp(p, 0, 1);
  let i = 0;
  while (i < shots.length - 2 && t > shots[i + 1].t) i++;
  const a = shots[i];
  const b = shots[i + 1];
  const k = smooth(MathUtils.clamp((t - a.t) / (b.t - a.t || 1), 0, 1));
  outPos.set(
    MathUtils.lerp(a.pos[0], b.pos[0], k),
    MathUtils.lerp(a.pos[1], b.pos[1], k),
    MathUtils.lerp(a.pos[2], b.pos[2], k)
  );
  outLook.set(
    MathUtils.lerp(a.look[0], b.look[0], k),
    MathUtils.lerp(a.look[1], b.look[1], k),
    MathUtils.lerp(a.look[2], b.look[2], k)
  );
};

/**
 * Drives the camera from a scroll-progress ref, plus a subtle pointer parallax and a slow idle sway
 * (so touch screens, which have no pointer hover, still feel alive).
 * Portrait viewports get their own shots, a wider lens, and the image is shifted up
 * so the subject clears the caption sheet at the bottom of the screen.
 */
const CameraRig = ({ progressRef }) => {
  const { camera, size, pointer, clock } = useThree();
  const pos = useMemo(() => new Vector3(), []);
  const look = useMemo(() => new Vector3(), []);
  const smoothPos = useRef(null);
  const smoothLook = useRef(null);
  const layout = useRef("");

  useFrame((_, delta) => {
    const aspect = size.width / size.height;
    const portrait = aspect < 0.9;

    // Re-apply lens + view offset only when the layout actually changes
    const key = `${portrait}-${size.width}-${size.height}`;
    if (layout.current !== key) {
      layout.current = key;
      camera.fov = portrait ? 50 : 38;
      if (portrait) camera.setViewOffset(size.width, size.height, 0, size.height * 0.17, size.width, size.height);
      else camera.clearViewOffset();
      camera.updateProjectionMatrix();
    }

    sampleShots(portrait ? SHOTS_PORTRAIT : SHOTS_LANDSCAPE, progressRef.current, pos, look);

    if (!portrait) {
      // Keep the framing when the window is narrower than 16:10
      const pull = MathUtils.clamp(1.6 / aspect, 1, 1.9);
      pos.sub(look).multiplyScalar(pull).add(look);
    }

    const t = clock.elapsedTime;
    pos.x += pointer.x * 0.35 + Math.sin(t * 0.35) * (portrait ? 0.45 : 0.12);
    pos.y += pointer.y * 0.18 + Math.sin(t * 0.27) * 0.06;

    if (!smoothPos.current) {
      smoothPos.current = pos.clone();
      smoothLook.current = look.clone();
    }
    const lambda = 5;
    smoothPos.current.x = MathUtils.damp(smoothPos.current.x, pos.x, lambda, delta);
    smoothPos.current.y = MathUtils.damp(smoothPos.current.y, pos.y, lambda, delta);
    smoothPos.current.z = MathUtils.damp(smoothPos.current.z, pos.z, lambda, delta);
    smoothLook.current.x = MathUtils.damp(smoothLook.current.x, look.x, lambda, delta);
    smoothLook.current.y = MathUtils.damp(smoothLook.current.y, look.y, lambda, delta);
    smoothLook.current.z = MathUtils.damp(smoothLook.current.z, look.z, lambda, delta);

    camera.position.copy(smoothPos.current);
    camera.lookAt(smoothLook.current);
  });

  return null;
};

export default CameraRig;
