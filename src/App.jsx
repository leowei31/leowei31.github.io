import { useEffect, useCallback } from "react";
import "./App.css";

import NavSidebar from "./components/NavSidebar";
import HeroScene from "./components/sections/HeroScene";
import ExperienceSection from "./components/sections/ExperienceSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ExtracurricularSection from "./components/sections/ExtracurricularSection";
import AcademicsSection from "./components/sections/AcademicsSection";
import SkillsSection from "./components/sections/SkillsSection";
import Footer from "./components/sections/Footer";
import { AchievementProvider } from "./context/AchievementContext";
import AchievementToast from "./components/gamification/AchievementToast";
import AchievementPanel from "./components/gamification/AchievementPanel";
import { useScrollSection } from "./hooks/useScrollSection";
import { useAchievements } from "./hooks/useAchievements";

// Konami code sequence
const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
];

const AppContent = () => {
  const { activeSection, scrollToSection } = useScrollSection();
  const {
    unlockAchievement,
    trackObjectInteraction,
    trackSectionVisit,
    trackPlantClick,
  } = useAchievements();

  // Track section visits on scroll
  useEffect(() => {
    trackSectionVisit(activeSection);
  }, [activeSection, trackSectionVisit]);

  // Konami code listener
  useEffect(() => {
    let position = 0;
    const handleKeyDown = (e) => {
      if (e.code === KONAMI_CODE[position]) {
        position++;
        if (position === KONAMI_CODE.length) {
          unlockAchievement("konami");
          position = 0;
        }
      } else {
        position = 0;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [unlockAchievement]);

  // Handle 3D room object clicks
  const handleRoomInteraction = useCallback(
    (objectId, extra) => {
      // Navigation objects
      const sectionMap = {
        experience: "experience",
        projects: "projects",
        skills: "skills",
        academics: "academics",
        extracurricular: "extracurricular",
      };

      if (sectionMap[objectId]) {
        scrollToSection(sectionMap[objectId]);
        trackObjectInteraction(objectId);
        return;
      }

      // Special interactions
      switch (objectId) {
        case "window":
          trackObjectInteraction("window");
          unlockAchievement("night_owl");
          break;
        case "lamp":
          trackObjectInteraction("lamp");
          unlockAchievement("mood_lighting");
          break;
        case "coffee":
          trackObjectInteraction("coffee");
          unlockAchievement("caffeine_boost");
          break;
        case "plant":
          trackObjectInteraction("plant");
          trackPlantClick();
          break;
      }
    },
    [
      scrollToSection,
      trackObjectInteraction,
      unlockAchievement,
      trackPlantClick,
    ]
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-y-auto overflow-x-hidden snap-y snap-mandatory box-border isolation-isolate">
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .scroll-fade {
          view-timeline-name: --section;
          view-timeline-axis: block;
          animation-name: fade-in-up;
          animation-timeline: --section;
          animation-duration: 1s;
          animation-fill-mode: both;
          animation-range: entry 0% cover 40%;
        }
      `}</style>

      <NavSidebar activeSection={activeSection} onNavigate={scrollToSection} />

      <HeroScene onSectionNavigate={handleRoomInteraction} />
      <ExperienceSection />
      <ProjectsSection />
      <ExtracurricularSection />
      <AcademicsSection />
      <SkillsSection />
      <Footer />

      <AchievementToast />
      <AchievementPanel />
    </div>
  );
};

const App = () => {
  return (
    <AchievementProvider>
      <AppContent />
    </AchievementProvider>
  );
};

export default App;
