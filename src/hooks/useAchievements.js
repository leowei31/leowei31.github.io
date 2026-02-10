import { useContext } from "react";
import { AchievementContext } from "../context/AchievementContext";

export const useAchievements = () => {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error("useAchievements must be used within AchievementProvider");
  }
  return context;
};
