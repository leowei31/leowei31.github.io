import React, { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import RoomObject from "./RoomObject";

const Plant = ({ onClick }) => {
  const [clicks, setClicks] = useState(0);
  const groupRef = useRef();
  const maxClicks = 5;

  const scale = 1 + Math.min(clicks, maxClicks) * 0.15;
  const hasFlower = clicks >= maxClicks;

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.5) * 0.05;
    }
  });

  const handleClick = () => {
    setClicks((prev) => prev + 1);
    onClick?.();
  };

  return (
    <RoomObject onClick={handleClick} label="Water Plant" baseY={1.08}>
      <group position={[-1.1, 0.04, -0.45]} ref={groupRef} scale={[scale, scale, scale]}>
        {/* Pot */}
        <mesh castShadow>
          <cylinderGeometry args={[0.07, 0.055, 0.1, 8]} />
          <meshStandardMaterial color="#c2703e" roughness={0.8} />
        </mesh>

        {/* Pot rim */}
        <mesh position={[0, 0.05, 0]} castShadow>
          <cylinderGeometry args={[0.075, 0.07, 0.02, 8]} />
          <meshStandardMaterial color="#d4845a" roughness={0.7} />
        </mesh>

        {/* Soil */}
        <mesh position={[0, 0.045, 0]}>
          <cylinderGeometry args={[0.065, 0.065, 0.01, 8]} />
          <meshStandardMaterial color="#3e2723" roughness={1} />
        </mesh>

        {/* Stem */}
        <mesh position={[0, 0.13, 0]} castShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.15, 4]} />
          <meshStandardMaterial color="#2e7d32" roughness={0.8} />
        </mesh>

        {/* Leaves */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i / 5) * Math.PI * 2;
          const height = 0.12 + i * 0.03;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * 0.04,
                height,
                Math.sin(angle) * 0.04,
              ]}
              rotation={[0.3, angle, 0.4]}
              castShadow
            >
              <sphereGeometry args={[0.035, 6, 4]} />
              <meshStandardMaterial color="#4caf50" roughness={0.7} />
            </mesh>
          );
        })}

        {/* Flower (appears after 5 clicks) */}
        {hasFlower && (
          <group position={[0, 0.23, 0]}>
            <mesh castShadow>
              <sphereGeometry args={[0.025, 8, 8]} />
              <meshStandardMaterial
                color="#f48fb1"
                emissive="#f48fb1"
                emissiveIntensity={0.3}
              />
            </mesh>
            {/* Petals */}
            {[0, 1, 2, 3, 4].map((i) => {
              const a = (i / 5) * Math.PI * 2;
              return (
                <mesh
                  key={i}
                  position={[Math.cos(a) * 0.025, 0, Math.sin(a) * 0.025]}
                >
                  <sphereGeometry args={[0.015, 6, 6]} />
                  <meshStandardMaterial color="#ec407a" />
                </mesh>
              );
            })}
          </group>
        )}
      </group>
    </RoomObject>
  );
};

export default Plant;
