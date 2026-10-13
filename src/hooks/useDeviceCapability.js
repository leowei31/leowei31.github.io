import { useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Decides whether the 3D hero can run and at which quality tier.
 *  - Software renderers, missing WebGL and very weak devices get the static hero.
 *  - Touch devices run the scene too, on the "low" tier (smaller shadow map, lower DPR).
 * Query overrides for testing: ?3d=1 forces the scene, ?3d=0 forces the static hero.
 */
const detect = () => {
  const empty = { supports3D: false, quality: "high" };
  if (typeof window === "undefined") return empty;

  const forced = new URLSearchParams(window.location.search).get("3d");
  if (forced === "0") return empty;

  const isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
  const quality = isTouch ? "low" : "high";
  if (forced === "1") return { supports3D: true, quality };

  // Very low-end hardware (deviceMemory is Chromium only; undefined elsewhere)
  if (navigator.deviceMemory && navigator.deviceMemory < 3) return empty;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return empty;

  let gl;
  try {
    const canvas = document.createElement("canvas");
    gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return empty;

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (debugInfo) {
      const renderer = String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
      if (/SwiftShader|llvmpipe/i.test(renderer)) return empty;
    }
    return { supports3D: true, quality };
  } catch {
    return empty;
  } finally {
    // Browsers cap live WebGL contexts - don't leak the probe context
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  }
};

export const useDeviceCapability = () => {
  const reducedMotion = useReducedMotion();
  // Computed synchronously so we never mount (then tear down) a Canvas on devices that can't run it
  const [{ supports3D, quality }] = useState(detect);
  return { canRender3D: supports3D && !reducedMotion, quality };
};
