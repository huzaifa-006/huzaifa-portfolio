import Link from "next/link";
import type { ReactNode } from "react";

/* Shared building blocks: buttons, section headings, badges, sections. */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "sm";
  external?: boolean;
  download?: boolean;
  className?: string;
  ariaLabel?: string;
};

const variants = {
  primary:
    "bg-accent text-accent-ink hover:bg-accent-hover shadow-[0_10px_28px_-14px_color-mix(in_oklab,var(--accent)_75%,transparent)]",
  secondary: "border border-line-strong bg-panel/80 text-ink hover:border-accent/50 hover:bg-panel",
  ghost: "text-ink-2 hover:text-ink hover:bg-ink/5",
};

const sizes = {
  md: "h-11 px-5 text-sm",
  sm: "h-9 px-3.5 text-[13px]",
};

export function Button({ href, children, variant = "primary", size = "md", external, download, className = "", ariaLabel }: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap transition-all duration-200 hover:-translate-y-px active:translate-y-0 ${sizes[size]} ${variants[variant]} ${className}`;
  if (external || download || href.startsWith("mailto:") || href.endsWith(".pdf")) {
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: "" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  index,
  align = "left",
  action,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  id?: string;
  /** Small section number, e.g. "01". */
  index?: string;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <div className={`mb-10 flex flex-col gap-5 md:mb-12 ${centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}>
      <div className={`max-w-2xl ${centered ? "mx-auto" : ""}`}>
        <p className={`mb-3 flex items-center gap-2.5 font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase ${centered ? "justify-center" : ""}`}>
          {index && <span className="text-dim">{index}</span>}
          <span className="h-px w-6 bg-accent/60" aria-hidden />
          {eyebrow}
        </p>
        <h2 id={id} className="font-display text-3xl font-semibold tracking-tight text-balance text-ink sm:text-[2.5rem] sm:leading-[1.1]">
          {title}
        </h2>
        {intro && <p className="mt-4 text-base leading-relaxed text-pretty text-muted sm:text-[17px]">{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Tag({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "accent" | "mono" }) {
  const t =
    tone === "accent"
      ? "border-accent/30 bg-accent/10 text-accent"
      : tone === "mono"
        ? "border-line bg-panel-2/70 font-mono text-[11px] text-muted"
        : "border-line bg-panel-2/70 text-ink-2";
  return <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${t}`}>{children}</span>;
}

export function Section({ id, children, className = "", labelledBy }: { id: string; children: ReactNode; className?: string; labelledBy?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24 ${className}`}>
      {children}
    </section>
  );
}

/** Small arrow-link used for "Verify Credential →", "View GitHub →" etc. */
export function TextLink({ href, children, external, ariaLabel, className = "" }: { href: string; children: ReactNode; external?: boolean; ariaLabel?: string; className?: string }) {
  const cls = `group/link inline-flex items-center gap-1.5 text-sm font-semibold text-accent underline-offset-4 hover:underline ${className}`;
  const inner = (
    <>
      {children}
      <span aria-hidden className="transition-transform duration-200 group-hover/link:translate-x-0.5">→</span>
    </>
  );
  if (external || href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className={cls}>
        {inner}
      </a>
    );
  }
  if (href.endsWith(".pdf") || href.startsWith("mailto:")) {
    return (
      <a href={href} aria-label={ariaLabel} className={cls} {...(href.endsWith(".pdf") ? { download: "" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} aria-label={ariaLabel} className={cls}>
      {inner}
    </Link>
  );
}
