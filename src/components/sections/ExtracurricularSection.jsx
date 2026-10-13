import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/scroll";
import SectionHeader from "../SectionHeader";
import CountUp from "../motion/CountUp";
import { extracurriculars } from "../../data/extracurriculars";

const ACCENTS = {
  blue: "#5b8cff",
  orange: "#ff6b3d",
  green: "#3ecf8e",
  purple: "#a78bfa",
};

/**
 * Stacked cards: each one sticks near the top and the previous card recedes
 * (scales down and dims) as the next slides over it.
 */
const ExtracurricularSection = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray("[data-stack-card]");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          const scrollTrigger = { trigger: next, start: "top 85%", end: "top 18%", scrub: true };
          gsap.to(card.firstElementChild, { scale: 0.92, ease: "none", scrollTrigger });
          gsap.to(card.querySelector("[data-stack-dim]"), { opacity: 0.6, ease: "none", scrollTrigger });
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="extracurricular" ref={root} className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[110rem]">
        <SectionHeader index="03" label="Beyond the classroom" title="Activities" />

        <div>
          {extracurriculars.map((item, i) => {
            const color = ACCENTS[item.accent] ?? ACCENTS.orange;
            return (
              <div
                key={item.title}
                data-stack-card
                className="sticky mb-6 md:mb-10"
                style={{ top: `calc(11vh + ${i * 18}px)` }}
              >
                <div className="relative origin-top rounded-[1.75rem] border border-line bg-bg-elev p-7 shadow-xl md:p-12">
                  <div
                    data-stack-dim
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[inherit] bg-bg opacity-0"
                  />
                  <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-16">
                    <div>
                      <p className="eyebrow mb-6">
                        {String(i + 1).padStart(2, "0")} - {item.organization}
                      </p>
                      <div className="font-display text-[clamp(4.5rem,11vw,10rem)] leading-[0.9]" style={{ color }}>
                        <CountUp value={item.stat} />
                      </div>
                      <p className="eyebrow mt-3">{item.statLabel}</p>
                    </div>
                    <div className="flex flex-col justify-end">
                      <h3 className="font-display mb-5 text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.05] text-fg">
                        {item.title}
                      </h3>
                      <p className="mb-5 max-w-xl text-base leading-relaxed text-muted">{item.description}</p>
                      <p className="max-w-xl border-l-2 pl-4 text-sm leading-relaxed text-fg" style={{ borderColor: color }}>
                        {item.impact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExtracurricularSection;
