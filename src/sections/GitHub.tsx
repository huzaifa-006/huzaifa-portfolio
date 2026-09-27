import { projects } from "@/data/projects";
import { socialLinks } from "@/data/socialLinks";
import { Button } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { ArrowRight, GitHubIcon } from "@/components/Icons";

/** Repository names taken from the real project links in data/projects.ts. */
const repos = projects.map((p) => ({ name: p.links.github.split("/").pop() || p.slug, href: p.links.github }));

export default function GitHub() {
  return (
    <section id="github" aria-labelledby="github-title" className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 md:py-14">
      <Reveal variant="zoom">
        <div className="card relative isolate overflow-hidden p-6 sm:p-8 md:p-10">
          <div className="dot-grid absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_left,#000,transparent_70%)]" aria-hidden />
          <div className="absolute -top-24 -right-20 -z-10 size-72 rounded-full bg-accent/10 blur-3xl" aria-hidden />
          <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center">
            <div>
              <span className="grid size-12 place-items-center rounded-xl border border-line-strong bg-panel-2 text-ink">
                <GitHubIcon size={24} />
              </span>
              <h2 id="github-title" className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Explore my code
              </h2>
              <p className="mt-3 max-w-md leading-relaxed text-muted">
                Browse my GitHub repositories: machine-learning projects, data-analysis work and development experiments.
              </p>
              <div className="mt-6">
                <Button href={socialLinks.github.href} external ariaLabel="View GitHub profile (opens in new tab)">
                  <GitHubIcon size={16} /> View GitHub <ArrowRight size={16} />
                </Button>
              </div>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2" aria-label="Selected repositories">
              {repos.map((r) => (
                <li key={r.href}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 truncate rounded-lg border border-line bg-panel/80 px-3 py-2.5 font-mono text-[12.5px] text-ink-2 transition hover:border-accent/50 hover:text-ink"
                  >
                    <span className="text-dim" aria-hidden>
                      ▸
                    </span>
                    <span className="truncate">{r.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
