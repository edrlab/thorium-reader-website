export const defaultLocale = "en";
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const bcp47Locale: Record<Locale, string> = {
  en: "en-us",
  fr: "fr-fr",
};
