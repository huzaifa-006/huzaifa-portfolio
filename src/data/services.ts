/**
 * ─────────────────────────────────────────────────────────────
 *  "WHAT I CAN HELP WITH" — freelance / client services.
 *  Keep these to work you can actually deliver. `evidence` links
 *  a service to a project case study that shows similar work.
 *  icon: "clean" | "chart" | "model" | "extract" | "ai" | "dashboard"
 * ─────────────────────────────────────────────────────────────
 */

export type ServiceIcon = "clean" | "chart" | "model" | "extract" | "ai" | "dashboard";

export interface Service {
  title: string;
  description: string;
  deliverables: string[];
  icon: ServiceIcon;
  evidence?: { label: string; projectSlug: string };
  /** Shown as a larger, highlighted card. */
  highlight?: boolean;
  /** Tools used — only list ones already in your skills/projects. */
  tools?: string[];
}

export const services: Service[] = [
  {
    title: "Web Scraping & Data Collection",
    description: "Collect structured data from public websites and deliver clean, organized CSV, Excel, or database-ready datasets.",
    deliverables: ["Reusable Python script", "Clean CSV / Excel output", "Database-ready tables (SQL)"],
    icon: "extract",
    highlight: true,
    tools: ["Python", "Pandas", "SQL", "Excel"],
  },
  {
    title: "Data Cleaning & Preprocessing",
    description: "Clean, standardize, validate and prepare datasets.",
    deliverables: ["Clean CSV / Excel file", "Reproducible Python notebook", "Data-quality notes"],
    icon: "clean",
    evidence: { label: "Employee Attrition", projectSlug: "employee-attrition-analytics" },
  },
  {
    title: "Data Analysis & EDA",
    description: "Explore datasets, identify patterns and generate clear insights.",
    deliverables: ["Analysis notebook", "Charts & summary tables", "Plain-language findings"],
    icon: "chart",
    evidence: { label: "Student Performance", projectSlug: "student-performance-analysis" },
  },
  {
    title: "Machine Learning",
    description: "Build and evaluate classification, regression and predictive models.",
    deliverables: ["Trained Scikit-learn model", "Evaluation report", "Feature-importance summary"],
    icon: "model",
    evidence: { label: "House Price Prediction", projectSlug: "house-price-prediction" },
  },
  {
    title: "AI / ML Applications",
    description: "Build practical AI/ML applications involving NLP and machine learning.",
    deliverables: ["Model + inference code", "API or Streamlit app", "Docker setup"],
    icon: "ai",
    evidence: { label: "HateShield AI", projectSlug: "hateshield-ai" },
  },
  {
    title: "Dashboards & Visualization",
    description: "Build interactive dashboards and clear visualizations.",
    deliverables: ["Streamlit / Plotly dashboard", "Static report charts", "Tableau-ready tables"],
    icon: "dashboard",
    evidence: { label: "House Price Dashboard", projectSlug: "house-price-prediction" },
  },
];
