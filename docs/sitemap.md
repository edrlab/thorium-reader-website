# Sitemap Config

The sitemap is generated at build time by `@astrojs/sitemap`, configured in `astro.config.mjs`. By default the integration would include every generated page across every locale — instead it's restricted to an **allowlist** so only pages worth indexing end up in the sitemap.

## Allowlist

`src/sitemap-allowlist.json` lists the path patterns to include:

```json
[
  { "path": "/download/", "locales": "*" },
  { "path": "/release-notes/desktop/\\d+-\\d+-\\d+/", "locales": ["en"] }
]
```

- `path` is a regex fragment matched against the pathname, after the locale segment (e.g. `/en/download/`).
- `locales` is either `"*"` (every locale in `src/i18n/locales.js`) or an explicit array of locale codes to restrict the entry to.

The `sitemap()` integration's `filter` option (in `astro.config.mjs`) tests each generated page's full URL against every allowlist entry, expanded per matching locale:

```js
new RegExp(`^https://www\\.thoriumreader\\.com/${ l }${ pattern }$`).test(page)
```

A page is included if it matches **any** entry for **any** of that entry's locales.

## Adding a page to the sitemap

Add an entry to `src/sitemap-allowlist.json`:

```json
{ "path": "/my-new-route/", "locales": "*" }
```

Or restrict to specific locales, e.g. because content only exists in a few languages:

```json
{ "path": "/my-new-route/\\d+-\\d+-\\d+/", "locales": ["en"] }
```

Remember the `path` is a regex — escape special characters like `.` and `+`, and note it's anchored with `^...$` around the full URL, so it must match the entire pathname (no leading/trailing wildcards needed unless the path itself varies, as with the version segment above).

## i18n

The `sitemap()` integration is also given `i18n.defaultLocale` and `i18n.locales` (mapped to BCP 47 tags via `bcp47Locale` from `src/i18n/locales.js`), so accepted pages get `hreflang` alternate links for each locale rather than being listed as unrelated one-off URLs.
