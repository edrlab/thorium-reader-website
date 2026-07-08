import { copyFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const src = join(rootDir, "packages/thorium-badges/dist/thorium-badges.iife.js");
const destDir = join(rootDir, "dist/embed");

mkdirSync(destDir, { recursive: true });
copyFileSync(src, join(destDir, "thorium-badges.js"));
