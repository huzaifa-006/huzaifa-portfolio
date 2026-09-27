"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "./Icons";

type Theme = "light" | "dark";

/**
 * Light / dark switch. The initial theme is set before paint by the
 * inline script in layout.tsx (saved choice → system preference), so
 * this component only reads it and handles changes.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as Theme) || "dark");
    // Follow the system setting until the visitor makes an explicit choice.
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      let saved: string | null = null;
      try { saved = localStorage.getItem("theme"); } catch {}
      if (!saved) apply(e.matches ? "dark" : "light", false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function apply(next: Theme, persist = true) {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    root.dataset.theme = next;
    setTheme(next);
    if (persist) {
      try { localStorage.setItem("theme", next); } catch {}
    }
    window.setTimeout(() => root.classList.remove("theme-transition"), 400);
  }

  const isDark = theme !== "light";
  return (
    <button
      type="button"
      onClick={() => apply(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
      className={`relative grid size-10 place-items-center rounded-xl border border-line text-ink-2 transition hover:border-line-strong hover:text-ink ${className}`}
    >
      {/* Both icons are rendered; CSS swaps them so there is no hydration flash. */}
      <Sun size={18} className="absolute transition-all duration-300 light:scale-50 light:rotate-90 light:opacity-0" />
      <Moon size={18} className="absolute scale-50 -rotate-90 opacity-0 transition-all duration-300 light:scale-100 light:rotate-0 light:opacity-100" />
    </button>
  );
}

/** Runs in <head> before first paint to avoid a flash of the wrong theme. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})();`;
