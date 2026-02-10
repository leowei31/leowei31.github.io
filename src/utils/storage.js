const STORAGE_KEY = "portfolio_achievements";

export const loadAchievements = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const saveAchievements = (unlockedIds) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(unlockedIds));
  } catch {
    // localStorage might be full or unavailable
  }
};

export const clearAchievements = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
};
