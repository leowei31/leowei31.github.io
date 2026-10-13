import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, getScrollVelocity } from "../../lib/scroll";
import SectionHeader from "../SectionHeader";
import { skills } from "../../data/skills";

const BASE_SPEED = 3.2; // % of one copy per second
const VELOCITY_GAIN = 0.55;

/** The words of one category, set in oversized type; alternate words are outlined. */
const Words = ({ items, hidden = false }) => (
  <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
    {items.map((item, i) => (
      <span key={item} className="flex items-center">
        <span
          className={`font-display whitespace-nowrap px-6 text-[clamp(3.5rem,8vw,7.5rem)] leading-[1.1] md:px-10 ${
            i % 2 ? "text-outline" : "text-fg"
          }`}
        >
          {item}
        </span>
        <span aria-hidden="true" className="text-2xl text-accent">
          &#10022;
        </span>
      </span>
    ))}
  </div>
);

/**
 * Infinite marquee whose speed (and direction) reacts to the page's scroll velocity,
 * read from Lenis. Rows alternate direction.
 */
const MarqueeRow = ({ category, items, reverse }) => {
  const track = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let x = reverse ? -50 : 0;
        let heading = reverse ? 1 : -1; // direction of travel, flipped by scroll direction
        const setX = gsap.quickSetter(track.current, "xPercent");

        const tick = (_, deltaMs) => {
          const v = getScrollVelocity();
          if (Math.abs(v) > 0.05) heading = (reverse ? 1 : -1) * Math.sign(v);
          const speed = BASE_SPEED + Math.abs(v) * VELOCITY_GAIN;
          x += heading * speed * (deltaMs / 1000) * 0.5;
          // Two identical copies side by side: wrap at half the track width (50%)
          if (x <= -50) x += 50;
          if (x > 0) x -= 50;
          setX(x);
        };
        gsap.ticker.add(tick);
        return () => gsap.ticker.remove(tick);
      });
    },
    { scope: track }
  );

  return (
    <div className="py-3 md:py-5">
      <p className="eyebrow mb-1 px-6 md:px-12">
        {category} <span className="text-accent">/ {String(items.length).padStart(2, "0")}</span>
      </p>
      <div className="overflow-hidden">
        <div ref={track} className="flex w-max will-change-transform">
          <Words items={items} />
          <Words items={items} hidden />
        </div>
      </div>
    </div>
  );
};

const SkillsSection = () => (
  <section id="skills" className="relative overflow-hidden py-28 md:py-40">
    <div className="mx-auto max-w-[110rem] px-6 md:px-12">
      <SectionHeader index="05" label="Toolbox" title="Skills" />
    </div>
    <div>
      {skills.map((group, i) => (
        <MarqueeRow key={group.category} category={group.category} items={group.items} reverse={i % 2 === 1} />
      ))}
    </div>
  </section>
);

export default SkillsSection;
