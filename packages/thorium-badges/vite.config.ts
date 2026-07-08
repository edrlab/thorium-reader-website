import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// ESM build, consumed both by npm/bundler users of the package and by the
// site app's own workspace dependency on it (see package.json "exports").
// Single entry: "." (the self-registering custom elements).
export default defineConfig({
  plugins: [dts({ entryRoot: "src" })],
  build: {
    outDir: "dist",
    emptyOutDir: false,
    lib: {
      entry: {
        index: "src/index.ts",
      },
      formats: ["es"],
    },
  },
});
