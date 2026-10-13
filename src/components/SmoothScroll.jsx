import { useEffect } from "react";
import { startSmoothScroll } from "../lib/scroll";
import { useReducedMotion } from "../hooks/useReducedMotion";

/** Mounts Lenis for the lifetime of the app (skipped for reduced motion). */
const SmoothScroll = () => {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    return startSmoothScroll();
  }, [reduced]);

  return null;
};

export default SmoothScroll;
