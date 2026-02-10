import React from "react";
import { useAchievements } from "../../hooks/useAchievements";

const ProgressBar = () => {
  const { progress } = useAchievements();

  if (progress === 0) return null;

  return (
    <div className="absolute top-0 left-0 right-0 z-20">
      <div className="w-full h-1 bg-gray-200/30">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
