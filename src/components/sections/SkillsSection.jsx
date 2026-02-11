import React from "react";
import {
  Braces,
  BrainCircuit,
  Database,
  Globe,
  Sparkles,
  Target,
} from "lucide-react";
import SectionHeader from "../SectionHeader";
import { skills } from "../../data/skills";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const categoryAccents = {
  Languages: {
    icon: Braces,
    topBar: "from-blue-500 via-indigo-500 to-violet-500",
    iconBg: "from-blue-500 to-violet-500",
    badge: "bg-blue-50/80 border-blue-200/80 text-blue-700",
    chip: "bg-blue-50/70 border-blue-200/70 text-blue-700 hover:bg-blue-100/80 hover:border-blue-300",
  },
  "AI & Machine Learning": {
    icon: BrainCircuit,
    topBar: "from-fuchsia-500 via-purple-500 to-indigo-500",
    iconBg: "from-fuchsia-500 to-indigo-500",
    badge: "bg-purple-50/80 border-purple-200/80 text-purple-700",
    chip: "bg-purple-50/70 border-purple-200/70 text-purple-700 hover:bg-purple-100/80 hover:border-purple-300",
  },
  "Data & Cloud Technologies": {
    icon: Database,
    topBar: "from-emerald-500 via-teal-500 to-cyan-500",
    iconBg: "from-emerald-500 to-cyan-500",
    badge: "bg-emerald-50/80 border-emerald-200/80 text-emerald-700",
    chip: "bg-emerald-50/70 border-emerald-200/70 text-emerald-700 hover:bg-emerald-100/80 hover:border-emerald-300",
  },
  "Web & Mobile Development": {
    icon: Globe,
    topBar: "from-amber-500 via-orange-500 to-rose-500",
    iconBg: "from-amber-500 to-rose-500",
    badge: "bg-amber-50/80 border-amber-200/80 text-amber-700",
    chip: "bg-amber-50/70 border-amber-200/70 text-amber-700 hover:bg-amber-100/80 hover:border-amber-300",
  },
};

const SkillsSection = () => {
  const revealRef = useScrollReveal(120);

  return (
    <section
      id="skills"
      className="snap-start py-20 px-6 md:pl-16 relative overflow-hidden bg-gradient-to-b from-purple-50/30 via-white to-slate-50/60"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-16 right-[8%] h-60 w-60 rounded-full bg-violet-200/35 blur-3xl" />
        <div className="absolute bottom-16 left-[8%] h-52 w-52 rounded-full bg-blue-200/35 blur-3xl" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto">
        <SectionHeader label="Tech Stack" title="Skills" />

        <div
          ref={revealRef}
          className="mb-8 rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl p-5 md:p-6 shadow-[0_10px_32px_rgba(15,23,42,0.06)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-2">
                Capability Snapshot
              </p>
              <p className="text-sm text-slate-600">
                Production-focused full-stack and ML engineering across product,
                data, and infrastructure.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
                <Sparkles size={14} className="text-violet-500" />
                Always Learning
              </div>

            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skills.map((skillGroup, index) => {
            const accent = categoryAccents[skillGroup.category] || categoryAccents.Languages;
            const CategoryIcon = accent.icon || Braces;

            return (
              <div key={index} ref={revealRef}>
                <article className="group relative h-full overflow-hidden rounded-3xl border border-white/55 bg-white/75 backdrop-blur-xl shadow-[0_12px_36px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:border-white/80 hover:shadow-[0_20px_45px_rgba(59,130,246,0.14)]">
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent.topBar}`}
                  />
                  <div className="absolute -top-16 -right-14 h-36 w-36 rounded-full bg-white/50 blur-2xl" />

                  <div className="relative p-6 md:p-7">
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${accent.iconBg} text-white flex items-center justify-center shadow-lg`}
                      >
                        <CategoryIcon size={22} />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 leading-tight mb-5">
                      {skillGroup.category}
                    </h3>

                    <div className="flex flex-wrap gap-2.5">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className={`px-3 py-1.5 border rounded-full text-sm font-medium cursor-default transition-all duration-300 hover:-translate-y-0.5 ${accent.chip}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
