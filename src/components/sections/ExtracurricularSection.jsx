import React, { useState } from "react";
import { Users, Rocket, Wrench, Lightbulb } from "lucide-react";
import SectionHeader from "../SectionHeader";
import { extracurriculars } from "../../data/extracurriculars";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const iconMap = {
  users: Users,
  rocket: Rocket,
  wrench: Wrench,
  lightbulb: Lightbulb,
};

const accentMap = {
  blue: {
    gradient: "from-blue-500 to-cyan-400",
    text: "text-blue-600",
    border: "border-blue-200/50",
    statBg: "from-blue-500/10 to-cyan-500/10",
  },
  orange: {
    gradient: "from-orange-500 to-amber-400",
    text: "text-orange-600",
    border: "border-orange-200/50",
    statBg: "from-orange-500/10 to-amber-500/10",
  },
  green: {
    gradient: "from-emerald-500 to-teal-400",
    text: "text-emerald-600",
    border: "border-emerald-200/50",
    statBg: "from-emerald-500/10 to-teal-500/10",
  },
  purple: {
    gradient: "from-purple-500 to-pink-400",
    text: "text-purple-600",
    border: "border-purple-200/50",
    statBg: "from-purple-500/10 to-pink-500/10",
  },
};

const ExtracurricularSection = () => {
  const revealRef = useScrollReveal(120);
  const [flippedIndex, setFlippedIndex] = useState(null);

  const handleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <section
      id="extracurricular"
      className="snap-start py-20 px-6 md:pl-16 relative bg-gradient-to-b from-blue-50/40 to-slate-50/80"
    >
      <div className="w-full">
        <SectionHeader
          label="Beyond Work"
          title="Extracurricular Activities"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {extracurriculars.map((activity, index) => {
            const accent = accentMap[activity.accent] || accentMap.blue;
            const Icon = iconMap[activity.icon] || Users;
            const isFlipped = flippedIndex === index;

            return (
              <div key={index} ref={revealRef}>
                <div
                  className="flip-card cursor-pointer h-[320px]"
                  onClick={() => handleFlip(index)}
                >
                  <div
                    className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}
                  >
                    {/* ——— Front ——— */}
                    <div className="flip-card-front">
                      <div className="relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg h-full flex flex-col items-center justify-center p-6 text-center glass-glow">
                        {/* Gradient top accent */}
                        <div
                          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accent.gradient}`}
                        />

                        {/* Icon */}
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${accent.gradient} flex items-center justify-center mb-5 shadow-lg`}
                        >
                          <Icon size={28} className="text-white" />
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                          {activity.title}
                        </h3>
                        <p className={`${accent.text} font-medium text-sm`}>
                          {activity.organization}
                        </p>

                        <span className="mt-5 text-gray-400 text-[11px] tracking-wide uppercase">
                          Hover for details
                        </span>
                      </div>
                    </div>

                    {/* ——— Back ——— */}
                    <div className="flip-card-back">
                      <div className="relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg h-full flex flex-col p-6">
                        {/* Gradient top accent */}
                        <div
                          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accent.gradient}`}
                        />

                        {/* Stat highlight */}
                        <div className="text-center mb-4">
                          <span
                            className={`text-3xl font-extrabold bg-gradient-to-r ${accent.gradient} bg-clip-text text-transparent`}
                          >
                            {activity.stat}
                          </span>
                          <p className="text-gray-500 text-xs mt-1">
                            {activity.statLabel}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                          {activity.description}
                        </p>

                        {/* Impact callout */}
                        <div
                          className={`mt-3 bg-gradient-to-r ${accent.statBg} border ${accent.border} p-3 rounded-xl`}
                        >
                          <p className="text-gray-700 font-medium text-xs leading-relaxed">
                            {activity.impact}
                          </p>
                        </div>
                      </div>
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
