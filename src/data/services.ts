/**
 * ─────────────────────────────────────────────────────────────
 *  FREELANCE SERVICES
 *  Keep these to work you can show evidence for. `evidence`
 *  names the project(s) that demonstrate the skill; `projectSlug`
 *  links to that project's case study.
 *  icon: "clean" | "chart" | "sql" | "model" | "extract" | "automate"
 * ─────────────────────────────────────────────────────────────
 */

export type ServiceIcon = "clean" | "chart" | "sql" | "model" | "extract" | "automate";

export interface Service {
  title: string;
  description: string;
  deliverables: string[];
  icon: ServiceIcon;
  evidence?: { label: string; projectSlug: string };
}

export const services: Service[] = [
  {
    title: "Data cleaning & preprocessing",
    description: "Fix messy Excel/CSV files: types, dates, currency symbols, duplicates, missing values and inconsistent categories.",
    deliverables: ["Clean CSV / Excel file", "Reproducible Python notebook", "Short data-quality notes"],
    icon: "clean",
    evidence: { label: "Employee Attrition — data-quality audit", projectSlug: "employee-attrition-analytics" },
  },
  {
    title: "Exploratory data analysis",
    description: "Understand a dataset quickly: distributions, group comparisons, correlations and plain-language findings.",
    deliverables: ["Jupyter notebook", "Charts (Matplotlib / Seaborn)", "Summary of findings"],
    icon: "chart",
    evidence: { label: "Student Performance Analysis", projectSlug: "student-performance-analysis" },
  },
  {
    title: "Data visualisation & dashboards",
    description: "Clear charts and simple interactive dashboards that explain a result to non-technical readers.",
    deliverables: ["Static charts", "Streamlit / Plotly dashboard", "Tableau-ready summary tables"],
    icon: "chart",
    evidence: { label: "House Price Prediction Dashboard", projectSlug: "house-price-prediction" },
  },
  {
    title: "SQL & data transformation",
    description: "Queries, aggregations and reshaping so data is ready for reporting or modelling.",
    deliverables: ["SQL queries (SQLite / MySQL / PostgreSQL)", "Transformed tables", "Pandas pipelines"],
    icon: "sql",
    evidence: { label: "Employee Attrition — SQL analysis", projectSlug: "employee-attrition-analytics" },
  },
  {
    title: "Basic machine-learning models",
    description: "Baseline regression and classification models with honest evaluation — the right metrics, not just accuracy.",
    deliverables: ["Trained Scikit-learn model", "Evaluation report", "Feature-importance summary"],
    icon: "model",
    evidence: { label: "Employee Attrition & House Price projects", projectSlug: "employee-attrition-analytics" },
  },
  {
    title: "Data extraction & automation",
    description: "Python scripts that pull text and tables out of files (CSV, Excel, PDF, DOCX) or web pages into clean, structured data.",
    deliverables: ["Python script", "Structured CSV / Excel output", "Instructions to re-run"],
    icon: "extract",
    evidence: { label: "HateShield AI — PDF/DOCX text extraction", projectSlug: "hateshield-ai" },
  },
];
