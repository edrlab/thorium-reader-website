import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const desktopReleaseNotes = defineCollection({
  loader: glob({ pattern: "*.md", base: "src/content/release-notes/desktop" }),
  schema: z.object({
    title: z.string(),
    version: z.string(),
    date: z.string(),
  }),
});

const desktopConformance = defineCollection({
  loader: glob({ pattern: "*.{md,mdx}", base: "src/content/conformance/desktop" }),
  schema: z.object({
    title: z.string(),
    reportedPlatform: z.string().optional(),
    date: z.string().optional(),
  }),
});

export const collections = {
  "desktop-release-notes": desktopReleaseNotes,
  "desktop-conformance": desktopConformance,
};
