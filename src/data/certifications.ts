/**
 * ─────────────────────────────────────────────────────────────
 *  CERTIFICATIONS (from your public Credly profile)
 *
 *  To ADD a badge: open it on credly.com, copy the page URL
 *  (https://www.credly.com/badges/<id>) and the badge image URL,
 *  then copy one block below and edit it.
 *
 *  `visible: false` hides an entry without deleting it — used for
 *  certificates listed on your CV that have no public verification
 *  link yet. Add a `verifyUrl` and set `visible: true` to show them.
 * ─────────────────────────────────────────────────────────────
 */

export interface Certification {
  name: string;
  issuer: string;
  platform: string;
  issued: string; // YYYY-MM-DD
  verifyUrl: string;
  badgeImage?: string;
  skills: string[];
  visible: boolean;
}

export const credlyProfileUrl = "https://www.credly.com/users/muhammad-huzaifa-shafiq.b526cb5b/badges";

export const certifications: Certification[] = [
  {
    name: "Data Science Fundamentals Specialization (V3)",
    issuer: "IBM",
    platform: "Coursera · Credly",
    issued: "2026-07-27",
    verifyUrl: "https://www.credly.com/badges/b05b93a3-0dcd-48ce-9aa3-3cd5dc0c9ac7",
    badgeImage: "https://images.credly.com/images/a98ca48a-67ac-448e-b507-2de058846819/image.png",
    skills: ["Data Science", "Python", "SQL", "Statistical Analysis", "Data Visualization"],
    visible: true,
  },
  {
    name: "Data Analysis with Python",
    issuer: "IBM",
    platform: "Coursera · Credly",
    issued: "2026-07-28",
    verifyUrl: "https://www.credly.com/badges/45f08a0a-8918-4101-b4e5-e92d78acd5a9",
    badgeImage: "https://images.credly.com/images/950038fc-2519-4f79-8827-f71caf0f5095/image.png",
    skills: ["Pandas", "NumPy", "SciPy", "Scikit-learn"],
    visible: true,
  },
  {
    name: "Statistics for Data Science with Python",
    issuer: "IBM",
    platform: "Coursera · Credly",
    issued: "2026-07-27",
    verifyUrl: "https://www.credly.com/badges/e713e35e-d03b-4f35-9f02-0a5decd93527",
    badgeImage: "https://images.credly.com/images/f27d3b7c-e2b2-4816-9656-c10da20b7296/image.png",
    skills: ["Hypothesis Testing", "Probability", "Regression Analysis"],
    visible: true,
  },
  {
    name: "Databases and SQL for Data Science",
    issuer: "IBM",
    platform: "Coursera · Credly",
    issued: "2026-07-27",
    verifyUrl: "https://www.credly.com/badges/6f901079-e95a-4add-b924-7f859677fd7a",
    badgeImage: "https://images.credly.com/images/f2573aac-d21c-483d-acda-afaa366b4f51/image.png",
    skills: ["SQL", "Relational Databases", "Db2"],
    visible: true,
  },
  {
    name: "Python for Data Science and AI",
    issuer: "IBM",
    platform: "Coursera · Credly",
    issued: "2026-07-26",
    verifyUrl: "https://www.credly.com/badges/29cee2a4-ca6f-41c6-954b-6a76f885f3d0",
    badgeImage: "https://images.credly.com/images/40bee502-a5b3-4365-90e7-57eed5067594/image.png",
    skills: ["Python", "Matplotlib", "Bokeh"],
    visible: true,
  },
  {
    name: "Tools for Data Science V2",
    issuer: "IBM",
    platform: "Coursera · Credly",
    issued: "2026-07-26",
    verifyUrl: "https://www.credly.com/badges/484ec6ee-db32-4176-aacb-de34347b6bd7",
    badgeImage: "https://images.credly.com/images/1447954e-9923-4703-a647-eac80e5f0682/image.png",
    skills: ["Jupyter", "GitHub", "Open-source tools"],
    visible: true,
  },

  // Listed on your CV but not on Credly — add the Coursera certificate URL, then set visible: true.
  {
    name: "Python Data Structures",
    issuer: "University of Michigan",
    platform: "Coursera",
    issued: "",
    verifyUrl: "",
    skills: ["Python"],
    visible: false,
  },
  {
    name: "Programming for Everybody (Getting Started with Python)",
    issuer: "University of Michigan",
    platform: "Coursera",
    issued: "",
    verifyUrl: "",
    skills: ["Python"],
    visible: false,
  },
];

export const visibleCertifications = certifications.filter((c) => c.visible && c.verifyUrl);
