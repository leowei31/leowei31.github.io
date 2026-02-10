import React, { useState } from "react";
import { Trophy, X } from "lucide-react";
import { ACHIEVEMENTS, TOTAL_POINTS } from "../../data/achievements";
import { useAchievements } from "../../hooks/useAchievements";
import AchievementBadge from "./AchievementBadge";

const AchievementPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { unlockedIds, progress, totalPoints, resetProgress } =
    useAchievements();

  return (
    <>
      {/* Trophy button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      >
        <Trophy size={22} />
        {unlockedIds.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unlockedIds.length}
          </span>
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[70] transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Panel drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-[80] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-amber-400 to-amber-500 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Trophy size={24} />
                Achievements
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Progress bar */}
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>
                  {unlockedIds.length} / {Object.keys(ACHIEVEMENTS).length}{" "}
                  unlocked
                </span>
                <span>
                  {totalPoints} / {TOTAL_POINTS} pts
                </span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-2.5">
                <div
                  className="bg-white rounded-full h-2.5 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Achievement list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {Object.values(ACHIEVEMENTS).map((achievement) => (
              <AchievementBadge
                key={achievement.id}
                achievement={achievement}
                unlocked={unlockedIds.includes(achievement.id)}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            <button
              onClick={() => {
                if (window.confirm("Reset all achievements? This cannot be undone.")) {
                  resetProgress();
                }
              }}
              className="w-full py-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              Reset Progress
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AchievementPanel;
