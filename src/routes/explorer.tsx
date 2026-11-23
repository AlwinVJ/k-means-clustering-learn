import { createFileRoute } from "@tanstack/react-router";
import { Pause, Play, RotateCcw, SkipForward, RefreshCw, CheckCircle2, Info, Sparkles } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Container, PageHeader, PrevNext, SectionHeading, VizFrame } from "@/components/site/primitives";
import {
  generatePoints,
  initCentroids,
  assignPoints,
  updateCentroids,
  CLUSTER_COLORS,
  type Point2D,
  type Centroid2D,
  type DatasetName,
  type InitMethod,
} from "@/lib/kmeans-engine";

export const Route = createFileRoute("/explorer")({
  head: () => ({
    meta: [
      { title: "Algorithm Explorer — K-Means Lab" },
      { name: "description", content: "An interactive laboratory for observing K-Means centroids, Voronoi partitions, and Lloyd's iterations in real time." },
      { property: "og:title", content: "Algorithm Explorer — K-Means Lab" },
      { property: "og:description", content: "An interactive laboratory for observing K-Means centroids, Voronoi partitions, and Lloyd's iterations in real time." },
      { property: "og:type", content: "article" },
    ],
  }),
  component: Explorer,
});

const datasetOptions: DatasetName[] = [
  "Gaussian blobs",
  "Uniform noise",
  "Concentric rings",
  "Anisotropic",
];

function Ctl({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b py-5">
      <p className="eyebrow mb-3">{label}</p>
      {children}
    </div>
  );
}

type StepPhase = "unassigned" | "assigned" | "updated" | "converged";

