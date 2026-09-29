/**
 * ─────────────────────────────────────────────────────────────
 *  EXPERIENCE TIMELINE
 *  Newest first. `type` controls the small label:
 *  "work" | "freelance" | "education"
 * ─────────────────────────────────────────────────────────────
 */

export interface ExperienceItem {
  role: string;
  org: string;
  type: "work" | "freelance" | "education";
  period: string;
  location?: string;
  points: string[];
  tags?: string[];
  links?: { label: string; href: string }[];
}

export const experience: ExperienceItem[] = [
  {
    role: "Freelance Data Analyst / Python Developer",
    org: "Upwork & Fiverr",
    type: "freelance",
    period: "Current",
    location: "Remote",
    points: [
      "Offer data cleaning, preprocessing, exploratory analysis, visualisation and machine-learning services through Upwork and Fiverr.",
      "Scope work around reproducible Python notebooks and clean, documented deliverables.",
    ],
    tags: ["Python", "Pandas", "Data cleaning", "EDA", "Scikit-learn"],
    links: [
      { label: "Upwork profile", href: "https://www.upwork.com/freelancers/~019fb344bd6b875df4" },
      { label: "Fiverr profile", href: "https://www.fiverr.com/who_zaifa" },
    ],
  },
  {
    role: "DevOps Engineer Intern",
    org: "InoTech Solutions (Pvt) Ltd",
    type: "work",
    period: "Nov 2025 – Jan 2026",
    location: "On-site",
    points: [
      "Built and managed Docker containers for application deployment and testing.",
      "Configured multi-container environments with Docker Compose.",
      "Automated Docker image builds and deployment workflows with GitHub Actions (CI/CD).",
    ],
    tags: ["Docker", "Docker Compose", "GitHub Actions", "CI/CD", "Linux"],
  },
  {
    role: "BS Computer Science",
    org: "PMAS Arid Agriculture University",
    type: "education",
    period: "2021 – 2025",
    points: [
      "Final-year project: HateShield AI, a hate-speech detection system built on a custom XLNet + attention model, served through a Django / React application (Jun 2024 – Jul 2025).",
      "Coursework foundations in programming, databases, algorithms and machine learning.",
    ],
    tags: ["NLP", "PyTorch", "Transformers", "Django"],
  },
];
