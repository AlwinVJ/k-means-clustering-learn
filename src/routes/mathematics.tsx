import { createFileRoute } from "@tanstack/react-router";
import { BlockMath, Container, InlineMath, MathBlock, PageHeader, PrevNext, SectionHeading } from "@/components/site/primitives";

export const Route = createFileRoute("/mathematics")({
  head: () => ({
    meta: [
      { title: "Mathematical Foundations — K-Means Lab" },
      { name: "description", content: "A rigorous mathematical exploration of Euclidean distance, centroid optimization, WCSS, and Lloyd's coordinate descent." },
      { property: "og:title", content: "Mathematical Foundations — K-Means Lab" },
      { property: "og:description", content: "A rigorous mathematical exploration of Euclidean distance, centroid optimization, WCSS, and Lloyd's coordinate descent." },
      { property: "og:type", content: "article" },
    ],
  }),
  component: MathematicsPage,
});

const sections = [
  { id: "distance", title: "Euclidean Distance Metric" },
  { id: "centroid", title: "Centroid & Sample Mean" },
  { id: "wcss", title: "Within-Cluster Sum of Squares (WCSS)" },
  { id: "objective", title: "The Optimization Objective" },
  { id: "convergence", title: "Coordinate Descent & Convergence" },
];

function MathematicsPage() {
  return (
    <>
      <PageHeader
        index="03"
        title="Mathematical Foundations"
        lede="The complete algebraic and geometric machinery of K-Means: distance metrics, centroid optimality proofs, and objective function minimization."
        crumbs={[{ label: "Home", to: "/" }, { label: "Mathematical Foundations" }]}
        aside={
          <>
            <p className="eyebrow mb-2">Formal Theory</p>
            <p className="font-serif text-3xl text-foreground">5 Theorems</p>
            <p className="mt-1 text-sm text-muted-foreground">Derivations · Proofs · Examples</p>
          </>
        }
      />

      <Container className="grid gap-12 py-16 lg:grid-cols-[15rem_1fr]">
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
              <p className="font-medium text-foreground mb-1">Notation standard</p>
              <p className="leading-relaxed">
                Vectors are denoted in bold lower case (<span className="font-mono text-foreground font-semibold">x</span>, <span className="font-mono text-foreground font-semibold">μ</span>). Sets are denoted in script uppercase (<span className="font-mono text-foreground font-semibold">Cₖ</span>).
              </p>
            </div>
          </div>
        </nav>

        <article className="min-w-0 flex-1 space-y-24 max-w-5xl">
          {/* Section 1: Euclidean Distance */}
          <section id="distance" aria-labelledby="dist-heading" className="scroll-mt-24">
            <SectionHeading number="03.1" title="Euclidean Distance Metric" kicker="Geometric Foundation" id="dist-heading" />
            <div className="space-y-8 md:ml-16 lg:ml-20 text-[17px] sm:text-[18px] leading-[1.78]">
              <p className="text-muted-foreground">
                In classical K-Means, the proximity between an arbitrary observation vector <span className="font-mono text-foreground">x = (x₁, x₂, ..., x_d)ᵀ</span> and a reference point or centroid <span className="font-mono text-foreground">μ = (μ₁, μ₂, ..., μ_d)ᵀ</span> is measured using the standard <span className="font-mono text-foreground">L₂</span> (Euclidean) norm.
              </p>

              <div className="space-y-2">
                <h4 className="font-serif text-xl text-foreground">General d-Dimensional Formulation</h4>
                <p className="text-sm text-muted-foreground">
                  The Euclidean distance is the straight-line ruler distance between two points in Cartesian coordinate space:
                </p>
              </div>

              <MathBlock
                label="Euclidean Distance (L₂ Norm)"
                number="Eq. 1"
                math="d(x, \mu) = \|x - \mu\|_2 = \sqrt{\sum_{j=1}^d (x_j - \mu_j)^2}"
              />

              <div className="space-y-3">
                <h4 className="font-serif text-lg text-foreground">Squared Euclidean Distance</h4>
                <p className="text-sm text-muted-foreground">
                  Because the square root is a strictly monotonic transformation for non-negative arguments, minimizing the Euclidean distance is computationally and mathematically identical to minimizing the <em>squared Euclidean distance</em>:
                </p>
                <MathBlock
                  label="Squared Euclidean Distance"
                  number="Eq. 2"
                  math="\|x - \mu\|^2 = \sum_{j=1}^d (x_j - \mu_j)^2"
                />
                <p className="text-sm text-muted-foreground">
                  Working directly with squared distance eliminates unnecessary floating-point square root operations and provides continuous differentiability at every point.
                </p>
              </div>

              <div className="rounded-sm border bg-paper p-5 space-y-3">
                <p className="eyebrow text-accent">Worked Numerical Example</p>
                <p className="text-sm text-foreground">
                  Let an observation be <span className="font-mono font-medium">x = (2.0, 3.0)</span> and a centroid candidate be <span className="font-mono font-medium">μ = (5.0, 7.0)</span> in two dimensions (<span className="font-mono">d = 2</span>):
                </p>
                <div className="font-mono text-xs space-y-1.5 text-muted-foreground bg-background p-3 rounded border">
                  <p>1. Coordinate differences: Δx₁ = (2.0 − 5.0) = −3.0; Δx₂ = (3.0 − 7.0) = −4.0</p>
                  <p>2. Squared differences: (−3.0)² = 9.0; (−4.0)² = 16.0</p>
                  <p>3. Sum of squared differences: 9.0 + 16.0 = 25.0</p>
                  <p>4. Euclidean distance: d(x, μ) = √25.0 = 5.0 units</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-lg text-foreground">Why Does K-Means Rely on Euclidean Distance?</h4>
                <p className="text-sm text-muted-foreground">
                  K-Means is fundamentally tied to Euclidean distance because the mathematical mean of a collection of points is the <em>unique point that minimizes the sum of squared Euclidean distances</em> to all points in that collection. If one substitutes Manhattan (<span className="font-mono">L₁</span>) distance, the optimal center is the coordinate-wise <strong>median</strong> (yielding the K-Medians algorithm). If one uses arbitrary non-metric similarities, the algorithm is not guaranteed to converge.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Centroid Calculation */}
          <section id="centroid" aria-labelledby="cent-heading" className="scroll-mt-24 border-t pt-16">
            <SectionHeading number="03.2" title="Centroid & Sample Mean" kicker="Centroid Optimality" id="cent-heading" />
            <div className="space-y-8 md:ml-16 lg:ml-20 text-[17px] sm:text-[18px] leading-[1.78]">
              <p className="text-muted-foreground">
                Given a cluster partition <span className="font-mono text-foreground">Cₖ</span> consisting of <span className="font-mono text-foreground">|Cₖ|</span> observations, the representative prototype <span className="font-mono text-foreground">μₖ</span> is defined as the multi-dimensional arithmetic center of mass:
              </p>

              <MathBlock
                label="Centroid Vector Formulation"
                number="Eq. 3"
                math="\mu_k = \frac{1}{|C_k|} \sum_{x \in C_k} x"
              />

              <p className="text-sm text-muted-foreground">
                In coordinate-wise scalar form for each feature dimension <span className="font-mono text-foreground">j ∈ &#123;1, ..., d&#125;</span>:
              </p>

              <MathBlock
                label="Coordinate-Wise Component Mean"
                number="Eq. 4"
                math="\mu_{k, j} = \frac{1}{|C_k|} \sum_{x \in C_k} x_j"
              />

              <div className="rounded-sm border bg-paper p-5 space-y-3">
                <p className="eyebrow text-accent">Worked Numerical Example</p>
                <p className="text-sm text-foreground">
                  Suppose cluster <span className="font-mono">C₁</span> contains three 2D points: <span className="font-mono">p₁ = (1, 4)</span>, <span className="font-mono">p₂ = (3, 8)</span>, and <span className="font-mono">p₃ = (5, 6)</span> with <span className="font-mono">|C₁| = 3</span>:
                </p>
                <div className="font-mono text-xs space-y-1 text-muted-foreground bg-background p-3 rounded border">
                  <p>μ₁,₁ = (1 + 3 + 5) / 3 = 9 / 3 = 3.0</p>
                  <p>μ₁,₂ = (4 + 8 + 6) / 3 = 18 / 3 = 6.0</p>
                  <p>Updated centroid position: μ₁ = (3.0, 6.0)</p>
                </div>
              </div>

              <div className="border-l-2 pl-4 space-y-2">
                <h4 className="font-serif text-lg text-foreground">Proof of Centroid Optimality</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Why is the arithmetic mean the optimal center? Let <InlineMath math="f(c) = \sum_{i=1}^n \|x_i - c\|^2" /> be the sum of squared deviations from an arbitrary point <InlineMath math="c" />. Taking the gradient with respect to <InlineMath math="c" />:
                </p>
                <BlockMath
                  math="\nabla_c f(c) = \sum_{i=1}^n -2(x_i - c) = -2 \left( \sum_{i=1}^n x_i - n \cdot c \right)"
                  className="bg-paper p-2 rounded text-xs sm:text-sm"
                />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Setting the gradient to zero to find the stationary point:
                </p>
                <BlockMath
                  math="-2 \left( \sum_{i=1}^n x_i - n \cdot c \right) = 0 \implies n \cdot c = \sum_{i=1}^n x_i \implies c^* = \frac{1}{n} \sum_{i=1}^n x_i"
                  className="bg-paper p-2 rounded text-xs sm:text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  The Hessian matrix is <span className="font-mono">∇²_c f(c) = 2n · I &gt; 0</span> (strictly positive definite), proving that the sample mean is the unique global minimum of squared Euclidean deviations.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: WCSS */}
          <section id="wcss" aria-labelledby="wcss-heading" className="scroll-mt-24 border-t pt-16">
            <SectionHeading number="03.3" title="Within-Cluster Sum of Squares" kicker="Inertia & Compactness" id="wcss-heading" />
            <div className="space-y-8 md:ml-16 lg:ml-20 text-[17px] sm:text-[18px] leading-[1.78]">
              <p className="text-muted-foreground">
                The <strong>Within-Cluster Sum of Squares (WCSS)</strong>, often termed <em>Inertia</em> in software packages such as scikit-learn, aggregates the dispersion of all points around their assigned centroids across all <span className="font-mono text-foreground">K</span> clusters:
              </p>

              <MathBlock
                label="Within-Cluster Sum of Squares (WCSS / Inertia)"
                number="Eq. 5"
                math="\text{WCSS} = \sum_{k=1}^K \sum_{x \in C_k} \|x - \mu_k\|^2"
              />

              <div className="grid gap-4 sm:grid-cols-2 my-4">
                <div className="border p-4 rounded-sm bg-paper">
                  <h4 className="font-serif text-base font-medium text-foreground mb-1">Physical Analogy</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Borrowing directly from classical mechanics, WCSS represents the rotational moment of inertia of a system of particles rotating around their center of mass.
                  </p>
                </div>
                <div className="border p-4 rounded-sm bg-paper">
                  <h4 className="font-serif text-base font-medium text-foreground mb-1">Geometric Interpretation</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    WCSS measures the total geometric compactness. A smaller WCSS indicates tighter, denser clusters where points cluster closely around their prototypes.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-lg text-foreground">Behavior as K Increases</h4>
                <p className="text-sm text-muted-foreground">
                  As <span className="font-mono text-foreground">K</span> grows, WCSS decreases monotonically. In the extreme limit where <span className="font-mono text-foreground">K = n</span> (every point is its own centroid), <span className="font-mono text-foreground">WCSS = 0</span>. Thus, WCSS cannot be minimized unconditionally; it must be evaluated relative to model complexity (the Elbow Method).
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Objective Function */}
          <section id="objective" aria-labelledby="obj-heading" className="scroll-mt-24 border-t pt-16">
            <SectionHeading number="03.4" title="The Optimization Objective" kicker="Formal Loss Formulation" id="obj-heading" />
            <div className="space-y-8 md:ml-16 lg:ml-20 text-[17px] sm:text-[18px] leading-[1.78]">
              <p className="text-muted-foreground">
                Formally, K-Means is an optimization problem over two coupled sets of variables: the discrete cluster assignments and the continuous centroid coordinates.
              </p>

              <MathBlock
                label="K-Means Global Loss Function"
                number="Eq. 6"
                math="J(R, M) = \sum_{i=1}^n \sum_{k=1}^K r_{ik} \cdot \|x_i - \mu_k\|^2"
              />

              <div className="rounded-sm border bg-paper p-5 space-y-3">
                <h4 className="font-serif text-lg text-foreground">Symbol-by-Symbol Anatomy</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li><span className="font-mono font-medium text-foreground">n:</span> Total number of data samples in the dataset.</li>
                  <li><span className="font-mono font-medium text-foreground">K:</span> Number of target clusters (user-specified hyperparameter).</li>
                  <li><span className="font-mono font-medium text-foreground">xᵢ ∈ ℝᵈ:</span> The i-th observation feature vector.</li>
                  <li><span className="font-mono font-medium text-foreground">μₖ ∈ ℝᵈ:</span> The centroid prototype vector for cluster k.</li>
                  <li><span className="font-mono font-medium text-foreground"><InlineMath math="r_{ik} \in \{0, 1\}" />:</span> Binary assignment indicator (1 if observation xᵢ belongs to cluster k, 0 otherwise).</li>
                  <li><span className="font-mono font-medium text-foreground">Constraint:</span> <InlineMath math="\sum_{k=1}^K r_{ik} = 1" /> for all i (hard clustering: each point belongs to exactly one cluster).</li>
                  <li><span className="font-mono font-medium text-foreground"><InlineMath math="\|x_i - \mu_k\|^2" />:</span> Squared Euclidean distance between point xᵢ and centroid μₖ.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: Coordinate Descent & Convergence */}
          <section id="convergence" aria-labelledby="conv-heading" className="scroll-mt-24 border-t pt-16">
            <SectionHeading number="03.5" title="Coordinate Descent & Convergence" kicker="Lloyd's Algorithm" id="conv-heading" />
            <div className="space-y-8 md:ml-16 lg:ml-20 text-[17px] sm:text-[18px] leading-[1.78]">
              <p className="text-muted-foreground">
                Optimizing <span className="font-mono text-foreground">J(R, M)</span> simultaneously over discrete assignments <span className="font-mono text-foreground">R</span> and continuous centers <span className="font-mono text-foreground">M</span> is an NP-hard combinatorial problem. <strong>Lloyd's Algorithm (1957/1982)</strong> solves this via <em>block coordinate descent</em> (Expectation-Maximization), alternating between two optimal sub-steps:
              </p>

              <div className="space-y-4 my-6">
                <div className="border rounded-sm bg-paper p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-accent">Step 1 — Assignment Step (Hold M Fixed)</span>
                    <span className="font-mono text-xs text-muted-foreground">Expectation</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Given fixed centroid positions <span className="font-mono text-foreground">μ₁, ..., μₖ</span>, we minimize <span className="font-mono text-foreground">J</span> with respect to <span className="font-mono text-foreground">{"r_{ik}"}</span> independently for each point:
                  </p>
                  <p className="font-mono text-xs text-foreground bg-background p-2.5 rounded border">
                    {"r_{ik} = 1  if k = argmin_j ‖xᵢ − μⱼ‖²;  otherwise 0"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    This step partitions the feature space into Voronoi cells. Because each point selects its absolute closest centroid, <span className="font-mono text-foreground">J(R, M)</span> cannot increase.
                  </p>
                </div>

                <div className="border rounded-sm bg-paper p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-foreground">Step 2 — Centroid Update Step (Hold R Fixed)</span>
                    <span className="font-mono text-xs text-muted-foreground">Maximization</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Given fixed cluster assignments <span className="font-mono text-foreground">R</span>, we minimize <span className="font-mono text-foreground">J</span> with respect to <span className="font-mono text-foreground">μₖ</span>:
                  </p>
                  <p className="font-mono text-xs text-foreground bg-background p-2.5 rounded border">
                    {"μₖ = ( ∑_{i=1}^n r_{ik} · xᵢ ) / ( ∑_{i=1}^n r_{ik} )"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    By the centroid optimality proof above, this sample mean strictly minimizes the squared loss for the assigned partition. Thus, <span className="font-mono text-foreground">J(R, M)</span> again cannot increase.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-serif text-xl text-foreground">Guaranteed Finite Convergence</h4>
                <p className="text-sm text-muted-foreground">
                  Because:
                </p>
                <ol className="list-decimal pl-5 space-y-1.5 text-xs text-muted-foreground">
                  <li>The objective <span className="font-mono text-foreground">J(R, M)</span> is strictly non-increasing at every single sub-step (<span className="font-mono text-foreground">{"J^{t+1} ≤ J^t"}</span>).</li>
                  <li>The objective is bounded below by zero (<span className="font-mono text-foreground">J ≥ 0</span>).</li>
                  <li>There are only a finite number <span className="font-mono text-foreground">Kⁿ</span> of distinct possible partition assignments.</li>
                </ol>
                <p className="text-sm text-muted-foreground">
                  The algorithm <strong>must converge in a finite number of iterations</strong>. However, because <span className="font-mono text-foreground">J</span> is non-convex, it converges to a <em>local minimum</em>, not necessarily the global optimum. This justifies the necessity of smart initialization schemes such as <strong>K-Means++</strong>.
                </p>
              </div>
            </div>
          </section>
        </article>
      </Container>

      <PrevNext
        prev={{ to: "/explorer", label: "Algorithm Explorer" }}
        next={{ to: "/implementation", label: "Implementation" }}
      />
    </>
  );
}
