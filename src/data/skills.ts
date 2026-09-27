/**
 * ─────────────────────────────────────────────────────────────
 *  SKILLS
 *  level: "strong" | "intermediate" | "developing"
 *  Move a skill between levels by changing its `level` value.
 *  A skill can appear in more than one category.
 * ─────────────────────────────────────────────────────────────
 */

export type SkillLevel = "strong" | "intermediate" | "developing";

export const skillLevels: Record<SkillLevel, { label: string; description: string; dots: number }> = {
  strong: {
    label: "Strong",
    description: "Use regularly and confidently in my own projects",
    dots: 3,
  },
  intermediate: {
    label: "Intermediate",
    description: "Have used in projects or coursework; productive with docs at hand",
    dots: 2,
  },
  developing: {
    label: "Developing",
    description: "Foundations in place; actively learning",
    dots: 1,
  },
};

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillCategory {
  title: string;
  blurb: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Data Science & Analytics",
    blurb: "Cleaning, exploring and summarising data.",
    skills: [
      { name: "Python", level: "strong" },
      { name: "Pandas", level: "strong" },
      { name: "NumPy", level: "strong" },
      { name: "SQL", level: "intermediate" },
      { name: "MySQL", level: "intermediate" },
      { name: "Excel", level: "intermediate" },
    ],
  },
  {
    title: "Machine Learning & AI",
    blurb: "Classical ML first; deep learning and LLMs in progress.",
    skills: [
      { name: "Scikit-learn", level: "intermediate" },
      { name: "Machine Learning", level: "intermediate" },
      { name: "TensorFlow", level: "developing" },
      { name: "PyTorch", level: "developing" },
      { name: "Deep Learning", level: "developing" },
      { name: "LLMs", level: "developing" },
      { name: "RAG", level: "developing" },
    ],
  },
  {
    title: "Visualization & BI",
    blurb: "Charts and dashboards that explain a result.",
    skills: [
      { name: "Matplotlib", level: "intermediate" },
      { name: "Seaborn", level: "intermediate" },
      { name: "Power BI", level: "developing" },
      { name: "Tableau", level: "developing" },
    ],
  },
  {
    title: "Engineering",
    blurb: "Version control and reproducible environments.",
    skills: [
      { name: "Git", level: "strong" },
      { name: "GitHub", level: "strong" },
      { name: "Docker", level: "strong" },
      { name: "Linux", level: "strong" },
    ],
  },
  {
    title: "Cloud & DevOps",
    blurb: "Fundamentals from my internship and projects.",
    skills: [
      { name: "CI/CD", level: "intermediate" },
      { name: "AWS", level: "intermediate" },
      { name: "Azure", level: "intermediate" },
      { name: "Google Cloud", level: "intermediate" },
      { name: "Kubernetes", level: "intermediate" },
    ],
  },
];

/**
 * Tools that appear in my repositories / CV. Shown as plain tags
 * (no level) under "Also used in projects".
 */
export const toolsUsedInProjects: string[] = [
  "Jupyter",
  "Streamlit",
  "Plotly",
  "SQLite",
  "PostgreSQL",
  "Django",
  "Docker Compose",
  "GitHub Actions",
  "Hugging Face Transformers (XLNet)",
  "Joblib",
];
