"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks, withBase } from "@/data/site";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/socialLinks";
import { Close, Download, GitHubIcon, Menu } from "./Icons";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b border-line/70 bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-ink">
        Skip to content
      </a>
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid size-8 place-items-center rounded-lg border border-line-strong bg-panel-2 font-display text-sm font-bold text-accent transition group-hover:border-accent/60">
            {profile.initials}
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight text-white">{profile.shortName}</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={socialLinks.github.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in new tab)"
            className="hidden size-9 place-items-center rounded-lg text-muted transition hover:bg-white/5 hover:text-white sm:grid"
          >
            <GitHubIcon size={18} />
          </a>
          <a
            href={withBase(profile.cvPath)}
            download
            className="hidden items-center gap-2 rounded-lg border border-line-strong bg-panel-2/80 px-3 py-2 text-sm font-semibold text-ink transition hover:border-accent/60 sm:inline-flex"
          >
            <Download size={16} /> CV
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div id="mobile-menu" hidden={!open} className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line/60 bg-bg/95 px-4 pb-10 pt-4 backdrop-blur-xl lg:hidden">
        <ul className="flex flex-col">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line/60 py-4 font-display text-xl font-medium text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={withBase(profile.cvPath)} download className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink">
            <Download size={16} /> Download CV
          </a>
          <a href={socialLinks.github.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-4 py-2.5 text-sm font-semibold">
            <GitHubIcon size={16} /> GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
