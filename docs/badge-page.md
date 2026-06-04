# Badge Page

The badge page (`/badge/`) is a tool for OPDS and web catalog operators. It generates an "Add to Thorium Reader" badge — an SVG image wrapped in a deep link — that catalog pages can embed to let users add the catalog to Thorium Reader in one tap.

## How it works

The badge is a static SVG (196×56 px) with the Thorium logo and localized "Add to Thorium Reader" text. When clicked, it opens a deep link URL that Thorium Reader intercepts to pre-fill a catalog entry.

The deep link is built from `addCatalogScheme` (defined in `src/links.ts`) with query parameters appended:

| Parameter | Required | Description |
|-----------|----------|-------------|
| `title` | yes | Catalog display name in Thorium Reader |
| `browse` | yes* | OPDS or web URL to browse the catalog |
| `bookshelf` | yes* | OPDS or web URL for the user's bookshelf |
| `icon` | no | Square image URL (PNG or SVG) for the catalog icon |
| `color` | no | Accent color (`gray`, `red`, `yellow`, `blue`, `green`, `purple`, `orange`) |
| `passphrase` | no | Plain-text LCP passphrase |
| `passphrase_hash` | no | Pre-hashed LCP passphrase (use instead of `passphrase`) |
| `openIn` | no | How to open catalog URLs: `webview` or `browser` |

*At least one of `browse` or `bookshelf` is required for the badge link to be generated.

## Output

The page produces an HTML snippet ready to paste into a catalog page:

```html
<a href="https://www.thoriumreader.com?title=My+Catalog&browse=https%3A%2F%2F...">
  <svg …>…</svg>
</a>
```

## Localization

The badge text ("Add to" / "Thorium Reader") is rendered in the language selected in the form, independently of the page locale. All active site locales are available. The `badgeTexts` map (built at Astro render time from `en.json`, `fr.json`, etc.) is passed to the client script so the SVG updates live when the language selector changes.

## Updating `addCatalogScheme`

The deep link base URL is `addCatalogScheme` in `src/links.ts`. Update it there if the scheme changes — the badge page picks it up automatically.
