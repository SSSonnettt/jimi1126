# JIMI1126 Website Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate jimi1126.cn from Vue 3 + Vuetify to Next.js + Tailwind CSS + shadcn/ui with 6 pages, MDX blog, theme system, and scroll animations.

**Architecture:** Next.js 16 App Router. MDX via `@next/mdx` for blog content. `next-themes` for light/dark/system. `framer-motion` for scroll-triggered animations. Pages are server-rendered with client islands for interactivity.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, shadcn/ui, next-themes, framer-motion, @next/mdx, lucide-react

**Design Spec:** `docs/superpowers/specs/2026-05-26-website-refactor-design.md`

**Base:** Scaffold at `/Users/wuji/workspace/jimi1126-next` (already created via `create-next-app`)

---

### Task 1: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install runtime dependencies**

```bash
cd /Users/wuji/workspace/jimi1126-next
npm install next-themes framer-motion lucide-react class-variance-authority clsx tailwind-merge
```

- [ ] **Step 2: Install dev dependencies (MDX)**

```bash
npm install -D @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

- [ ] **Step 3: Init shadcn/ui and add components**

```bash
npx shadcn@latest init -d --force
npx shadcn@latest add button card separator badge input textarea label accordion dialog sheet dropdown-menu avatar
```

Expected: `src/components/ui/` populated, `src/lib/utils.ts` has `cn` helper.

- [ ] **Step 4: Commit**

```bash
cd /Users/wuji/workspace/jimi1126-next
git add package.json package-lock.json components.json src/lib/ src/components/ui/
git commit -m "chore: install deps and init shadcn/ui"
```

---

### Task 2: Design tokens in globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace globals.css with brand design tokens**

Replace `src/app/globals.css`:

```css
@import "tailwindcss";

:root {
  --background: #fafaf9;
  --foreground: #3d3b36;
  --card: #ffffff;
  --card-foreground: #3d3b36;
  --primary: #e8a630;
  --primary-foreground: #ffffff;
  --secondary: #f5f4f0;
  --secondary-foreground: #3d3b36;
  --muted: #f5f4f0;
  --muted-foreground: #78756e;
  --border: #d4d0c8;
  --ring: #e8a630;
  --radius: 0.5rem;
}

