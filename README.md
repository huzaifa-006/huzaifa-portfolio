# Muhammad Huzaifa Shafiq — Portfolio

Personal portfolio for **Muhammad Huzaifa Shafiq**, Data Scientist · AI/ML Engineer · Python & Data Analytics.

It covers projects with detailed case studies, skills with honest proficiency levels, verified Credly certifications, experience, freelance services, a CV download and a contact form.

Built with **Next.js (App Router) · React · TypeScript · Tailwind CSS**. The site is exported as static files, so it is fast and hosts for free.

---

## Features

- **Recruiter-first home page:** name, target role, stack, CV, GitHub and contact are all visible without scrolling.
- **Projects:** large cards linking to case-study pages (`/projects/<slug>/`) with Overview → Problem → Approach → Stack → Architecture → Implementation → Results → Challenges → Future improvements.
- **Honest visuals:** every project card shows a theme-aware workflow diagram labelled "Conceptual workflow"; case studies also show the chart/diagram images labelled "Conceptual visual" or "Chart from project data". None pretend to be screenshots.
- **Skills:** grouped by area as badges (core tools highlighted), with no fake percentage bars.
- **Light / dark mode:** follows the system setting on first visit, remembers the visitor's choice, no flash on load.
- **Subtle motion:** CSS-only background glow, scroll reveals and hover states; all disabled for `prefers-reduced-motion`.
- **Certifications:** each one links to its public Credly credential ("Verify credential").
- **Contact form:** delivers to your inbox through free Web3Forms. Without a key, it opens the visitor's email app instead.
- **SEO:** title, description, canonical URL, Open Graph and Twitter cards, JSON-LD `Person`, `sitemap.xml`, `robots.txt`.
- **Accessibility:** semantic HTML, skip link, visible focus states, labelled buttons and forms, and support for `prefers-reduced-motion`.
- **Performance:** static HTML, no animation library, lazy-loaded images, SVG project visuals of about 10–15 KB each.

---

## Folder structure

```
huzaifa-portfolio/
├── public/
│   ├── images/          profile-portrait.webp + -360 (your photo, background removed), og-image.png (link preview)
│   ├── projects/        one visual per project (.svg — replace with .png/.jpg screenshots any time)
│   ├── certificates/    (optional) put downloaded badge images here
│   └── resume/          Huzaifa_Shafiq_CV.pdf
├── src/
│   ├── data/            ← EDIT THESE to change content
│   │   ├── profile.ts         name, headline, bio, education, CV path, photo
│   │   ├── socialLinks.ts     GitHub, LinkedIn, Upwork, Fiverr, email
│   │   ├── skills.ts          skill categories (core: true = highlighted)
│   │   ├── projects.ts        projects + case studies
│   │   ├── certifications.ts  Credly badges
│   │   ├── experience.ts      timeline
│   │   ├── services.ts        "What I can help with" services
│   │   ├── process.ts         "How I work" steps
│   │   └── site.ts            SEO title/description, menu links, site URL
│   ├── sections/        Hero, Projects, About, Services, Process, Skills, Experience, Certifications, GitHub, Contact
│   ├── components/      header, footer, theme toggle, background, project cards, pipeline visual, buttons, icons, contact form, reveal
│   ├── app/             pages (home, project case studies, 404, sitemap, robots, favicon)
│   └── styles/          globals.css (colours, fonts, animations)
├── .env.example         settings you can provide (copy to .env.local)
├── next.config.ts
└── package.json
```

---

## Run it on your computer

You need **Node.js 20 or newer** (check with `node -v`).

```bash
cd huzaifa-portfolio
npm install        # first time only
npm run dev        # open http://localhost:3000 — the page reloads as you edit
```

Build the production version:

```bash
npm run build      # creates the static site in the out/ folder
npm start          # preview the built site locally
```

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values. `.env.local` is git-ignored and never committed.

