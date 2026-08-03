# Adding Release Notes

Release notes are Markdown files located in `src/content/release-notes/<platform>/<lang>/` (`desktop` is the only platform with content today), one subfolder per locale (`en`, `fr`, `it`, ...).

See [Adding a Platform](adding-a-platform.md) if you're introducing release notes for a brand-new platform rather than adding a note to an existing one.

## Steps

1. Create a new file named after the version, with dots replaced by dashes: `src/content/release-notes/desktop/en/X-Y-Z.md`
2. Copy the frontmatter from an existing file and update the three fields:

```md
---
title: "Thorium Desktop X.Y.Z"
version: "X.Y.Z"
date: "YYYY-MM-DD"
---
```

3. Write the release notes below the frontmatter in Markdown.

The file will appear automatically on the website once merged.

## Localization

Translations live alongside the English file, under the matching locale folder and same filename, e.g. `src/content/release-notes/desktop/fr/X-Y-Z.md`.

If a translation doesn't exist for a given version/locale pair, the site falls back to the English version automatically — a locale folder does not need every version to be present.

## Example

See [`src/content/release-notes/desktop/en/3-4-0.md`](../src/content/release-notes/desktop/en/3-4-0.md) as a reference.
