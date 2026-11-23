// Static, deterministic scatter used as a visual motif (not the algorithm).
const clusters = [
  { cx: 120, cy: 130, cls: "fill-c1", stroke: "stroke-c1" },
  { cx: 300, cy: 95, cls: "fill-c2", stroke: "stroke-c2" },
  { cx: 245, cy: 265, cls: "fill-c3", stroke: "stroke-c3" },
];
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}
const points = clusters.flatMap((c, ci) =>
  Array.from({ length: 22 }, (_, i) => {
    const a = rand(ci * 100 + i) * Math.PI * 2;
    const r = Math.sqrt(rand(ci * 100 + i + 50)) * 58;
    return { x: c.cx + Math.cos(a) * r, y: c.cy + Math.sin(a) * r * 0.85, ci };
  }),
);

export function ClusterFigure({ grouped = true }: { grouped?: boolean }) {
  return (
    <svg viewBox="0 0 400 360" className="h-full w-full" role="img" aria-label="Scattered points grouped into three clusters around centroids">
      {[60, 120, 180, 240, 300].map((y) => <line key={y} x1="20" x2="390" y1={y} y2={y} className="stroke-border" strokeWidth="0.5" />)}
      <line x1="20" y1="340" x2="390" y2="340" className="stroke-foreground" strokeWidth="0.75" />
      <line x1="20" y1="20" x2="20" y2="340" className="stroke-foreground" strokeWidth="0.75" />
      {grouped && clusters.map((c, i) => (
        <ellipse key={i} cx={c.cx} cy={c.cy} rx="72" ry="62" className={`fill-none ${c.stroke}`} strokeWidth="0.75" strokeDasharray="2 4" />
      ))}
      {points.map((p, i) => (
        <g key={i}>
          {grouped && <line x1={p.x} y1={p.y} x2={clusters[p.ci]!.cx} y2={clusters[p.ci]!.cy} className={clusters[p.ci]!.stroke} strokeWidth="0.3" opacity="0.5" />}
          <circle cx={p.x} cy={p.y} r="3" className={grouped ? clusters[p.ci]!.cls : "fill-muted-foreground"} />
        </g>
      ))}
      {grouped && clusters.map((c, i) => (
        <g key={i} transform={`translate(${c.cx} ${c.cy})`}>
          <rect x="-6" y="-6" width="12" height="12" transform="rotate(45)" className="fill-background stroke-foreground" strokeWidth="1.5" />
          <text x="12" y="-10" className="fill-foreground font-mono" fontSize="10">μ{i + 1}</text>
        </g>
      ))}
    </svg>
  );
}
