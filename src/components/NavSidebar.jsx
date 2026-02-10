import React from "react";
import {
  User,
  Briefcase,
  Code,
  Trophy,
  BookText,
  ChartColumnIncreasing,
} from "lucide-react";

const navItems = [
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: Code },
  { id: "extracurricular", label: "Activities", icon: Trophy },
  { id: "academics", label: "Academics", icon: BookText },
  { id: "skills", label: "Skills", icon: ChartColumnIncreasing },
];

const NavSidebar = ({ activeSection, onNavigate }) => {
  return (
    <nav className="fixed left-0 top-0 h-full w-20 bg-transparent backdrop-blur-md shadow-xl z-50 hidden md:flex flex-col justify-center isolation-isolate">
      <div className="flex flex-col space-y-6 px-4">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
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

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">LW</span>
        </div>
      </div>
    </nav>
  );
};

export default NavSidebar;
