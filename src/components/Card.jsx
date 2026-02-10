import React from "react";

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 ${className}`}
  >
    {children}
  </div>
);

export default Card;
