import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, AlertCircle, Compass, Layers, Sparkles, Database, HelpCircle } from "lucide-react";
import { ModuleEntry } from "@/components/site/ModuleEntry";
import { Container, PageHeader, PrevNext, SectionHeading, VizFrame } from "@/components/site/primitives";
import { modules } from "@/lib/site";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learning Path — K-Means Lab" },
      { name: "description", content: "A rigorous, structured curriculum covering unsupervised learning, clustering paradigms, K-Means fundamentals, and practical applications." },
      { property: "og:title", content: "Learning Path — K-Means Lab" },
      { property: "og:description", content: "A rigorous, structured curriculum covering unsupervised learning, clustering paradigms, K-Means fundamentals, and practical applications." },
      { property: "og:type", content: "article" },
    ],
  }),
  component: Learn,
});

const onPageNav = [
  { id: "curriculum", title: "Curriculum Map" },
  { id: "module-1", title: "1. Unsupervised Learning" },
  { id: "module-2", title: "2. Clustering Foundations" },
  { id: "module-9", title: "3. Real-World Applications" },
];

function Learn() {
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

      <Container className="grid gap-12 py-16 lg:grid-cols-[14rem_1fr]">
        <nav aria-label="Table of contents" className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <div>
              <p className="eyebrow mb-4">On this page</p>
              <ol className="space-y-2 border-l text-sm">
                {onPageNav.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-ml-px block border-l border-transparent pl-4 text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-sm border bg-paper p-4 text-xs text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Interactive modules</p>
              <p className="leading-relaxed">
                Modules 3, 4, 5, 6, 7 & 8 have dedicated interactive workspaces in Explorer, Mathematics, Evaluation, and Implementation.
              </p>
            </div>
          </div>
        </nav>

        <article className="max-w-3xl space-y-24">
          {/* Section: Curriculum Map */}
          <section id="curriculum" aria-labelledby="curriculum-heading" className="scroll-mt-24">
            <SectionHeading
              number="01.0"
              title="Curriculum Syllabus"
              kicker="Structured Monograph"
              id="curriculum-heading"
            />
            <div className="md:ml-24">
              <p className="text-base leading-relaxed text-muted-foreground mb-8">
                Each module has been designed to balance pedagogical intuition with mathematical rigor and reproducible implementation code. You may follow the path sequentially or jump directly into the practical laboratory.
              </p>
              <ol className="border-t">
                {modules.map((m) => (
                  <ModuleEntry key={m.n} {...m} />
                ))}
              </ol>
            </div>
          </section>

          {/* Module 1: Introduction to Unsupervised Learning */}
          <section id="module-1" aria-labelledby="mod1-heading" className="scroll-mt-24 border-t pt-16">
            <SectionHeading
              number="01.1"
              title="Introduction to Unsupervised Learning"
              kicker="Foundational Theory"
              id="mod1-heading"
            />
            <div className="space-y-8 md:ml-24 text-base leading-relaxed">
              <div className="space-y-4">
                <h3 className="font-serif text-2xl text-foreground">What is Machine Learning?</h3>
                <p className="text-muted-foreground">
                  At its core, <strong>Machine Learning (ML)</strong> is the computational discipline of designing algorithms that discover latent patterns, decision rules, and mathematical models directly from empirical data without being explicitly hand-programmed for every contingency. Rather than translating domain heuristics into brittle chains of conditional rules, machine learning constructs parameterized representations that improve their performance via statistical optimization.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-2xl text-foreground">Supervised versus Unsupervised Learning</h3>
                <p className="text-muted-foreground">
                  The machine learning landscape is traditionally bifurcated by the presence or absence of explicit ground-truth supervisor targets:
                </p>

                <div className="grid gap-4 sm:grid-cols-2 my-6">
                  <div className="rounded-sm border bg-paper p-5">
                    <p className="eyebrow text-accent mb-2">Supervised Learning</p>
                    <p className="text-sm text-foreground font-medium mb-2">Targeted Mapping: X → y</p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Each observation vector <span className="font-mono text-foreground">xᵢ ∈ ℝᵈ</span> is paired with an external ground-truth annotation or target <span className="font-mono text-foreground">yᵢ</span> (e.g., class label, monetary price). The objective is to minimize an empirical loss function <span className="font-mono text-foreground">L(f(x), y)</span> so the model can generalize to unseen samples.
                    </p>
                  </div>

                  <div className="rounded-sm border bg-paper p-5">
                    <p className="eyebrow text-foreground mb-2">Unsupervised Learning</p>
                    <p className="text-sm text-foreground font-medium mb-2">Structure Discovery: X</p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      The training dataset consists exclusively of unlabelled feature vectors <span className="font-mono text-foreground">&#123;x₁, x₂, ..., xₙ&#125;</span>. There are no answers provided, no ground-truth teachers, and no target labels. The algorithm must uncover the intrinsic geometry, probability density, or latent grouping inherent to the data manifold.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto my-6 border rounded-sm">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-paper border-b text-xs uppercase font-mono text-muted-foreground">
                      <tr>
                        <th className="p-3">Dimension</th>
                        <th className="p-3">Supervised Learning</th>
                        <th className="p-3">Unsupervised Learning</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-xs text-muted-foreground font-sans">
                      <tr>
                        <td className="p-3 font-medium text-foreground">Training Data</td>
                        <td className="p-3">Pairs (features + true labels)</td>
                        <td className="p-3">Features only (unlabelled)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-foreground">Primary Objective</td>
                        <td className="p-3">Predict label for unseen input</td>
                        <td className="p-3">Discover hidden structure / clusters</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-foreground">Ground-Truth Feedback</td>
                        <td className="p-3">Explicit error (loss vs actual target)</td>
                        <td className="p-3">No direct target; internal geometric metrics</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-foreground">Core Tasks</td>
                        <td className="p-3">Classification, Regression</td>
                        <td className="p-3">Clustering, Dimensionality Reduction, Density Estimation</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-foreground">Evaluation</td>
                        <td className="p-3">Deterministic (Accuracy, F1, MSE)</td>
                        <td className="p-3">Relative & heuristic (Silhouette, WCSS, ARI)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-2xl text-foreground">Why Do We Need Unsupervised Learning?</h3>
                <p className="text-muted-foreground">
                  In modern computing, data acquisition is virtually frictionless: web servers log petabytes of HTTP clicks, satellites photograph continents daily, and financial systems stream millions of trades every second. However, <strong>data labelling</strong> is an expensive, slow, and human-intensive bottleneck requiring qualified domain specialists (e.g., radiograms annotated by oncologists, contracts vetted by attorneys).
                </p>
                <p className="text-muted-foreground">
                  Unsupervised learning allows us to:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  <li><strong>Mine Raw Data:</strong> Extract actionable insights directly from unlabeled archives without awaiting costly human annotation.</li>
                  <li><strong>Perform Exploratory Data Analysis (EDA):</strong> Formulate scientific hypotheses by revealing natural groupings and data anomalies.</li>
                  <li><strong>Compress & Preprocess:</strong> Reduce dimensionality and engineer compact latent features for downstream supervised classifiers.</li>
                  <li><strong>Detect Outliers:</strong> Identify abnormal transactions, fraudulent intrusions, or sensor defects that deviate from learned normal baselines.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-2xl text-foreground">Where K-Means Fits</h3>
                <p className="text-muted-foreground">
                  Within the broader taxonomy of unsupervised algorithms, <strong>K-Means</strong> is categorized as a <em>partition-based, hard-assignment, centroid-driven clustering algorithm</em>. It seeks an optimal partition of data into a fixed number <em>K</em> of convex, non-overlapping clusters by minimizing the within-cluster variance.
                </p>
              </div>
            </div>
          </section>

          {/* Module 2: Introduction to Clustering */}
          <section id="module-2" aria-labelledby="mod2-heading" className="scroll-mt-24 border-t pt-16">
            <SectionHeading
              number="01.2"
              title="Introduction to Clustering"
              kicker="Mechanisms & Typologies"
              id="mod2-heading"
            />
            <div className="space-y-8 md:ml-24 text-base leading-relaxed">
              <div className="space-y-4">
                <h3 className="font-serif text-2xl text-foreground">Formal Definition of Clustering</h3>
                <p className="text-muted-foreground">
                  Let <span className="font-mono text-foreground">&#123;x₁, x₂, ..., xₙ&#125;</span> be a dataset of <span className="font-mono text-foreground">n</span> observations in <span className="font-mono text-foreground">d</span>-dimensional real coordinate space <span className="font-mono text-foreground">ℝᵈ</span>. The mathematical goal of clustering is to partition the index set <span className="font-mono text-foreground">&#123;1, ..., n&#125;</span> into <span className="font-mono text-foreground">K</span> non-empty, disjoint subsets <span className="font-mono text-foreground">C₁, C₂, ..., Cₖ</span> such that:
                </p>
                <div className="border-l-2 border-accent pl-4 my-4 font-mono text-sm space-y-1 text-foreground">
                  <p>1. ⋃ (k=1 to K) Cₖ = &#123;1, 2, ..., n&#125; (Every observation is assigned)</p>
                  <p>2. Cⱼ ∩ Cₗ = ∅ for all j ≠ l (No point belongs to multiple clusters)</p>
                </div>
                <p className="text-muted-foreground">
                  A high-quality clustering satisfies two complementary geometric conditions:
                </p>
                <div className="grid gap-4 sm:grid-cols-2 my-4">
                  <div className="border p-4 rounded-sm bg-paper">
                    <h4 className="font-serif text-lg font-medium text-foreground mb-1">High Intra-Cluster Compactness</h4>
                    <p className="text-xs text-muted-foreground">
                      Observations assigned to the same cluster <span className="font-mono">Cₖ</span> should be tightly concentrated, exhibiting minimal pairwise distance or minimal variance from their shared centroid.
                    </p>
                  </div>
                  <div className="border p-4 rounded-sm bg-paper">
                    <h4 className="font-serif text-lg font-medium text-foreground mb-1">High Inter-Cluster Separation</h4>
                    <p className="text-xs text-muted-foreground">
                      Distinct clusters <span className="font-mono">Cⱼ</span> and <span className="font-mono">Cₗ</span> should be well-isolated from one another, maximizing the distance between their boundaries or cluster centers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-2xl text-foreground">Similarity, Dissimilarity & Distance</h3>
                <p className="text-muted-foreground">
                  To group points, an algorithm must quantify whether two points are "near" or "far." A true distance metric <span className="font-mono text-foreground">d(x, y)</span> must obey four foundational mathematical axioms:
                </p>
                <ol className="list-decimal pl-5 space-y-1.5 text-sm text-muted-foreground font-mono">
                  <li><strong className="text-foreground">Non-negativity:</strong> d(x, y) ≥ 0</li>
                  <li><strong className="text-foreground">Identity of indiscernibles:</strong> d(x, y) = 0 ⟺ x = y</li>
                  <li><strong className="text-foreground">Symmetry:</strong> d(x, y) = d(y, x)</li>
                  <li><strong className="text-foreground">Triangle inequality:</strong> d(x, z) ≤ d(x, y) + d(y, z)</li>
                </ol>
                <p className="text-muted-foreground mt-2">
                  While Euclidean distance (<span className="font-mono">L₂</span> norm) is the default for K-Means, Manhattan (<span className="font-mono">L₁</span> norm), Cosine similarity (angle-based, ideal for text), and Mahalanobis distance (covariance-aware) are chosen depending on data geometry and noise properties.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-2xl text-foreground">Taxonomy of Clustering Paradigms</h3>
                <div className="space-y-4 my-4">
                  <div className="border-l-2 pl-4 py-1">
                    <h4 className="font-serif text-lg text-foreground">1. Partition-based (e.g., K-Means, K-Medoids)</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Divides data directly into <span className="font-mono">K</span> partitions by iteratively refining representative centers. Fast with complexity <span className="font-mono">O(n · K · i)</span>, but requires pre-specifying <span className="font-mono">K</span> and assumes spherical, convex cluster topologies.
                    </p>
                  </div>

                  <div className="border-l-2 pl-4 py-1">
                    <h4 className="font-serif text-lg text-foreground">2. Hierarchical (e.g., Agglomerative, Divisive)</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Constructs a tree-like hierarchy (dendrogram) by either iteratively merging nearest points (bottom-up) or splitting clusters (top-down). Does not require <span className="font-mono">K</span> in advance, but computationally demanding with <span className="font-mono">O(n² log n)</span> time complexity.
                    </p>
                  </div>

                  <div className="border-l-2 pl-4 py-1">
                    <h4 className="font-serif text-lg text-foreground">3. Density-based (e.g., DBSCAN, HDBSCAN)</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Defines clusters as continuous high-density regions separated by low-density margins. Excels at detecting clusters of arbitrary non-convex shapes and isolates outliers as noise, but struggles with varying density scales.
                    </p>
                  </div>

                  <div className="border-l-2 pl-4 py-1">
                    <h4 className="font-serif text-lg text-foreground">4. Distribution-based / Probabilistic (e.g., Gaussian Mixture Models)</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Assumes data is generated from a mixture of underlying parametric probability distributions (typically multivariate Gaussians). Provides "soft" probabilistic cluster memberships via Expectation-Maximization (EM).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Module 9: Real-World Applications & Production Trade-offs */}
          <section id="module-9" aria-labelledby="mod9-heading" className="scroll-mt-24 border-t pt-16">
            <SectionHeading
              number="01.9"
              title="Real-World Applications & Limitations"
              kicker="Applied Engineering"
              id="mod9-heading"
            />
            <div className="space-y-8 md:ml-24 text-base leading-relaxed">
              <div className="space-y-4">
                <h3 className="font-serif text-2xl text-foreground">Where K-Means Shines in Production</h3>
                <p className="text-muted-foreground">
                  Despite theoretical simplifications, K-Means is one of the most widely deployed unsupervised algorithms in production due to its linear computational scalability <span className="font-mono text-foreground">O(n · K · d)</span> and straightforward interpretability.
                </p>

                <div className="grid gap-6 sm:grid-cols-2 my-6">
                  <div className="border rounded-sm bg-paper p-5 space-y-2">
                    <div className="flex items-center gap-2 text-accent">
                      <Layers size={18} />
                      <h4 className="font-serif text-lg text-foreground font-medium">Customer Segmentation</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      E-commerce platforms group customers across normalized Recency, Frequency, and Monetary (RFM) vectors. Discovered centroids map directly to actionable cohorts such as "High-frequency VIPs", "At-risk churners", or "Occasional bargain hunters".
                    </p>
                  </div>

                  <div className="border rounded-sm bg-paper p-5 space-y-2">
                    <div className="flex items-center gap-2 text-accent">
                      <Sparkles size={18} />
                      <h4 className="font-serif text-lg text-foreground font-medium">Image Color Quantization</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      By clustering pixel RGB values (each an observation in <span className="font-mono">ℝ³</span>) into <span className="font-mono">K=16</span> or <span className="font-mono">K=64</span> centroids, images can be compressed dramatically by replacing millions of unique 24-bit RGB values with indices into a compact codebook.
                    </p>
                  </div>

                  <div className="border rounded-sm bg-paper p-5 space-y-2">
                    <div className="flex items-center gap-2 text-accent">
                      <Compass size={18} />
                      <h4 className="font-serif text-lg text-foreground font-medium">Geo-spatial Facility Placement</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Logistics companies cluster delivery coordinates into <span className="font-mono">K</span> fulfillment territories. Because K-Means minimizes squared Euclidean distance, the resulting centroid <span className="font-mono">μₖ</span> minimizes total fleet transport energy.
                    </p>
                  </div>

                  <div className="border rounded-sm bg-paper p-5 space-y-2">
                    <div className="flex items-center gap-2 text-accent">
                      <Database size={18} />
                      <h4 className="font-serif text-lg text-foreground font-medium">Nonlinear Feature Engineering</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      By computing the distance vector from each input sample <span className="font-mono">x</span> to all <span className="font-mono">K</span> learned cluster centroids, we construct a <span className="font-mono">K</span>-dimensional radial basis representation that empowers simple linear models to capture complex nonlinear boundaries.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-2xl text-foreground">Critical Limitations & Edge Cases</h3>
                <div className="rounded-sm border border-destructive/30 bg-destructive/5 p-5 text-sm space-y-3">
                  <div className="flex items-center gap-2 text-destructive font-medium">
                    <AlertCircle size={18} />
                    <span>When NOT to use K-Means</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-2 text-xs text-muted-foreground">
                    <li><strong>Non-spherical geometries:</strong> K-Means uses Euclidean distance from a central point, which inherently carves space with linear Voronoi tessellations. It cannot separate concentric rings, interlocking spirals, or crescent moons (use DBSCAN or Spectral Clustering instead).</li>
                    <li><strong>Clusters with unequal densities:</strong> A sparse cluster adjacent to a dense cluster will have its points stolen by the dense centroid because K-Means assumes uniform variance across all clusters.</li>
                    <li><strong>Outlier susceptibility:</strong> Because centroids are arithmetic means, extreme outliers exert disproportionate leverage, pulling centroids away from genuine data concentrations (use K-Medoids / PAM for robustness).</li>
                    <li><strong>Curse of dimensionality:</strong> In high dimensions (<span className="font-mono">d &gt; 50</span>), pairwise Euclidean distances concentrate around a narrow range, degrading the contrast between "near" and "far" (reduce dimensions first via PCA or UMAP).</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-sm border bg-paper p-6 mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="font-serif text-xl text-foreground">Ready to see the algorithm in motion?</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Watch centroids initialize, assign observations, and converge step-by-step in the interactive explorer.
                  </p>
                </div>
                <Link
                  to="/explorer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent"
                >
                  Launch Explorer <ArrowRight size={15} />
                </Link>
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
