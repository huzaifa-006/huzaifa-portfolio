# Muhammad Huzaifa Shafiq — Portfolio

Personal portfolio of **Muhammad Huzaifa Shafiq**, Data Scientist · AI/ML Engineer · Python & Data Analytics.

**Live:** https://huzaifashafiq.vercel.app

Projects with detailed case studies, data & AI services, skills, experience, verified IBM certifications, a CV download, and a contact form that emails messages directly to my inbox.

Built with **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4**, deployed on **Vercel**. Pages are pre-rendered at build time; the only server code is the contact-form API route.

---

## Page structure

| # | Section | Source |
|---|---|---|
| 01 | Hero: name, title, value proposition, CTAs, profile buttons | `src/sections/Hero.tsx` |
| 02 | Featured Projects: flagship cards + "More projects" | `src/sections/Projects.tsx` |
| 03 | About | `src/sections/About.tsx` |
| 04 | Data & AI Services | `src/sections/Services.tsx` |
| 05 | How I Work | `src/sections/Process.tsx` |
| 06 | Skills / Tech Stack | `src/sections/Skills.tsx` |
| 07 | Experience & Education | `src/sections/Experience.tsx` |
| 08 | Certifications | `src/sections/Certifications.tsx` |
| 09 | GitHub | `src/sections/GitHub.tsx` |
| 10 | Contact | `src/sections/Contact.tsx` |

Each project with a case study also gets its own page at `/projects/<slug>/`, structured as **Problem → Solution → Approach → Technologies → Results → Limitations → Links**.

---

## Features

