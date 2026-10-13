import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger } from "../../lib/scroll";
import { useDeviceCapability } from "../../hooks/useDeviceCapability";
import { useTheme } from "../../context/ThemeContext";
import { profile, heroBeats } from "../../data/profile";
import SplitReveal from "../motion/SplitReveal";
import SocialLinks from "../SocialLinks";
import AboutFallback from "./AboutFallback";

// three.js is large - keep it out of the initial bundle so the headline paints immediately
const DevRoom = lazy(() => import("../three/DevRoom"));

const PIN_LENGTH = () => (window.innerWidth < 768 ? "+=420%" : "+=320%");
const smoothWindow = (p, [from, to], fade = 0.04) => {
  if (p <= from - fade || p >= to + fade) return 0;
  if (p < from) return (p - (from - fade)) / fade;
  if (p > to) return 1 - (p - to) / fade;
  return 1;
};

const HeroScene = ({ onObjectClick, onNavigate }) => {
  const { canRender3D, quality } = useDeviceCapability();
  const { isNight } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const sectionRef = useRef(null);
  const progressRef = useRef(0);
  const introRef = useRef(null);
  const beatRefs = useRef([]);
  const barRef = useRef(null);
  const scrimRef = useRef(null);

  // Pause rendering while the hero is off-screen
  useEffect(() => {
    if (!canRender3D || !sectionRef.current) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [canRender3D]);

  // Pin the hero and map scroll progress to camera + captions
  useGSAP(
    () => {
      if (!canRender3D) return;

      const render = (p) => {
        progressRef.current = p;
        gsap.set(introRef.current, {
          opacity: smoothWindow(p, [0, 0.06], 0.05),
          y: -p * 140,
          pointerEvents: p < 0.08 ? "auto" : "none",
        });
        beatRefs.current.forEach((el, i) => {
          if (!el) return;
          const o = smoothWindow(p, heroBeats[i].range);
          gsap.set(el, { autoAlpha: o, y: (1 - o) * 24, pointerEvents: o > 0.5 ? "auto" : "none" });
        });
        gsap.set(scrimRef.current, { opacity: smoothWindow(p, [0, 0.06], 0.05) * 0.85 });
        gsap.set(barRef.current, { scaleY: p });
      };
      render(0);

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => PIN_LENGTH(),
        invalidateOnRefresh: true,
        pin: true,
        scrub: true,
        onUpdate: (self) => render(self.progress),
        onRefresh: (self) => render(self.progress),
      });
      return () => trigger.kill();
    },
    { scope: sectionRef, dependencies: [canRender3D] }
  );

  const handleObjectClick = (objectId, extra) => {
    setHasInteracted(true);
    onObjectClick?.(objectId, extra);
  };

  if (!canRender3D) return <AboutFallback />;

  return (
    <section id="about" ref={sectionRef} className="relative h-svh w-full overflow-hidden">
      {/* Backdrop glow so the room sits in a soft pool of light */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%)",
        }}
      />

      <div className="absolute inset-0">
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center">
              <span className="eyebrow animate-pulse">Building the room...</span>
            </div>
          }
        >
          <DevRoom
            onObjectClick={handleObjectClick}
            isVisible={isVisible}
            isNight={isNight}
            progressRef={progressRef}
            quality={quality}
          />
        </Suspense>
      </div>

      {/* Legibility scrim for text at the bottom */}
      <div
        ref={scrimRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
        style={{ background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)" }}
      />

      {/* Beat 0: introduction */}
      <div ref={introRef} className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-10 md:px-12 md:pb-14">
        <div className="mx-auto flex max-w-[110rem] flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4">{profile.role}</p>
            <SplitReveal
              as="h1"
              immediate
              delay={0.2}
              className="font-display text-[clamp(4.5rem,11vw,11rem)] leading-[0.85] text-fg"
            >
              {profile.name}
            </SplitReveal>
          </div>
          <div className="pointer-events-auto max-w-sm md:pb-3">
            <p className="mb-6 text-lg leading-snug text-muted">{profile.tagline}</p>
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* Narration beats, one per camera stop */}
      {heroBeats.map((beat, i) => (
        <div
          key={beat.eyebrow}
          ref={(el) => (beatRefs.current[i] = el)}
          className={`absolute inset-x-4 bottom-5 z-10 opacity-0 md:inset-x-auto md:bottom-16 md:w-full md:max-w-md ${
            beat.side === "left" ? "md:left-12" : "md:right-12"
          }`}
        >
          <div className="rounded-3xl border border-line bg-bg-elev/80 p-5 shadow-2xl backdrop-blur-xl md:bg-bg-elev/70 md:p-8">
            <p className="eyebrow mb-3 text-accent md:mb-4">{beat.eyebrow}</p>
            <h2 className="font-display mb-3 text-[clamp(1.85rem,3.4vw,3.2rem)] leading-[1.02] text-fg md:mb-4">
              {beat.title}
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-muted md:mb-6">{beat.body}</p>
            <button
              type="button"
              onClick={() => onNavigate?.(beat.cta.target)}
              className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:scale-[1.03]"
            >
              {beat.cta.label}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      ))}

      {/* Scroll cue + progress rail */}
      <div className="pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
        <span className="eyebrow [writing-mode:vertical-rl]">{hasInteracted ? "Keep scrolling" : "Scroll"}</span>
        <div className="relative h-24 w-px bg-line">
          <div ref={barRef} className="absolute inset-0 origin-top bg-accent" style={{ transform: "scaleY(0)" }} />
        </div>
      </div>
    </section>
  );
};

export default HeroScene;
