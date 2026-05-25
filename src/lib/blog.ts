import { promises as fs } from "fs";
import path from "path";

export interface BlogMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

const blogDir = path.join(process.cwd(), "content", "blog");

function extractMetadata(
  content: string,
  slug: string
): BlogMeta | null {
  // Match: export const metadata = { ... };
  const metaMatch = content.match(
    /export\s+const\s+metadata\s*=\s*(\{[\s\S]*?\n\});/
  );
  if (!metaMatch) return null;

  const metaStr = metaMatch[1];
  const title = extractString(metaStr, "title") || slug;
  const description = extractString(metaStr, "description") || "";
  const date = extractString(metaStr, "date") || "";
  const tagsStr = metaStr.match(/tags\s*:\s*\[([^\]]*)\]/);
  const tags = tagsStr
    ? tagsStr[1]
        .split(",")
        .map((t) => t.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean)
    : [];

  return { slug, title, description, date, tags };
}

function extractString(source: string, key: string): string | null {
  const re = new RegExp(`${key}\\s*:\\s*["'\`]([^"'\\\`]*)["'\`]`);
  const match = source.match(re);
  return match ? match[1] : null;
}

export async function getBlogPosts(): Promise<BlogMeta[]> {
  try {
    const files = await fs.readdir(blogDir);
    const posts: BlogMeta[] = [];
    for (const file of files) {
      if (!file.endsWith(".mdx")) continue;
      const slug = file.replace(/\.mdx$/, "");
      const content = await fs.readFile(
        path.join(blogDir, file),
        "utf-8"
      );
      const meta = extractMetadata(content, slug);
      if (meta) {
        posts.push(meta);
      }
    }
    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch {
    return [];
  }
}
