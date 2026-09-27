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

  /** Main role shown under your name in the hero. */
  role: "Junior Data Scientist · AI & ML Engineer",
  /** Other roles you are open to (shown as small labels). */
  alsoOpenTo: ["Data Analyst", "Machine Learning", "Python Developer"],

  location: "Islamabad / Rawalpindi, Pakistan",
  email: "huzaifashafiq2024@gmail.com",

  /** Small status line above your name. Set to "" to hide it. */
  availability: "Open to junior Data Science, Data Analyst & ML roles and internships",

  /** One or two sentences under the headline in the hero. */
  heroSummary:
    "Computer Science graduate (2025) who turns raw data into clean datasets, clear analysis and working ML models — with Python, Pandas, Scikit-learn and SQL, and the Docker/CI habits to ship them.",

  /** About section — each string is one paragraph. Keep it factual. */
  about: [
    "I'm a Computer Science graduate from PMAS Arid Agriculture University, Rawalpindi, focused on data analysis and machine learning. Most of my work starts with messy data: checking quality, cleaning it, exploring it, and only then modelling it.",
    "My projects cover the full workflow — data cleaning, EDA, statistical comparisons, feature engineering, regression and classification models, Streamlit dashboards, SQL analysis — and, for my final-year project, an NLP deep-learning system built on XLNet.",
    "During a DevOps internship at InoTech Solutions I worked with Docker, Docker Compose and GitHub Actions, which is why I care about projects that run reproducibly, not just in a notebook.",
    "I also offer data cleaning, analysis and basic machine-learning work as a freelancer through Upwork and Fiverr. I enjoy problems where the answer is hidden in a spreadsheet nobody has had time to clean.",
  ],

  /** Short facts shown in the "At a glance" card in the About section. */
  facts: [
    { label: "Focus", value: "Data analysis · Machine learning · Python" },
    { label: "Education", value: "BS Computer Science, PMAS-AAUR (2021–2025)" },
    { label: "Experience", value: "DevOps Engineer Intern, InoTech Solutions" },
    { label: "Based in", value: "Islamabad / Rawalpindi, Pakistan" },
  ],

  /** Your CV file lives in /public/resume/. Replace the PDF to update it. */
  cvPath: "/resume/Huzaifa_Shafiq_CV.pdf",

  /** Background-removed photo in /public/images/. */
  photo: {
    src: "/images/profile-cutout.webp",
    alt: "Portrait of Muhammad Huzaifa Shafiq wearing a navy blazer and glasses",
    width: 799,
    height: 794,
  },
};

export const education = {
  degree: "BS Computer Science",
  school: "PMAS Arid Agriculture University, Rawalpindi",
  period: "2021 – 2025",
  graduated: "2025",
  cgpa: "2.53 / 4.00",
  highlight: "Final-year project: HateShield AI — hate-speech detection with XLNet (Jun 2024 – Jul 2025)",
};
