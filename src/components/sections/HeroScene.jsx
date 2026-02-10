import React, { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, ChevronDown, MousePointer } from "lucide-react";
import DevRoom from "../three/DevRoom";
import AboutFallback from "./AboutFallback";
import { useDeviceCapability } from "../../hooks/useDeviceCapability";
import ProgressBar from "../gamification/ProgressBar";

const HeroScene = ({ onSectionNavigate }) => {
  const { canRender3D } = useDeviceCapability();
  const [isVisible, setIsVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const sectionRef = useRef(null);

  // IntersectionObserver to pause rendering when off-screen
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleObjectClick = (objectId, extra) => {
    setHasInteracted(true);
    onSectionNavigate?.(objectId, extra);
  };

  if (!canRender3D) {
    return <AboutFallback />;
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative h-screen snap-start z-10"
    >
      {/* 3D Canvas - full screen */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-blue-100">
        <DevRoom onObjectClick={handleObjectClick} isVisible={isVisible} />
      </div>

      {/* Overlay UI */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <div className="text-center pb-8 md:pb-12">
          {/* Name and tagline */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-2 drop-shadow-sm">
            Leo Wei
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6 drop-shadow-sm">
            Passionate about creating things that make a difference.
          </p>

          {/* Social links */}
          <div className="flex justify-center space-x-4 mb-6 pointer-events-auto">
            <a
              href="https://github.com/leowei31/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-900/80 text-white rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg backdrop-blur-sm"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/leo-wei/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-blue-600/80 text-white rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg backdrop-blur-sm"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:hanzhe.wei@ucalgary.ca"
              className="p-3 bg-green-600/80 text-white rounded-full hover:bg-green-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg backdrop-blur-sm"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce">
            <ChevronDown className="mx-auto text-gray-400" size={28} />
          </div>
        </div>
      </div>

      {/* Achievement progress bar */}
      <ProgressBar />

      {/* Explore prompt - fades after first interaction */}
      {!hasInteracted && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none transition-opacity duration-1000">
          <div className="flex items-center gap-2 bg-black/60 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
            <MousePointer size={16} />
            <span>Click & drag to explore the room</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroScene;
