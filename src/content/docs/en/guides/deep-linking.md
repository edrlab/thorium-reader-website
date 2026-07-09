---
title: Deep Linking
description: Add a catalog or a publication to Thorium Reader from your own site — links, badge, and web components.
---

Thorium Reader can be opened directly from a link on your site to pre-fill a catalog (OPDS or web) or a single publication, so a reader can add it in one tap without copy-pasting a URL. This guide covers the link format, the two ways to trigger it (HTTPS universal links and a custom scheme), and the two ready-made tools for embedding an "Add to Thorium Reader" badge: a static generator page and a web component.

## The Two Kinds of Link

Every deep link targets one of two actions, each with its own base URL:

| Action | HTTPS universal link | Custom scheme |
|---|---|---|
| Add a catalog | `https://www.thoriumreader.com/add/catalog` | `com.thoriumreader:/add/catalog` |
| Add a publication | `https://www.thoriumreader.com/add/publication` | `com.thoriumreader:/add/publication` |

Both forms take the same query parameters — only the base URL differs.

- **HTTPS universal link** — a normal `https://` URL. On platforms where Thorium Reader is registered as a universal/app link handler, the OS opens the app directly; otherwise the link falls back to the corresponding page on thoriumreader.com, which shows a button that finishes the job via the custom scheme. Use this form when embedding a link on a web page, since custom-scheme URLs can be blocked or flagged by some browsers/platforms if Thorium isn't installed.
- **Custom scheme** — `com.thoriumreader:/…`. Resolved directly by Thorium Reader if it's installed; does nothing (or is blocked) otherwise. Use this form when you already know Thorium Reader is installed or reachable — for example, from within another native app, or when you're building your own fallback/detection logic.

Two scoped variants of the custom scheme also exist, each handled by only one app: `com.thoriumreader.desktop:` and `com.thoriumreader.mobile:`. They're aliases for platform-to-platform handoffs where the caller already knows which app it's targeting. For a badge or link on a web page, always use the generic `com.thoriumreader:` scheme (or the HTTPS universal link) so it works regardless of which platform the visitor is on.

## Add a Catalog

Base URL: `/add/catalog`.

| Parameter | Required | Description |
|---|---|---|
| `title` | ✓ | Catalog display name in Thorium Reader. |
| `main` / `bookshelf` | one of* | OPDS or web URL to browse the catalog / for the user's bookshelf. |
| `passphrase` | | Plain-text LCP passphrase. |
| `hashed_passphrase` | | Pre-hashed LCP passphrase — use instead of `passphrase`. |
| `open_in` | | How Thorium should open the catalog's URLs: `webview` or `browser`. |
| `icon` | | Square image URL (PNG or SVG) for the catalog icon. |
| `banner` | | Banner image URL. |
| `color` | | Accent color: `gray`, `red`, `yellow`, `blue`, `green`, `purple`, `orange`, or `pink`. |

\* At least one of `main` or `bookshelf` is required.

```text
https://www.thoriumreader.com/add/catalog?title=My+Library&main=https%3A%2F%2Fexample.com%2Fcatalog
```

## Add a Publication

Base URL: `/add/publication`.

| Parameter | Required | Description |
|---|---|---|
| `publication` | ✓ | Direct URL to the publication file. |
| `title` | | Publication title. |
| `author` | | Publication author. |
| `cover` | | Cover image URL. |
| `passphrase` | | Plain-text LCP passphrase. |
| `hashed_passphrase` | | Pre-hashed LCP passphrase — use instead of `passphrase`. |

```text
https://www.thoriumreader.com/add/publication?publication=https%3A%2F%2Fexample.com%2Fbook.epub&title=My+Book
```

## Platform Support

Both parameter tables above are the full set defined by the deep link format, but the two apps don't currently implement all of them equally:

- **Mobile** reads every parameter listed — `title`/`main`/`bookshelf`/`color`/`open_in`/`icon`/`banner`/`passphrase`/`hashed_passphrase` for catalogs, and the full publication set.
- **Desktop** currently only reads `title` and `main` for a catalog, and `publication` for a publication — `bookshelf`, `passphrase`, `hashed_passphrase`, `icon`, `banner`, `open_in`, and `color` are parsed from the URL but not yet applied.

So a badge built with, say, `icon` and `color` will show them on mobile but not on desktop today. This reflects the reader apps' current state and may close over time — if parity matters for your use case, treat `title` + `main`/`bookshelf` (catalog) or `title` + `publication` (publication) as the only fields guaranteed to work everywhere.

