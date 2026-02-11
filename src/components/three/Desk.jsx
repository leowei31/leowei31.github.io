import React from "react";
import { Text } from "@react-three/drei";
import RoomObject from "./RoomObject";

const Desk = ({ onNameClick }) => {
  const deskColor = "#8B6914";
  const legColor = "#6B5310";

  return (
    <group>
      {/* Desk Surface */}
      <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.08, 1.4]} />
        <meshStandardMaterial color={deskColor} roughness={0.6} />
      </mesh>

      {/* Legs */}
      {[
        [-1.4, 0.5, -0.6],
        [1.4, 0.5, -0.6],
        [-1.4, 0.5, 0.6],
        [1.4, 0.5, 0.6],
      ].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 1, 8]} />
          <meshStandardMaterial color={legColor} roughness={0.5} metalness={0.3} />
        </mesh>
      ))}



      {/* Name Plate - desk tent style */}
      <RoomObject onClick={onNameClick} label="View Experience" baseY={1.06}>
        <group position={[1.15, 0, 0.55]}>
          {/* Base */}
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.55, 0.015, 0.18]} />
            <meshStandardMaterial color="#B8963E" metalness={0.7} roughness={0.25} />
          </mesh>
          {/* Front face - pivoted from bottom edge on base front */}
          <group position={[0, 0.008, 0.08]} rotation={[-0.15, 0, 0]}>
            <mesh position={[0, 0.065, 0]} castShadow>
              <boxGeometry args={[0.5, 0.13, 0.008]} />
              <meshStandardMaterial color="#C9A84C" metalness={0.65} roughness={0.3} />
            </mesh>
            {/* Name text on front face */}
            <Text
              position={[0, 0.065, 0.005]}
              fontSize={0.045}
              color="#3a2a0a"
              anchorX="center"
              anchorY="middle"
              font={undefined}
            >
              Leo Wei
            </Text>
          </group>
          {/* Back support - pivoted from top of front face, angling down to base back */}
          <group position={[0, 0.137, 0.06]} rotation={[0.79, 0, 0]}>
            <mesh position={[0, -0.092, 0]} castShadow>
              <boxGeometry args={[0.5, 0.184, 0.006]} />
              <meshStandardMaterial color="#A6882F" metalness={0.7} roughness={0.3} />
            </mesh>
          </group>
        </group>
      </RoomObject>

      {/* Keyboard */}
      <mesh position={[0, 1.06, 0.2]} castShadow>
        <boxGeometry args={[0.6, 0.02, 0.25]} />
        <meshStandardMaterial color="#333" roughness={0.8} />
      </mesh>

      {/* Mouse */}
      <mesh position={[0.55, 1.06, 0.2]} castShadow>
        <boxGeometry args={[0.08, 0.02, 0.12]} />
        <meshStandardMaterial color="#333" roughness={0.8} />
      </mesh>

      {/* Mouse pad */}
      <mesh position={[0.55, 1.045, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.3, 0.25]} />
        <meshStandardMaterial color="#2a2a4a" roughness={1} />
      </mesh>
    </group>
  );
};

export default Desk;
