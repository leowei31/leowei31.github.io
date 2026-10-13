import { ArrowUpRight, Award, FileText } from "lucide-react";
import SectionHeader from "../SectionHeader";
import Reveal from "../motion/Reveal";
import { academics } from "../../data/academics";

const AWARD_SUFFIX = /\s*\(([^)]*Award[^)]*)\)\s*$/i;

const splitAward = (title) => {
  const match = AWARD_SUFFIX.exec(title);
  return match ? { title: title.replace(AWARD_SUFFIX, ""), award: match[1] } : { title, award: null };
};

const AcademicsSection = () => (
  <section id="academics" className="relative px-6 py-28 md:px-12 md:py-40">
    <div className="mx-auto max-w-[110rem]">
      <SectionHeader index="04" label="Education & research" title="Academics" />

      <div className="border-t border-line">
        {academics.map((program, i) => (
          <Reveal
            key={program.title}
            className="grid gap-8 border-b border-line py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,2.1fr)] md:gap-20 md:py-16"
          >
            <div>
              <p className="eyebrow mb-3">{String(i + 1).padStart(2, "0")}</p>
              <p className="text-lg text-fg">{program.organization}</p>
            </div>

            <div>
              <h3 className="font-display mb-8 max-w-3xl text-[clamp(2rem,4vw,3.8rem)] leading-[1.03] text-fg">
                {program.title}
              </h3>

              <ul className="mb-8 max-w-2xl space-y-2.5 text-[0.95rem] leading-relaxed text-muted">
                {program.description.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
                    {line}
                  </li>
                ))}
              </ul>

              {program.papers && (
                <div className="grid gap-3 lg:grid-cols-2">
                  {program.papers.map((paper) => {
                    const { title, award } = splitAward(paper.title);
                    return (
                      <a
                        key={paper.url}
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col justify-between gap-6 rounded-2xl border border-line bg-card p-6 transition-colors duration-300 hover:border-fg"
                      >
                        <div>
                          <div className="mb-4 flex items-center justify-between">
                            <FileText size={18} className="text-muted" />
                            <ArrowUpRight
                              size={18}
                              className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                            />
                          </div>
                          <p className="text-base font-medium leading-snug text-fg">{title}</p>
                        </div>
                        <div className="space-y-3">
                          {award && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-accent">
                              <Award size={12} />
                              {award}
                            </span>
                          )}
                          <p className="eyebrow">{paper.venue}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default AcademicsSection;
