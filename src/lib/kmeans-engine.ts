export interface Point2D {
  id: number;
  x: number;
  y: number;
  cluster: number; // -1 if unassigned, 0..K-1
}

export interface Centroid2D {
  id: number;
  x: number;
  y: number;
  prevX?: number;
  prevY?: number;
  color: string;
}

export type DatasetName =
  | "Gaussian blobs"
  | "Uniform noise"
  | "Concentric rings"
  | "Anisotropic";

export type InitMethod = "kmeans++" | "random";

export const CLUSTER_COLORS = [
  "var(--c1)", // Terracotta
  "var(--c2)", // Sage
  "var(--c3)", // Slate blue
  "var(--c4)", // Warm amber
  "oklch(0.55 0.12 320)", // Dusty plum
  "oklch(0.45 0.09 190)", // Ocean teal
  "oklch(0.62 0.13 65)",  // Ochre
  "oklch(0.48 0.12 280)", // Indigo
];

// Linear congruential pseudo-random generator for deterministic repeatability
function createPRNG(seed: number) {
  let s = Math.abs(seed) % 2147483647;
  if (s === 0) s = 123456789;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generatePoints(type: DatasetName, seed = 42): Point2D[] {
  const rand = createPRNG(seed);
  const points: Point2D[] = [];
  let id = 0;

  if (type === "Gaussian blobs") {
    // 3 distinct Gaussian centers within 500x380 viewbox
    const centers = [
      { cx: 140, cy: 130, std: 32, count: 35 },
      { cx: 360, cy: 120, std: 28, count: 35 },
      { cx: 250, cy: 280, std: 34, count: 40 },
    ];
    for (const c of centers) {
      for (let i = 0; i < c.count; i++) {
        // Box-Muller transform for normal distribution
        const u1 = Math.max(rand(), 1e-7);
        const u2 = rand();
        const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
        const x = Math.max(25, Math.min(475, c.cx + z0 * c.std));
        const y = Math.max(25, Math.min(355, c.cy + z1 * c.std));
        points.push({ id: id++, x, y, cluster: -1 });
      }
    }
  } else if (type === "Uniform noise") {
    // 100 uniformly scattered points across space
    for (let i = 0; i < 100; i++) {
      const x = 35 + rand() * 430;
      const y = 35 + rand() * 310;
      points.push({ id: id++, x, y, cluster: -1 });
    }
  } else if (type === "Concentric rings") {
    // Inner compact circle and outer circular band
    const center = { cx: 250, cy: 190 };
    // Inner ring (40 points)
    for (let i = 0; i < 40; i++) {
      const angle = rand() * Math.PI * 2;
      const r = 20 + rand() * 35;
      points.push({
        id: id++,
        x: center.cx + Math.cos(angle) * r,
        y: center.cy + Math.sin(angle) * r * 0.9,
        cluster: -1,
      });
    }
    // Outer ring (70 points)
    for (let i = 0; i < 70; i++) {
      const angle = rand() * Math.PI * 2;
      const r = 110 + rand() * 35;
      points.push({
        id: id++,
        x: center.cx + Math.cos(angle) * r,
        y: center.cy + Math.sin(angle) * r * 0.85,
        cluster: -1,
      });
    }
  } else if (type === "Anisotropic") {
    // Elongated ellipsoidal clusters along diagonals
    const clusters = [
      { cx: 160, cy: 140, angle: Math.PI / 4, count: 45 },
      { cx: 330, cy: 240, angle: Math.PI / 4, count: 45 },
    ];
    for (const c of clusters) {
      for (let i = 0; i < c.count; i++) {
        const u1 = Math.max(rand(), 1e-7);
        const u2 = rand();
        const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2) * 65;
        const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2) * 14;
        // Rotate by cluster angle
        const rx = z0 * Math.cos(c.angle) - z1 * Math.sin(c.angle);
        const ry = z0 * Math.sin(c.angle) + z1 * Math.cos(c.angle);
        points.push({
          id: id++,
          x: Math.max(30, Math.min(470, c.cx + rx)),
          y: Math.max(30, Math.min(350, c.cy + ry)),
          cluster: -1,
        });
      }
    }
  }

  return points;
}

