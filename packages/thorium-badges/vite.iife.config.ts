import { defineConfig } from "vite";

// IIFE build for hosting as a stable <script src> URL — no build step
// required by the consuming developer. Self-registers both custom elements.
export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: false,
    lib: {
      entry: "src/index.ts",
      name: "ThoriumBadges",
      formats: ["iife"],
      fileName: () => "thorium-badges.iife.js",
    },
  },
});
