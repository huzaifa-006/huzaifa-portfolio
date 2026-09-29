import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { Tag } from "@/components/ui";
import ProjectVisual from "@/components/ProjectVisual";
import PipelineVisual from "@/components/PipelineVisual";
import FlowDiagram from "@/components/FlowDiagram";
import { ProjectLinks } from "@/components/ProjectCards";
import Reveal from "@/components/Reveal";
import { ArrowLeft, ArrowRight } from "@/components/Icons";

/* One static page per project that has a case study. */
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = `${p.title}: case study`;
  return {
    title,
    description: p.tagline,
    alternates: { canonical: `/projects/${p.slug}/` },
    openGraph: { title, description: p.tagline, url: `/projects/${p.slug}/`, type: "article" },
    twitter: { card: "summary_large_image", title, description: p.tagline },
  };
}

const sections = [
  ["problem", "Problem"],
  ["solution", "Solution"],
  ["approach", "Approach"],
  ["technologies", "Technologies"],
  ["results", "Results"],
  ["limitations", "Limitations"],
  ["links", "Links"],
] as const;

function Block({ id, title, n, children }: { id: string; title: string; n: number; children: React.ReactNode }) {
  return (
    <Reveal as="section" className="border-t border-line py-10">
      <div id={id} className="grid gap-4 md:grid-cols-[210px_1fr] md:gap-10">
        <h2 className="flex items-baseline gap-3 font-display text-xl font-semibold text-ink">
          <span className="font-mono text-xs text-accent">{String(n).padStart(2, "0")}</span>
          {title}
        </h2>
        <div className="min-w-0 space-y-4 leading-relaxed text-ink-2">{children}</div>
      </div>
    </Reveal>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-[10px] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.caseStudy) notFound();
  const cs = project.caseStudy;

  const withCase = projects.filter((p) => p.caseStudy);
  const idx = withCase.findIndex((p) => p.slug === project.slug);
  const next = withCase[(idx + 1) % withCase.length];

  return (
    <article className="mx-auto max-w-5xl px-4 pt-28 pb-20 sm:px-6 sm:pt-32">
      <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-ink">
        <ArrowLeft size={16} /> All projects
      </Link>

      <header className="mt-6">
        {project.flagship && (
          <span className="animate-fade-up mb-3 inline-flex items-center gap-1.5 rounded-full border border-accent/35 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden /> Flagship project
          </span>
        )}
        <p className="animate-fade-up font-mono text-xs tracking-[0.16em] text-accent uppercase">
          Case study · {project.category}
          {project.period ? ` · ${project.period}` : ""}
        </p>
        <h1
          className="animate-fade-up mt-3 font-display text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl"
          style={{ ["--d" as string]: "60ms" }}
        >
          {project.title}
        </h1>
        <p className="animate-fade-up mt-4 max-w-3xl text-lg leading-relaxed text-pretty text-ink-2" style={{ ["--d" as string]: "120ms" }}>
          {project.tagline}
        </p>
        <div className="animate-fade-up mt-4 max-w-3xl space-y-3 leading-relaxed text-muted" style={{ ["--d" as string]: "150ms" }}>
          {cs.overview.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="animate-fade-up mt-6" style={{ ["--d" as string]: "180ms" }}>
          <ProjectLinks project={{ ...project, caseStudy: undefined }} size="md" />
        </div>
        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tech.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
      </header>

      <div className="mt-10 grid items-start gap-5 lg:grid-cols-2">
        <div className="card p-3 sm:p-4">
          {cs.flow ? (
            <FlowDiagram flow={cs.flow} />
          ) : (
            <>
              <PipelineVisual project={project} />
              <p className="mt-3 px-1 text-sm text-muted">Workflow overview (conceptual diagram).</p>
            </>
          )}
        </div>
        <div className="card p-3 sm:p-4">
          <ProjectVisual project={project} priority showCaption sizes="(max-width: 1024px) 100vw, 480px" />
        </div>
      </div>

      {/* On-page nav */}
      <nav aria-label="Case study sections" className="mt-10 flex flex-wrap gap-2 text-sm">
        {sections.map(([id, label]) => (
          <a key={id} href={`#${id}`} className="rounded-lg border border-line bg-panel/70 px-3 py-1.5 text-muted transition hover:border-line-strong hover:text-ink">
            {label}
          </a>
        ))}
      </nav>

      <div className="mt-8">
        <Block id="problem" title="Problem" n={1}>
          {cs.problem.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Block>
        <Block id="solution" title="Solution" n={2}>
          <p>{project.solution}</p>
          <p className="pt-1 text-sm font-semibold text-ink">What I built</p>
          <List items={project.highlights} />
        </Block>
        <Block id="approach" title="Approach" n={3}>
          <ol className="space-y-2.5">
            {cs.approach.map((a, i) => (
              <li key={a} className="flex gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border border-accent/30 bg-accent/10 font-mono text-[11px] text-accent">
                  {i + 1}
                </span>
                <span>{a}</span>
              </li>
            ))}
          </ol>
          <p className="pt-2 text-sm font-semibold text-ink">Implementation details</p>
          <List items={cs.implementation} />
          <p className="pt-2 text-sm font-semibold text-ink">Project structure</p>
          <ul className="space-y-2">
            {cs.architecture.map((a) => (
              <li key={a} className="rounded-lg border border-line bg-panel/70 px-4 py-2.5 font-mono text-[13px] break-words text-ink-2">
                {a}
              </li>
            ))}
          </ul>
        </Block>
        <Block id="technologies" title="Technologies" n={4}>
          <dl className="grid gap-3 sm:grid-cols-2">
            {cs.stack.map((g) => (
              <div key={g.group} className="card p-4">
                <dt className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{g.group}</dt>
                <dd className="mt-2.5 flex flex-wrap gap-1.5">
                  {g.items.map((i) => (
                    <Tag key={i}>{i}</Tag>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Block>
        <Block id="results" title="Results" n={5}>
          {cs.results.length > 0 ? (
            <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cs.results.map((r) => (
                <div key={r.label} className="card flex flex-col p-4">
                  <dt className="text-sm text-muted">{r.label}</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-ink">{r.value}</dd>
                  {r.note && <dd className="mt-1 text-xs text-muted">{r.note}</dd>}
                </div>
              ))}
            </dl>
          ) : null}
          {cs.resultsNote && (
            <p className="rounded-xl border border-amber/30 bg-amber/[0.07] px-4 py-3 text-sm text-ink-2">
              <span className="font-semibold text-amber">Note: </span>
              {cs.resultsNote}
            </p>
          )}
        </Block>
        <Block id="limitations" title="Limitations" n={6}>
          <List items={cs.challenges} />
          <p className="pt-2 text-sm font-semibold text-ink">
            Planned improvements <span className="font-normal text-muted">(not yet implemented)</span>
          </p>
          <List items={cs.future} />
        </Block>
        <Block id="links" title="Links" n={7}>
          <ProjectLinks project={{ ...project, caseStudy: undefined }} size="md" />
        </Block>
      </div>

      <footer className="mt-6 flex flex-col gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
          <ArrowLeft size={16} /> Back to all projects
        </Link>
        {next && next.slug !== project.slug && (
          <Link href={`/projects/${next.slug}/`} className="group inline-flex flex-wrap items-center gap-2 sm:text-right">
            <span className="text-sm text-muted">Next case study</span>
            <span className="font-display font-semibold text-ink group-hover:text-accent">{next.title}</span>
            <ArrowRight size={16} className="text-accent transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </footer>
    </article>
  );
}
