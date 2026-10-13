import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, PerformanceMonitor, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing";
import { ACESFilmicToneMapping } from "three";
import { ToneMappingMode } from "postprocessing";
import { CelSetup } from "./cel";
import Outlines from "./Outlines";
import { NightContext } from "./night";
import { DESK, ROOM } from "./layout";
import LightRig from "./LightRig";
import CameraRig from "./CameraRig";
import RoomShell from "./RoomShell";
import Desk from "./Desk";
import Monitor from "./Monitor";
import Chair from "./Chair";
import Bookshelf from "./Bookshelf";
import AwardShelf from "./AwardShelf";
import WindowView from "./WindowView";
import CoffeeMug from "./CoffeeMug";
import DeskLamp from "./DeskLamp";
import Plant from "./Plant";
import RobotToy from "./RobotToy";
import Avatar from "./Avatar";
import {
  DrawerUnit,
  FloorPlant,
  Headphones,
  PortraitFrame,
  Poster,
  Speaker,
  StringLights,
  WallClock,
} from "./Decor";

/**
 * The hero scene. The camera is driven by `progressRef` (hero scroll progress),
 * lighting follows `isNight` (the site-wide theme), and objects report clicks upward.
 * `quality` ("high" | "low") trims shadow resolution and pixel ratio for touch devices, and a
 * PerformanceMonitor drops post-processing if the frame rate sags.
 */
const DevRoom = ({ onObjectClick, isVisible, isNight, progressRef, quality = "high" }) => {
  const [lampOn, setLampOn] = useState(true);
  const [degraded, setDegraded] = useState(false);
  const nightRef = useRef(isNight ? 1 : 0);
  const low = quality === "low";
  const backZ = ROOM.backZ + 0.03;

  return (
    <Canvas
      shadows
      dpr={degraded ? 1 : low ? [1, 1.5] : [1, 1.75]}
      camera={{ position: [0, 4.6, 9.6], fov: 38, near: 0.1, far: 80 }}
      frameloop={isVisible ? "always" : "never"}
      gl={{ antialias: degraded || low, powerPreference: "high-performance", toneMapping: ACESFilmicToneMapping, alpha: true }}
      style={{ background: "transparent", touchAction: "pan-y" }}
    >
      <CelSetup />
      <PerformanceMonitor onDecline={() => setDegraded(true)} />
      <NightContext.Provider value={nightRef}>
        <CameraRig progressRef={progressRef} />
        <LightRig isNight={isNight} shadowSize={low ? 1024 : 2048} />

        <Outlines enabled={!degraded} pixels={1.4} />
        <RoomShell />
        <StringLights />
        <WallClock position={[-2.15, 3.6, backZ]} />
        <PortraitFrame position={[-2.15, 2.62, backZ]} />
        <Poster kind="rocket" position={[-ROOM.width / 2 + 0.03, 2.7, -1.5]} facing={1} />
        <Poster kind="chart" position={[-ROOM.width / 2 + 0.03, 2.7, -0.2]} facing={1} />
        <Poster kind="network" position={[ROOM.width / 2 - 0.03, 2.7, -1.2]} facing={-1} />

        <Desk onNameClick={() => onObjectClick?.("experience")} />
        <DrawerUnit />
        <Monitor onClick={() => onObjectClick?.("projects")} lowPower={low} />
        <Speaker position={[-1.12, DESK.top, DESK.z - 0.35]} />
        <Speaker position={[1.12, DESK.top, DESK.z - 0.35]} />
        <Headphones position={[0.62, DESK.top, DESK.z - 0.3]} />
        <Chair position={[-0.75, 0, -1.35]} rotation={[0, 0.5, 0]} />
        <CoffeeMug onClick={() => onObjectClick?.("coffee")} />
        <DeskLamp
          isOn={lampOn}
          onToggle={() => {
            setLampOn((prev) => !prev);
            onObjectClick?.("lamp");
          }}
        />
        <Plant onClick={() => onObjectClick?.("plant")} />
        <Bookshelf onClick={() => onObjectClick?.("skills")} />
        <AwardShelf onClick={() => onObjectClick?.("academics")} />
        <WindowView isNight={isNight} onToggle={() => onObjectClick?.("window")} />
        <RobotToy onClick={() => onObjectClick?.("extracurricular")} position={[-2.1, 0, -0.5]} scale={1.15} />
        <Avatar position={[2.3, 0, -0.7]} scale={1.08} lowDetail={low} faceCamera />
        <FloorPlant position={[ROOM.width / 2 - 0.5, 0, -2.6]} />

        <ContactShadows
          position={[0, 0.03, -0.4]}
          scale={[ROOM.width, 5.7]}
          opacity={0.45}
          blur={2.4}
          far={3}
          frames={1}
          resolution={low ? 512 : 1024}
        />
        <Sparkles count={low ? 18 : 40} size={2} scale={[8, 4, 5]} position={[0, 2.5, -0.5]} speed={0.25} opacity={0.25} />

        {!degraded && (
          <EffectComposer multisampling={4} disableNormalPass>
            <Bloom mipmapBlur luminanceThreshold={1} luminanceSmoothing={0.2} intensity={0.55} />
            <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
          </EffectComposer>
        )}
      </NightContext.Provider>
    </Canvas>
  );
};

export default DevRoom;
