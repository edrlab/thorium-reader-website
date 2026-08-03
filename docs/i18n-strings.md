# i18n String Conventions

UI strings live in JSON files under `src/i18n/`. Each active locale has its own file (`en.json`, `fr.json`, `it.json`, …).

## Who edits what

- **`en.json`** — edited manually in the repo. This is the source of truth.
- **`fr.json`, `it.json`, and all other locales** — managed by translators via Weblate, which opens PRs automatically. Do not manually edit these unless fixing a critical issue; Weblate will overwrite the changes on the next sync.

## Adding a new string

1. Add the key to `src/i18n/en.json` in the appropriate section.
2. Weblate picks up new keys and makes them available for translation — no manual edits to other locale files needed.

## Key structure

Keys are dot-separated and map to a nested JSON object. Group strings by page or feature:

```json
{
  "your-page": {
    "title": "Your Page",
    "hero": {
      "title": "Hero Title",
      "body": "Hero body text."
    }
  }
}
```

Use it in a component with:

```ts
t(lang, "your-page.title")           // → "Your Page"
t(lang, "your-page.hero.title")      // → "Hero Title"
```

## Arrays

Body text that spans multiple paragraphs is stored as an array:

```json
{
  "your-page": {
    "body": [
      "First paragraph.",
      "Second paragraph."
    ]
  }
}
```

`t()` returns the array as-is. Any prop rendered through `BodyBlocks` (`HeroSection`, `FeatureSection`, `CTASection`, `PageHeader`, `PageIntro`, and FAQ `answer`s — see [components.md](components.md#componentssectionsbodyblocksastro)) accepts this same array as its body content, including the list and nested-list forms described under [FAQ entries](#faq-entries) below — nesting isn't FAQ-specific, it works anywhere a `body`/`intro` prop takes a `BodyBlock[]`.

## Interpolation

Use `{{ variable }}` placeholders for dynamic values:

```json
{
  "download": {
    "step": "Download the {{ windowsExe }} file."
  }
}
```

```ts
t(lang, "download.step", { windowsExe: "Thorium.Setup.3.x.x.exe" })
```

## Image alt text

Locale-specific image alt strings live under the `alts` top-level key, keyed by image filename (without extension):

```json
{
  "alts": {
    "thorium-desktop": "A laptop displaying Thorium Reader…"
  }
}
```

## FAQ entries

FAQ items live under `faq.items` and support up to two levels of list nesting inside the `answer` array. This is the same `BodyBlock[]` format used by any `body`/`intro` prop rendered through `BodyBlocks` — the nesting rules below apply there too.

Each element of `answer` (or `body`) is a block — either a paragraph or a list:

**Paragraph** — a plain string renders as `<p>`:

```json
"answer": ["First paragraph.", "Second paragraph."]
```

**Flat list** — an array of strings renders as `<ul>`:

```json
"answer": [
  "Intro sentence.",
  ["First item", "Second item", "Third item"]
]
```

**Nested list** — an array where an item is itself an array renders a parent `<li>` with a nested `<ul>`. The first element is the parent text; the rest become children:

```json
"answer": [
  [
    "Top-level item A",
    "Top-level item B",
    ["Parent item", "Child one", "Child two"]
  ]
]
```

Paragraphs and lists can be freely mixed. Maximum nesting depth is two levels.
