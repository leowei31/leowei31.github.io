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
    <nav className="fixed left-0 top-0 h-full w-16 bg-white/40 backdrop-blur-xl border-r border-white/30 z-50 hidden md:flex flex-col justify-center isolation-isolate">
      <div className="flex flex-col space-y-2 px-2">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className="group relative flex items-center justify-center p-3 rounded-xl transition-all duration-300"
            >
              {/* Active indicator bar */}
              <div
                className={`absolute left-0 w-1 rounded-full bg-gradient-to-b from-blue-500 to-purple-500 transition-all duration-300 ${
                  isActive ? "h-6 opacity-100" : "h-0 opacity-0"
                }`}
              />

              <Icon
                size={20}
                className={`transition-all duration-300 ${
                  isActive
                    ? "text-blue-600 scale-110"
                    : "text-gray-400 group-hover:text-blue-500 group-hover:scale-110"
                }`}
              />

              {/* Tooltip */}
              <div className="nav-tooltip absolute left-full ml-3 px-2.5 py-1 bg-gray-900/90 text-white text-xs font-medium rounded-md whitespace-nowrap backdrop-blur-sm">
                {label}
              </div>
            </button>
          );
        })}
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white text-xs font-bold">LW</span>
        </div>
      </div>
    </nav>
  );
};

export default NavSidebar;
