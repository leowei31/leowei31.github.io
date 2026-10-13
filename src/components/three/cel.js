import { extend } from "@react-three/fiber";
import { DataTexture, MeshToonMaterial, NearestFilter, RedFormat } from "three";

/**
 * Cel shading. Light is quantised into a few flat bands instead of a smooth gradient,
 * which is what gives the scene its anime / illustrated look.
 */
const ramp = (values) => {
  const texture = new DataTexture(new Uint8Array(values), values.length, 1, RedFormat);
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
};

const gradient = ramp([150, 215, 255]);

// Skin uses a near-flat two-tone ramp so faces stay clean and illustrated instead of faceted
export const SKIN_GRADIENT = ramp([225, 255]);

// Hair: a deep shadow, a mid tone and a narrow, soft sheen only where light hits it almost
// head-on (kept subtle so dark hair stays dark instead of turning brown at the tips)
export const HAIR_GRADIENT = ramp([95, 95, 95, 95, 95, 95, 150, 150, 150, 150, 150, 150, 150, 150, 150, 200]);

class CelMaterial extends MeshToonMaterial {
  constructor(parameters) {
    super(parameters);
    this.gradientMap = gradient;
  }
}

/**
 * Render this FIRST inside <Canvas>. Every <meshStandardMaterial> below it then builds a toon
 * material instead, so the whole room (and avatar) is cel shaded without touching each component.
 * (Canvas re-registers the stock THREE materials on render, so this has to run after it.)
 * Props such as roughness/metalness are simply ignored by the toon material.
 */
export const CelSetup = () => {
  extend({ MeshStandardMaterial: CelMaterial });
  return null;
};
