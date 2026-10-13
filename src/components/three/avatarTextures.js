import { CanvasTexture, SRGBColorSpace } from "three";
import { BODY } from "./avatarGeometry";

/*
 * The avatar's face and shirt front are illustrations - drawn here with smooth curves, the way
 * anime 3D characters use painted faces - and projected onto the head and torso meshes as their
 * textures (see applyPlanarUVs). Everything is drawn in body units (see the *_RECT regions); each
 * canvas is filled with the base skin / cloth colour, which the clamped edges extend over the rest
 * of the mesh.
 *
 * The face follows anime-chibi conventions rather than copying the portrait: big eyes set low with
 * a large and a small highlight, a barely-there nose, and one exaggerated signature feature - the
 * wide toothy grin. The likeness comes from that grin, the thick brows and the dark brown eyes.
 */

export const SKIN = "#efc29a";
export const SHIRT = "#86b6b8";
export const BLAZER = "#2e2a28";
const INK = "#2b1712";

// The shirt/lapel artwork is drawn in a fixed reference frame (a blazer running from y = 0.6 to
// 1.09) and mapped onto the real torso, so it follows any change to the body's proportions.
const OUTFIT_REF = { hem: 0.6, neck: 1.09 };
const OUTFIT_X = 0.92;
const outfitMap = (x, y) => [
  x * OUTFIT_X,
  BODY.hem + ((y - OUTFIT_REF.hem) * (BODY.neck - BODY.hem)) / (OUTFIT_REF.neck - OUTFIT_REF.hem),
];
const [outfitX0, outfitY0] = outfitMap(-0.15, 0.68);
const [outfitX1, outfitY1] = outfitMap(0.15, 1.1);

// Regions of head / body space the two textures are projected over
export const FACE_RECT = { x: [-0.27, 0.27], y: [-0.46, 0.12] };
export const OUTFIT_RECT = { x: [outfitX0, outfitX1], y: [outfitY0, outfitY1] };
export const FACE_SIZE = [1024, 1100];
export const OUTFIT_SIZE = [512, Math.round((512 * (outfitY1 - outfitY0)) / (outfitX1 - outfitX0))];

/** Pen that draws in body units onto a canvas covering `rect`, optionally through a mapping. */
const pen = (ctx, rect, [w, h], map = (x, y) => [x, y]) => {
  const sx = w / (rect.x[1] - rect.x[0]);
  const sy = h / (rect.y[1] - rect.y[0]);
  const P = (x, y) => {
    const [mx, my] = map(x, y);
    return [(mx - rect.x[0]) * sx, (rect.y[1] - my) * sy];
  };
  return {
    P,
    px: (units) => units * sx,
    move: (x, y) => ctx.moveTo(...P(x, y)),
    line: (x, y) => ctx.lineTo(...P(x, y)),
    quad: (cx, cy, x, y) => ctx.quadraticCurveTo(...P(cx, cy), ...P(x, y)),
    cubic: (ax, ay, bx, by, x, y) => ctx.bezierCurveTo(...P(ax, ay), ...P(bx, by), ...P(x, y)),
    circle: (x, y, r) => {
      ctx.beginPath();
      ctx.arc(...P(x, y), r * sx, 0, Math.PI * 2);
    },
    ellipse: (x, y, rx, ry) => {
      ctx.beginPath();
      ctx.ellipse(...P(x, y), rx * sx, ry * sy, 0, 0, Math.PI * 2);
    },
  };
};

const lerp2 = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

/** Split a cubic Bézier at t (de Casteljau) - used to ink only part of a lid line. */
const splitCubic = (p0, p1, p2, p3, t) => {
  const a = lerp2(p0, p1, t);
  const b = lerp2(p1, p2, t);
  const c = lerp2(p2, p3, t);
  const d = lerp2(a, b, t);
  const e = lerp2(b, c, t);
  const f = lerp2(d, e, t);
  return { head: [p0, a, d, f], tail: [f, e, c, p3] };
};

/* ------------------------------------------------------------------ face */

