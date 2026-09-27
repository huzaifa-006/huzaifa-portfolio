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
  title: "Huzaifa Shafiq | Data Scientist & AI/ML Engineer",
  shortTitle: "Huzaifa Shafiq",
  description:
    "Portfolio of Muhammad Huzaifa Shafiq, Data Scientist and AI/ML Engineer. Python, data analytics and machine-learning projects: data cleaning, EDA, predictive models, Streamlit dashboards and an XLNet NLP system.",
  keywords: [
    "Data Scientist",
    "AI/ML Engineer",
    "Machine Learning",
    "Python",
    "Data Analytics",
    "NLP",
    "Data Science Portfolio",
  ],
  ogImage: "/images/og-image.png",
};

/** Main navigation, in the same order as the sections on the home page. */
export const navLinks = [
  { label: "Home", href: "/#home", id: "home" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Services", href: "/#services", id: "services" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Certifications", href: "/#certifications", id: "certifications" },
  { label: "Contact", href: "/#contact", id: "contact" },
];
