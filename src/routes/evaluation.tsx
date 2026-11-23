import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, TrendingDown, Target, CheckCircle, AlertTriangle } from "lucide-react";
import { Container, MathBlock, PageHeader, PrevNext, SectionHeading, VizFrame } from "@/components/site/primitives";

export const Route = createFileRoute("/evaluation")({
  head: () => ({
    meta: [
      { title: "Evaluation & Optimization — K-Means Lab" },
      { name: "description", content: "Master cluster validation metrics: the Elbow Method, Silhouette Analysis, Davies-Bouldin, Calinski-Harabasz, and Adjusted Rand Index." },
      { property: "og:title", content: "Evaluation & Optimization — K-Means Lab" },
      { property: "og:description", content: "Master cluster validation metrics: the Elbow Method, Silhouette Analysis, Davies-Bouldin, Calinski-Harabasz, and Adjusted Rand Index." },
      { property: "og:type", content: "article" },
    ],
  }),
  component: EvaluationPage,
});

const sections = [
  { id: "why-k", title: "The Hyperparameter Problem: Selecting K" },
  { id: "elbow", title: "The Elbow Method & Inertia Curvature" },
  { id: "silhouette", title: "Silhouette Analysis & Cohesion-Separation" },
  { id: "internal-metrics", title: "Internal Validation (Davies-Bouldin & Calinski-Harabasz)" },
  { id: "external-metrics", title: "External Validation (Adjusted Rand Index & NMI)" },
];

