import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ClusterFigure } from "@/components/site/ClusterFigure";
import { ModuleEntry } from "@/components/site/ModuleEntry";
import { Container, Placeholder, SectionHeading, VizFrame } from "@/components/site/primitives";
import { modules } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "An Interactive Study of K-Means — K-Means Lab" },
      { name: "description", content: "Learn the K-Means clustering algorithm through intuition, mathematics, interactive visualisation and code." },
      { property: "og:title", content: "An Interactive Study of K-Means — K-Means Lab" },
      { property: "og:description", content: "Learn the K-Means clustering algorithm through intuition, mathematics, interactive visualisation and code." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const journey = [
  ["Intuition", "Why grouping unlabelled data is useful."],
  ["Mechanism", "Assignment and update, step by step."],
  ["Mathematics", "Distance, centroids and the objective."],
  ["Practice", "From scratch, NumPy and scikit-learn."],
];
const topics = [
  { t: "Mathematical Foundations", to: "/mathematics", items: ["Euclidean distance", "Centroids", "WCSS", "Objective function"] },
  { t: "Implementation", to: "/implementation", items: ["Python from scratch", "NumPy", "scikit-learn", "Datasets"] },
  { t: "Evaluation", to: "/evaluation", items: ["Elbow method", "Silhouette score", "Choosing K", "Limitations"] },
] as const;

function Home() {
  return (
    <>
      <section className="border-b">
        <Container className="grid gap-12 py-14 md:grid-cols-[1.1fr_1fr] md:items-center md:py-20">
          <div>
            <p className="eyebrow mb-6">Vol. 1 · An interactive monograph</p>
            <h1 className="text-5xl leading-[1.02] md:text-7xl">
              Finding structure in <em className="text-accent">unlabelled</em> data.
            </h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-muted-foreground">
              A careful, visual study of the K-Means clustering algorithm — its intuition, its mathematics, and its use in practice.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-6 text-sm">
              <Link to="/learn" className="inline-flex items-center gap-2 rounded-sm bg-foreground px-5 py-3 text-background transition-colors hover:bg-accent">
                Begin the learning path <ArrowRight size={16} />
              </Link>
              <Link to="/explorer" className="border-b border-foreground pb-0.5 hover:border-accent hover:text-accent">Open the explorer</Link>
            </div>
          </div>
          <VizFrame title="Fig. 1 — Three clusters, k = 3" toolbar={<span className="font-mono text-xs text-muted-foreground">static preview</span>}>
            <div className="aspect-[10/9] p-4"><ClusterFigure /></div>
            <div className="flex gap-5 border-t px-4 py-2.5 font-mono text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-c1" /> C₁</span>
              <span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-c2" /> C₂</span>
              <span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-c3" /> C₃</span>
              <span className="ml-auto">◇ centroid</span>
            </div>
          </VizFrame>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading number="I." kicker="The journey" title="Four movements, one algorithm." />
          <ol className="grid border-t md:grid-cols-4 md:ml-16 lg:ml-20">
            {journey.map(([t, d], i) => (
              <li key={t} className="border-b py-6 md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <h3 className="mt-3 text-2xl">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t bg-paper py-20">
        <Container>
          <SectionHeading number="II." kicker="Contents" title="Topics covered" />
          <div className="md:ml-16 lg:ml-20">
            <ol>{modules.map((m) => <ModuleEntry key={m.n} {...m} compact />)}</ol>
            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {topics.map((t) => (
                <div key={t.t}>
                  <Link to={t.to} className="font-serif text-xl hover:text-accent">{t.t} →</Link>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {t.items.map((i) => <li key={i}>— {i}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t py-20">
        <Container className="grid gap-10 md:grid-cols-[1fr_1.3fr] md:items-center">
          <div>
            <SectionHeading number="III." kicker="Laboratory" title="Experiment with the algorithm." />
            <p className="max-w-md text-muted-foreground md:ml-16 lg:ml-20 leading-relaxed">
              Step through iterations in real time. Choose from four synthetic dataset distributions, adjust K from 1 to 8, compare K-Means++ against random initialization, and monitor WCSS convergence step by step.
            </p>
            <Link to="/explorer" className="mt-6 inline-flex items-center gap-2 border-b border-foreground pb-0.5 text-sm font-medium hover:border-accent hover:text-accent md:ml-16 lg:ml-20">
              Open the Algorithm Explorer <ArrowRight size={14} />
            </Link>
          </div>
          <VizFrame title="Interactive Simulation Preview" toolbar={<span className="font-mono text-xs text-accent">live interactive canvas</span>}>
            <div className="aspect-[16/10] p-4 bg-background">
              <ClusterFigure grouped={true} />
            </div>
            <div className="border-t px-4 py-2 text-xs font-mono text-muted-foreground flex justify-between">
              <span>Gaussian Blobs · K=3</span>
              <span className="text-foreground">Click 'Open Explorer' to run</span>
            </div>
          </VizFrame>
        </Container>
      </section>
    </>
  );
}
