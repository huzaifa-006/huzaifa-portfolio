import Link from "next/link";
import type { Project } from "@/data/projects";
import { Button, Tag } from "./ui";
import PipelineVisual from "./PipelineVisual";
import { ArrowRight, ArrowUpRight, Check, GitHubIcon } from "./Icons";

export function ProjectLinks({ project, size = "sm" }: { project: Project; size?: "sm" | "md" }) {
  return (
    <div className="flex flex-wrap gap-2">
      {project.caseStudy && (
        <Button href={`/projects/${project.slug}/`} size={size} ariaLabel={`View the ${project.title} case study`}>
          View Case Study <ArrowRight size={15} />
        </Button>
      )}
      <Button href={project.links.github} variant={project.caseStudy ? "secondary" : "primary"} size={size} external ariaLabel={`${project.title} source code on GitHub (opens in new tab)`}>
        <GitHubIcon size={15} /> GitHub
      </Button>
      {project.links.live && (
        <Button href={project.links.live} variant="secondary" size={size} external ariaLabel={`${project.title} live demo (opens in new tab)`}>
          {project.links.liveLabel ?? "Live Demo"} <ArrowUpRight size={15} />
        </Button>
      )}
    </div>
  );
}

function KeyResults({ project, compact = false }: { project: Project; compact?: boolean }) {
  if (!project.keyResults?.length) return null;
  return (
    <div>
      <dl className={`grid gap-2 ${project.keyResults.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
        {project.keyResults.map((r) => (
          <div key={r.label} className="flex flex-col-reverse rounded-lg border border-line bg-panel-2/60 px-3 py-2.5">
            <dt className="mt-0.5 text-[11px] leading-snug text-muted">{r.label}</dt>
            <dd className={`font-display font-semibold tracking-tight text-ink ${compact ? "text-lg" : "text-xl"}`}>{r.value}</dd>
          </div>
        ))}
      </dl>
      {project.resultsCaveat && <p className="mt-2 text-xs text-muted">* {project.resultsCaveat}; see case study for context.</p>}
    </div>
  );
}

function Highlights({ project }: { project: Project }) {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">What I built</p>
      <ul className="mt-2 space-y-1.5 text-sm">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2.5 text-ink-2">
            <Check size={16} className="mt-0.5 shrink-0 text-accent" />
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Eyebrow({ project }: { project: Project }) {
  return (
    <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
      {project.category}
      {project.period ? <span className="text-muted"> · {project.period}</span> : null}
    </p>
  );
}

/** Large card for the three featured projects. `wide` puts the visual beside the text on desktop. */
export function FeaturedProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  const href = project.caseStudy ? `/projects/${project.slug}/` : project.links.github;
  return (
    <article
      aria-labelledby={`p-${project.slug}`}
      className={`card card-hover group grid h-full gap-6 p-4 sm:p-5 ${wide ? "lg:grid-cols-[1.08fr_1fr] lg:items-start lg:gap-10 lg:p-7" : "lg:p-6"}`}
    >
      <div>
        <Link href={href} tabIndex={-1} aria-hidden className="block">
          <PipelineVisual project={project} />
        </Link>
        {wide && (
          <div className="mt-6 hidden space-y-6 lg:block">
            <Highlights project={project} />
            <KeyResults project={project} />
          </div>
        )}
      </div>

      <div className="flex h-full flex-col">
        {project.flagship && (
          <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/35 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden /> Flagship project
          </span>
        )}
        <Eyebrow project={project} />
        <h3 id={`p-${project.slug}`} className="mt-2.5 font-display text-2xl font-semibold tracking-tight text-ink">
          <Link href={href} className="transition-colors hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2.5 leading-relaxed text-pretty text-ink-2">{project.tagline}</p>

        <dl className={`mt-5 grid gap-4 text-sm ${wide ? "sm:grid-cols-2" : ""}`}>
          <div>
            <dt className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">Problem</dt>
            <dd className="mt-1 leading-relaxed text-ink-2">{project.problem}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">Solution</dt>
            <dd className="mt-1 leading-relaxed text-ink-2">{project.solution}</dd>
          </div>
        </dl>

        {wide && (
          <div className="mt-5 lg:hidden">
            <Highlights project={project} />
          </div>
        )}

        <div className={`mt-5 ${wide ? "lg:hidden" : ""}`}>
          <KeyResults project={project} />
        </div>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tech.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

/** Smaller card for the remaining projects. */
export function CompactProjectCard({ project }: { project: Project }) {
  return (
    <article aria-labelledby={`p-${project.slug}`} className="card card-hover group flex h-full flex-col p-4 sm:p-5">
      <PipelineVisual project={project} compact />
      <div className="mt-5">
        <Eyebrow project={project} />
        <h3 id={`p-${project.slug}`} className="mt-2 font-display text-lg font-semibold tracking-tight text-ink">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.tagline}</p>
      </div>
      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase">Problem</dt>
          <dd className="mt-0.5 leading-relaxed text-ink-2">{project.problem}</dd>
        </div>
      </dl>
      <div className="mt-4">
        <KeyResults project={project} compact />
      </div>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
        {project.tech.slice(0, 5).map((t) => (
          <li key={t}>
            <Tag>{t}</Tag>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-5">
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}
