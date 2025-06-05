import React, { useState, useEffect, useCallback } from "react";import "./App.css";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Briefcase,
  User,
  ChartColumnIncreasing,
  Trophy,
  BookText,
  Book
} from "lucide-react";


// BB-8 Component
const BB8 = () => {
  const [droidX, setDroidX] = useState(0);
  const [mouseX, setMouseX] = useState(300);
  const [toTheRight, setToTheRight] = useState(true);
  const [speed] = useState(1.8);
  const [accelMod] = useState(0.6);

  const handleMouseMove = useCallback((event) => {
    setMouseX(event.pageX);
  }, []);

  const movement = useCallback(() => {
    if (Math.abs(Math.round(droidX) - mouseX) !== 1) {
      const distance = mouseX - droidX;
      const acceleration = Math.abs(distance * accelMod) / 100;

      if (droidX < mouseX) {
        setDroidX(prev => prev + (speed * acceleration));
        setToTheRight(true);
      } else {
        setDroidX(prev => prev - (speed * acceleration));
        setToTheRight(false);
      }
    }
  }, [droidX, mouseX, speed, accelMod]);

  useEffect(() => {
    const mouseMoveHandler = (e) => handleMouseMove(e);
    document.addEventListener('mousemove', mouseMoveHandler);
    
    const interval = setInterval(() => {
      movement();
    }, 1);

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      clearInterval(interval);
    };
  }, [handleMouseMove, movement]);

  const d = 100; // Smaller size for portfolio integration

  const styles = {
    bb8: {
      position: 'fixed',
      marginLeft: -d/2,
      marginRight: -d/2,
      width: d,
      bottom: '10%',
      left: 0,
      transform: `translateX(${droidX}px)`,
      WebkitTransform: `translateX(${droidX}px)`,
      zIndex: 40,
      pointerEvents: 'none',
      display: window.innerWidth >= 768 ? 'block' : 'none'
    },
    antennas: {
      position: 'absolute',
      transition: 'left 0.6s',
      left: toTheRight ? '6%' : '28%',
      transform: `translateX(${(mouseX - droidX) / 25}px) rotateZ(${(mouseX - droidX) / 80}deg)`,
      WebkitTransform: `translateX(${(mouseX - droidX) / 25}px) rotateZ(${(mouseX - droidX) / 80}deg)`
    },
    antennaShort: {
      background: '#e0d2be',
      position: 'absolute',
      width: '2px',
      height: '15px',
      top: '-50px',
      left: '36px'
    },
    antennaLong: {
      background: '#e0d2be',
      position: 'absolute',
      width: '2px',
      borderTop: '4px solid #020204',
      borderBottom: '4px solid #020204',
      height: '26px',
      top: '-60px',
      left: '40px'
    },
    head: {
      backgroundColor: 'ghostwhite',
      borderRadius: '65px 65px 18px 18px',
      height: '45px',
      marginLeft: '-32px',
      overflow: 'hidden',
      position: 'absolute',
      width: '74px',
      zIndex: 1,
      top: '-40px',
      left: '53%',
      transform: `translateX(${(mouseX - droidX) / 15}px) rotateZ(${(mouseX - droidX) / 25}deg)`,
      WebkitTransform: `translateX(${(mouseX - droidX) / 15}px) rotateZ(${(mouseX - droidX) / 25}deg)`
    },
    stripeOne: {
      position: 'absolute',
      width: '100%',
      background: '#7699B7',
      height: '5px',
      opacity: 0.8,
      zIndex: 1,
      top: '2px'
    },
    stripeTwo: {
      position: 'absolute',
      width: '100%',
      background: '#CD7640',
      height: '3px',
      top: '10px'
    },
    stripeThree: {
      position: 'absolute',
      width: '100%',
      background: '#999',
      height: '3px',
      opacity: 0.5,
      bottom: '2px'
    },
    stripeDetail: {
      display: 'flex',
      width: '140px',
      bottom: '5px',
      left: toTheRight ? '0' : '-38%',
      transition: 'left 0.6s',
      position: 'absolute'
    },
    eyes: {
      display: 'block',
      height: '100%',
      position: 'absolute',
      width: '100%',
      transition: 'left 0.6s',
      left: toTheRight ? '36%' : '0'
    },
    eyeOne: {
      borderRadius: '50%',
      display: 'block',
      position: 'absolute',
      background: '#020204',
      border: '3px solid lightgray',
      height: '21px',
      width: '21px',
      top: '8px',
      left: '12%'
    },
    eyeOneAfter: {
      background: 'white',
      borderRadius: '50%',
      height: '2px',
      position: 'absolute',
      width: '2px',
      top: '3px',
      right: '3px'
    },
    eyeTwo: {
      borderRadius: '50%',
      display: 'block',
      position: 'absolute',
      backgroundColor: 'lightgrey',
      border: '1px solid #020204',
      height: '11px',
      width: '11px',
      top: '21px',
      left: '40%'
    },
    eyeTwoAfter: {
      background: '#020204',
      borderRadius: '50%',
      height: '7px',
      position: 'absolute',
      width: '7px',
      top: '1px',
      left: '1px'
    },
    ball: {
      backgroundColor: 'ghostwhite',
      borderRadius: '50%',
      height: d + 18,
      overflow: 'hidden',
      position: 'relative',
      width: d + 18,
      transform: `rotateZ(${droidX / 2}deg)`,
      WebkitTransform: `rotateZ(${droidX / 2}deg)`
    },
    linesOne: {
      border: '2px solid #B19669',
      borderRadius: '50%',
      height: '280px',
      opacity: 0.6,
      position: 'absolute',
      width: '280px'
    },
    linesTwo: {
      border: '2px solid #B19669',
      borderRadius: '50%',
      height: '280px',
      opacity: 0.6,
      position: 'absolute',
      width: '280px',
      top: '-7px',
      left: '-175px'
    },
    ringBase: {
      background: '#CD7640',
      borderRadius: '50%',
      position: 'absolute'
    },
    ringOne: {
      marginLeft: '-28px',
      height: '63px',
      width: '70px',
      top: '2%',
      left: '42%'
    },
    ringTwo: {
      height: '28px',
      width: '56px',
      transform: 'rotate(50deg)',
      WebkitTransform: 'rotate(50deg)',
      top: '65%',
      left: '8%',
      marginLeft: '-25px'
    },
    ringThree: {
      height: '26px',
      width: '56px',
      transform: 'rotate(-50deg)',
      WebkitTransform: 'rotate(-50deg)',
      top: '68%',
      left: '84%',
      marginLeft: '-25px'
    },
    ringAfter: {
      backgroundColor: 'ghostwhite',
      borderRadius: '50%',
      height: '73%',
      marginTop: '-36%',
      marginLeft: '-36%',
      position: 'absolute',
      width: '73%',
      top: '50%',
      left: '50%'
    },
    ringTwoAfter: {
      backgroundColor: 'ghostwhite',
      borderRadius: '50%',
      height: '73%',
      marginTop: '-36%',
      marginLeft: '-36%',
      position: 'absolute',
      width: '73%',
      top: '100%',
      left: '50%'
    },
    ringThreeAfter: {
      backgroundColor: 'ghostwhite',
      borderRadius: '50%',
      height: '73%',
      marginTop: '-36%',
      marginLeft: '-36%',
      position: 'absolute',
      width: '73%',
      top: '110%',
      left: '50%'
    },
    shadow: {
      background: '#3A271C',
      boxShadow: '3px 0 35px #3A271C',
      borderRadius: '50%',
      height: d/6,
      opacity: 0.25,
      position: 'absolute',
      width: d,
      zIndex: -1,
      left: '7px',
      bottom: '-6px'
    }
  };

  const detailStyles = [
    { backgroundColor: '#CD7640', width: '2%', marginLeft: '2px', height: '5px' },
    { backgroundColor: '#CD7640', width: '2%', marginLeft: '2px', height: '5px' },
    { backgroundColor: '#CD7640', width: '8%', marginLeft: '2px', height: '5px' },
    { backgroundColor: '#CD7640', width: '6%', marginLeft: '4px', height: '5px' },
    { backgroundColor: '#CD7640', width: '4%', marginLeft: '32px', height: '4px', marginTop: '1px' },
    { backgroundColor: '#CD7640', width: '10%', marginLeft: '3px', height: '5px' },
    { backgroundColor: '#CD7640', width: '2%', marginLeft: '2px', height: '5px' },
    { backgroundColor: '#CD7640', width: '2%', marginLeft: '2px', height: '5px' }
  ];

  return (
    <div style={styles.bb8}>
      <div style={styles.antennas}>
        <div style={styles.antennaShort}></div>
        <div style={styles.antennaLong}></div>
      </div>
      <div style={styles.head}>
        <div style={styles.stripeOne}></div>
        <div style={styles.stripeTwo}></div>
        <div style={styles.eyes}>
          <div style={styles.eyeOne}>
            <div style={styles.eyeOneAfter}></div>
          </div>
          <div style={styles.eyeTwo}>
            <div style={styles.eyeTwoAfter}></div>
          </div>
        </div>
        <div style={styles.stripeDetail}>
          {detailStyles.map((detailStyle, index) => (
            <div key={index} style={detailStyle}></div>
          ))}
        </div>
        <div style={styles.stripeThree}></div>
      </div>
      <div style={styles.ball}>
        <div style={styles.linesOne}></div>
        <div style={styles.linesTwo}></div>
        <div style={{...styles.ringBase, ...styles.ringOne}}>
          <div style={styles.ringAfter}></div>
        </div>
        <div style={{...styles.ringBase, ...styles.ringTwo}}>
          <div style={styles.ringTwoAfter}></div>
        </div>
        <div style={{...styles.ringBase, ...styles.ringThree}}>
          <div style={styles.ringThreeAfter}></div>
        </div>
      </div>
      <div style={styles.shadow}></div>
    </div>
  );
};

