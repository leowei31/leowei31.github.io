import { createContext, useContext } from "react";

/**
 * Shared, smoothly animated "night factor" (0 = day, 1 = night).
 * It is a ref so scene objects can read it every frame without re-rendering.
 */
export const NightContext = createContext({ current: 0 });

export const useNight = () => useContext(NightContext);
