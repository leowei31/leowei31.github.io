import { useState, useEffect, useCallback } from "react";

const SECTIONS = [
  "about",
  "experience",
  "projects",
  "extracurricular",
  "academics",
  "skills",
];

export const useScrollSection = () => {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + 200;
          for (const section of SECTIONS) {
            const element = document.getElementById(section);
            if (element) {
              const { offsetTop, offsetHeight } = element;
              if (
                scrollPosition >= offsetTop &&
                scrollPosition < offsetTop + offsetHeight
              ) {
                setActiveSection((prev) =>
                  prev !== section ? section : prev
                );
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

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return { activeSection, scrollToSection, sections: SECTIONS };
};
