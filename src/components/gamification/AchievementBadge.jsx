import React from "react";

const AchievementBadge = ({ achievement, unlocked }) => {
  return (
    <div
      className={`p-3 rounded-xl border transition-all duration-300 ${
        unlocked
          ? "bg-amber-50 border-amber-200 shadow-sm"
          : "bg-gray-50 border-gray-200 opacity-60"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`text-2xl ${unlocked ? "" : "grayscale"}`}>
          {unlocked ? achievement.icon : "?"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-gray-900">
            {unlocked ? achievement.name : "???"}
          </div>
          <div className="text-xs text-gray-500 truncate">
            {unlocked ? achievement.description : "Keep exploring..."}
          </div>
        </div>
        <div
          className={`text-xs font-bold ${
            unlocked ? "text-amber-600" : "text-gray-400"
          }`}
        >
          {achievement.points}pt
        </div>
      </div>
    </div>
  );
};

export default AchievementBadge;
