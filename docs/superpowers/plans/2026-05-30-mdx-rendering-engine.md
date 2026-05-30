# MDX Rendering Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add code highlighting, heading anchors, GFM extensions, image optimization, and TOC to the MDX rendering pipeline using standard remark/rehype plugins.

**Architecture:** Configure `createMDX` with remark-gfm, rehype-slug, rehype-autolink-headings, and rehype-pretty-code. Add new mdx-components overrides for GFM elements and images. Add client components for heading copy-on-click and TOC sidebar.

**Tech Stack:** remark-gfm, rehype-slug, rehype-autolink-headings, rehype-pretty-code, shiki

---

### Task 1: Install dependencies

**Files:** Modify: `package.json`

- [ ] **Step 1: Install all new dependencies**

```bash
npm install remark-gfm rehype-slug rehype-autolink-headings rehype-pretty-code shiki
```

- [ ] **Step 2: Verify install**

```bash
node -e "require('remark-gfm'); require('rehype-slug'); require('rehype-autolink-headings'); require('rehype-pretty-code'); require('shiki'); console.log('OK')"
```

Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add remark/rehype plugins for MDX rendering"
```

---

### Task 2: Configure MDX pipeline in next.config.ts

**Files:** Modify: `next.config.ts`

- [ ] **Step 1: Add remark and rehype plugins to createMDX**

Read the current `next.config.ts` at `/Users/wuji/workspace/jimi1126/next.config.ts`. Replace its contents with:

```ts
import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "wrap" }],
    [rehypePrettyCode, { theme: "github-light", keepBackground: false, defaultLang: "plaintext" }],
  ],
});

