import React, { useEffect, useState } from "react";
import { useAchievements } from "../../hooks/useAchievements";

const AchievementToast = () => {
  const { recentUnlock, dismissToast } = useAchievements();
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (recentUnlock) {
      setCurrent(recentUnlock);
      // Small delay to trigger CSS transition
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const timeout = setTimeout(() => setCurrent(null), 500);
      return () => clearTimeout(timeout);
    }
  }, [recentUnlock]);

  if (!current) return null;

  return (
    <div
      className={`fixed top-6 right-6 z-[60] transition-all duration-500 ${
        visible
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      }`}
    >
      <div
        className="bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-300 rounded-xl shadow-2xl p-4 max-w-xs cursor-pointer"
        onClick={dismissToast}
      >
        <div className="flex items-start gap-3">
          <div className="text-3xl flex-shrink-0">{current.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-0.5">
              Achievement Unlocked!
            </div>
            <div className="font-bold text-gray-900 text-sm">
              {current.name}
            </div>
            <div className="text-gray-600 text-xs mt-0.5">
              {current.description}
            </div>
          </div>
          <div className="text-amber-600 font-bold text-sm flex-shrink-0">
            +{current.points}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementToast;
