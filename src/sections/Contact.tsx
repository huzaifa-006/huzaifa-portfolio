import { profile } from "@/data/profile";
import { allSocialLinks } from "@/data/socialLinks";
import { withBase } from "@/data/site";
import { Section, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { ArrowUpRight, Download, SocialGlyph } from "@/components/Icons";

export default function Contact() {
  return (
    <Section id="contact" labelledBy="contact-title">
      <SectionHeading
        id="contact-title"
        eyebrow="Contact"
        title="Let's talk."
        intro="Hiring for a junior data role, or need help with a dataset? Email is the fastest way to reach me."
      />
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <a
            href={`mailto:${profile.email}`}
            className="group block rounded-2xl border border-accent/30 bg-accent/[0.06] p-5 transition hover:border-accent/60"
          >
            <span className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">Email</span>
            <span className="mt-1 block font-display text-lg font-semibold break-all text-white sm:text-xl">{profile.email}</span>
          </a>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {allSocialLinks
              .filter((s) => s.icon !== "mail")
              .map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-panel/60 px-4 py-3 transition hover:border-line-strong"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-ink"><SocialGlyph icon={s.icon} size={20} /></span>
                      <span>
                        <span className="block text-sm font-semibold text-white">{s.label}</span>
                        <span className="block text-xs text-muted">{s.handle}</span>
                      </span>
                    </span>
                    <ArrowUpRight size={16} className="text-muted transition group-hover:text-accent" />
                  </a>
                </li>
              ))}
          </ul>
          <a
            href={withBase(profile.cvPath)}
            download
            className="mt-4 flex items-center justify-between rounded-xl border border-line bg-panel/60 px-4 py-3 text-sm font-semibold text-white transition hover:border-line-strong"
          >
            <span className="flex items-center gap-3"><Download size={18} /> Download CV (PDF)</span>
            <span className="text-xs font-normal text-muted">1 page</span>
          </a>
        </Reveal>
        <Reveal delay={100}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
