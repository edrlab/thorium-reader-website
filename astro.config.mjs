import { defineConfig } from "astro/config";
import { defaultLocale, locales } from "./src/i18n/locales.js";

export default defineConfig({
  output: "static",
  i18n: {
    defaultLocale,
    locales,
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
