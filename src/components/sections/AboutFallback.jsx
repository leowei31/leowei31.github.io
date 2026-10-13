import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";
import { gsap } from "../../lib/scroll";
import { profile } from "../../data/profile";
import me from "../../assets/me.webp";
import SplitReveal from "../motion/SplitReveal";
import SocialLinks from "../SocialLinks";

const RING_TEXT = "SOFTWARE ENGINEER * ML RESEARCHER * BUILDER * ";

/**
 * Hero for devices that can't run the 3D room (no WebGL, very low-end, reduced motion).
 * The portrait sits inside a ring of rotating type that speeds up as you scroll.
 */
const AboutFallback = () => {
  const ref = useRef(null);
  const portrait = useRef(null);
  const ring = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(portrait.current, { scale: 0.8, opacity: 0, duration: 1.4, ease: "expo.out", delay: 0.1 });
        gsap.to(ring.current, { rotation: 360, duration: 40, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
        gsap.to(ring.current, {
          rotation: "+=180",
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(portrait.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      id="about"
      ref={ref}
      className="relative flex min-h-svh flex-col justify-end overflow-hidden px-6 pb-12 pt-28 md:px-12"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 30%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[110rem] flex-1 items-center justify-center py-6">
        <div ref={portrait} className="relative aspect-square w-[min(82vw,26rem)]">
          <svg
            ref={ring}
            viewBox="0 0 200 200"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full overflow-visible text-fg"
          >
            <defs>
              <path id="ring-path" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" />
            </defs>
            <text className="fill-current font-mono" fontSize="9.5" textLength="548" lengthAdjust="spacing">
              <textPath href="#ring-path">{RING_TEXT}</textPath>
            </text>
          </svg>
          <div className="absolute inset-[11%] overflow-hidden rounded-full border border-line bg-bg-elev">
            <img src={me} alt="Leo Wei" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[110rem]">
        <p className="eyebrow mb-4">{profile.role}</p>
        <SplitReveal
          as="h1"
          immediate
          delay={0.2}
          className="font-display mb-6 text-[clamp(4.5rem,22vw,14rem)] leading-[0.85] text-fg"
        >
          {profile.name}
        </SplitReveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-sm text-lg leading-snug text-muted">{profile.tagline}</p>
          <div className="flex items-center gap-6">
            <SocialLinks />
            <ArrowDown size={20} className="animate-bounce text-muted" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFallback;
