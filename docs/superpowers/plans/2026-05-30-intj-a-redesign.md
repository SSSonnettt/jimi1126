# INTJ-A Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform personal website from warm/social design to cold, monochrome, typography-driven INTJ-A aesthetic.

**Architecture:** Two-pass approach. Pass 1 rewrites the foundation (CSS tokens, layout shell, shared components) while the old site still works. Pass 2 rewrites each page and deletes unused components. This ensures we never have a broken intermediate state.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, framer-motion (scroll-reveal only), MDX (@next/mdx), lucide-react (functional icons only)

---

### Task 1: Rewrite design tokens (globals.css)

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Rewrite globals.css with INTJ-A design tokens**

```css
@import "tailwindcss";

:root {
  --background: #0a0a0a;
  --foreground: #f5f5f5;
  --fg-secondary: #888888;
  --fg-tertiary: #555555;
  --fg-inactive: #333333;
  --surface: #0f0f0f;
  --border: #1a1a1a;
  --border-hi: #2a2a2a;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-fg-secondary: var(--fg-secondary);
  --color-fg-tertiary: var(--fg-tertiary);
  --color-fg-inactive: var(--fg-inactive);
  --color-surface: var(--surface);
  --color-border: var(--border);
  --color-border-hi: var(--border-hi);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "design: rewrite CSS tokens for INTJ-A monochrome palette"
```

---

### Task 2: Simplify layout shell (metadata + navbar + footer)

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/components/layout/navbar.tsx`
- Modify: `src/components/layout/footer.tsx`

- [ ] **Step 1: Update root layout — remove ThemeProvider, update metadata**

Write `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NavBar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "JIMI1126", template: "%s | JIMI1126" },
  description: "前端开发工程师 · 系统构建者",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Rewrite navbar — monochrome, no theme toggle, no mobile sheet**

Write `src/components/layout/navbar.tsx`:

```tsx
import Link from "next/link";

const links = [
  { href: "/work", label: "WORK" },
  { href: "/notes", label: "NOTES" },
  { href: "/about", label: "ABOUT" },
];

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <nav className="mx-auto flex h-14 max-w-[720px] items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="text-[12px] font-normal tracking-[0.15em] text-foreground"
        >
          JIMI1126
        </Link>
        <div className="flex items-center gap-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] font-normal tracking-[0.15em] text-fg-tertiary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
```

- [ ] **Step 3: Rewrite footer — 3-line minimal**

Write `src/components/layout/footer.tsx`:

```tsx
export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[720px] items-center justify-between px-4 md:px-8 py-6 text-[11px] text-fg-inactive">
        <a href="mailto:jimi1126_mid@163.com" className="hover:text-fg-tertiary">
          jimi1126_mid@163.com
        </a>
        <a href="https://github.com/Jimi1126" target="_blank" rel="noopener noreferrer" className="hover:text-fg-tertiary">
          github.com/Jimi1126
        </a>
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-fg-tertiary">
          桂ICP备2024026330号-1
        </a>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/components/layout/navbar.tsx src/components/layout/footer.tsx
git commit -m "refactor: simplify layout shell for INTJ-A — remove ThemeProvider, minimal nav/footer"
```

---

### Task 3: Simplify ScrollAnimate to opacity-only

**Files:**
- Modify: `src/components/shared/scroll-animate.tsx`

- [ ] **Step 1: Rewrite with opacity-only, 200ms linear**