export default withMDX(nextConfig);
```

- [ ] **Step 2: Restart dev server and verify compilation**

```bash
npm run dev
```

Visit `http://localhost:3000/notes/hello-world` — should return 200 with no errors.

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git commit -m "feat: add remark-gfm, rehype-slug, rehype-autolink-headings, rehype-pretty-code to MDX pipeline"
```

---

### Task 3: Add new mdx-component overrides

**Files:** Modify: `src/mdx-components.tsx`

- [ ] **Step 1: Add img, table, del, input overrides to useMDXComponents**

Read the current `src/mdx-components.tsx` at `/Users/wuji/workspace/jimi1126/src/mdx-components.tsx`. Replace the `useMDXComponents` function body — keep all existing overrides (h1, h2, h3, p, a, code, pre, ul, ol, li, blockquote) and append these new overrides inside the returned object, after the `blockquote` entry:

```tsx
    img: ({ src, alt }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt || ""}
        loading="lazy"
        className="my-6 w-full max-w-[720px] h-auto"
      />
    ),
    table: ({ children }) => (
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-[14px] text-fg-secondary border-collapse">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="border-b border-border">{children}</thead>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => <tr className="border-b border-border">{children}</tr>,
    th: ({ children }) => (
      <th className="px-3 py-2 text-left font-normal text-fg-tertiary text-[12px]">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-3 py-2">{children}</td>
    ),
    del: ({ children }) => (
      <del className="opacity-50">{children}</del>
    ),
    input: ({ type, checked, disabled }) => (
      <input
        type={type}
        checked={checked}
        disabled={disabled}
        className="mr-2 accent-foreground"
        readOnly
      />
    ),
```

- [ ] **Step 2: Verify page with tables renders correctly**

Visit `http://localhost:3000/notes/%E5%AD%97%E7%AC%A6%E8%BD%AC%E6%8D%A2%E5%A4%A7%E5%AD%97%E7%AC%A6` — the changelog table should have border styling and no raw HTML errors.

- [ ] **Step 3: Commit**

```bash
git add src/mdx-components.tsx
git commit -m "feat: add img, table, del, input overrides to mdx-components"
```

---

### Task 4: Create heading copy-on-click client component

**Files:** Create: `src/components/shared/heading-copy.tsx`

- [ ] **Step 1: Create the heading-copy component**

Create `/Users/wuji/workspace/jimi1126/src/components/shared/heading-copy.tsx`:

```tsx
"use client";

import { useEffect, useCallback } from "react";

export function HeadingCopy() {
  const handleClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const heading = target.closest("h1, h2, h3, h4, h5, h6");
    if (!heading || !heading.id) return;

    const url = new URL(window.location.href);
    url.hash = heading.id;
    navigator.clipboard.writeText(url.toString());

    heading.style.cursor = "copy";
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [handleClick]);

  return null;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/shared/heading-copy.tsx
git commit -m "feat: add heading-copy client component for click-to-copy anchors"
```

---

### Task 5: Create TOC client component

**Files:** Create: `src/components/shared/toc.tsx`

- [ ] **Step 1: Create the TOC component**

Create `/Users/wuji/workspace/jimi1126/src/components/shared/toc.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";

interface TocItem {
  id: string;
  text: string;
}

export function TOC() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll("article h2")
    ) as HTMLHeadingElement[];

    if (headings.length < 2) return;

    setItems(
      headings.map((h) => ({
        id: h.id,
        text: h.textContent || "",
      }))
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  if (items.length < 2) return null;

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <p className="text-[10px] tracking-[0.2em] text-fg-tertiary mb-3">
        ON THIS PAGE
      </p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className={`block text-[12px] leading-relaxed transition-colors ${
                activeId === item.id
                  ? "text-foreground"
                  : "text-fg-tertiary hover:text-fg-secondary"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/shared/toc.tsx
git commit -m "feat: add TOC client component with IntersectionObserver scroll tracking"
```

---

### Task 6: Integrate TOC and heading-copy into article page

**Files:** Modify: `src/app/notes/[slug]/page.tsx`

- [ ] **Step 1: Add imports and TOC layout to BlogPostPage**

Read the current `src/app/notes/[slug]/page.tsx`. Replace the `BlogPostPage` return block (the `<div className="mx-auto max-w-[720px]...">` wrapper) to add TOC sidebar and HeadingCopy:

```tsx
import { TOC } from "@/components/shared/toc";
import { HeadingCopy } from "@/components/shared/heading-copy";

// In BlogPostPage, replace the return statement with:

  return (
    <>
      <HeadingCopy />
      <div className="mx-auto max-w-[1080px] px-4 md:px-8">
        <div className="flex gap-12">
          <article className="flex-1 min-w-0 max-w-[720px] py-20">
            <Link
              href="/notes"
              className="inline-flex items-center gap-1.5 text-[12px] text-fg-tertiary hover:text-fg-secondary mb-12"
            >
              <ArrowLeft className="h-3 w-3" /> 返回笔记
            </Link>
            <header className="mb-8">
              <h1 className="text-[28px] md:text-[36px] font-normal tracking-[-0.02em] leading-[1.15] text-foreground">
                {post.title}
              </h1>
              <div className="mt-4 flex items-center gap-3">
                <time className="text-[12px] text-fg-tertiary">{post.date}</time>
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[11px] text-fg-inactive">
                    {tag}
                  </span>
                ))}
              </div>
            </header>
            <RenderContent slug={slug} format={post.format} />
          </article>
          <aside className="hidden lg:block w-[180px] shrink-0 pt-20">
            <TOC />
          </aside>
        </div>
      </div>
    </>
  );
```

- [ ] **Step 2: Verify layout on a post with headings**

Visit `http://localhost:3000/notes/%E6%B5%85%E6%9E%90%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96` — on a wide viewport, verify the TOC sidebar appears on the right with the article content on the left.

- [ ] **Step 3: Commit**

```bash
git add src/app/notes/\[slug\]/page.tsx
git commit -m "feat: integrate TOC sidebar and heading-copy into article layout"
```

---

### Task 7: Final verification

**Files:** No changes — verification only.

- [ ] **Step 1: Clean build**

```bash
npm run build
```

Expected: build succeeds with no errors.

- [ ] **Step 2: Dev server smoke test**

```bash
npm run dev
```

Verify in browser:
- `/notes/hello-world` — code blocks show syntax colors, headings are clickable
- `/notes/%E6%B5%85%E6%9E%90%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96` — TOC sidebar visible on wide viewport, scroll highlights active section
- `/notes/%E5%AD%97%E7%AC%A6%E8%BD%AC%E6%8D%A2%E5%A4%A7%E5%AD%97%E7%AC%A6` — table renders with proper borders, images are lazy-loaded