// Face layout (head space). Everything below is derived from these, so the features stay in
// proportion with each other: big eyes set below the middle of the head with about one eye-width
// between them, a tiny nose, and the grin a short way below.
const EYE_X = 0.118; // centre of each eye from the middle of the face
const EYE_Y = -0.098;
const EYE_W = 0.124;
const EYE_H = 0.072; // from the eye's centre line up to the top of the lid
const NOSE_Y = -0.19;
const MOUTH_Y = -0.236; // mouth corners
const MOUTH_W = 0.064; // half-width - the grin is the signature feature, so it runs wide
const MOUTH_D = 0.062; // depth of the open mouth

const drawEye = (ctx, d, side, blink) => {
  const o = side; // +1 = the avatar's left eye (viewer's right)
  const cx = side * EYE_X;
  const cy = EYE_Y;
  const W = EYE_W;
  const H = EYE_H;
  const inner = [cx - o * W * 0.5, cy + H * 0.11];
  const outer = [cx + o * W * 0.5, cy + H * 0.07];
  const up1 = [cx - o * W * 0.3, cy + H * 1.07];
  const up2 = [cx + o * W * 0.28, cy + H * 1.11];
  const lo1 = [cx + o * W * 0.3, cy - H * 0.96];
  const lo2 = [cx - o * W * 0.3, cy - H * 0.93];

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = INK;

  if (blink) {
    // closed, happy eye: a soft upward arc
    ctx.lineWidth = d.px(0.011);
    ctx.beginPath();
    d.move(inner[0], cy - H * 0.07);
    d.quad(cx, cy + H * 0.63, outer[0], cy - H * 0.11);
    ctx.stroke();
    return;
  }

  const eyePath = () => {
    ctx.beginPath();
    d.move(...inner);
    d.cubic(...up1, ...up2, ...outer);
    d.cubic(...lo1, ...lo2, ...inner);
    ctx.closePath();
  };

  // white of the eye
  eyePath();
  ctx.fillStyle = "#fbf6ef";
  ctx.fill();

  // big dark-brown iris with a warm glow at the bottom, pupil and two catch-lights
  ctx.save();
  eyePath();
  ctx.clip();
  const ic = [cx + o * W * 0.024, cy - H * 0.074];
  const irx = W * 0.35;
  const iry = H * 0.9;
  const iris = ctx.createLinearGradient(...d.P(ic[0], ic[1] + iry), ...d.P(ic[0], ic[1] - iry));
  iris.addColorStop(0, "#22130c");
  iris.addColorStop(0.5, "#4d2e1e");
  iris.addColorStop(1, "#a06d46");
  ctx.fillStyle = iris;
  d.ellipse(...ic, irx, iry);
  ctx.fill();
  ctx.strokeStyle = "#1a0f0a";
  ctx.lineWidth = d.px(0.0032);
  ctx.stroke();
  ctx.fillStyle = "#140b07";
  d.ellipse(ic[0], ic[1] + H * 0.04, W * 0.145, H * 0.41);
  ctx.fill();
  // soft shadow the upper lid casts on the eye
  ctx.fillStyle = "rgba(60, 30, 20, 0.2)";
  ctx.beginPath();
  d.move(...inner);
  d.cubic(...up1, ...up2, ...outer);
  d.line(outer[0], outer[1] - H * 0.3);
  d.cubic(up2[0], up2[1] - H * 0.37, up1[0], up1[1] - H * 0.37, inner[0], inner[1] - H * 0.3);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  d.ellipse(ic[0] - W * 0.112, ic[1] + H * 0.35, W * 0.104, H * 0.3);
  ctx.fill();
  d.circle(ic[0] + W * 0.136, ic[1] - H * 0.41, W * 0.052);
  ctx.fill();
  ctx.restore();

  // lash line: fine at the inner corner, bold over the outer part, with a little flick
  ctx.strokeStyle = INK;
  ctx.lineWidth = d.px(0.0075);
  ctx.beginPath();
  d.move(...inner);
  d.cubic(...up1, ...up2, ...outer);
  ctx.stroke();
  const { tail } = splitCubic(inner, up1, up2, outer, 0.25);
  ctx.lineWidth = d.px(0.0135);
  ctx.beginPath();
  d.move(...tail[0]);
  d.cubic(...tail[1], ...tail[2], ...tail[3]);
  d.line(outer[0] + o * W * 0.096, outer[1] - H * 0.11);
  ctx.stroke();

  // a light lower lash under the outer half
  const { head } = splitCubic(outer, lo1, lo2, inner, 0.45);
  ctx.strokeStyle = "rgba(80, 40, 28, 0.7)";
  ctx.lineWidth = d.px(0.0036);
  ctx.beginPath();
  d.move(...head[0]);
  d.cubic(...head[1], ...head[2], ...head[3]);
  ctx.stroke();
};

