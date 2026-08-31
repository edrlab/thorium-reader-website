# Guides (Starlight)

The `/guides` section (`src/content/docs/`) is a [Starlight](https://starlight.astro.build/) doc site, integrated separately from the rest of the (plain Astro) site. It has its own layout, sidebar, and Markdown conventions — this doc covers the parts that aren't obvious from `astro.config.mjs`.

For anything not covered here, check the [Starlight docs](https://starlight.astro.build/guides/pages/) directly rather than guessing from existing pages.

## Adding a guide

Add a `.md` or `.mdx` file under `src/content/docs/en/guides/`. The sidebar in `astro.config.mjs` autogenerates from that directory, so no manual route/nav wiring is needed. Every guide needs frontmatter:

```mdx
---
title: Page Title
description: One-sentence summary, used in nav/SEO.
---
```

Use `.mdx` (not `.md`) if the page needs components or custom elements (e.g. `<thorium-badge-catalog>` in [deep-linking.mdx](../src/content/docs/en/guides/deep-linking.mdx)).

## Translations

`fr` and `it` guides live under `src/content/docs/fr/guides/` and `src/content/docs/it/guides/`, mirroring the `en` structure. Both are currently empty — untranslated pages silently fall back to the English version rather than showing Starlight's default "this page isn't translated yet" banner, because `components.FallbackContentNotice` is overridden with an empty component in `astro.config.mjs`. Don't hand-translate these yourself; see the general i18n conventions in [i18n-strings.md](i18n-strings.md).

## Asides

Starlight supports callout boxes directly in Markdown/MDX — no import needed:

```mdx
:::note
Neutral, supplementary info.
:::

:::tip
A helpful suggestion.
:::

:::caution
Something to watch out for — e.g. a partial/unsupported feature.
:::

:::danger
A destructive or high-risk action.
:::
```

Add a custom title with `:::caution[Custom Title]`. Full syntax and options: [Starlight — Asides](https://starlight.astro.build/guides/authoring-content/#asides).

## Custom components

Starlight's own components can be overridden per the `components` map in `astro.config.mjs`. Currently overridden:

- `Head` (`src/components/starlight/Head.astro`)
- `FallbackContentNotice` (`src/components/starlight/FallbackContentNotice.astro`) — emptied out, see [Translations](#translations) above

See [Starlight — Overriding Components](https://starlight.astro.build/guides/overriding-components/) before adding another override.

## Styling

Starlight-specific CSS overrides go in `src/styles/starlight.css` (wired via `customCss` in `astro.config.mjs`), not `src/styles/global.css` — the rest of the site's CSS lives there instead.
