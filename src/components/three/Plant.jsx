import { useState, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import RoomObject from "./RoomObject";
import { DESK } from "./layout";

const MAX_CLICKS = 5;

const Plant = ({ onClick }) => {
  const [clicks, setClicks] = useState(0);
  const groupRef = useRef();
  const scaleRef = useRef(1);

  const leaves = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2 + (i % 2) * 0.3;
        return {
          angle,
          lean: 0.55 + (i % 3) * 0.2,
          len: 0.15 + (i % 4) * 0.025,
          height: 0.08 + (i % 3) * 0.035,
        };
      }),
    []
  );

  const growth = Math.min(clicks, MAX_CLICKS);
  const targetScale = 1 + growth * 0.16;

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;
    scaleRef.current = MathUtils.damp(scaleRef.current, targetScale, 6, delta);
    groupRef.current.scale.setScalar(scaleRef.current);
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.5) * 0.06;
  });

  return (
    <RoomObject
      onClick={() => {
        setClicks((c) => c + 1);
        onClick?.();
      }}
      label={clicks >= MAX_CLICKS ? "In full bloom" : "Water me"}
      baseY={DESK.top}
      hoverLift={0}
      labelOffset={[-1.4, 0.55, DESK.z - 0.3]}
    >
      <group position={[-1.4, 0, DESK.z - 0.3]}>
        {/* Pot */}
        <mesh position={[0, 0.07, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.065, 0.14, 28]} />
          <meshStandardMaterial color="#f1ede4" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.142, 0]}>
          <cylinderGeometry args={[0.078, 0.078, 0.006, 28]} />
          <meshStandardMaterial color="#2f2118" roughness={1} />
        </mesh>

        <group ref={groupRef} position={[0, 0.14, 0]}>
          {leaves.map((l, i) => (
            <group key={i} rotation={[0, l.angle, 0]}>
              <group position={[0.01, 0, 0]} rotation={[0, 0, -l.lean]}>
                <mesh position={[0, l.len / 2, 0]}>
                  <cylinderGeometry args={[0.004, 0.004, l.len, 5]} />
                  <meshStandardMaterial color="#2f6b3a" roughness={0.8} />
                </mesh>
                <mesh position={[0.02, l.len + 0.03, 0]} scale={[1, 0.16, 0.8]} rotation={[0, 0, 0.5]} castShadow>
                  <sphereGeometry args={[0.065, 14, 10]} />
                  <meshStandardMaterial color={i % 2 ? "#3f8f4e" : "#2f7a42"} roughness={0.7} />
                </mesh>
              </group>
            </group>
          ))}

          {clicks >= MAX_CLICKS && (
            <group position={[0, 0.3, 0]}>
              <mesh castShadow>
                <sphereGeometry args={[0.022, 12, 10]} />
                <meshStandardMaterial color="#ffd36b" emissive="#ffd36b" emissiveIntensity={0.4} />
              </mesh>
              {[0, 1, 2, 3, 4].map((i) => {
                const a = (i / 5) * Math.PI * 2;
                return (
                  <mesh
                    key={i}
                    position={[Math.cos(a) * 0.035, 0, Math.sin(a) * 0.035]}
                    scale={[1, 0.5, 1]}
                  >
                    <sphereGeometry args={[0.022, 10, 8]} />
                    <meshStandardMaterial color="#ff8fb1" roughness={0.6} />
                  </mesh>
                );
              })}
            </group>
          )}
        </group>
      </group>
    </RoomObject>
  );
};

export default Plant;
