import { profile } from "@/data/profile";
import { withBase } from "@/data/site";
import { Section, SectionHeading, TextLink } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { IconBrain, IconCode, IconDatabase, IconModel } from "@/components/Icons";

const focus = [
  { icon: IconDatabase, title: "Data Science", text: "Cleaning, validation, EDA and statistics in Python & SQL." },
  { icon: IconModel, title: "Machine Learning", text: "Classification, regression, tuning and explainability." },
  { icon: IconBrain, title: "AI / NLP", text: "Transformer models with PyTorch and Hugging Face." },
  { icon: IconCode, title: "Engineering", text: "Docker, CI/CD and Git for reproducible delivery." },
];

export default function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <SectionHeading id="about-title" index="02" eyebrow="About" title="Practical data science, built to be reproducible." />
      <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
        <div>
          <Reveal className="space-y-5 text-base leading-relaxed text-pretty text-ink-2 sm:text-[17px]">
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
          <ul className="mt-9 grid gap-3 sm:grid-cols-2">
            {focus.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 60}>
                <div className="card flex h-full gap-3.5 p-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-accent/25 bg-accent/10 text-accent">
                    <f.icon size={18} />
                  </span>
                  <span>
                    <span className="block font-display text-[15px] font-semibold text-ink">{f.title}</span>
                    <span className="mt-0.5 block text-sm leading-snug text-muted">{f.text}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={120}>
          <aside aria-labelledby="glance-title" className="card p-6 lg:sticky lg:top-24">
            <h3 id="glance-title" className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
              At a glance
            </h3>
            <dl className="mt-5 divide-y divide-line">
              {profile.facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[100px_1fr] gap-3 py-3 text-sm first:pt-0">
                  <dt className="text-muted">{f.label}</dt>
                  <dd className="font-medium text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 border-t border-line pt-5">
              <TextLink href={withBase(profile.cvPath)} ariaLabel="Download CV (PDF)">
                Download full CV (PDF)
              </TextLink>
            </div>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
