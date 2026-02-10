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



      {/* Name Plate */}
      <RoomObject onClick={onNameClick} label="About Me" baseY={1.06}>
        <mesh position={[1.15, 0, 0.55]}>
          <boxGeometry args={[0.6, 0.04, 0.2]} />
          <meshStandardMaterial color="#C0A060" metalness={0.6} roughness={0.3} />
        </mesh>
        <Text
          position={[1.15, 0.03, 0.55]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.07}
          color="#3a2a0a"
          anchorX="center"
          anchorY="middle"
          font={undefined}
        >
          Leo Wei
        </Text>
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
