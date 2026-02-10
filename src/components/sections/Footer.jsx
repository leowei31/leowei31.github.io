import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-gradient-to-r from-[#1e40af] to-[#7c3aed] text-white snap-start md:pl-20">
      <div className="w-full text-center">
        <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
        <p className="text-gray-400 mb-6">
          Always interested in new opportunities and collaborations
        </p>
        <div className="flex justify-center space-x-6 mb-8">
          <a
            href="https://github.com/leowei31/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/leo-wei/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:hanzhe.wei@ucalgary.ca"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Mail size={24} />
          </a>
        </div>
        <div className="pt-8 border-t border-gray-800">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Leo Wei. Built with React &
            Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
