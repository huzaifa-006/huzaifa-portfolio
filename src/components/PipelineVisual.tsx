import type { ComponentType } from "react";
import type { PipelineIcon, Project } from "@/data/projects";
import {
  IconApp,
  IconBrain,
  IconChart,
  IconClean,
  IconContainer,
  IconDatabase,
  IconExplore,
  IconFeatures,
  IconModel,
  IconOutput,
  IconServer,
  IconText,
  IconToken,
} from "./Icons";

const icons: Record<PipelineIcon, ComponentType<{ size?: number }>> = {
  data: IconDatabase,
  clean: IconClean,
  explore: IconExplore,
  features: IconFeatures,
  model: IconModel,
  output: IconOutput,
  text: IconText,
  token: IconToken,
  brain: IconBrain,
  server: IconServer,
  db: IconDatabase,
  container: IconContainer,
  chart: IconChart,
  app: IconApp,
};

/**
 * Conceptual workflow diagram for a project, drawn from `project.pipeline`.
 * It is always labelled "Conceptual workflow" so it is never mistaken for a
 * screenshot. Theme-aware (uses CSS variables) and responsive via container
 * queries, so labels stay readable inside narrow cards.
 */
export default function PipelineVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  const { steps, output } = project.pipeline;
  return (
    <figure
      role="img"
      className="@container relative isolate overflow-hidden rounded-xl border border-line bg-bg-2"
      aria-label={`Conceptual workflow for ${project.title}: ${steps.map((s) => s.label).join(", then ")}.`}
    >
      <div className="dot-grid absolute inset-0 -z-10 opacity-80" aria-hidden />
      <div className="absolute -top-20 -right-16 -z-10 size-56 rounded-full bg-accent/15 blur-3xl" aria-hidden />
      <div className="absolute -bottom-24 -left-16 -z-10 size-56 rounded-full bg-indigo/10 blur-3xl" aria-hidden />

      {/* window bar */}
      <div className="flex items-center justify-between gap-3 border-b border-line bg-panel/70 px-3.5 py-2 @md:px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex gap-1" aria-hidden>
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="size-2 rounded-full bg-line-strong" />
          </span>
          <span className="truncate font-mono text-[10.5px] text-muted @md:text-[11px]">{project.slug}/workflow</span>
        </div>
        <span className="shrink-0 rounded-md border border-line bg-bg/70 px-1.5 py-0.5 font-mono text-[9.5px] tracking-wider text-muted uppercase @md:text-[10px]">
          Conceptual workflow
        </span>
      </div>

      <div className={compact ? "px-3 py-5 @md:px-4" : "px-3 py-7 @md:px-6 @lg:py-10"} aria-hidden>
        <ol className="grid grid-cols-5">
          {steps.map((s, i) => {
            const Icon = icons[s.icon];
            const last = i === steps.length - 1;
            return (
              <li key={s.label} className="relative flex min-w-0 flex-col items-center px-0.5 text-center">
                {!last && (
                  <span
                    className={`pipe-link absolute h-px ${
                      compact
                        ? "top-[17px] right-[calc(-50%+22px)] left-[calc(50%+22px)]"
                        : "top-[17px] right-[calc(-50%+22px)] left-[calc(50%+22px)] @md:top-[21px] @md:right-[calc(-50%+27px)] @md:left-[calc(50%+27px)]"
                    }`}
                  />
                )}
                <span
                  className={`relative grid place-items-center rounded-xl border border-line-strong bg-panel text-accent shadow-card transition-transform duration-300 group-hover:-translate-y-0.5 ${
                    compact ? "size-[34px]" : "size-[34px] @md:size-[42px]"
                  }`}
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <Icon size={compact ? 16 : 18} />
                </span>
                <span className={`mt-2 w-full truncate font-semibold text-ink ${compact ? "text-[11px]" : "text-[11px] @md:text-[13px]"}`}>{s.label}</span>
                {s.detail && !compact && (
                  <span className="mt-0.5 hidden w-full font-mono text-[10px] leading-tight text-muted @sm:block @lg:text-[10.5px]">{s.detail}</span>
                )}
              </li>
            );
          })}
        </ol>

        {!compact && (
          <div className="mt-6 flex flex-wrap items-center gap-1.5 rounded-lg border border-line bg-panel/75 px-3 py-2.5 @lg:mt-8">
            <span className="mr-1 font-mono text-[10.5px] text-dim">output →</span>
            {output.map((o) => (
              <span key={o} className="rounded-md border border-accent/25 bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
                {o}
              </span>
            ))}
          </div>
        )}
      </div>
    </figure>
  );
}
