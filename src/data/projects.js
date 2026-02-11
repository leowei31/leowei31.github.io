import giraff_ai from '../assets/giraff_ai_frontend_demo.gif';
import techstart from '../assets/techstart.gif';
import stanford from '../assets/stanford.jpg';
import canis from '../assets/canis.png';
import drone from '../assets/drone.JPG';
import nectarfy from '../assets/nectarfy.JPG';
import rl from '../assets/rl.JPG';
import htn from '../assets/htn.png';
import healthcare_sensor from '../assets/healthcare_sensor.gif';

export const projects = [
  {
    title: "giraff ai",
    category: "AI Startup",
    description:
      "Enterprise AI search engine that allows users to search through data via a graph and vector database. Achieves 90% accuracy in search results while using 10% of context compared to vector search. Interviewed by YCombinator.",
    technologies: ["Next.js", "FastAPI", "Langchain", "Neo4j", "Pinecone"],
    demo: "https://giraff.ai",
    image: giraff_ai,
  },
  {
    title: "Stanford Treehacks",
    category: "Hackathon",
    description:
      "Real-time chat application with AI powered graph visualization. Users can chat with an LLM and visualize the conversation and LLM reasoning as a graph. Uses Intel Prediction Guard to ensure data privacy and security.",
    technologies: ["React", "Flask", "RAG", "Python", "Intel Prediction Guard", "Langchain"],
    github: "https://github.com/leowei31/Treehacks2024",
    demo: "https://devpost.com/software/llm2graph",
    image: stanford,
  },
  {
    title: "RL Robot Arm",
    category: "Robotics",
    description:
      "Led a team of 7 students to build a reinforcement learning-based robotic arm that learns to pick and place objects using computer vision. Achieve 90% success rate in object manipulation tasks.",
    technologies: ["OpenAI Gym", "OpenCV", "PyTorch", "Python"],
    github: "https://github.com/leowei31/RoboticArmRL",
    demo: "https://www.youtube.com/watch?v=WiJtKO3sOtU&ab_channel=Naveed",
    image: techstart,
  },
  {
    title: "Hack the North",
    category: "Hackathon",
    description:
      "Developed a Microsoft Teams bot that helps users manage tasks and deadlines using AI. Bot summarizes group conversations, aggregates all direct message and generates calendar with to dos.",
    technologies: ["React", "Flask", "Cohere", "CockroachDB", "Azure"],
    github: "https://github.com/leowei31/HackTheNorth2023",
    demo: "https://devpost.com/software/taskkeepr",
    image: htn,
  },
  {
    title: "Nectarfy",
    category: "IoT",
    description:
      "Nectarfy is an app that allows beekeepers to connect to their smarthives through Bluetooth, and brings beekeepers together in a community. It provides real-time hive monitoring, data visualization, and community features.",
    technologies: ["Flutter", "Firebase", "Express.js", "Blutooth Low Energy", "Arduino"],
    github: "https://github.com/leowei31/nectarfy-app",
    image: nectarfy,
  },
  {
    title: "Canadian Network on Information and Security Hackathon, Winner",
    category: "Hackathon",
    description:
      "AI-powered news summarization and fact-checking tool that helps users stay informed and avoid misinformation.",
    technologies: ["NLTK", "Matplotlib", "d3.js", "Spacy", "Node.js"],
    github: "https://github.com/leowei31/CANIS_hackathon",
    demo: "https://devpost.com/software/news-guardian",
    image: canis,
  },
  {
    title: "KIMORE dataset visualization",
    category: "Research",
    description:
      "Animation tool for visualizing kinematic and dynamic data from the KIMORE dataset, used in healthcare sensor research for physical rehabilitation.",
    technologies: ["Matplotlib", "Pandas", "Python", "NumPy"],
    github: "https://github.com/leowei31/KIMORE_Data_Visualization",
    image: healthcare_sensor,
  },
  {
    title: "Drone Control System",
    category: "Robotics",
    description:
      "AI-powered drone control system for autonomous navigation and obstacle avoidance.",
    technologies: ["Python", "OpenCV", "TensorFlow", "Arduino"],
    image: drone,
  },
];
