import React from "react";
import { Github, ExternalLink } from "lucide-react";
import Card from "../Card";
import { projects } from "../../data/projects";

const ProjectsSection = () => {
  return (
    <section id="projects" className="snap-start py-20 px-6 md:pl-20 relative">
      <div className="w-full scroll-fade">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden h-full">
              <div className="flex flex-col h-full">
                <div className="relative overflow-hidden h-48 bg-gray-200 group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/20 transition-all duration-500"></div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 mb-4 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    {project.github ? (
                      <a
                        href={project.github}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                      >
                        <Github size={18} />
                        <span>Code </span>
                      </a>
                    ) : null}
                    {project.demo ? (
                      <a
                        href={project.demo}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-all duration-300 transform hover:scale-105"
                      >
                        <ExternalLink size={18} />
                        <span>Demo</span>
                      </a>
                    ) : (
                      <span className="text-gray-400 italic"></span>
                    )}
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

export default ProjectsSection;
