import { profile } from "@/data/profile";
import { allSocialLinks } from "@/data/socialLinks";
import { SocialGlyph } from "./Icons";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line/70">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center">
        <div>
          <p className="font-display font-semibold text-white">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">{profile.role} · {profile.location}</p>
        </div>
        <ul className="flex flex-wrap items-center gap-2" aria-label="Profiles">
          {allSocialLinks.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={`${s.label}${s.href.startsWith("http") ? " (opens in new tab)" : ""}`}
                className="grid size-10 place-items-center rounded-lg border border-line text-muted transition hover:border-accent/50 hover:text-white"
              >
                <SocialGlyph icon={s.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="mx-auto max-w-6xl px-4 pb-8 text-xs text-dim sm:px-6">
        © {new Date().getFullYear()} {profile.name}. Project visuals are labelled illustrations or charts drawn from each project&apos;s own data — not screenshots unless stated.
      </p>
    </footer>
  );
}
