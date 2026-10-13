import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import RoomObject from "./RoomObject";
import { DESK } from "./layout";
import { useNight } from "./night";

const STEEL = { color: "#1b1c20", roughness: 0.35, metalness: 0.7 };

const DeskLamp = ({ isOn, onToggle }) => {
  const light = useRef();
  const target = useRef();
  const bulb = useRef();
  const level = useRef(isOn ? 1 : 0);
  const night = useNight();

  useEffect(() => {
    if (light.current && target.current) light.current.target = target.current;
  }, []);

  useFrame((_, delta) => {
    level.current = MathUtils.damp(level.current, isOn ? 1 : 0, 8, delta);
    // Brighter pool of light at night, gentle accent in daylight
    if (light.current) light.current.intensity = level.current * MathUtils.lerp(6, 22, night.current);
    if (bulb.current) bulb.current.color.setRGB(0.35 + 3.2 * level.current, 0.3 + 2.4 * level.current, 0.2 + 1.2 * level.current);
  });

  return (
    <RoomObject onClick={onToggle} label={isOn ? "Lamp off" : "Lamp on"} baseY={DESK.top} hoverLift={0.02} labelOffset={[1.3, 0.8, -2.5]}>
      <group position={[1.35, 0, DESK.z - 0.35]} rotation={[0, -0.5, 0]}>
        <mesh position={[0, 0.012, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.11, 0.024, 28]} />
          <meshStandardMaterial {...STEEL} />
        </mesh>
        {/* Lower arm */}
        <mesh position={[0.05, 0.19, 0]} rotation={[0, 0, -0.28]} castShadow>
          <cylinderGeometry args={[0.009, 0.009, 0.36, 8]} />
          <meshStandardMaterial {...STEEL} />
        </mesh>
        {/* Upper arm */}
        <mesh position={[-0.02, 0.45, 0]} rotation={[0, 0, 1.05]} castShadow>
          <cylinderGeometry args={[0.009, 0.009, 0.34, 8]} />
          <meshStandardMaterial {...STEEL} />
        </mesh>
        <mesh position={[0.1, 0.33, 0]}>
          <sphereGeometry args={[0.02, 12, 10]} />
          <meshStandardMaterial {...STEEL} />
        </mesh>
        {/* Head */}
        <group position={[-0.17, 0.5, 0]} rotation={[0, 0, 0.5]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.05, 0.09, 0.09, 24, 1, true]} />
            <meshStandardMaterial {...STEEL} side={2} />
          </mesh>
          <mesh position={[0, -0.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.088, 24]} />
            <meshBasicMaterial ref={bulb} color={[3.5, 2.7, 1.4]} toneMapped={false} />
          </mesh>
          <spotLight
            ref={light}
            position={[0, -0.05, 0]}
            angle={0.7}
            penumbra={0.9}
            color="#ffd9a0"
            distance={4}
            decay={2}
          />
          <object3D ref={target} position={[-0.25, -1.1, 0.2]} />
        </group>
      </group>
    </RoomObject>
  );
};

export default DeskLamp;
