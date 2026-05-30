# MDX Rendering Engine Design

## Context

当前 `@next/mdx` 使用 `createMDX({})` 零插件配置，mdx-components.tsx 提供基础样式覆盖，但缺少代码高亮、标题锚点、GFM 扩展、图片优化和目录生成。需要在不引入额外抽象层的前提下，用标准的 remark/rehype 插件补齐这五项能力，同时保持网站的高级简约视觉风格。

## Architecture

在 `@next/mdx` 的 `createMDX` 中配置处理管线：

```
MDX source
  → remark-gfm              parse GFM syntax (tables, footnotes, strikethrough, task lists)
  → rehype-slug             add id to headings
  → rehype-autolink-headings  wrap headings with clickable anchor (no visible icon)
  → rehype-pretty-code      syntax highlighting via Shiki (github-light theme)
  → mdx-components.tsx      React component mapping with Tailwind styles
  → TOC client component    extract h2 from DOM, render sticky sidebar
```

## Dependencies Added

- `remark-gfm` — GFM syntax support
- `rehype-slug` — heading id generation
- `rehype-autolink-headings` — click-to-copy heading anchor
- `rehype-pretty-code` — syntax highlighting via Shiki
- `shiki` — underlying highlighter engine for rehype-pretty-code

## Layer Details

### 1. GFM Extensions (remark-gfm)

Add `remark-gfm` to `remarkPlugins`. Supports tables, footnotes `[^1]`, strikethrough `~~text~~`, task lists `- [ ]`. No additional configuration needed.

### 2. Heading IDs (rehype-slug)

Add `rehype-slug` to `rehypePlugins`. Auto-generates `id` attributes on `<h1>` through `<h6>` from their text content. Enables anchor navigation and TOC linking.

### 3. Heading Anchors (rehype-autolink-headings)

Configure `rehype-autolink-headings` with `behavior: "wrap"`. Each heading becomes a clickable element — clicking copies the URL to clipboard. No visible anchor icon, preserving the minimal aesthetic. A lightweight client-side effect adds cursor styling and copy feedback.

### 4. Code Highlighting (rehype-pretty-code)

Configure `rehype-pretty-code` with:
- `theme: "github-light"` — clean, minimal syntax coloring
- `keepBackground: false` — no background color injection; the existing `bg-surface` on `<pre>` in mdx-components.tsx handles code block backgrounds
- `defaultLang: "plaintext"` — graceful fallback for unlabeled code fences

The rendered HTML uses inline `<span style="color:...">` for tokens, compatible with the existing `<pre>` and `<code>` styling in mdx-components.tsx. No changes needed to the existing component overrides.

### 5. Image Optimization

Override `img` in mdx-components.tsx with a wrapper that applies:
- `width: 720px` max (matches content area)
- `height: auto` for proportional scaling
- `loading="lazy"` for lazy loading
- `className` with responsive styling

Use native `<img>` (not `next/image`) since all blog images are remote URLs from `r2.jimi1126.cn`, and native `<img>` avoids the `remotePatterns` configuration and explicit width/height requirements.

### 6. Table of Contents (Client Component)

A client component `TOC.tsx` that:
- Renders as a sticky sidebar on the right (visible on `lg` screens and above)
- Extracts `h2` elements from the rendered article DOM
- Highlights the current section based on scroll position (`IntersectionObserver`)
- Clicking a link scrolls to the heading (smooth scroll via `scrollIntoView`)
- Renders only if the article has 2+ headings

Layout considerations: the TOC occupies a fixed sidebar position, not affecting the main article column flow. The article max-width (720px) remains unchanged.

### 7. Additional mdx-components Overrides

Add component overrides for newly supported GFM elements:
- `table`, `thead`, `tbody`, `tr`, `th`, `td` — clean border-bottom styling consistent with the site palette
- `del` — strikethrough with reduced opacity
- `input` (checkbox) — styled checkboxes for task lists

## Files to Modify

| File | Changes |
|---|---|
| `next.config.ts` | Add `remarkPlugins` and `rehypePlugins` to `createMDX` |
| `src/mdx-components.tsx` | Add `img`, `table`, `del`, `input` overrides |
| `package.json` | Add new dependencies |
| `src/app/notes/[slug]/page.tsx` | Integrate TOC component into article layout |
| `src/components/toc.tsx` (new) | TOC client component |
| `src/components/heading-copy.tsx` (new) | Client-side copy-on-click effect for headings |
| `src/app/notes/page.tsx` | Adjust layout container for TOC |

## Verification

1. `npm run build` succeeds without errors
2. Visit a post with code blocks — syntax colors are visible, no background override
3. Visit a post with headings — click a heading and verify URL copies correctly
4. Visit a post with tables — verify table renders with proper borders
5. Visit a post with 2+ h2 headings — verify TOC appears on large screens, scroll highlight works
