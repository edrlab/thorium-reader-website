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

const allImages = import.meta.glob<{ default: ImageMetadata }>("../assets/images/**/*.webp", { eager: true });

export function getImage(lang: Lang, name: string): ImageMetadata {
  const key = `../assets/images/${ lang }/${ name }`;
  const fallback = `../assets/images/en/${ name }`;
  return (allImages[key] ?? allImages[fallback]).default;
}
