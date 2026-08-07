# @edrlab/thorium-badges

![Add to Thorium Reader](assets/thorium-badge.png)

Web components for embedding "Add to Thorium Reader" badges on any page. Two custom elements are provided:

- `<thorium-badge-catalog>` — adds a catalog (and optional bookshelf), OPDS or web, to Thorium Reader.
- `<thorium-badge-publication>` — adds a single publication to Thorium Reader.

Each element renders as a link — the inline SVG badge wrapped in an `<a>` to the corresponding Thorium universal link ([`/add/catalog`](https://www.thoriumreader.com/add/catalog) or [`/add/publication`](https://www.thoriumreader.com/add/publication)). Its required attributes must be set, or it throws (see below). Catalog/bookshelf URLs can be either OPDS feeds or plain web URLs; the publication URL is a direct link to a publication file.

## Installation

```sh
npm install @edrlab/thorium-badges
```

```sh
pnpm add @edrlab/thorium-badges
```

## Usage

### As a package import

Import the package once (for its side effect of registering the custom elements), then use the elements in markup:

```js
import "@edrlab/thorium-badges";
```

```html
<thorium-badge-catalog
  title="My Library"
  main="https://example.com/catalog"
></thorium-badge-catalog>

<thorium-badge-publication
  publication="https://example.com/publication"
  title="My Book"
  author="Jane Doe"
></thorium-badge-publication>
```

### Via `<script src>` (no build step)

`pnpm run build` also produces an IIFE bundle at `dist/thorium-badges.iife.js`, which self-registers both custom elements when loaded directly with a `<script src>` tag instead of being imported as a module — useful for hosting the bundle and letting third parties embed the badge without a build step. 

Since the package is also published to npm, the same bundle is available from unpkg or jsDelivr with no need to host it yourself:

```html
<script src="https://www.thoriumreader.com/embed/thorium-badges.js"></script>
<!-- or -->
<script src="https://unpkg.com/@edrlab/thorium-badges"></script>
<!-- or -->
<script src="https://cdn.jsdelivr.net/npm/@edrlab/thorium-badges"></script>

<thorium-badge-catalog title="My Library" main="https://example.com/catalog"></thorium-badge-catalog>
```

## Attributes

### `<thorium-badge-catalog>`

| Attribute            | Required | Description                                                  |
| -------------------- | -------- | -------------------------------------------------------------- |
| `title`              | ✓        | Catalog display name.                                          |
| `main` / `bookshelf` | one of   | OPDS or web URL to browse the catalog and/or access the user's bookshelf. |
| `passphrase`         |          | Plain-text passphrase, if the feed is protected.                |
| `hashed-passphrase`  |          | Pre-hashed passphrase, as an alternative to `passphrase`.        |
| `open-in`            |          | Where Thorium should open the catalog.                          |
| `icon`               |          | URL of an icon to show for the catalog.                        |
| `banner`             |          | URL of a banner image.                                          |
| `color`              |          | Accent color for the catalog entry.                            |
| `lang`               |          | Badge locale (`"auto"` to detect from the browser; unset behaves the same as `"auto"`). |

Throws if `title` or at least one of `main`/`bookshelf` isn't set.

### `<thorium-badge-publication>`

| Attribute            | Required | Description                                            |
| -------------------- | -------- | -------------------------------------------------------- |
| `publication`        | ✓        | Direct URL to the publication file.                       |
| `title`              |          | Publication title.                                       |
| `author`             |          | Publication author.                                       |
| `cover`              |          | URL of the cover image.                                   |
| `passphrase`         |          | Plain-text passphrase, if the publication is protected.   |
| `hashed-passphrase`  |          | Pre-hashed passphrase, as an alternative to `passphrase`. |
| `lang`               |          | Badge locale (`"auto"` to detect from the browser; unset behaves the same as `"auto"`). |

Throws if `publication` isn't set.

Any attribute pointing to a URL (`main`, `bookshelf`, `icon`, `banner`, `publication`, `cover`) is also validated and throws if it isn't a well-formed URL.

## Localization

Supported `lang` values are `en`, `fr`, and `it`.

- Set `lang` to one of those codes to force that locale.
- Leaving `lang` unset, or setting it to `"auto"`, matches the visitor's browser language (`navigator.languages`) against the supported list, using the first one that matches.
- If that match fails to find a supported locale — or `lang` is any other unsupported value — the badge falls back to `en`.

## Development

From this package directory:

```sh
pnpm run dev    # regenerate badge texts, then vite build --watch
pnpm run build  # regenerate badge texts, then build ESM + IIFE bundles into dist/
```
