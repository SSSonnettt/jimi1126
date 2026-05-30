import { cp, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const outDir = "dist-static";
const nextDir = ".next/server/app";

// Clean and create output directory
await mkdir(join(outDir, "_next/static"), { recursive: true });

// Copy static assets (JS, CSS, fonts, images)
await cp(".next/static", join(outDir, "_next/static"), { recursive: true });

// Copy public files
if (existsSync("public")) {
  await cp("public", outDir, { recursive: true });
}

// Copy SSG HTML pages from .next/server/app
async function copyFile(src, dest) {
  if (!existsSync(src)) return;
  await mkdir(join(dest, ".."), { recursive: true });
  await cp(src, dest);
}

// Root page
await copyFile(join(nextDir, "index.html"), join(outDir, "index.html"));

// Static routes
await copyFile(join(nextDir, "about.html"), join(outDir, "about", "index.html"));
await copyFile(join(nextDir, "notes.html"), join(outDir, "notes", "index.html"));
await copyFile(join(nextDir, "work.html"), join(outDir, "work", "index.html"));

// Dynamic blog post routes
const notesDir = join(nextDir, "notes");
if (existsSync(notesDir)) {
  const { readdir } = await import("node:fs/promises");
  const entries = await readdir(notesDir);
  for (const entry of entries) {
    if (entry === "page" || entry === "[slug]") continue;
    const ext = entry.match(/\.(html|rsc)$/)?.[0];
    if (!ext) continue;
    const slug = entry.replace(ext, "");
    const destPath = join(outDir, "notes", slug);
    await mkdir(destPath, { recursive: true });
    const filename = ext === ".rsc" ? `${slug}.rsc` : "index.html";
    await cp(join(notesDir, entry), join(destPath, filename));
  }
}

// Copy RSC files for static routes
await copyFile(join(nextDir, "index.rsc"), join(outDir, "index.rsc"));
await copyFile(join(nextDir, "about.rsc"), join(outDir, "about.rsc"));
await copyFile(join(nextDir, "notes.rsc"), join(outDir, "notes.rsc"));
await copyFile(join(nextDir, "work.rsc"), join(outDir, "work.rsc"));

console.log("Static site assembled in", outDir);
