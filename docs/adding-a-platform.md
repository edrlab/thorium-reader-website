# Adding a Platform

Some features on this site (currently `legals` and `release-notes`) are organized per-platform: content lives under `src/content/<feature>/<platform>/<lang>/`, and a single dynamic `[platform]` route per feature discovers every platform automatically from what's on disk. There is no per-platform route file, content collection, or hub-page entry to write by hand — adding a platform is purely a content + i18n change.

## How platform discovery works

Each feature's content collection (see `src/content.config.ts`) globs its entire content tree, so any new `<platform>/` folder immediately produces entries with ids shaped `<platform>/<lang>/<slug>`. The `[platform]` route (e.g. `src/pages/[lang]/legals/[platform]/index.astro`, `src/pages/[lang]/release-notes/[platform]/index.astro`) and each feature's hub page derive their list of platforms from those ids at build time (`[...new Set(entries.map(e => e.id.split("/")[0]))]`). Drop a new platform folder in, and its pages, listing, and hub-page section appear with no code changes.

## How locale-fallback resolution works

Within a platform, content is further organized per locale. `localizeCollection` (`src/i18n/utils.ts`) resolves each slug to the requested locale's file if present, falling back to the English (`en/`) file otherwise — a locale folder does not need every slug present. This is the same mechanism used for both platform-scoped content (legals documents, release notes) and non-platform-scoped content (the site-wide `legals.md`/`accessibility.md` pages, called without a `platform` argument).

## The one manual step: platform display names

Since platform folder names (`desktop`, `ios`, `android`) aren't automatically presentable, add a `platform.names.<platform>` entry to `src/i18n/en.json` (see the existing `"platform": { "names": { ... } }` block) — this is the only thing that can't be inferred from content. Only edit `en.json`; other locale files are Weblate-managed and get the translation later.

## Feature-specific authoring rules

- **Release notes**: see [release-notes.md](release-notes.md) for frontmatter fields and filename convention.
- **Legals**: see [legals.md](legals.md) for frontmatter fields and the `platform-conformance` / `legals-pages` collection schemas in `src/content.config.ts`.

## Verify

Run `pnpm dev`, drop a test file under a new `<feature>/<platform>/en/` folder, add its `platform.names.<platform>` entry, and confirm it appears in the relevant hub page and `[platform]` routes with no other changes.
