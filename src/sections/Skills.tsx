import { skillCategories, skillLevels, toolsUsedInProjects, type SkillLevel } from "@/data/skills";
import { Section, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";

function Dots({ level }: { level: SkillLevel }) {
  const n = skillLevels[level].dots;
  return (
    <span className="flex gap-1" aria-hidden>
      {[1, 2, 3].map((i) => (
        <span key={i} className={`size-1.5 rounded-full ${i <= n ? "bg-accent" : "bg-line-strong"}`} />
      ))}
    </span>
  );
}

const levelStyle: Record<SkillLevel, string> = {
  strong: "border-accent/35 bg-accent/[0.07] text-white",
  intermediate: "border-line-strong bg-panel-2/70 text-ink",
  developing: "border-dashed border-line-strong bg-transparent text-ink-2",
};

export default function Skills() {
  return (
    <Section id="skills" labelledBy="skills-title">
      <SectionHeading
        id="skills-title"
        eyebrow="Skills"
        title="What I work with — and how well."
        intro="Levels are self-assessed and deliberately conservative. Strong means I use it confidently in my own projects; developing means I'm still building depth."
      />

      {/* Legend */}
      <Reveal>
        <ul className="mb-8 flex flex-wrap gap-x-6 gap-y-3 text-sm" aria-label="Skill level legend">
          {(Object.keys(skillLevels) as SkillLevel[]).map((l) => (
            <li key={l} className="flex items-center gap-2.5">
              <Dots level={l} />
              <span className="font-medium text-white">{skillLevels[l].label}</span>
              <span className="hidden text-muted sm:inline">— {skillLevels[l].description}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, i) => (
          <Reveal key={cat.title} delay={i * 60}>
            <div className="h-full rounded-2xl border border-line bg-panel/60 p-5 transition hover:border-line-strong">
              <h3 className="font-display text-lg font-semibold text-white">{cat.title}</h3>
              <p className="mt-1 text-sm text-muted">{cat.blurb}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <li
                    key={s.name}
                    className={`group inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-sm transition ${levelStyle[s.level]}`}
                  >
                    {s.name}
                    <Dots level={s.level} />
                    <span className="sr-only">({skillLevels[s.level].label})</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}

        <Reveal delay={skillCategories.length * 60}>
          <div className="h-full rounded-2xl border border-line bg-gradient-to-br from-panel/60 to-bg-2 p-5">
            <h3 className="font-display text-lg font-semibold text-white">Also used in projects</h3>
            <p className="mt-1 text-sm text-muted">Tools that appear in my repositories and CV.</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {toolsUsedInProjects.map((t) => (
                <li key={t} className="rounded-md border border-line px-2 py-1 font-mono text-xs text-ink-2">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
