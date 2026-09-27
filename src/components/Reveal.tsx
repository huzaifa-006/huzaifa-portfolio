"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Animates its children in when they scroll into view.
 * variant: "up" (default) | "left" | "right" | "zoom" | "seq"
 * ("seq" reveals each direct child one after another; set --seq on them).
 * Uses one IntersectionObserver per element and unobserves after reveal.
 * Disabled automatically for prefers-reduced-motion (see globals.css).
 */
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  variant = "up",
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  variant?: "up" | "left" | "right" | "zoom" | "seq";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`${variant === "seq" ? "reveal-seq" : `reveal reveal-${variant}`} ${className}`} style={{ ["--reveal-delay" as string]: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
