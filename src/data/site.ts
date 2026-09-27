/**
 * ─────────────────────────────────────────────────────────────
 *  SITE SETTINGS — SEO title/description and navigation.
 *  The live URL comes from NEXT_PUBLIC_SITE_URL (see .env.example).
 *  When you buy a custom domain, change that one value.
 * ─────────────────────────────────────────────────────────────
 */

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://huzaifashafiq.vercel.app").replace(/\/$/, "");

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefix a public file path with the base path (only matters on GitHub Pages). */
export const withBase = (path: string) => (path.startsWith("http") ? path : `${basePath}${path}`);

export const seo = {
  title: "Muhammad Huzaifa Shafiq — Junior Data Scientist & AI/ML Engineer",
  shortTitle: "Huzaifa Shafiq",
  description:
    "Data Science portfolio of Muhammad Huzaifa Shafiq: Python, Pandas, SQL and machine-learning projects — data cleaning, analytics, dashboards and an XLNet NLP system. Open to junior Data Scientist, Data Analyst and ML roles.",
  keywords: [
    "Data Scientist",
    "Data Analyst",
    "AI/ML Engineer",
    "Python",
    "Machine Learning",
    "Data Analytics",
    "Data Science Portfolio",
    "Web Scraping",
    "Pakistan",
  ],
  ogImage: "/images/og-image.png",
};

export const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Certifications", href: "/#certifications" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];
