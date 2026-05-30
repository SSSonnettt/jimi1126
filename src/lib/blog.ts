import { promises as fs } from "fs";
import path from "path";

export interface BlogMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  format: "mdx" | "html" | "md";
}

const blogDir = path.join(process.cwd(), "content", "blog");

function parseYamlFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const result: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const kv = line.match(/^(\w+)\s*:\s*['"]?(.*?)['"]?\s*$/);
    if (kv) result[kv[1]] = kv[2];
  }
  return result;
}

function extractMdMetadata(
  content: string,
  slug: string
): Omit<BlogMeta, "format"> | null {
  const fm = parseYamlFrontmatter(content);
  if (!fm.title) return null;

  return {
    slug,
    title: fm.title,
    description: fm.description || "",
    date: fm.published || fm.date || "",
    tags: fm.keywords ? fm.keywords.split(",").map((t) => t.trim()).filter(Boolean) : [],
  };
}

function extractMdxMetadata(
  content: string,
  slug: string
): Omit<BlogMeta, "format"> | null {
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

function extractHtmlMetadata(
  content: string,
  slug: string
): Omit<BlogMeta, "format"> | null {
  const titleMatch = content.match(/<title>([^<]*)<\/title>/);
  const title = titleMatch ? titleMatch[1].trim() : slug;

  const descMatch = content.match(
    /<meta\s+name="description"\s+content="([^"]*)"/
  );
  const description = descMatch ? descMatch[1] : "";

  const dateMatch = content.match(
    /<meta\s+name="date"\s+content="([^"]*)"/
  );
  const date = dateMatch ? dateMatch[1] : "";

  const tagsMatch = content.match(
    /<meta\s+name="tags"\s+content="([^"]*)"/
  );
  const tags = tagsMatch
    ? tagsMatch[1].split(",").map((t) => t.trim()).filter(Boolean)
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
      if (file.startsWith(".")) continue;
      const content = await fs.readFile(
        path.join(blogDir, file),
        "utf-8"
      );

      if (file.endsWith(".mdx")) {
        const slug = file.replace(/\.mdx$/, "");
        const meta = extractMdxMetadata(content, slug);
        if (meta) posts.push({ ...meta, format: "mdx" });
      } else if (file.endsWith(".md")) {
        const slug = file.replace(/\.md$/, "");
        const meta = extractMdMetadata(content, slug);
        if (meta) posts.push({ ...meta, format: "md" });
      } else if (file.endsWith(".html")) {
        const slug = file.replace(/\.html$/, "");
        const meta = extractHtmlMetadata(content, slug);
        if (meta) posts.push({ ...meta, format: "html" });
      }
    }

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch {
    return [];
  }
}
