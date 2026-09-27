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
  headline: ["Data Scientist", "AI/ML Engineer", "Python & Data Analytics"],

  location: "Islamabad / Rawalpindi, Pakistan",
  email: "huzaifashafiq2024@gmail.com",

  /** Small status line above your name. Set to "" to hide it. */
  availability: "Open to Data Science & ML roles and freelance projects",

  /** One or two sentences under the headline in the hero. */
  heroSummary:
    "I turn raw, messy data into clean datasets, clear analysis and working machine-learning models, built in Python and packaged to run reproducibly with Docker and CI.",

  /** About section — each string is one paragraph. Keep it factual. */
  about: [
    "I'm a Data Scientist and AI/ML engineer with a BS in Computer Science from PMAS Arid Agriculture University, Rawalpindi. I work across the whole data workflow: validating and cleaning messy data, exploratory and statistical analysis, feature engineering, and building and evaluating machine-learning models in Python.",
    "My projects range from an end-to-end HR attrition analysis with explainable classifiers, to an NLP system built on a custom XLNet + attention model, to interactive Streamlit dashboards. I report results with the metrics that fit the problem, and I say where the limits are.",
    "A DevOps internship at InoTech Solutions gave me hands-on experience with Docker, Docker Compose and GitHub Actions, so the work I hand over is reproducible and deployable, not just a notebook.",
  ],

  /** Short facts shown in the "At a glance" card in the About section. */
  facts: [
    { label: "Focus", value: "Data analysis · Machine learning · NLP" },
    { label: "Core stack", value: "Python · Pandas · Scikit-learn · SQL" },
    { label: "Education", value: "BS Computer Science, PMAS-AAUR (2025)" },
    { label: "Experience", value: "DevOps Engineer Intern, InoTech Solutions" },
    { label: "Based in", value: "Islamabad / Rawalpindi, Pakistan" },
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
  school: "PMAS Arid Agriculture University, Rawalpindi",
  period: "2021 – 2025",
  graduated: "2025",
  highlight: "Final-year project: HateShield AI — hate-speech detection with XLNet (Jun 2024 – Jul 2025)",
};
