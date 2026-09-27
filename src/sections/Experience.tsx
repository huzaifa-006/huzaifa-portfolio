import { experience } from "@/data/experience";
import { Section, SectionHeading, Tag, TextLink } from "@/components/ui";
import Reveal from "@/components/Reveal";

const typeLabel = { work: "Internship", freelance: "Freelance", education: "Education" } as const;

export default function Experience() {
  return (
    <Section id="experience" labelledBy="experience-title">
      <SectionHeading id="experience-title" index="06" eyebrow="Experience" title="Where I've applied it." />
      <ol className="relative space-y-5 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-line-strong md:before:left-[calc(11rem+7px)]">
        {experience.map((e, i) => (
          <Reveal as="li" key={e.role + e.org} delay={i * 80} className="relative grid gap-3 pl-8 md:grid-cols-[11rem_1fr] md:gap-8 md:pl-0">
            <span
              className="absolute top-2 left-0 size-[15px] rounded-full border-[3px] border-bg bg-accent ring-4 ring-accent/15 md:left-[11rem]"
              aria-hidden
            />
            <div className="md:pt-1 md:pr-6 md:text-right">
              <p className="font-mono text-[13px] font-medium text-ink">{e.period}</p>
              {e.location && <p className="mt-0.5 text-xs text-muted">{e.location}</p>}
            </div>
            <div className="card card-hover p-5 sm:p-6 md:ml-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10.5px] tracking-[0.12em] text-accent uppercase">
                  {typeLabel[e.type]}
                </span>
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">{e.role}</h3>
              <p className="text-[15px] text-ink-2">{e.org}</p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-2">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-[9px] size-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              {e.tags && (
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                  {e.tags.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
              )}
              {e.links && (
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {e.links.map((l) => (
                    <TextLink key={l.href} href={l.href} external ariaLabel={`${l.label} (opens in new tab)`}>
                      {l.label}
                    </TextLink>
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