Write `src/components/shared/scroll-animate.tsx`:

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function ScrollAnimate({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.2, ease: "linear", delay }}
    >
      {children}
    </motion.div>
  );
}
```

Delete `ScrollStagger` and `ScrollStaggerItem` — they are no longer exported.

- [ ] **Step 2: Commit**

```bash
git add src/components/shared/scroll-animate.tsx
git commit -m "refactor: simplify ScrollAnimate to opacity-only fade-in"
```

---

### Task 4: Rewrite home page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Rewrite as strategic report narrative**

Write `src/app/page.tsx`:

```tsx
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ScrollAnimate } from "@/components/shared/scroll-animate";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <div className="mx-auto max-w-[720px] px-4 md:px-8">
      {/* Positioning */}
      <section className="pt-20 pb-24">
        <ScrollAnimate>
          <p className="text-[10px] tracking-[0.2em] text-fg-tertiary mb-5">
            FRONTEND ENGINEER · SYSTEMS BUILDER
          </p>
          <h1 className="text-[28px] md:text-[36px] font-normal tracking-[-0.02em] leading-[1.15] text-foreground mb-4">
            构建系统，<br />不只是界面。
          </h1>
          <p className="text-[14px] md:text-[15px] leading-[1.7] text-fg-secondary max-w-[480px] mb-8">
            八年经验，跨越数据可视化、企业中后台、低代码平台。
            关注架构而非堆砌，追求约束与效率的平衡。
          </p>
          <div className="flex gap-9 border-t border-border pt-6">
            <div>
              <span className="block text-[28px] font-light text-foreground">8+</span>
              <span className="text-[10px] tracking-[0.15em] text-fg-tertiary">年经验</span>
            </div>
            <div>
              <span className="block text-[28px] font-light text-foreground">20+</span>
              <span className="text-[10px] tracking-[0.15em] text-fg-tertiary">项目</span>
            </div>
            <div>
              <span className="block text-[28px] font-light text-foreground">3</span>
              <span className="text-[10px] tracking-[0.15em] text-fg-tertiary">领域</span>
            </div>
          </div>
        </ScrollAnimate>
      </section>

      {/* Capability */}
      <section className="py-16 border-t border-border">
        <ScrollAnimate delay={0.05}>
          <p className="text-[10px] tracking-[0.2em] text-fg-tertiary mb-6">
            CAPABILITY
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <h3 className="text-[15px] md:text-[16px] font-normal text-[#cccccc] mb-1.5">
                系统架构
              </h3>
              <p className="text-[12px] leading-[1.6] text-fg-tertiary">
                前端工程化 · 组件体系 · 微前端 · 构建工具链
              </p>
            </div>
            <div>
              <h3 className="text-[15px] md:text-[16px] font-normal text-[#cccccc] mb-1.5">
                界面开发
              </h3>
              <p className="text-[12px] leading-[1.6] text-fg-tertiary">
                Vue 3 · React · TypeScript · Three.js · 数据可视化
              </p>
            </div>
            <div>
              <h3 className="text-[15px] md:text-[16px] font-normal text-[#cccccc] mb-1.5">
                技术判断
              </h3>
              <p className="text-[12px] leading-[1.6] text-fg-tertiary">
                架构评审 · 性能诊断 · 技术选型 · 团队规范
              </p>
            </div>
          </div>
        </ScrollAnimate>
      </section>

      {/* Selected Work */}
      <section className="py-16 border-t border-border">
        <ScrollAnimate delay={0.1}>
          <div className="flex items-baseline justify-between mb-6">
            <p className="text-[10px] tracking-[0.2em] text-fg-tertiary">
              SELECTED WORK
            </p>
            <Link
              href="/work"
              className="text-[11px] text-fg-inactive hover:text-fg-tertiary"
            >
              全部 →
            </Link>
          </div>
          <div className="flex flex-col">
            {projects.slice(0, 3).map((project) => (
              <a
                key={project.slug}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline justify-between border-b border-border py-4 hover:border-border-hi"
              >
                <div>
                  <span className="text-[14px] text-foreground">
                    {project.title}
                  </span>
                  <span className="ml-3 text-[11px] text-fg-tertiary">
                    {project.tags.join(" · ")}
                  </span>
                </div>
                <ExternalLink className="h-3 w-3 text-fg-inactive opacity-0 group-hover:opacity-100 shrink-0" />
              </a>
            ))}
          </div>
        </ScrollAnimate>
      </section>

      {/* Direction */}
      <section className="py-16 border-t border-border">
        <ScrollAnimate delay={0.15}>
          <p className="text-[10px] tracking-[0.2em] text-fg-tertiary mb-5">
            CURRENT DIRECTION
          </p>
          <p className="text-[14px] md:text-[15px] leading-[1.7] text-fg-secondary max-w-[480px]">
            当前聚焦 AI + 低代码 + Three.js 的交汇地带。
            追求成为前端领域的系统级思考者——
            不是比谁知道更多 API，而是比谁能理解更深层的约束。
          </p>
        </ScrollAnimate>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: rewrite home page as strategic report narrative"
