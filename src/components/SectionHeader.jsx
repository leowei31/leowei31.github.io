import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/scroll";
import SplitReveal from "./motion/SplitReveal";

/** Editorial section header: index + label rule on top, oversized serif title below. */
const SectionHeader = ({ index, label, title, className = "" }) => {
  const rule = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(rule.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: rule.current, start: "top 90%", once: true },
      });
    });
  });

  return (
    <header className={`mb-14 md:mb-20 ${className}`}>
      <div className="eyebrow mb-6 flex items-center gap-4">
        <span className="text-accent">{index}</span>
        <span ref={rule} className="h-px flex-1 bg-line" />
        <span>{label}</span>
      </div>
      <SplitReveal
        as="h2"
        className="font-display text-[clamp(3.5rem,11vw,9.5rem)] leading-[0.92] text-fg"
      >
        {title}
      </SplitReveal>
    </header>
  );
};

export default SectionHeader;