- **Projects first.** HateShield AI and Employee Attrition Analytics are flagship projects, with vertical architecture/workflow diagrams on their case studies. Every project card shows a workflow diagram built from what the project actually does.
- **Honest visuals.** Diagrams are labelled "Conceptual workflow" or "Conceptual diagram"; case-study images are labelled "Conceptual visual" or "Chart from project data". None are presented as screenshots.
- **Light / dark mode.** Two separately designed themes: dark is charcoal + emerald, light is a soft grey + teal. The site follows the system setting on the first visit, remembers the visitor's choice, and doesn't flash the wrong theme on load. All text colours meet WCAG AA contrast.
- **Motion.** An animated "data network" background drawn on a canvas, scroll reveals, staggered section headings, a reading-progress bar and hover states. Animation is lighter on phones, pauses when the tab is hidden, and is fully disabled for `prefers-reduced-motion`.
- **Contact form with direct email.** Messages are sent server-side through [Resend](https://resend.com) to my inbox, with Reply-To set to the visitor. It never opens the visitor's email app. See [Contact form](#contact-form).
- **Labelled profile buttons.** LinkedIn, GitHub, Upwork and Fiverr appear as icon + name buttons in the hero, the contact section and the footer.
- **Navigation.** A navbar that highlights the section in view, a light/dark toggle, a CV button, an accessible mobile menu, and a back-to-top button with a scroll-progress ring.
- **SEO.** Title, description, canonical URL, Open Graph and Twitter cards, JSON-LD `Person`, `sitemap.xml`, `robots.txt` and a favicon / apple-touch icon.
- **Accessibility.** Semantic HTML, a skip link, visible focus states, labelled buttons and form fields, inline form errors and a keyboard-friendly mobile menu.
- **Performance.** Pre-rendered pages, no animation or UI libraries, WebP photos (~50 KB), SVG project visuals and self-hosted fonts via `next/font`.

---

## Folder structure

```
huzaifa-portfolio/
├── public/
│   ├── images/          profile-headshot.webp (+ -360), og-image.png (link preview)
│   ├── projects/        project visuals (.svg; replace with real screenshots any time)
│   └── resume/          Huzaifa_Shafiq_CV.pdf
├── src/
│   ├── data/            ← EDIT THESE to change content
│   │   ├── profile.ts         name, headline, hero text, about, facts, education, photo, CV path
│   │   ├── projects.ts        projects, workflow steps, key results, case studies
│   │   ├── services.ts        Data & AI Services
│   │   ├── process.ts         How I Work steps
│   │   ├── skills.ts          skill categories (core: true = highlighted)
│   │   ├── experience.ts      experience + education timeline
│   │   ├── certifications.ts  IBM / Credly badges
│   │   ├── socialLinks.ts     LinkedIn, GitHub, Upwork, Fiverr, email
│   │   └── site.ts            SEO title/description, nav links, site URL
│   ├── sections/        one file per home-page section (see table above)
│   ├── components/      header, footer, theme toggle, background, project cards, pipeline & flow diagrams,
│   │                    social buttons, contact form, copy-email, back-to-top, reveal animation, icons, UI primitives
│   ├── app/
│   │   ├── page.tsx               home page (section order)
│   │   ├── projects/[slug]/       case-study pages
│   │   ├── api/contact/route.ts   contact-form email endpoint (server-side)
│   │   └── layout.tsx, sitemap.ts, robots.ts, icon.svg, apple-icon.png, not-found.tsx
│   └── styles/globals.css   theme colours (dark + light), animations
├── .env.example         environment variables (copy to .env.local)
├── next.config.ts
└── package.json
```

---

## Run locally

Requires **Node.js 20+**.

```bash
npm install        # first time only
npm run dev        # http://localhost:3000, reloads as you edit
```

Production build:

```bash
npm run build      # production build
npm start          # serve the production build on http://localhost:3000
npm run typecheck  # TypeScript check
```

To test the contact form locally, create `.env.local` with `RESEND_API_KEY` (see below). Without it, the form validates input but shows the error message instead of sending.

---

## Contact form

`Send Message` posts to **`/api/contact/`** (`src/app/api/contact/route.ts`), which:

1. Accepts only same-origin requests, and rate-limits each IP to 5 submissions per 10 minutes.
2. Rejects likely bots: a hidden honeypot field, and forms submitted in under 2.5 seconds.
3. Validates and sanitises name, email, topic and message on the server.
4. Sends the email through Resend's API, including the name, email, topic, message and a timestamp (PKT), with **Reply-To** set to the visitor.
5. Returns only generic success or error states to the browser. Technical details go to the Vercel function logs.

The API key is read from environment variables on the server and never appears in browser code.

### Environment variables

Set these in **Vercel → Project → Settings → Environment Variables** (Production and Preview), then **redeploy**. For local development, put them in `.env.local`.

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | **Yes** | Resend API key (`re_…`). Server-side only; never prefix it with `NEXT_PUBLIC_`. |
| `CONTACT_TO_EMAIL` | No | Where messages go. Default: `huzaifashafiq2024@gmail.com`. |
| `CONTACT_FROM_EMAIL` | No | Sender. Default: `Portfolio Contact <onboarding@resend.dev>`, which can **only deliver to the email that owns the Resend account**. Verify your own domain in Resend to use e.g. `Portfolio <contact@yourdomain.com>`. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Live URL for canonical links, sitemap and link previews. Default: `https://huzaifashafiq.vercel.app`. |

### One-time setup

1. Sign up at [resend.com](https://resend.com) using **huzaifashafiq2024@gmail.com**.
2. **API Keys → Create API key** (sending access) and copy it.
3. Add it in Vercel as `RESEND_API_KEY`, then redeploy the latest deployment.
4. Send yourself a test message from the live site. Check spam the first time and mark it "Not spam".

### Troubleshooting

| Symptom | Likely cause |
|---|---|
| "Something went wrong…" on every submit | `RESEND_API_KEY` missing, or added without redeploying. Check the Vercel function logs for `[contact]` messages. |
| Logs say you can only send testing emails to your own address | The default sender is being used with a `CONTACT_TO_EMAIL` that isn't the Resend account email. Verify a domain, or send to the account email. |
| Emails arrive in spam | Normal at first with the shared sender. Mark "Not spam"; a verified domain improves delivery. |

---

## Updating content

All content is in `src/data/`. Edit the text between the quotes and save; the dev server updates instantly.

| To change… | Edit |
|---|---|
| Name, hero title, value proposition, About text, facts, location | `src/data/profile.ts` |
| Profile links (LinkedIn, GitHub, Upwork, Fiverr, email) | `src/data/socialLinks.ts` |
| Services / How I Work steps | `src/data/services.ts` / `src/data/process.ts` |
| Skills (add `core: true` to highlight one) | `src/data/skills.ts` |
| Experience & education | `src/data/experience.ts` |
| Certifications | `src/data/certifications.ts` |
| Page title, description, nav links | `src/data/site.ts` |
| Section order | `src/app/page.tsx` (keep `navLinks` in `site.ts` in the same order) |
| Colours | CSS variables at the top of `src/styles/globals.css` (one block per theme) |
| Fonts | `src/app/layout.tsx` |

### Add or edit a project

In `src/data/projects.ts`, copy an existing `{ … }` block:

- `slug`: becomes the URL, `/projects/<slug>/`.
- `featured: true`: one of the three large cards (HateShield AI, Employee Attrition, House Price). `false` puts it in "More projects".
- `flagship: true`: adds the "Flagship project" badge.
- `pipeline`: the five-step workflow diagram on the card. Describe what the project really does.
- `keyResults`: up to three numbers for the card, **copied only from `caseStudy.results`** (i.e. from the repository). Use `resultsCaveat` for context such as "synthetic dataset".
- `caseStudy` (optional): the detail page. `caseStudy.flow` adds the vertical architecture diagram.
- `image`: the case-study visual in `public/projects/`. Set `kind` to `"screenshot"` only for real screenshots, `"concept"` for illustrations, or `"data"` for charts drawn from real data.

### Replace the photo, CV or link preview

- **Photo:** a square, background-removed WebP at `public/images/profile-headshot.webp` (720×720) and `profile-headshot-360.webp` (360×360). If you use a new filename, update `photo` in `profile.ts`; a new name also stops browsers showing a cached old photo.
- **CV:** overwrite `public/resume/Huzaifa_Shafiq_CV.pdf`, keeping the same name.
- **Link preview:** `public/images/og-image.png` (1200×630).

---

## Deployment

The site deploys automatically from GitHub (`huzaifa-006/huzaifa-portfolio`) to Vercel (project `huzaifashafiq`):

- **Pull request / branch push:** Vercel builds a **preview** deployment and posts the link on the PR.
- **Merge to `main`:** Vercel deploys to **production**, https://huzaifashafiq.vercel.app.

Typical workflow:

```bash
git switch -c my-change
# …edit…
npm run build            # make sure it builds
git add -A && git commit -m "Describe the change"
git push -u origin my-change
# open a PR on GitHub, check the Vercel preview, then merge
```

The contact API route needs a server, so host on a platform that runs Next.js (Vercel, Netlify or similar). Static-only hosts such as GitHub Pages won't run it.

### Custom domain (optional)

1. Buy a domain (e.g. from Cloudflare, Namecheap or Porkbun).
2. **Vercel → Project → Settings → Domains → Add**, then add the DNS records Vercel shows at your registrar.
3. Update `NEXT_PUBLIC_SITE_URL` and redeploy. Optionally verify the domain in Resend and set `CONTACT_FROM_EMAIL` to an address on it.

---

## Content honesty

- Project numbers come only from files in each repository (metrics CSVs, metadata JSON, READMEs) or were computed from the datasets in those repositories.
- The Employee Attrition dataset is **synthetic** (generated in notebook 01), and the site says so.
- HateShield AI has no published evaluation metrics, so the site shows none.
- Diagrams and illustrations are labelled as conceptual; none are presented as screenshots.
- No testimonials, clients, or invented results.

---

## Tech stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · `next/font` (Inter, Space Grotesk, JetBrains Mono) · Resend (contact email) · Vercel
