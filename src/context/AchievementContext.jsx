import { createContext, useState, useCallback, useEffect, useRef } from "react";
import { ACHIEVEMENTS, INTERACTIVE_OBJECTS } from "../data/achievements";
import { loadAchievements, saveAchievements, clearAchievements } from "../utils/storage";

export const AchievementContext = createContext(null);

export const AchievementProvider = ({ children }) => {
  const [unlockedIds, setUnlockedIds] = useState(() => loadAchievements());
  const [recentUnlock, setRecentUnlock] = useState(null);
  const [interactedObjects, setInteractedObjects] = useState(new Set());
  const [visitedSections, setVisitedSections] = useState(new Set());
  const [plantClicks, setPlantClicks] = useState(0);
  const firstVisitTime = useRef(null);
  const toastTimeoutRef = useRef(null);

  // Persist to localStorage
  useEffect(() => {
    saveAchievements(unlockedIds);
  }, [unlockedIds]);

  const unlockAchievement = useCallback(
    (achievementId) => {
      if (unlockedIds.includes(achievementId)) return;
      if (!ACHIEVEMENTS[achievementId]) return;

      setUnlockedIds((prev) => {
        if (prev.includes(achievementId)) return prev;
        return [...prev, achievementId];
      });

      setRecentUnlock(ACHIEVEMENTS[achievementId]);

      // Clear previous timeout and set new auto-dismiss
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = setTimeout(() => setRecentUnlock(null), 4000);
    },
    [unlockedIds]
  );

  const trackObjectInteraction = useCallback(
    (objectId) => {
      setInteractedObjects((prev) => {
        const next = new Set(prev);
        next.add(objectId);

        // First click achievement
        if (prev.size === 0) {
          unlockAchievement("first_click");
        }

        // All objects achievement
        if (INTERACTIVE_OBJECTS.every((id) => next.has(id))) {
          unlockAchievement("all_objects");
        }

        return next;
      });
    },
    [unlockAchievement]
  );

  const trackSectionVisit = useCallback(
    (sectionId) => {
      // Start timer on first visit
      if (!firstVisitTime.current) {
        firstVisitTime.current = Date.now();
      }

      setVisitedSections((prev) => {
        const next = new Set(prev);
        next.add(sectionId);

        const allSections = [
          "about",
          "experience",
          "projects",
          "extracurricular",
          "academics",
          "skills",
        ];

        if (allSections.every((s) => next.has(s))) {
          unlockAchievement("deep_diver");

          // Speed reader check
          const elapsed = Date.now() - firstVisitTime.current;
          if (elapsed <= 60000) {
            unlockAchievement("speed_reader");
          }
        }

        return next;
      });
    },
    [unlockAchievement]
  );

  const trackPlantClick = useCallback(() => {
    setPlantClicks((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        unlockAchievement("green_thumb");
      }
      return next;
    });
  }, [unlockAchievement]);

  const resetProgress = useCallback(() => {
    setUnlockedIds([]);
    setInteractedObjects(new Set());
    setVisitedSections(new Set());
    setPlantClicks(0);
    firstVisitTime.current = null;
    clearAchievements();
  }, []);

  const dismissToast = useCallback(() => {
    setRecentUnlock(null);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
  }, []);

  const value = {
    unlockedIds,
    recentUnlock,
    unlockAchievement,
    trackObjectInteraction,
    trackSectionVisit,
    trackPlantClick,
    dismissToast,
    resetProgress,
    progress: (unlockedIds.length / Object.keys(ACHIEVEMENTS).length) * 100,
    totalPoints: unlockedIds.reduce(
      (sum, id) => sum + (ACHIEVEMENTS[id]?.points || 0),
      0
    ),
  };

  return (
    <AchievementContext.Provider value={value}>
      {children}
    </AchievementContext.Provider>
  );
};
