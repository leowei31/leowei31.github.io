import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import RoomObject from "./RoomObject";
import { DESK } from "./layout";

const SteamParticle = ({ delay }) => {
  const ref = useRef();
  const offsetX = useMemo(() => (delay * 0.37) % 0.04 - 0.02, [delay]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = ((clock.elapsedTime + delay) % 2.4) / 2.4;
    ref.current.position.y = t * 0.26;
    ref.current.position.x = offsetX + Math.sin(clock.elapsedTime * 2 + delay) * 0.015;
    ref.current.material.opacity = Math.max(0, 1 - t * 1.4) * 0.35;
    ref.current.scale.setScalar(0.6 + t * 1.2);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.014, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.3} depthWrite={false} />
    </mesh>
  );
};

const CoffeeMug = ({ onClick }) => (
  <RoomObject onClick={onClick} label="Coffee" baseY={DESK.top} hoverLift={0.03} labelOffset={[-1.1, 0.3, -1.9]}>
    <group position={[-1.1, 0, DESK.z + 0.5]}>
      <mesh position={[0, 0.065, 0]} castShadow>
        <cylinderGeometry args={[0.052, 0.045, 0.13, 24]} />
        <meshStandardMaterial color="#ff6b3d" roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.125, 0]}>
        <cylinderGeometry args={[0.046, 0.046, 0.004, 24]} />
        <meshStandardMaterial color="#2b1a12" roughness={0.3} />
      </mesh>
      <mesh position={[0.058, 0.07, 0]} rotation={[0, 0, 0]} castShadow>
        <torusGeometry args={[0.032, 0.008, 10, 20, Math.PI]} />
        <meshStandardMaterial color="#ff6b3d" roughness={0.45} />
      </mesh>
      <group position={[0, 0.13, 0]}>
        {[0, 0.5, 1, 1.5, 2].map((d) => (
          <SteamParticle key={d} delay={d} />
        ))}
      </group>
    </group>
  </RoomObject>
);

export default CoffeeMug;
