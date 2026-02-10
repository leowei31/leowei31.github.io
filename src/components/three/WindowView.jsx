import React, { useRef } from "react";
import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import RoomObject from "./RoomObject";

const WindowView = ({ isNight, onToggle }) => {
  const moonRef = useRef();

  useFrame((_, delta) => {
    if (moonRef.current) {
      moonRef.current.rotation.y += delta * 0.2;
    }
  });

  const skyColor = isNight ? "#0a1628" : "#87CEEB";
  const lightIntensity = isNight ? 0.1 : 0.4;

  return (
    <RoomObject onClick={onToggle} label={isNight ? "Switch to Day" : "Switch to Night"} baseY={0} hoverLift={0}>
      <group position={[0, 2.6, -2.9]}>
        {/* Window Frame */}
        <mesh castShadow>
          <boxGeometry args={[2.8, 2.2, 0.08]} />
          <meshStandardMaterial color="#f5f0e8" roughness={0.5} />
        </mesh>

        {/* Window Glass / Sky */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[2.6, 2.0]} />
          <meshStandardMaterial
            color={skyColor}
            emissive={skyColor}
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Distant scenery */}
        <group position={[0, -0.25, -0.1]}>
          {/* Far horizon */}
          <mesh position={[0, -0.2, 0]}>
            <planeGeometry args={[2.6, 0.6]} />
            <meshStandardMaterial
              color={isNight ? "#0f1b2d" : "#9fc5e8"}
              emissive={isNight ? "#0f1b2d" : "#9fc5e8"}
              emissiveIntensity={0.15}
            />
          </mesh>
          {/* Mid hills */}
          <mesh position={[0, -0.35, 0.02]}>
            <planeGeometry args={[2.6, 0.7]} />
            <meshStandardMaterial
              color={isNight ? "#1b2a3a" : "#6fa3c8"}
              emissive={isNight ? "#1b2a3a" : "#6fa3c8"}
              emissiveIntensity={0.15}
            />
          </mesh>
          {/* Foreground ridge */}
          <mesh position={[0, -0.5, 0.04]}>
            <planeGeometry args={[2.6, 0.8]} />
            <meshStandardMaterial
              color={isNight ? "#243548" : "#4f86ad"}
              emissive={isNight ? "#243548" : "#4f86ad"}
              emissiveIntensity={0.12}
            />
          </mesh>
        </group>

        {/* Sun (day) */}
        {!isNight && (
          <mesh position={[-0.75, 0.55, 0.06]}>
            <circleGeometry args={[0.18, 24]} />
            <meshStandardMaterial
              color="#ffd27d"
              emissive="#ffd27d"
              emissiveIntensity={0.6}
            />
          </mesh>
        )}

        {/* Window cross bars */}
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[0.04, 2.0, 0.02]} />
          <meshStandardMaterial color="#f5f0e8" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[2.6, 0.04, 0.02]} />
          <meshStandardMaterial color="#f5f0e8" roughness={0.5} />
        </mesh>

        {/* Moon (visible in night mode) */}
        {isNight && (
          <mesh ref={moonRef} position={[0.5, 0.4, 0.06]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial
              color="#fffde7"
              emissive="#fffde7"
              emissiveIntensity={0.8}
            />
          </mesh>
        )}

        {/* Stars (visible in night mode) */}
        {isNight && (
          <group position={[0, 0, -0.5]}>
            <Stars
              radius={3}
              depth={2}
              count={200}
              factor={0.3}
              saturation={0}
              fade
              speed={0.5}
            />
          </group>
        )}

        {/* Window light ray */}
        <pointLight
          position={[0, 0, 1]}
          intensity={lightIntensity}
          color={isNight ? "#4a6fa5" : "#ffeaa7"}
          distance={5}
        />
      </group>
    </RoomObject>
  );
};

export default WindowView;
