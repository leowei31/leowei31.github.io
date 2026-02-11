import React from "react";

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg transition-all duration-500 transform hover:-translate-y-2 hover:border-white/70 hover:bg-white/80 glass-glow ${className}`}
  >
    {children}
  </div>
);

export default Card;
