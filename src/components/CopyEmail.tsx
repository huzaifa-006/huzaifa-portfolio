"use client";

import { useState } from "react";
import { Check, Copy } from "./Icons";

/** Copies an email address to the clipboard, with an accessible status message. */
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line-strong bg-panel px-3 text-xs font-semibold text-ink-2 transition hover:border-accent/50 hover:text-ink"
      aria-label={copied ? "Email address copied" : "Copy email address"}
    >
      {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
