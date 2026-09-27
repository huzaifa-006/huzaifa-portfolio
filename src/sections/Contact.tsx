import { profile } from "@/data/profile";
import { socialLinks } from "@/data/socialLinks";
import { withBase } from "@/data/site";
import { Section, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import CopyEmail from "@/components/CopyEmail";
import { ArrowUpRight, Download, SocialGlyph } from "@/components/Icons";

const profiles = [socialLinks.linkedin, socialLinks.github, socialLinks.upwork, socialLinks.fiverr];

export default function Contact() {
  return (
    <Section id="contact" labelledBy="contact-title">
      <SectionHeading
        id="contact-title"
        index="08"
        eyebrow="Contact"
        title="Let's work together."
        intro="Hiring for a data or ML role, or have a project in mind? Email is the fastest way to reach me. You can also use the form or any of the profiles below."
      />
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
        <Reveal className="flex flex-col gap-4">
          <div className="card relative overflow-hidden p-5 sm:p-6">
            <div className="absolute -top-16 -right-16 size-48 rounded-full bg-accent/10 blur-3xl" aria-hidden />
            <p className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">Email</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-1.5 block font-display text-lg font-semibold break-all text-ink transition hover:text-accent sm:text-xl"
            >
              {profile.email}
            </a>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-accent px-3.5 text-xs font-semibold text-accent-ink transition hover:bg-accent-hover"
              >
                Send an email
              </a>
              <CopyEmail email={profile.email} />
            </div>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {profiles.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label}: ${s.handle} (opens in new tab)`}
                  className="card card-hover group flex items-center justify-between gap-3 px-4 py-3.5"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-panel-2 text-ink">
                      <SocialGlyph icon={s.icon} size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-ink">{s.label}</span>
                      <span className="block truncate text-xs text-muted">{s.handle}</span>
                    </span>
                  </span>
                  <ArrowUpRight size={16} className="shrink-0 text-muted transition group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href={withBase(profile.cvPath)}
            download
            className="card card-hover flex items-center justify-between gap-3 px-4 py-3.5 text-sm font-semibold text-ink"
          >
            <span className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg border border-line bg-panel-2">
                <Download size={17} />
              </span>
              Download CV
            </span>
            <span className="text-xs font-normal text-muted">PDF · 1 page</span>
          </a>
        </Reveal>

        <Reveal delay={100}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
