export const nav = [
  { to: "/", label: "Home" },
  { to: "/learn", label: "Learning Path" },
  { to: "/explorer", label: "Explorer" },
  { to: "/mathematics", label: "Mathematics" },
  { to: "/implementation", label: "Implementation" },
  { to: "/evaluation", label: "Evaluation" },
] as const;

export type NavTo = (typeof nav)[number]["to"];

export interface ModuleItem {
  n: number;
  title: string;
  time: string;
  to: NavTo;
  summary: string;
}

export const modules: ModuleItem[] = [
  {
    n: 1,
    title: "Introduction to Unsupervised Learning",
    time: "15 min",
    to: "/learn",
    summary: "Discover the paradigm of learning from unlabelled data, contrasting supervised loss with geometric structure discovery.",
  },
  {
    n: 2,
    title: "Introduction to Clustering",
    time: "20 min",
    to: "/learn",
    summary: "Explore cluster compactness, inter-cluster separation, distance metrics, and the four major clustering algorithm families.",
  },
  {
    n: 3,
    title: "K-Means Clustering Fundamentals",
    time: "25 min",
    to: "/explorer",
    summary: "Understand what K represents, the geometric role of centroids, and how minimum Euclidean distance drives partition assignment.",
  },
  {
    n: 4,
    title: "Mathematical Foundations",
    time: "40 min",
    to: "/mathematics",
    summary: "Derive Euclidean distance, coordinate-wise centroid updates, WCSS, and Lloyd's coordinate descent objective function.",
  },
  {
    n: 5,
    title: "How K-Means Works",
    time: "30 min",
    to: "/explorer",
    summary: "Follow the iterative two-step dance: Voronoi assignment and centroid repositioning, comparing random vs K-Means++ initialization.",
  },
  {
    n: 6,
    title: "Choosing the Optimal Number of Clusters",
    time: "25 min",
    to: "/evaluation",
    summary: "Master the Elbow Method and Silhouette Analysis to quantitatively diagnose the true underlying cluster count.",
  },
  {
    n: 7,
    title: "Evaluating Clustering Performance",
    time: "30 min",
    to: "/evaluation",
    summary: "Compare internal geometric metrics (Davies-Bouldin, Calinski-Harabasz) with external ground-truth metrics (Adjusted Rand Index).",
  },
  {
    n: 8,
    title: "Practical Implementation",
    time: "45 min",
    to: "/implementation",
    summary: "Write and execute clean, production-grade implementations from scratch in pure Python, vectorized NumPy, and scikit-learn.",
  },
  {
    n: 9,
    title: "Real-World Applications & Limitations",
    time: "20 min",
    to: "/learn",
    summary: "Study industrial use cases from customer RFM segmentation to color quantization, alongside critical failure modes.",
  },
];
