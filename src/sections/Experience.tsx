import { experience } from "@/data/experience";
import { Section, SectionHeading, Tag } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "@/components/Icons";

const typeLabel = { work: "Internship", freelance: "Freelance", education: "Education" } as const;

export default function Experience() {
  return (
    <Section id="experience" labelledBy="experience-title">
      <SectionHeading id="experience-title" eyebrow="Experience" title="Where I've applied it." />
      <ol className="relative space-y-6 border-l border-line pl-6 sm:pl-10">
        {experience.map((e, i) => (
          <Reveal as="li" key={e.role + e.org} delay={i * 80} className="relative">
            <span className="absolute -left-[31px] top-7 grid size-3.5 place-items-center rounded-full border-2 border-bg bg-accent ring-4 ring-accent/15 sm:-left-[47px]" aria-hidden />
            <div className="rounded-2xl border border-line bg-panel/60 p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">{typeLabel[e.type]}</p>
                  <h3 className="mt-1.5 font-display text-xl font-semibold text-white">{e.role}</h3>
                  <p className="text-ink-2">{e.org}</p>
                </div>
                <div className="text-sm text-muted sm:text-right">
                  <p className="font-medium text-ink-2">{e.period}</p>
                  {e.location && <p>{e.location}</p>}
                </div>
              </div>
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-2 marker:text-dim">
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              {(e.tags || e.links) && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {e.tags?.map((t) => <Tag key={t}>{t}</Tag>)}
                  {e.links?.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
                      {l.label} <ArrowUpRight size={14} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