.dark {
  --background: #1c1b18;
  --foreground: #f5f4f0;
  --card: #2d2b26;
  --card-foreground: #f5f4f0;
  --primary: #e8a630;
  --primary-foreground: #1c1b18;
  --secondary: #2d2b26;
  --secondary-foreground: #f5f4f0;
  --muted: #2d2b26;
  --muted-foreground: #a09b92;
  --border: #3d3b36;
  --ring: #e8a630;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-ring: var(--ring);
  --radius: var(--radius);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "style: apply brand design tokens"
```

---

### Task 3: Theme provider + root layout + NavBar + Footer

**Files:**
- Create: `src/components/layout/theme-provider.tsx`
- Create: `src/components/layout/theme-toggle.tsx`
- Create: `src/components/layout/navbar.tsx`
- Create: `src/components/layout/footer.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create ThemeProvider**

Create `src/components/layout/theme-provider.tsx`:

```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

- [ ] **Step 2: Create ThemeToggle**

Create `src/components/layout/theme-toggle.tsx`:

```tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="h-9 w-9" disabled />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
```

- [ ] **Step 3: Create NavBar**

Create `src/components/layout/navbar.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const links = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于" },
  { href: "/services", label: "服务" },
  { href: "/projects", label: "作品" },
  { href: "/blog", label: "博客" },
  { href: "/contact", label: "联系" },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight hover:text-primary transition-colors duration-200"
        >
          JIMI1126
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 pt-12">
              <nav className="flex flex-col gap-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 text-base font-medium rounded-md transition-colors ${
                      pathname === link.href
                        ? "text-primary bg-secondary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
```

- [ ] **Step 4: Create Footer**

Create `src/components/layout/footer.tsx`:

```tsx
import Link from "next/link";
import { Github, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于" },
  { href: "/services", label: "服务" },
  { href: "/projects", label: "作品" },
  { href: "/blog", label: "博客" },
  { href: "/contact", label: "联系" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">JIMI1126</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              前端开发工程师与开源建设者，为企业和个人提供软件开发与咨询服务。
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">导航</h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">社交</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/Jimi1126" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="mailto:jimi1126_mid@163.com">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://weibo.com/jisheng189504559" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-xs text-muted-foreground">
          Copyright &copy; {new Date().getFullYear()} JIMI1126. All rights reserved.
        </p>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          桂ICP备2024026330号-1
        </a>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Update root layout to wire everything**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
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
  description: "前端开发工程师 · 软件开发与咨询服务 · 开源建设者",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Verify dev server**

```bash
npm run dev &
sleep 5 && curl -s http://localhost:3000 | grep JIMI1126
```

Expected: HTML containing JIMI1126. NavBar, theme toggle, and Footer should be visible.

- [ ] **Step 7: Commit**

```bash
git add src/components/layout/ src/app/layout.tsx src/app/globals.css
git commit -m "feat: add theme system, NavBar, Footer, and root layout"
```

---

### Task 4: Shared components (SectionHeading + ScrollAnimate)

**Files:**
- Create: `src/components/shared/section-heading.tsx`
- Create: `src/components/shared/scroll-animate.tsx`

- [ ] **Step 1: Create SectionHeading**

Create `src/components/shared/section-heading.tsx`:

```tsx
interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
}

export function SectionHeading({ label, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {label && (
        <span className="text-xs font-medium tracking-widest text-primary uppercase">
          {label}
        </span>
      )}
      <h2 className="mt-2 text-3xl font-semibold tracking-tight lg:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create ScrollAnimate client component**

Create `src/components/shared/scroll-animate.tsx`:

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollStagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollStaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/shared/
git commit -m "feat: add SectionHeading and ScrollAnimate shared components"
```

---

### Task 5: Home page (all 5 sections)

**Files:**
- Create: `src/lib/projects.ts`
- Create: `src/components/home/hero.tsx`
- Create: `src/components/home/featured-projects.tsx`
- Create: `src/components/home/services-grid.tsx`
- Create: `src/components/home/contact-cta.tsx`
- Create: `src/components/home/faq-section.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create project data**

Create `src/lib/projects.ts`:

```ts
export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    slug: "frontend-stack",
    title: "FrontEnd Stack",
    description: "前端开发知识体系与开发工具整理",
    image: "https://r2.jimi1126.cn/hotlink-ok/img/2024/09/5a07b3ba8c068e56eafc2e03d1d3f379.jpg",
    link: "https://front-end-stack.pages.dev/",
    tags: ["Vue", "知识库"],
  },
  {
    slug: "jimi-blog",
    title: "Jimi Blog",
    description: "基于 Nuxt 的个人博客，集成 SEO 和自动发布",
    image: "https://r2.jimi1126.cn/hotlink-ok/img/2024/09/05f59acacb734550b7786e16d89fdad2.jpg",
    link: "https://blog.jimi1126.cn",
    tags: ["Nuxt", "博客"],
  },
  {
    slug: "markdown-processor",
    title: "Markdown Processor",
    description: "通过插件方式实现 Markdown 编辑与 HTML 转换",
    image: "https://r2.jimi1126.cn/hotlink-ok/img/2024/09/a121447b3ba241938e5454b9fec52c87.jpg",
    link: "https://md.jimi1126.cn",
    tags: ["Markdown", "工具"],
  },
];
```

- [ ] **Step 2: Create Hero**

Create `src/components/home/hero.tsx`:

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollAnimate } from "@/components/shared/scroll-animate";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 lg:px-8 py-24 lg:py-32">
      <ScrollAnimate>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          Hi, I&apos;m JIMI1126
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          一名前端开发工程师，为企业与个人提供软件开发与咨询服务。
          致力于工程化实践、开源社区建设与技术知识分享。
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button size="lg" asChild>
            <Link href="/services">
              了解我的服务 <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">联系我</Link>
          </Button>
        </div>
      </ScrollAnimate>
    </section>
  );
}
```

- [ ] **Step 3: Create FeaturedProjects**

Create `src/components/home/featured-projects.tsx`:

```tsx
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollStagger, ScrollStaggerItem } from "@/components/shared/scroll-animate";
import { projects } from "@/lib/projects";

export function FeaturedProjects() {
  const featured = projects.slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-6 lg:px-8 py-20">
      <SectionHeading label="Projects" title="作品精选" description="一些我参与和主导的项目" />

      <ScrollStagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <ScrollStaggerItem key={project.slug}>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{project.title}</h3>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </a>
          </ScrollStaggerItem>
        ))}
      </ScrollStagger>

      <div className="mt-10 text-center">
        <Button variant="outline" asChild>
          <Link href="/projects">查看全部作品</Link>
        </Button>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create ServicesGrid**

Create `src/components/home/services-grid.tsx`:

```tsx
import { Handshake, Globe, PenLine, Podcast } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollStagger, ScrollStaggerItem } from "@/components/shared/scroll-animate";