const App = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [showBB8, setShowBB8] = useState(true);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = [
            "about",
            "experience",
            "projects",
            "extracurricular",
            "academics",
            "skills",
          ];
          const scrollPosition = window.scrollY + 200;
          let foundSection = null;
          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const { offsetTop, offsetHeight } = element;
              if (
                scrollPosition >= offsetTop &&
                scrollPosition < offsetTop + offsetHeight
              ) {
                setActiveSection((prev) => (prev !== section ? section : prev));
                foundSection = { id: section, offsetTop, offsetHeight };
                break;
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Helper to get the next section id
  const sectionOrder = [
    "about",
    "experience",
    "projects",
    "extracurricular",
    "academics",
    "skills",
  ];

  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      period: "2022 - Present",
      description:
        "Led development of scalable web applications using React, Node.js, and AWS. Mentored junior developers and improved system performance by 40%.",
      technologies: ["React", "Node.js", "AWS", "TypeScript"],
    },
    {
      title: "Full Stack Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      description:
        "Built end-to-end solutions for fintech applications. Implemented CI/CD pipelines and established testing frameworks.",
      technologies: ["Vue.js", "Python", "PostgreSQL", "Docker"],
    },
    {
      title: "Software Developer Intern",
      company: "BigTech Solutions",
      period: "2019 - 2020",
      description:
        "Developed mobile applications and contributed to open-source projects. Collaborated with cross-functional teams on product features.",
      technologies: ["React Native", "Java", "MongoDB", "GraphQL"],
    },
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
      technologies: ["React", "Express.js", "Stripe API", "Redis"],
      github: "#",
      demo: "#",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=300&fit=crop&crop=center",
    },
    {
      title: "AI Chat Application",
      description:
        "Real-time chat application with AI-powered responses, user authentication, and message encryption.",
      technologies: ["Next.js", "Socket.io", "OpenAI API", "MongoDB"],
      github: "#",
      demo: "#",
      image:
        "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=600&h=300&fit=crop&crop=center",
    },
    {
      title: "Task Management System",
      description:
        "Collaborative project management tool with drag-and-drop interface, notifications, and team analytics.",
      technologies: ["React", "Firebase", "Material-UI", "Chart.js"],
      github: "#",
      demo: "#",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=300&fit=crop&crop=center",
    },
  ];

  const skills = [
    {
      category: "Frontend",
      items: [
        "React",
        "Vue.js",
        "TypeScript",
        "Tailwind CSS",
        "Next.js",
        "Angular",
      ],
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "Python",
        "Java",
        "Express.js",
        "Django",
        "Spring Boot",
      ],
    },
    {
      category: "Database",
      items: [
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "MySQL",
        "Firebase",
        "DynamoDB",
      ],
    },
    {
      category: "DevOps",
      items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Jenkins", "Terraform"],
    },
  ];

  const extracurriculars = [
    {
      title: "Open Source Contributor",
      organization: "Various Projects",
      description:
        "Active contributor to popular open-source libraries with 500+ stars and 50+ merged PRs.",
      impact: "Improved developer experience for thousands of users",
    },
    {
      title: "Tech Meetup Organizer",
      organization: "Local Tech Community",
      description:
        "Organized monthly meetups for 200+ developers, featuring talks on emerging technologies.",
      impact: "Built a thriving local tech community",
    },
    {
      title: "Coding Bootcamp Mentor",
      organization: "CodePath",
      description:
        "Mentored 20+ students in web development, helping them transition into tech careers.",
      impact: "90% mentee job placement rate",
    },
  ];

  const Card = ({ children, className = "" }) => (
    <div
      className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 ${className}`}
    >
      {children}
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-y-auto overflow-x-hidden snap-y snap-mandatory box-border isolation-isolate">
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .scroll-fade {
          view-timeline-name: --section;
          view-timeline-axis: block;
          animation-name: fade-in-up;
          animation-timeline: --section;
          animation-duration: 1s;
          animation-fill-mode: both;
          animation-range: entry 0% cover 40%;
        }
      `}</style>

      <BB8 />

      {/* Vertical Navigation - Hidden on mobile */}
      <nav className="fixed left-0 top-0 h-full w-20 bg-transparent backdrop-blur-md shadow-xl z-50 hidden md:flex flex-col justify-center isolation-isolate">
        <div className="flex flex-col space-y-6 px-4">
          {[
            { id: "about", label: "About", icon: User },
            { id: "experience", label: "Experience", icon: Briefcase },
            { id: "projects", label: "Projects", icon: Code },
            { id: "extracurricular", label: "Activities", icon: Trophy },
            { id: "academics", label: "Academics", icon: BookText },
            { id: "skills", label: "Skills", icon: ChartColumnIncreasing },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`group relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 
              ${
                activeSection === id
                  ? "bg-blue-600 text-black"
                  : "bg-transparent text-blue-600 hover:bg-blue-100 hover:text-blue-700"
              } 
              scale-100 hover:scale-110 
              !bg-transparent !border-none shadow-none`}
            >
              <Icon size={25} />
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
      <section
        id="about"
  className="relative h-screen snap-start sticky top-0 z-10 flex items-center justify-center px-6 md:pl-20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 scroll-fade"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10 scroll-fade">
          <div className="mb-8 animate-fade-in-up">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center animate-float shadow-2xl">
              <span className="text-4xl font-bold text-white">LW</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 animate-fade-in-up animation-delay-500">
              Leo Wei
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-1000">
              Passionate about creating things that make a
              difference. 
            </p>
          </div>
          <div className="flex justify-center space-x-6 animate-fade-in-up animation-delay-1500">
            <a
              href="#"
              className="p-4 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
            >
              <Github size={24} />
            </a>
            <a
              href="#"
              className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="#"
              className="p-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
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
                  <p className="text-gray-700 mb-4 flex-grow">
                    {exp.description}
                  </p>
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

      {/* Projects Section */}
      <section
        id="projects"
        className="snap-start py-20 px-6 md:pl-20 relative"
      >
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
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <div className="flex items-center space-x-2">
                          <Github size={16} className="text-gray-700" />
                          <span className="text-gray-700 text-sm font-medium">
                            Code
                          </span>
                        </div>
                      </div>
                    </div>
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
                      <a
                        href={project.github}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                      >
                        <Github size={18} />
                        <span>Code </span>
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
      </section>





      {/* Extracurricular Section */}
      <section
        id="extracurricular"
        className="snap-start py-20 px-6 md:pl-20 bg-white relative"
      >
        <div className="w-full scroll-fade">
          <h2 className="text-4xl font-bold text-center mb-16 text-black-900">
            Activities
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




       {/* academics Section */}
      <section
        id="academics"
        className="snap-start py-20 px-6 md:pl-20 relative"
      >
        <div className="w-full scroll-fade">
          <h2 className="text-4xl font-bold text-center mb-16 text-black-900">
            Academics
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

      {/* Skills Section */}
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
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white snap-start md:pl-20">
        <div className="w-full text-center">
          <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
          <p className="text-gray-400 mb-6">
            Always interested in new opportunities and collaborations
          </p>
          <div className="flex justify-center space-x-6 mb-8">
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
          <div className="pt-8 border-t border-gray-800">
            <p className="text-gray-500">
              © {new Date().getFullYear()} Leo Wei. Built with React & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
