# Adding a Release Notes Collection

This is the process for adding a new platform collection alongside the existing `desktop` one — e.g. `ios`.

## 1. Create the content folder

```
src/content/release-notes/ios/en/
```

Add release note files there following the same naming convention (`X-Y-Z.md`), under one subfolder per locale (`en`, `fr`, `it`, ...). See `docs/release-notes.md` for the required frontmatter and the localization/fallback rules.

## 2. Register the collection

In `src/content.config.ts`, define the new collection and add it to the exports:

```ts
const iosReleaseNotes = defineCollection({
  loader: glob({ pattern: "*/*.md", base: "src/content/release-notes/ios" }),
  schema: z.object({
    title: z.string(),
    version: z.string(),
    date: z.string(),
  }),
});

export const collections = {
  "desktop-release-notes": desktopReleaseNotes,
  "ios-release-notes": iosReleaseNotes,
};
```

## 3. Add the i18n label

In `src/i18n/en.json` and `src/i18n/fr.json` (and any other active locale), add the platform label under `release-notes.platforms`:

```json
"release-notes": {
  "platforms": {
    "desktop": "Desktop",
    "ios": "iOS"
  }
}
```

## 4. Add the pages

Create three page files mirroring the desktop structure. Use the desktop files as templates, replacing every occurrence of `desktop` / `desktop-release-notes` with the new platform name.

**Index page** — `src/pages/[lang]/release-notes/ios/index.astro`  
Copy from `src/pages/[lang]/release-notes/desktop/index.astro` and update the collection name and URL segment.

**Individual note page** — `src/pages/[lang]/release-notes/ios/[slug].astro`  
Copy from `src/pages/[lang]/release-notes/desktop/[slug].astro`.

**Latest redirect** — `src/pages/[lang]/release-notes/ios/latest.astro`  
Copy from `src/pages/[lang]/release-notes/desktop/latest.astro`.

Then create three matching files under `src/pages/release-notes/ios/` (without `[lang]`). These are thin redirect shims — copy from `src/pages/release-notes/desktop/` and update the path argument.

## 5. Add the platform to the hub page

In `src/pages/[lang]/release-notes/index.astro`, add the new platform to the `platforms` array:

```ts
const iosNotes = await getCollection("ios-release-notes");
const sortedIos = localizeCollection(iosNotes, lang).sort((a, b) => b.note.data.date.localeCompare(a.note.data.date));

const platforms = [
  {
    label: t(lang, "release-notes.platforms.desktop"),
    indexPath: "release-notes/desktop/",
    notes: sortedDesktop.slice(0, 5).map(({ slug, note }) => ({ version: note.data.version, date: note.data.date, path: `release-notes/desktop/${ slug }` })),
  },
  {
    label: t(lang, "release-notes.platforms.ios"),
    indexPath: "release-notes/ios/",
    notes: sortedIos.slice(0, 5).map(({ slug, note }) => ({ version: note.data.version, date: note.data.date, path: `release-notes/ios/${ slug }` })),
  },
];
```

`localizeCollection` (from `src/i18n/utils.ts`) resolves each version to the localized note if it exists, falling back to the English one otherwise.

## 6. Verify

Run `pnpm dev` and open `/release-notes/` to confirm the new platform section appears in the hub and that the individual note pages render correctly.
