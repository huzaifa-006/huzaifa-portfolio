import type { CaseStudy } from "@/data/projects";

/**
 * Vertical architecture / workflow diagram for a case study.
 * Always labelled as conceptual so it's never mistaken for a screenshot.
 */
export default function FlowDiagram({ flow }: { flow: NonNullable<CaseStudy["flow"]> }) {
  return (
    <figure className="relative isolate overflow-hidden rounded-xl border border-line bg-bg-2" aria-labelledby="flow-title">
      <div className="dot-grid absolute inset-0 -z-10 opacity-70" aria-hidden />
      <div className="absolute -top-20 -right-16 -z-10 size-56 rounded-full bg-accent/12 blur-3xl" aria-hidden />
      <div className="flex items-center justify-between gap-3 border-b border-line bg-panel/70 px-4 py-2.5">
        <span id="flow-title" className="font-display text-sm font-semibold text-ink">
          {flow.title}
        </span>
        <span className="shrink-0 rounded-md border border-line bg-bg/70 px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-muted uppercase">
          Conceptual diagram
        </span>
      </div>
      <ol className="relative p-4 sm:p-5">
        {flow.steps.map((st, i) => {
          const last = i === flow.steps.length - 1;
          return (
            <li key={st.label} className="relative flex gap-3.5 pb-4 last:pb-0">
              {!last && (
                <span className="absolute top-9 bottom-0 left-[15px] w-px bg-gradient-to-b from-accent/70 to-indigo/40" aria-hidden />
              )}
              <span
                className={`relative z-10 grid size-8 shrink-0 place-items-center rounded-lg border font-mono text-[12px] font-semibold ${
                  last ? "border-accent bg-accent text-accent-ink" : "border-accent/40 bg-panel text-accent"
                }`}
              >
                {i + 1}
              </span>
              <div className="min-w-0 flex-1 rounded-lg border border-line bg-panel/85 px-3.5 py-2.5">
                <p className="text-sm font-semibold text-ink">{st.label}</p>
                <p className="mt-0.5 text-[13px] leading-snug text-muted">{st.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
