import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "node:path";
import fs from "node:fs";

export default defineConfig({
  base: process.env["NODE_ENV"] === "production" ? "/k-means-clustering-learn/" : "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    {
      name: "copy-404-html",
      closeBundle() {
        const indexPath = path.resolve(__dirname, "dist/index.html");
        const notFoundPath = path.resolve(__dirname, "dist/404.html");
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, notFoundPath);
        }
      },
    },
  ],
});
