export const defaultLocale = "en";
export const locales = ["en", "fr", "it", "es"] as const;
export type Locale = (typeof locales)[number];

export const bcp47Locale: Record<Locale, string> = {
  en: "en-us",
  fr: "fr-fr",
  it: "it-it",
  es: "es-es",
};
