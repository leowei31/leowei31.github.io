import { useState, useEffect, useCallback } from "react";
import { scrollToTarget } from "../lib/scroll";

export const SECTIONS = [
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
    // A section is "active" while it crosses the vertical middle of the viewport.
    // IntersectionObserver is immune to the layout shifts caused by pinned sections.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    let frame = requestAnimationFrame(() => {
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    if (sectionId === "about") {
      scrollToTarget(0);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) scrollToTarget(el);
  }, []);

  return { activeSection, scrollToSection, sections: SECTIONS };
};
