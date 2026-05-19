/// <reference types="astro/client" />

interface ImportMeta {
  glob<T = unknown>(
    pattern: string,
    options?: { eager?: boolean; import?: string; query?: string | Record<string, string> }
  ): Record<string, T>;
}
