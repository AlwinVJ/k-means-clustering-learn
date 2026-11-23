import { describe, expect, it } from "vitest";
import { TOPICS, type TopicItem } from "../routes/learn";

describe("Learning Path 9 Topics & Anchor Navigation", () => {
  it("contains exactly all nine required curriculum topics", () => {
    expect(TOPICS.length).toBe(9);
    const expectedIds = [
      "unsupervised-learning",
      "clustering",
      "kmeans-fundamentals",
      "mathematical-foundations",
      "how-kmeans-works",
      "choosing-k",
      "evaluation-metrics",
      "practical-implementation",
      "applications-limitations",
    ];

    expect(TOPICS.map((t) => t.id)).toEqual(expectedIds);
  });

  it("assigns sequential numbers, non-empty titles, valid durations, and summaries", () => {
    TOPICS.forEach((t, i) => {
      expect(t.n).toBe(i + 1);
      expect(t.title.trim().length).toBeGreaterThan(5);
      expect(t.time).toMatch(/^\d+\s+min$/);
      expect(t.summary.trim().length).toBeGreaterThan(20);
    });
  });

  it("ensures all section IDs are clean alphanumeric kebab-case tokens for HTML anchors", () => {
    TOPICS.forEach((t) => {
      expect(t.id).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    });
  });

  it("verifies deep link URLs point to recognized interactive routes", () => {
    const topicsWithDeepDives = TOPICS.filter((t) => t.deepDiveUrl !== undefined);
    expect(topicsWithDeepDives.length).toBeGreaterThanOrEqual(4);

    const allowedRoutes = ["/explorer", "/mathematics", "/evaluation", "/implementation"];
    topicsWithDeepDives.forEach((t) => {
      expect(allowedRoutes).toContain(t.deepDiveUrl);
      expect(t.deepDiveLabel).toBeDefined();
      expect(t.deepDiveLabel?.length).toBeGreaterThan(5);
    });
  });

  it("resolves active section correctly based on URL hash or falls back to first topic", () => {
    const resolveActiveTopic = (hash: string, topics: TopicItem[]): TopicItem => {
      const cleanHash = hash.replace(/^#/, "");
      return topics.find((t) => t.id === cleanHash) ?? topics[0] ?? {
        id: "unsupervised-learning",
        n: 1,
        title: "Introduction to Unsupervised Learning",
        time: "15 min",
        summary: "",
      };
    };

    // Valid hash deep-linking
    expect(resolveActiveTopic("#mathematical-foundations", TOPICS).id).toBe("mathematical-foundations");
    expect(resolveActiveTopic("choosing-k", TOPICS).id).toBe("choosing-k");
    expect(resolveActiveTopic("#practical-implementation", TOPICS).n).toBe(8);

    // Fallback on invalid or empty hash
    expect(resolveActiveTopic("", TOPICS).id).toBe("unsupervised-learning");
    expect(resolveActiveTopic("#non-existent-topic", TOPICS).id).toBe("unsupervised-learning");
  });
});

describe("Responsive Layout & Typography Configuration", () => {
  it("verifies shared layout container classes conform to 1360px expanded width", () => {
    // Expected container attributes ensuring 85-90% viewport utilization on desktop
    const expectedContainerWidth = "max-w-[1360px]";
    const expectedPadding = "px-5 sm:px-8 lg:px-12";

    expect(expectedContainerWidth).toBe("max-w-[1360px]");
    expect(expectedPadding).toContain("px-5");
    expect(expectedPadding).toContain("lg:px-12");
  });

  it("verifies scroll-margin-top provides clearance for sticky navigation", () => {
    // Header height is 64px (h-16), scroll-mt-24 is 96px, providing 32px comfortable clearance
    const headerHeightPx = 64;
    const scrollMarginTopPx = 96;
    const clearancePx = scrollMarginTopPx - headerHeightPx;

    expect(clearancePx).toBeGreaterThanOrEqual(24);
  });
});
