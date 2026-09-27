"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks, withBase } from "@/data/site";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/socialLinks";
import { Close, Download, GitHubIcon, Menu } from "./Icons";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const pathname = usePathname();
  const onHome = pathname === "/" || pathname === withBase("/");
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  const progressBar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.current?.style.setProperty("--progress", String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item of the section currently in view (home page only).
  useEffect(() => {
    if (!onHome || typeof IntersectionObserver === "undefined") return;
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onHome]);

  // Mobile menu: lock scroll, close on Escape, move focus in and back out.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1280 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        open ? "border-line bg-bg" : solid ? "border-line/80 bg-bg/80 backdrop-blur-xl" : "border-transparent bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-ink"
      >
        Skip to content
      </a>
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/#home" className="group flex items-center gap-2.5" onClick={() => setOpen(false)} aria-label={`${profile.shortName}, home`}>
          <span className="grid size-9 place-items-center rounded-xl border border-line-strong bg-panel font-display text-sm font-bold text-accent shadow-card transition group-hover:border-accent/60">
            {profile.initials}
          </span>
          <span className="hidden font-display text-[15px] font-semibold tracking-tight text-ink sm:block">{profile.shortName}</span>
        </Link>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {navLinks.map((l) => {
            const isActive = onHome && active === l.id;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors ${
                    isActive ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {l.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0"}`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={withBase(profile.cvPath)}
            download
            className="hidden h-10 items-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-accent-ink transition hover:bg-accent-hover sm:inline-flex"
          >
            <Download size={16} /> CV
          </a>
          <button
            ref={menuButton}
            type="button"
            className="grid size-10 place-items-center rounded-xl border border-line text-ink transition hover:border-line-strong xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Reading progress */}
      <span
        ref={progressBar}
        aria-hidden
        className="scroll-progress absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-r from-accent via-indigo to-accent"
      />

      {/* Mobile / tablet menu */}
      <div
        id="mobile-menu"
        data-open={open}
        inert={!open}
        className="mobile-menu absolute inset-x-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg px-4 pt-3 pb-10 sm:px-6 xl:hidden"
      >
        <ul className="mx-auto flex max-w-6xl flex-col">
          {navLinks.map((l, i) => (
            <li key={l.href}>
              <Link
                ref={i === 0 ? firstLink : undefined}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between border-b border-line py-4 font-display text-lg font-medium transition-colors ${
                  onHome && active === l.id ? "text-accent" : "text-ink hover:text-accent"
                }`}
              >
                {l.label}
                <span className="font-mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mx-auto mt-6 flex max-w-6xl flex-wrap gap-3">
          <a href={withBase(profile.cvPath)} download className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-accent-ink">
            <Download size={16} /> Download CV
          </a>
          <a
            href={socialLinks.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-line-strong px-5 text-sm font-semibold text-ink"
          >
            <GitHubIcon size={16} /> GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