```

---

### Task 5: Rename routes (/projects → /work, /blog → /notes)

**Files:**
- Create: `src/app/work/page.tsx`
- Create: `src/app/notes/page.tsx`
- Create: `src/app/notes/[slug]/page.tsx`

The old `/projects` and `/blog` directories will be deleted in Task 8 cleanup.

- [ ] **Step 1: Create work page — text list, no images**

Write `src/app/work/page.tsx`:

```tsx
import { ExternalLink } from "lucide-react";
import { ScrollAnimate } from "@/components/shared/scroll-animate";
import { projects } from "@/lib/projects";

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-[720px] px-4 md:px-8 py-20">
      <ScrollAnimate>
        <p className="text-[10px] tracking-[0.2em] text-fg-tertiary mb-2">
          WORK
        </p>
        <h1 className="text-[28px] md:text-[36px] font-normal tracking-[-0.02em] leading-[1.15] text-foreground mb-4">
          精选作品
        </h1>
        <p className="text-[14px] leading-[1.7] text-fg-secondary mb-12">
          我参与和主导的项目。
        </p>
      </ScrollAnimate>

      <div className="flex flex-col">
        {projects.map((project, i) => (
          <ScrollAnimate key={project.slug} delay={i * 0.05}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline justify-between border-b border-border py-4 hover:border-border-hi"
            >
              <div>
                <span className="text-[14px] text-foreground">
                  {project.title}
                </span>
                <span className="ml-3 text-[11px] text-fg-tertiary">
                  {project.tags.join(" · ")}
                </span>
              </div>
              <ExternalLink className="h-3 w-3 text-fg-inactive opacity-0 group-hover:opacity-100 shrink-0" />
            </a>
          </ScrollAnimate>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create notes index page — text list, no excerpts**

Write `src/app/notes/page.tsx`:

```tsx
import Link from "next/link";
import { ScrollAnimate } from "@/components/shared/scroll-animate";
import { getBlogPosts } from "@/lib/blog";

export default async function NotesPage() {
  const posts = await getBlogPosts();

  return (
    <div className="mx-auto max-w-[720px] px-4 md:px-8 py-20">
      <ScrollAnimate>
        <p className="text-[10px] tracking-[0.2em] text-fg-tertiary mb-2">
          NOTES
        </p>
        <h1 className="text-[28px] md:text-[36px] font-normal tracking-[-0.02em] leading-[1.15] text-foreground mb-4">
          笔记
        </h1>
        <p className="text-[14px] leading-[1.7] text-fg-secondary mb-12">
          技术分享与个人思考。
        </p>
      </ScrollAnimate>

      <div className="flex flex-col">
        {posts.map((post, i) => (
          <ScrollAnimate key={post.slug} delay={i * 0.05}>
            <Link
              href={`/notes/${post.slug}`}
              className="flex items-baseline justify-between border-b border-border py-4 hover:border-border-hi"
            >
              <span className="text-[14px] text-foreground">{post.title}</span>
              <span className="text-[11px] text-fg-tertiary shrink-0 ml-4">
                {post.date}
              </span>
            </Link>
          </ScrollAnimate>
        ))}
      </div>
      {posts.length === 0 && (
        <p className="text-[14px] text-fg-tertiary">还没有文章。</p>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create notes detail page**

Write `src/app/notes/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { promises as fs } from "fs";
import path from "path";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { getBlogPosts } from "@/lib/blog";

const blogDir = path.join(process.cwd(), "content", "blog");

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Not Found" };
  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const filePath = path.join(blogDir, `${slug}.mdx`);
  let PostContent: React.ComponentType;
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const evaluated = await evaluate(raw, {
      ...runtime,
      baseUrl: import.meta.url,
    });
    PostContent = evaluated.default;
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[720px] px-4 md:px-8 py-20">
      <Link
        href="/notes"
        className="inline-flex items-center gap-1.5 text-[12px] text-fg-tertiary hover:text-fg-secondary mb-12"
      >
        <ArrowLeft className="h-3 w-3" /> 返回笔记
      </Link>
      <article>
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
        <div>
          <PostContent />
        </div>
      </article>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
mkdir -p src/app/work
mkdir -p src/app/notes/[slug]
git add src/app/work/page.tsx src/app/notes/page.tsx src/app/notes/\[slug\]/page.tsx
git commit -m "feat: add work and notes pages — text-list layout, INTJ-A style"
```

---

### Task 6: Rewrite about page

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Rewrite about as 3-section prose**

Write `src/app/about/page.tsx`:

```tsx
import { ScrollAnimate } from "@/components/shared/scroll-animate";

const skills = [
  "TypeScript", "Vue 3", "React", "Next.js", "Nuxt",
  "Node.js", "Tailwind CSS", "Vite", "Webpack", "GSAP", "Three.js", "Git",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[720px] px-4 md:px-8 py-20">
      <ScrollAnimate>
        <p className="text-[10px] tracking-[0.2em] text-fg-tertiary mb-2">
          ABOUT
        </p>
        <h1 className="text-[28px] md:text-[36px] font-normal tracking-[-0.02em] leading-[1.15] text-foreground mb-12">
          JIMI1126
        </h1>
      </ScrollAnimate>

      <div className="space-y-10">
        <ScrollAnimate delay={0.05}>
          <p className="text-[14px] md:text-[15px] leading-[1.7] text-fg-secondary">
            一名前端开发工程师和开源建设者。2016 年毕业于一本院校，工学学位。
            自学 Java 入行，后被 JavaScript 吸引，恰逢前后端分离模式兴起，转型前端。
          </p>
        </ScrollAnimate>

        <ScrollAnimate delay={0.1}>
          <p className="text-[14px] md:text-[15px] leading-[1.7] text-fg-secondary">
            从业多年多次担任前端项目负责人，主导过数据展示、开发平台、
            销售系统、管理系统、H5 应用等项目。
            为企业与个人提供软件开发与咨询服务。
          </p>
        </ScrollAnimate>

        <ScrollAnimate delay={0.15}>
          <p className="text-[14px] md:text-[15px] leading-[1.7] text-fg-secondary">
            当前聚焦 AI + 低代码 + Three.js 的交汇地带。
            追求成为前端领域的系统级思考者——
            &ldquo;真正的大师永远都怀着一个学徒的心&rdquo;。
          </p>
        </ScrollAnimate>
      </div>

      <ScrollAnimate delay={0.2}>
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-fg-tertiary">
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
          <div className="mt-8 flex gap-6 text-[12px] text-fg-inactive">
            <a href="https://github.com/Jimi1126" target="_blank" rel="noopener noreferrer" className="hover:text-fg-tertiary">
              GitHub
            </a>
            <a href="mailto:jimi1126_mid@163.com" className="hover:text-fg-tertiary">
              Email
            </a>
          </div>
        </div>
      </ScrollAnimate>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: rewrite about page — prose-only, minimal INTJ-A"
```

---

### Task 7: Update MDX component styles

**Files:**
- Modify: `src/mdx-components.tsx`

- [ ] **Step 1: Rewrite MDX styles for monochrome**

Write `src/mdx-components.tsx`:

```tsx
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mt-8 mb-4 text-[24px] font-normal tracking-[-0.02em] leading-[1.15] text-foreground">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-3 text-[18px] font-normal text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-2 text-[16px] font-normal text-foreground">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="my-4 text-[14px] md:text-[15px] leading-[1.7] text-fg-secondary">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-fg-secondary underline underline-offset-4 hover:text-foreground"
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="rounded bg-surface px-1.5 py-0.5 text-[13px] font-mono text-fg-secondary">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="my-4 overflow-x-auto bg-surface p-4 text-[13px] font-mono text-fg-secondary leading-relaxed">
        {children}
      </pre>
    ),
    ul: ({ children }) => (
      <ul className="my-4 ml-6 list-disc space-y-1 text-[14px] leading-[1.7] text-fg-secondary">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 ml-6 list-decimal space-y-1 text-[14px] leading-[1.7] text-fg-secondary">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-[1.7]">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l border-border pl-4 text-fg-tertiary text-[14px]">
        {children}
      </blockquote>
    ),
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/mdx-components.tsx
git commit -m "style: update MDX components for monochrome typography"
```

---

### Task 8: Delete unused files and directories

**Files to delete:**
- `src/app/contact/page.tsx`
- `src/app/services/page.tsx`
- `src/app/projects/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/components/home/hero.tsx`
- `src/components/home/featured-projects.tsx`
- `src/components/home/services-grid.tsx`
- `src/components/home/contact-cta.tsx`
- `src/components/home/faq-section.tsx`
- `src/components/shared/section-heading.tsx`
- `src/components/layout/theme-provider.tsx`
- `src/components/layout/theme-toggle.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/accordion.tsx`
- `src/components/ui/avatar.tsx`
- `src/components/ui/dialog.tsx`
- `src/components/ui/dropdown-menu.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/label.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/ui/sheet.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/separator.tsx`

- [ ] **Step 1: Delete all unused files**

```bash
rm src/app/contact/page.tsx
rm src/app/services/page.tsx
rm -rf src/app/projects
rm -rf src/app/blog
rm src/components/home/hero.tsx
rm src/components/home/featured-projects.tsx
rm src/components/home/services-grid.tsx
rm src/components/home/contact-cta.tsx
rm src/components/home/faq-section.tsx
rm src/components/shared/section-heading.tsx
rm src/components/layout/theme-provider.tsx
rm src/components/layout/theme-toggle.tsx
rm src/components/ui/badge.tsx
rm src/components/ui/accordion.tsx
rm src/components/ui/avatar.tsx
rm src/components/ui/dialog.tsx
rm src/components/ui/dropdown-menu.tsx
rm src/components/ui/input.tsx
rm src/components/ui/label.tsx
rm src/components/ui/textarea.tsx
rm src/components/ui/sheet.tsx
rm src/components/ui/card.tsx
rm src/components/ui/button.tsx
rm src/components/ui/separator.tsx
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "refactor: delete unused pages and components"
```

---

### Task 9: Build verification and cleanup

- [ ] **Step 1: Run build**

```bash
npm run build
```

Expected: build succeeds with no errors. If there are import errors pointing to deleted files, fix them.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

- [ ] **Step 3: Remove empty directories if any**

```bash
rmdir src/components/home 2>/dev/null; rmdir src/app/contact 2>/dev/null; rmdir src/app/services 2>/dev/null; true
```

- [ ] **Step 4: Commit any fixes**

```bash
git add -A && git diff --staged --quiet || git commit -m "chore: fix build errors and cleanup empty dirs"
```
