import Link from "next/link";
import type { ReactNode } from "react";

/* Shared building blocks: buttons, section headings, tags. */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  download?: boolean;
  className?: string;
  ariaLabel?: string;
};

const variants = {
  primary:
    "bg-accent text-accent-ink hover:bg-[#5eead4] shadow-[0_0_0_1px_rgba(45,212,191,.4),0_10px_30px_-12px_rgba(45,212,191,.6)]",
  secondary: "bg-panel-2/80 text-ink border border-line-strong hover:border-accent/60 hover:text-white",
  ghost: "text-ink-2 hover:text-white hover:bg-white/5",
};

export function Button({ href, children, variant = "primary", external, download, className = "", ariaLabel }: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-xl px-4.5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${variants[variant]} ${className}`;
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

export function SectionHeading({ eyebrow, title, intro, id }: { eyebrow: string; title: string; intro?: string; id?: string }) {
  return (
    <div className="mb-10 max-w-2xl md:mb-14">
      <p className="mb-3 font-mono text-xs font-medium tracking-[0.2em] text-accent uppercase">{eyebrow}</p>
      <h2 id={id} className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
    </div>
  );
}

export function Tag({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "accent" }) {
  const t = tone === "accent" ? "border-accent/30 bg-accent/10 text-accent" : "border-line bg-panel-2/70 text-ink-2";
  return <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${t}`}>{children}</span>;
}

export function Section({ id, children, className = "", labelledBy }: { id: string; children: ReactNode; className?: string; labelledBy?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24 ${className}`}>
      {children}
    </section>
  );
}
