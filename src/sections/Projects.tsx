import Link from "next/link";
import { featuredProjects, otherProjects, type Project } from "@/data/projects";
import { socialLinks } from "@/data/socialLinks";
import { Button, Section, SectionHeading, Tag } from "@/components/ui";
import Reveal from "@/components/Reveal";
import ProjectVisual from "@/components/ProjectVisual";
import { ArrowRight, ArrowUpRight, Check, GitHubIcon } from "@/components/Icons";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2.5">
      {project.caseStudy && (
        <Button href={`/projects/${project.slug}/`} ariaLabel={`Read the ${project.title} case study`}>
          Case study <ArrowRight size={16} />
        </Button>
      )}
      <Button href={project.links.github} variant="secondary" external ariaLabel={`${project.title} on GitHub (opens in new tab)`}>
        <GitHubIcon size={16} /> Code
      </Button>
      {project.links.live && (
        <Button href={project.links.live} variant="secondary" external ariaLabel={`${project.title} live demo (opens in new tab)`}>
          {project.links.liveLabel ?? "Live demo"} <ArrowUpRight size={16} />
        </Button>
      )}
    </div>
  );
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  // Alternate image left/right on large screens; the grid column widths follow the image.
  return (
    <article
      aria-labelledby={`p-${project.slug}`}
      className={`group grid items-center gap-8 rounded-3xl border border-line bg-panel/50 p-4 transition-colors hover:border-line-strong sm:p-6 lg:gap-10 lg:p-8 ${flip ? "lg:grid-cols-[1fr_1.12fr]" : "lg:grid-cols-[1.12fr_1fr]"}`}
    >
      <div className={flip ? "lg:order-2" : ""}>
        <Link href={project.caseStudy ? `/projects/${project.slug}/` : project.links.github} tabIndex={-1} aria-hidden>
          <ProjectVisual project={project} priority={index === 0} />
        </Link>
      </div>
      <div className={flip ? "lg:order-1" : ""}>
        <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
          {project.category}
          {project.period ? <span className="text-dim"> · {project.period}</span> : null}
        </p>
        <h3 id={`p-${project.slug}`} className="mt-3 font-display text-2xl font-semibold tracking-tight text-white sm:text-[28px]">
          {project.title}
        </h3>
        <p className="mt-3 leading-relaxed text-ink-2">{project.tagline}</p>

        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-white">Problem</dt>
            <dd className="mt-1 leading-relaxed text-muted">{project.problem}</dd>
          </div>
          <div>
            <dt className="font-semibold text-white">Solution</dt>
            <dd className="mt-1 leading-relaxed text-muted">{project.solution}</dd>
          </div>
        </dl>

        <ul className="mt-5 space-y-2 text-sm">
          {project.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex gap-2.5 text-ink-2">
              <Check size={16} className="mt-0.5 shrink-0 text-accent" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tech.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>

        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <Section id="projects" labelledBy="projects-title">
      <SectionHeading
        id="projects-title"
        eyebrow="Projects"
        title="Selected work, with the details that matter."
        intro="Each project links to its code. Case studies explain the approach, the numbers that exist in the repository, and the limitations. Visuals are labelled: illustrations are concepts, charts are drawn from the project's own data."
      />

      <div className="space-y-6 md:space-y-8">
        {featuredProjects.map((p, i) => (
          <Reveal key={p.slug}>
            <FeaturedCard project={p} index={i} />
          </Reveal>
        ))}
      </div>

      {otherProjects.length > 0 && (
        <Reveal className="mt-14">
          <h3 className="font-display text-xl font-semibold text-white">More on GitHub</h3>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {otherProjects.map((p) => (
              <li key={p.slug}>
                <a
                  href={p.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-line bg-panel/50 p-5 transition hover:-translate-y-0.5 hover:border-line-strong"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="font-display text-lg font-semibold text-white">{p.title}</span>
                    <ArrowUpRight size={18} className="shrink-0 text-muted transition group-hover:text-accent" />
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-muted">{p.tagline}</span>
                  <span className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={`${socialLinks.github.href}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-dashed border-line-strong p-5 transition hover:border-accent/50"
              >
                <span className="flex items-center gap-3">
                  <GitHubIcon size={22} className="text-white" />
                  <span>
                    <span className="block font-display text-lg font-semibold text-white">All repositories</span>
                    <span className="text-sm text-muted">github.com/{socialLinks.github.handle}</span>
                  </span>
                </span>
                <ArrowUpRight size={18} className="text-muted transition group-hover:text-accent" />
              </a>
            </li>
          </ul>
        </Reveal>
      )}
    </Section>
  );
}
