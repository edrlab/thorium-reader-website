# Adding Release Notes

Release notes are Markdown files located in `src/content/release-notes/`.

## Steps

1. Create a new file named after the version: `src/content/release-notes/X.Y.Z.md`
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

## Example

See [`src/content/release-notes/3.4.0.md`](../src/content/release-notes/3.4.0.md) as a reference.
