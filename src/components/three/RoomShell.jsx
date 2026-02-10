import React from "react";
import { RoundedBox } from "@react-three/drei";

const RoomShell = () => {
  const wallColor = "#dbe7f2";
  const floorColor = "#c4a882";
  const wallThickness = 0.1;

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color={floorColor} roughness={0.8} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 2.5, -3]} receiveShadow>
        <boxGeometry args={[8, 5, wallThickness]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>

      {/* Baseboard - Back */}
      <mesh position={[0, 0.1, -2.94]}>
        <boxGeometry args={[8, 0.2, 0.02]} />
        <meshStandardMaterial color="#8B7355" roughness={0.7} />
      </mesh>

      {/* Rug under desk area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0.5]}>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#4a6fa5" roughness={1} opacity={0.3} transparent />
      </mesh>
    </group>
  );
};

export default RoomShell;
