import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import me from "../../assets/me.png";

const AboutFallback = () => {
  return (
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
            <img
              src={me}
              alt="Leo Wei"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 animate-fade-in-up animation-delay-500">
            Leo Wei
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-1000">
            Passionate about creating things that make a difference.
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
  );
};

export default AboutFallback;
