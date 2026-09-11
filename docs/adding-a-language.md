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

## 3. Add localized screenshots (optional, can be done later)

`getImage()` (`src/i18n/utils.ts`) automatically falls back to the `en` version of an image when a locale-specific file is missing, so a language can go live with no images of its own — nothing needs to be copied or created upfront.

When localized screenshots become available, add them to `src/assets/images/<code>/` using the same filenames as the other locales:

```
src/assets/images/<code>/
  thorium-desktop.webp
  thorium-mobile-download-screens-compact.webp
  thorium-mobile-download-screens-large.webp
  thorium-reader-desktop-mobile.webp
  thorium-reader-mobile-option.webp
  thorium-reader-screens.webp
```

Only add the files you have localized versions of — any filename left out keeps falling back to `en`. Illustration files (`thorium-illustration-*.webp`) always fall back to `en` and never need a per-locale copy.

## 4. Verify

Run `pnpm dev` and open `/<code>/` in the browser to check that the new locale renders correctly.
