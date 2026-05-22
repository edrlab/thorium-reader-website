import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const releaseNotes = defineCollection({
  loader: glob({ pattern: "*.md", base: "src/content/release-notes" }),
  schema: z.object({
    title: z.string(),
    version: z.string(),
    date: z.string(),
  }),
});

export const collections = { "release-notes": releaseNotes };
