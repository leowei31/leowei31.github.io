import { useState, useEffect } from "react";

export const useDeviceCapability = () => {
  const [canRender3D, setCanRender3D] = useState(true);

  useEffect(() => {
    // Check 1: Screen width (mobile)
    if (window.innerWidth < 768) {
      setCanRender3D(false);
      return;
    }

    // Check 2: WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) {
        setCanRender3D(false);
        return;
      }

      // Check 3: Low-power GPU detection
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        const renderer = gl.getParameter(
          debugInfo.UNMASKED_RENDERER_WEBGL
        );
        if (
          renderer.includes("SwiftShader") ||
          renderer.includes("llvmpipe")
        ) {
          setCanRender3D(false);
        }
      }
    } catch {
      setCanRender3D(false);
    }
  }, []);

  return { canRender3D };
};
