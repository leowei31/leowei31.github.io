import React from "react";
import {
  GraduationCap,
  Award,
  BookOpen,
  Building2,
  FileText,
  ExternalLink,
} from "lucide-react";
import SectionHeader from "../SectionHeader";
import { academics } from "../../data/academics";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const getProgramVariant = (title) => {
  const isGraduate = /master|phd|graduate|msc|ms\b/i.test(title);

  if (isGraduate) {
    return {
      icon: GraduationCap,
      label: "Graduate Program",
      topBar: "from-blue-500 via-indigo-500 to-violet-500",
      iconBg: "from-blue-500 to-violet-500",
      badge:
        "bg-blue-50/80 border-blue-200/80 text-blue-700",
      highlightBg: "from-blue-500/10 to-violet-500/10",
      highlightBorder: "border-blue-200/70",
      awardColor: "text-blue-500",
      publicationBg: "from-blue-500/10 to-indigo-500/10",
      publicationBorder: "border-blue-200/70",
      publicationIconBg: "bg-blue-100/70",
      publicationIconColor: "text-blue-600",
      linkText: "text-blue-700",
    };
  }

  return {
    icon: BookOpen,
    label: "Undergraduate Program",
    topBar: "from-emerald-500 via-teal-500 to-cyan-500",
    iconBg: "from-emerald-500 to-cyan-500",
    badge:
      "bg-emerald-50/80 border-emerald-200/80 text-emerald-700",
    highlightBg: "from-emerald-500/10 to-cyan-500/10",
    highlightBorder: "border-emerald-200/70",
    awardColor: "text-emerald-500",
    publicationBg: "from-emerald-500/10 to-cyan-500/10",
    publicationBorder: "border-emerald-200/70",
    publicationIconBg: "bg-emerald-100/70",
    publicationIconColor: "text-emerald-600",
    linkText: "text-emerald-700",
  };
};

const AcademicsSection = () => {
  const revealRef = useScrollReveal(150);

  return (
    <section
      id="academics"
      className="snap-start py-20 px-6 md:pl-16 relative overflow-hidden bg-gradient-to-b from-slate-50/80 to-purple-50/30"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-[12%] h-56 w-56 rounded-full bg-blue-200/35 blur-3xl" />
        <div className="absolute bottom-12 right-[10%] h-64 w-64 rounded-full bg-violet-200/35 blur-3xl" />
      </div>

      <div className="relative w-full max-w-5xl mx-auto">
        <SectionHeader label="Education" title="Academics" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {academics.map((activity, index) => {
            const variant = getProgramVariant(activity.title);
            const ProgramIcon = variant.icon;

            return (
              <div
                key={index}
                ref={revealRef}
                className={index % 2 === 0 ? "md:col-span-7" : "md:col-span-5"}
              >
                <article className="group relative h-full overflow-hidden rounded-3xl border border-white/50 bg-white/70 backdrop-blur-xl shadow-[0_12px_36px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:border-white/80 hover:shadow-[0_20px_45px_rgba(59,130,246,0.14)]">
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${variant.topBar}`}
                  />
                  <div className="absolute -top-20 -right-16 h-40 w-40 rounded-full bg-white/50 blur-2xl" />

                  <div className="relative p-6 md:p-7 flex flex-col h-full">
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${variant.iconBg} text-white flex items-center justify-center shadow-lg`}
                      >
                        <ProgramIcon size={22} />
                      </div>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold tracking-wide uppercase ${variant.badge}`}
                      >
                        {variant.label}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 leading-snug">
                      {activity.title}
                    </h3>

                    <div className="mt-2 inline-flex items-center gap-2 text-sm text-slate-600">
                      <Building2 size={15} className="text-slate-400" />
                      <span className="font-medium">{activity.organization}</span>
                    </div>

                    <div className="mt-5 pt-5 border-t border-slate-200/70">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">
                        Highlights
                      </p>
                      <ul className="space-y-2.5">
                        {activity.description.map((line, lineIndex) => (
                          <li
                            key={lineIndex}
                            className={`flex items-start gap-2.5 rounded-xl border px-3 py-2.5 bg-gradient-to-r ${variant.highlightBg} ${variant.highlightBorder}`}
                          >
                            <Award
                              size={14}
                              className={`shrink-0 mt-0.5 ${variant.awardColor}`}
                            />
                            <span className="text-sm text-slate-700 leading-relaxed">
                              {line}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {Array.isArray(activity.papers) && activity.papers.length > 0 && (
                      <div className="mt-5 pt-5 border-t border-slate-200/70">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">
                          Publications
                        </p>

                        <div className="space-y-2.5">
                          {activity.papers.map((paper, paperIndex) => {
                            const hasUrl = Boolean(paper.url);
                            const Wrapper = hasUrl ? "a" : "div";

                            return (
                              <Wrapper
                                key={paperIndex}
                                {...(hasUrl
                                  ? {
                                      href: paper.url,
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                    }
                                  : {})}
                                className={`flex items-start justify-between gap-3 rounded-xl border px-3.5 py-3 bg-gradient-to-r ${variant.publicationBg} ${variant.publicationBorder} transition-all duration-300 ${hasUrl ? "hover:-translate-y-0.5 hover:shadow-md" : "opacity-85"}`}
                              >
                                <div className="flex items-start gap-2.5 min-w-0">
                                  <span
                                    className={`mt-0.5 w-6 h-6 shrink-0 rounded-lg ${variant.publicationIconBg} flex items-center justify-center`}
                                  >
                                    <FileText
                                      size={13}
                                      className={variant.publicationIconColor}
                                    />
                                  </span>

                                  <div className="min-w-0">
                                    <p className="text-sm font-semibold text-slate-800 leading-snug">
                                      {paper.title}
                                    </p>
                                    {paper.venue && (
                                      <p className="text-xs text-slate-500 mt-0.5">
                                        {paper.venue}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {hasUrl ? (
                                  <ExternalLink
                                    size={14}
                                    className={`shrink-0 mt-0.5 ${variant.linkText}`}
                                  />
                                ) : (
                                  <span className="shrink-0 text-[11px] text-slate-500 border border-slate-300/70 rounded-full px-2 py-0.5">
                                    Link pending
                                  </span>
                                )}
                              </Wrapper>
                            );
                          })}
                        </div>
                      </div>
                    )}
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

export default AcademicsSection;
