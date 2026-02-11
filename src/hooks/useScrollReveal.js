import { useEffect, useRef, useCallback } from "react";

/**
 * Scroll-triggered reveal animation hook.
 * Returns a ref callback — attach it to each item you want to animate.
 * Items get the `.visible` class staggered by `delay` ms each.
 */
export function useScrollReveal(delay = 100) {
  const elements = useRef([]);

  const ref = useCallback((node) => {
    if (node && !elements.current.includes(node)) {
      node.classList.add("reveal");
      elements.current.push(node);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = elements.current.indexOf(entry.target);
            const stagger = index * delay;
            entry.target.style.transitionDelay = `${stagger}ms`;
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    elements.current.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [delay]);

  return ref;
}
