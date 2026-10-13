import { useState, useRef } from "react";
import { Html, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

/**
 * Wraps a clickable scene object: pointer cursor, hover lift and a floating label.
 * Pointer events are stopped so objects behind it don't also fire.
 */
const RoomObject = ({ children, onClick, label, baseY = 0, hoverLift = 0.06, labelOffset }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef();
  useCursor(hovered);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const targetY = hovered ? baseY + hoverLift : baseY;
    ref.current.position.y = MathUtils.damp(ref.current.position.y, targetY, 10, delta);
  });

  return (
    <group
      ref={ref}
      position-y={baseY}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      {children}
      {hovered && label && (
        <Html center position={labelOffset} zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
          <div className="whitespace-nowrap rounded-full bg-fg px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-bg shadow-xl">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
};

export default RoomObject;
