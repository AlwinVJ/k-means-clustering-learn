import { describe, expect, it } from "vitest";
import {
  generatePoints,
  initCentroids,
  assignPoints,
  updateCentroids,
  distSq,
} from "../lib/kmeans-engine";

describe("K-Means Simulation Engine", () => {
  it("generates deterministic dataset points", () => {
    const pts1 = generatePoints("Gaussian blobs", 42);
    const pts2 = generatePoints("Gaussian blobs", 42);
    expect(pts1.length).toBe(110);
    expect(pts1[0]?.x).toBe(pts2[0]?.x);
    expect(pts1[0]?.y).toBe(pts2[0]?.y);
  });

  it("calculates squared Euclidean distance correctly", () => {
    const p1 = { x: 2, y: 3 };
    const p2 = { x: 5, y: 7 };
    expect(distSq(p1, p2)).toBe(25);
  });

  it("initializes K centroids using K-Means++", () => {
    const pts = generatePoints("Gaussian blobs", 42);
    const centroids = initCentroids(pts, 3, "kmeans++", 42);
    expect(centroids.length).toBe(3);
    // Centroids should be distinct
    expect(centroids[0]?.x).not.toBe(centroids[1]?.x);
  });

  it("assigns points and computes WCSS", () => {
    const pts = generatePoints("Gaussian blobs", 42);
    const centroids = initCentroids(pts, 3, "kmeans++", 42);
    const { updatedPoints, wcss } = assignPoints(pts, centroids);

    expect(updatedPoints.every((p) => p.cluster >= 0 && p.cluster < 3)).toBe(true);
    expect(wcss).toBeGreaterThan(0);
  });

  it("updates centroids and moves them towards cluster centers", () => {
    const pts = generatePoints("Gaussian blobs", 42);
    const centroids = initCentroids(pts, 3, "kmeans++", 42);
    const { updatedPoints } = assignPoints(pts, centroids);
    const { updatedCentroids, maxShift } = updateCentroids(updatedPoints, centroids);

    expect(updatedCentroids.length).toBe(3);
    expect(maxShift).toBeGreaterThanOrEqual(0);
    expect(updatedCentroids[0]?.prevX).toBeDefined();
  });
});
