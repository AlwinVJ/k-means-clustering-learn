import { createFileRoute } from "@tanstack/react-router";
import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { useState } from "react";
import { ClusterFigure } from "@/components/site/ClusterFigure";
import { Container, PageHeader, PrevNext, VizFrame } from "@/components/site/primitives";

export const Route = createFileRoute("/explorer")({
  head: () => ({
    meta: [
      { title: "Algorithm Explorer — K-Means Lab" },
      { name: "description", content: "An interactive workspace for watching K-Means assign points and move centroids, iteration by iteration." },
      { property: "og:title", content: "Algorithm Explorer — K-Means Lab" },
      { property: "og:description", content: "An interactive workspace for watching K-Means assign points and move centroids, iteration by iteration." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Explorer,
});

const datasets = ["Gaussian blobs", "Uniform noise", "Concentric rings", "Anisotropic"];

function Ctl({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="border-b py-5"><p className="eyebrow mb-3">{label}</p>{children}</div>;
}

function Explorer() {
  const [k, setK] = useState(3);
  const [playing, setPlaying] = useState(false);
  const [ds, setDs] = useState(datasets[0]);
  const btn = "inline-flex size-10 items-center justify-center rounded-sm border transition-colors hover:border-foreground disabled:opacity-40";
  return (
    <>
      <PageHeader index="02" title="Algorithm Explorer" lede="Interface preview. The clustering engine will be connected in a later phase; controls are not yet functional." crumbs={[{ label: "Home", to: "/" }, { label: "Explorer" }]} />
      <Container className="grid gap-8 py-12 lg:grid-cols-[1fr_18rem]">
        <VizFrame title={`Plot · ${ds} · k = ${k}`} toolbar={<span className="font-mono text-xs">iteration <span className="text-accent">0</span> / —</span>}>
          <div className="aspect-[4/3] p-4 md:p-8"><ClusterFigure grouped={false} /></div>
          <div className="flex flex-wrap items-center gap-2 border-t px-4 py-3">
            <button className={btn} aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying((p) => !p)}>{playing ? <Pause size={16} /> : <Play size={16} />}</button>
            <button className={btn} aria-label="Step one iteration"><SkipForward size={16} /></button>
            <button className={btn} aria-label="Reset" onClick={() => setPlaying(false)}><RotateCcw size={16} /></button>
            <span className="ml-auto font-mono text-xs text-muted-foreground">{playing ? "running (preview)" : "idle"}</span>
          </div>
        </VizFrame>
        <aside aria-label="Controls" className="border-t lg:border-t-0">
          <Ctl label="Number of clusters (K)">
            <div className="flex items-center gap-3">
              <input type="range" min={1} max={8} value={k} onChange={(e) => setK(+e.target.value)} className="flex-1 accent-[var(--accent)]" aria-label="K" />
              <span className="w-6 text-right font-mono">{k}</span>
            </div>
          </Ctl>
          <Ctl label="Dataset">
            <ul className="space-y-1">
              {datasets.map((d) => (
                <li key={d}><button onClick={() => setDs(d)} aria-pressed={d === ds} className={`w-full py-1 text-left text-sm ${d === ds ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}>{d === ds ? "● " : "○ "}{d}</button></li>
              ))}
            </ul>
          </Ctl>
          <Ctl label="Iteration">
            <dl className="grid grid-cols-2 gap-y-1 font-mono text-sm"><dt className="text-muted-foreground">step</dt><dd>0</dd><dt className="text-muted-foreground">WCSS</dt><dd>—</dd><dt className="text-muted-foreground">converged</dt><dd>—</dd></dl>
          </Ctl>
          <Ctl label="Legend">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><i className="size-2 rounded-full bg-muted-foreground" /> Unassigned point</li>
              <li className="flex items-center gap-2"><i className="size-2 rounded-full bg-c1" /> Assigned point (cluster colour)</li>
              <li className="flex items-center gap-2"><i className="size-2.5 rotate-45 border-[1.5px] border-foreground" /> Centroid</li>
            </ul>
          </Ctl>
        </aside>
      </Container>
      <PrevNext prev={{ to: "/learn", label: "Learning Path" }} next={{ to: "/mathematics", label: "Mathematics" }} />
    </>
  );
}
