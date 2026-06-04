/// <reference types="astro/client" />

declare function gtag(...args: unknown[]): void;

interface ImportMeta {
  glob<T = unknown>(
    pattern: string,
    options?: { eager?: boolean; import?: string; query?: string | Record<string, string> }
  ): Record<string, T>;
}
