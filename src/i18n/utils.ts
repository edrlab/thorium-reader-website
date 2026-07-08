import i18next from "i18next";
import type { ImageMetadata } from "astro";
import { defaultLocale, locales, bcp47Locale, type Locale } from "./locales.js";

type Lang = string | undefined;
type TOptions = Record<string, unknown>;

const modules = import.meta.glob<{ default: Record<string, unknown> }>("./*.json", { eager: true });

i18next.init({
  lng: defaultLocale,
  fallbackLng: defaultLocale,
  interpolation: { escapeValue: false },
  keySeparator: ".",
  resources: Object.fromEntries(
    locales.map((locale) => [
      locale,
      { translation: modules[`./${ locale }.json`]?.default ?? {} },
    ])
  ),
});

export function localeName(displayLang: Lang, targetLang: string): string {
  const s = new Intl.DisplayNames([displayLang ?? defaultLocale], { type: "language" }).of(targetLang) ?? targetLang;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(lang: Lang, isoDate: string): string {
  const resolved = (lang ?? defaultLocale) as Locale;
  const bcp47 = bcp47Locale[resolved] ?? bcp47Locale[defaultLocale];
  // Parse as noon UTC to avoid date shifting across timezones
  const date = new Date(`${ isoDate }T12:00:00Z`);
  return new Intl.DateTimeFormat(bcp47, { year: "numeric", month: "long", day: "numeric" }).format(date);
}

export function t(lang: Lang, key: string, options: { returnObjects: true } & TOptions): unknown;
export function t(lang: Lang, key: string, options?: TOptions): string | string[];
export function t(lang: Lang, key: string, options: TOptions = {}): unknown {
  return i18next.getFixedT(lang ?? defaultLocale)(key, { ...options, returnObjects: true });
}

export function interpolate(template: string, values: Record<string, string>): string {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(`{{${ key }}}`, value),
    template
  );
}

export function getPlatforms<T extends { id: string }>(entries: T[]): string[] {
  return [...new Set(entries.map((entry) => entry.id.split("/")[0]))].sort((a, b) => a.localeCompare(b));
}

export function localizeCollection<T extends { id: string }>(
  entries: T[],
  lang: string,
  platform?: string
): { slug: string; note: T }[] {
  const prefix = platform ? `${ platform }/` : "";
  const bySlug = new Map<string, { en?: T; localized?: T }>();
  for (const entry of entries) {
    if (!entry.id.startsWith(prefix)) continue;
    const rest = entry.id.slice(prefix.length);
    const sep = rest.indexOf("/");
    const entryLang = rest.slice(0, sep);
    const slug = rest.slice(sep + 1);
    const bucket = bySlug.get(slug) ?? {};
    if (entryLang === defaultLocale) bucket.en = entry;
    if (entryLang === lang) bucket.localized = entry;
    bySlug.set(slug, bucket);
  }
  return [...bySlug.entries()].map(([slug, { en, localized }]) => {
    const note = localized ?? en;
    if (!note) throw new Error(`Missing English fallback for "${ platform ? platform + "/" : "" }${ slug }"`);
    return { slug, note };
  });
}

const allImages = import.meta.glob<{ default: ImageMetadata }>("../assets/images/**/*.webp", { eager: true });

export function getImage(lang: Lang, name: string): ImageMetadata {
  const key = `../assets/images/${ lang }/${ name }`;
  const fallback = `../assets/images/en/${ name }`;
  return (allImages[key] ?? allImages[fallback]).default;
}
