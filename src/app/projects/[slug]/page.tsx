import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { Button, Tag } from "@/components/ui";
import ProjectVisual from "@/components/ProjectVisual";
import Reveal from "@/components/Reveal";
import { ArrowLeft, ArrowRight, ArrowUpRight, GitHubIcon } from "@/components/Icons";

/* One static page per project that has a case study. */
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = `${p.title} — case study`;
  return {
    title,
    description: p.tagline,
    alternates: { canonical: `/projects/${p.slug}/` },
    openGraph: { title, description: p.tagline, url: `/projects/${p.slug}/`, type: "article" },
  };
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal as="section" className="scroll-mt-24 border-t border-line py-10" >
      <div id={id} className="grid gap-4 md:grid-cols-[200px_1fr] md:gap-10">
        <h2 className="font-display text-xl font-semibold text-white">{title}</h2>
        <div className="space-y-4 leading-relaxed text-ink-2">{children}</div>
      </div>
    </Reveal>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-accent">
      {items.map((i) => (
        <li key={i}>{i}</li>
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
      <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-white">
        <ArrowLeft size={16} /> All projects
      </Link>

      <header className="mt-6 animate-fade-up">
        <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
          Case study · {project.category}
          {project.period ? ` · ${project.period}` : ""}
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">{project.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-2">{project.tagline}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={project.links.github} external ariaLabel={`${project.title} on GitHub (opens in new tab)`}>
            <GitHubIcon size={16} /> View code on GitHub
          </Button>
          {project.links.live && (
            <Button href={project.links.live} variant="secondary" external>
              {project.links.liveLabel ?? "Live demo"} <ArrowUpRight size={16} />
            </Button>
          )}
          {project.links.docs && (
            <Button href={project.links.docs} variant="secondary" external>
              Documentation <ArrowUpRight size={16} />
            </Button>
          )}
        </div>
        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tech.map((t) => (
            <li key={t}><Tag>{t}</Tag></li>
          ))}
        </ul>
      </header>

      <div className="mt-10">
        <ProjectVisual project={project} priority showCaption sizes="(max-width: 1024px) 100vw, 960px" />
      </div>

      {/* On-page nav */}
      <nav aria-label="Case study sections" className="mt-10 flex flex-wrap gap-2 text-sm">
        {[
          ["overview", "Overview"],
          ["problem", "Problem"],
          ["approach", "Approach"],
          ["stack", "Tech stack"],
          ["architecture", "Data & architecture"],
          ["implementation", "Implementation"],
          ["results", "Results"],
          ["challenges", "Challenges"],
          ["future", "Future improvements"],
        ].map(([id, label]) => (
          <a key={id} href={`#${id}`} className="rounded-lg border border-line px-3 py-1.5 text-muted transition hover:border-line-strong hover:text-white">
            {label}
          </a>
        ))}
      </nav>

      <div className="mt-8">
        <Block id="overview" title="Overview">
          {cs.overview.map((p) => <p key={p}>{p}</p>)}
        </Block>
        <Block id="problem" title="Problem">
          {cs.problem.map((p) => <p key={p}>{p}</p>)}
        </Block>
        <Block id="approach" title="Approach">
          <ol className="list-decimal space-y-2 pl-5 marker:font-mono marker:text-accent">
            {cs.approach.map((a) => <li key={a}>{a}</li>)}
          </ol>
        </Block>
        <Block id="stack" title="Technology stack">
          <dl className="grid gap-4 sm:grid-cols-2">
            {cs.stack.map((g) => (
              <div key={g.group} className="rounded-xl border border-line bg-panel/60 p-4">
                <dt className="font-mono text-[11px] tracking-[0.18em] text-dim uppercase">{g.group}</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {g.items.map((i) => <Tag key={i}>{i}</Tag>)}
                </dd>
              </div>
            ))}
          </dl>
        </Block>
        <Block id="architecture" title="Data & architecture">
          <ul className="space-y-2">
            {cs.architecture.map((a) => (
              <li key={a} className="rounded-lg border border-line bg-panel/40 px-4 py-2.5 font-mono text-[13px] text-ink-2">{a}</li>
            ))}
          </ul>
        </Block>
        <Block id="implementation" title="Implementation">
          <List items={cs.implementation} />
        </Block>
        <Block id="results" title="Results">
          {cs.results.length > 0 ? (
            <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cs.results.map((r) => (
                <div key={r.label} className="rounded-xl border border-line bg-panel/60 p-4">
                  <dt className="text-sm text-muted">{r.label}</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-white">{r.value}</dd>
                  {r.note && <dd className="mt-1 text-xs text-dim">{r.note}</dd>}
                </div>
              ))}
            </dl>
          ) : null}
          {cs.resultsNote && (
            <p className="rounded-xl border border-amber/25 bg-amber/[0.06] px-4 py-3 text-sm text-ink-2">
              <span className="font-semibold text-amber">Note: </span>
              {cs.resultsNote}
            </p>
          )}
        </Block>
        <Block id="challenges" title="Challenges">
          <List items={cs.challenges} />
        </Block>
        <Block id="future" title="Future improvements">
          <p className="text-sm text-muted">Planned next steps — not yet implemented.</p>
          <List items={cs.future} />
        </Block>
      </div>

      <footer className="mt-6 flex flex-col gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-white">
          <ArrowLeft size={16} /> Back to all projects
        </Link>
        {next && next.slug !== project.slug && (
          <Link href={`/projects/${next.slug}/`} className="group inline-flex items-center gap-2 text-right">
            <span className="text-sm text-muted">Next case study</span>
            <span className="font-display font-semibold text-white group-hover:text-accent">{next.title}</span>
            <ArrowRight size={16} className="text-accent" />
          </Link>
        )}
      </footer>
    </article>
  );
}
