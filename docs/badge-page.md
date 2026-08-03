# Badge Pages

The badge tools let OPDS/web catalog operators and publication hosts generate an "Add to Thorium Reader" badge — an SVG image wrapped in a deep link — to embed on their own pages so users can add the catalog or publication to Thorium Reader in one tap.

`/badge/` is a hub page (`src/pages/[lang]/badge.astro`) linking to two separate generators:

- `/badge/catalog/` — adds a catalog (and optional bookshelf)
- `/badge/publication/` — adds a single publication

Each generator page (`src/components/badge/*`) is a form that live-updates a preview badge and an embed snippet as the operator fills it in.

## Output formats

Each generator's output tab offers two integration options, selected via the "integration" field:

- **Link** — a static `<a href="…"><svg>…</svg></a>` snippet, wrapping the deep link scheme URL. The badge text is baked in at generation time for the selected language.
- **Web component** — a `<thorium-badge-catalog>` or `<thorium-badge-publication>` custom element tag with the form values as attributes. This requires embedding the `@edrlab/thorium-badges` package (see [packages/thorium-badges/README.md](../packages/thorium-badges/README.md) and the deep-linking dev guide linked from the output panel) — the element renders its own SVG client-side and can use `lang="auto"` to detect the visitor's browser language, which the link format can't do.

## Catalog badge parameters

Deep link scheme: `addCatalogScheme` (`src/links.ts`), universal-link equivalent: `addCatalogUniversalLink`.

| Parameter | Required | Description |
|-----------|----------|-------------|
| `title` | yes | Catalog display name in Thorium Reader |
| `main` | yes* | OPDS or web URL to browse the catalog |
| `bookshelf` | yes* | OPDS or web URL for the user's bookshelf |
| `passphrase` | no | Plain-text LCP passphrase |
| `hashed_passphrase` | no | Pre-hashed LCP passphrase (use instead of `passphrase`) |
| `open_in` | no | How to open catalog URLs: `webview` or `browser` |
| `icon` | no | Square image URL (PNG or SVG) for the catalog icon |
| `banner` | no | Banner image URL |
| `color` | no | Accent color (`gray`, `red`, `yellow`, `blue`, `green`, `purple`, `orange`, `pink`) |

*At least one of `main` or `bookshelf` is required for the badge link to be generated.

## Publication badge parameters

Deep link scheme: `addPublicationScheme` (`src/links.ts`), universal-link equivalent: `addPublicationUniversalLink`.

| Parameter | Required | Description |
|-----------|----------|-------------|
| `publication` | yes | Direct URL to the publication file |
| `title` | no | Publication title |
| `author` | no | Publication author |
| `cover` | no | Cover image URL |
| `passphrase` | no | Plain-text LCP passphrase |
| `hashed_passphrase` | no | Pre-hashed LCP passphrase (use instead of `passphrase`) |

The full parameter/attribute lists live in [packages/thorium-badges/src/params.ts](../packages/thorium-badges/src/params.ts), shared between the generator pages and the web component.

## Output

Both generators produce an HTML snippet ready to paste into a catalog or publication page:

```html
<a href="https://www.thoriumreader.com/add/catalog?title=My+Catalog&main=https%3A%2F%2F...">
  <svg …>…</svg>
</a>
```

## `/add/catalog/` and `/add/publication/` landing pages

These are the pages the universal links (and the web component's rendered links) point to — `src/pages/[lang]/add/catalog.astro` and `.../add/publication.astro`. They show a preview of the catalog/publication being added (name, cover when available), a button that retries the deep link (`ThoriumBadge`), and download links for Thorium Desktop (`DownloadContent`) for visitors without the app installed. If the URL carries no query params at all, the page shows an "invalid link" message instead of the normal add-in-progress copy.

## Localization

The badge text ("Add to" / "Thorium Reader") is rendered in the language selected in the generator form, independently of the page locale. All active site locales are available. The `badgeTexts` map (built at Astro render time from `en.json`, `fr.json`, etc.) is passed to the client script via `ClientData` so the SVG updates live when the language selector changes. The web component additionally supports `lang="auto"` (browser-language detection) — see [packages/thorium-badges/README.md](../packages/thorium-badges/README.md#localization).

## Updating `addCatalogScheme` / `addPublicationScheme`

The deep link base URLs are `addCatalogScheme`, `addPublicationScheme`, and their universal-link equivalents in `src/links.ts`. Update them there if a scheme changes — the badge pages pick it up automatically. See [links.md](links.md).
