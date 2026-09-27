import { education, profile } from "@/data/profile";
import { socialLinks } from "@/data/socialLinks";
import { Section, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "@/components/Icons";

export default function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <SectionHeading id="about-title" eyebrow="About" title="Early-career, hands-on, focused on data." />
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-5 text-base leading-relaxed text-ink-2 sm:text-lg">
          {profile.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={120}>
          <aside aria-label="At a glance" className="rounded-2xl border border-line bg-panel/70 p-6">
            <h3 className="font-mono text-xs tracking-[0.2em] text-dim uppercase">At a glance</h3>
            <dl className="mt-5 space-y-4">
              {profile.facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[92px_1fr] gap-3 text-sm">
                  <dt className="text-muted">{f.label}</dt>
                  <dd className="text-ink">{f.value}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[92px_1fr] gap-3 text-sm">
                <dt className="text-muted">CGPA</dt>
                <dd className="text-ink">{education.cgpa}</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
              {[socialLinks.linkedin, socialLinks.upwork, socialLinks.fiverr].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-sm text-ink-2 transition hover:border-accent/50 hover:text-white"
                >
                  {s.label} <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
