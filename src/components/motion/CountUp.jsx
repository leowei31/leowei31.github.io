import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/scroll";

const PATTERN = /^(\D*)([\d,]+(?:\.\d+)?)(.*)$/;

/** Counts a stat like "3,000 ft" or "20%" up from zero when it scrolls into view. */
const CountUp = ({ value, className = "" }) => {
  const ref = useRef(null);
  const match = PATTERN.exec(value);

  useGSAP(
    () => {
      if (!match) return;
      const [, , raw] = match;
      const end = parseFloat(raw.replace(/,/g, ""));
      const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
      const grouped = raw.includes(",");
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counter = { n: 0 };
        const format = (n) =>
          n.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
            useGrouping: grouped,
          });
        ref.current.textContent = match[1] + format(0) + match[3];
        gsap.to(counter, {
          n: end,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
          onUpdate: () => {
            ref.current.textContent = match[1] + format(counter.n) + match[3];
          },
        });
      });
    },
    { scope: ref, dependencies: [value] }
  );

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
};

export default CountUp;