## The Badge

An "Add to Thorium Reader" badge is a small SVG button (the Thorium logo plus localized "Add to Thorium Reader" text) that links to one of the URLs above. There are two ways to get one, depending on whether you want a one-off link or a live component.

### Generator Pages

The [badge generator](/en/badge/) hosts two form-based generators, one for catalogs and one for publications. Fill in the fields and the page renders a live SVG preview plus an HTML snippet — an `<a>` wrapping the inline SVG, pointed at the HTTPS universal link — ready to paste into any page. The badge's text is rendered in whichever locale is selected in the generator, independently of the page's own locale.

Use this when you want a static, copy-pasted badge with no build step or JavaScript dependency on your page.

### `@edrlab/thorium-badges` Web Components

For sites that want the badge to stay in sync with catalog/publication data (rather than a one-time generated snippet), the `@edrlab/thorium-badges` package provides two custom elements: `<thorium-badge-catalog>` and `<thorium-badge-publication>`. Each renders as a link — the inline SVG badge wrapped in an `<a>` to the corresponding HTTPS universal link — built from its attributes.

```html
<thorium-badge-catalog
  title="My Library"
  main="https://example.com/catalog"
></thorium-badge-catalog>

<thorium-badge-publication
  publication="https://example.com/book.epub"
  title="My Book"
  author="Jane Doe"
></thorium-badge-publication>
```

Load it either as a module import (registers the elements as a side effect):

```js
import "@edrlab/thorium-badges";
```

or with a plain `<script src>` and no build step:

```html
<script src="https://www.thoriumreader.com/embed/thorium-badges.js"></script>
```

#### `<thorium-badge-catalog>` Attributes

| Attribute | Required | Description |
|---|---|---|
| `title` | ✓ | Catalog display name. |
| `main` / `bookshelf` | one of | OPDS or web URL to browse the catalog and/or access the user's bookshelf. |
| `passphrase` | | Plain-text passphrase, if the feed is protected. |
| `hashed-passphrase` | | Pre-hashed passphrase, as an alternative to `passphrase`. |
| `open-in` | | Where Thorium should open the catalog. |
| `icon` | | URL of an icon to show for the catalog. |
| `banner` | | URL of a banner image. |
| `color` | | Accent color for the catalog entry. |
| `lang` | | Badge locale (`"auto"` to detect from the browser; unset falls back to the site default). |

Throws if `title`, or at least one of `main`/`bookshelf`, isn't set.

#### `<thorium-badge-publication>` Attributes

| Attribute | Required | Description |
|---|---|---|
| `publication` | ✓ | Direct URL to the publication file. |
| `title` | | Publication title. |
| `author` | | Publication author. |
| `cover` | | URL of the cover image. |
| `passphrase` | | Plain-text passphrase, if the publication is protected. |
| `hashed-passphrase` | | Pre-hashed passphrase, as an alternative to `passphrase`. |
| `lang` | | Badge locale (`"auto"` to detect from the browser; unset falls back to the site default). |

Throws if `publication` isn't set.

Any attribute pointing to a URL (`main`, `bookshelf`, `icon`, `banner`, `publication`, `cover`) is validated and throws if it isn't well-formed.

Note that attribute names are kebab-case (`hashed-passphrase`, `open-in`) while the equivalent query parameters on the deep link itself are snake_case (`hashed_passphrase`, `open_in`) — the element translates between the two when it builds the link.

### Localization

Supported `lang` values are `en`, `fr`, and `it`.

- Set `lang` to one of those codes to force that locale.
- Set `lang="auto"` to match the visitor's browser language (`navigator.languages`) against the supported list, using the first match.
- If `lang` is unset, is `"auto"` with no match, or is any other unsupported value, the badge falls back to `en`.

## Pages

Two pairs of pages support deep linking on thoriumreader.com itself:

- **`/badge/catalog` and `/badge/publication`** — the generator forms described above.
- **`/add/catalog` and `/add/publication`** — the HTTPS universal link targets. Each is a normal page that reads its own query string, shows an "Add to Thorium Reader" button built from the custom-scheme link plus the same query string, and displays download links for Thorium Reader below it. This is the fallback a visitor lands on when the universal link isn't intercepted by an installed app — for example, on a platform without Thorium Reader, or in a browser that doesn't support the underlying app-link mechanism.