const services = [
  { icon: Handshake, title: "软件开发", desc: "Web 应用 · 小程序 · 管理后台" },
  { icon: Globe, title: "技术咨询", desc: "架构设计 · 性能优化 · 前端工程化" },
  { icon: PenLine, title: "知识分享", desc: "技术博客 · 开源项目" },
  { icon: Podcast, title: "更多探索", desc: "播客 · 视频教程 · 社区建设" },
];

export function ServicesGrid() {
  return (
    <section className="bg-secondary/50 py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading label="Services" title="我能做什么" description="为企业与个人开发者提供全方位的技术服务" />
        <ScrollStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((svc) => (
            <ScrollStaggerItem key={svc.title}>
              <Card className="h-full border-0 shadow-none bg-transparent">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <svc.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-semibold">{svc.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{svc.desc}</p>
                </CardContent>
              </Card>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create ContactCTA and FaqSection**

Create `src/components/home/contact-cta.tsx`:

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollAnimate } from "@/components/shared/scroll-animate";

export function ContactCTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 lg:px-8 py-20">
      <ScrollAnimate>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg leading-relaxed">
            JIMI1126 是一名<b>前端开发工程师</b>，主攻 <b>Web</b> 领域的软件开发。
            为企业或个人提供软件开发与咨询服务，同时参与开源社区建设与知识分享。
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/contact">联系我</Link>
          </Button>
        </div>
      </ScrollAnimate>
    </section>
  );
}
```

Create `src/components/home/faq-section.tsx`:

```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollAnimate } from "@/components/shared/scroll-animate";

const faqs = [
  { question: "本站主要内容是什么？", answer: "本站主要分享我的技术知识、最新产品动态和项目心得。" },
  { question: "会有哪些新项目吗？", answer: "目前正在进行的是 Builder For Web，一个基于 Vue3 + TypeScript 的前端框架，帮助用户创建网站、简历、博客等。" },
];

