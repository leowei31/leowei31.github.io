import React, { useRef } from "react";
import RoomObject from "./RoomObject";

const DeskLamp = ({ isOn, onToggle }) => {
  const spotlightRef = useRef();

  return (
    <RoomObject onClick={onToggle} label={isOn ? "Turn Off" : "Turn On"} baseY={1.06}>
      <group position={[1.2, 0, -0.3]}>
        {/* Lamp base */}
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.1, 0.03, 12]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Lamp arm - lower */}
        <mesh position={[0, 0.2, -0.05]} rotation={[0.2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.012, 0.012, 0.4, 6]} />
          <meshStandardMaterial color="#444" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Lamp arm - upper */}
        <mesh position={[-0.02, 0.38, -0.15]} rotation={[-0.4, 0, 0]} castShadow>
          <cylinderGeometry args={[0.012, 0.012, 0.3, 6]} />
          <meshStandardMaterial color="#444" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Lamp shade */}
        <mesh position={[-0.04, 0.45, -0.25]} rotation={[0.3, 0, 0]} castShadow>
          <coneGeometry args={[0.1, 0.12, 12, 1, true]} />
          <meshStandardMaterial
            color={isOn ? "#ffd54f" : "#666"}
            side={2}
            roughness={0.6}
          />
        </mesh>

        {/* Light bulb glow */}
        {isOn && (
          <mesh position={[-0.04, 0.42, -0.25]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial
              color="#fff9c4"
              emissive="#fff9c4"
              emissiveIntensity={2}
            />
          </mesh>
        )}

        {/* Spotlight */}
        <spotLight
          ref={spotlightRef}
          position={[-0.04, 0.42, -0.25]}
          target-position={[0, 0, 0]}
          angle={0.5}
          penumbra={0.6}
          intensity={isOn ? 3 : 0}
          color="#ffeaa7"
          castShadow
          distance={3}
        />
      </group>
    </RoomObject>
  );
};

export default DeskLamp;