| Variable | Needed? | What it does |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Your live address, e.g. `https://huzaifashafiq.vercel.app`. Used for the canonical URL, sitemap and link previews. |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Optional | Free key from [web3forms.com](https://web3forms.com). Contact-form messages then go straight to your inbox. It is a public form key, safe in the browser. |
| `NEXT_PUBLIC_BASE_PATH` | GitHub Pages only | e.g. `/huzaifa-portfolio`. Leave empty on Vercel. |

On Vercel, add these under **Project → Settings → Environment Variables**, then redeploy.

---

## Deploy for free on Vercel

1. Push this folder to a GitHub repository (see below).
2. Go to [vercel.com](https://vercel.com) → **Sign up with GitHub** (free Hobby plan).
3. Click **Add New… → Project**, choose the repository, then **Import**.
4. Vercel detects Next.js automatically. Before clicking **Deploy**, set **Project Name** to `huzaifashafiq`. The name becomes the address, so you get **https://huzaifashafiq.vercel.app**. If it's taken, try `huzaifa-shafiq` or `muhammadhuzaifashafiq`.
5. Add `NEXT_PUBLIC_SITE_URL` = your address (and optionally the Web3Forms key), then click **Deploy**.
6. Every `git push` to `main` redeploys automatically.

### Push to GitHub (first time)

```bash
cd huzaifa-portfolio
git init
git add .
git commit -m "Portfolio website"
git branch -M main
# create an empty repo named huzaifa-portfolio on github.com first, then:
git remote add origin https://github.com/huzaifa-006/huzaifa-portfolio.git
git push -u origin main
```

### Custom domain (optional, paid)

A domain such as `huzaifashafiq.com` costs about $10–15 a year from a registrar (Cloudflare, Namecheap or Porkbun).

1. Buy the domain.
2. In Vercel: **Project → Settings → Domains → Add** `huzaifashafiq.com`. Vercel shows the DNS records to add, usually an `A` record for `@` and a `CNAME` for `www`.
3. Add those records at your registrar and wait a few minutes. HTTPS is set up automatically.
4. Change `NEXT_PUBLIC_SITE_URL` to `https://huzaifashafiq.com` and redeploy.

### Other free hosts

`npm run build` produces a plain `out/` folder that also works on **Netlify**, **Cloudflare Pages** and **GitHub Pages**. For GitHub Pages, set `NEXT_PUBLIC_BASE_PATH=/<repo-name>`.

---

## How to update content

All content lives in `src/data/`. Open a file, change the text between the quotes, save, and the dev server updates instantly.

**Change your bio or headline:** edit `src/data/profile.ts` (`headline`, `heroSummary`, `about` paragraphs, `facts`).

**Update links:** edit `src/data/socialLinks.ts`.

**Highlight a skill:** in `src/data/skills.ts`, add `core: true` to it.

**Add a project:**
1. Put an image in `public/projects/`, e.g. `my-project.png` (1600×1000 works best).
2. In `src/data/projects.ts`, copy an existing `{ ... }` block and change the values. `slug` becomes the URL (`/projects/my-project/`).
3. Set `featured: true` for a big card (keep three) or `false` for the "More projects" grid. Fill in `pipeline` (the workflow diagram steps) and, only with numbers from the repository, `keyResults`. The `caseStudy` part is optional; leave it out if you don't need a detail page.
4. Set `image.kind` to `"screenshot"` if it is a real screenshot, `"concept"` for an illustration, or `"data"` for a chart from real data.

**Replace a project visual with a real screenshot:** save it in `public/projects/`, update `image.src`, and set `image.kind: "screenshot"`.

**Add a certification:** open the badge on Credly and copy its URL (`https://www.credly.com/badges/...`). Right-click the badge image → *Copy image address*. Then add a block in `src/data/certifications.ts`. To show the University of Michigan certificates listed on your CV, paste their Coursera verification URLs and set `visible: true`.

**Replace your photo:** save a square, background-removed WebP as `public/images/profile-portrait.webp` (720×720) and `profile-portrait-360.webp` (360×360), or change `photo` in `profile.ts`.

**Replace your CV:** overwrite `public/resume/Huzaifa_Shafiq_CV.pdf` with the new file, keeping the same name.

**Change colours or fonts:** edit the variables at the top of `src/styles/globals.css` (one block for dark, one for light). Fonts are set in `src/app/layout.tsx`.

**Reorder or hide sections:** edit `src/app/page.tsx`, and keep `navLinks` in `src/data/site.ts` in the same order.

---

## Content honesty notes

- Numbers in the project cards and case studies come only from files in the repositories (metrics CSVs, metadata JSON, READMEs) or were computed from the datasets in those repositories.
- The Employee Attrition dataset is **synthetic** (generated in notebook 01). The site says so.
- HateShield AI has no published evaluation metrics, so the site shows none.
- Project visuals are labelled illustrations or charts; none are presented as screenshots.

---

## Tech stack

Next.js 15 (App Router, static export) · React 19 · TypeScript · Tailwind CSS 4 · next/font (Inter, Space Grotesk, JetBrains Mono) · Web3Forms (optional)
