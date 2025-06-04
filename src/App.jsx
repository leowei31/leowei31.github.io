import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Github, Linkedin, Mail, ExternalLink, Code, Briefcase, User, Trophy } from 'lucide-react';

const App = () => {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = ['about', 'experience', 'projects', 'skills', 'extracurricular'];
          const scrollPosition = window.scrollY + 200;

          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const { offsetTop, offsetHeight } = element;
              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                setActiveSection(prev => prev !== section ? section : prev);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper to get the next section id
  const sectionOrder = ['about', 'experience', 'projects', 'skills', 'extracurricular'];
  const getNextSection = (currentId) => {
    const idx = sectionOrder.indexOf(currentId);
    if (idx !== -1 && idx < sectionOrder.length - 1) {
      return sectionOrder[idx + 1];
    }
    return null;
  };

  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      period: "2022 - Present",
      description: "Led development of scalable web applications using React, Node.js, and AWS. Mentored junior developers and improved system performance by 40%.",
      technologies: ["React", "Node.js", "AWS", "TypeScript"]
    },
    {
      title: "Full Stack Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      description: "Built end-to-end solutions for fintech applications. Implemented CI/CD pipelines and established testing frameworks.",
      technologies: ["Vue.js", "Python", "PostgreSQL", "Docker"]
    },
    {
      title: "Software Developer Intern",
      company: "BigTech Solutions",
      period: "2019 - 2020",
      description: "Developed mobile applications and contributed to open-source projects. Collaborated with cross-functional teams on product features.",
      technologies: ["React Native", "Java", "MongoDB", "GraphQL"]
    }
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
      technologies: ["React", "Express.js", "Stripe API", "Redis"],
      github: "#",
      demo: "#",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=300&fit=crop&crop=center"
    },
    {
      title: "AI Chat Application",
      description: "Real-time chat application with AI-powered responses, user authentication, and message encryption.",
      technologies: ["Next.js", "Socket.io", "OpenAI API", "MongoDB"],
      github: "#",
      demo: "#",
      image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=600&h=300&fit=crop&crop=center"
    },
    {
      title: "Task Management System",
      description: "Collaborative project management tool with drag-and-drop interface, notifications, and team analytics.",
      technologies: ["React", "Firebase", "Material-UI", "Chart.js"],
      github: "#",
      demo: "#",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=300&fit=crop&crop=center"
    }
  ];

  const skills = [
    {
      category: "Frontend",
      items: ["React", "Vue.js", "TypeScript", "Tailwind CSS", "Next.js", "Angular"]
    },
    {
      category: "Backend",
      items: ["Node.js", "Python", "Java", "Express.js", "Django", "Spring Boot"]
    },
    {
      category: "Database",
      items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Firebase", "DynamoDB"]
    },
    {
      category: "DevOps",
      items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Jenkins", "Terraform"]
    }
  ];

  const extracurriculars = [
    {
      title: "Open Source Contributor",
      organization: "Various Projects",
      description: "Active contributor to popular open-source libraries with 500+ stars and 50+ merged PRs.",
      impact: "Improved developer experience for thousands of users"
    },
    {
      title: "Tech Meetup Organizer",
      organization: "Local Tech Community",
      description: "Organized monthly meetups for 200+ developers, featuring talks on emerging technologies.",
      impact: "Built a thriving local tech community"
    },
    {
      title: "Coding Bootcamp Mentor",
      organization: "CodePath",
      description: "Mentored 20+ students in web development, helping them transition into tech careers.",
      impact: "90% mentee job placement rate"
    }
  ];

  const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 ${className}`}>  
      {children}
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-y-auto overflow-x-hidden snap-y snap-mandatory box-border">
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .stagger-animation > * {
          opacity: 0;
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .stagger-animation > *:nth-child(1) { animation-delay: 0.1s; }
        .stagger-animation > *:nth-child(2) { animation-delay: 0.2s; }
        .stagger-animation > *:nth-child(3) { animation-delay: 0.3s; }
        .stagger-animation > *:nth-child(4) { animation-delay: 0.4s; }
        .stagger-animation > *:nth-child(5) { animation-delay: 0.5s; }
        .stagger-animation > *:nth-child(6) { animation-delay: 0.6s; }
      `}</style>
      
      {/* Vertical Navigation - Hidden on mobile */}
      <nav className="fixed left-0 top-0 h-full w-20 bg-transparent backdrop-blur-md shadow-xl z-50 hidden md:flex flex-col justify-center">
        <div className="flex flex-col space-y-6 px-4">
          {[
            { id: 'about', label: 'About', icon: User },
            { id: 'experience', label: 'Experience', icon: Briefcase },
            { id: 'projects', label: 'Projects', icon: Code },
            { id: 'skills', label: 'Skills', icon: Trophy },
            { id: 'extracurricular', label: 'Activities', icon: Trophy }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`group relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 bg-blue-100 text-blue-600 shadow-lg scale-100 hover:scale-110`}
              title={label}
            >
              <Icon size={24} />
              <span className="text-xs mt-1 font-medium">{label.charAt(0)}</span>
              
              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                {label}
                <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
              </div>
            </button>
          ))}
        </div>
        
        {/* Brand at bottom */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">JD</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="snap-start min-h-screen flex items-center justify-center px-6 relative overflow-hidden md:pl-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-8 animate-fade-in-up">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center animate-float shadow-2xl">
              <span className="text-4xl font-bold text-white">JD</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 animate-fade-in-up animation-delay-500">
              Software Engineer
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-1000">
              Passionate about creating innovative solutions that make a difference. 
              Specialized in full-stack development with a focus on scalable, user-centric applications.
            </p>
          </div>
          <div className="flex justify-center space-x-6 animate-fade-in-up animation-delay-1500">
            <a href="#" className="p-4 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
              <Github size={24} />
            </a>
            <a href="#" className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
              <Linkedin size={24} />
            </a>
            <a href="#" className="p-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
              <Mail size={24} />
            </a>
          </div>
        </div>

        {/* Down Arrow */}
        {getNextSection('about') && (
          <button
            onClick={() => scrollToSection(getNextSection('about'))}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/80 hover:bg-blue-100 text-blue-600 rounded-full p-3 shadow-lg transition-all duration-300 animate-bounce z-20"
            aria-label="Scroll to next section"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
        )}
      </section>

      {/* Experience Section */}
      <section id="experience" className="snap-start py-20 px-6 bg-white md:pl-20 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 animate-fade-in-up">Experience</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 stagger-animation">
            {experiences.map((exp, index) => (
              <Card key={index} className="p-6 h-full">
                <div className="flex flex-col h-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{exp.title}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{exp.company}</p>
                  <p className="text-gray-500 text-sm mb-4">{exp.period}</p>
                  <p className="text-gray-700 mb-4 flex-grow">{exp.description}</p>
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

        {/* Down Arrow */}
        {getNextSection('experience') && (
          <button
            onClick={() => scrollToSection(getNextSection('experience'))}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/80 hover:bg-blue-100 text-blue-600 rounded-full p-3 shadow-lg transition-all duration-300 animate-bounce z-20"
            aria-label="Scroll to next section"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
        )}
      </section>

      {/* Projects Section */}
      <section id="projects" className="snap-start py-20 px-6 md:pl-20 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 animate-fade-in-up">Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 stagger-animation">
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
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <ExternalLink size={16} className="text-gray-700" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                    <p className="text-gray-700 mb-4 flex-grow">{project.description}</p>
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
                      <a
                        href={project.github}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                      >
                        <Github size={18} />
                        <span>Code                      </span>
                      </a>
                      <a
                        href={project.demo}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-all duration-300 transform hover:scale-105"
                      >
                        <ExternalLink size={18} />
                        <span>Demo</span>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Down Arrow */}
        {getNextSection('projects') && (
          <button
            onClick={() => scrollToSection(getNextSection('projects'))}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/80 hover:bg-blue-100 text-blue-600 rounded-full p-3 shadow-lg transition-all duration-300 animate-bounce z-20"
            aria-label="Scroll to next section"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
        )}
      </section>

      {/* Skills Section */}
      <section id="skills" className="snap-start py-20 px-6 bg-white md:pl-20 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 animate-fade-in-up">Skills</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 stagger-animation">
            {skills.map((skillGroup, index) => (
              <Card key={index} className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{skillGroup.category}</h3>
                <div className="space-y-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="px-3 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Down Arrow */}
        {getNextSection('skills') && (
          <button
            onClick={() => scrollToSection(getNextSection('skills'))}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/80 hover:bg-blue-100 text-blue-600 rounded-full p-3 shadow-lg transition-all duration-300 animate-bounce z-20"
            aria-label="Scroll to next section"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
        )}
      </section>

      {/* Extracurricular Section */}
      <section id="extracurricular" className="snap-start py-20 px-6 md:pl-20 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 animate-fade-in-up">Activities</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 stagger-animation">
            {extracurriculars.map((activity, index) => (
              <Card key={index} className="p-6 h-full">
                <div className="flex flex-col h-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.title}</h3>
                  <p className="text-green-600 font-semibold mb-3">{activity.organization}</p>
                  <p className="text-gray-700 mb-4 flex-grow">{activity.description}</p>
                  <div className="mt-auto">
                    <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
                      <p className="text-green-700 font-medium text-sm">Impact: {activity.impact}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white snap-start md:pl-20">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
          <p className="text-gray-400 mb-6">
            Always interested in new opportunities and collaborations
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Github size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Mail size={24} />
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-500">
              © 2025 John Doe. Built with React & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
