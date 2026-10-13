import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { getLenis } from "../lib/scroll";
import { useTheme } from "../context/ThemeContext";

const navItems = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "extracurricular", label: "Activities" },
  { id: "academics", label: "Academics" },
  { id: "skills", label: "Skills" },
];

const iconButton =
  "relative flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg-elev/60 text-fg backdrop-blur-md transition-all duration-300 hover:border-fg";

/**
 * Floating top bar: brand, section pill and theme toggle.
 * Hides while scrolling down through content, returns on scroll up.
 */
const NavSidebar = ({ activeSection, onNavigate, onToggleTheme }) => {
  const { isNight } = useTheme();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef(null);

  // Hide-on-scroll-down + scroll progress, driven by Lenis (falls back to native scroll)
  useEffect(() => {
    let lastY = window.scrollY;
    const update = (y, direction) => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      const pastHero = y > window.innerHeight * 4.4;
      setHidden(pastHero && direction > 0);
    };

    const lenis = getLenis();
    if (lenis) {
      const onScroll = ({ scroll, direction }) => update(scroll, direction);
      lenis.on("scroll", onScroll);
      return () => lenis.off("scroll", onScroll);
    }
    const onScroll = () => {
      update(window.scrollY, Math.sign(window.scrollY - lastY));
      lastY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll under the mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    getLenis()?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      getLenis()?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const go = (id) => {
    setMenuOpen(false);
    // Wait a frame so Lenis is running again before scrolling
    requestAnimationFrame(() => onNavigate(id));
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto flex max-w-[110rem] items-center justify-between px-4 py-4 md:px-8">
          <button
            type="button"
            onClick={() => go("about")}
            className="flex items-center gap-3 rounded-full border border-line bg-bg-elev/60 py-1.5 pl-1.5 pr-4 backdrop-blur-md transition-colors hover:border-fg"
            aria-label="Back to top"
          >
            <img src="/me_logo.png" alt="" className="h-7 w-7 rounded-full object-cover" />
            <span className="text-sm font-medium tracking-tight text-fg">Leo Wei</span>
          </button>

          <nav
            aria-label="Sections"
            className="hidden items-center gap-1 rounded-full border border-line bg-bg-elev/60 p-1 backdrop-blur-md md:flex"
          >
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => go(id)}
                aria-current={activeSection === id ? "true" : undefined}
                className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                  activeSection === id ? "bg-fg text-bg" : "text-muted hover:text-fg"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={isNight ? "Switch to day theme" : "Switch to night theme"}
              className={iconButton}
            >
              {isNight ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className={`${iconButton} md:hidden`}
            >
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>

        {/* Scroll progress */}
        <div className="h-px w-full bg-transparent">
          <div ref={progressRef} className="h-full origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-bg px-8 transition-all duration-500 md:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <ul className="space-y-2">
          {[{ id: "about", label: "Intro" }, ...navItems].map(({ id, label }, i) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => go(id)}
                className="font-display flex w-full items-baseline gap-4 text-left text-6xl text-fg"
                style={{ transitionDelay: `${menuOpen ? i * 50 : 0}ms` }}
              >
                <span className="eyebrow">{String(i).padStart(2, "0")}</span>
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NavSidebar;
