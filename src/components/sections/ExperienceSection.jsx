import React from "react";
import Card from "../Card";
import { experiences } from "../../data/experiences";

const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="snap-start py-20 px-6 bg-white md:pl-20 relative"
    >
      <div className="w-full scroll-fade">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
          Experience
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="p-6 h-full">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {exp.title}
                </h3>
                <p className="text-blue-600 font-semibold mb-2">
                  {exp.company}
                </p>
                <p className="text-gray-500 text-sm mb-4">{exp.period}</p>
                <div className="text-gray-700 mb-4 flex-grow space-y-2">
                  {exp.description.map((line, lineIndex) => (
                    <div key={lineIndex}>{line}</div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