export function FaqSection() {
  return (
    <section className="bg-secondary py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              label="FAQs"
              title="常见问题"
              description="如有其他问题，请发送邮件至 jimi1126_mid@163.com。"
            />
          </div>
          <ScrollAnimate>
            <Accordion type="multiple">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-base font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Wire home page**

Replace `src/app/page.tsx`:

```tsx
import { Hero } from "@/components/home/hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { ServicesGrid } from "@/components/home/services-grid";
import { ContactCTA } from "@/components/home/contact-cta";
import { FaqSection } from "@/components/home/faq-section";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <ServicesGrid />
      <ContactCTA />
      <FaqSection />
    </>
  );
}
```

- [ ] **Step 7: Verify and commit**

Run `npm run dev`, check localhost:3000 — all 5 sections render.

```bash
git add src/lib/projects.ts src/components/home/ src/app/page.tsx
git commit -m "feat: add full home page with Hero, projects, services, CTA, and FAQ"
```

---

### Task 6: About, Services, Contact pages

**Files:**
- Create: `src/app/about/page.tsx`
- Create: `src/app/services/page.tsx`
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Create About page**

Create `src/app/about/page.tsx`:

```tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollAnimate } from "@/components/shared/scroll-animate";
import { Github, Mail } from "lucide-react";
import Link from "next/link";

const skills = ["TypeScript", "Vue 3", "React", "Next.js", "Nuxt", "Node.js", "Tailwind CSS", "Vite", "Webpack", "GSAP", "Three.js", "Git"];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8 py-20">
      <ScrollAnimate>
        <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl">关于我</h1>
      </ScrollAnimate>

      <div className="mt-12 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <ScrollAnimate delay={0.1}>
            <section>
              <h2 className="text-2xl font-semibold">JIMI1126</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                一名前端开发工程师和开源建设者。为企业或个人提供软件开发与咨询服务，
                帮助客户更好地开展业务。业余时间通过网络分享作品和心得，
                致力于帮助前端开发者们提升专业技能。
              </p>
            </section>
          </ScrollAnimate>

          <ScrollAnimate delay={0.2}>
            <section>
              <h2 className="text-xl font-semibold">工科背景 + 工作经历</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                2016 年毕业于一本院校，工学学位，自学 Java 入行。
                后被 JavaScript 吸引，恰逢前后端分离模式兴起，转型前端。
                从业多年多次担任前端项目负责人，主导过数据展示、开发平台、销售系统、管理系统、H5 应用等项目。
              </p>
            </section>
          </ScrollAnimate>

          <ScrollAnimate delay={0.3}>
            <section>
              <h2 className="text-xl font-semibold">最近在忙什么？</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                正在学习 AI、低代码和 Three.js。追求成为前端领域的专家——
                "真正的大师永远都怀着一个学徒的心"。
              </p>
            </section>
          </ScrollAnimate>

          <ScrollAnimate delay={0.4}>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </ScrollAnimate>
        </div>

        <div>
          <ScrollAnimate delay={0.2}>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="mx-auto h-24 w-24 rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-2xl font-semibold">J</span>
                </div>
                <h2 className="text-center text-lg font-semibold">社交媒体</h2>
                <div className="flex justify-center gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <a href="https://github.com/Jimi1126" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <a href="mailto:jimi1126_mid@163.com">
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/contact">联系我</Link>
                </Button>
              </CardContent>
            </Card>
          </ScrollAnimate>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create Services page**

Create `src/app/services/page.tsx`:

```tsx
import { Code2, Smartphone, Globe, Layers, Wrench, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollStagger, ScrollStaggerItem } from "@/components/shared/scroll-animate";
import Link from "next/link";

const services = [
  { icon: Code2, title: "Web 应用开发", desc: "使用 React、Vue、Next.js 等现代框架构建高性能 Web 应用" },
  { icon: Smartphone, title: "移动端开发", desc: "响应式设计、H5 应用、小程序开发" },
  { icon: Globe, title: "网站设计与开发", desc: "个人品牌站、企业官网、营销落地页" },
  { icon: Layers, title: "前端工程化", desc: "CI/CD、自动化测试、性能优化、组件库建设" },
  { icon: Wrench, title: "技术咨询", desc: "架构评审、技术选型、代码审查、团队培训" },
  { icon: Palette, title: "UI 开发", desc: "设计系统搭建、像素级设计还原、微交互实现" },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8 py-20">
      <SectionHeading label="Services" title="服务内容" description="为企业与个人提供专业的前端开发与咨询服务" />
      <ScrollStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((svc) => (
          <ScrollStaggerItem key={svc.title}>
            <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <CardContent className="p-6">
                <svc.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold text-lg">{svc.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{svc.desc}</p>
              </CardContent>
            </Card>
          </ScrollStaggerItem>
        ))}
      </ScrollStagger>
      <div className="mt-12 text-center p-8 bg-secondary/50 rounded-lg">
        <h2 className="text-xl font-semibold">有项目想聊聊？</h2>
        <p className="mt-2 text-muted-foreground">无论是短期咨询还是长期合作，都欢迎联系。</p>
        <Button size="lg" className="mt-4" asChild>
          <Link href="/contact">联系我</Link>
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create Contact page**

Create `src/app/contact/page.tsx`:

```tsx
import { Mail, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SectionHeading } from "@/components/shared/section-heading";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8 py-20">
      <SectionHeading label="Contact" title="联系我" description="有项目想讨论？填写表单或直接发送邮件" />
      <div className="mt-12 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <form className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input id="name" name="name" placeholder="你的名字" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱</Label>
                    <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">主题</Label>
                  <Input id="subject" name="subject" placeholder="项目类型或需求简述" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">内容</Label>
                  <Textarea id="message" name="message" rows={6} placeholder="请详细描述你的需求..." required />
                </div>
                <Button type="submit" size="lg">发送消息</Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">邮箱</h3>
                  <p className="text-sm text-muted-foreground">jimi1126_mid@163.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">位置</h3>
                  <p className="text-sm text-muted-foreground">中国</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <p className="text-sm text-muted-foreground text-center">我会尽快回复，一般在 24 小时内。</p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify and commit**

```bash
npx next dev &
sleep 3 && curl -s http://localhost:3000/about | grep JIMI1126
curl -s http://localhost:3000/services | grep 服务
curl -s http://localhost:3000/contact | grep 联系
git add src/app/about/ src/app/services/ src/app/contact/
git commit -m "feat: add About, Services, and Contact pages"
```

---

### Task 7: Projects page

**Files:**
- Create: `src/app/projects/page.tsx`

- [ ] **Step 1: Create Projects page**

Create `src/app/projects/page.tsx`:

```tsx
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollStagger, ScrollStaggerItem } from "@/components/shared/scroll-animate";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8 py-20">
      <SectionHeading label="Projects" title="作品集" description="我参与和主导的项目" />
      <ScrollStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ScrollStaggerItem key={project.slug}>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{project.title}</h3>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </a>
          </ScrollStaggerItem>
        ))}
      </ScrollStagger>
    </div>
  );
}
```

- [ ] **Step 2: Verify and commit**

```bash
curl -s http://localhost:3000/projects | grep 作品集
git add src/app/projects/
git commit -m "feat: add Projects listing page"
```

---

### Task 8: MDX config + blog pages

**Files:**
- Modify: `next.config.ts`
- Create: `src/mdx-components.tsx`
- Create: `src/lib/blog.ts`
- Create: `content/blog/hello-world.mdx`
- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/[slug]/page.tsx`

