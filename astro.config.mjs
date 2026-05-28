import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { defaultLocale, locales, bcp47Locale } from "./src/i18n/locales.js";

export default defineConfig({
  site: "https://edrlab.github.io",
  base: "/thorium-reader-website/",
  output: "static",
  integrations: [
    sitemap({
      i18n: {
        defaultLocale,
        locales: Object.fromEntries(locales.map((l) => [l, bcp47Locale[l]])),
      },
    }),
  ],
  i18n: {
    defaultLocale,
    locales,
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
