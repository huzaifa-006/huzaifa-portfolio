"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/data/profile";

/**
 * Contact form.
 * - If NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is set (free at web3forms.com),
 *   messages are delivered to your inbox without leaving the page.
 * - If it is not set, submitting opens the visitor's email app with the
 *   message pre-filled, so the form always works.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const topic = String(data.get("topic") || "General");

    if (data.get("botcheck")) return; // honeypot

    if (!ACCESS_KEY) {
      const subject = encodeURIComponent(`[Portfolio] ${topic} — ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `[Portfolio] ${topic} — ${name}`,
          from_name: "Portfolio contact form",
          name,
          email,
          topic,
          message,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("sent");
        form.reset();
      } else {
        throw new Error(json.message || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const field =
    "mt-1.5 w-full rounded-xl border border-line-strong bg-bg-2 px-3.5 py-2.5 text-sm text-ink placeholder:text-dim transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-panel/60 p-5 sm:p-6" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink-2">
          Name
          <input name="name" required autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="block text-sm font-medium text-ink-2">
          Email
          <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@company.com" />
        </label>
      </div>
      <label className="mt-4 block text-sm font-medium text-ink-2">
        Topic
        <select name="topic" className={field} defaultValue="Job opportunity">
          <option>Job opportunity</option>
          <option>Freelance project</option>
          <option>Collaboration</option>
          <option>Other</option>
        </select>
      </label>
      <label className="mt-4 block text-sm font-medium text-ink-2">
        Message
        <textarea name="message" required rows={5} minLength={10} className={field} placeholder="What would you like to discuss?" />
      </label>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition hover:bg-[#5eead4] disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p role="status" aria-live="polite" className="text-sm">
          {status === "sent" && (
            <span className="text-accent">{ACCESS_KEY ? "Thanks — your message was sent. I'll reply by email." : "Your email app should open with the message ready to send."}</span>
          )}
          {status === "error" && (
            <span className="text-rose">
              {error} You can also email <a className="underline" href={`mailto:${profile.email}`}>{profile.email}</a>.
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