- [ ] **Step 1: Configure MDX**

Modify `next.config.ts`:

```ts
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
```

Create `src/mdx-components.tsx`:

```tsx
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="mt-8 mb-4 text-3xl font-semibold tracking-tight">{children}</h1>,
    h2: ({ children }) => <h2 className="mt-8 mb-3 text-2xl font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-6 mb-2 text-xl font-semibold">{children}</h3>,
    p: ({ children }) => <p className="my-4 leading-relaxed text-muted-foreground">{children}</p>,
    a: ({ href, children }) => (
      <a href={href} className="text-primary underline underline-offset-4 hover:text-primary/80">{children}</a>
    ),
    code: ({ children }) => <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">{children}</code>,
    pre: ({ children }) => (
      <pre className="my-4 overflow-x-auto rounded-lg bg-secondary p-4 text-sm font-mono">{children}</pre>
    ),
    ul: ({ children }) => <ul className="my-4 ml-6 list-disc space-y-1 text-muted-foreground">{children}</ul>,
    ol: ({ children }) => <ol className="my-4 ml-6 list-decimal space-y-1 text-muted-foreground">{children}</ol>,
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-primary pl-4 italic text-muted-foreground">{children}</blockquote>
    ),
    ...components,
  };
}
```

- [ ] **Step 2: Create blog utility and sample post**

Create `src/lib/blog.ts`:

```ts
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

export async function getBlogPosts(): Promise<BlogMeta[]> {
  try {
    const files = await fs.readdir(blogDir);
    const posts: BlogMeta[] = [];
    for (const file of files) {
      if (!file.endsWith(".mdx")) continue;
      const slug = file.replace(/\.mdx$/, "");
      const mod = await import(`@/content/blog/${file}`);
      const meta = (mod as { metadata?: Record<string, unknown> }).metadata;
      if (meta) {
        posts.push({
          slug,
          title: String(meta.title || slug),
          description: String(meta.description || ""),
          date: String(meta.date || ""),
          tags: Array.isArray(meta.tags) ? meta.tags.map(String) : [],
        });
      }
    }
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}
```

