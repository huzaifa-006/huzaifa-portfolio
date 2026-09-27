import Link from "next/link";
import { profile } from "@/data/profile";
import { navLinks } from "@/data/site";
import { allSocialLinks } from "@/data/socialLinks";
import { SocialGlyph } from "./Icons";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg-2/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr] md:items-start">
        <div>
          <p className="font-display text-lg font-semibold text-ink">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">{profile.headline.join(" · ")}</p>
          <p className="mt-1 text-sm text-muted">{profile.location}</p>
          <ul className="mt-5 flex flex-wrap items-center gap-2" aria-label="Profiles">
            {allSocialLinks.map((s) => {
              const ext = s.href.startsWith("http");
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={`${s.label}${ext ? " (opens in new tab)" : ""}`}
                    className="grid size-10 place-items-center rounded-xl border border-line text-muted transition hover:border-accent/50 hover:text-ink"
                  >
                    <SocialGlyph icon={s.icon} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm sm:grid-cols-3 md:justify-items-start">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted transition hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs leading-relaxed text-muted sm:px-6">
          © {new Date().getFullYear()} {profile.name}. Project visuals are labelled: conceptual workflow diagrams and charts drawn from each
          project&apos;s own data. None are presented as screenshots unless stated.
        </p>
      </div>
    </footer>
  );
}
