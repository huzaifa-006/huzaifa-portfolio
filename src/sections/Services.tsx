import type { ComponentType } from "react";
import { services, type Service, type ServiceIcon } from "@/data/services";
import { socialLinks } from "@/data/socialLinks";
import { Button, Section, SectionHeading, Tag, TextLink } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { ArrowUpRight, FiverrIcon, IconApp, IconBrain, IconChart, IconClean, IconDatabase, IconGlobe, IconModel, UpworkIcon } from "@/components/Icons";

const icons: Record<ServiceIcon, ComponentType<{ size?: number }>> = {
  clean: IconClean,
  chart: IconChart,
  model: IconModel,
  extract: IconGlobe,
  ai: IconBrain,
  dashboard: IconApp,
};

/** Conceptual flow for the web-scraping card: Website → Scraper → Processing → Output. */
const scrapeFlow = [
  { label: "Website", icon: IconGlobe },
  { label: "Scraper", icon: IconBrain },
  { label: "Processing", icon: IconClean },
  { label: "CSV · Excel · DB", icon: IconDatabase },
];

function Deliverables({ s }: { s: Service }) {
  return (
    <ul className="space-y-1.5 text-sm text-ink-2" aria-label="Deliverables">
      {s.deliverables.map((d) => (
        <li key={d} className="flex items-center gap-2.5">
          <span className="size-1 shrink-0 rounded-full bg-accent" aria-hidden />
          {d}
        </li>
      ))}
    </ul>
  );
}

function HighlightCard({ s }: { s: Service }) {
  const Icon = icons[s.icon];
  return (
    <article className="card card-hover group relative isolate flex h-full flex-col overflow-hidden border-accent/35 p-6 sm:p-7">
      <div className="dot-grid absolute inset-0 -z-10 opacity-50 [mask-image:linear-gradient(to_bottom,#000,transparent_75%)]" aria-hidden />
      <div className="absolute -top-20 -right-16 -z-10 size-56 rounded-full bg-accent/12 blur-3xl" aria-hidden />
      <div className="flex items-center justify-between gap-3">
        <span className="grid size-12 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
          <Icon size={22} />
        </span>
        <span className="rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10.5px] tracking-[0.12em] text-accent uppercase">
          Data collection
        </span>
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold text-ink sm:text-2xl">{s.title}</h3>
      <p className="mt-2 max-w-md leading-relaxed text-ink-2">{s.description}</p>

      {/* conceptual flow */}
      <figure className="mt-6 rounded-xl border border-line bg-bg-2/80 p-4" aria-label="Conceptual workflow: website, scraper, processing, then CSV, Excel or database output">
        <ol className="grid grid-cols-4" aria-hidden>
          {scrapeFlow.map((f, i) => (
            <li key={f.label} className="relative flex flex-col items-center text-center">
              {i < scrapeFlow.length - 1 && <span className="pipe-link absolute top-[17px] right-[calc(-50%+22px)] left-[calc(50%+22px)] h-px" />}
              <span className="grid size-[34px] place-items-center rounded-lg border border-line-strong bg-panel text-accent">
                <f.icon size={16} />
              </span>
              <span className="mt-2 text-[11px] leading-tight font-semibold text-ink">{f.label}</span>
            </li>
          ))}
        </ol>
        <figcaption className="mt-3 text-center font-mono text-[10px] tracking-wider text-muted uppercase">Conceptual workflow</figcaption>
      </figure>

      <div className="mt-6 mb-6 grid gap-5 sm:grid-cols-2">
        <div>
          <p className="mb-2 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">You get</p>
          <Deliverables s={s} />
        </div>
        {s.tools && (
          <div>
            <p className="mb-2 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">Tools</p>
            <ul className="flex flex-wrap gap-1.5">
              {s.tools.map((t) => (
                <li key={t}>
                  <Tag>{t}</Tag>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-line pt-5">
        <Button href="/#contact" size="sm">
          Discuss a data collection project
        </Button>
        <span className="text-xs text-muted">Public websites only, respecting each site&apos;s terms.</span>
      </div>
    </article>
  );
}

function ServiceCard({ s, n }: { s: Service; n: number }) {
  const Icon = icons[s.icon];
  return (
    <article className="card card-hover group flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <span className="grid size-11 place-items-center rounded-xl border border-accent/25 bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-105">
          <Icon size={20} />
        </span>
        <span className="font-mono text-xs text-dim" aria-hidden>
          {String(n).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold text-ink">{s.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
      <div className="mt-4 border-t border-line pt-4">
        <Deliverables s={s} />
      </div>
      {s.evidence && (
        <div className="mt-auto pt-5">
          <TextLink href={`/projects/${s.evidence.projectSlug}/`} className="text-[13px]" ariaLabel={`Example project: ${s.evidence.label}`}>
            Example: {s.evidence.label}
          </TextLink>
        </div>
      )}
    </article>
  );
}

export default function Services() {
  const highlight = services.find((s) => s.highlight);
  const rest = services.filter((s) => !s.highlight);
  return (
    <Section id="services" labelledBy="services-title">
      <SectionHeading
        id="services-title"
        index="04"
        eyebrow="Services"
        title="Data & AI Services"
        intro="For teams and freelance clients who need data work done carefully, with results they can reproduce."
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {highlight && (
          <Reveal as="li" variant="zoom" className="sm:col-span-2 lg:row-span-2">
            <HighlightCard s={highlight} />
          </Reveal>
        )}
        {rest.map((s, i) => (
          <Reveal as="li" key={s.title} delay={(i % 3) * 110} variant="zoom" className={i === rest.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}>
            <ServiceCard s={s} n={i + 1} />
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-6">
        <div className="card flex flex-col items-start justify-between gap-5 p-5 sm:p-6 md:flex-row md:items-center">
          <div>
            <p className="font-display text-lg font-semibold text-ink">Prefer a freelance platform?</p>
            <p className="mt-1 text-sm text-muted">Hire me on Upwork or Fiverr, or send a message with a sample of your data and what you need.</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Button href={socialLinks.upwork.href} external variant="secondary" ariaLabel="Upwork profile (opens in new tab)">
              <UpworkIcon size={17} /> Upwork <ArrowUpRight size={14} />
            </Button>
            <Button href={socialLinks.fiverr.href} external variant="secondary" ariaLabel="Fiverr profile (opens in new tab)">
              <FiverrIcon size={17} /> Fiverr <ArrowUpRight size={14} />
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
