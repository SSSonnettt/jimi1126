# Content System

## Purpose

Defines the MDX-based blog content system — how posts are stored, metadata is extracted, and content is rendered at build time. The system supports two content formats: MDX (primary) and HTML (legacy).

## Requirements

### Requirement: MDX File Format

Each blog post SHALL be a `.mdx` file in `src/content/blog/` with `export const metadata` at the top.

Metadata structure:
```js
export const metadata = {
  title: "文章标题",
  description: "文章描述",
  date: "YYYY-MM-DD",
  tags: ["标签1", "标签2"],
};
```

All four fields (title, description, date, tags) MUST be present. The date format SHALL be ISO 8601 (YYYY-MM-DD).

### Requirement: Metadata Extraction

**File:** `src/lib/blog.ts`

The `getBlogPosts()` function SHALL:

1. Read all `.mdx` and `.html` files from `src/content/blog/`
2. Skip files starting with `.`
3. For `.mdx`: extract metadata via regex matching `export const metadata = {...};`
4. For `.html`: extract metadata from `<meta>` tags in `<head>`
5. Return `BlogMeta[]` sorted by date descending

The `BlogMeta` interface:
```ts
interface BlogMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  format: "mdx" | "html";
}
```

Missing date SHALL default to `""`. Missing tags SHALL default to `[]`.

### Requirement: MDX Dynamic Import Rendering

MDX content SHALL be rendered using Next.js's official dynamic import pattern:

```tsx
const { default: PostContent } = await import(
  `@/content/blog/${slug}.mdx`
);
return <PostContent />;
```

This SHALL be inside an async `RenderContent` component, separated from the HTML rendering branch to avoid Turbopack resolution conflicts.

### Requirement: HTML Legacy Format Support

HTML content SHALL be rendered via `fs.readFile` + `dangerouslySetInnerHTML`:

```tsx
const filePath = path.join(process.cwd(), "src", "content", "blog", `${slug}.html`);
const html = await fs.readFile(filePath, "utf-8");
const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
```

The `<body>` content SHALL be extracted via regex; if no match, the full HTML is used.

### Requirement: MDX Component Styling

**File:** `src/mdx-components.tsx`

The `useMDXComponents()` function SHALL provide monochrome-styled overrides for standard Markdown elements:

- `h1`–`h3`: normal weight, no bold, tracking adjustments
- `p`: 14–15px, `text-fg-secondary`, 1.7 line-height
- `a`: underline with offset, hover to foreground
- `code`: surface background, mono font, 13px
- `pre`: surface background, overflow-x auto
- `ul`/`ol`: standard list styles, `text-fg-secondary`
- `blockquote`: left border accent, tertiary text

### Requirement: MDX Escape Rules

Content authors MUST escape the following in `.mdx` files:

- Angle brackets starting with uppercase: `<Distribution Name>` → `&lt;Distribution Name&gt;` (parsed as JSX)
- Curly braces in text: `{name: "jack"}` → `` `{name: "jack"}` `` (parsed as MDX expressions)
- Content inside code blocks (```) is safe from MDX parsing

### Requirement: Content Migration from Legacy Blog

Posts were migrated from `/Users/wuji/workspace/blog/content/articles/` (YAML frontmatter + `.md`) to `src/content/blog/*.mdx` (`export const metadata`).

Migration mapping:
- `title` → `title`
- `description` → `description`
- `published: YYYY/M/D` → `date: "YYYY-MM-DD"`
- `head.meta.keywords` → `tags: [...]`

Migration script: `scripts/migrate-posts.mjs`
Temporary test script: `scripts/test-meta.mjs`