const drawBrow = (ctx, d, side) => {
  // short, thick, softly arched brows
  const o = side;
  ctx.strokeStyle = "#2a1d18";
  ctx.lineCap = "round";
  ctx.lineWidth = d.px(0.019);
  ctx.beginPath();
  d.move(o * (EYE_X - EYE_W * 0.36), EYE_Y + EYE_H * 1.52);
  d.quad(o * (EYE_X + EYE_W * 0.016), EYE_Y + EYE_H * 1.81, o * (EYE_X + EYE_W * 0.4), EYE_Y + EYE_H * 1.59);
  ctx.stroke();
};

const drawNose = (ctx, d) => {
  // just a small soft tick
  ctx.strokeStyle = "rgba(196, 128, 92, 0.85)";
  ctx.lineCap = "round";
  ctx.lineWidth = d.px(0.006);
  ctx.beginPath();
  d.move(-0.004, NOSE_Y + 0.005);
  d.quad(0.002, NOSE_Y - 0.005, 0.01, NOSE_Y);
  ctx.stroke();
};

const drawMouth = (ctx, d) => {
  // compact, open, toothy grin
  const mouthPath = () => {
    ctx.beginPath();
    d.move(-MOUTH_W, MOUTH_Y);
    d.quad(0, MOUTH_Y - MOUTH_D * 0.24, MOUTH_W, MOUTH_Y);
    d.cubic(MOUTH_W * 0.86, MOUTH_Y - MOUTH_D, -MOUTH_W * 0.86, MOUTH_Y - MOUTH_D, -MOUTH_W, MOUTH_Y);
    ctx.closePath();
  };

  mouthPath();
  ctx.fillStyle = "#7a2e28";
  ctx.fill();

  ctx.save();
  mouthPath();
  ctx.clip();
  ctx.fillStyle = "#e8837a"; // tongue
  d.ellipse(0, MOUTH_Y - MOUTH_D * 0.72, MOUTH_W * 0.56, MOUTH_D * 0.29);
  ctx.fill();
  ctx.fillStyle = "#fffaf3"; // upper teeth
  ctx.beginPath();
  d.move(-MOUTH_W * 1.1, MOUTH_Y + 0.02);
  d.line(MOUTH_W * 1.1, MOUTH_Y + 0.02);
  d.line(MOUTH_W * 1.1, MOUTH_Y - MOUTH_D * 0.29);
  d.quad(0, MOUTH_Y - MOUTH_D * 0.48, -MOUTH_W * 1.1, MOUTH_Y - MOUTH_D * 0.29);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  mouthPath();
  ctx.strokeStyle = INK;
  ctx.lineWidth = d.px(0.006);
  ctx.lineJoin = "round";
  ctx.stroke();
};

/** The face, drawn onto a transparent canvas; `blink` draws the eyes closed. */
export const drawFace = (ctx, w, h, blink = false) => {
  const d = pen(ctx, FACE_RECT, [w, h]);
  ctx.fillStyle = SKIN;
  ctx.fillRect(0, 0, w, h);

  // soft rosy cheeks
  for (const s of [-1, 1]) {
    const [bx, by] = d.P(s * 0.17, -0.19);
    ctx.save();
    ctx.translate(bx, by);
    ctx.scale(1, 0.55);
    const blush = ctx.createRadialGradient(0, 0, 0, 0, 0, d.px(0.054));
    blush.addColorStop(0, "rgba(255, 128, 118, 0.32)");
    blush.addColorStop(1, "rgba(255, 128, 118, 0)");
    ctx.fillStyle = blush;
    ctx.fillRect(-d.px(0.065), -d.px(0.065), d.px(0.13), d.px(0.13));
    ctx.restore();
  }

  drawBrow(ctx, d, -1);
  drawBrow(ctx, d, 1);
  drawEye(ctx, d, -1, blink);
  drawEye(ctx, d, 1, blink);
  drawNose(ctx, d);
  drawMouth(ctx, d);
};

/* ------------------------------------------------------------------ outfit */

