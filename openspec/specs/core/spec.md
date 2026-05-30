# Core Architecture

## Purpose

Defines the foundational architecture of the Sonnet personal website — a static-first, server-rendered Next.js application with MDX-powered content. The site prioritizes build-time rendering (SSG) for all routes, zero client-side JavaScript except for theme toggling and scroll animations, and a monochrome INTJ-A visual identity.

## Requirements

### Requirement: Static Site Generation

The system SHALL prerender all pages at build time using Next.js App Router's static generation.

#### Scenario: All routes are static

- **GIVEN** a production build is triggered
- **WHEN** Next.js compiles the application
- **THEN** all routes SHALL render as static HTML (○ or ●)
- **AND** no route SHALL require a server runtime (λ)

#### Scenario: Blog posts are SSG

- **GIVEN** 19 MDX blog posts exist in `src/content/blog/`
- **WHEN** `generateStaticParams()` is called
- **THEN** all 19 slugs SHALL be returned
- **AND** `dynamicParams = false` SHALL cause 404 for unknown slugs

### Requirement: App Router Structure

The system SHALL use Next.js 16 App Router with the following route layout:

- `/` — Home page (density-narrative)
- `/notes` — Blog listing
- `/notes/[slug]` — Individual blog post (SSG)
- `/work` — Projects listing
- `/about` — Personal profile

Each route MUST be a standalone `page.tsx` file in its directory.

### Requirement: Monorepo-Free Single Package

The system SHALL operate as a single Next.js application with no monorepo tooling, no workspaces, and no internal packages.

### Requirement: TypeScript Strictness

The system SHALL use TypeScript with strict mode enabled. All component props MUST be explicitly typed.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (Turbopack) | 16.2.6 |
| UI Library | React | 19.2.4 |
| Styling | Tailwind CSS v4 | 4.x |
| Content | @next/mdx + @mdx-js/mdx | 3.1.x |
| Animation | framer-motion | 12.40.x |
| Icons | lucide-react | 1.16.x |
| Theme | next-themes | 0.4.6 |
| Font | Geist + Geist Mono | — |
| Package Manager | npm | — |
