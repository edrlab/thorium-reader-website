import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// ESM build, consumed both by npm/bundler users of the package and by the
// site app's own workspace dependency on it (see package.json "exports").
// Multi-entry: "." (the self-registering custom elements) and "./svg" (the
// pure makeSVG/esc rendering helpers + logo asset, with no side effects).
export default defineConfig({
  plugins: [dts({ entryRoot: "src" })],
  build: {
    outDir: "dist",
    emptyOutDir: false,
    lib: {
      entry: {
        index: "src/index.ts",
        svg: "src/badge-svg.ts",
      },
      formats: ["es"],
    },
  },
});
