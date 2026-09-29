import { socialLinks, type SocialLink } from "@/data/socialLinks";
import { ArrowUpRight, SocialGlyph } from "./Icons";

const profiles: SocialLink[] = [socialLinks.linkedin, socialLinks.github, socialLinks.upwork, socialLinks.fiverr];

/**
 * Labelled profile buttons (icon + platform name), never icon-only.
 * size "md" for the hero/contact, "sm" for the footer.
 */
export default function SocialButtons({ size = "md", className = "" }: { size?: "sm" | "md"; className?: string }) {
  const pad = size === "md" ? "h-11 px-4 text-sm" : "h-10 px-3.5 text-[13px]";
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Professional profiles">
      {profiles.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.label} profile (opens in new tab)`}
            className={`group inline-flex items-center gap-2 rounded-xl border border-line-strong bg-panel font-semibold text-ink shadow-card transition-all duration-200 hover:-translate-y-px hover:border-accent/60 hover:text-accent ${pad}`}
          >
            <SocialGlyph icon={s.icon} size={size === "md" ? 17 : 16} />
            {s.label}
            <ArrowUpRight size={14} className="text-muted transition-colors group-hover:text-accent" />
          </a>
        </li>
      ))}
    </ul>
  );
}
