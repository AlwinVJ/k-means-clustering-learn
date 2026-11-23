# K-Means Lab — An Interactive Study of Clustering

[![Deploy to GitHub Pages](https://github.com/AlwinVJ/k-means-clustering-learn/actions/workflows/deploy.yml/badge.svg)](https://github.com/AlwinVJ/k-means-clustering-learn/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-green.svg)](https://nodejs.org)
[![Vite](https://img.shields.io/badge/Vite-8.x-purple.svg)](https://vitejs.dev)

An interactive, monograph-grade educational platform dedicated to the **K-Means Clustering Algorithm**. Designed with an editorial aesthetic, mathematical rigor, and real-time interactive simulations, K-Means Lab bridges intuitive visual understanding, mathematical proofs, and production-grade implementations.

**Live Deployment URL:** [https://alwinvj.github.io/k-means-clustering-learn/](https://alwinvj.github.io/k-means-clustering-learn/)

---

## 🌟 Key Features

1. **Interactive Algorithm Explorer:**
   - Real-time 2D simulation canvas stepping through Lloyd's algorithm iteration by iteration.
   - Choose across 4 data distributions: *Gaussian blobs*, *Uniform noise*, *Concentric rings*, and *Anisotropic clusters*.
   - Dynamic $K$ selection ($K \in [1, 8]$) with distinct, accessible color palettes.
   - Centroid initialization with **K-Means++** and **Uniform Random Selection**.
   - Motion vector visualization displaying centroid movement trails across updates.
   - Live telemetry: step counter, Voronoi reassignments, and Within-Cluster Sum of Squares (WCSS / Inertia).

2. **Rigorous Mathematical Foundations:**
   - Detailed derivation of Euclidean distance and squared $L_2$ properties.
   - Calculus proof demonstrating sample arithmetic mean optimality as the unique global minimizer of intra-cluster variance.
   - Formal breakdown of the K-Means global objective function $J(R, M)$ and Lloyd's block coordinate descent.
   - Proof of finite convergence and non-increasing loss.

3. **Cluster Validation & Evaluation:**
   - The Elbow Method: WCSS scree plots, inflection point analysis, and diminishing return criteria.
   - Silhouette Analysis: Intra-cluster cohesion $a(i)$, nearest-cluster separation $b(i)$, and interpretation of $[-1, +1]$ coefficients.
   - Internal metrics: Davies-Bouldin Index (DBI) and Calinski-Harabasz Variance Ratio Criterion.
   - External metrics: Adjusted Rand Index (ARI) for benchmarking against ground-truth labels.
   - Critical failure modes: non-spherical geometries, varying densities, outlier leverage, and high-dimensional distance concentration.

4. **Multi-Paradigm Code Tutorials:**
   - **Pure Python from Scratch:** Zero third-party dependencies, implementing distance calculation, assignment, centroid update, and convergence loops.
   - **Vectorized NumPy:** Utilizing multidimensional broadcasting `(N, 1, D) - (1, K, D)` for C-level SIMD performance.
   - **Production Scikit-Learn:** Complete ML pipelines featuring `StandardScaler`, `KMeans(init='k-means++', n_init=10)`, and comprehensive evaluation metrics.

5. **Warm Editorial Visual Identity:**
   - Distinct serif typography using *Newsreader*, modern sans-serif using *IBM Plex Sans*, and code typography using *JetBrains Mono*.
   - Thoughtful paper-tone color palette with custom terracotta, sage, slate, and amber cluster accents.

---

## 📚 Curriculum Structure

| Module | Title | Chapter Route | Core Focus |
| :---: | :--- | :--- | :--- |
| **01** | Introduction to Unsupervised Learning | `/learn#module-1` | Machine learning paradigms, labeled vs unlabeled data, taxonomy of unsupervised learning. |
| **02** | Introduction to Clustering | `/learn#module-2` | Cluster compactness, inter-cluster separation, metric axioms, comparison of 4 clustering families. |
| **03** | K-Means Fundamentals | `/explorer#fundamentals` | Meaning of K and centroids, Voronoi partitions, numerical intuition. |
| **04** | Mathematical Foundations | `/mathematics` | Euclidean metric, arithmetic mean proof, WCSS formulation, objective coordinate descent. |
| **05** | How K-Means Works | `/explorer#algorithm-steps` | Complete 7-step pipeline, Random vs K-Means++ seeding, convergence criteria. |
| **06** | Choosing the Optimal K | `/evaluation#elbow` | Elbow method, rate of variance change, curvature diagnostics. |
| **07** | Evaluating Performance | `/evaluation#silhouette` | Silhouette analysis, Davies-Bouldin index, Calinski-Harabasz, Adjusted Rand Index. |
| **08** | Practical Implementation | `/implementation` | Executable tutorials in pure Python, vectorized NumPy, and scikit-learn. |
| **09** | Real-World Applications & Limits | `/learn#module-9` | Customer RFM segmentation, image color quantization, geo-facility placement, failure modes. |

---

## 🛠️ Technology Stack

- **Framework:** [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- **Routing:** [TanStack Router](https://tanstack.com/router) (Client-side SPA with type-safe route trees)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) with `@tailwindcss/vite`
- **Build Tool:** [Vite 8](https://vitejs.dev)
- **Icons:** [Lucide React](https://lucide.dev)
- **Testing:** [Vitest](https://vitest.dev) + `@testing-library/react`
- **Deployment:** GitHub Pages via GitHub Actions (`actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`)

---

## 📁 Project Directory Structure

```text
k-means-clustering-learn/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages CI/CD deployment pipeline
├── public/
│   ├── favicon.ico             # Multi-size official favicon (16x16, 32x32, 48x48)
│   ├── favicon-16x16.png       # Standard 16px icon
│   ├── favicon-32x32.png       # Standard 32px icon
│   ├── apple-touch-icon.png    # 180px Apple touch icon
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── logo.png                # Official K-Means Lab emblem
│   ├── site.webmanifest        # PWA application manifest
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── site/               # Reusable site-wide components
│   │   │   ├── ClusterFigure.tsx
│   │   │   ├── ModuleEntry.tsx
│   │   │   ├── primitives.tsx  # PageHeader, SectionHeading, MathBlock, CodeBlock, VizFrame, PrevNext
│   │   │   ├── SiteFooter.tsx
│   │   │   └── SiteHeader.tsx
│   │   └── ui/                 # Radix UI primitive wrappers
│   ├── lib/
│   │   ├── kmeans-engine.ts    # Deterministic 2D K-Means simulation engine
│   │   ├── site.ts             # Central navigation and curriculum module definitions
│   │   └── utils.ts            # Utility functions (cn class-merging)
│   ├── routes/                 # TanStack Router filesystem routes
│   │   ├── __root.tsx          # Root layout shell
│   │   ├── index.tsx           # Monograph home page
│   │   ├── learn.tsx           # Modules 1, 2, and 9
│   │   ├── explorer.tsx        # Interactive simulator + Modules 3 and 5
│   │   ├── mathematics.tsx     # Module 4
│   │   ├── implementation.tsx  # Module 8
│   │   └── evaluation.tsx      # Modules 6 and 7
│   ├── test/
│   │   ├── app-routing.test.tsx
│   │   └── kmeans-engine.test.ts
│   ├── main.tsx                # Client application mounting entry
│   ├── router.tsx              # Router initialization with basepath support
│   ├── routeTree.gen.ts        # Auto-generated TanStack route tree
│   └── styles.css              # Editorial Tailwind CSS v4 design tokens
├── index.html                  # HTML entry point with metadata and fonts
├── package.json
├── tsconfig.json
└── vite.config.ts              # Vite configuration optimized for GitHub Pages
```

---

## 🚀 Local Development

### Prerequisites

Ensure you have Node.js 20+ or 22+ and npm installed:

```bash
node -v   # v22.x recommended
npm -v    # 10.x recommended
```

### 1. Clone the Repository

```bash
git clone https://github.com/AlwinVJ/k-means-clustering-learn.git
cd k-means-clustering-learn
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Run Tests & Type Checks

```bash
# Run unit tests
npm run test

# Run strict TypeScript type check
npx tsc --noEmit
```

### 5. Build for Production Locally

```bash
npm run build
npm run preview
```

---

## 🚢 GitHub Pages Deployment

The repository is configured for automated static deployment via GitHub Actions:

1. When changes are pushed to `main`, `.github/workflows/deploy.yml` triggers automatically.
2. The workflow installs dependencies via `npm ci`, runs TypeScript type checking (`npx tsc --noEmit`), executes unit tests (`npm run test`), and builds the static assets to `./dist`.
3. The build plugin automatically duplicates `dist/index.html` to `dist/404.html` to ensure client-side deep linking and direct page refreshes function seamlessly under GitHub Pages.
4. Assets are deployed directly to GitHub Pages at:
   `https://alwinvj.github.io/k-means-clustering-learn/`

### Manual Deployment Verification

To enable GitHub Pages in your repository settings:
- Navigate to **Settings** → **Pages** on your GitHub repository.
- Under **Build and deployment** → **Source**, select **GitHub Actions**.

---

## 📄 License

This educational project is released under the MIT License.
