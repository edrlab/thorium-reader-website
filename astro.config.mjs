import { defineConfig } from "astro/config";
import { defaultLocale, locales } from "./src/i18n/locales.js";

export default defineConfig({
  site: "https://edrlab.github.io",
  base: "/thorium-reader-website",
  output: "static",
  i18n: {
    defaultLocale,
    locales,
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
