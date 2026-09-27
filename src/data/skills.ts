/**
 * ─────────────────────────────────────────────────────────────
 *  SKILLS
 *  Only list what appears in your CV, projects or repositories.
 *  core: true highlights a skill you use regularly in your own
 *  projects; everything else is shown as a normal badge.
 *  icon: "data" | "model" | "ai" | "chart" | "engineering" | "cloud"
 * ─────────────────────────────────────────────────────────────
 */

export type SkillIcon = "data" | "model" | "ai" | "chart" | "engineering" | "cloud";

export interface Skill {
  name: string;
  core?: boolean;
}

export interface SkillCategory {
  title: string;
  blurb: string;
  icon: SkillIcon;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Data Science",
    blurb: "Cleaning, exploring and summarising data.",
    icon: "data",
    skills: [
      { name: "Python", core: true },
      { name: "Pandas", core: true },
      { name: "NumPy", core: true },
      { name: "SQL", core: true },
      { name: "Data Cleaning", core: true },
      { name: "Exploratory Data Analysis", core: true },
      { name: "Statistical Analysis" },
      { name: "MySQL" },
      { name: "Excel" },
    ],
  },
  {
    title: "Machine Learning",
    blurb: "Classical ML with honest evaluation.",
    icon: "model",
    skills: [
      { name: "Scikit-learn", core: true },
      { name: "Feature Engineering", core: true },
      { name: "Model Evaluation", core: true },
      { name: "Classification" },
      { name: "Regression" },
      { name: "GridSearchCV" },
      { name: "SHAP" },
    ],
  },
  {
    title: "AI / NLP",
    blurb: "Deep learning and language models.",
    icon: "ai",
    skills: [
      { name: "PyTorch", core: true },
      { name: "Transformers (XLNet)", core: true },
      { name: "NLP", core: true },
      { name: "TensorFlow" },
      { name: "Deep Learning" },
      { name: "LLMs" },
      { name: "RAG" },
    ],
  },
  {
    title: "Visualization",
    blurb: "Charts and dashboards that explain a result.",
    icon: "chart",
    skills: [
      { name: "Matplotlib", core: true },
      { name: "Seaborn", core: true },
      { name: "Plotly" },
      { name: "Streamlit" },
      { name: "Tableau" },
      { name: "Power BI" },
    ],
  },
  {
    title: "Engineering / DevOps",
    blurb: "Reproducible, deployable work.",
    icon: "engineering",
    skills: [
      { name: "Git", core: true },
      { name: "GitHub", core: true },
      { name: "Docker", core: true },
      { name: "Linux", core: true },
      { name: "Docker Compose" },
      { name: "GitHub Actions (CI/CD)" },
      { name: "Django" },
      { name: "PostgreSQL" },
      { name: "SQLite" },
      { name: "Jupyter" },
    ],
  },
  {
    title: "Cloud",
    blurb: "Fundamentals from my internship and projects.",
    icon: "cloud",
    skills: [
      { name: "AWS" },
      { name: "Azure" },
      { name: "Google Cloud" },
      { name: "Kubernetes" },
      { name: "Terraform" },
    ],
  },
];
