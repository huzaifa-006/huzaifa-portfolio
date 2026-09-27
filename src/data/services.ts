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
}

export const services: Service[] = [
  {
    title: "Data Cleaning & Preprocessing",
    description: "Clean, standardize, validate and prepare datasets for analysis and machine learning.",
    deliverables: ["Clean CSV / Excel file", "Reproducible Python notebook", "Data-quality notes"],
    icon: "clean",
    evidence: { label: "Employee Attrition", projectSlug: "employee-attrition-analytics" },
  },
  {
    title: "Data Analysis & EDA",
    description: "Explore datasets, find patterns and turn them into clear insights with statistics and visualization.",
    deliverables: ["Analysis notebook", "Charts & summary tables", "Plain-language findings"],
    icon: "chart",
    evidence: { label: "Student Performance", projectSlug: "student-performance-analysis" },
  },
  {
    title: "Machine Learning",
    description: "Build and evaluate classification, regression and predictive models, measured with the right metrics.",
    deliverables: ["Trained Scikit-learn model", "Evaluation report", "Feature-importance summary"],
    icon: "model",
    evidence: { label: "House Price Prediction", projectSlug: "house-price-prediction" },
  },
  {
    title: "Web Scraping & Data Collection",
    description: "Collect structured data from public websites and deliver it as clean CSV, Excel or other structured files.",
    deliverables: ["Python scraper script", "Structured CSV / Excel output", "Instructions to re-run"],
    icon: "extract",
  },
  {
    title: "AI / ML Applications",
    description: "Practical AI/ML applications with NLP and machine learning, wrapped in an interface people can use.",
    deliverables: ["Model + inference code", "API or Streamlit app", "Docker setup"],
    icon: "ai",
    evidence: { label: "HateShield AI", projectSlug: "hateshield-ai" },
  },
  {
    title: "Dashboards & Visualization",
    description: "Interactive dashboards and clear charts that explain results to non-technical stakeholders.",
    deliverables: ["Streamlit / Plotly dashboard", "Static report charts", "Tableau-ready tables"],
    icon: "dashboard",
    evidence: { label: "House Price Dashboard", projectSlug: "house-price-prediction" },
  },
];
