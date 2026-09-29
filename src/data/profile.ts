/**
 * ─────────────────────────────────────────────────────────────
 *  PROFILE — your name, headline, bio and contact details.
 *  Edit the text between the quotes. Everything on the site
 *  that talks about "you" reads from this file.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Muhammad Huzaifa Shafiq",
  shortName: "Huzaifa Shafiq",
  initials: "HS",

  /** Short role, used in the footer and link previews. */
  role: "Data Scientist & AI/ML Engineer",
  /** Full headline shown under your name in the hero. Each item is separated visually. */
  headline: ["Data Scientist", "AI/ML Engineer"],
  /** Longer form, used in the footer and metadata. */
  headlineLong: ["Data Scientist", "AI/ML Engineer", "Python & Data Analytics"],

  location: "Islamabad, Pakistan",
  email: "huzaifashafiq2024@gmail.com",

  /** Small status line above your name. Set to "" to hide it. */
  availability: "Open to Data Science & ML roles and freelance projects",

  /** One or two sentences under the headline in the hero. */
  heroSummary:
    "I build data-driven solutions with Python, machine learning, and analytics—from clean data to deployable AI applications.",

  /** About section — each string is one paragraph. Keep it factual. */
  about: [
    "I'm a Data Scientist and AI/ML engineer working in Python across the full data workflow: cleaning and validating data, exploratory and statistical analysis, and building and evaluating machine-learning and NLP models.",
    "My work spans an XLNet-based hate-speech detection system, an explainable HR attrition analysis and interactive Streamlit dashboards. I measure results with metrics that fit the problem and state the limitations.",
    "Experience with Docker and GitHub Actions from a DevOps internship means the solutions I deliver are reproducible and ready to deploy, not just notebooks.",
  ],

  /** Short facts shown in the "At a glance" card in the About section. */
  facts: [
    { label: "Focus", value: "Data science · Machine learning · NLP" },
    { label: "Core stack", value: "Python · Pandas · Scikit-learn · SQL" },
    { label: "Education", value: "BS Computer Science, PMAS Arid Agriculture University (2021–2025)" },
    { label: "Experience", value: "DevOps Engineer Intern, InoTech Solutions" },
    { label: "Location", value: "Islamabad, Pakistan" },
  ],

  /** Your CV file lives in /public/resume/. Replace the PDF to update it. */
  cvPath: "/resume/Huzaifa_Shafiq_CV.pdf",

  /** Background-removed portrait in /public/images/ (square, transparent). */
  photo: {
    src: "/images/profile-headshot.webp",
    srcSmall: "/images/profile-headshot-360.webp",
    alt: "Portrait of Muhammad Huzaifa Shafiq in a grey suit, white shirt and navy tie, wearing glasses",
    width: 720,
    height: 720,
  },
};

export const education = {
  degree: "BS Computer Science",
  school: "PMAS Arid Agriculture University",
  period: "2021 – 2025",
  graduated: "2025",
  highlight: "Final-year project: HateShield AI — hate-speech detection with XLNet (Jun 2024 – Jul 2025)",
};
