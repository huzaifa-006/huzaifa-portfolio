"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "./Icons";

const R = 20;
const C = 2 * Math.PI * R;

/**
 * Round "back to top" button fixed at the middle of the right edge.
 * Appears after scrolling down; the ring shows how far down the page you are.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ring = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setVisible(y > Math.min(600, window.innerHeight * 0.8));
        ring.current?.setAttribute("stroke-dashoffset", String(C * (1 - (max > 0 ? Math.min(1, y / max) : 0))));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function toTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    // Move keyboard focus back to the start of the page as well.
    document.querySelector<HTMLElement>("header a[href='/#home']")?.focus({ preventScroll: true });
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`group fixed top-1/2 right-3 z-40 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-panel/90 text-ink shadow-lift backdrop-blur transition-all duration-300 hover:border-accent/60 hover:text-accent sm:right-5 sm:size-12 ${
        visible ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-4 opacity-0"
      }`}
    >
      <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 48 48" aria-hidden>
        <circle cx="24" cy="24" r={R} fill="none" stroke="var(--line)" strokeWidth="2" />
        <circle
          ref={ring}
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C}
          className="transition-[stroke-dashoffset] duration-150"
        />
      </svg>
      <ArrowUp size={18} className="relative transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
}
