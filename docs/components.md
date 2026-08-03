# Component API Reference

## Layout

### `layouts/Layout.astro`

Root page shell. Renders `<html>`, `<head>`, and `<body>` with the global nav.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | site title from i18n | `<title>` value |
| `blob` | `boolean` | `false` | Renders the `HeroBlob` behind the header |
| `illustration` | `{ src: ImageMetadata }` | — | Passed through to `HeroBlob` when `blob` is true |

**Slots**

| Slot | Description |
|------|-------------|
| *(default)* | Page body content |
| `footer` | Footer region, rendered after `<main>` |

---

## Sections

### `components/sections/HeroSection.astro`

Full-width hero with a title, body text, and an image.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Heading text |
| `body` | `string \| BodyBlock[]` | — | Body content — see [`BodyBlocks`](#componentssectionsbodyblocksastro) |
| `image` | `{ src: ImageMetadata; alt: string }` | — | Hero image |
| `clipImage` | `boolean` | `false` | Applies a clip-path to the image |

**Slots**

| Slot | Description |
|------|-------------|
| `actions` | CTA buttons below the body |

---

### `components/sections/FeatureSection.astro`

Two-column feature block with text and a decoration or image.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Section heading |
| `body` | `string \| BodyBlock[]` | — | Body content — see [`BodyBlocks`](#componentssectionsbodyblocksastro) |
| `id` | `string` | — | HTML `id` on the section element |
| `class` | `string` | — | Extra CSS classes |
| `reverse` | `boolean` | `false` | Puts the media column on the left |
| `textAlign` | `"left" \| "right"` | — | Overrides text alignment |
| `fullWidth` | `boolean` | `false` | Removes the max-width constraint |

**Slots**

| Slot | Description |
|------|-------------|
| *(default)* | Media content (image, decoration, …) |
| `actions` | CTA buttons below the body |
| `decoration` | Alternative decoration layer on top of the default slot |

---

### `components/sections/CTASection.astro`

Call-to-action band with optional border graphics and a media column.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Heading |
| `body` | `string \| BodyBlock[]` | — | Body content — see [`BodyBlocks`](#componentssectionsbodyblocksastro) |

**Slots**

| Slot | Description |
|------|-------------|
| `border-top` | Decorative element above the section |
| `actions` | CTA buttons |
| `border-bottom` | Decorative element below the section |
| `media` | Image or decoration alongside the text |

---

### `components/sections/PageHeader.astro`

Introductory header used at the top of interior pages.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Page title |
| `body` | `string \| BodyBlock[]` | — | Optional subtitle — see [`BodyBlocks`](#componentssectionsbodyblocksastro) |
| `class` | `string` | — | Extra CSS classes |

**Slots**

| Slot | Description |
|------|-------------|
| *(default)* | Additional content below the body |

---

### `components/sections/PageIntro.astro`

Title plus intro text, rendered via `BodyBlocks`. Used at the top of interior pages that don't need `PageHeader`'s extra styling.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Page title |
| `intro` | `string \| BodyBlock[]` | — | Optional intro content — see [`BodyBlocks`](#componentssectionsbodyblocksastro) |

---

### `components/sections/TabsSection.astro`

Section wrapper that renders a `Tabs` widget with decorative borders.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `{ id: string; label: string }[]` | — | Tab definitions passed to `Tabs` |
| `label` | `string` | — | Accessible label for the tab list |
| `id` | `string` | — | HTML `id` on the section |
| `class` | `string` | — | Extra CSS classes |

**Slots**

| Slot | Description |
|------|-------------|
| `border-top` | Decorative element above the tabs |
| *(default)* | Tab panel content |
| `border-bottom` | Decorative element below the tabs |

---

### `components/sections/FAQ.astro`

Accordion-style FAQ list.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Section heading |
| `items` | `{ question: string; answer: BodyBlock[] }[]` | — | FAQ entries — `answer` is rendered via [`BodyBlocks`](#componentssectionsbodyblocksastro) |
| `class` | `string` | — | Extra CSS classes |

---

### `components/sections/BodyBlocks.astro`

Shared renderer for body content: a mix of paragraphs and up to two levels of nested lists. Used internally by `HeroSection`, `FeatureSection`, `CTASection`, `PageHeader`, `PageIntro`, and `FAQ` — any `body`/`intro`/`answer` prop typed `string | BodyBlock[]` accepts this format.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `blocks` | `BodyBlock[]` | — | Blocks to render |

```ts
type BodyListItem = string | string[];
type BodyBlock    = string | BodyListItem[];
```

- A `string` block renders as a `<p>`.
- A `BodyListItem[]` block renders as a `<ul>`. Each item is either a `string` (`<li>`) or a `string[]` — the first element is the parent `<li>` text, the rest render as a nested `<ul>`.

See [i18n-strings.md](i18n-strings.md#arrays) for the equivalent JSON shape.

---

## Buttons

### `components/buttons/ActionButton.astro`

Primary interactive button, used for downloads and main CTAs.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | `"#"` | Link target |
| `label` | `string` | — | Visible button text |
| `variant` | `"default" \| "accent"` | `"default"` | Visual style |
| `icon` | `boolean` | `false` | Shows a trailing arrow icon |

---

### `components/buttons/Button.astro`

Secondary text button.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | — | Link target |
| `label` | `string` | — | Button text |
| `icon` | `string` | — | Icon name |
| `class` | `string` | — | Extra CSS classes |

---

### `components/buttons/DiscordButton.astro`

Pre-styled Discord community button.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | `"#"` | Discord invite URL |

---

### `components/buttons/AppStoreBadge.astro`

Apple App Store badge. No props — locale-aware internally.

### `components/buttons/MsStoreBadge.astro`

Microsoft Store badge. No props — locale-aware internally.

---

## Decorations

Decoration components are placed in the `decoration` or `media` slot of a section. They pair a blob shape with a localized screenshot.

### `components/decorations/FeatureDecoration.astro`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `blob` | `string \| ImageMetadata` | — | SVG blob or image used as the background shape |
| `illustration` | `{ src: ImageMetadata; alt?: string }` | — | Screenshot layered over the blob |
| `class` | `string` | — | Extra CSS classes on the wrapper |
| `illustrationClass` | `string` | — | Extra CSS classes on the illustration `<img>` |

---

### `components/decorations/CTADecoration.astro`

Same API as `FeatureDecoration` but without a `blob` prop — uses its own internal shape.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `illustration` | `{ src: ImageMetadata; alt?: string }` | — | Screenshot |
| `class` | `string` | — | Extra CSS classes on the wrapper |
| `illustrationClass` | `string` | — | Extra CSS classes on the illustration |

---

### `components/decorations/TabsDecoration.astro`

Same API as `CTADecoration`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `illustration` | `{ src: ImageMetadata; alt?: string }` | — | Screenshot |
| `class` | `string` | — | Extra CSS classes on the wrapper |
| `illustrationClass` | `string` | — | Extra CSS classes on the illustration |

---

### `components/decorations/ComicBookDecoration.astro`
### `components/decorations/BookWalkerDecoration.astro`
### `components/decorations/TippedBoxDecoration.astro`

Locale-aware decorations that load their own images internally.

| Prop | Type | Description |
|------|------|-------------|
| `lang` | `string` | Current locale code — determines which image variant to render |

---

## Images

### `components/images/BreakpointImage.astro`

Responsive `<picture>` element with per-breakpoint sources.

| Prop | Type | Description |
|------|------|-------------|
| `sources` | `{ src: ImageMetadata; alt: string; media?: string }[]` | Sources list. The first entry without a `media` attribute is used as the fallback `<img>`; all others require a `media` query. |

---

## Blobs

### `components/blobs/HeroBlob.astro`

Large decorative blob rendered behind the page header when `Layout` is used with `blob`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `blob` | `string \| ImageMetadata` | built-in shape | SVG blob shape |
| `illustration` | `{ src: ImageMetadata }` | — | Optional image inside the blob |

---

### `components/blobs/BlobOverlay.astro`

Smaller blob used as a section divider or overlay.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `blob` | `string \| ImageMetadata` | built-in shape | SVG blob shape |

---

## Widgets

### `components/widgets/Tabs.astro`

Accessible tab widget. Tab panels are passed as the default slot and keyed by `data-tab` attributes.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `{ id: string; label: string }[]` | — | Tab definitions; `id` must match the panel's `data-tab` |
| `label` | `string` | — | Accessible label for the `<tablist>` |

**Slots**

| Slot | Description |
|------|-------------|
| *(default)* | Tab panel elements |

---

### `components/widgets/CustomSelect.astro`

Styled `<select>` element.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `{ value: string; label: string }[]` | — | Select options |
| `label` | `string` | — | Visible label |
| `id` | `string` | — | HTML `id` |
| `name` | `string` | — | Form field name |
| `selectedValue` | `string` | — | Pre-selected value |
| `describedby` | `string` | — | `aria-describedby` target id |
| `class` | `string` | — | Extra CSS classes |

---

## Utility

### `components/Header.astro`

Site navigation bar. No props — reads locale from Astro context internally.

### `components/Footer.astro`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `image` | `{ src: ImageMetadata; alt?: string }` | — | Optional image displayed in the footer |
| `clip` | `boolean` | `false` | Applies a top clip-path to the footer |
| `discordHref` | `string` | — | If provided, renders a `DiscordButton` |

### `components/widgets/LanguagePicker.astro`

Language switcher. No props — reads available locales from `locales.ts` internally.

### `components/LocaleRedirect.astro`

Client-side redirect that picks the best locale from `navigator.languages` and calls `location.replace()`. Falls back to a `<meta http-equiv="refresh">` for no-JS environments. Used in `src/pages/` stubs.

| Prop | Type | Description |
|------|------|-------------|
| `path` | `string` | Path to redirect to, relative to the locale prefix (e.g. `"release-notes/desktop/"`) |

### `components/logos/ThoriumReaderLogo.astro`
### `components/logos/EdrlabLogo.astro`

SVG logo components. No props.
