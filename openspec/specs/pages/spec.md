# Pages & Routing

## Purpose

Defines the five route pages of the Sonnet site — their layout structure, data sources, and content strategy. All pages are statically rendered with zero client-side data fetching.

## Requirements

### Requirement: Home Page (/) — Density Narrative

**File:** `src/app/page.tsx`

The home page SHALL present a single-scroll density-narrative layout with no section divisions.

Sections in order:
1. Oversized headline: "构建系统 / 不只是界面" (56px, font-extralight)
2. Metadata strip: "FRONTEND ENGINEER · 8年 · 20+项目" (11px, wide tracking)
3. Full-width rule (1px border)
4. Introductory prose (2 paragraphs, 14px)
5. Skill chips (flex-wrap, bordered text chips)
6. Full-width rule
7. Project list (title + tags + arrow, hover border highlight)
8. "查看全部作品 →" link

All text content is hardcoded. Project data comes from `@/lib/projects`.

### Requirement: Notes Listing (/notes)

**File:** `src/app/notes/page.tsx`

The notes listing page SHALL display all blog posts sorted by date descending.

Each post row SHALL show:
- Title (14px, left-aligned)
- Date (11px, right-aligned)
- Border-bottom separator with hover highlight

Data source: `getBlogPosts()` from `@/lib/blog`.

Empty state: When no posts exist, display "还没有文章。"

### Requirement: Blog Post (/notes/[slug])

**File:** `src/app/notes/[slug]/page.tsx`

Individual blog post pages SHALL use SSG with `generateStaticParams()` and `dynamicParams = false`.

Page structure:
- Back link "返回笔记" with ArrowLeft icon
- Article title (28–36px)
- Date + tags metadata row
- Rendered content (MDX or HTML)

Content rendering SHALL use `RenderContent` async component:
- MDX format: `await import(`@/content/blog/${slug}.mdx`)` dynamic import
- HTML format: `fs.readFile` + `dangerouslySetInnerHTML` from body extraction

404 behavior: If slug is not found in `getBlogPosts()`, call `notFound()`.

### Requirement: Work Page (/work)

**File:** `src/app/work/page.tsx`

The work page SHALL display all projects from `@/lib/projects` as a bordered list with ExternalLink icons on hover.

### Requirement: About Page (/about)

**File:** `src/app/about/page.tsx`

The about page SHALL present a 5-paragraph prose narrative with:
- "Sonnet" headline + "FRONTEND ENGINEER" label
- Career timeline and philosophy
- Skills list (text-only, no chips)
- GitHub + Email links

### Requirement: Layout Shell

**File:** `src/app/layout.tsx`

The root layout SHALL provide:
- Geist + Geist Mono font loading
- Metadata: title "Sonnet", template "%s | Sonnet"
- ThemeProvider wrapper (attribute="class", defaultTheme="system")
- NavBar (sticky top)
- Main content area (flex-1)
- Footer
- `suppressHydrationWarning` on `<html>`
