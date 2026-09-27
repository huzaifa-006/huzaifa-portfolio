import { processSteps } from "@/data/process";
import { Section, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";

export default function Process() {
  return (
    <Section id="process" labelledBy="process-title" className="md:py-20">
      <SectionHeading id="process-title" index="04" eyebrow="How I Work" title="A clear, five-step process." />
      <Reveal>
        <ol className="relative grid gap-0 md:grid-cols-5 md:gap-4">
          {/* connector: horizontal on desktop, vertical on mobile */}
          <span className="process-line absolute top-5 right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-accent/70 via-indigo/50 to-accent/70 md:block" aria-hidden />
          <span className="process-line-v absolute top-5 bottom-5 left-5 w-px bg-gradient-to-b from-accent/70 via-indigo/50 to-accent/70 md:hidden" aria-hidden />
          {processSteps.map((s, i) => (
            <li
              key={s.title}
              className="relative flex gap-4 pb-8 last:pb-0 md:flex-col md:items-center md:gap-0 md:pb-0 md:text-center"
            >
              <span
                className="animate-fade-up relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-accent/40 bg-panel font-mono text-sm font-semibold text-accent shadow-card [animation-play-state:paused] [.is-visible_&]:[animation-play-state:running]"
                style={{ ["--d" as string]: `${200 + i * 140}ms` }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="md:mt-5">
                <h3 className="font-display text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted md:mx-auto md:max-w-[15rem]">{s.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
