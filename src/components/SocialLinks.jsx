import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/profile";

const LINKS = [
  { href: profile.github, label: "GitHub", Icon: Github },
  { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
];

const SocialLinks = ({ className = "", tone = "default" }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    {LINKS.map(({ href, label, Icon }) => (
      <a
        key={label}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        aria-label={label}
        className={`flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 ${
          tone === "inverse"
            ? "border-bg/25 text-bg hover:border-bg"
            : "border-line bg-bg-elev/60 text-fg hover:border-fg"
        }`}
      >
        <Icon size={18} />
      </a>
    ))}
  </div>
);

export default SocialLinks;
