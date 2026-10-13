import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { gsap } from "../../lib/scroll";

gsap.registerPlugin(useGSAP, SplitText);

/**
 * Masked word-by-word headline reveal, triggered when it scrolls into view.
 * Re-splits automatically on resize / font load (SplitText autoSplit).
 * Pass `immediate` to play on mount instead (hero).
 */
const SplitReveal = ({ as: Tag = "div", children, className = "", delay = 0, immediate = false, stagger = 0.07 }) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        SplitText.create(ref.current, {
          type: "lines,words",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              yPercent: 115,
              duration: 1.2,
              ease: "expo.out",
              stagger,
              delay,
              scrollTrigger: immediate
                ? undefined
                : { trigger: ref.current, start: "top 88%", once: true },
            }),
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

export default SplitReveal;
