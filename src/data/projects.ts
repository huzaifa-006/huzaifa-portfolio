/**
 * ─────────────────────────────────────────────────────────────
 *  PROJECTS
 *
 *  To ADD a project: copy one whole `{ ... }` block below, paste it
 *  into the list, and change the values. `slug` becomes the URL:
 *  slug "my-project" → /projects/my-project/
 *
 *  - featured: true  → one of the large "Featured Projects" cards (keep 3)
 *  - featured: false → shown in the "More projects" grid
 *  - pipeline        → steps for the conceptual workflow visual on the card
 *                      (describe what the project really does)
 *  - keyResults      → up to 3 numbers for the card; copy them only from
 *                      caseStudy.results (i.e. from the repository)
 *  - caseStudy       → optional; if present a detailed page is built
 *  - image.src       → put the image in /public/projects/
 *  - image.kind      → "concept" (illustration / interface concept),
 *                      "data" (chart drawn from real project data),
 *                      "screenshot" (a real screenshot you took)
 *
 *  Only write results that exist in the repository. Everything
 *  below was checked against the GitHub repos in September 2026.
 * ─────────────────────────────────────────────────────────────
 */

export type ImageKind = "concept" | "data" | "screenshot";

export interface ProjectResult {
  label: string;
  value: string;
  note?: string;
}

export interface CaseStudy {
  overview: string[];
  /** Optional step-by-step architecture/workflow shown as a vertical diagram (conceptual). */
  flow?: { title: string; steps: { label: string; detail: string }[] };
  problem: string[];
  approach: string[];
  stack: { group: string; items: string[] }[];
  architecture: string[];
  implementation: string[];
  results: ProjectResult[];
  resultsNote?: string;
  challenges: string[];
  future: string[];
}

export type PipelineIcon =
  | "data" | "clean" | "explore" | "features" | "model" | "output"
  | "text" | "token" | "brain" | "server" | "db" | "container" | "chart" | "app";

