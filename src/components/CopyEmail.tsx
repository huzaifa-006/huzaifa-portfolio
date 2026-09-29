"use client";

import { useState } from "react";
import { Check, Copy } from "./Icons";

/** Copies an email address to the clipboard, with an accessible status message. */
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Fallback for browsers without the async clipboard API.
      const t = document.createElement("textarea");
      t.value = email;
      t.setAttribute("readonly", "");
      t.style.position = "fixed";
      t.style.opacity = "0";
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg border border-line-strong bg-panel px-3.5 text-[13px] font-semibold text-ink transition hover:border-accent/50 hover:text-accent"
      aria-label={copied ? "Email address copied" : `Copy email address ${email}`}
    >
      {copied ? <Check size={15} className="text-accent" /> : <Copy size={15} />}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
