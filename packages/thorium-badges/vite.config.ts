import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// ESM build, consumed both by npm/bundler users of the package and by the
// site app's own workspace dependency on it (see package.json "exports").
// Single entry: "." (the self-registering custom elements).
export default defineConfig({
  // `include` excludes locales.ts and badge-svg.ts from declaration output.
  // Left unrestricted, dts emits a sibling .d.ts per src/*.ts file it can
  // see — including locales.ts, whose type preserves its cross-package
  // import into the site's src/i18n, which wouldn't resolve for an external
  // consumer of the published package. params.ts stays included: the
  // exported classes' `protected paramAttrs: ParamAttrs` field means
  // index.d.ts imports from './params.js', so that declaration must exist
  // in dist too (and, unlike locales.ts, it has no cross-package import).
  plugins: [
    dts({ entryRoot: "src", include: ["src/index.ts", "src/params.ts", "src/vite-env.d.ts"] }),
  ],
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
