export const defaultLocale = "en";
export const locales = ["en", "es", "fi", "fr", "it", "lt", "sl"] as const;
export type Locale = (typeof locales)[number];

export const bcp47Locale: Record<Locale, string> = {
  en: "en-us",
  es: "es-es",
  fi: "fi-fi",
  fr: "fr-fr",
  it: "it-it",
  lt: "lt-lt",
  sl: "sl-si",
};