export interface Pipeline {
  steps: { label: string; detail?: string; icon: PipelineIcon }[];
  output: string[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  period?: string;
  featured: boolean;
  /** Flagship projects get extra visual emphasis. */
  flagship?: boolean;
  image: { src: string; alt: string; kind: ImageKind; caption: string };
  tech: string[];
  problem: string;
  solution: string;
  highlights: string[];
  links: { github: string; live?: string; liveLabel?: string; docs?: string };
  pipeline: Pipeline;
  keyResults?: { value: string; label: string }[];
  /** Short caveat shown next to keyResults (e.g. "synthetic data"). */
  resultsCaveat?: string;
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  // ───────────────────────────────────────── HateShield AI
  {
    slug: "hateshield-ai",
    flagship: true,
    title: "HateShield AI",
    tagline:
      "Final-year project: a full-stack system that classifies English text as hate / not hate using a custom XLNet model with an attention layer.",
    category: "NLP · Deep Learning · Full-stack",
    period: "Jun 2024 – Jul 2025",
    featured: true,
    image: {
      src: "/projects/hateshield-ai.svg",
      alt: "Pipeline diagram from input text through preprocessing, XLNet tokenizer, encoder, attention and classifier, plus application architecture",
      kind: "concept",
      caption: "System overview — conceptual diagram, not a screenshot",
    },
    tech: ["Python", "PyTorch", "Transformers (XLNet)", "Django", "React.js", "PostgreSQL", "Docker"],
    problem:
      "Manual moderation of hateful content does not scale. Moderators need automated classification with a confidence score and some insight into why a decision was made.",
    solution:
      "An XLNet encoder with an attention-pooling layer and a sigmoid classifier, served from a Django backend to a React frontend with file upload, confidence scores, influential-token highlighting and user feedback.",
    highlights: [
      "Custom XLNet + attention classifier in PyTorch (xlnet-base-cased)",
      "Text preprocessing: removes URLs, @mentions and special characters",
      "Analyse typed text or uploaded .txt, .pdf and .docx files",
      "Returns label, confidence and the most influential tokens",
    ],
    links: { github: "https://github.com/huzaifa-006/HateShield-AI" },
    pipeline: {
      steps: [
        { label: "Input", detail: "Text or file", icon: "text" },
        { label: "Preprocess", detail: "Clean · tokenize", icon: "clean" },
        { label: "XLNet", detail: "Encoder", icon: "brain" },
        { label: "Attention", detail: "Token weights", icon: "token" },
        { label: "Classify", detail: "Sigmoid head", icon: "model" },
      ],
      output: ["HATE / NOT HATE", "Confidence", "Influential tokens"],
    },
    caseStudy: {
      flow: {
        title: "Model architecture",
        steps: [
          { label: "User input", detail: "Typed text, or an uploaded .txt / .pdf / .docx file" },
          { label: "Text preprocessing", detail: "Remove URLs, @mentions and special characters; SentencePiece tokenization" },
          { label: "XLNet encoder", detail: "xlnet-base-cased produces a representation for every token" },
          { label: "Attention layer", detail: "A small feed-forward network scores each token; softmax weights pool them into one context vector" },
          { label: "Classification", detail: "Linear layer + sigmoid: HATE / NOT HATE" },
          { label: "Confidence & influential tokens", detail: "Probability score plus the highest-attention tokens, so a moderator can see why" },
        ],
      },
      overview: [
        "HateShield AI was my final-year BS Computer Science project (Jun 2024 – Jul 2025). It detects and classifies hate speech in English text using a deep-learning model and exposes it through a full-stack web application.",
      ],
      problem: [
        "Online platforms receive far more text than people can review. A useful tool should classify content automatically, report how confident it is, and show which words influenced the decision so a human can check it.",
      ],
      approach: [
        "Clean and normalise the text (remove URLs, mentions and special characters).",
        "Tokenise with the XLNet SentencePiece tokenizer and encode with xlnet-base-cased.",
        "Use a learned attention layer to weight token representations into a single context vector.",
        "Classify with a linear layer + sigmoid into HATE / NOT HATE with a confidence score.",
        "Surface the highest-attention tokens so users can see what drove the prediction.",
      ],
      stack: [
        { group: "Model", items: ["PyTorch", "Hugging Face Transformers", "XLNet", "SentencePiece"] },
        { group: "Backend", items: ["Django", "PostgreSQL (psycopg2)", "python-docx / PDF parsing"] },
        { group: "Frontend", items: ["React.js"] },
        { group: "Ops", items: ["Docker (backend & ML service Dockerfiles)"] },
      ],
      architecture: [
        "React frontend — authentication, detection page, dashboard, star-rating feedback.",
        "Django backend — user, home and detection apps; detection endpoint accepts text or .txt/.pdf/.docx uploads.",
        "Model module — XLNet encoder + attention classifier loaded from saved weights; tokenizer files live in static/models/.",
        "PostgreSQL — application data (users, results, feedback).",
      ],
      implementation: [
        "Attention layer: a small feed-forward network scores each token; softmax weights produce the pooled context vector.",
        "Detection API returns original text, preprocessed text, tokens, prediction, confidence and top influential tokens.",
        "Dockerfiles are provided for the backend and for a separate ML service.",
      ],
      results: [],
      resultsNote:
        "Evaluation metrics (accuracy, F1, etc.) are not published in the repository, so none are shown here. The trained weights file is also not in the repo because of its size.",
      challenges: [
        "Serving a large transformer model inside a web app — the model weights are too large for the Git repository and must be supplied separately.",
        "Making predictions explainable enough for a moderator to trust them, which is why the attention weights are surfaced as influential tokens.",
      ],
      future: [
        "Publish a model card with the dataset, train/test split and evaluation metrics.",
        "Replace the placeholder Flask ML service with the real model and add a Docker Compose file for all services.",
        "Host the weights on the Hugging Face Hub and deploy a public demo.",
      ],
    },
  },

  // ───────────────────────────────────────── Employee Attrition
  {
    slug: "employee-attrition-analytics",
    flagship: true,
    title: "Employee Attrition Analytics",
    tagline:
      "End-to-end HR analytics project: data-quality checks, statistics, SQL and classification models to explain and predict employee turnover.",
    category: "Data Analytics · Machine Learning",
    featured: true,
    image: {
      src: "/projects/employee-attrition.svg",
      alt: "Dashboard-style visual showing 1,000 employees, 11.8% attrition, attrition by department and overtime, and top feature importances",
      kind: "data",
      caption: "Project visualization — charts drawn from the repository's processed CSVs (synthetic dataset)",
    },
    tech: ["Python", "Pandas", "NumPy", "Seaborn", "Scikit-learn", "SQLite", "Streamlit", "Tableau-ready exports"],
    problem:
      "High turnover is costly. HR teams need to know which factors are associated with employees leaving and which employees may be at risk.",
    solution:
      "A 17-notebook workflow from data generation and cleaning through EDA, statistical comparisons, feature engineering, tuned classifiers, explainability and SQL analysis — plus a Streamlit app that loads the saved model.",
    highlights: [
      "Data-quality audit and cleaning of a deliberately messy copy of the data",
      "Logistic Regression, Decision Tree and Random Forest compared against a majority-class baseline",
      "Feature, permutation and SHAP importance to explain the model",
      "SQLite queries for department, job-role, overtime and remote-work attrition",
    ],
    links: { github: "https://github.com/huzaifa-006/employee-attrition-analytics" },
    pipeline: {
      steps: [
        { label: "Data", detail: "1,000 HR records", icon: "data" },
        { label: "Clean", detail: "Quality audit", icon: "clean" },
        { label: "Explore", detail: "EDA · statistics", icon: "explore" },
        { label: "Features", detail: "Engineered ratios", icon: "features" },
        { label: "Model", detail: "RF · LogReg", icon: "model" },
      ],
      output: ["Attrition risk", "SHAP drivers", "SQL insights"],
    },
    keyResults: [
      { value: "0.71", label: "F1 · tuned RF" },
      { value: "0.98", label: "ROC-AUC · tuned RF" },
      { value: "11.8%", label: "Attrition rate" },
    ],
    resultsCaveat: "Synthetic, rule-based dataset",
    caseStudy: {
      flow: {
        title: "End-to-end workflow",
        steps: [
          { label: "Data quality", detail: "Audit a deliberately messy copy of the synthetic dataset for quality issues" },
          { label: "Cleaning", detail: "Fix and standardise the issues found; save a clean dataset" },
          { label: "EDA", detail: "Attrition by department, role, overtime, satisfaction, salary and promotion history; statistical comparisons" },
          { label: "Feature engineering", detail: "Engineered features such as salary per experience, satisfaction categories and a workload score" },
          { label: "Classification", detail: "Logistic Regression, Decision Tree and Random Forest vs. a majority-class baseline; tuned with GridSearchCV" },
          { label: "Explainability", detail: "Feature, permutation and SHAP importance" },
          { label: "Dashboard & reporting", detail: "Streamlit app on the saved model, SQL analysis and Tableau-ready exports" },
        ],
      },
      overview: [
        "An end-to-end HR analytics project that measures attrition, identifies factors associated with turnover, and trains classification models to estimate attrition risk.",
        "The project is organised as 17 numbered notebooks (dataset creation → data quality → cleaning → EDA → statistics → feature engineering → ML → tuning → explainability → persistence → Streamlit → business analytics → visualisation → Tableau prep → SQL → insights → final report), with outputs saved as CSVs and a persisted model.",
      ],
      problem: [
        "Employee turnover raises recruitment costs and disrupts teams. The questions: what is the attrition rate, which departments, roles and working conditions are associated with leaving, and can a model flag at-risk employees?",
        "Important context: the dataset is synthetic. Notebook 01 generates 1,000 employee records with Faker and rule-based relationships (e.g. salary depends on experience, satisfaction influences attrition). This lets me practise the full workflow, but results describe the generator's rules, not a real company.",
      ],
      approach: [
        "Created the dataset and a separate 'dirty' version with quality issues to practise cleaning.",
        "Audited and cleaned the data, then explored distributions and attrition patterns by department, role, overtime, satisfaction, salary and promotion history.",
        "Ran statistical comparisons and interpreted them as associations, not causation.",
        "Engineered features (e.g. salary per experience, satisfaction categories, workload score) and framed attrition as binary classification with a stratified 80/20 split.",
        "Compared models against a majority-class baseline, tuned a Random Forest with GridSearchCV, and explained it with feature, permutation and SHAP importance.",
        "Queried the data with SQL (SQLite) and exported Tableau-ready summary tables.",
      ],
      stack: [
        { group: "Data", items: ["Python", "Pandas", "NumPy", "Faker"] },
        { group: "Analysis & ML", items: ["Scikit-learn", "GridSearchCV", "SHAP", "Joblib"] },
        { group: "Visualisation", items: ["Matplotlib", "Seaborn", "Tableau (prepared exports)"] },
        { group: "Other", items: ["SQLite / SQL", "Streamlit", "Jupyter"] },
      ],
      architecture: [
        "data/raw → employee_hr_analytics.csv (1,000 rows) and employee_hr_analytics_dirty.csv",
        "data/processed → cleaned data, feature tables, model comparison, importance tables, SQL and Tableau exports",
        "models/ → saved Random Forest, feature list and model metadata (JSON)",
        "app.py → Streamlit app that loads the saved model",
      ],
      implementation: [
        "Stratified train/test split (test_size = 0.20, random_state = 42).",
        "Tuned Random Forest: 200 trees, max_depth 8 (from the saved metadata).",
        "SQL queries for attrition by department, job role, overtime and remote work, saved as CSV outputs.",
      ],
      results: [
        { label: "Attrition rate", value: "11.8%", note: "118 of 1,000 employees" },
        { label: "Overtime vs. none", value: "24.1% vs 0%", note: "attrition rate, by overtime" },
        { label: "Tuned Random Forest", value: "F1 0.71 · ROC-AUC 0.98", note: "precision 0.76, recall 0.67, accuracy 0.935" },
        { label: "Logistic Regression", value: "F1 0.875", note: "accuracy 0.97 in the model comparison" },
        { label: "Majority baseline", value: "Accuracy 0.88", note: "why accuracy alone is misleading here" },
        { label: "Top feature", value: "Job satisfaction", note: "highest importance in the final model" },
      ],
      resultsNote:
        "All numbers come from files in the repository (hr_dashboard_kpis.csv, model_comparison.csv, employee_attrition_model_metadata.json). Because the data is synthetic and rule-based, they are not evidence of real-world predictive performance.",
      challenges: [
        "Class imbalance: only 11.8% of employees left, so a model that always predicts 'stays' already scores 88% accuracy. I compared models on precision, recall, F1 and ROC-AUC instead.",
        "Synthetic data: some patterns (e.g. 0% attrition without overtime) are artefacts of the generation rules, which I kept in mind when writing business recommendations.",
      ],
      future: [
        "Validate the workflow on a real, public HR dataset (e.g. the IBM HR Analytics dataset).",
        "Tune the decision threshold for higher recall on at-risk employees and check probability calibration.",
        "Publish the Tableau dashboard on Tableau Public and deploy the Streamlit app.",
      ],
    },
  },

  // ───────────────────────────────────────── House Price Prediction
  {
    slug: "house-price-prediction",
    title: "House Price Prediction Dashboard",
    tagline:
      "A Linear Regression model trained on 545 properties, wrapped in an interactive Streamlit dashboard with Plotly charts, prediction history and CSV export.",
    category: "Machine Learning · Dashboard",
    featured: true,
    image: {
      src: "/projects/house-price-prediction.svg",
      alt: "Dashboard concept with property input form, model metrics R² 0.653 and RMSE 1.32 million, and the dataset's price histogram",
      kind: "data",
      caption: "Interface concept — metrics and histogram from the repository data",
    },
    tech: ["Python", "Pandas", "Scikit-learn", "Streamlit", "Plotly", "Joblib"],
    problem:
      "Estimating a property's price from its features (area, rooms, amenities, furnishing) in a way a non-technical user can try interactively.",
    solution:
      "Cleaned and explored the housing dataset, one-hot encoded furnishing status, scaled features with StandardScaler and trained Linear Regression; then built a Streamlit app around the saved model.",
    highlights: [
      "Full ML workflow in one notebook: cleaning → EDA → features → training → evaluation",
      "Streamlit dashboard with gauge, comparison, distribution and feature charts",
      "Prediction history with CSV download",
      "Area input in square feet, marla or kanal",
    ],
    links: { github: "https://github.com/huzaifa-006/House-Price-Prediction-" },
    pipeline: {
      steps: [
        { label: "Data", detail: "545 properties", icon: "data" },
        { label: "EDA", detail: "Cleaning · correlations", icon: "explore" },
        { label: "Encode", detail: "One-hot · scaling", icon: "features" },
        { label: "Model", detail: "Linear Regression", icon: "model" },
        { label: "App", detail: "Streamlit · Plotly", icon: "app" },
      ],
      output: ["Price estimate", "Comparison charts", "CSV history"],
    },
    keyResults: [
      { value: "0.653", label: "R² · test set" },
      { value: "545", label: "Properties" },
      { value: "12", label: "Input features" },
    ],
    caseStudy: {
      overview: [
        "A complete, small-scale machine-learning project: from a raw CSV of 545 houses to an interactive dashboard where a user enters property details and receives a price estimate with supporting charts.",
      ],
      problem: [
        "Price depends on many property features at once. The goal was a transparent baseline model and an interface that makes it easy to explore how inputs relate to the prediction.",
      ],
      approach: [
        "Checked data types, missing values and distributions; explored correlations with a heatmap.",
        "Encoded yes/no amenities and one-hot encoded furnishing status.",
        "Split data 80/20 (random_state = 42), scaled with StandardScaler and trained Linear Regression.",
        "Evaluated with R² and RMSE and saved the model and scaler with Joblib.",
      ],
      stack: [
        { group: "Data & ML", items: ["Pandas", "NumPy", "Scikit-learn", "Joblib"] },
        { group: "App", items: ["Streamlit", "Plotly", "custom CSS"] },
      ],
      architecture: [
        "notebooks/house_price_prediction.ipynb — analysis and training",
        "models/ — saved regression model, scaler and metrics CSV",
        "utils/ — prediction, chart, price-formatting and area-conversion helpers",
        "app.py — Streamlit dashboard",
      ],
      implementation: [
        "Dataset features: area, bedrooms, bathrooms, stories, parking, main road, guest room, basement, hot-water heating, air conditioning, preferred area, furnishing status.",
        "Dashboard: gauge chart, prediction vs. average, price distribution, feature charts, prediction summary and history export.",
      ],
      results: [
        { label: "R² (test set)", value: "0.653", note: "Linear Regression" },
        { label: "RMSE", value: "≈ 1,324,507", note: "in the dataset's price units" },
        { label: "Dataset", value: "545 rows", note: "12 input features" },
      ],
      resultsNote: "Values from models/linear_regression_metrics.csv and the README.",
      challenges: [
        "A linear model explains about 65% of the variance on the test set — a reasonable baseline, but prices clearly have non-linear effects it cannot capture.",
        "With only 545 rows, the test set is small, so metrics can shift noticeably with a different split.",
      ],
      future: [
        "Compare tree-based models (Random Forest, XGBoost) with cross-validation.",
        "Add feature importance / SHAP to the dashboard.",
        "Deploy the dashboard publicly (e.g. Streamlit Community Cloud) and add Docker support.",
      ],
    },
  },

  // ───────────────────────────────────────── Prescripto
  {
    slug: "prescripto",
    title: "Prescripto",
    tagline:
      "A Django web app that lets doctors register patients and create, store and print digital prescriptions — containerised with Docker, with AWS infrastructure as code in progress.",
    category: "Web App · DevOps",
    featured: false,
    image: {
      src: "/projects/prescripto.svg",
      alt: "Interface concept of a prescription slip with patient ID, medicines and dosage timing, next to a list of features and deployment setup",
      kind: "concept",
      caption: "Interface concept — not a screenshot of the live app",
    },
    tech: ["Python", "Django 4.2", "SQLite / PostgreSQL", "Docker", "Docker Compose", "Terraform (AWS)"],
    problem:
      "Handwritten prescriptions are hard to read, easy to lose and slow to repeat for returning patients.",
    solution:
      "A prescription management system with patient records, a pre-loaded medicine and lab-test catalogue, dosage timing and print-friendly slips.",
    highlights: [
      "Patients get unique IDs (PT-XXXXX) with duplicate-patient detection",
      "Search patients by name, ID or phone number",
      "52+ medicines and 33+ lab tests pre-loaded; dosage by morning/afternoon/evening/night",
      "Dockerfile + Docker Compose (Django/Gunicorn + PostgreSQL)",
    ],
    links: {
      github: "https://github.com/huzaifa-006/Prescripto",
      live: "https://huzaifa05.pythonanywhere.com",
      liveLabel: "Live demo",
    },
    pipeline: {
      steps: [
        { label: "Input", detail: "Patient & Rx forms", icon: "app" },
        { label: "Django", detail: "Views · forms", icon: "server" },
        { label: "Database", detail: "SQLite / Postgres", icon: "db" },
        { label: "Docker", detail: "Compose · Gunicorn", icon: "container" },
        { label: "Print", detail: "Rx slip", icon: "output" },
      ],
      output: ["Patient IDs", "Digital prescriptions", "Print view"],
    },
    keyResults: [
      { value: "52+", label: "Medicines seeded" },
      { value: "33+", label: "Lab tests seeded" },
    ],
    caseStudy: {
      overview: [
        "Prescripto is a Django web application for doctors to generate digital prescription slips. It also became my playground for deployment practice: Docker, Docker Compose and Terraform for AWS.",
      ],
      problem: [
        "Small clinics often write prescriptions by hand. That makes them hard to read, hard to search and repetitive for returning patients.",
      ],
      approach: [
        "Model the core entities: patients, medicines, lab tests, prescription templates and prescriptions.",
        "Build server-rendered pages for each workflow (patient search, prescription form, print view).",
        "Seed the database with common medicines and lab tests through a custom management command.",
        "Containerise the app and describe cloud infrastructure as code.",
      ],
      stack: [
        { group: "Application", items: ["Django 4.2", "Python", "HTML/CSS/JS", "WhiteNoise"] },
        { group: "Data", items: ["SQLite (demo)", "PostgreSQL (Docker Compose)"] },
        { group: "DevOps", items: ["Docker", "Docker Compose", "Gunicorn", "Terraform (AWS VPC, subnet, security group, EC2)"] },
      ],
      architecture: [
        "clinic app — models, views, forms, URL routing and a seed_data management command.",
        "templates/clinic — dashboard, patients, medicines, templates, prescription form, detail and print views.",
        "docker-compose.yml — web service (migrate, collectstatic, Gunicorn) + postgres:16 with a persistent volume.",
        "terraform/ — provider, network, security group and EC2 instance definitions.",
      ],
      implementation: [
        "Unique patient IDs in the format PT-XXXXX and duplicate detection for returning patients.",
        "Dosage timing per medicine (morning, afternoon, evening, night) and print-friendly slips.",
        "Environment variables loaded from an .env file in Docker Compose.",
      ],
      results: [
        { label: "Medicines pre-loaded", value: "52+" },
        { label: "Lab tests pre-loaded", value: "33+" },
        { label: "Live demo", value: "Online", note: "hosted on a free tier" },
      ],
      resultsNote: "Figures from the project README.",
      challenges: [
        "Keeping one codebase that runs both on a simple free host (SQLite) and in containers with PostgreSQL.",
        "Designing cloud infrastructure step by step: the Terraform network, security and compute files are written; CI/CD workflows and Kubernetes manifests are still placeholders.",
      ],
      future: [
        "Complete the GitHub Actions CI/CD workflows (tests, image build, deploy).",
        "Finish the Kubernetes manifests and deploy the containerised app to AWS.",
        "Add automated tests and PDF export of prescriptions.",
      ],
    },
  },

  // ───────────────────────────────────────── Student Performance
  {
    slug: "student-performance-analysis",
    title: "Student Performance Analysis",
    tagline:
      "Exploratory data analysis of 6,607 student records to see how study hours, attendance and other factors relate to exam scores.",
    category: "Exploratory Data Analysis",
    featured: false,
    image: {
      src: "/projects/student-performance.svg",
      alt: "Charts showing correlation of attendance (+0.58) and hours studied (+0.45) with exam score, and the exam score distribution",
      kind: "data",
      caption: "Charts computed from the repository dataset",
    },
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter"],
    problem: "Which study habits and circumstances are most associated with better exam results?",
    solution:
      "Cleaned the Student Performance Factors dataset and explored distributions, group comparisons and correlations with clear visualisations.",
    highlights: [
      "Attendance (r = 0.58) and hours studied (r = 0.45) show the strongest positive correlation with exam score",
      "Most exam scores fall between 60 and 75",
      "Male and female students have similar average scores",
      "Correlation heatmap and distribution plots",
    ],
    links: { github: "https://github.com/huzaifa-006/Student-Performance-Analysis" },
    pipeline: {
      steps: [
        { label: "Data", detail: "6,607 records", icon: "data" },
        { label: "Clean", detail: "Types · missing", icon: "clean" },
        { label: "EDA", detail: "Distributions", icon: "explore" },
        { label: "Correlate", detail: "Heatmap", icon: "chart" },
        { label: "Insights", detail: "Summary report", icon: "output" },
      ],
      output: ["Attendance ↔ score", "Study hours ↔ score"],
    },
    keyResults: [
      { value: "0.58", label: "r · attendance ↔ score" },
      { value: "0.45", label: "r · hours ↔ score" },
    ],
    caseStudy: {
      overview: [
        "A focused EDA project on the Student Performance Factors dataset (6,607 rows, 20 columns) exploring what relates to exam performance.",
      ],
      problem: [
        "Students, parents and schools want to know which factors are linked to better results, so effort can go where it matters.",
      ],
      approach: [
        "Loaded and inspected the data; checked types, missing values and outliers.",
        "Plotted the exam-score distribution and gender distribution.",
        "Compared exam score against study hours and attendance.",
        "Computed a correlation matrix and summarised findings in a short report.",
      ],
      stack: [{ group: "Tools", items: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter Notebook"] }],
      architecture: [
        "data/ — original and cleaned CSV",
        "notebooks/analysis.ipynb — the analysis",
        "images/ — exported charts",
        "reports/project_summary.md — findings",
      ],
      implementation: [
        "Correlation of numeric features with Exam_Score, computed with Pandas.",
        "Visualisations: score distribution, gender distribution, study hours vs. score, attendance vs. score, correlation heatmap.",
      ],
      results: [
        { label: "Attendance ↔ score", value: "r = 0.58" },
        { label: "Hours studied ↔ score", value: "r = 0.45" },
        { label: "Scores between 60–75", value: "≈ 98%", note: "of 6,607 students" },
      ],
      resultsNote: "Computed from the dataset in the repository. Correlation does not imply causation.",
      challenges: [
        "Three categorical columns have missing values (Teacher_Quality, Parental_Education_Level, Distance_from_Home), and one exam score is 101 — above the expected maximum of 100.",
      ],
      future: [
        "Handle the missing categories and the out-of-range score explicitly and document the decision.",
        "Add a simple regression model to quantify the effect of each factor.",
      ],
    },
  },

  // ───────────────────────────────────────── Sales (compact card)
  {
    slug: "sales-data-analysis",
    title: "Sales Data Analysis with Python",
    tagline:
      "Practice project: cleaning a raw sales sheet (dates, currency symbols, types), engineering date features and analysing revenue by product, city, salesperson and weekday.",
    category: "Data Cleaning · EDA",
    featured: false,
    image: {
      src: "/projects/sales-data-analysis.svg",
      alt: "Six-step workflow: load CSV, fix types, clean currency, feature engineering, group and rank, visualise",
      kind: "concept",
      caption: "Workflow visualization",
    },
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Jupyter"],
    problem: "Turn a small, messy sales export into answers to basic business questions.",
    solution: "Converted dates, stripped currency symbols, fixed types and answered revenue questions with group-bys and charts.",
    highlights: ["Datetime conversion and currency cleaning", "Revenue by product, city and salesperson", "Payment-method and category analysis"],
    links: { github: "https://github.com/huzaifa-006/Sales-Data-Analysis-Python" },
    pipeline: {
      steps: [
        { label: "Raw CSV", detail: "Sales export", icon: "data" },
        { label: "Fix types", detail: "Dates · currency", icon: "clean" },
        { label: "Features", detail: "Date parts", icon: "features" },
        { label: "Group", detail: "Revenue splits", icon: "explore" },
        { label: "Visualize", detail: "Charts", icon: "chart" },
      ],
      output: ["Revenue by product", "City & salesperson", "Weekday trends"],
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