function EvaluationPage() {
  return (
    <>
      <PageHeader
        index="05"
        title="Evaluation & Optimization"
        lede="How to objectively diagnose cluster quality, choose the optimal hyperparameter K, and audit algorithmic failure modes."
        crumbs={[{ label: "Home", to: "/" }, { label: "Evaluation & Optimization" }]}
        aside={
          <>
            <p className="eyebrow mb-2">Diagnostic Tools</p>
            <p className="font-serif text-3xl text-foreground">5 Metrics</p>
            <p className="mt-1 text-sm text-muted-foreground">Internal & External Validation</p>
          </>
        }
      />

      <Container className="grid gap-12 py-16 lg:grid-cols-[14rem_1fr]">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <div>
              <p className="eyebrow mb-4">On this page</p>
              <ol className="space-y-2 border-l text-sm">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-ml-px block border-l border-transparent pl-4 text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
                    >
                      {i + 1}. {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-sm border bg-paper p-4 text-xs text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Key rule</p>
              <p className="leading-relaxed">
                Never evaluate clustering solely by training WCSS, as it drops monotonically with every added cluster.
              </p>
            </div>
          </div>
        </nav>

        <article className="max-w-3xl space-y-24">
          {/* Section 1: The Problem of Selecting K */}
          <section id="why-k" aria-labelledby="why-k-heading" className="scroll-mt-24">
            <SectionHeading
              number="05.1"
              title="The Hyperparameter Problem: Selecting K"
              kicker="Model Selection"
              id="why-k-heading"
            />
            <div className="space-y-6 md:ml-24 text-base leading-relaxed">
              <p className="text-muted-foreground">
                In supervised learning, cross-validation on a hold-out test set readily reveals overfitting: as model capacity grows beyond optimal, validation loss begins to climb. In unsupervised clustering, however, there are <strong>no ground-truth targets</strong> to test against.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 my-6">
                <div className="border rounded-sm bg-paper p-5 space-y-2">
                  <p className="eyebrow text-destructive">Underfitting (K &lt; K*)</p>
                  <p className="text-sm text-foreground font-medium">Forced Merging</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Selecting too few clusters merges fundamentally distinct physical groups into an artificial conglomerate, diluting the specificity of the cluster centroids.
                  </p>
                </div>

                <div className="border rounded-sm bg-paper p-5 space-y-2">
                  <p className="eyebrow text-destructive">Overfitting (K &gt; K*)</p>
                  <p className="text-sm text-foreground font-medium">Artificial Shattering</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Selecting too many clusters fractures homogeneous clusters into arbitrary, meaningless sub-partitions. At <span className="font-mono">K = n</span>, every point is its own cluster with zero error, but zero generalization.
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                To determine the optimal <span className="font-mono text-foreground">K*</span>, we employ a combination of geometric curvature heuristics (the Elbow Method) and sample-level separation indices (Silhouette Analysis).
              </p>
            </div>
          </section>

          {/* Section 2: The Elbow Method */}
          <section id="elbow" aria-labelledby="elbow-heading" className="scroll-mt-24 border-t pt-16">
            <SectionHeading
              number="05.2"
              title="The Elbow Method & Inertia Curvature"
              kicker="Variance Scree Plot"
              id="elbow-heading"
            />
            <div className="space-y-6 md:ml-24 text-base leading-relaxed">
              <p className="text-muted-foreground">
                The <strong>Elbow Method</strong> plots total Within-Cluster Sum of Squares (WCSS / Inertia) as a function of the candidate cluster count <span className="font-mono text-foreground">K ∈ [1, K_max]</span>.
              </p>

              {/* Synthetic visual diagram of an elbow curve */}
              <VizFrame title="Fig. 5.1 — The Elbow Method: WCSS versus K" toolbar={<span className="font-mono text-xs text-accent">Optimal K = 3</span>}>
                <div className="p-6">
                  <svg viewBox="0 0 500 240" className="w-full h-auto" role="img" aria-label="Elbow Curve plotting WCSS against K">
                    {/* Grid lines */}
                    {[50, 100, 150, 200].map((y) => (
                      <line key={y} x1="50" y1={y} x2="470" y2={y} stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
                    ))}
                    {/* Axes */}
                    <line x1="50" y1="20" x2="50" y2="210" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="50" y1="210" x2="470" y2="210" stroke="currentColor" strokeWidth="1.5" />
                    <text x="25" y="115" transform="rotate(-90 25 115)" className="font-mono text-[10px] fill-muted-foreground" textAnchor="middle">WCSS (Inertia)</text>
                    <text x="260" y="235" className="font-mono text-[10px] fill-muted-foreground" textAnchor="middle">Number of Clusters (K)</text>

                    {/* Curve coordinates: K=1(85,45), K=2(140,110), K=3(195,165) [ELBOW], K=4(250,180), K=5(305,190), K=6(360,196), K=7(415,200) */}
                    <path
                      d="M 85 45 L 140 110 L 195 165 L 250 180 L 305 190 L 360 196 L 415 200"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="2.5"
                    />

                    {/* Data Points */}
                    {[
                      { k: 1, x: 85, y: 45, val: "840" },
                      { k: 2, x: 140, y: 110, val: "410" },
                      { k: 3, x: 195, y: 165, val: "180" },
                      { k: 4, x: 250, y: 180, val: "145" },
                      { k: 5, x: 305, y: 190, val: "125" },
                      { k: 6, x: 360, y: 196, val: "110" },
                      { k: 7, x: 415, y: 200, val: "98" },
                    ].map((pt) => (
                      <g key={pt.k}>
                        <circle cx={pt.x} cy={pt.y} r={pt.k === 3 ? 5 : 3.5} fill={pt.k === 3 ? "var(--foreground)" : "var(--accent)"} />
                        <text x={pt.x} y="224" className="font-mono text-[10px] fill-muted-foreground" textAnchor="middle">{pt.k}</text>
                      </g>
                    ))}

                    {/* Annotation for elbow */}
                    <g transform="translate(195, 165)">
                      <circle cx="0" cy="0" r="12" fill="none" stroke="var(--foreground)" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="15" y1="-15" x2="60" y2="-45" stroke="var(--foreground)" strokeWidth="1" />
                      <rect x="62" y="-60" width="130" height="26" rx="2" fill="var(--paper)" stroke="var(--border)" strokeWidth="1" />
                      <text x="68" y="-43" className="font-mono text-[10px] fill-foreground font-medium">Elbow point (K* = 3)</text>
                    </g>
                  </svg>
                </div>
                <div className="border-t px-4 py-2.5 text-xs text-muted-foreground font-mono flex justify-between">
                  <span>ΔWCSS(1→2) = 430</span>
                  <span>ΔWCSS(2→3) = 230</span>
                  <span className="text-accent font-medium">ΔWCSS(3→4) = 35 (diminishing return)</span>
                </div>
              </VizFrame>

              <div className="space-y-3">
                <h4 className="font-serif text-lg text-foreground">Interpreting the Curve</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Moving from <span className="font-mono text-foreground">K=1</span> to <span className="font-mono text-foreground">K=2</span> and <span className="font-mono text-foreground">K=3</span> yields steep drops in WCSS because centroids are capturing genuine natural clusters. Beyond <span className="font-mono text-foreground">K=3</span>, additional centroids only slice existing clusters, resulting in minimal reduction in variance. The point of maximum second derivative (the "bend" or "elbow") indicates the optimal parsimonious model.
                </p>
              </div>

              <div className="rounded-sm border border-amber-500/30 bg-amber-500/5 p-4 text-xs text-muted-foreground space-y-2">
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <AlertTriangle size={15} className="text-amber-500" />
                  <span>Limitations of the Elbow Method</span>
                </div>
                <p className="leading-relaxed">
                  In real-world data with overlapping clusters or high dimensional noise, the elbow is frequently smooth and ambiguous, lacking a sharp inflection point. Practitioners should rarely rely on the Elbow Method in isolation.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Silhouette Analysis */}
          <section id="silhouette" aria-labelledby="sil-heading" className="scroll-mt-24 border-t pt-16">
            <SectionHeading
              number="05.3"
              title="Silhouette Analysis & Cohesion-Separation"
              kicker="Individual Quality Metric"
              id="sil-heading"
            />
            <div className="space-y-6 md:ml-24 text-base leading-relaxed">
              <p className="text-muted-foreground">
                Introduced by Peter Rousseeuw (1987), <strong>Silhouette Analysis</strong> computes a score for each individual sample measuring how tightly bound it is to its own cluster versus how isolated it is from neighboring clusters.
              </p>

              <div className="space-y-3">
                <h4 className="font-serif text-xl text-foreground">Sample Silhouette Formulation</h4>
                <p className="text-sm text-muted-foreground">
                  For each data point <span className="font-mono text-foreground">i</span> assigned to cluster <span className="font-mono text-foreground">C_I</span>:
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 my-4">
                <div className="border p-4 rounded-sm bg-paper space-y-1">
                  <span className="eyebrow text-accent">Cohesion: a(i)</span>
                  <p className="text-xs text-muted-foreground">Mean distance from sample i to all other points within its own cluster:</p>
                  <p className="font-mono text-xs text-foreground bg-background p-2 rounded border mt-2">
                    {"a(i) = (1 / (|C_I| − 1)) ∑_{j ∈ C_I, j ≠ i} ‖xᵢ − xⱼ‖"}
                  </p>
                </div>

                <div className="border p-4 rounded-sm bg-paper space-y-1">
                  <span className="eyebrow text-foreground">Separation: b(i)</span>
                  <p className="text-xs text-muted-foreground">Mean distance from sample i to points in the closest neighboring cluster:</p>
                  <p className="font-mono text-xs text-foreground bg-background p-2 rounded border mt-2">
                    {"b(i) = min_{J ≠ I} (1 / |C_J|) ∑_{j ∈ C_J} ‖xᵢ − xⱼ‖"}
                  </p>
                </div>
              </div>

              <MathBlock label="Silhouette Coefficient Formula" number="Eq. 7">
                <span>{"s(i) = ( b(i) − a(i) ) / max( a(i), b(i) )  ∈  [−1, +1]"}</span>
              </MathBlock>

              <div className="rounded-sm border bg-paper p-5 space-y-3">
                <h4 className="font-serif text-lg text-foreground">How to Interpret the Silhouette Coefficient</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="font-mono font-medium text-emerald-600 dark:text-emerald-400 w-16 shrink-0">s(i) ≈ +1</span>
                    <p className="text-muted-foreground"><strong>Strongly Clustered:</strong> Intra-cluster distance is much smaller than nearest-neighbor distance (<span className="font-mono">a(i) &lt;&lt; b(i)</span>). The point is firmly nestled deep inside its correct cluster.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono font-medium text-amber-600 dark:text-amber-400 w-16 shrink-0">s(i) ≈ 0</span>
                    <p className="text-muted-foreground"><strong>Boundary Case:</strong> The point lies equidistant between its assigned cluster and a neighboring cluster boundary. Assignment is precarious.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono font-medium text-destructive w-16 shrink-0">s(i) ≈ −1</span>
                    <p className="text-muted-foreground"><strong>Misclustered:</strong> The point is actually closer to a neighboring cluster than to its assigned cluster (<span className="font-mono">a(i) &gt;&gt; b(i)</span>). Indicator of bad partition or poor initialization.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-lg text-foreground">Global Mean Silhouette Score</h4>
                <p className="text-sm text-muted-foreground">
                  The overall model score is the arithmetic mean across all samples: <span className="font-mono text-foreground font-medium">S = (1 / n) ∑_{i=1}^n s(i)</span>. The candidate <span className="font-mono text-foreground">K</span> that maximizes <span className="font-mono text-foreground">S</span> provides the geometrically soundest cluster partition.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Internal Metrics */}
          <section id="internal-metrics" aria-labelledby="internal-heading" className="scroll-mt-24 border-t pt-16">
            <SectionHeading
              number="05.4"
              title="Internal Validation Metrics"
              kicker="Unsupervised Benchmarks"
              id="internal-heading"
            />
            <div className="space-y-6 md:ml-24 text-base leading-relaxed">
              <p className="text-muted-foreground">
                When ground-truth labels are absent, internal metrics assess the geometric validity of clusters.
              </p>

              <div className="space-y-4 my-4">
                <div className="border rounded-sm bg-paper p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-lg text-foreground font-medium">1. Davies-Bouldin Index (DBI)</h4>
                    <span className="font-mono text-xs text-accent">Lower is Better (≥ 0)</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Evaluates the similarity between each cluster and its most similar adversary, expressed as the sum of intra-cluster scatter divided by centroid separation:
                  </p>
                  <p className="font-mono text-xs text-foreground bg-background p-2.5 rounded border">
                    {"DB = (1 / K) ∑_{i=1}^K max_{j ≠ i} ( (sᵢ + sⱼ) / d(μᵢ, μⱼ) )"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Where <span className="font-mono">sᵢ</span> is the average point-to-centroid distance within cluster <span className="font-mono">i</span>. Lower values indicate compact clusters that are far apart from each other.
                  </p>
                </div>

                <div className="border rounded-sm bg-paper p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-lg text-foreground font-medium">2. Calinski-Harabasz Index (Variance Ratio)</h4>
                    <span className="font-mono text-xs text-emerald-600 font-medium">Higher is Better</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    The ratio of between-cluster dispersion (separation) to within-cluster dispersion (compactness), normalized by degrees of freedom:
                  </p>
                  <p className="font-mono text-xs text-foreground bg-background p-2.5 rounded border">
                    CH = ( SSB / (K − 1) ) / ( SSW / (n − K) )
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Where <span className="font-mono">SSB</span> is Between-Cluster Sum of Squares and <span className="font-mono">SSW</span> is Within-Cluster Sum of Squares. Computes much faster than Silhouette score on massive datasets.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: External Metrics */}
          <section id="external-metrics" aria-labelledby="external-heading" className="scroll-mt-24 border-t pt-16">
            <SectionHeading
              number="05.5"
              title="External Validation Metrics"
              kicker="Supervised Benchmarking"
              id="external-heading"
            />
            <div className="space-y-6 md:ml-24 text-base leading-relaxed">
              <p className="text-muted-foreground">
                In research experiments and benchmark evaluations, synthetic or labeled datasets (such as MNIST digits or Iris species) possess true ground-truth class labels <span className="font-mono text-foreground">Y</span>. Because clustering algorithms assign arbitrary cluster indices (cluster 0 could correspond to true class "setosa" or "virginica"), standard accuracy cannot be computed directly.
              </p>

              <div className="border rounded-sm bg-paper p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg text-foreground font-medium">Adjusted Rand Index (ARI)</h4>
                  <span className="font-mono text-xs text-accent">Range: [−1.0, +1.0]</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The <strong>Rand Index</strong> evaluates all pairs of points, calculating the fraction of pairs that are either grouped together or placed in separate clusters in both predicted and ground-truth partitions. The <strong>Adjusted Rand Index (ARI)</strong> corrects this for chance overlap:
                </p>
                <p className="font-mono text-xs text-foreground bg-background p-2.5 rounded border">
                  ARI = ( Index − Expected_Index ) / ( Max_Index − Expected_Index )
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li><span className="font-mono text-foreground font-medium">1.0:</span> Perfect identical cluster assignments.</li>
                  <li><span className="font-mono text-foreground font-medium">0.0:</span> Agreement expected by pure random chance.</li>
                  <li><span className="font-mono text-foreground font-medium">&lt; 0.0:</span> Systematically discordant grouping.</li>
                </ul>
              </div>

              <div className="rounded-sm border bg-paper p-6 mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="font-serif text-xl text-foreground">Explore the Code Implementations</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    See how these metrics and the complete algorithm are implemented in pure Python, NumPy, and scikit-learn.
                  </p>
                </div>
                <Link
                  to="/implementation"
                  className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent"
                >
                  View Code Tutorials <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </section>
        </article>
      </Container>

      <PrevNext
        prev={{ to: "/implementation", label: "Implementation" }}
        next={{ to: "/learn", label: "Learning Path" }}
      />
    </>
  );
}
