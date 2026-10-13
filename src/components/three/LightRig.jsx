import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Color, MathUtils } from "three";
import { useNight } from "./night";

const SUN_DAY = new Color("#ffe2b8");
const SUN_NIGHT = new Color("#7d92c9");
const AMB_DAY = new Color("#fff4e6");
const AMB_NIGHT = new Color("#27304d");

/**
 * All lighting lives here. A damped night factor drives intensities and colours so the
 * day/night switch eases in instead of popping. No HDRI is downloaded - the environment
 * is built from procedural Lightformers.
 */
const LightRig = ({ isNight, shadowSize = 2048 }) => {
  const night = useNight();
  const ambient = useRef();
  const sun = useRef();
  const fill = useRef();
  const hero = useRef();

  useFrame(({ scene }, delta) => {
    night.current = MathUtils.damp(night.current, isNight ? 1 : 0, 2.5, delta);
    const n = night.current;

    if (ambient.current) {
      ambient.current.intensity = MathUtils.lerp(0.55, 0.85, n);
      ambient.current.color.lerpColors(AMB_DAY, AMB_NIGHT, n);
    }
    if (sun.current) {
      sun.current.intensity = MathUtils.lerp(2.8, 0.55, n);
      sun.current.color.lerpColors(SUN_DAY, SUN_NIGHT, n);
    }
    // Night-only fill so nothing falls into pure black (toon materials ignore the environment map)
    if (fill.current) fill.current.intensity = MathUtils.lerp(0, 1.0, n);
    if (hero.current) hero.current.intensity = MathUtils.lerp(0, 9, n);
    scene.environmentIntensity = MathUtils.lerp(0.85, 0.3, n);
  });

  return (
    <>
      <ambientLight ref={ambient} />
      <hemisphereLight ref={fill} args={["#9fb4ff", "#4a3a5c", 0]} />
      {/* warm practical light that keeps the avatar readable at night */}
      <pointLight ref={hero} position={[1.2, 2.6, 0.9]} color="#ffd9b0" distance={5} decay={2} />
      <directionalLight
        ref={sun}
        position={[5, 8, 7]}
        castShadow
        shadow-mapSize={[shadowSize, shadowSize]}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-5}
        shadow-camera-near={1}
        shadow-camera-far={24}
        shadow-bias={-0.0004}
        shadow-normalBias={0.03}
      />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2.2} position={[0, 6, 2]} scale={[10, 5, 1]} rotation-x={Math.PI / 2} color="#ffffff" />
        <Lightformer form="rect" intensity={1.4} position={[-6, 3, 3]} scale={[4, 6, 1]} rotation-y={Math.PI / 2} color="#ffd9b0" />
        <Lightformer form="rect" intensity={0.8} position={[6, 2, 4]} scale={[4, 6, 1]} rotation-y={-Math.PI / 2} color="#b7d4ff" />
      </Environment>
    </>
  );
};

export default LightRig;
