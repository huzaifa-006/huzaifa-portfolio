import type { ComponentType } from "react";
import { services, type ServiceIcon } from "@/data/services";
import { socialLinks } from "@/data/socialLinks";
import { Button, Section, SectionHeading, TextLink } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { ArrowUpRight, FiverrIcon, IconApp, IconBrain, IconChart, IconClean, IconGlobe, IconModel, UpworkIcon } from "@/components/Icons";

const icons: Record<ServiceIcon, ComponentType<{ size?: number }>> = {
  clean: IconClean,
  chart: IconChart,
  model: IconModel,
  extract: IconGlobe,
  ai: IconBrain,
  dashboard: IconApp,
};

export default function Services() {
  return (
    <Section id="services" labelledBy="services-title">
      <SectionHeading
        id="services-title"
        index="03"
        eyebrow="Services"
        title="What I can help with."
        intro="For teams and freelance clients who need data work done carefully, with results they can reproduce."
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <Reveal as="li" key={s.title} delay={(i % 3) * 70}>
              <article className="card card-hover group flex h-full flex-col p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-accent/25 bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-105">
                    <Icon size={20} />
                  </span>
                  <span className="font-mono text-xs text-dim" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
                <ul className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm text-ink-2" aria-label="Deliverables">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2.5">
                      <span className="size-1 shrink-0 rounded-full bg-accent" aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
                {s.evidence && (
                  <div className="mt-auto pt-5">
                    <TextLink href={`/projects/${s.evidence.projectSlug}/`} className="text-[13px]" ariaLabel={`Example project: ${s.evidence.label}`}>
                      Example: {s.evidence.label}
                    </TextLink>
                  </div>
                )}
              </article>
            </Reveal>
          );
        })}
      </ul>

      <Reveal className="mt-6">
        <div className="card flex flex-col items-start justify-between gap-5 p-5 sm:p-6 md:flex-row md:items-center">
          <div>
            <p className="font-display text-lg font-semibold text-ink">Prefer a freelance platform?</p>
            <p className="mt-1 text-sm text-muted">Hire me on Upwork or Fiverr, or email me a sample of your data and what you need.</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Button href={socialLinks.upwork.href} external variant="secondary" ariaLabel="Upwork profile (opens in new tab)">
              <UpworkIcon size={16} /> Upwork <ArrowUpRight size={14} />
            </Button>
            <Button href={socialLinks.fiverr.href} external variant="secondary" ariaLabel="Fiverr profile (opens in new tab)">
              <FiverrIcon size={16} /> Fiverr <ArrowUpRight size={14} />
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
