import { profile } from "@/data/profile";
import { allSocialLinks } from "@/data/socialLinks";
import { projects } from "@/data/projects";
import { visibleCertifications } from "@/data/certifications";
import { withBase } from "@/data/site";
import { Button } from "@/components/ui";
import { ArrowRight, Download, Mail, MapPin, ShieldCheck, SocialGlyph } from "@/components/Icons";

const toolkit = ["Python", "Pandas", "Scikit-learn", "PyTorch", "SQL", "Streamlit", "Docker"];

export default function Hero() {
  const caseStudies = projects.filter((p) => p.caseStudy).length;
  return (
    <section id="home" aria-labelledby="hero-title" className="relative pt-24 pb-14 sm:pt-36 md:pb-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-[1.25fr_0.75fr] md:gap-12 lg:gap-16">
        {/* Text */}
        <div className="order-2 md:order-1">
          {profile.availability && (
            <p
              className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-panel/80 px-3 py-1.5 text-xs font-medium text-ink-2 shadow-card"
              style={{ ["--d" as string]: "0ms" }}
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-50 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {profile.availability}
            </p>
          )}

          <h1
            id="hero-title"
            className="animate-fade-up font-display text-[2.5rem] leading-[1.05] font-semibold tracking-tight text-balance text-ink sm:text-5xl lg:text-[3.6rem]"
            style={{ ["--d" as string]: "60ms" }}
          >
            {profile.name}
          </h1>

          <p
            className="animate-fade-up mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-lg font-medium text-ink-2 sm:text-xl"
            style={{ ["--d" as string]: "120ms" }}
          >
            {profile.headline.map((h, i) => (
              // On phones the last item drops to its own line, so no separator starts a line.
              <span key={h} className={`flex items-center gap-3 ${i === profile.headline.length - 1 ? "basis-full xl:basis-auto" : ""}`}>
                {i > 0 && (
                  <span className={`h-4 w-px bg-line-strong ${i === profile.headline.length - 1 ? "hidden xl:block" : ""}`} aria-hidden />
                )}
                <span className={i === 0 ? "text-accent" : ""}>{h}</span>
              </span>
            ))}
          </p>

          <p
            className="animate-fade-up mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-[17px]"
            style={{ ["--d" as string]: "180ms" }}
          >
            {profile.heroSummary}
          </p>

          <div className="animate-fade-up mt-8 flex flex-wrap gap-3" style={{ ["--d" as string]: "240ms" }}>
            <Button href="/#projects">
              View Projects <ArrowRight size={16} />
            </Button>
            <Button href={withBase(profile.cvPath)} variant="secondary" download>
              <Download size={16} /> Download CV
            </Button>
            <Button href="/#contact" variant="ghost">
              <Mail size={16} /> Contact Me
            </Button>
          </div>

          <div
            className="animate-fade-up mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted"
            style={{ ["--d" as string]: "300ms" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={16} /> {profile.location}
            </span>
            <ul className="flex items-center gap-1" aria-label="Profiles">
              {allSocialLinks
                .filter((s) => s.icon !== "mail")
                .map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.label} (opens in new tab)`}
                      className="grid size-9 place-items-center rounded-lg text-muted transition hover:bg-ink/5 hover:text-ink"
                    >
                      <SocialGlyph icon={s.icon} size={17} />
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Portrait */}
        <div className="order-1 mx-auto w-full max-w-[184px] sm:max-w-[240px] md:order-2 md:max-w-[300px]">
          <div className="animate-photo-in relative">
            {/* soft glow */}
            <div className="absolute inset-[-12%] -z-10 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_22%,transparent)_0%,transparent_65%)]" aria-hidden />
            {/* orbit ring with data points */}
            <svg className="animate-spin-slow absolute inset-[-9%] -z-10 size-[118%] text-line-strong" viewBox="0 0 100 100" aria-hidden>
              <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1 2.2" />
              <circle cx="50" cy="1" r="1.1" fill="var(--accent)" />
              <circle cx="92.4" cy="74.5" r="0.9" fill="var(--indigo)" />
              <circle cx="7.6" cy="74.5" r="0.7" fill="var(--accent)" opacity="0.7" />
            </svg>
            {/* gradient ring + photo */}
            <div className="rounded-full bg-[conic-gradient(from_210deg,var(--photo-ring-a),var(--photo-ring-b),var(--photo-ring-a))] p-[3px] shadow-lift">
              <div className="overflow-hidden rounded-full border-4 border-bg bg-[linear-gradient(160deg,var(--photo-bg-a),var(--photo-bg-b))]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={withBase(profile.photo.src)}
                  srcSet={`${withBase(profile.photo.srcSmall)} 360w, ${withBase(profile.photo.src)} 720w`}
                  sizes="(max-width: 640px) 184px, (max-width: 768px) 240px, 300px"
                  alt={profile.photo.alt}
                  width={profile.photo.width}
                  height={profile.photo.height}
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-square h-auto w-full translate-y-[5%] object-cover"
                />
              </div>
            </div>

            {/* small verified facts */}
            <a
              href="#certifications"
              className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-line bg-panel/95 px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-ink shadow-card backdrop-blur transition hover:border-accent/50"
            >
              <ShieldCheck size={15} className="text-accent" />
              {visibleCertifications.length} IBM certifications
              <span className="text-dim">·</span>
              <span className="text-muted">{caseStudies} case studies</span>
            </a>
          </div>
        </div>
      </div>

      {/* Toolkit strip */}
      <div className="animate-fade-up mx-auto mt-14 max-w-6xl px-4 sm:px-6" style={{ ["--d" as string]: "380ms" }}>
        <div className="flex flex-col gap-3 rounded-2xl border border-line bg-panel/70 px-4 py-3.5 shadow-card sm:flex-row sm:items-center sm:gap-5 sm:px-5">
          <p className="shrink-0 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Core toolkit</p>
          <span className="hidden h-4 w-px bg-line-strong sm:block" aria-hidden />
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[13px] text-ink-2" aria-label="Core toolkit">
            {toolkit.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
