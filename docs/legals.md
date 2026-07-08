# Adding Legal Documents

Legal documents are Markdown/MDX files located in `src/content/legals/<platform>/<lang>/` (e.g. `desktop`, `ios`), one subfolder per locale (`en`, `fr`, `it`, ...). The site-wide legal notice and accessibility statement live at `src/content/legals/<lang>/legals.md` and `src/content/legals/<lang>/accessibility.md` — not platform-scoped, but localized the same way.

See [Adding a Platform](adding-a-platform.md) if you're introducing legal documents for a brand-new platform rather than adding a document to an existing one.

## Steps

1. Create a new file, e.g. `src/content/legals/desktop/en/privacy-policy.md`.
2. Add frontmatter per the `platform-conformance` collection schema in `src/content.config.ts`:

```md
---
title: "Privacy Policy"
date: "YYYY-MM-DD"
---
```

`reportedPlatform` and `date` are optional (used by conformance reports — see `src/content/legals/desktop/en/accessibility-report.mdx` for that shape).

3. Write the document below the frontmatter.

The file will appear automatically on the website once merged, listed under its platform on the legals hub page (`/legals/`) and reachable at `/legals/<platform>/<slug>/`.

## Localization

Translations live alongside the English file, under the matching locale folder and same filename, e.g. `src/content/legals/desktop/fr/privacy-policy.md`.

If a translation doesn't exist for a given document/locale pair, the site falls back to the English version automatically — a locale folder does not need every document present.

## Example

See [`src/content/legals/desktop/en/privacy-policy.md`](../src/content/legals/desktop/en/privacy-policy.md) as a reference.
