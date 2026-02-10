import React from "react";
import Card from "../Card";
import { extracurriculars } from "../../data/extracurriculars";

const ExtracurricularSection = () => {
  return (
    <section
      id="extracurricular"
      className="snap-start py-20 px-6 md:pl-20 bg-white relative"
    >
      <div className="w-full scroll-fade">
        <h2 className="text-4xl font-bold text-center mb-16 text-black-900">
          Extracurricular Activities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {extracurriculars.map((activity, index) => (
            <Card key={index} className="p-6 h-full">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {activity.title}
                </h3>
                <p className="text-green-600 font-semibold mb-3">
                  {activity.organization}
                </p>
                <p className="text-gray-700 mb-4 flex-grow">
                  {activity.description}
                </p>
                <div className="mt-auto">
                  <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
                    <p className="text-green-700 font-medium text-sm">
                      Impact: {activity.impact}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExtracurricularSection;
