// Supported locale list comes straight from the site app (single source of
// truth). Button copy comes from ./badge-texts.generated.ts, produced by
// scripts/generate-badge-texts.mjs from the site's src/i18n/*.json files —
// run automatically before build/dev (see package.json), never
// hand-edited, never committed.
import { locales, defaultLocale } from "../../../src/i18n/locales.js";
import { badgeTexts as generatedBadgeTexts } from "./badge-texts.generated.js";

export { locales, defaultLocale };
export type Locale = (typeof locales)[number];

export interface BadgeTexts {
  line1: string;
  line2: string;
  alt: string;
}

export const badgeTexts = generatedBadgeTexts as Record<Locale, BadgeTexts>;

export function interpolate(template: string, values: Record<string, string>): string {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(`{{${ key }}}`, value),
    template
  );
}

export function resolveLocale(lang: string | null): Locale {
  if (lang && lang !== "auto" && (locales as readonly string[]).includes(lang)) {
    return lang as Locale;
  }
  if (lang === "auto" || !lang) {
    if (typeof navigator !== "undefined" && navigator.languages) {
      const preferred = navigator.languages
        .map((tag) => tag.split("-")[0].toLowerCase())
        .find((tag) => (locales as readonly string[]).includes(tag));
      if (preferred) return preferred as Locale;
    }
  }
  return defaultLocale;
}
