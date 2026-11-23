export interface TopicItem {
  id: string;
  n: number;
  title: string;
  time: string;
  summary: string;
  deepDiveUrl?: string;
  deepDiveLabel?: string;
}

export const TOPICS: TopicItem[] = [
  {
    id: "unsupervised-learning",
    n: 1,
    title: "Introduction to Unsupervised Learning",
    time: "15 min",
    summary: "Discover the paradigm of learning from unlabelled data, contrasting supervised loss with geometric structure discovery.",
  },
  {
    id: "clustering",
    n: 2,
    title: "Introduction to Clustering",
    time: "20 min",
    summary: "Explore cluster compactness, inter-cluster separation, distance metrics, and the four major clustering algorithm families.",
  },
  {
    id: "kmeans-fundamentals",
    n: 3,
    title: "K-Means Clustering Fundamentals",
    time: "25 min",
    summary: "Understand what K represents, the geometric role of centroids, and how minimum Euclidean distance drives partition assignment.",
    deepDiveUrl: "/explorer",
    deepDiveLabel: "Open Explorer Laboratory",
  },
  {
    id: "mathematical-foundations",
    n: 4,
    title: "Mathematical Foundations",
    time: "40 min",
    summary: "Derive Euclidean distance, coordinate-wise centroid updates, WCSS, and Lloyd's coordinate descent objective function.",
    deepDiveUrl: "/mathematics",
    deepDiveLabel: "Read Mathematics Monograph",
  },
  {
    id: "how-kmeans-works",
    n: 5,
    title: "How K-Means Works",
    time: "30 min",
    summary: "Follow the iterative two-step dance: Voronoi assignment and centroid repositioning, comparing random vs K-Means++ initialization.",
    deepDiveUrl: "/explorer",
    deepDiveLabel: "Simulate Step-by-Step",
  },
  {
    id: "choosing-k",
    n: 6,
    title: "Choosing the Optimal Number of Clusters",
    time: "25 min",
    summary: "Master the Elbow Method and Silhouette Analysis to quantitatively diagnose the true underlying cluster count.",
    deepDiveUrl: "/evaluation",
    deepDiveLabel: "View Diagnostic Curves",
  },
  {
    id: "evaluation-metrics",
    n: 7,
    title: "Evaluating Clustering Performance",
    time: "30 min",
    summary: "Compare internal geometric metrics (Davies-Bouldin, Calinski-Harabasz) with external ground-truth metrics (Adjusted Rand Index).",
    deepDiveUrl: "/evaluation",
    deepDiveLabel: "Explore Evaluation Metrics",
  },
  {
    id: "practical-implementation",
    n: 8,
    title: "Practical Implementation",
    time: "45 min",
    summary: "Write and execute clean, production-grade implementations from scratch in pure Python, vectorized NumPy, and scikit-learn.",
    deepDiveUrl: "/implementation",
    deepDiveLabel: "Inspect Implementation Code",
  },
  {
    id: "applications-limitations",
    n: 9,
    title: "Limitations and Real-World Applications",
    time: "20 min",
    summary: "Study industrial use cases from customer RFM segmentation to color quantization, alongside critical failure modes.",
  },
];