/**
 * Open-collar teal shirt under the blazer's lapels, drawn onto the front of the torso. Everything
 * stays inside the blazer's silhouette (see TORSO_PROFILE), narrowing toward the neck.
 */
export const drawOutfit = (ctx, w, h) => {
  const d = pen(ctx, OUTFIT_RECT, [w, h], outfitMap);
  ctx.fillStyle = BLAZER;
  ctx.fillRect(0, 0, w, h);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  // shirt showing between the lapels, down to where the blazer buttons
  ctx.fillStyle = SHIRT;
  ctx.beginPath();
  d.move(-0.064, 1.066);
  d.line(0.064, 1.066);
  d.quad(0.036, 0.9, 0.01, 0.73);
  d.line(-0.01, 0.73);
  d.quad(-0.036, 0.9, -0.064, 1.066);
  ctx.closePath();
  ctx.fill();

  // skin in the open collar, with the shadow the chin casts
  ctx.fillStyle = SKIN;
  ctx.beginPath();
  d.move(-0.04, 1.09);
  d.line(0.04, 1.09);
  d.line(0, 1.01);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(190, 120, 85, 0.5)";
  ctx.beginPath();
  d.move(-0.04, 1.09);
  d.line(0.04, 1.09);
  d.line(0.03, 1.068);
  d.quad(0, 1.058, -0.03, 1.068);
  ctx.closePath();
  ctx.fill();

  // placket and buttons
  ctx.strokeStyle = "rgba(40, 72, 74, 0.45)";
  ctx.lineWidth = d.px(0.0026);
  ctx.beginPath();
  d.move(0, 1.004);
  d.line(0, 0.735);
  ctx.stroke();
  for (const y of [0.97, 0.91, 0.85, 0.79]) {
    d.circle(0, y, 0.0062);
    ctx.fillStyle = "#eef0ea";
    ctx.fill();
    ctx.strokeStyle = "rgba(30, 45, 45, 0.55)";
    ctx.lineWidth = d.px(0.0016);
    ctx.stroke();
  }

  // blazer lapels: folded-back bands along the opening, with notches under the collar
  for (const s of [-1, 1]) {
    ctx.beginPath();
    d.move(s * 0.064, 1.066);
    d.line(s * 0.1, 1.04);
    d.line(s * 0.096, 1.014);
    d.line(s * 0.084, 1.012);
    d.quad(s * 0.06, 0.87, s * 0.026, 0.746);
    d.line(s * 0.01, 0.73);
    d.quad(s * 0.036, 0.9, s * 0.064, 1.066);
    ctx.closePath();
    ctx.fillStyle = "#3d3734";
    ctx.fill();
    ctx.strokeStyle = "#141110";
    ctx.lineWidth = d.px(0.003);
    ctx.stroke();
  }

  // collar points spreading over the lapels
  for (const s of [-1, 1]) {
    ctx.beginPath();
    d.move(s * 0.04, 1.09);
    d.line(s * 0.074, 1.077);
    d.quad(s * 0.08, 1.04, s * 0.068, 1.004);
    d.quad(s * 0.036, 0.998, s * 0.005, 1.01);
    ctx.closePath();
    ctx.fillStyle = SHIRT;
    ctx.fill();
    ctx.strokeStyle = "rgba(25, 45, 46, 0.85)";
    ctx.lineWidth = d.px(0.0026);
    ctx.stroke();
  }

  // blazer button
  d.circle(0, 0.716, 0.0095);
  ctx.fillStyle = "#1a1716";
  ctx.fill();

  // breast pocket with an orange pocket square (the site accent), on the wearer's left
  ctx.fillStyle = "#ff6b3d";
  ctx.beginPath();
  d.move(0.092, 0.872);
  d.line(0.1, 0.894);
  d.line(0.11, 0.876);
  d.line(0.12, 0.896);
  d.line(0.13, 0.874);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#141110";
  ctx.lineWidth = d.px(0.0028);
  ctx.beginPath();
  d.move(0.086, 0.872);
  d.line(0.138, 0.875);
  ctx.stroke();
};

/** Draws once onto a fresh canvas and wraps it in a texture. */
export const makeCanvasTexture = ([w, h], draw) => {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  draw(canvas.getContext("2d"), w, h);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
};
