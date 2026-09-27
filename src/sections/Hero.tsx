import Image from "next/image";
import Link from "next/link";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/socialLinks";
import { featuredProjects } from "@/data/projects";
import { visibleCertifications } from "@/data/certifications";
import { withBase } from "@/data/site";
import { Button } from "@/components/ui";
import { ArrowRight, Download, GitHubIcon, LinkedInIcon, Mail, MapPin } from "@/components/Icons";

export default function Hero() {
  const stack = ["Python", "Pandas", "Scikit-learn", "SQL", "Docker"];
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 md:pb-24">
      <div className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-[1.15fr_0.85fr] md:gap-8">
        {/* Text */}
        <div className="animate-fade-up">
          {profile.availability && (
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-3 py-1.5 text-xs font-medium text-ink-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {profile.availability}
            </p>
          )}

          <h1 id="hero-title" className="font-display text-4xl leading-[1.05] font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-4 font-display text-xl font-medium text-accent sm:text-2xl">{profile.role}</p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-2 sm:text-lg">{profile.heroSummary}</p>

          <p className="mt-5 flex items-center gap-2 text-sm text-muted">
            <MapPin size={16} /> {profile.location}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/#projects">
              View projects <ArrowRight size={16} />
            </Button>
            <Button href={withBase(profile.cvPath)} variant="secondary" download>
              <Download size={16} /> Download CV
            </Button>
            <Button href={socialLinks.github.href} variant="secondary" external ariaLabel="GitHub profile (opens in new tab)">
              <GitHubIcon size={16} /> GitHub
            </Button>
            <Button href={socialLinks.linkedin.href} variant="secondary" external ariaLabel="LinkedIn profile (opens in new tab)">
              <LinkedInIcon size={16} /> LinkedIn
            </Button>
            <Button href="/#contact" variant="ghost">
              <Mail size={16} /> Contact me
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Core stack">
            {stack.map((s) => (
              <li key={s} className="rounded-md border border-line bg-panel/60 px-2 py-1 font-mono text-xs text-ink-2">
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Portrait composition */}
        <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[380px] md:max-w-[420px]">
          <div className="relative aspect-[4/4.6]">
            {/* backdrop panel */}
            <div className="absolute inset-x-0 bottom-0 top-[14%] overflow-hidden rounded-[28px] border border-line-strong/80 bg-gradient-to-b from-panel-2 to-bg-2 shadow-[0_40px_80px_-40px_rgba(0,0,0,.8)]">
              <div className="absolute -right-16 -top-16 size-64 rounded-full bg-accent/20 blur-3xl" aria-hidden />
              <div className="absolute -bottom-20 -left-10 size-64 rounded-full bg-indigo/20 blur-3xl" aria-hidden />
              {/* faint chart lines */}
              <svg className="absolute inset-x-6 top-8 h-24 w-[calc(100%-3rem)] opacity-40" viewBox="0 0 300 80" preserveAspectRatio="none" aria-hidden>
                <polyline points="0,60 30,52 60,56 90,40 120,44 150,28 180,34 210,20 240,24 270,12 300,16" fill="none" stroke="#2dd4bf" strokeWidth="1.5" />
                <polyline points="0,70 30,66 60,68 90,58 120,62 150,50 180,54 210,44 240,48 270,38 300,40" fill="none" stroke="#818cf8" strokeWidth="1" strokeDasharray="3 4" />
              </svg>
            </div>
            <Image
              src={withBase(profile.photo.src)}
              alt={profile.photo.alt}
              width={profile.photo.width}
              height={profile.photo.height}
              priority
              sizes="(max-width: 768px) 380px, 420px"
              className="absolute inset-x-0 bottom-0 mx-auto w-[96%] rounded-b-[28px] [mask-image:linear-gradient(to_bottom,#000_88%,transparent)]"
            />
          </div>

          {/* floating facts */}
          <div className="animate-float-slow absolute -left-3 top-[32%] rounded-xl border border-line-strong bg-bg/85 px-3.5 py-2.5 shadow-xl backdrop-blur sm:-left-8">
            <p className="font-mono text-[10px] tracking-widest text-dim uppercase">Projects</p>
            <p className="font-display text-lg font-semibold text-white">{featuredProjects.length} case studies</p>
          </div>
          <div className="animate-float-slow absolute -right-2 bottom-[16%] rounded-xl border border-line-strong bg-bg/85 px-3.5 py-2.5 shadow-xl backdrop-blur [animation-delay:1.5s] sm:-right-6">
            <p className="font-mono text-[10px] tracking-widest text-dim uppercase">Verified</p>
            <p className="font-display text-lg font-semibold text-white">{visibleCertifications.length} IBM badges</p>
          </div>
        </div>
      </div>

      {/* Quick links to the strongest projects — for recruiters scanning in 30 seconds */}
      <nav aria-label="Featured case studies" className="mx-auto mt-14 max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-3 rounded-2xl border border-line bg-panel/50 p-4 sm:flex-row sm:items-center sm:gap-5 sm:px-5">
          <p className="shrink-0 font-mono text-[11px] tracking-[0.18em] text-dim uppercase">Case studies</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {featuredProjects.map((p) => (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}/`} className="font-medium text-ink-2 underline-offset-4 transition hover:text-accent hover:underline">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </section>
  );
}
