export const nav = [
  { to: "/", label: "Home" },
  { to: "/learn", label: "Learning Path" },
  { to: "/explorer", label: "Explorer" },
  { to: "/mathematics", label: "Mathematics" },
  { to: "/implementation", label: "Implementation" },
  { to: "/evaluation", label: "Evaluation" },
] as const;

export type NavTo = (typeof nav)[number]["to"];

export const modules: { n: number; title: string; time: string; to: NavTo }[] = [
  { n: 1, title: "Introduction to Unsupervised Learning", time: "15 min", to: "/learn" },
  { n: 2, title: "Introduction to Clustering", time: "20 min", to: "/learn" },
  { n: 3, title: "K-Means Clustering Fundamentals", time: "25 min", to: "/explorer" },
  { n: 4, title: "Mathematical Foundations", time: "40 min", to: "/mathematics" },
  { n: 5, title: "How K-Means Works", time: "30 min", to: "/explorer" },
  { n: 6, title: "Choosing the Optimal Number of Clusters", time: "25 min", to: "/evaluation" },
  { n: 7, title: "Evaluating Clustering Performance", time: "30 min", to: "/evaluation" },
  { n: 8, title: "Practical Implementation", time: "45 min", to: "/implementation" },
  { n: 9, title: "Real-World Applications", time: "20 min", to: "/learn" },
];