Create `content/blog/hello-world.mdx`:

```mdx
export const metadata = {
  title: "网站重构：从 Vue 到 Next.js",
  description: "聊聊这次个人网站重构的技术选型和设计思路。",
  date: "2026-05-26",
  tags: ["Next.js", "前端", "个人网站"],
};

## 为什么要重构

旧的网站基于 Vue 3 + Vuetify 3，功能完整但品牌识别度弱。
这次重构选择了 Next.js + Tailwind CSS + shadcn/ui，
希望能呈现更好的视觉设计和阅读体验。

## 技术选型

- 框架：Next.js 16 (App Router)
- 样式：Tailwind CSS v4
- 组件：shadcn/ui
- 内容：MDX
- 动画：Framer Motion

欢迎关注后续更新。
```

- [ ] **Step 3: Create Blog list page**

Create `src/app/blog/page.tsx`:

```tsx
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollStagger, ScrollStaggerItem } from "@/components/shared/scroll-animate";
import { getBlogPosts } from "@/lib/blog";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8 py-20">
      <SectionHeading label="Blog" title="博客" description="技术分享与个人思考" />
      <ScrollStagger className="mt-12 space-y-6">
        {posts.map((post) => (
          <ScrollStaggerItem key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold group-hover:text-primary transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-muted-foreground">{post.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <time className="text-sm text-muted-foreground">{post.date}</time>
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </ScrollStaggerItem>
        ))}
      </ScrollStagger>
      {posts.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">还没有文章，敬请期待。</p>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Create Blog detail page**

Create `src/app/blog/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBlogPosts } from "@/lib/blog";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Not Found" };
  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  let PostContent: React.ComponentType;
  try {
    const mod = await import(`@/content/blog/${slug}.mdx`);
    PostContent = mod.default;
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-8 py-20">
      <Button variant="ghost" asChild className="mb-8 -ml-3">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回博客
        </Link>
      </Button>
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-semibold tracking-tight">{post.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <time className="text-sm text-muted-foreground">{post.date}</time>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
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

- [ ] **Step 5: Verify build and commit**

```bash
npx next build 2>&1 | tail -15
# Expected: successful build with all pages
```

```bash
git add next.config.ts src/mdx-components.tsx src/lib/blog.ts content/ src/app/blog/
git commit -m "feat: configure MDX and add Blog pages"
```

---

### Task 9: Build, verify all pages, and final polish

- [ ] **Step 1: Full production build**

```bash
cd /Users/wuji/workspace/jimi1126-next
npx next build 2>&1
```

Expected: All 6 routes generated successfully.

- [ ] **Step 2: Visual review checklist**

Start dev server and verify:
- [ ] `http://localhost:3000/` — Hero, projects, services, CTA, FAQ all render
- [ ] `http://localhost:3000/about` — Bio text, skills badges, social card
- [ ] `http://localhost:3000/services` — 6 service cards, CTA section
- [ ] `http://localhost:3000/projects` — 3 project cards with images
- [ ] `http://localhost:3000/blog` — Blog list with hello-world post
- [ ] `http://localhost:3000/blog/hello-world` — MDX rendered blog post
- [ ] `http://localhost:3000/contact` — Form and contact info
- [ ] Theme toggle works in dark/light mode
- [ ] Mobile menu (hamburger) opens and links work
- [ ] Footer visible on all pages
- [ ] Scroll animations fire on home page

- [ ] **Step 3: Fix any issues found during review**

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete website refactor — all 6 pages, MDX blog, theme system"
```

---

### Task 10: Replace old project

- [ ] **Step 1: Move new project to final location**

```bash
cd /Users/wuji/workspace
mv jimi1126 jimi1126-old
mv jimi1126-next jimi1126
```

- [ ] **Step 2: Start dev server from final location**

```bash
cd /Users/wuji/workspace/jimi1126
npm run dev
```

- [ ] **Step 3: Final browser check**

Open `http://localhost:3000/` and `http://localhost:3000/blog/hello-world` — confirm everything works.
