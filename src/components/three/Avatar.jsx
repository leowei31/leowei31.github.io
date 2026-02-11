import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";

const Avatar = () => {
  const bodyRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const headRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    // Gentle breathing
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(t * 1.2) * 0.012;
    }
    // Left arm - relaxed sway
    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(t * 0.8) * 0.08;
      leftArmRef.current.rotation.z = 0.1 + Math.sin(t * 0.6) * 0.03;
    }
    // Right arm - wave whole arm side to side while raised
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = 2.0 + Math.sin(t * 3) * 0.3;
    }
    // Head - look around, slight tilt toward wave
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.35) * 0.15;
      headRef.current.rotation.z = 0.04 + Math.sin(t * 0.5) * 0.03;
    }
  });

  const skinColor = "#f0c8a0";
  const hairColor = "#1a1a1a";
  const jacketColor = "#3d8b8b";
  const pantsColor = "#2d3748";
  const shoeColor = "#1a1a1a";

  const fz = 0.291;

  return (
    <group position={[1.6, 0, 0.4]} rotation={[0, -0.5, 0]}>
      <group ref={bodyRef}>
        {/* === SHOES === */}
        {[-0.12, 0.12].map((x, i) => (
          <mesh key={i} position={[x, 0.07, 0.02]} castShadow>
            <boxGeometry args={[0.14, 0.14, 0.22]} />
            <meshStandardMaterial color={shoeColor} roughness={0.8} />
          </mesh>
        ))}

        {/* === LEGS === */}
        {[-0.12, 0.12].map((x, i) => (
          <mesh key={i} position={[x, 0.48, 0]} castShadow>
            <boxGeometry args={[0.16, 0.68, 0.16]} />
            <meshStandardMaterial color={pantsColor} roughness={0.7} />
          </mesh>
        ))}

        {/* === TORSO === */}
        <mesh position={[0, 1.13, 0]} castShadow>
          <boxGeometry args={[0.48, 0.62, 0.28]} />
          <meshStandardMaterial color={jacketColor} roughness={0.5} />
        </mesh>

        {/* === NECK === */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.12, 0.14, 10]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>

        {/* === LEFT ARM — relaxed === */}
        <group ref={leftArmRef} position={[-0.31, 1.28, 0]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <boxGeometry args={[0.14, 0.44, 0.14]} />
            <meshStandardMaterial color={jacketColor} roughness={0.5} />
          </mesh>
          <mesh position={[0, -0.46, 0]} castShadow>
            <boxGeometry args={[0.11, 0.1, 0.11]} />
            <meshStandardMaterial color={skinColor} roughness={0.5} />
          </mesh>
        </group>

        {/* === RIGHT ARM — waving === */}
        <group ref={rightArmRef} position={[0.18, 1.30, 0]}>
          {/* Full arm as one piece — same size as left arm */}
          <mesh position={[0, -0.2, 0]} castShadow>
            <boxGeometry args={[0.14, 0.44, 0.14]} />
            <meshStandardMaterial color={jacketColor} roughness={0.5} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.46, 0]} castShadow>
            <boxGeometry args={[0.11, 0.1, 0.11]} />
            <meshStandardMaterial color={skinColor} roughness={0.5} />
          </mesh>
        </group>

          {/* === HEAD === */}
        <group ref={headRef} position={[0, 1.82, 0]}>
          <RoundedBox args={[0.62, 0.62, 0.58]} radius={0.18} smoothness={4} castShadow>
            <meshStandardMaterial color={skinColor} roughness={0.4} />
          </RoundedBox>

          {/* === HAIR === */}
          {/* Hair cap - hugs the top of the head */}
          <RoundedBox args={[0.66, 0.36, 0.62]} radius={0.18} smoothness={6} position={[0, 0.22, -0.01]} castShadow>
            <meshStandardMaterial color={hairColor} roughness={0.8} />
          </RoundedBox>

          {/* === FACE === */}
          {/* Left eye */}
          <group position={[-0.12, -0.02, fz]}>
            <mesh>
              <circleGeometry args={[0.065, 16]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0, -0.005, 0.001]}>
              <circleGeometry args={[0.048, 14]} />
              <meshStandardMaterial color="#2a1a0a" />
            </mesh>
            <mesh position={[0, -0.005, 0.002]}>
              <circleGeometry args={[0.025, 12]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[0.018, 0.015, 0.003]}>
              <circleGeometry args={[0.015, 8]} />
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[-0.01, -0.015, 0.003]}>
              <circleGeometry args={[0.008, 8]} />
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
            </mesh>
          </group>

          {/* Right eye */}
          <group position={[0.12, -0.02, fz]}>
            <mesh>
              <circleGeometry args={[0.065, 16]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0, -0.005, 0.001]}>
              <circleGeometry args={[0.048, 14]} />
              <meshStandardMaterial color="#2a1a0a" />
            </mesh>
            <mesh position={[0, -0.005, 0.002]}>
              <circleGeometry args={[0.025, 12]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[0.018, 0.015, 0.003]}>
              <circleGeometry args={[0.015, 8]} />
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[-0.01, -0.015, 0.003]}>
              <circleGeometry args={[0.008, 8]} />
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
            </mesh>
          </group>

          {/* Eyebrows */}
          <mesh position={[-0.12, 0.06, fz]} rotation={[0, 0, 0.08]}>
            <planeGeometry args={[0.07, 0.016]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          <mesh position={[0.12, 0.06, fz]} rotation={[0, 0, -0.08]}>
            <planeGeometry args={[0.07, 0.016]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>

          {/* Nose */}
          <mesh position={[0, -0.08, fz]}>
            <circleGeometry args={[0.012, 6]} />
            <meshStandardMaterial color="#dbb088" />
          </mesh>

          {/* Smile */}
          <mesh position={[0, -0.15, fz]} rotation={[Math.PI, 0, 0]}>
            <torusGeometry args={[0.05, 0.008, 6, 14, Math.PI]} />
            <meshStandardMaterial color="#c4705a" />
          </mesh>
          {/* Teeth */}
          <mesh position={[0, -0.16, fz]}>
            <planeGeometry args={[0.07, 0.025]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>

          {/* Rosy cheeks */}
          <mesh position={[-0.19, -0.08, fz]}>
            <circleGeometry args={[0.035, 12]} />
            <meshStandardMaterial color="#f5a0a0" transparent opacity={0.35} />
          </mesh>
          <mesh position={[0.19, -0.08, fz]}>
            <circleGeometry args={[0.035, 12]} />
            <meshStandardMaterial color="#f5a0a0" transparent opacity={0.35} />
          </mesh>

          {/* Ears */}
          <mesh position={[-0.33, -0.04, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color={skinColor} roughness={0.4} />
          </mesh>
          <mesh position={[0.33, -0.04, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color={skinColor} roughness={0.4} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

export default Avatar;
