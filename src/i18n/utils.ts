import i18next from "i18next";
import type { ImageMetadata } from "astro";
import { defaultLocale, locales } from "./locales.js";

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

export function t(lang: Lang, key: string, options: TOptions = {}): string {
  return i18next.getFixedT(lang ?? defaultLocale)(key, options) as string;
}

const allImages = import.meta.glob<{ default: ImageMetadata }>("../assets/images/**/*.webp", { eager: true });

export function getImage(lang: Lang, name: string): ImageMetadata {
  const key = `../assets/images/${ lang }/${ name }`;
  const fallback = `../assets/images/en/${ name }`;
  return (allImages[key] ?? allImages[fallback]).default;
}
