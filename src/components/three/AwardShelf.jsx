import React from "react";
import RoomObject from "./RoomObject";

const trophies = [
  { x: -0.3, height: 0.22, color: "#ffd700" },
  { x: 0, height: 0.28, color: "#ffd700" },
  { x: 0.3, height: 0.2, color: "#c0c0c0" },
];

const AwardShelf = ({ onClick }) => {
  return (
    <RoomObject onClick={onClick} label="Activities" baseY={0} hoverLift={0}>
      <group position={[3.2, -0.9, -2.7]}>
        {/* Shelf frame - back */}
        <mesh position={[0, 1.8, -0.15]} castShadow>
          <boxGeometry args={[1.2, 1.8, 0.05]} />
          <meshStandardMaterial color="#654321" roughness={0.7} />
        </mesh>

        {/* Shelf frame - sides */}
        <mesh position={[-0.58, 1.8, 0]} castShadow>
          <boxGeometry args={[0.05, 1.8, 0.35]} />
          <meshStandardMaterial color="#5a3a1a" roughness={0.7} />
        </mesh>
        <mesh position={[0.58, 1.8, 0]} castShadow>
          <boxGeometry args={[0.05, 1.8, 0.35]} />
          <meshStandardMaterial color="#5a3a1a" roughness={0.7} />
        </mesh>

        {/* Shelf planks */}
        {[1.2, 2.0, 2.6].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <boxGeometry args={[1.1, 0.04, 0.32]} />
            <meshStandardMaterial color="#6b4226" roughness={0.6} />
          </mesh>
        ))}

        {/* Trophies on middle shelf */}
        {trophies.map((trophy, i) => (
          <group key={i} position={[trophy.x, 2.04, 0]}>
            {/* Trophy base */}
            <mesh position={[0, 0.04, 0]} castShadow>
              <cylinderGeometry args={[0.06, 0.08, 0.08, 8]} />
              <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Trophy stem */}
            <mesh position={[0, 0.08 + trophy.height / 2, 0]} castShadow>
              <cylinderGeometry args={[0.02, 0.03, trophy.height, 6]} />
              <meshStandardMaterial color={trophy.color} metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Trophy cup */}
            <mesh position={[0, 0.08 + trophy.height + 0.05, 0]} castShadow>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshStandardMaterial color={trophy.color} metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        ))}

        {/* Picture frame on top shelf */}
        <group position={[0, 2.77, 0.05]}>
          {/* Frame */}
          <mesh castShadow>
            <boxGeometry args={[0.4, 0.3, 0.03]} />
            <meshStandardMaterial color="#5a3a1a" roughness={0.6} />
          </mesh>
          {/* Picture */}
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[0.32, 0.22]} />
            <meshStandardMaterial color="#87CEEB" />
          </mesh>
        </group>
      </group>
    </RoomObject>
  );
};

export default AwardShelf;
