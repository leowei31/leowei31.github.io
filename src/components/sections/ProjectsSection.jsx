import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Github } from "lucide-react";
import { gsap } from "../../lib/scroll";
import SectionHeader from "../SectionHeader";
import { projects } from "../../data/projects";

const pad = (n) => String(n).padStart(2, "0");

const ProjectCard = ({ project, index }) => (
  <article
    data-project-card
    className="group relative flex h-full w-full shrink-0 flex-col overflow-hidden rounded-[1.75rem] border border-line bg-bg-elev md:max-w-3xl motion-safe:md:w-[min(64vh,37.7rem)] motion-safe:md:min-w-[24rem] motion-safe:md:max-w-none"
  >
    <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
      <img
        data-project-img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="absolute inset-y-0 -left-[8%] h-full w-[116%] max-w-none object-cover"
      />
      <span className="absolute left-4 top-4 rounded-full bg-bg/80 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-fg backdrop-blur-md">
        {project.category}
      </span>
      {index === 0 && (
        <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-accent-fg">
          Featured
        </span>
      )}
    </div>

    <div className="flex min-h-0 flex-1 flex-col p-6 md:p-7">
      <div className="mb-3 flex items-start justify-between gap-4">
        <h3 className="font-display text-[clamp(1.8rem,2.6vw,2.6rem)] leading-[1.05] text-fg">{project.title}</h3>
        <span className="font-mono text-xs text-muted">{pad(index + 1)}</span>
      </div>
      <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-muted">{project.description}</p>

      <div className="mt-auto flex flex-wrap items-end justify-between gap-4">
        <div className="flex max-h-[4.2rem] min-w-0 flex-1 flex-wrap gap-1.5 overflow-hidden">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="chip">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg transition-colors hover:bg-fg hover:text-bg"
            >
              <Github size={16} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-fg transition-transform hover:scale-110"
            >
              <ArrowUpRight size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  </article>
);

/**
 * Desktop: the section pins and vertical scroll drives a horizontal gallery, with the
 * images parallaxing inside their frames. Mobile: a plain vertical stack.
 */
const ProjectsSection = () => {
  const root = useRef(null);
  const track = useRef(null);
  const progress = useRef(null);
  const counter = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => Math.max(0, track.current.scrollWidth - window.innerWidth);

        const slide = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set(progress.current, { scaleX: self.progress });
              const i = Math.min(projects.length, Math.round(self.progress * (projects.length - 1)) + 1);
              counter.current.textContent = `${pad(i)} / ${pad(projects.length)}`;
            },
          },
        });

        gsap.utils.toArray("[data-project-card]").forEach((card) => {
          gsap.fromTo(
            card.querySelector("[data-project-img]"),
            { xPercent: -5 },
            {
              xPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: slide,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });
      });

      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        gsap.utils.toArray("[data-project-card]").forEach((card) => {
          gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="projects" ref={root} className="relative overflow-hidden py-28 motion-safe:md:h-screen motion-safe:md:py-0">
      <div className="flex flex-col motion-safe:md:h-full motion-safe:md:justify-center">
        <div ref={track} className="flex flex-col gap-6 px-6 motion-safe:md:h-[min(78vh,46rem)] motion-safe:md:flex-row motion-safe:md:items-stretch motion-safe:md:gap-8 md:px-12 motion-safe:md:pt-8">
          {/* Intro panel */}
          <div className="flex shrink-0 flex-col justify-between motion-safe:md:w-[min(34vw,32rem)]">
            <SectionHeader index="02" label="What I've built" title="Projects" className="mb-8! motion-safe:md:mb-0!" />
            <div className="hidden motion-safe:md:block">
              <p className="mb-6 max-w-xs text-lg leading-snug text-muted">
                Startups, hackathons, robots and research - keep scrolling.
              </p>
              <p ref={counter} className="font-mono text-sm text-fg">
                01 / {pad(projects.length)}
              </p>
              <div className="mt-3 h-px w-48 bg-line">
                <div
                  ref={progress}
                  className="h-full origin-left bg-accent"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
            </div>
          </div>

          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}

          {/* Trailing spacer so the last card can settle with margin */}
          <div aria-hidden="true" className="hidden w-[6vw] shrink-0 motion-safe:md:block" />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
