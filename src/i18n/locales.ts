export const defaultLocale = "en";
export const locales = ["en", "da", "es", "fi", "fr", "it", "lt", "pl", "sl"] as const;
export type Locale = (typeof locales)[number];

export const bcp47Locale: Record<Locale, string> = {
  en: "en-us",
  da: "da-dk",
  es: "es-es",
  fi: "fi-fi",
  fr: "fr-fr",
  it: "it-it",
  lt: "lt-lt",
  pl: "pl-pl",
  sl: "sl-si",
};
