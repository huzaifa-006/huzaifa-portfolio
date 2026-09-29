import { NextResponse } from "next/server";

/**
 * Contact form endpoint. Sends the visitor's message straight to the site
 * owner's inbox through Resend (https://resend.com). Runs only on the server:
 * the API key never reaches the browser.
 *
 * Environment variables (set in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY      required  Resend API key (starts with "re_")
 *   CONTACT_TO_EMAIL    optional  where messages go (default: huzaifashafiq2024@gmail.com)
 *   CONTACT_FROM_EMAIL  optional  sender, e.g. "Portfolio <contact@yourdomain.com>"
 *                                 (default: Resend's shared "onboarding@resend.dev", which can
 *                                 only deliver to the email address that owns the Resend account)
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOPICS = ["Job opportunity", "Freelance project", "Collaboration", "Other"] as const;
const LIMITS = { name: 100, email: 254, message: 5000 };
const MIN_FILL_MS = 2500; // humans take longer than this to fill the form
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

// Best-effort, per-instance rate limit (serverless instances don't share memory).
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_MAX;
}

/** Trim, drop control characters (keeping newlines/tabs) and cap length. */
function clean(value: unknown, max: number, multiline = false) {
  if (typeof value !== "string") return "";
  const stripped = value.replace(multiline ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, "");
  return stripped.trim().slice(0, max);
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;

function fail(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request) {
  // Only accept submissions from this site.
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host) {
    let originHost = "";
    try {
      originHost = new URL(origin).host;
    } catch {}
    if (originHost !== host) return fail(403, "forbidden");
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return fail(429, "rate_limited");

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail(400, "invalid");
  }

  // Spam traps: hidden field must be empty, and the form can't be filled instantly.
  if (typeof body.company === "string" && body.company.trim() !== "") return NextResponse.json({ ok: true });
  const elapsed = Number(body.elapsed);
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) return fail(400, "invalid");

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const topic = TOPICS.includes(body.topic as (typeof TOPICS)[number]) ? (body.topic as string) : "Other";
  const message = clean(body.message, LIMITS.message, true);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10) errors.message = "Please write a message of at least 10 characters.";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, error: "validation", fields: errors }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set; cannot send email.");
    return fail(500, "send_failed");
  }
  const to = process.env.CONTACT_TO_EMAIL || "huzaifashafiq2024@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
  const timestamp = new Date().toLocaleString("en-GB", { timeZone: "Asia/Karachi", dateStyle: "full", timeStyle: "short" }) + " (PKT)";

  const text = [`New message from your portfolio`, ``, `Name: ${name}`, `Email: ${email}`, `Topic: ${topic}`, `Sent: ${timestamp}`, ``, message].join("\n");
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;vertical-align:top">${label}</td><td style="padding:6px 0;color:#111827">${value}</td></tr>`;
  const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5">
<h2 style="margin:0 0 12px;font-size:18px">New message from your portfolio</h2>
<table style="border-collapse:collapse">${row("Name", escapeHtml(name))}${row("Email", `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`)}${row("Topic", escapeHtml(topic))}${row("Sent", escapeHtml(timestamp))}</table>
<div style="margin-top:16px;padding:14px 16px;border:1px solid #e5e7eb;border-radius:8px;white-space:pre-wrap">${escapeHtml(message)}</div>
<p style="margin-top:16px;color:#6b7280;font-size:13px">Reply to this email to answer ${escapeHtml(name)} directly.</p></div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[Portfolio] ${topic} — ${name}`,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[contact] Resend rejected the request:", res.status, await res.text().catch(() => ""));
      return fail(502, "send_failed");
    }
  } catch (err) {
    console.error("[contact] Failed to reach Resend:", err);
    return fail(502, "send_failed");
  }

  return NextResponse.json({ ok: true });
}

export function GET() {
  return fail(405, "method_not_allowed");
}
