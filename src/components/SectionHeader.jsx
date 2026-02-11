import React from "react";

const SectionHeader = ({ label, title }) => (
  <div className="text-center mb-16">
    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-500/80 mb-3 block">
      {label}
    </span>
    <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
      {title}
    </h2>
    <div className="section-line" />
  </div>
);

export default SectionHeader;
