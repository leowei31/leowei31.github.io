import React, { useRef } from "react";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import RoomObject from "./RoomObject";

const codeLines = [
  "class Portfolio:",
  '  name = "Leo Wei"',
  '  role = "Software Engineer / ML Researcher"',
  "",
  "  def passion(self):",
  '    return "Building things that matter"',
  "",
  "# Click to see projects",
];

const MONITOR_TEXT_SIZE = 0.057;
const MONITOR_LINE_GAP = 0.069;

const Monitor = ({ onClick }) => {
  const textRef = useRef();
  const scrollRef = useRef(0);

  useFrame((_, delta) => {
    if (textRef.current) {
      scrollRef.current += delta * 0.3;
      const offset = Math.sin(scrollRef.current) * 0.04;
      textRef.current.position.y = 2.05 + offset;
    }
  });

  return (
    <RoomObject onClick={onClick} label="View Projects" baseY={1.0} hoverLift={0}>
      <group position={[0, -1.17, -0.45]}>
        {/* Monitor Bezel */}
        <mesh position={[0, 2.0, 0]} castShadow>
          <boxGeometry args={[1.4, 0.9, 0.05]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.3} metalness={0.5} />
        </mesh>

        {/* Screen */}
        <mesh position={[0, 2.0, 0.03]}>
          <planeGeometry args={[1.28, 0.78]} />
          <meshStandardMaterial color="#0d1117" emissive="#0d1117" emissiveIntensity={0.1} />
        </mesh>

        {/* Code text on screen */}
        <group ref={textRef} position={[0, 2.5, 0.04]}>
          {codeLines.map((line, i) => (
            <Text
              key={i}
              position={[-0.58, -i * MONITOR_LINE_GAP + 0.28, 0]}
              fontSize={MONITOR_TEXT_SIZE}
              color={
                line.includes("#")
                  ? "#6a9955"
                  : line.includes('"')
                    ? "#ce9178"
                    : line.includes("class") || line.includes("def") || line.includes("return") || line.includes("self")
                      ? "#569cd6"
                      : "#d4d4d4"
              }
              anchorX="left"
              anchorY="top"
              font={undefined}
            >
              {line}
            </Text>
          ))}
        </group>

        {/* Monitor Stand */}
        <mesh position={[0, 1.37, 0]} castShadow>
          <boxGeometry args={[0.1, 0.36, 0.08]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.5} roughness={0.3} />
        </mesh>

        {/* Monitor Base */}
        <mesh position={[0, 1.18, 0.1]} castShadow>
          <boxGeometry args={[0.4, 0.02, 0.25]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.5} roughness={0.3} />
        </mesh>

        {/* Screen glow */}
        <pointLight position={[0, 2.0, 0.3]} intensity={0.15} color="#4fc3f7" distance={2} />
      </group>
    </RoomObject>
  );
};

export default Monitor;
