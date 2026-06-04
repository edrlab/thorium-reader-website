# Adding a Page

All pages live in two places: a locale-aware file under `src/pages/[lang]/` and a thin stub under `src/pages/` that redirects to it.

## 1. Create the locale-aware page

Add your page at `src/pages/[lang]/your-page.astro`. Export `getStaticPaths` to generate one route per locale:

```astro
---
import Layout from "../../layouts/Layout.astro";
import Footer from "../../components/Footer.astro";
import { locales } from "../../i18n/locales.js";
import { t } from "../../i18n/utils.js";

export function getStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}

const lang = Astro.currentLocale ?? "en";
---

<Layout title={ t(lang, "your-page.title") }>
  <!-- page content -->
  <Footer slot="footer" />
</Layout>
```

This generates `/en/your-page/`, `/fr/your-page/`, `/it/your-page/`, etc.

## 2. Create the root stub

Add `src/pages/your-page.astro` with a `LocaleRedirect` pointing to the page path:

```astro
---
import LocaleRedirect from "../components/LocaleRedirect.astro";
---
<LocaleRedirect path="your-page/" />
```

This makes `/your-page/` redirect to the correct locale based on the visitor's browser language (with a `<meta http-equiv="refresh">` fallback for no-JS).

## 3. Add i18n strings

Add the page's strings to `src/i18n/en.json` under a new top-level key. See `docs/i18n-strings.md` for the conventions.

## Nested pages

For nested routes (e.g. `/your-page/sub-page/`), mirror the structure inside `src/pages/[lang]/your-page/` and add a corresponding stub under `src/pages/your-page/`. See the `release-notes/desktop/` pages as a reference.
