import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

const releaseNotes = defineCollection({
  loader: glob({ pattern: "*/*/*.md", base: "src/content/release-notes" }),
  schema: z.object({
    title: z.string(),
    version: z.string(),
    date: z.string(),
  }),
});

const platformConformance = defineCollection({
  loader: glob({ pattern: "*/*/*.{md,mdx}", base: "src/content/legals" }),
  schema: z.object({
    title: z.string(),
    reportedPlatform: z.string().optional(),
    date: z.string().optional(),
  }),
});

const legalsPages = defineCollection({
  loader: glob({ pattern: "*/{legals,accessibility}.md", base: "src/content/legals" }),
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
  }),
});

const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema(),
});

export const collections = {
  "release-notes": releaseNotes,
  "platform-conformance": platformConformance,
  "legals-pages": legalsPages,
  docs,
};
