import React from "react";
import { Github, ExternalLink } from "lucide-react";
import SectionHeader from "../SectionHeader";
import { projects } from "../../data/projects";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const ProjectsSection = () => {
  const revealRef = useScrollReveal(100);
  const [featured, ...rest] = projects;

  return (
    <section
      id="projects"
      className="snap-start py-20 px-6 md:pl-16 relative bg-gradient-to-b from-white to-blue-50/40"
    >
      <div className="w-full">
        <SectionHeader label="What I've Built" title="Projects" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Featured Project — spans 2 cols */}
          <div ref={revealRef} className="md:col-span-2 group">
            <div className="relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg glass-glow h-full transition-all duration-500 hover:border-white/70 hover:bg-white/80">
              <div className="flex flex-col md:flex-row h-full">
                {/* Image side */}
                <div className="relative md:w-3/5 overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover aspect-video md:aspect-auto min-h-[280px] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 hidden md:block" />
                  {/* Category badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/30">
                    {featured.category}
                  </span>
                </div>

                {/* Content side */}
                <div className="p-6 md:p-8 md:w-2/5 flex flex-col justify-center">
                  <span className="inline-block w-fit px-2.5 py-0.5 mb-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                    Featured
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {featured.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {featured.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {featured.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-white/50 backdrop-blur-sm border border-blue-200/50 text-blue-700 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {featured.github && (
                      <a
                        href={featured.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300"
                      >
                        <Github size={14} />
                        Code
                      </a>
                    )}
                    {featured.demo && (
                      <a
                        href={featured.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Regular Project Cards */}
          {rest.map((project, index) => (
            <div key={index} ref={revealRef} className="group">
              <div className="relative overflow-hidden rounded-2xl shadow-lg h-full cursor-default">
                {/* Full-bleed image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Category badge — top left */}
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold rounded-full border border-white/30 z-10">
                  {project.category}
                </span>

                {/* Action buttons — top right, hover reveal */}
                <div className="absolute top-3 right-3 flex gap-2 z-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all duration-300"
                    >
                      <Github size={14} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all duration-300"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:via-black/40 transition-all duration-500" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-bold text-lg leading-tight">
                    {project.title}
                  </h3>

                  {/* Hover reveal — description + tech tags */}
                  <div className="project-reveal">
                    <div>
                      <p className="text-white/80 text-sm mt-2 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white/90 rounded-full text-[11px] font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
