import React, { useState, useEffect, useCallback } from "react"; import "./App.css";
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

import me from './assets/me.png';

import giraff_ai from './assets/giraff_ai_frontend_demo.gif';
import techstart from './assets/techstart.gif';
import stanford from './assets/stanford.jpg';
import canis from './assets/canis.png';
import drone from './assets/drone.JPG';
import nectarfy from './assets/nectarfy.JPG';
import rl from './assets/rl.JPG';
import htn from './assets/htn.png';
import healthcare_sensor from './assets/healthcare_sensor.gif';
import bizhacks from './assets/bizhacks.png';


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
      marginLeft: -d / 2,
      marginRight: -d / 2,
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
      height: d / 6,
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
        <div style={{ ...styles.ringBase, ...styles.ringOne }}>
          <div style={styles.ringAfter}></div>
        </div>
        <div style={{ ...styles.ringBase, ...styles.ringTwo }}>
          <div style={styles.ringTwoAfter}></div>
        </div>
        <div style={{ ...styles.ringBase, ...styles.ringThree }}>
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

  const experiences = [
    {
      title: "Lead Software Developer",
      company: "Broadbill Energy",
      period: "2025-Present",
      description:
        ["Led development of company's full-stack inventory management platform using Next.js, Node.js, and PostgreSQL. Executed zero-downtime migration of a 10GB legacy SQL database to PostgreSQL. Cut API latency by implementing caching layer and query deduplication. Built Excel automation with Typescript, reducing manual data entry time.",
        ],
      technologies: ["Next.js", "Node.js", "Azure", "PostgreSQL", "Redis", "Docker", "JavaScript", "TypeScript"],
    },
    {
      title: "Machine Learning Researcher and Graduate Teaching Assistant",
      company: "University of Calgary, Schulich School of Engineering",
      period: "2023 - 2025",
      description:
        ["Developed a PEFT framework (soft prompts + quantization) for LLMs, achieving SOTA benchmark results. Led RLHF-tuned LLM medical summarization project and designed a federated learning system for hospital-scale time-series forecasting.",
          "Teaching Assistant for undergraduate full stack web developement course, undergraduate capstone project course, and graduate course on advanced data structures and algorithms."
        ],
      technologies: ["PyTorch", "Transformers", "Hugging Face", "Python"],
    },
    {
      title: "Machine Learning Engineer",
      company: "CyberX",
      period: "2023 - 2023",
      description:
        ["Increased profitability of Uniswap V3 liquidity positions by using unsupervised learning techniques to optimize trading strategies. Built ETL pipeline for data extraction and transformation. Generated actionable market insights for over 100,000 users."],
      technologies: ["TensorFlow", "Scikit-Learn", "Python"],
    },
    {
      title: "Software Engineer Intern",
      company: "KPMG",
      period: "2022 - 2022",
      description:
        ["Improved frontend test coverage. Improved performance of internal data analytics tool. Reduced API response time through query optimization and caching."],
      technologies: ["React", "Django", "MySQL", "JavaScript", "Python"],
    },
    {
      title: "Machine Learning Researcher",
      company: "University of British Columbia, Department of Mathematics",
      period: "2020 - 2020",
      description:
        ["Developed simulation with OpenAI Gym for PID tuning in control systems. Optimized PID tuning with DDPG algorithm, reducing settling time."],
      technologies: ["OpenAI Gym", "NumPy", "Pytorch", "Python"],
    },
    {
      title: "Engineering Intern",
      company: "Discover Battery",
      period: "2019-2020",
      description:
        ["Designed and produced bill of materials for battery pack manufacturing. Developed automated testing system for battery packs using Python and Arduino."],
      technologies: ["Solidworks", "Arduino", "Python"],
    },
  ];

  const projects = [
    {
      title: "giraff ai",
      description:
        "Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
      technologies: ["Next.js", "FastAPI", "Langchain", "Neo4j", "Pinecone"],
      // github: "#",
      demo: "https://giraff.ai",
      image:
        giraff_ai,
    },
    {
      title: "Stanford Treehacks",
      description:
        "Real-time chat application with AI-powered responses, user authentication, and message encryption.",
      technologies: ["React", "Flask", "RAG", "Python", "Intel Prediction Guard", "Langchain"],
      github: "https://github.com/leowei31/Treehacks2024",
      demo: "https://devpost.com/software/llm2graph",
      image:
        stanford,
    },
    {
      title: "RL Robot Arm",
      description:
        "Led a team of 7 students to build a reinforcement learning-based robotic arm that learns to pick and place objects using computer vision. Achieve 90% success rate in object manipulation tasks.",
      technologies: ["OpenAI Gym", "OpenCV", "PyTorch", "Python"],
      github: "https://github.com/leowei31/RoboticArmRL",
      demo: "https://www.youtube.com/watch?v=WiJtKO3sOtU&ab_channel=Naveed",
      image:
        techstart,
    },
    {
      title: "Hack the North",
      description:
        "Developed a Microsoft Teams bot that helps users manage tasks and deadlines using AI. Bot summarizes group conversations, aggregates all direct message and generates calendar with to dos.",
      technologies: ["React", "Flask", "Cohere", "CockroachDB", "Azure"],
      github: "https://github.com/leowei31/HackTheNorth2023",
      demo: "https://devpost.com/software/taskkeepr",
      image:
        htn,
    },
    {
      title: "Nectarfy",
      description:
        "Nectarfy is an app that allows beekeepers to connect to their smarthives through Bluetooth, and brings beekeepers together in a community. It provides real-time hive monitoring, data visualization, and community features.",
      technologies: ["Flutter", "Firebase", "Express.js", "Blutooth Low Energy", "Arduino"],
      github: "https://github.com/leowei31/nectarfy-app",
      // demo: "#",
      image:
        nectarfy,
    },
    {
      title: "Canadian Network on Information and Security Hackathon, Winner",
      description:
        "AI-powered news summarization and fact-checking tool that helps users stay informed and avoid misinformation.",
      technologies: ["NLTK", "Matplotlib", "d3.js", "Spacy", "Node.js"],
      github: "https://github.com/leowei31/CANIS_hackathon",
      demo: "https://devpost.com/software/news-guardian",
      image:
        canis,
    },
    {
      title: "KIMORE dataset visualization",
      description:
        "Animation tool for visualizing kinematic and dynamic data from the KIMORE dataset, used in healthcare sensor research for physical rehabilitation.",
      technologies: ["Matplotlib", "Pandas", "Python", "NumPy"],
      github: "https://github.com/leowei31/KIMORE_Data_Visualization",
      // demo: "#",
      image:
        healthcare_sensor,
    },
    {
      title: "Drone Control System",
      description:
        "AI-powered drone control system for autonomous navigation and obstacle avoidance.",
      technologies: ["Python", "OpenCV", "TensorFlow", "Arduino"],
      image:
        drone,
    }
  ];

  const skills = [
    {
      category: "Languages",
      items: [
        "Python",
        "JavaScript",
        "TypeScript",
        "C++",
        "Java",
        "Kotlin",
        "Rust",
        "Cypher",
        "SQL",
      ],
    },
    {
      category: "AI & Machine Learning",
      items: [
        "Natural Language Processing",
        "Computer Vision",
        "TensorFlow",
        "PyTorch",
        "Scikit-Learn",
        "Hugging Face",
        "Transformers",
        "Langchain",
        "OpenAI Gym",
        "RAG",
        "Reinforcement Learning",
        "Federated Learning"
      ],
    },
    {
      category: "Data & Cloud Technologies",
      items: [
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "Neo4j",
        "Firebase",
        "Redis",
        "Supabase",
        "Pinecone",
        "Docker",
        "Databricks",
        "Azure",
        "AWS",
      ],
    },
    {
      category: "Web & Mobile Development",
      items: [
        "React",
        "Next.js",
        "React Native",
        "Flutter",
        "Django",
        "Flask",
        "FastAPI",
        "Node.js",
        "Express.js",
        "Tailwind CSS",
        "HTML/CSS",
        "RESTful APIs",
      ],
    },
  ];

  const extracurriculars = [
    {
      title: "VP Events and Project Manager",
      organization: "TechStart",
      description:
        "Led a team of 5 in organizing tech events and tech talks with industry guests, reaching over 500 students. Lead project manager for reinforcement learning robotics project, coordinating development and deployment.",
      impact: "Held 3+ events per semester, increasing student engagement by 30%.",
    },
    {
      title: "Aerostructure Engineer",
      organization: "UBC Rocket",
      description:
        "Designed and built rocket structures for high-altitude launches, including nose cones, fins, and payload bays.",
      impact: "Achieved apogee of 3,000 feet with a 10% weight reduction in rocket structure.",
    },
    {
      title: "Mechanical Subteam Engineer",
      organization: "UBC Robotics",
      description:
        "Designed and built mechanical systems for autonomous robots, including chassis, arms, and sensors.",
      impact: "Improved drivetrain efficiency by 20% through optimized gear ratios and weight distribution.",
    },
    {
      title: "Co-Founder and lead developer",
      organization: "Startup, E@UBC Incubator",
      description:
        "Startup incubator program at UBC, providing mentorship and resources to early-stage startups.",
      impact: "First place at 2021-2022 Cohort Demo Day. Second place at RBC Get Seeded.",
    },
  ];

    const academics = [

    {
      title: "Masters of Science in Software Engineering",
      organization: "University of Calgary",
      description:
        [
          "Evolve to innovate scholarship",
          "Graduate assistant scholarship",
          "ACM SIGKDD International Conference on Knowledge Discovery and Data Mining 2023: Published FL Workshop Paper.",
        ],
    },
    {
      title: "Bachelor of Applied Science in Mechanical Engineering with a Minor in Entrepreneurship",
      organization: "University of British Columbia",
      description:
        ["Dean's Honor List", "UBC Engineering Co-op Scholarship"],
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
              ${activeSection === id
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
            <span className="text-white text-sm font-bold">LW</span>
          </div>
        </div>
      </nav>



      <section
        id="about"
        className="relative h-screen snap-start sticky top-0 z-10 flex items-center justify-center px-6 md:pl-20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-amber-50 scroll-fade"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10 scroll-fade">
          <div className="mb-8 animate-fade-in-up">
            <div className="w-42 h-42 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center animate-float shadow-2xl">
              <img src={me} alt="Leo Wei" className="w-full h-full object-cover rounded-full" />
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
              href="https://github.com/leowei31/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/leo-wei/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:hanzhe.wei@ucalgary.ca"
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
                      {project.github ? <a
                        href={project.github}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                      >
                        <Github size={18} />
                        <span>Code </span>
                      </a> : null}
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





      {/* Extracurricular Section */}
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




      {/* academics Section */}
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

      {/* Footer */}
      <footer className="py-12 px-6 bg-gradient-to-r from-[#1e40af] to-[#7c3aed] text-white snap-start md:pl-20">
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