function Explorer() {
  const [k, setK] = useState(3);
  const [ds, setDs] = useState<DatasetName>("Gaussian blobs");
  const [initMethod, setInitMethod] = useState<InitMethod>("kmeans++");
  const [seed, setSeed] = useState(42);

  // Simulation state
  const [points, setPoints] = useState<Point2D[]>([]);
  const [centroids, setCentroids] = useState<Centroid2D[]>([]);
  const [iteration, setIteration] = useState(0);
  const [phase, setPhase] = useState<StepPhase>("unassigned");
  const [wcss, setWcss] = useState<number | null>(null);
  const [reassignedCount, setReassignedCount] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("Ready. Centroids initialized. Press Play or Step.");
  const [playing, setPlaying] = useState(false);

  // Initialize dataset & centroids
  const resetSimulation = useCallback(
    (newK = k, newDs = ds, newInit = initMethod, newSeed = seed) => {
      setPlaying(false);
      const newPoints = generatePoints(newDs, newSeed);
      const newCentroids = initCentroids(newPoints, newK, newInit, newSeed);
      setPoints(newPoints);
      setCentroids(newCentroids);
      setIteration(0);
      setPhase("unassigned");
      setWcss(null);
      setReassignedCount(null);
      setMessage(
        `Simulation reset. ${newK} centroids seeded via ${
          newInit === "kmeans++" ? "K-Means++" : "uniform random"
        }. Step 1 is Voronoi assignment.`
      );
    },
    [k, ds, initMethod, seed]
  );

  useEffect(() => {
    resetSimulation(k, ds, initMethod, seed);
  }, [k, ds, initMethod, seed, resetSimulation]);

  // Execute single sub-step (alternating between assign and update)
  const stepForward = useCallback(() => {
    if (phase === "converged") {
      setPlaying(false);
      return;
    }

    if (phase === "unassigned" || phase === "updated") {
      // 1. ASSIGNMENT STEP
      const { updatedPoints, reassignments, wcss: newWcss } = assignPoints(points, centroids);
      setPoints(updatedPoints);
      setWcss(newWcss);
      setReassignedCount(reassignments);

      if (iteration > 0 && reassignments === 0) {
        setPhase("converged");
        setPlaying(false);
        setMessage(
          `Converged at iteration ${iteration}! Zero points changed clusters. The objective function has stabilized.`
        );
      } else {
        setPhase("assigned");
        setMessage(
          `Iteration ${iteration + 1} (Assignment): Every point assigned to its nearest centroid. ${
            reassignments
          } points changed membership. Current WCSS: ${Math.round(newWcss).toLocaleString()}.`
        );
      }
    } else if (phase === "assigned") {
      // 2. UPDATE STEP
      const { updatedCentroids, maxShift } = updateCentroids(points, centroids);
      setCentroids(updatedCentroids);
      setIteration((prev) => prev + 1);

      if (maxShift < 0.25) {
        setPhase("converged");
        setPlaying(false);
        setMessage(
          `Converged at iteration ${iteration + 1}! Maximum centroid shift was ${maxShift.toFixed(
            2
          )}px (< 0.25px threshold). Local optimum reached.`
        );
      } else {
        setPhase("updated");
        setMessage(
          `Iteration ${iteration + 1} (Update): Centroids moved to arithmetic center of mass. Max shift: ${maxShift.toFixed(
            2
          )}px. Next: re-evaluate assignments.`
        );
      }
    }
  }, [phase, iteration, points, centroids]);

  // Animation runner
  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    if (playing) {
      timerRef.current = window.setInterval(() => {
        stepForward();
      }, 750);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing, stepForward]);

  const btnClass =
    "inline-flex size-10 items-center justify-center rounded-sm border transition-colors hover:border-foreground disabled:opacity-40";

  return (
    <>
      <PageHeader
        index="02"
        title="Algorithm Explorer"
        lede="An interactive laboratory exploring Lloyd's algorithm: watch centroids initialize, Voronoi partitions form, and centroids converge iteration by iteration."
        crumbs={[{ label: "Home", to: "/" }, { label: "Explorer" }]}
        aside={
          <>
            <p className="eyebrow mb-2">Simulation Engine</p>
            <p className="font-serif text-3xl text-foreground">Interactive</p>
            <p className="mt-1 text-sm text-muted-foreground">K-Means++ · Real-time WCSS</p>
          </>
        }
      />

      <Container className="grid gap-8 py-12 lg:grid-cols-[1fr_19rem]">
        {/* Main Canvas & Controls */}
        <VizFrame
          title={`Plot · ${ds} · K = ${k}`}
          toolbar={
            <div className="flex items-center gap-3 font-mono text-xs">
              <span>
                iteration <strong className="text-accent">{iteration}</strong>
              </span>
              <span className="text-border">|</span>
              <span className="capitalize">{phase}</span>
            </div>
          }
        >
          {/* SVG Canvas */}
          <div className="aspect-[4/3] p-2 md:p-4 bg-background">
            <svg
              viewBox="0 0 500 380"
              className="h-full w-full select-none"
              role="img"
              aria-label="K-Means 2D Scatter Simulation Plot"
            >
              {/* Background Coordinate Grid */}
              {[60, 120, 180, 240, 300].map((y) => (
                <line
                  key={`gy-${y}`}
                  x1="20"
                  x2="480"
                  y1={y}
                  y2={y}
                  stroke="currentColor"
                  strokeOpacity="0.06"
                  strokeWidth="0.75"
                />
              ))}
              {[100, 200, 300, 400].map((x) => (
                <line
                  key={`gx-${x}`}
                  x1={x}
                  x2={x}
                  y1="20"
                  y2="360"
                  stroke="currentColor"
                  strokeOpacity="0.06"
                  strokeWidth="0.75"
                />
              ))}

              {/* Connecting vectors from point to assigned centroid */}
              {phase !== "unassigned" &&
                points.map((p) => {
                  if (p.cluster < 0 || !centroids[p.cluster]) return null;
                  const c = centroids[p.cluster]!;
                  return (
                    <line
                      key={`line-${p.id}`}
                      x1={p.x}
                      y1={p.y}
                      x2={c.x}
                      y2={c.y}
                      stroke={c.color}
                      strokeWidth="0.5"
                      strokeOpacity="0.25"
                    />
                  );
                })}

              {/* Centroid historical motion trails (shift vectors) */}
              {centroids.map((c) => {
                if (c.prevX === undefined || c.prevY === undefined) return null;
                return (
                  <g key={`trail-${c.id}`}>
                    <line
                      x1={c.prevX}
                      y1={c.prevY}
                      x2={c.x}
                      y2={c.y}
                      stroke={c.color}
                      strokeWidth="1.75"
                      strokeDasharray="3 3"
                    />
                    <circle
                      cx={c.prevX}
                      cy={c.prevY}
                      r="2.5"
                      fill="none"
                      stroke={c.color}
                      strokeWidth="1"
                    />
                  </g>
                );
              })}

              {/* Data points */}
              {points.map((p) => {
                const color =
                  p.cluster >= 0 && CLUSTER_COLORS[p.cluster]
                    ? CLUSTER_COLORS[p.cluster]
                    : "var(--muted-foreground)";
                return (
                  <circle
                    key={`pt-${p.id}`}
                    cx={p.x}
                    cy={p.y}
                    r={phase === "unassigned" ? 3.5 : 4}
                    fill={color}
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Centroids Prototypes */}
              {centroids.map((c, i) => (
                <g key={`cent-${c.id}`} transform={`translate(${c.x}, ${c.y})`} className="transition-transform duration-500">
                  {/* Halo */}
                  <circle cx="0" cy="0" r="14" fill={c.color} fillOpacity="0.18" />
                  {/* Diamond marker */}
                  <rect
                    x="-7"
                    y="-7"
                    width="14"
                    height="14"
                    transform="rotate(45)"
                    fill="var(--background)"
                    stroke="var(--foreground)"
                    strokeWidth="2"
                  />
                  <circle cx="0" cy="0" r="2.5" fill={c.color} />
                  {/* Text label */}
                  <text
                    x="11"
                    y="-9"
                    className="fill-foreground font-mono font-medium text-[11px]"
                  >
                    μ{i + 1}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Interactive Controls Toolbar */}
          <div className="flex flex-wrap items-center gap-2 border-t px-4 py-3 bg-paper">
            <button
              className={btnClass}
              aria-label={playing ? "Pause" : "Play"}
              onClick={() => {
                if (phase === "converged") resetSimulation();
                setPlaying((p) => !p);
              }}
              title={playing ? "Pause simulation" : "Play continuous iterations"}
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <button
              className={btnClass}
              aria-label="Step one sub-iteration"
              onClick={stepForward}
              disabled={phase === "converged"}
              title="Step forward one phase (Assignment ↔ Centroid Update)"
            >
              <SkipForward size={16} />
            </button>

            <button
              className={btnClass}
              aria-label="Reset simulation"
              onClick={() => resetSimulation()}
              title="Reset simulation to initial state"
            >
              <RotateCcw size={16} />
            </button>

            <button
              className={btnClass}
              aria-label="Re-seed starting centroids"
              onClick={() => setSeed((s) => s + 7)}
              title="Re-seed with fresh random centroids"
            >
              <RefreshCw size={15} />
            </button>

            <span className="ml-auto flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className={`size-2 rounded-full ${playing ? "bg-accent animate-pulse" : "bg-muted-foreground"}`} />
              {playing ? "Running" : phase === "converged" ? "Converged" : "Idle"}
            </span>
          </div>

          {/* Live Pedagogical Explanation Banner */}
          <div className="border-t px-4 py-3 bg-background flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
            <Info size={16} className="text-accent shrink-0 mt-0.5" />
            <p className="font-mono text-[11px] text-foreground">{message}</p>
          </div>
        </VizFrame>

        {/* Sidebar Controls */}
        <aside aria-label="Controls" className="border-t lg:border-t-0 space-y-1">
          <Ctl label="Number of clusters (K)">
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={1}
                max={8}
                value={k}
                onChange={(e) => setK(+e.target.value)}
                className="flex-1 accent-[var(--accent)]"
                aria-label="Number of clusters K"
              />
              <span className="w-6 text-right font-mono font-medium text-foreground">{k}</span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">
              Changes partition capacity. Standard choice for Gaussian blobs is K=3.
            </p>
          </Ctl>

          <Ctl label="Dataset Distribution">
            <ul className="space-y-1">
              {datasetOptions.map((d) => (
                <li key={d}>
                  <button
                    onClick={() => setDs(d)}
                    aria-pressed={d === ds}
                    className={`w-full py-1 text-left text-xs transition-colors flex items-center gap-2 ${
                      d === ds
                        ? "text-accent font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{d === ds ? "●" : "○"}</span>
                    <span>{d}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Ctl>

          <Ctl label="Seeding Algorithm">
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                onClick={() => setInitMethod("kmeans++")}
                className={`py-1.5 px-2 border rounded-sm transition-colors text-center ${
                  initMethod === "kmeans++"
                    ? "bg-foreground text-background border-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                K-Means++
              </button>
              <button
                onClick={() => setInitMethod("random")}
                className={`py-1.5 px-2 border rounded-sm transition-colors text-center ${
                  initMethod === "random"
                    ? "bg-foreground text-background border-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Random
              </button>
            </div>
          </Ctl>

          <Ctl label="Simulation Telemetry">
            <dl className="grid grid-cols-2 gap-y-1.5 font-mono text-xs">
              <dt className="text-muted-foreground">Iteration</dt>
              <dd className="font-medium text-foreground">{iteration}</dd>

              <dt className="text-muted-foreground">Phase</dt>
              <dd className="capitalize font-medium text-foreground">{phase}</dd>

              <dt className="text-muted-foreground">WCSS (Inertia)</dt>
              <dd className="font-medium text-accent">
                {wcss !== null ? Math.round(wcss).toLocaleString() : "—"}
              </dd>

              <dt className="text-muted-foreground">Reassigned</dt>
              <dd className="font-medium text-foreground">
                {reassignedCount !== null ? reassignedCount : "—"}
              </dd>

              <dt className="text-muted-foreground">Status</dt>
              <dd className="font-medium text-foreground">
                {phase === "converged" ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Converged ✓</span>
                ) : (
                  "Optimizing..."
                )}
              </dd>
            </dl>
          </Ctl>

          <Ctl label="Visual Legend">
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-muted-foreground">
                <i className="size-2 rounded-full bg-muted-foreground" />
                <span>Unassigned observation</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <i className="size-2 rounded-full bg-c1" />
                <span>Assigned point (cluster hue)</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <i className="size-2.5 rotate-45 border-[1.5px] border-foreground bg-background" />
                <span>Centroid prototype (μₖ)</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <span className="w-3 border-b-2 border-dashed border-foreground" />
                <span>Centroid motion vector</span>
              </li>
            </ul>
          </Ctl>
        </aside>
      </Container>

      {/* Comprehensive Educational Theory (Modules 3 & 5) */}
      <section className="border-t py-16 bg-paper">
        <Container className="space-y-20">
          {/* Module 3: Fundamentals */}
          <div>
            <SectionHeading
              number="02.1"
              title="K-Means Clustering Fundamentals"
              kicker="Module 3"
              id="fundamentals"
            />
            <div className="space-y-6 md:ml-24 max-w-3xl text-base leading-relaxed text-muted-foreground">
              <p>
                <strong>What is K-Means?</strong> Proposed in its standard form by Stuart Lloyd in 1957 (and published in 1982), K-Means is a partition-based clustering algorithm. Its name derives directly from its mechanism: the algorithm partitions a collection of vectors into <strong>K</strong> groups by repeatedly positioning each group's center at the mathematical <strong>Mean</strong> of its members.
              </p>

              <div className="grid gap-6 sm:grid-cols-2 my-6">
                <div className="border p-5 rounded-sm bg-background space-y-2">
                  <h4 className="font-serif text-lg font-medium text-foreground">What is a Centroid?</h4>
                  <p className="text-xs leading-relaxed">
                    A <strong>centroid</strong> (<span className="font-mono">μₖ</span>) is the representative center-of-gravity prototype for cluster <span className="font-mono">k</span>. It does not need to coincide with an actual observed sample from the dataset; it lives in continuous coordinate space as the arithmetic mean of all points assigned to that cluster.
                  </p>
                </div>

                <div className="border p-5 rounded-sm bg-background space-y-2">
                  <h4 className="font-serif text-lg font-medium text-foreground">What is a Cluster?</h4>
                  <p className="text-xs leading-relaxed">
                    A <strong>cluster</strong> (<span className="font-mono">Cₖ</span>) is the set of all observations that are closer to centroid <span className="font-mono">μₖ</span> than to any other centroid. This geometric rule carves the feature space into convex polygonal convex regions known as a <strong>Voronoi Diagram</strong>.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-xl text-foreground">Why Do Centroids Move?</h4>
                <p className="text-sm">
                  Centroids move because point assignments change. When an observation transitions to a new cluster, the balance of mass shifts. Recalculating the arithmetic mean recalculates the exact point in space that minimizes the sum of squared Euclidean distances to all newly assigned members, continuously pulling total WCSS downward.
                </p>
              </div>
            </div>
          </div>

          {/* Module 5: How K-Means Works (7 Steps) */}
          <div className="border-t pt-16">
            <SectionHeading
              number="02.2"
              title="How K-Means Works: The 7-Step Algorithm"
              kicker="Module 5"
              id="algorithm-steps"
            />
            <div className="space-y-8 md:ml-24 max-w-3xl text-base leading-relaxed text-muted-foreground">
              <p>
                Lloyd's algorithm executes through seven deterministic stages:
              </p>

              <ol className="space-y-6">
                <li className="border-l-2 pl-4 py-1">
                  <h4 className="font-serif text-lg text-foreground font-medium">1. Choose the Number of Clusters (K)</h4>
                  <p className="text-sm mt-1">
                    The user defines the hyperparameter <span className="font-mono text-foreground font-medium">K</span> based on domain requirements or diagnostic heuristics (such as the Elbow Method or Silhouette Score).
                  </p>
                </li>

                <li className="border-l-2 pl-4 py-1">
                  <h4 className="font-serif text-lg text-foreground font-medium">2. Initialize Centroid Prototypes</h4>
                  <p className="text-sm mt-1">
                    Initial coordinates are seeded using either <strong>Uniform Random Selection</strong> (arbitrary data samples) or <strong>K-Means++</strong> (which chooses the first centroid at random and subsequent centroids with probability proportional to their squared distance from existing centroids, avoiding poor local minima).
                  </p>
                </li>

                <li className="border-l-2 pl-4 py-1">
                  <h4 className="font-serif text-lg text-foreground font-medium">3. Compute Pairwise Euclidean Distances</h4>
                  <p className="text-sm mt-1">
                    For every observation vector <span className="font-mono text-foreground font-medium">xᵢ</span> and every centroid candidate <span className="font-mono text-foreground font-medium">μₖ</span>, compute the distance <span className="font-mono text-foreground font-medium">d(xᵢ, μₖ) = √(∑(x_ij − μ_kj)²)</span>.
                  </p>
                </li>

                <li className="border-l-2 pl-4 py-1">
                  <h4 className="font-serif text-lg text-foreground font-medium">4. Voronoi Assignment Step</h4>
                  <p className="text-sm mt-1">
                    Assign each observation <span className="font-mono text-foreground font-medium">xᵢ</span> to its strictly nearest centroid: <span className="font-mono text-foreground font-medium">c(i) = argmin_k ‖xᵢ − μₖ‖²</span>.
                  </p>
                </li>

                <li className="border-l-2 pl-4 py-1">
                  <h4 className="font-serif text-lg text-foreground font-medium">5. Centroid Repositioning (Update Step)</h4>
                  <p className="text-sm mt-1">
                    Recalculate the position of each centroid by taking the arithmetic mean of all points assigned to that cluster: <span className="font-mono text-foreground font-medium">μₖ = (1 / |Cₖ|) ∑_(x ∈ Cₖ) x</span>.
                  </p>
                </li>

                <li className="border-l-2 pl-4 py-1">
                  <h4 className="font-serif text-lg text-foreground font-medium">6. Iterate</h4>
                  <p className="text-sm mt-1">
                    Repeat steps 3, 4, and 5. With each cycle, the assignment step reduces error for the given centroids, and the update step reduces error for the given assignments.
                  </p>
                </li>

                <li className="border-l-2 pl-4 py-1">
                  <h4 className="font-serif text-lg text-foreground font-medium">7. Convergence Check & Halting Criteria</h4>
                  <p className="text-sm mt-1">
                    The algorithm stops when any of three conditions are satisfied:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
                    <li><strong>Zero reassignment:</strong> No points switch cluster membership between iterations.</li>
                    <li><strong>Centroid stability:</strong> Total centroid displacement is less than a tolerance threshold (<span className="font-mono">Δμ &lt; ε</span>).</li>
                    <li><strong>Iteration limit:</strong> The maximum iteration cap (<span className="font-mono">max_iter = 300</span>) is reached.</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <PrevNext
        prev={{ to: "/learn", label: "Learning Path" }}
        next={{ to: "/mathematics", label: "Mathematics" }}
      />
    </>
  );
}
