import { createContext, useCallback, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "portfolio_theme";
const ThemeContext = createContext(null);

const readInitial = () => {
  // index.html sets data-theme before first paint; trust it.
  const attr = document.documentElement.dataset.theme;
  return attr === "dark" ? "dark" : "light";
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(readInitial);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#0b0b0d" : "#f3f0e9");
  }, [theme]);

  const setTheme = useCallback((next) => {
    setThemeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage unavailable
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, isNight: theme === "dark", setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
