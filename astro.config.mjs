import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import starlight from "@astrojs/starlight";
import { unified } from "@astrojs/markdown-remark";
import remarkCustomHeaderId from "remark-custom-header-id";
import { defaultLocale, locales, bcp47Locale } from "./src/i18n/locales.js";
import { discordHref, githubHref } from "./src/links.js";
import sitemapAllowlist from "./src/sitemap-allowlist.json" with { type: "json" };

export default defineConfig({
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Fraunces",
      cssVariable: "--font-heading",
      weights: ["100 900"],
      styles: ["normal", "italic"],
      subsets: ["latin", "latin-ext"],
      // Cooper Black/Cooper BT first (Fraunces' cited inspiration, rarely installed),
      // then the "Old Style" stack (modernfontstacks.com) for real-world coverage.
      fallbacks: ["Cooper Black", "Cooper BT", "Iowan Old Style", "Palatino Linotype", "URW Palladio L", "P052", "serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Libre Franklin",
      cssVariable: "--font-sans",
      weights: ["100 900"],
      styles: ["normal", "italic"],
      subsets: ["latin", "latin-ext"],
      // "Neo-Grotesque" stack (modernfontstacks.com): closest available system sans
      // to Libre Franklin's Franklin Gothic revival lineage.
      fallbacks: ["Inter", "Roboto", "Helvetica Neue", "Arial Nova", "Nimbus Sans", "Arial", "sans-serif"],
    },
  ],
  site: "https://www.thoriumreader.com",
  output: "static",
  integrations: [
    starlight({
      disable404Route: true,
      title: "Thorium Reader Guides",
      logo: {
        light: "./src/components/logos/assets/logo-thorium-reader-light-mode.webp",
        dark: "./src/components/logos/assets/logo-thorium-reader.webp",
        replacesTitle: true,
      },
      social: [
        { icon: "discord", label: "Discord", href: discordHref },
        { icon: "github", label: "GitHub", href: githubHref },
      ],
      customCss: ["./src/styles/starlight.css"],
      components: {
        Head: "./src/components/starlight/Head.astro",
        FallbackContentNotice: "./src/components/starlight/FallbackContentNotice.astro",
      },
      sidebar: [
        {
          label: "Guides",
          items: [{ autogenerate: { directory: "guides" } }],
        },
      ],
    }),
    mdx(),
    sitemap({
      // Each allowlist entry lists the locales it applies to ("*" = every locale
      // in src/i18n/locales.ts). path is a regex fragment matched against the pathname.
      filter: (page) =>
        sitemapAllowlist.some(({ path: pattern, locales: allowedLocales }) =>
          (allowedLocales === "*" ? locales : allowedLocales).some((l) =>
            new RegExp(`^https://www\\.thoriumreader\\.com/${ l }${ pattern }$`).test(page),
          ),
        ),
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
