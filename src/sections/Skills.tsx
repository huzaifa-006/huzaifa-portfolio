import type { ComponentType } from "react";
import { skillCategories, type SkillIcon } from "@/data/skills";
import { Section, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { IconBrain, IconChart, IconCloud, IconCode, IconDatabase, IconModel } from "@/components/Icons";

const icons: Record<SkillIcon, ComponentType<{ size?: number }>> = {
  data: IconDatabase,
  model: IconModel,
  ai: IconBrain,
  chart: IconChart,
  engineering: IconCode,
  cloud: IconCloud,
};

export default function Skills() {
  return (
    <Section id="skills" labelledBy="skills-title">
      <SectionHeading
        id="skills-title"
        index="05"
        eyebrow="Skills"
        title="Tools and techniques I work with."
        intro="Grouped by area. Highlighted badges are the tools I use most in my own projects."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, i) => {
          const Icon = icons[cat.icon];
          return (
            <Reveal key={cat.title} delay={(i % 3) * 110}>
              <div className="card card-hover h-full p-5 sm:p-6">
                <div className="flex items-start gap-3.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line-strong bg-panel-2 text-accent">
                    <Icon size={19} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg leading-tight font-semibold text-ink">{cat.title}</h3>
                    <p className="mt-1 text-sm text-muted">{cat.blurb}</p>
                  </div>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <li
                      key={s.name}
                      className={`rounded-lg border px-2.5 py-1 text-[13px] font-medium ${
                        s.core ? "border-accent/35 bg-accent/10 text-ink" : "border-line bg-panel-2/70 text-ink-2"
                      }`}
                    >
                      {s.name}
                      {s.core && <span className="sr-only"> (core tool)</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
