import { ArrowUp, ArrowUpRight } from "lucide-react";
import { profile } from "../../data/profile";
import { scrollToTarget } from "../../lib/scroll";
import SplitReveal from "../motion/SplitReveal";
import SocialLinks from "../SocialLinks";

/**
 * Curtain footer: it sits underneath the page (sticky to the bottom) and is
 * uncovered as the last section scrolls away. Inverted colours for a clean ending.
 */
const Footer = () => (
  <footer className="sticky bottom-0 z-0 flex min-h-[85vh] flex-col justify-between bg-fg px-6 pb-8 pt-24 text-bg md:px-12">
    <div className="mx-auto w-full max-w-[110rem]">
      <p className="eyebrow mb-6 text-bg/60!">What's next</p>
      <SplitReveal
        as="h2"
        className="font-display text-[clamp(3.5rem,12vw,11rem)] leading-[0.9] text-bg"
      >
        Let's build something worth building.
      </SplitReveal>

      <a
        href={`mailto:${profile.email}`}
        className="group mt-12 inline-flex items-center gap-3 border-b border-bg/30 pb-2 text-xl transition-colors hover:border-accent hover:text-accent md:text-3xl"
      >
        {profile.email}
        <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
      </a>
    </div>

    <div className="mx-auto mt-20 flex w-full max-w-[110rem] flex-col gap-8 border-t border-bg/15 pt-8 md:flex-row md:items-center md:justify-between">
      <SocialLinks tone="inverse" />
      <p className="font-mono text-xs text-bg/50">
        &copy; {new Date().getFullYear()} {profile.name} - Built with React, three.js, GSAP &amp; Lenis
      </p>
      <button
        type="button"
        onClick={() => scrollToTarget(0, { duration: 2.4 })}
        className="inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-widest text-bg/70 transition-colors hover:text-accent md:self-auto"
      >
        Back to top <ArrowUp size={14} />
      </button>
    </div>
  </footer>
);

export default Footer;
