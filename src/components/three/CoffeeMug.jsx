import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import RoomObject from "./RoomObject";

const SteamParticle = ({ delay }) => {
  const ref = useRef();
  const startY = useMemo(() => Math.random() * 0.05, []);
  const offsetX = useMemo(() => (Math.random() - 0.5) * 0.04, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = ((clock.elapsedTime + delay) % 2) / 2;
      ref.current.position.y = startY + t * 0.25;
      ref.current.position.x = offsetX + Math.sin(clock.elapsedTime * 2 + delay) * 0.02;
      ref.current.material.opacity = Math.max(0, 1 - t * 1.5) * 0.4;
    }
  });

  return (
    <mesh ref={ref} position={[offsetX, startY, 0]}>
      <sphereGeometry args={[0.012, 6, 6]} />
      <meshStandardMaterial color="#fff" transparent opacity={0.4} />
    </mesh>
  );
};

const CoffeeMug = ({ onClick }) => {
  return (
    <RoomObject onClick={onClick} label="Coffee Break" baseY={1.08}>
      <group position={[-0.8, 0.02, 0.1]}>
        {/* Mug body */}
        <mesh castShadow>
          <cylinderGeometry args={[0.055, 0.045, 0.12, 12]} />
          <meshStandardMaterial color="#f5f5f5" roughness={0.4} />
        </mesh>

        {/* Coffee inside */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.048, 0.048, 0.01, 12]} />
          <meshStandardMaterial color="#3e2723" roughness={0.9} />
        </mesh>

        {/* Mug handle */}
        <mesh position={[0.052, 0, 0]} rotation={[0, Math.PI, Math.PI / 2]}>
          <torusGeometry args={[0.037, 0.009, 8, 14, Math.PI * 1.05]} />
          <meshStandardMaterial color="#f5f5f5" roughness={0.4} />
        </mesh>

        {/* Subtle coffee mark */}
        <mesh position={[0, 0, 0.051]}>
          <circleGeometry args={[0.018, 24]} />
          <meshStandardMaterial color="#5d4037" roughness={0.9} />
        </mesh>

        {/* Steam particles */}
        <group position={[0, 0.06, 0]}>
          {Array.from({ length: 5 }).map((_, i) => (
            <SteamParticle key={i} delay={i * 0.4} />
          ))}
        </group>
      </group>
    </RoomObject>
  );
};

export default CoffeeMug;
