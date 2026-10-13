import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { MapPin } from "lucide-react";
import { gsap, ScrollTrigger } from "../../lib/scroll";
import SectionHeader from "../SectionHeader";
import { experiences } from "../../data/experiences";

const pad = (n) => String(n).padStart(2, "0");

const ExperienceSection = () => {
  const root = useRef(null);
  const line = useRef(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Timeline spine draws as you scroll through the list
        gsap.fromTo(
          line.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: { trigger: "[data-exp-list]", start: "top 60%", end: "bottom 60%", scrub: true },
          }
        );

        gsap.utils.toArray("[data-exp-row]").forEach((row, i) => {
          // Focus effect: rows glow when they cross the middle of the viewport, dim otherwise
          gsap.fromTo(
            row,
            { opacity: 0.35 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: { trigger: row, start: "top 80%", end: "top 45%", scrub: true },
            }
          );
          ScrollTrigger.create({
            trigger: row,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => self.isActive && setActive(i),
          });
          gsap.from(row.querySelectorAll("[data-exp-part]"), {
            y: 30,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: row, start: "top 82%", once: true },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="experience" ref={root} className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[110rem]">
        <SectionHeader index="01" label="Career" title="Experience" />

        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,2.1fr)] md:gap-20">
          {/* Sticky ticker */}
          <aside className="hidden md:block">
            <div className="sticky top-32">
              <p className="eyebrow mb-3">Now showing</p>
              <p className="font-display text-[clamp(5rem,9vw,9rem)] leading-none text-fg">
                {pad(active + 1)}
                <span className="text-muted">/{pad(experiences.length)}</span>
              </p>
              <p className="mt-6 max-w-[18rem] text-balance text-lg leading-snug text-fg">
                {experiences[active].company}
              </p>
              <p className="eyebrow mt-3">{experiences[active].period}</p>
            </div>
          </aside>

          <div data-exp-list className="relative">
            <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-line md:-left-10">
              <div ref={line} className="h-full w-full bg-accent" style={{ transform: "scaleY(0)" }} />
            </div>

            <ol className="space-y-16 pl-6 md:space-y-24 md:pl-0">
              {experiences.map((exp, index) => (
                <li key={`${exp.company}-${exp.period}`} data-exp-row className="relative">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[1.85rem] top-2 h-2.5 w-2.5 rounded-full border-2 border-accent transition-colors duration-500 md:-left-[2.65rem] ${
                      active === index ? "bg-accent" : "bg-bg"
                    }`}
                  />
                  <p data-exp-part className="eyebrow mb-3">
                    {exp.period}
                  </p>
                  <h3 data-exp-part className="font-display mb-2 text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.02] text-fg">
                    {exp.title}
                  </h3>
                  <div data-exp-part className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-muted">
                    <span className="text-base text-fg">{exp.company}</span>
                    {exp.location && (
                      <span className="flex items-center gap-1 text-sm">
                        <MapPin size={13} />
                        {exp.location}
                      </span>
                    )}
                  </div>
                  <ul data-exp-part className="mb-6 max-w-2xl space-y-2.5 text-[0.95rem] leading-relaxed text-muted">
                    {exp.description.map((line) => (
                      <li key={line} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
                        {line}
                      </li>
                    ))}
                  </ul>
                  <div data-exp-part className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
