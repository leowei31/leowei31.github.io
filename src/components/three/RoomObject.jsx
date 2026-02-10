import React, { useState, useRef } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const RoomObject = ({ children, onClick, label, baseY = 0, hoverLift = 0.08 }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      const targetY = hovered ? baseY + hoverLift : baseY;
      ref.current.position.y += (targetY - ref.current.position.y) * 0.1;
    }
  });

  return (
    <group
      ref={ref}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "default";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      {children}
      {hovered && label && (
        <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div className="bg-black/80 text-white px-3 py-1.5 rounded-full text-sm whitespace-nowrap font-medium shadow-lg">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
};

export default RoomObject;
