/// <reference types="vitest"/>

import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/.next/**",
        "**/out/**",
        "**/cypress/**",
        "**/*.d.ts",
        "**/vitest.setup.ts",
        "src/components/ui",
        "src/App.tsx",
        "src/main.tsx",
        "*.config.*",
      ],
    },
  },
});
