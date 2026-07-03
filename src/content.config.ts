import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const desktopReleaseNotes = defineCollection({
  loader: glob({ pattern: "*/*.md", base: "src/content/release-notes/desktop" }),
  schema: z.object({
    title: z.string(),
    version: z.string(),
    date: z.string(),
  }),
});

export const collections = { "desktop-release-notes": desktopReleaseNotes };
