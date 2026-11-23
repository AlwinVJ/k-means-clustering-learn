import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Layers,
  Sparkles,
  Compass,
  Database,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Code2,
  Calculator,
  Cpu,
  Target,
  Hash,
} from "lucide-react";
import { useState, useEffect } from "react";
import { BlockMath, Container, InlineMath, MathBlock, PageHeader, PrevNext, SectionHeading, VizFrame } from "@/components/site/primitives";
import { TOPICS } from "@/data/learningTopics";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learning Path — K-Means Lab" },
      { name: "description", content: "A comprehensive, nine-part curriculum taking you from unsupervised learning to practical K-Means deployment." },
      { property: "og:title", content: "Learning Path — K-Means Lab" },
      { property: "og:description", content: "A comprehensive, nine-part curriculum taking you from unsupervised learning to practical K-Means deployment." },
      { property: "og:type", content: "article" },
    ],
  }),
  component: LearnPage,
});

function LearnPage() {
  const [activeId, setActiveId] = useState<string>("unsupervised-learning");
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  const currentTopic = TOPICS.find((t) => t.id === activeId) ?? TOPICS[0] ?? {
    id: "unsupervised-learning",
    n: 1,
    title: "Introduction to Unsupervised Learning",
    time: "15 min",
    summary: "",
  };

  // IntersectionObserver for tracking currently active topic as user scrolls
  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length > 0 && visible[0]?.target.id) {
        setActiveId(visible[0].target.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: "-90px 0px -55% 0px",
      threshold: [0, 0.15, 0.4],
    });

    TOPICS.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Handle URL hash on initial page load and history pop/hashchange
  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== "undefined" && window.location.hash) {
        const hashId = window.location.hash.replace("#", "");
        const el = document.getElementById(hashId);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth" });
            setActiveId(hashId);
          }, 150);
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Smooth scroll handler with URL hash synchronization
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  return (
    <>
      <PageHeader
        index="01"
        title="The Learning Path"
        lede="A sequential, textbook-grade study of clustering from machine learning foundations to real-world industrial deployments."
        crumbs={[{ label: "Home", to: "/" }, { label: "Learning Path" }]}
        aside={
          <>
            <p className="eyebrow mb-2">Curriculum Scope</p>
            <p className="font-serif text-3xl text-foreground">9 Modules</p>
            <p className="mt-1 text-sm text-muted-foreground">Theory · Visuals · Math · Code</p>
          </>
        }
      />

      {/* Top Topics Navigation Area */}
      <section className="border-b bg-paper/60 py-12">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="eyebrow text-accent mb-1">Interactive Syllabus</p>
              <h2 className="font-serif text-2xl sm:text-3xl text-foreground">Curriculum Topics</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Click any topic below to jump directly to its complete explanation.
              </p>
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              Active: <strong className="text-accent uppercase font-medium">{activeId.replace("-", " ")}</strong>
            </span>
          </div>

          {/* 9 Topic Navigational Cards */}
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TOPICS.map((topic) => {
              const isActive = activeId === topic.id;
              return (
                <li key={topic.id}>
                  <a
                    href={`#${topic.id}`}
                    onClick={(e) => scrollToSection(e, topic.id)}
                    className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-sm border transition-all duration-200 h-full ${
                      isActive
                        ? "border-accent bg-paper shadow-sm ring-1 ring-accent"
                        : "border-border bg-background hover:border-foreground/40 hover:bg-paper"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between font-mono text-xs mb-2.5">
                        <span className={`font-semibold ${isActive ? "text-accent" : "text-muted-foreground group-hover:text-foreground"}`}>
                          § 0{topic.n}
                        </span>
                        <span className="text-muted-foreground/80">{topic.time}</span>
                      </div>
                      <h3 className={`font-serif text-lg leading-snug transition-colors ${
                        isActive ? "text-accent font-medium" : "text-foreground group-hover:text-accent"
                      }`}>
                        {topic.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                        {topic.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-mono">
                      <span className={isActive ? "text-accent font-medium flex items-center gap-1" : "text-muted-foreground group-hover:text-foreground"}>
                        {isActive ? "● Current section" : "Jump to lesson"}
                      </span>
                      <ArrowDown size={13} className={`transition-transform group-hover:translate-y-0.5 ${isActive ? "text-accent" : "text-muted-foreground"}`} />
                    </div>
                  </a>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* Mobile & Tablet Sticky Active Section Bar */}
      <div className="sticky top-16 z-30 lg:hidden border-b border-border/80 bg-background/95 backdrop-blur-md px-4 py-2.5 shadow-xs">
        <div className="flex items-center justify-between gap-3 max-w-[1360px] mx-auto">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-xs text-accent font-semibold shrink-0">
              § 0{currentTopic.n}
            </span>
            <span className="text-xs font-serif text-foreground truncate">
              {currentTopic.title}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-sm border border-border bg-paper hover:bg-muted text-foreground transition-colors"
              aria-expanded={mobileNavOpen}
              aria-label="Toggle section navigation menu"
            >
              <span>Jump to</span>
              {mobileNavOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.history.pushState(null, "", window.location.pathname);
              }}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileNavOpen && (
          <div className="mt-2 pt-2 border-t border-border/60 max-h-64 overflow-y-auto space-y-1">
            {TOPICS.map((t) => {
              const isActive = activeId === t.id;
              return (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  onClick={(e) => {
                    scrollToSection(e, t.id);
                    setMobileNavOpen(false);
                  }}
                  className={`flex items-center justify-between px-2.5 py-1.5 text-xs rounded-sm transition-colors ${
                    isActive
                      ? "bg-accent/10 text-accent font-medium"
                      : "text-muted-foreground hover:bg-paper hover:text-foreground"
                  }`}
                >
                  <span className="truncate">
                    <span className="font-mono mr-1.5 opacity-70">0{t.n}.</span>
                    {t.title}
                  </span>
                  {isActive && <span className="font-mono text-[10px] text-accent shrink-0 ml-2">Active</span>}
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Educational Reading Layout */}
      <Container className="grid gap-12 py-16 lg:grid-cols-[16rem_1fr]">
        {/* Sticky On-This-Page Sidebar */}
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <div>
              <p className="eyebrow mb-4">On this page</p>
              <ol className="space-y-1.5 border-l text-xs font-sans">
                {TOPICS.map((t) => {
                  const isActive = activeId === t.id;
                  return (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        onClick={(e) => scrollToSection(e, t.id)}
                        className={`-ml-px block border-l py-1.5 pl-3.5 transition-colors leading-snug ${
                          isActive
                            ? "border-accent text-accent font-medium bg-accent/5 rounded-r"
                            : "border-transparent text-muted-foreground hover:border-foreground/50 hover:text-foreground"
                        }`}
                      >
                        <span className="font-mono text-[10px] text-muted-foreground mr-1.5">0{t.n}.</span>
                        {t.title}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="rounded-sm border bg-paper p-4 text-xs text-muted-foreground space-y-2">
              <p className="font-medium text-foreground">Interactive workspaces</p>
              <p className="leading-relaxed">
                Modules 3 & 5 connect to the live <strong>Algorithm Explorer</strong>, Module 4 to the <strong>Mathematics</strong> derivations, Modules 6 & 7 to <strong>Evaluation</strong>, and Module 8 to <strong>Implementation</strong>.
              </p>
            </div>
          </div>
        </nav>

        {/* Content Article with All Nine Lesson Sections */}
        <article className="min-w-0 flex-1 space-y-28 max-w-5xl">
          {/* TOPIC 1: Unsupervised Learning */}
          <section id="unsupervised-learning" className="scroll-mt-24 pt-4 border-t first:border-t-0 first:pt-0">
            <SectionHeading
              number="01.1"
              title="Introduction to Unsupervised Learning"
              kicker="Foundational Paradigm"
              id="heading-unsupervised-learning"
            />
            <div className="space-y-8 md:ml-16 lg:ml-20 text-[17px] sm:text-[18px] leading-[1.78] text-muted-foreground">
              <div className="space-y-4">
                <h3 className="font-serif text-2xl sm:text-[1.65rem] text-foreground font-normal tracking-tight">
                  What is Machine Learning?
                </h3>
                <p>
                  At its core, <strong>Machine Learning (ML)</strong> is the computational discipline of designing algorithms that discover latent patterns, decision boundaries, and statistical models directly from empirical observations, eliminating the need for rigid hand-coded heuristic rules. Rather than manually translating human expertise into brittle chains of conditional statements, machine learning fits parameterized mathematical structures that minimize an objective loss function.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-2xl sm:text-[1.65rem] text-foreground font-normal tracking-tight">
                  Supervised versus Unsupervised Learning
                </h3>
                <p>
                  The machine learning landscape is fundamentally structured around the presence or absence of explicit supervisor targets:
                </p>

                <div className="grid gap-6 sm:grid-cols-2 my-6">
                  <div className="rounded-sm border bg-paper p-6 space-y-2">
                    <p className="eyebrow text-accent">Supervised Learning</p>
                    <p className="text-base text-foreground font-medium">Targeted Mapping: X → y</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Each observation vector <span className="font-mono text-foreground">xᵢ ∈ ℝᵈ</span> is paired with an external ground-truth annotation <span className="font-mono text-foreground">yᵢ</span> (e.g., class label, monetary price). The objective is to minimize an empirical loss <span className="font-mono text-foreground">L(f(x), y)</span> so the model generalizes accurately to unseen samples.
                    </p>
                  </div>

                  <div className="rounded-sm border bg-paper p-6 space-y-2">
                    <p className="eyebrow text-foreground">Unsupervised Learning</p>
                    <p className="text-base text-foreground font-medium">Manifold Discovery: X</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      The training dataset consists exclusively of unlabelled feature vectors <span className="font-mono text-foreground">{"{x₁, x₂, ..., xₙ}"}</span>. There are no targets, no ground-truth teachers, and no predetermined outcomes. The algorithm must uncover the intrinsic geometry, density distributions, and latent grouping inherent to the data manifold.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto my-6 border rounded-sm">
                  <table className="w-full text-left text-sm sm:text-[15px]">
                    <thead className="bg-paper border-b text-xs uppercase font-mono text-muted-foreground">
                      <tr>
                        <th className="p-3.5">Dimension</th>
                        <th className="p-3.5">Supervised Learning</th>
                        <th className="p-3.5">Unsupervised Learning</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-muted-foreground font-sans text-xs sm:text-[14px]">
                      <tr>
                        <td className="p-3.5 font-medium text-foreground">Training Data</td>
                        <td className="p-3.5">Features paired with true labels (X, y)</td>
                        <td className="p-3.5">Features only (unlabelled X)</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-medium text-foreground">Primary Objective</td>
                        <td className="p-3.5">Predict label for unseen inputs</td>
                        <td className="p-3.5">Discover natural geometric clusters & latent structure</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-medium text-foreground">Feedback Loop</td>
                        <td className="p-3.5">Direct error against ground truth</td>
                        <td className="p-3.5">Internal geometric cohesion and separation</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-medium text-foreground">Primary Tasks</td>
                        <td className="p-3.5">Classification, Regression</td>
                        <td className="p-3.5">Clustering, Dimensionality Reduction, Density Estimation</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-medium text-foreground">Evaluation Metrics</td>
                        <td className="p-3.5">Accuracy, F1-Score, MSE, ROC-AUC</td>
                        <td className="p-3.5">Silhouette Score, WCSS, Davies-Bouldin, ARI</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-2xl sm:text-[1.65rem] text-foreground font-normal tracking-tight">
                  Why Do We Need Unsupervised Learning?
                </h3>
                <p>
                  In modern software systems, acquiring raw data is practically free: web servers log billions of clicks daily, medical scanners capture high-resolution imagery, and financial exchanges generate millions of transactions per second. However, <strong>data labelling</strong> is an expensive, slow, and human-intensive bottleneck requiring specialized domain experts.
                </p>
                <p>
                  Unsupervised learning allows engineers to:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-sm sm:text-[16px]">
                  <li><strong>Mine Raw Archives:</strong> Derive meaningful customer groupings and behavioral trends from petabytes of unlabelled server logs.</li>
                  <li><strong>Perform Exploratory Data Analysis (EDA):</strong> Uncover natural groupings, formulating data-driven hypotheses before training predictive models.</li>
                  <li><strong>Engineer Latent Features:</strong> Compress high-dimensional vectors into compact cluster representations that significantly boost downstream linear classifiers.</li>
                  <li><strong>Isolate Anomalies:</strong> Flag fraudulent transactions or machine sensor failures that deviate significantly from learned cluster centroids.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* TOPIC 2: Clustering */}
          <section id="clustering" className="scroll-mt-24 pt-16 border-t">
            <SectionHeading
              number="01.2"
              title="Introduction to Clustering"
              kicker="Cluster Typology"
              id="heading-clustering"
            />
            <div className="space-y-8 md:ml-16 lg:ml-20 text-[17px] sm:text-[18px] leading-[1.78] text-muted-foreground">
              <div className="space-y-4">
                <h3 className="font-serif text-2xl sm:text-[1.65rem] text-foreground font-normal tracking-tight">
                  Formal Mathematical Definition
                </h3>
                <p>
                  Given a dataset of <span className="font-mono text-foreground font-medium">n</span> observations <span className="font-mono text-foreground font-medium">{"{x₁, x₂, ..., xₙ}"}</span> in <span className="font-mono text-foreground font-medium">d</span>-dimensional space <span className="font-mono text-foreground font-medium">ℝᵈ</span>, the goal of clustering is to partition the observations into <span className="font-mono text-foreground font-medium">K</span> non-empty, disjoint subsets <span className="font-mono text-foreground font-medium">{"C₁, C₂, ..., C_K"}</span> such that:
                </p>
                <div className="border-l-2 border-accent pl-4 my-4 font-mono text-sm space-y-1.5 text-foreground bg-paper p-4 rounded-sm">
                  <p>1. ⋃ (k=1 to K) Cₖ = {"{1, 2, ..., n}"} (Completeness: every observation is assigned)</p>
                  <p>2. Cⱼ ∩ Cₗ = ∅ for all j ≠ l (Exclusivity: no observation belongs to multiple clusters)</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-2xl sm:text-[1.65rem] text-foreground font-normal tracking-tight">
                  What Makes a High-Quality Cluster?
                </h3>
                <div className="grid gap-6 sm:grid-cols-2 my-4">
                  <div className="border p-6 rounded-sm bg-paper space-y-2">
                    <h4 className="font-serif text-lg font-medium text-foreground">High Intra-Cluster Compactness (Cohesion)</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Observations assigned to the same cluster <span className="font-mono text-foreground">Cₖ</span> should be tightly concentrated, minimizing pairwise distances or variance from their shared center of gravity.
                    </p>
                  </div>
                  <div className="border p-6 rounded-sm bg-paper space-y-2">
                    <h4 className="font-serif text-lg font-medium text-foreground">High Inter-Cluster Separation (Isolation)</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Distinct clusters <span className="font-mono text-foreground">Cⱼ</span> and <span className="font-mono text-foreground">Cₗ</span> should be well-isolated, maximizing the distance between their respective centroids and decision boundaries.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-2xl sm:text-[1.65rem] text-foreground font-normal tracking-tight">
                  The Four Major Clustering Families
                </h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-foreground/30 pl-4 py-1">
                    <h4 className="font-serif text-lg text-foreground font-medium">1. Partition-based (e.g., K-Means, K-Medoids)</h4>
                    <p className="text-sm mt-1">
                      Directly optimizes a global objective function by dividing data into <span className="font-mono">K</span> spheres. Fast (<span className="font-mono">O(n·K·d)</span>), but assumes convex geometries and requires pre-specifying <span className="font-mono">K</span>.
                    </p>
                  </div>
                  <div className="border-l-2 border-foreground/30 pl-4 py-1">
                    <h4 className="font-serif text-lg text-foreground font-medium">2. Hierarchical (e.g., Agglomerative, Divisive)</h4>
                    <p className="text-sm mt-1">
                      Constructs a tree-like dendrogram of nested clusters by iteratively merging or splitting points. No <span className="font-mono">K</span> required upfront, but computationally demanding (<span className="font-mono">O(n² log n)</span>).
                    </p>
                  </div>
                  <div className="border-l-2 border-foreground/30 pl-4 py-1">
                    <h4 className="font-serif text-lg text-foreground font-medium">3. Density-based (e.g., DBSCAN, HDBSCAN)</h4>
                    <p className="text-sm mt-1">
                      Defines clusters as continuous high-density areas separated by low-density valleys. Discovers arbitrary non-convex shapes and isolates outliers as noise, but struggles with varying density scales.
                    </p>
                  </div>
                  <div className="border-l-2 border-foreground/30 pl-4 py-1">
                    <h4 className="font-serif text-lg text-foreground font-medium">4. Distribution-based (e.g., Gaussian Mixture Models / EM)</h4>
                    <p className="text-sm mt-1">
                      Assumes data is generated from a mixture of underlying parametric probability distributions. Employs soft probabilistic membership instead of hard partitioning.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TOPIC 3: K-Means Fundamentals */}
          <section id="kmeans-fundamentals" className="scroll-mt-24 pt-16 border-t">
            <SectionHeading
              number="01.3"
              title="K-Means Clustering Fundamentals"
              kicker="Core Mechanics"
              id="heading-kmeans-fundamentals"
            />
            <div className="space-y-8 md:ml-16 lg:ml-20 text-[17px] sm:text-[18px] leading-[1.78] text-muted-foreground">
              <p>
                <strong>What is K-Means?</strong> Formulated in 1957 by Stuart Lloyd and published in 1982, K-Means is a centroid-based, iterative clustering algorithm. Its name reflects its fundamental operation: it groups data into <strong>K</strong> partitions by iteratively setting each group prototype to the arithmetic <strong>Mean</strong> of its assigned observations.
              </p>

              <div className="grid gap-6 sm:grid-cols-2 my-4">
                <div className="border p-6 rounded-sm bg-paper space-y-2">
                  <h4 className="font-serif text-lg font-medium text-foreground">What is a Centroid?</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    A centroid (<span className="font-mono text-foreground font-semibold">μₖ</span>) is the representative center-of-gravity vector for cluster <span className="font-mono text-foreground">k</span>. It does not need to be an existing sample from the dataset; it lives in continuous coordinate space as the sample mean of all points assigned to that cluster.
                  </p>
                </div>
                <div className="border p-6 rounded-sm bg-paper space-y-2">
                  <h4 className="font-serif text-lg font-medium text-foreground">What is a Cluster?</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    A cluster (<span className="font-mono text-foreground font-semibold">Cₖ</span>) represents the set of all observations that are closer to centroid <span className="font-mono text-foreground">μₖ</span> than to any other centroid. This geometric rule carves the feature space into convex Voronoi cells.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-serif text-xl text-foreground font-normal">Why Do Centroids Move?</h4>
                <p>
                  Centroids move because observation assignments change. When an observation transitions to a new cluster, the balance of mass shifts. Recalculating the arithmetic mean recalculates the exact point in space that minimizes the sum of squared Euclidean distances to all newly assigned members, continuously pulling the total Within-Cluster Sum of Squares (WCSS) downward.
                </p>
              </div>

              <div className="p-6 border rounded-sm bg-paper flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-lg text-foreground font-medium">Observe Centroid Movement in Real Time</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Watch centroids initialize and move across iterations on the interactive simulator.
                  </p>
                </div>
                <Link
                  to="/explorer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-foreground px-4 py-2 text-xs font-mono text-background hover:bg-accent transition-colors"
                >
                  Open Explorer <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </section>

          {/* TOPIC 4: Mathematical Foundations */}
          <section id="mathematical-foundations" className="scroll-mt-24 pt-16 border-t">
            <SectionHeading
              number="01.4"
              title="Mathematical Foundations"
              kicker="Formal Rigor"
              id="heading-mathematical-foundations"
            />
            <div className="space-y-8 md:ml-16 lg:ml-20 text-[17px] sm:text-[18px] leading-[1.78] text-muted-foreground">
              <p>
                The mathematical machinery of K-Means balances Euclidean distance measurement, sample mean optimality proofs, and block coordinate descent on a global loss objective.
              </p>

              <div className="space-y-4">
                <h4 className="font-serif text-xl text-foreground font-normal">1. Euclidean Distance & Squared L₂ Norm</h4>
                <p>
                  Proximity between sample <span className="font-mono text-foreground">x = (x₁, ..., x_d)ᵀ</span> and centroid prototype <span className="font-mono text-foreground">μ = (μ₁, ..., μ_d)ᵀ</span> is measured via Euclidean distance:
                </p>
                <MathBlock
                  label="Euclidean Distance Metric"
                  number="Eq. 1"
                  math="d(x, \mu) = \|x - \mu\| = \sqrt{\sum_{j=1}^d (x_j - \mu_j)^2}"
                />
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Because the square root is strictly monotonic, minimizing Euclidean distance is mathematically identical to minimizing the squared Euclidean distance <span className="font-mono text-foreground">‖x − μ‖²</span>, saving computational cycles and providing continuous differentiability.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-serif text-xl text-foreground font-normal">2. The Global K-Means Objective Function</h4>
                <p>
                  Formally, K-Means minimizes the total Within-Cluster Sum of Squares (WCSS / Inertia):
                </p>
                <MathBlock
                  label="K-Means Global Loss Objective"
                  number="Eq. 2"
                  math="J(R, M) = \sum_{i=1}^n \sum_{k=1}^K r_{ik} \cdot \|x_i - \mu_k\|^2"
                />
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Where <InlineMath math="r_{ik} \in \{0, 1\}" /> indicates assignment of sample <span className="font-mono text-foreground">xᵢ</span> to cluster <span className="font-mono text-foreground">k</span>, subject to <InlineMath math="\sum_{k=1}^K r_{ik} = 1" />.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-serif text-xl text-foreground font-normal">3. Lloyd's Coordinate Descent Proof</h4>
                <p>
                  Lloyd's algorithm alternates between two convex sub-problems:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm sm:text-[16px]">
                  <li><strong>Assignment Step:</strong> Holding centroids fixed, minimizing <span className="font-mono text-foreground">J</span> with respect to <InlineMath math="r_{ik}" /> assigns each point to its nearest centroid. Loss cannot increase.</li>
                  <li><strong>Update Step:</strong> Holding assignments fixed, taking the derivative with respect to <span className="font-mono text-foreground">μₖ</span> and setting to zero yields the sample mean <InlineMath math="\mu_k = \frac{1}{|C_k|} \sum x_i" />. Loss cannot increase.</li>
                </ul>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Because <span className="font-mono text-foreground">J</span> decreases monotonically and the number of discrete partitions is finite (<span className="font-mono text-foreground">Kⁿ</span>), Lloyd's algorithm is guaranteed to converge in a finite number of iterations to a local optimum.
                </p>
              </div>

              <div className="p-6 border rounded-sm bg-paper flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-lg text-foreground font-medium">Explore Full Algebraic Derivations</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Study the complete gradient proofs, Hessian positive-definiteness, and notation tables in the Mathematics chapter.
                  </p>
                </div>
                <Link
                  to="/mathematics"
                  className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-foreground px-4 py-2 text-xs font-mono text-background hover:bg-accent transition-colors"
                >
                  Open Mathematics <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </section>

          {/* TOPIC 5: How K-Means Works */}
          <section id="how-kmeans-works" className="scroll-mt-24 pt-16 border-t">
            <SectionHeading
              number="01.5"
              title="How K-Means Works: The 7-Step Pipeline"
              kicker="Execution Algorithm"
              id="heading-how-kmeans-works"
            />
            <div className="space-y-8 md:ml-16 lg:ml-20 text-[17px] sm:text-[18px] leading-[1.78] text-muted-foreground">
              <p>
                The complete lifecycle of K-Means clustering proceeds through seven explicit stages:
              </p>

              <ol className="space-y-6">
                <li className="border-l-2 border-foreground/30 pl-4 py-1">
                  <h4 className="font-serif text-lg text-foreground font-medium">Step 1: Choose the Cluster Count (K)</h4>
                  <p className="text-sm mt-1">
                    Specify the target number of partitions based on domain requirements or diagnostic heuristics (such as the Elbow Method or Silhouette Analysis).
                  </p>
                </li>

                <li className="border-l-2 border-foreground/30 pl-4 py-1">
                  <h4 className="font-serif text-lg text-foreground font-medium">Step 2: Initialize Centroid Prototypes</h4>
                  <p className="text-sm mt-1">
                    Seed initial coordinates via <strong>Uniform Random Sampling</strong> or <strong>K-Means++</strong>. K-Means++ chooses the first centroid at random and subsequent centroids with probability proportional to their squared distance from existing centers (<span className="font-mono text-foreground font-semibold">D(x)²</span>), drastically reducing the probability of converging to a poor local minimum.
                  </p>
                </li>

                <li className="border-l-2 border-foreground/30 pl-4 py-1">
                  <h4 className="font-serif text-lg text-foreground font-medium">Step 3: Calculate Pairwise Distances</h4>
                  <p className="text-sm mt-1">
                    For every sample vector <span className="font-mono text-foreground">xᵢ</span> and each centroid candidate <span className="font-mono text-foreground">μₖ</span>, calculate the distance <span className="font-mono text-foreground">d(xᵢ, μₖ)</span>.
                  </p>
                </li>

                <li className="border-l-2 border-foreground/30 pl-4 py-1">
                  <h4 className="font-serif text-lg text-foreground font-medium">Step 4: Voronoi Assignment Step</h4>
                  <p className="text-sm mt-1">
                    Assign each observation to its strictly closest centroid: <span className="font-mono text-foreground font-semibold">c(i) = argmin_k ‖xᵢ − μₖ‖²</span>.
                  </p>
                </li>

                <li className="border-l-2 border-foreground/30 pl-4 py-1">
                  <h4 className="font-serif text-lg text-foreground font-medium">Step 5: Centroid Repositioning (Update Step)</h4>
                  <p className="text-sm mt-1">
                    Recalculate each centroid as the arithmetic mean of all points assigned to that cluster: <InlineMath math="\mu_k = \frac{1}{|C_k|} \sum_{x \in C_k} x" className="font-medium text-foreground ml-1" />.
                  </p>
                </li>

                <li className="border-l-2 border-foreground/30 pl-4 py-1">
                  <h4 className="font-serif text-lg text-foreground font-medium">Step 6: Iterative Optimization</h4>
                  <p className="text-sm mt-1">
                    Repeat steps 3, 4, and 5. With each cycle, total inertia decreases or remains constant.
                  </p>
                </li>

                <li className="border-l-2 border-foreground/30 pl-4 py-1">
                  <h4 className="font-serif text-lg text-foreground font-medium">Step 7: Convergence & Halting Criteria</h4>
                  <p className="text-sm mt-1">
                    The algorithm halts when zero points switch clusters, when centroid shift falls below tolerance (<span className="font-mono text-foreground font-semibold">Δμ &lt; ε</span>), or when the maximum iteration limit (<span className="font-mono text-foreground">max_iter</span>) is reached.
                  </p>
                </li>
              </ol>
            </div>
          </section>

          {/* TOPIC 6: Choosing Optimal K */}
          <section id="choosing-k" className="scroll-mt-24 pt-16 border-t">
            <SectionHeading
              number="01.6"
              title="Choosing the Optimal Number of Clusters"
              kicker="Model Diagnostics"
              id="heading-choosing-k"
            />
            <div className="space-y-8 md:ml-16 lg:ml-20 text-[17px] sm:text-[18px] leading-[1.78] text-muted-foreground">
              <p>
                Selecting <span className="font-mono text-foreground font-medium">K</span> is the quintessential hyperparameter dilemma of unsupervised clustering. Because there are no labels, training error (WCSS) cannot be minimized unconditionally—at <span className="font-mono text-foreground">K = n</span>, WCSS is trivially zero, but the model has zero explanatory power.
              </p>

              <div className="grid gap-6 sm:grid-cols-2 my-4">
                <div className="border p-6 rounded-sm bg-paper space-y-2">
                  <h4 className="font-serif text-lg font-medium text-foreground">The Elbow Method</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Plots total WCSS (Inertia) against candidate <span className="font-mono text-foreground">K</span> values. As <span className="font-mono text-foreground">K</span> increases, WCSS drops steeply until true clusters are accounted for; subsequent additions produce only marginal reductions in variance. The "bend" or "elbow" identifies the most parsimonious model.
                  </p>
                </div>
                <div className="border p-6 rounded-sm bg-paper space-y-2">
                  <h4 className="font-serif text-lg font-medium text-foreground">Curvature Diagnostics</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Evaluates the second difference: <span className="font-mono text-foreground">{"Δ² WCSS(K) = WCSS(K-1) - 2·WCSS(K) + WCSS(K+1)"}</span>. The point of maximum curvature represents the transition from capturing genuine variance to overfitting noise.
                  </p>
                </div>
              </div>

              <div className="p-6 border rounded-sm bg-paper flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-lg text-foreground font-medium">Inspect the Interactive Elbow Plot</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    See interactive scree curves and mathematical inflection points in the Evaluation chapter.
                  </p>
                </div>
                <Link
                  to="/evaluation"
                  className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-foreground px-4 py-2 text-xs font-mono text-background hover:bg-accent transition-colors"
                >
                  View Elbow Analysis <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </section>

          {/* TOPIC 7: Evaluating Clustering Performance */}
          <section id="evaluation-metrics" className="scroll-mt-24 pt-16 border-t">
            <SectionHeading
              number="01.7"
              title="Evaluating Clustering Performance"
              kicker="Validation Indices"
              id="heading-evaluation-metrics"
            />
            <div className="space-y-8 md:ml-16 lg:ml-20 text-[17px] sm:text-[18px] leading-[1.78] text-muted-foreground">
              <p>
                Validating clusters requires distinct frameworks depending on whether ground-truth test labels are available:
              </p>

              <div className="space-y-6">
                <div className="border rounded-sm bg-paper p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-lg text-foreground font-medium">Silhouette Analysis</h4>
                    <span className="font-mono text-xs text-accent">Range: [-1.0, +1.0]</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Measures how similar a sample is to its own cluster (cohesion <span className="font-mono text-foreground font-medium">a</span>) compared to other clusters (separation <span className="font-mono text-foreground font-medium">b</span>):
                  </p>
                  <p className="font-mono text-xs text-foreground bg-background p-3 rounded border">
                    {"s(i) = ( b(i) − a(i) ) / max( a(i), b(i) )"}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    A score near <span className="font-mono text-foreground font-semibold">+1</span> denotes dense, well-isolated clusters; <span className="font-mono text-foreground font-semibold">0</span> represents decision boundary samples; and negative scores denote misclassified observations.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="border p-6 rounded-sm bg-paper space-y-2">
                    <h4 className="font-serif text-base text-foreground font-medium">Davies-Bouldin Index (DBI)</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Computes the ratio of within-cluster scatter to centroid separation. <em>Lower values indicate superior clustering.</em>
                    </p>
                  </div>
                  <div className="border p-6 rounded-sm bg-paper space-y-2">
                    <h4 className="font-serif text-base text-foreground font-medium">Adjusted Rand Index (ARI)</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      When ground-truth labels exist, ARI evaluates pairwise agreement corrected for chance overlap. <em>1.0 represents perfect agreement.</em>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TOPIC 8: Practical Implementation */}
          <section id="practical-implementation" className="scroll-mt-24 pt-16 border-t">
            <SectionHeading
              number="01.8"
              title="Practical Implementation"
              kicker="Code Registers"
              id="heading-practical-implementation"
            />
            <div className="space-y-8 md:ml-16 lg:ml-20 text-[17px] sm:text-[18px] leading-[1.78] text-muted-foreground">
              <p>
                K-Means can be authored across three distinct software registers:
              </p>

              <div className="space-y-4">
                <div className="border-l-2 border-foreground/30 pl-4 py-1">
                  <h4 className="font-serif text-lg text-foreground font-medium">1. Pure Python from First Principles</h4>
                  <p className="text-sm mt-1">
                    Implements Euclidean distance calculation, centroid updating, and convergence loops using native Python data structures with zero external dependencies.
                  </p>
                </div>
                <div className="border-l-2 border-foreground/30 pl-4 py-1">
                  <h4 className="font-serif text-lg text-foreground font-medium">2. Vectorized NumPy Linear Algebra</h4>
                  <p className="text-sm mt-1">
                    Accelerates pairwise distances by broadcasting multidimensional arrays: <span className="font-mono text-foreground font-medium">{"X[:, np.newaxis, :] - centroids[np.newaxis, :, :]"}</span>, computing operations at native C-speed.
                  </p>
                </div>
                <div className="border-l-2 border-foreground/30 pl-4 py-1">
                  <h4 className="font-serif text-lg text-foreground font-medium">3. Production Scikit-Learn Pipeline</h4>
                  <p className="text-sm mt-1">
                    Combines <span className="font-mono text-foreground">StandardScaler</span> with <span className="font-mono text-foreground font-medium">{"KMeans(init='k-means++', n_init=10)"}</span> to guarantee robust feature scaling, multi-threaded execution, and automatic restarts.
                  </p>
                </div>
              </div>

              <div className="p-6 border rounded-sm bg-paper flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-lg text-foreground font-medium">View Complete Executable Code</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    All three implementations are fully documented and executable under Python 3.10+.
                  </p>
                </div>
                <Link
                  to="/implementation"
                  className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-foreground px-4 py-2 text-xs font-mono text-background hover:bg-accent transition-colors"
                >
                  View Code Tutorials <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </section>

          {/* TOPIC 9: Limitations & Real-World Applications */}
          <section id="applications-limitations" className="scroll-mt-24 pt-16 border-t">
            <SectionHeading
              number="01.9"
              title="Limitations and Real-World Applications"
              kicker="Applied Engineering"
              id="heading-applications-limitations"
            />
            <div className="space-y-8 md:ml-16 lg:ml-20 text-[17px] sm:text-[18px] leading-[1.78] text-muted-foreground">
              <div className="space-y-4">
                <h3 className="font-serif text-2xl sm:text-[1.65rem] text-foreground font-normal tracking-tight">
                  Where K-Means Shines in Production
                </h3>
                <div className="grid gap-6 sm:grid-cols-2 my-4">
                  <div className="border rounded-sm bg-paper p-6 space-y-2">
                    <div className="flex items-center gap-2 text-accent">
                      <Layers size={18} />
                      <h4 className="font-serif text-lg text-foreground font-medium">Customer Segmentation</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      E-commerce platforms group customers across normalized Recency, Frequency, and Monetary (RFM) vectors into actionable cohorts ("VIPs", "At-Risk", "Occasional").
                    </p>
                  </div>

                  <div className="border rounded-sm bg-paper p-6 space-y-2">
                    <div className="flex items-center gap-2 text-accent">
                      <Sparkles size={18} />
                      <h4 className="font-serif text-lg text-foreground font-medium">Image Color Quantization</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Compresses images by clustering 24-bit RGB space into <span className="font-mono">K=16</span> or <span className="font-mono">K=64</span> color palette centers, replacing millions of colors with palette indices.
                    </p>
                  </div>

                  <div className="border rounded-sm bg-paper p-6 space-y-2">
                    <div className="flex items-center gap-2 text-accent">
                      <Compass size={18} />
                      <h4 className="font-serif text-lg text-foreground font-medium">Logistics & Facility Placement</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Delivery networks cluster customer coordinates into <span className="font-mono">K</span> fulfillment territories. Because K-Means minimizes squared Euclidean distance, the centroid minimizes transport energy.
                    </p>
                  </div>

                  <div className="border rounded-sm bg-paper p-6 space-y-2">
                    <div className="flex items-center gap-2 text-accent">
                      <Database size={18} />
                      <h4 className="font-serif text-lg text-foreground font-medium">Nonlinear Feature Expansion</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Distances to the <span className="font-mono">K</span> learned cluster centroids serve as radial basis features, enabling linear models to capture complex nonlinear boundaries.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-2xl sm:text-[1.65rem] text-foreground font-normal tracking-tight">
                  Critical Limitations & Failure Modes
                </h3>
                <div className="rounded-sm border border-destructive/30 bg-destructive/5 p-6 text-sm sm:text-[15px] space-y-3">
                  <div className="flex items-center gap-2 text-destructive font-medium">
                    <AlertCircle size={18} />
                    <span>When NOT to use K-Means</span>
                  </div>
                  <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <li><strong>Non-spherical geometries:</strong> Voronoi tessellations inherently partition space with linear hyperplanes. Concentric rings or intertwined spirals cannot be separated (use DBSCAN or Spectral Clustering).</li>
                    <li><strong>Unequal cluster densities:</strong> A sparse cluster adjacent to a dense cluster will have points captured by the denser centroid due to the uniform variance assumption.</li>
                    <li><strong>Outlier susceptibility:</strong> Sample means have an unbounded breakdown point—a single extreme outlier pulls centroids away from genuine data concentrations.</li>
                    <li><strong>Curse of dimensionality:</strong> In high dimensions (<span className="font-mono">d &gt; 50</span>), pairwise Euclidean distances concentrate around a narrow range, degrading separation (reduce dimensionality with PCA first).</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </article>
      </Container>

      <PrevNext
        prev={{ to: "/", label: "Home" }}
        next={{ to: "/explorer", label: "Algorithm Explorer" }}
      />
    </>
  );
}
