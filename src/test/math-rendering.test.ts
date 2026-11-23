import { describe, expect, it } from "vitest";
import katex from "katex";

describe("KaTeX Mathematical Formula Rendering", () => {
  const formulas = [
    {
      name: "Euclidean Distance (Eq. 1)",
      latex: "d(x, \\mu) = \\|x - \\mu\\|_2 = \\sqrt{\\sum_{j=1}^d (x_j - \\mu_j)^2}",
    },
    {
      name: "Squared Euclidean Distance (Eq. 2)",
      latex: "\\|x - \\mu\\|^2 = \\sum_{j=1}^d (x_j - \\mu_j)^2",
    },
    {
      name: "Centroid Vector Formulation (Eq. 3)",
      latex: "\\mu_k = \\frac{1}{|C_k|} \\sum_{x \\in C_k} x",
    },
    {
      name: "Coordinate-Wise Component Mean (Eq. 4)",
      latex: "\\mu_{k, j} = \\frac{1}{|C_k|} \\sum_{x \\in C_k} x_j",
    },
    {
      name: "WCSS / Inertia (Eq. 5)",
      latex: "\\text{WCSS} = \\sum_{k=1}^K \\sum_{x \\in C_k} \\|x - \\mu_k\\|^2",
    },
    {
      name: "K-Means Global Loss Objective (Eq. 6)",
      latex: "J(R, M) = \\sum_{i=1}^n \\sum_{k=1}^K r_{ik} \\cdot \\|x_i - \\mu_k\\|^2",
    },
    {
      name: "Sample Cohesion a(i)",
      latex: "a(i) = \\frac{1}{|C_I| - 1} \\sum_{j \\in C_I, j \\ne i} \\|x_i - x_j\\|",
    },
    {
      name: "Sample Separation b(i)",
      latex: "b(i) = \\min_{J \\ne I} \\frac{1}{|C_J|} \\sum_{j \\in C_J} \\|x_i - x_j\\|",
    },
    {
      name: "Silhouette Coefficient (Eq. 7)",
      latex: "s(i) = \\frac{b(i) - a(i)}{\\max(a(i), b(i))} \\in [-1, +1]",
    },
    {
      name: "Davies-Bouldin Index",
      latex: "\\text{DB} = \\frac{1}{K} \\sum_{i=1}^K \\max_{j \\ne i} \\left( \\frac{s_i + s_j}{d(\\mu_i, \\mu_j)} \\right)",
    },
    {
      name: "Calinski-Harabasz Index",
      latex: "\\text{CH} = \\frac{\\text{SSB} / (K - 1)}{\\text{SSW} / (n - K)}",
    },
    {
      name: "Adjusted Rand Index",
      latex: "\\text{ARI} = \\frac{\\text{Index} - \\mathbb{E}[\\text{Index}]}{\\max(\\text{Index}) - \\mathbb{E}[\\text{Index}]}",
    },
  ];

  formulas.forEach(({ name, latex }) => {
    it(`correctly renders ${name} without throwing syntax errors`, () => {
      expect(() => {
        const html = katex.renderToString(latex, {
          displayMode: true,
          throwOnError: true,
        });
        expect(html).toContain("class=\"katex\"");
        expect(html).toContain("class=\"katex-html\"");
      }).not.toThrow();
    });
  });

  it("verifies inline math rendering renders valid KaTeX HTML", () => {
    const inlineExpr = "r_{ik} \\in \\{0, 1\\}";
    const html = katex.renderToString(inlineExpr, {
      displayMode: false,
      throwOnError: true,
    });
    expect(html).toContain("class=\"katex\"");
    expect(html).not.toContain("katex-display");
  });
});
