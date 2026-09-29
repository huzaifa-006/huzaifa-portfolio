"use client";

import { useRef, useState, type FormEvent } from "react";

/**
 * Contact form. Submits to /api/contact, which sends the message to the
 * site owner's inbox server-side (see src/app/api/contact/route.ts).
 * It never opens the visitor's email app.
 */
type Status = "idle" | "sending" | "sent" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

const SUCCESS = "Message sent successfully. Thank you for reaching out.";
const FAILURE = "Something went wrong. Please try again or contact me directly by email.";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const startedAt = useRef<number>(Date.now());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setFieldErrors({});
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          topic: data.get("topic"),
          message: data.get("message"),
          company: data.get("company"), // honeypot
          elapsed: Date.now() - startedAt.current,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("sent");
        form.reset();
        startedAt.current = Date.now();
        return;
      }
      if (json.error === "validation" && json.fields) {
        setFieldErrors(json.fields);
        setStatus("idle");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "mt-1.5 w-full rounded-xl border border-line-strong bg-bg px-3.5 py-2.5 text-[15px] text-ink placeholder:text-dim transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 aria-[invalid=true]:border-rose sm:text-sm";
  const err = (id: keyof FieldErrors) =>
    fieldErrors[id] ? (
      <span id={`${id}-error`} className="mt-1 block text-xs font-medium text-rose">
        {fieldErrors[id]}
      </span>
    ) : null;

  return (
    <form onSubmit={onSubmit} className="card relative p-5 sm:p-6" aria-labelledby="contact-form-title" noValidate>
      <h3 id="contact-form-title" className="font-display text-lg font-semibold text-ink">
        Send a message
      </h3>
      <p className="mt-1 mb-5 text-sm text-muted">I&apos;ll reply to the email address you enter.</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink-2">
          Name
          <input
            name="name"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            className={field}
            placeholder="Your name"
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
          />
          {err("name")}
        </label>
        <label className="block text-sm font-medium text-ink-2">
          Email
          <input
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            className={field}
            placeholder="you@company.com"
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          {err("email")}
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
        <textarea
          name="message"
          required
          rows={5}
          minLength={10}
          maxLength={5000}
          className={field}
          placeholder="What would you like to discuss?"
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
        />
        {err("message")}
      </label>

      {/* Honeypot: hidden from people, often filled in by bots */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-accent-ink transition hover:-translate-y-px hover:bg-accent-hover disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" && (
            <span className="size-4 animate-spin rounded-full border-2 border-accent-ink/30 border-t-accent-ink" aria-hidden />
          )}
          {status === "sending" ? "Sending…" : "Send Message"}
        </button>
        <p role="status" aria-live="polite" className="text-sm">
          {status === "sent" && <span className="font-medium text-accent">{SUCCESS}</span>}
          {status === "error" && <span className="font-medium text-rose">{FAILURE}</span>}
        </p>
      </div>
    </form>
  );
}
