import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
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

const MIN_AZIMUTH = -Math.PI / 3;
const MAX_AZIMUTH = Math.PI / 3;
const AUTO_SWEEP_SPEED = 0.35;

const AutoCameraSweep = ({ controlsRef, enabledRef }) => {
  const directionRef = useRef(-1);

  useFrame((_, delta) => {
    if (!enabledRef.current || !controlsRef.current) return;

    const controls = controlsRef.current;
    const current = controls.getAzimuthalAngle();
    let next = current + directionRef.current * AUTO_SWEEP_SPEED * delta;

    if (next <= MIN_AZIMUTH) {
      next = MIN_AZIMUTH;
      directionRef.current = 1;
    } else if (next >= MAX_AZIMUTH) {
      next = MAX_AZIMUTH;
      directionRef.current = -1;
    }

    controls.setAzimuthalAngle(next);
    controls.update();
  });

  return null;
};

const DevRoom = ({ onObjectClick, isVisible }) => {
  const [isNight, setIsNight] = useState(false);
  const [lampOn, setLampOn] = useState(true);
  const controlsRef = useRef();
  const autoSweepEnabledRef = useRef(true);

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 3.4, 7], fov: 55 }}
      frameloop={isVisible ? "always" : "demand"}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <AutoCameraSweep
        controlsRef={controlsRef}
        enabledRef={autoSweepEnabledRef}
      />

      <OrbitControls
        ref={controlsRef}
        // Keep camera orbit on the front hemisphere so it never goes behind the back wall.
        minAzimuthAngle={MIN_AZIMUTH}
        maxAzimuthAngle={MAX_AZIMUTH}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 6}
        minDistance={3.5}
        maxDistance={8}
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.05}
        onStart={() => {
          autoSweepEnabledRef.current = false;
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
