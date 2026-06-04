# Adding a New Language

## 1. Merge the Weblate PR

Weblate opens a pull request automatically when translators contribute. Before merging, check that the language is at **100% completion** on Weblate. Merge the PR once it is — it adds `src/i18n/<code>.json` with all translated strings.

## 2. Register the locale

Edit `src/i18n/locales.ts` and add the language in two places:

```ts
export const locales = ["en", "fr", "it", "<code>"] as const;

export const bcp47Locale: Record<Locale, string> = {
  en: "en-us",
  fr: "fr-fr",
  it: "it-it",
  "<code>": "<bcp47>",   // e.g. "de": "de-de"
};
```

Use the same short code as the JSON file from Weblate (`de`, `es`, `zh-hans`, …) and its corresponding BCP 47 tag.

## 3. Add the locale image folder

Create `src/assets/images/<code>/` and add localized screenshots. The folder must contain the same filenames as the other locales — copy from `en` as a starting point if localized images are not yet available:

```
src/assets/images/<code>/
  thorium-desktop.webp
  thorium-mobile-download-screens-compact.webp
  thorium-mobile-download-screens-large.webp
  thorium-reader-desktop-mobile.webp
  thorium-reader-mobile-option.webp
  thorium-reader-screens.webp
```

Note: `en` also contains illustration files (`thorium-illustration-*.webp`) that the other locales fall back to — you do not need to duplicate those.

## 4. Verify

Run `pnpm dev` and open `/<code>/` in the browser to check that the new locale renders correctly.
