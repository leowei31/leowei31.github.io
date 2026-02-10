import React from "react";
import Card from "../Card";
import { skills } from "../../data/skills";

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="snap-start py-20 px-6 bg-white md:pl-20 relative"
    >
      <div className="w-full scroll-fade">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
          Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {skills.map((skillGroup, index) => (
            <Card key={index} className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {skillGroup.category}
              </h3>
              <div className="space-y-2">
                {skillGroup.items.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="px-3 py-2 bg-gray-100 rounded-lg text-gray-700"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
