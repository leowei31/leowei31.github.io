import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Sparkles } from "@react-three/drei";
import RoomShell from "./RoomShell";
import Desk from "./Desk";
import Monitor from "./Monitor";
import Bookshelf from "./Bookshelf";
import AwardShelf from "./AwardShelf";
import WindowView from "./WindowView";
import CoffeeMug from "./CoffeeMug";
import DeskLamp from "./DeskLamp";
import Plant from "./Plant";
import RobotToy from "./RobotToy";
import Avatar from "./Avatar";

const DevRoom = ({ onObjectClick, isVisible }) => {
  const [isNight, setIsNight] = useState(false);
  const [lampOn, setLampOn] = useState(true);
  const controlsRef = useRef();

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 3.5, 6], fov: 50 }}
      frameloop={isVisible ? "always" : "demand"}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <OrbitControls
        ref={controlsRef}
        autoRotate
        autoRotateSpeed={0.4}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 6}
        minDistance={3.5}
        maxDistance={8}
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.05}
        onStart={() => {
          if (controlsRef.current) {
            controlsRef.current.autoRotate = false;
          }
        }}
      />

      {/* Lighting */}
      <ambientLight intensity={isNight ? 0.12 : 0.25} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={isNight ? 0.18 : 0.4}
        color={isNight ? "#6b7a8f" : "#f2b16a"}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight
        position={[-2, 3, 0]}
        intensity={isNight ? 0.08 : 0.22}
        color={isNight ? "#a9b7c6" : "#ffd2a6"}
      />

      <Environment preset="sunset" />
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.4}
        blur={2}
        far={4}
      />

      {/* Ambient dust particles */}
      <Sparkles
        count={30}
        size={1.5}
        scale={[6, 4, 5]}
        position={[0, 2, 0]}
        speed={0.3}
        opacity={0.2}
      />

      {/* Room */}
      <RoomShell />

      {/* Furniture & Objects */}
      <group position={[0, 0, -0.5]}>
        <Desk onNameClick={() => onObjectClick?.("experience")} />
        <Monitor onClick={() => onObjectClick?.("projects")} />
        <CoffeeMug onClick={() => onObjectClick?.("coffee")} />
        <DeskLamp
          isOn={lampOn}
          onToggle={() => {
            setLampOn((prev) => !prev);
            onObjectClick?.("lamp");
          }}
        />
        <Plant onClick={() => onObjectClick?.("plant")} />
      </group>
      <Avatar />
      <RobotToy onClick={() => onObjectClick?.("extracurricular")} />
      <Bookshelf onClick={() => onObjectClick?.("skills")} />
      <AwardShelf onClick={() => onObjectClick?.("academics")} />
      <WindowView
        isNight={isNight}
        onToggle={() => {
          setIsNight((prev) => !prev);
          onObjectClick?.("window");
        }}
      />
    </Canvas>
  );
};

export default DevRoom;