export function distSq(p1: { x: number; y: number }, p2: { x: number; y: number }): number {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return dx * dx + dy * dy;
}

export function initCentroids(
  points: Point2D[],
  k: number,
  method: InitMethod = "kmeans++",
  seed = 42
): Centroid2D[] {
  if (points.length === 0 || k <= 0) return [];
  const rand = createPRNG(seed);
  const centroids: Centroid2D[] = [];

  if (method === "random") {
    // Uniform random pick without replacement
    const shuffled = [...points].sort(() => rand() - 0.5);
    for (let i = 0; i < k; i++) {
      const pt = shuffled[i % shuffled.length]!;
      centroids.push({
        id: i,
        x: pt.x,
        y: pt.y,
        color: CLUSTER_COLORS[i % CLUSTER_COLORS.length]!,
      });
    }
    return centroids;
  }

  // K-Means++ Algorithm:
  // 1. First centroid chosen uniformly at random
  const firstIndex = Math.floor(rand() * points.length);
  const firstPt = points[firstIndex]!;
  centroids.push({
    id: 0,
    x: firstPt.x,
    y: firstPt.y,
    color: CLUSTER_COLORS[0]!,
  });

  // 2. Select remaining k-1 centroids with probability proportional to D(x)^2
  for (let cIdx = 1; cIdx < k; cIdx++) {
    const distancesSq: number[] = [];
    let sumDistSq = 0;

    for (const pt of points) {
      let minDistSq = Infinity;
      for (const c of centroids) {
        const d = distSq(pt, c);
        if (d < minDistSq) minDistSq = d;
      }
      distancesSq.push(minDistSq);
      sumDistSq += minDistSq;
    }

    // Roulette-wheel selection
    const target = rand() * sumDistSq;
    let running = 0;
    let selectedIdx = 0;
    for (let i = 0; i < distancesSq.length; i++) {
      running += distancesSq[i]!;
      if (running >= target) {
        selectedIdx = i;
        break;
      }
    }

    const chosenPt = points[selectedIdx]!;
    centroids.push({
      id: cIdx,
      x: chosenPt.x,
      y: chosenPt.y,
      color: CLUSTER_COLORS[cIdx % CLUSTER_COLORS.length]!,
    });
  }

  return centroids;
}

export function assignPoints(
  points: Point2D[],
  centroids: Centroid2D[]
): { updatedPoints: Point2D[]; reassignments: number; wcss: number } {
  let reassignments = 0;
  let wcss = 0;

  const updatedPoints = points.map((p) => {
    let nearestIdx = 0;
    let minD = Infinity;

    for (let i = 0; i < centroids.length; i++) {
      const d = distSq(p, centroids[i]!);
      if (d < minD) {
        minD = d;
        nearestIdx = i;
      }
    }

    if (p.cluster !== nearestIdx) {
      reassignments++;
    }
    wcss += minD;

    return {
      ...p,
      cluster: nearestIdx,
    };
  });

  return { updatedPoints, reassignments, wcss };
}

export function updateCentroids(
  points: Point2D[],
  centroids: Centroid2D[]
): { updatedCentroids: Centroid2D[]; maxShift: number } {
  let maxShift = 0;

  const updatedCentroids = centroids.map((c, i) => {
    const members = points.filter((p) => p.cluster === i);

    if (members.length === 0) {
      // Empty cluster edge case: preserve existing or perturb
      return { ...c, prevX: c.x, prevY: c.y };
    }

    const meanX = members.reduce((sum, p) => sum + p.x, 0) / members.length;
    const meanY = members.reduce((sum, p) => sum + p.y, 0) / members.length;

    const shift = Math.sqrt(distSq({ x: c.x, y: c.y }, { x: meanX, y: meanY }));
    if (shift > maxShift) maxShift = shift;

    return {
      ...c,
      prevX: c.x,
      prevY: c.y,
      x: meanX,
      y: meanY,
    };
  });

  return { updatedCentroids, maxShift };
}
