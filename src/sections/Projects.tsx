import { featuredProjects, otherProjects } from "@/data/projects";
import { socialLinks } from "@/data/socialLinks";
import { Section, SectionHeading, TextLink } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { CompactProjectCard, FeaturedProjectCard } from "@/components/ProjectCards";

export default function Projects() {
  const [lead, ...rest] = featuredProjects;
  return (
    <Section id="projects" labelledBy="projects-title">
      <SectionHeading
        id="projects-title"
        index="02"
        eyebrow="Featured Projects"
        title="Selected work across data, ML and NLP."
        intro="Each project links to its code and a case study covering the problem, approach, results that exist in the repository, and limitations."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
        {lead && (
          <Reveal variant="zoom" className="md:col-span-2">
            <FeaturedProjectCard project={lead} wide />
          </Reveal>
        )}
        {rest.map((p, i) => (
          <Reveal key={p.slug} delay={i * 140}>
            <FeaturedProjectCard project={p} />
          </Reveal>
        ))}
      </div>

      {otherProjects.length > 0 && (
        <div className="mt-16">
          <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h3 className="font-display text-xl font-semibold text-ink">More projects</h3>
            <TextLink href={`${socialLinks.github.href}?tab=repositories`} external ariaLabel="All repositories on GitHub (opens in new tab)">
              All repositories
            </TextLink>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 110}>
                <CompactProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      )}

      <Reveal>
        <p className="mt-8 text-xs leading-relaxed text-muted">
          Workflow diagrams are conceptual illustrations of each project&apos;s pipeline, not screenshots. Numbers come from files in the
          project repositories.
        </p>
      </Reveal>
    </Section>
  );
}
