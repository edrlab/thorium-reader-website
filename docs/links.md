# Links and URLs

All external URLs and versioned identifiers are centralized in `src/links.ts`. Import from there instead of hardcoding values in components or pages.

## Available exports

| Export | Type | Description |
|--------|------|-------------|
| `blogHref` | `string` | Thorium Reader blog URL |
| `supportHref(lang)` | `(lang: string) => string` | Support site URL, locale-aware |
| `discordHref` | `string` | Discord invite URL |
| `githubHref` | `string` | EDRLab GitHub org URL — used for the Starlight sidebar social link in `astro.config.mjs` |
| `appleAppId` | `string` | App Store app ID |
| `appleReleaseDate` | `string` | App Store release date (Unix timestamp) |
| `msProductId` | `string` | Microsoft Store product ID |
| `addCatalogScheme` | `string` | Deep link scheme URL for adding a catalog to Thorium (`com.thoriumreader:/add/catalog`) |
| `addCatalogUniversalLink` | `string` | HTTPS universal-link equivalent of `addCatalogScheme` (`https://www.thoriumreader.com/add/catalog`) |
| `addPublicationScheme` | `string` | Deep link scheme URL for adding a single publication to Thorium |
| `addPublicationUniversalLink` | `string` | HTTPS universal-link equivalent of `addPublicationScheme` |
| `desktopVersion` | `string` | Current desktop release version string |
| `downloadUrls` | `object` | Per-platform GitHub release download URLs (keyed by `macosArm`, `macosX64`, `windowsExe`, `windowsArm`, `linuxAppImage`, `linuxDeb`, `linuxAppImageArm`, `linuxDebArm`) |
| `downloadPlatforms` | `object` | Same keys as `downloadUrls`, mapped to platform slugs used for analytics/labeling (e.g. `macosArm` → `"macos"`) |

## Updating the desktop version

When a new desktop release ships, update `desktopVersion` in `src/links.ts`. All `downloadUrls` are derived from it automatically. Also add a release notes file — see `docs/release-notes.md`.

## Adding a new link

Add it as a named export to `src/links.ts`, then import it wherever needed:

```ts
export const myNewHref = "https://example.com/";
```

```astro
---
import { myNewHref } from "../../links.js";
---
<a href={ myNewHref }>…</a>
```
