import Link from "next/link";
import { services, type ServiceIcon } from "@/data/services";
import { socialLinks } from "@/data/socialLinks";
import { Button, Section, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { ArrowUpRight, FiverrIcon, IconAutomate, IconChart, IconClean, IconExtract, IconModel, IconSql, UpworkIcon } from "@/components/Icons";

const icons: Record<ServiceIcon, typeof IconClean> = {
  clean: IconClean,
  chart: IconChart,
  sql: IconSql,
  model: IconModel,
  extract: IconExtract,
  automate: IconAutomate,
};

export default function Services() {
  return (
    <Section id="services" labelledBy="services-title">
      <SectionHeading
        id="services-title"
        eyebrow="Freelance services"
        title="Data work I can take on today."
        intro="Scoped to what my projects demonstrate. For each service, the linked project shows similar work."
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <Reveal as="li" key={s.title} delay={(i % 3) * 70}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-panel/60 p-5 transition hover:-translate-y-0.5 hover:border-line-strong">
                <span className="grid size-10 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
                <ul className="mt-4 space-y-1 text-sm text-ink-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-dim" aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
                {s.evidence && (
                  <Link href={`/projects/${s.evidence.projectSlug}/`} className="mt-auto pt-5 text-xs font-medium text-accent hover:underline">
                    Example: {s.evidence.label} →
                  </Link>
                )}
              </article>
            </Reveal>
          );
        })}
      </ul>

      <Reveal className="mt-8">
        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-line bg-gradient-to-r from-panel-2 to-bg-2 p-6 md:flex-row md:items-center">
          <div>
            <p className="font-display text-lg font-semibold text-white">Hire me on a freelance platform</p>
            <p className="mt-1 text-sm text-muted">Or email me directly with a sample of your data and what you need.</p>
          </div>
          <div className="flex flex-wrap gap-3">
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
