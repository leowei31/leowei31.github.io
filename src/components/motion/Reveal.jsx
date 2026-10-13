import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/scroll";

/**
 * Fades/slides its children up when scrolled into view.
 * With `selector`, the matching descendants are staggered instead of the wrapper.
 */
const Reveal = ({
  as: Tag = "div",
  children,
  className = "",
  selector,
  y = 40,
  delay = 0,
  stagger = 0.1,
  start = "top 85%",
}) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = selector ? ref.current.querySelectorAll(selector) : ref.current;
        gsap.from(targets, {
          y,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger,
          delay,
          scrollTrigger: { trigger: ref.current, start, once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

export default Reveal;
