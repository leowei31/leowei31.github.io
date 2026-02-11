import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import RoomObject from "./RoomObject";

const RobotToy = ({ onClick }) => {
  const headRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const visorRef = useRef();
  const antennaLightRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    // Head scans side to side
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.6) * 0.4;
      headRef.current.rotation.x = Math.sin(t * 0.3) * 0.05;
    }

    // Arms sway gently, offset from each other
    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(t * 0.8) * 0.15 - 0.1;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = Math.sin(t * 0.8 + Math.PI) * 0.15 - 0.1;
    }

    // Visor glow pulses
    if (visorRef.current) {
      visorRef.current.material.emissiveIntensity = 0.6 + Math.sin(t * 2) * 0.3;
    }

    // Antenna light blinks
    if (antennaLightRef.current) {
      antennaLightRef.current.material.emissiveIntensity =
        Math.sin(t * 4) > 0.3 ? 1.5 : 0.2;
    }
  });

  return (
    <RoomObject onClick={onClick} label="View Activities" baseY={0} hoverLift={0}>
      <group position={[-2.0, 0, -0.8]}>

        {/* === TRACKED BASE === */}
        {/* Main chassis */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <boxGeometry args={[0.45, 0.1, 0.35]} />
          <meshStandardMaterial color="#37474f" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Track housings */}
        {[-0.25, 0.25].map((x, i) => (
          <group key={i}>
            <mesh position={[x, 0.1, 0]} castShadow>
              <boxGeometry args={[0.06, 0.16, 0.4]} />
              <meshStandardMaterial color="#263238" metalness={0.6} roughness={0.4} />
            </mesh>
            {/* Track wheels */}
            {[-0.15, 0, 0.15].map((z, j) => (
              <mesh key={j} position={[x, 0.06, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.06, 0.06, 0.04, 10]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
              </mesh>
            ))}
            {/* Track rubber band */}
            <mesh position={[x, 0.06, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.065, 0.065, 0.035, 10]} />
              <meshStandardMaterial color="#222" roughness={1} transparent opacity={0.5} />
            </mesh>
          </group>
        ))}
        {/* Chassis accent stripe */}
        <mesh position={[0, 0.17, 0.176]}>
          <boxGeometry args={[0.35, 0.03, 0.003]} />
          <meshStandardMaterial color="#ff6f00" emissive="#ff6f00" emissiveIntensity={0.3} />
        </mesh>

        {/* === TORSO === */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[0.32, 0.22, 0.28]} />
          <meshStandardMaterial color="#455a64" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Chest panel */}
        <mesh position={[0, 0.32, 0.141]}>
          <boxGeometry args={[0.2, 0.12, 0.003]} />
          <meshStandardMaterial color="#1a237e" metalness={0.3} roughness={0.5} />
        </mesh>
        {/* Chest display - status lights */}
        {[-0.06, -0.02, 0.02, 0.06].map((x, i) => (
          <mesh key={i} position={[x, 0.34, 0.144]}>
            <sphereGeometry args={[0.012, 6, 6]} />
            <meshStandardMaterial
              color={["#4caf50", "#4fc3f7", "#ffeb3b", "#4caf50"][i]}
              emissive={["#4caf50", "#4fc3f7", "#ffeb3b", "#4caf50"][i]}
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
        {/* Side vents */}
        {[-1, 1].map((side, i) => (
          <group key={i}>
            {[0, 0.03, 0.06].map((yOff, j) => (
              <mesh key={j} position={[side * 0.161, 0.27 + yOff, 0]}>
                <boxGeometry args={[0.003, 0.015, 0.18]} />
                <meshStandardMaterial color="#37474f" metalness={0.8} roughness={0.2} />
              </mesh>
            ))}
          </group>
        ))}
        {/* Shoulder joints */}
        {[-0.2, 0.2].map((x, i) => (
          <mesh key={i} position={[x, 0.38, 0]} castShadow>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#546e7a" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}

        {/* === LEFT ARM === */}
        <group ref={leftArmRef} position={[-0.2, 0.34, 0]}>
          {/* Upper arm */}
          <mesh position={[-0.04, -0.06, 0]} castShadow>
            <boxGeometry args={[0.06, 0.14, 0.06]} />
            <meshStandardMaterial color="#546e7a" metalness={0.6} roughness={0.3} />
          </mesh>
          {/* Elbow joint */}
          <mesh position={[-0.04, -0.14, 0]} castShadow>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#607d8b" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Forearm */}
          <mesh position={[-0.04, -0.22, 0]} castShadow>
            <boxGeometry args={[0.05, 0.12, 0.05]} />
            <meshStandardMaterial color="#607d8b" metalness={0.6} roughness={0.3} />
          </mesh>
          {/* Gripper */}
          {[-0.02, 0.02].map((z, i) => (
            <mesh key={i} position={[-0.04, -0.3, z]} castShadow>
              <boxGeometry args={[0.025, 0.04, 0.015]} />
              <meshStandardMaterial color="#78909c" metalness={0.7} roughness={0.2} />
            </mesh>
          ))}
        </group>

        {/* === RIGHT ARM === */}
        <group ref={rightArmRef} position={[0.2, 0.34, 0]}>
          {/* Upper arm */}
          <mesh position={[0.04, -0.06, 0]} castShadow>
            <boxGeometry args={[0.06, 0.14, 0.06]} />
            <meshStandardMaterial color="#546e7a" metalness={0.6} roughness={0.3} />
          </mesh>
          {/* Elbow joint */}
          <mesh position={[0.04, -0.14, 0]} castShadow>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#607d8b" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Forearm */}
          <mesh position={[0.04, -0.22, 0]} castShadow>
            <boxGeometry args={[0.05, 0.12, 0.05]} />
            <meshStandardMaterial color="#607d8b" metalness={0.6} roughness={0.3} />
          </mesh>
          {/* Gripper */}
          {[-0.02, 0.02].map((z, i) => (
            <mesh key={i} position={[0.04, -0.3, z]} castShadow>
              <boxGeometry args={[0.025, 0.04, 0.015]} />
              <meshStandardMaterial color="#78909c" metalness={0.7} roughness={0.2} />
            </mesh>
          ))}
        </group>

        {/* === NECK === */}
        <mesh position={[0, 0.44, 0]} castShadow>
          <cylinderGeometry args={[0.035, 0.04, 0.04, 8]} />
          <meshStandardMaterial color="#546e7a" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* === HEAD === */}
        <group ref={headRef} position={[0, 0.52, 0]}>
          {/* Main head */}
          <mesh castShadow>
            <boxGeometry args={[0.26, 0.14, 0.2]} />
            <meshStandardMaterial color="#546e7a" metalness={0.5} roughness={0.3} />
          </mesh>
          {/* Visor / face screen */}
          <mesh ref={visorRef} position={[0, -0.005, 0.101]}>
            <boxGeometry args={[0.2, 0.08, 0.003]} />
            <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.6} transparent opacity={0.9} />
          </mesh>
          {/* Eye shapes on visor */}
          <mesh position={[-0.045, 0, 0.104]}>
            <boxGeometry args={[0.04, 0.025, 0.002]} />
            <meshStandardMaterial color="#fff" emissive="#ffffff" emissiveIntensity={1.2} />
          </mesh>
          <mesh position={[0.045, 0, 0.104]}>
            <boxGeometry args={[0.04, 0.025, 0.002]} />
            <meshStandardMaterial color="#fff" emissive="#ffffff" emissiveIntensity={1.2} />
          </mesh>
          {/* Head top plate */}
          <mesh position={[0, 0.075, 0]} castShadow>
            <boxGeometry args={[0.22, 0.01, 0.17]} />
            <meshStandardMaterial color="#455a64" metalness={0.7} roughness={0.2} />
          </mesh>
          {/* Ear sensors */}
          {[-0.135, 0.135].map((x, i) => (
            <mesh key={i} position={[x, 0.01, 0]} castShadow>
              <boxGeometry args={[0.02, 0.08, 0.1]} />
              <meshStandardMaterial color="#37474f" metalness={0.6} roughness={0.3} />
            </mesh>
          ))}

          {/* === ANTENNA ARRAY === */}
          {/* Center antenna */}
          <mesh position={[0, 0.12, 0]} castShadow>
            <cylinderGeometry args={[0.008, 0.006, 0.08, 6]} />
            <meshStandardMaterial color="#78909c" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh ref={antennaLightRef} position={[0, 0.17, 0]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial color="#f44336" emissive="#f44336" emissiveIntensity={1.5} />
          </mesh>
          {/* Side antennas */}
          {[-0.06, 0.06].map((x, i) => (
            <group key={i}>
              <mesh position={[x, 0.1, 0]} rotation={[0, 0, x > 0 ? -0.2 : 0.2]} castShadow>
                <cylinderGeometry args={[0.005, 0.004, 0.05, 4]} />
                <meshStandardMaterial color="#90a4ae" metalness={0.8} roughness={0.2} />
              </mesh>
              <mesh position={[x + (x > 0 ? -0.005 : 0.005), 0.13, 0]}>
                <sphereGeometry args={[0.008, 6, 6]} />
                <meshStandardMaterial color="#ffab00" emissive="#ffab00" emissiveIntensity={0.6} />
              </mesh>
            </group>
          ))}
        </group>

        {/* === AMBIENT GLOW === */}
        <pointLight position={[0, 0.52, 0.25]} intensity={0.15} color="#00e5ff" distance={1.5} />
      </group>
    </RoomObject>
  );
};

export default RobotToy;
