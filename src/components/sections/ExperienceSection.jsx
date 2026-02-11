import React from "react";
import { Building2, GraduationCap, FlaskConical, Wrench, MapPin } from "lucide-react";
import SectionHeader from "../SectionHeader";
import { experiences } from "../../data/experiences";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const iconMap = {
  building: Building2,
  graduation: GraduationCap,
  beaker: FlaskConical,
  wrench: Wrench,
};

const ExperienceSection = () => {
  const revealRef = useScrollReveal(150);

  return (
    <section
      id="experience"
      className="snap-start py-20 px-6 md:pl-16 relative bg-gradient-to-b from-slate-50/80 to-white"
    >
      <div className="w-full max-w-3xl mx-auto">
        <SectionHeader label="Career" title="Experience" />

        {/* Timeline */}
        <div className="relative pl-8 md:pl-10">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-4 top-0 bottom-0 w-0.5 timeline-line" />

          {experiences.map((exp, index) => {
            const isCurrent = index === 0;
            const Icon = iconMap[exp.icon] || Building2;

            return (
              <div
                key={index}
                ref={revealRef}
                className="relative mb-8 last:mb-0"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute -left-4 md:-left-6 top-6 -translate-x-1/2 z-10 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-4 border-white shadow-md ${
                    isCurrent ? "timeline-dot-active" : ""
                  }`}
                />

                {/* Content card */}
                <div className="ml-4 md:ml-6">
                  <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-lg glass-glow transition-all duration-500 hover:-translate-y-1 hover:border-white/70 hover:bg-white/80">
                    {/* Top row: period badge + icon */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-blue-50/80 text-blue-600 text-xs font-semibold rounded-full border border-blue-100/50">
                        {exp.period}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100/50 flex items-center justify-center">
                        <Icon size={16} className="text-blue-500" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {exp.title}
                    </h3>

                    {/* Company + location */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                      <p className="text-blue-600 font-medium text-sm">
                        {exp.company}
                      </p>
                      {exp.location && (
                        <span className="flex items-center gap-1 text-gray-400 text-xs">
                          <MapPin size={12} />
                          {exp.location}
                        </span>
                      )}
                    </div>

                    <ul className="text-gray-600 text-sm mb-4 space-y-1.5 leading-relaxed list-disc list-outside pl-4">
                      {exp.description.map((line, lineIndex) => (
                        <li key={lineIndex}>{line}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2.5 py-1 bg-white/50 backdrop-blur-sm border border-blue-200/50 text-blue-700 rounded-full text-xs font-medium transition-colors hover:bg-blue-50 hover:border-blue-300"
                        >
                          {tech}
                        </span>
                      ))}
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

export default ExperienceSection;
