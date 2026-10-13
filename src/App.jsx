import { useEffect, useCallback } from "react";

import SmoothScroll from "./components/SmoothScroll";
import NavSidebar from "./components/NavSidebar";
import HeroScene from "./components/sections/HeroScene";
import ExperienceSection from "./components/sections/ExperienceSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ExtracurricularSection from "./components/sections/ExtracurricularSection";
import AcademicsSection from "./components/sections/AcademicsSection";
import SkillsSection from "./components/sections/SkillsSection";
import Footer from "./components/sections/Footer";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { useScrollSection } from "./hooks/useScrollSection";
import { ScrollTrigger } from "./lib/scroll";

// 3D room objects that simply jump to a section when clicked
const NAVIGATION_TARGETS = new Set([
  "experience",
  "projects",
  "skills",
  "academics",
  "extracurricular",
]);

const AppContent = () => {
  const { activeSection, scrollToSection } = useScrollSection();
  const { toggleTheme } = useTheme();

  // Pinned sections shift layout once images and fonts settle - re-measure then
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  // The lamp, mug and plant react on their own inside the scene
  const handleRoomInteraction = useCallback(
    (objectId) => {
      if (NAVIGATION_TARGETS.has(objectId)) scrollToSection(objectId);
      else if (objectId === "window") toggleTheme();
    },
    [scrollToSection, toggleTheme]
  );

  return (
    <>
      <SmoothScroll />
      <NavSidebar activeSection={activeSection} onNavigate={scrollToSection} onToggleTheme={toggleTheme} />

      <main className="relative z-10 rounded-b-[2rem] bg-bg shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] transition-colors duration-700 md:rounded-b-[3rem]">
        <HeroScene onObjectClick={handleRoomInteraction} onNavigate={scrollToSection} />
        <ExperienceSection />
        <ProjectsSection />
        <ExtracurricularSection />
        <AcademicsSection />
        <SkillsSection />
      </main>
      <Footer />
    </>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
