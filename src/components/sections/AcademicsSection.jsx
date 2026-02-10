import React from "react";
import Card from "../Card";
import { academics } from "../../data/academics";

const AcademicsSection = () => {
  return (
    <section
      id="academics"
      className="snap-start py-20 px-6 md:pl-20 relative"
    >
      <div className="w-full scroll-fade">
        <h2 className="text-4xl font-bold text-center mb-16 text-black-900">
          Academics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {academics.map((activity, index) => (
            <Card key={index} className="p-6 h-full">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {activity.title}
                </h3>
                <p className="text-green-600 font-semibold mb-3">
                  {activity.organization}
                </p>
                <p className="text-gray-700 mb-4 flex-grow">
                  {activity.description.map((line, lineIndex) => (
                    <div key={lineIndex}>{line}</div>
                  ))}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademicsSection;
