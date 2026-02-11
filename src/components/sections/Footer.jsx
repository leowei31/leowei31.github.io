import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 px-6 bg-gradient-to-br from-[#1e3a5f] via-[#1e40af] to-[#5b21b6] text-white snap-start md:pl-16">
      <div className="w-full max-w-2xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
          Let's Connect
        </h3>
        <p className="text-blue-200/60 mb-8">
          Always interested in new opportunities and collaborations
        </p>
        <div className="flex justify-center gap-4 mb-10">
          <a
            href="https://github.com/leowei31/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/70 hover:text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <Github size={22} />
          </a>
          <a
            href="https://www.linkedin.com/in/leo-wei/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/70 hover:text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <Linkedin size={22} />
          </a>
          <a
            href="mailto:hanzhe.wei@ucalgary.ca"
            className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/70 hover:text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <Mail size={22} />
          </a>
        </div>
        <div className="pt-6 border-t border-white/10">
          <p className="text-blue-200/40 text-sm">
            &copy; {new Date().getFullYear()} Leo Wei. Built with React &
            Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
