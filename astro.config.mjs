import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import starlight from "@astrojs/starlight";
import { unified } from "@astrojs/markdown-remark";
import remarkCustomHeaderId from "remark-custom-header-id";
import { defaultLocale, locales, bcp47Locale } from "./src/i18n/locales.js";
import { discordHref } from "./src/links.js";

export default defineConfig({
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Fraunces",
      cssVariable: "--font-heading",
      weights: ["100 900"],
      styles: ["normal", "italic"],
      subsets: ["latin"],
    },
    {
      provider: fontProviders.google(),
      name: "Libre Franklin",
      cssVariable: "--font-sans",
      weights: ["100 900"],
      styles: ["normal", "italic"],
      subsets: ["latin"],
    },
  ],
  site: "https://www.thoriumreader.com",
  output: "static",
  integrations: [
    starlight({
      title: "Thorium Reader Guides",
      sidebar: [
        {
          label: "Guides",
          items: [{ autogenerate: { directory: "guides" } }],
        },
      ],
    }),
    mdx(),
    sitemap({
      filter: (page) =>
        locales.some((l) => page.startsWith(`https://www.thoriumreader.com/${ l }/`)),
      i18n: {
        defaultLocale,
        locales: Object.fromEntries(locales.map((l) => [l, bcp47Locale[l]])),
      },
    }),
  ],
  redirects: {
    "/discord": discordHref,
    ...Object.fromEntries(locales.map((l) => [`/${ l }/discord`, discordHref])),
  },
  i18n: {
    defaultLocale,
    locales,
    routing: {
      prefixDefaultLocale: true,
    },
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkCustomHeaderId],
    }),
  },
});
