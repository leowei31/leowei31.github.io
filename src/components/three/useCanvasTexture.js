import { useEffect, useMemo } from "react";
import { CanvasTexture, SRGBColorSpace } from "three";

/**
 * Creates a CanvasTexture and (re)draws it once the given web fonts are ready.
 * `draw(ctx, width, height)` must be a stable function (module level or useCallback).
 * Using canvas textures instead of troika <Text> avoids a runtime font download from a CDN.
 */
export const useCanvasTexture = (width, height, draw, fonts = []) => {
  const { canvas, texture } = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = width;
    c.height = height;
    const t = new CanvasTexture(c);
    t.colorSpace = SRGBColorSpace;
    t.anisotropy = 8;
    return { canvas: c, texture: t };
  }, [width, height]);

  const fontKey = fonts.join("|");

  useEffect(() => {
    let cancelled = false;
    const paint = () => {
      if (cancelled) return;
      draw(canvas.getContext("2d"), width, height);
      texture.needsUpdate = true;
    };
    paint();
    if (fontKey) {
      Promise.all(fontKey.split("|").map((f) => document.fonts.load(f)))
        .then(paint)
        .catch(() => {});
    }
    return () => {
      cancelled = true;
    };
  }, [canvas, texture, draw, width, height, fontKey]);

  useEffect(() => () => texture.dispose(), [texture]);

  return { canvas, texture };
};
