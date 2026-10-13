import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// Mobile browser toolbars resize the viewport while scrolling; don't re-measure on every toolbar toggle
ScrollTrigger.config({ ignoreMobileResize: true });

// Single Lenis instance shared by the whole app. Created by <SmoothScroll />.
let lenis = null;

export const getLenis = () => lenis;

/** Current scroll velocity in px/frame-ish units (0 when Lenis is off). */
export const getScrollVelocity = () => (lenis ? lenis.velocity : 0);

export const scrollToTarget = (target, options = {}) => {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6, ...options });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

/**
 * Starts Lenis and wires it to GSAP's ticker so ScrollTrigger and Lenis share a
 * single clock. Returns a cleanup function.
 */
export const startSmoothScroll = () => {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
    lenis = null;
  };
};

export { gsap, ScrollTrigger };
