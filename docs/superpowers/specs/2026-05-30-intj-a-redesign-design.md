# Design Spec: INTJ-A Website Redesign

**Date:** 2026-05-30
**Status:** Approved

## Overview

Redesign personal website `jimi1126-next` to reflect INTJ-A (Assertive Architect) personality: strategic, analytical, independent, confident. Replace warm/social design with cold, structured, typography-driven minimalism.

**Personality anchors:**
- Builder-driven narrative (defined by output, not persuasion)
- Systems thinker perspective (architecture over surface)
- Problem-solver framing (capability over service)
- Forward-looking (current direction and future thinking)

## Design Tokens

```
Background:     #0a0a0a  (near-black, avoids OLED smear)
Surface:        #0f0f0f  (slight elevation for cards/blocks)
Border:         #1a1a1a  (low-contrast divider)
Border-high:    #2a2a2a  (hover/accent border)
Foreground:     #f5f5f5  (primary text, not pure white)
Fg-secondary:   #888888  (body text, descriptions)
Fg-tertiary:    #555555  (meta, labels, timestamps)
Fg-inactive:    #333333  (disabled/extremely secondary)

No primary/accent color. Pure monochrome.
```

```
Spacing scale (4px base): 4, 8, 12, 16, 20, 24, 32, 48, 64, 96, 128
Border radius: 0 (globally — sharp corners for precision)
Border width: 1px solid, functional dividers only
Transitions: none (static, instantaneous). Exception: scroll-reveal fade-in.
```

## Typography

```
Font: Geist Sans (headings + body), Geist Mono (code/data)
No font change needed — Geist works well in monochrome.

Weights: 400 only. Hierarchy via size + spacing, never weight.
  No bold. No semibold.

Scale (mobile / desktop):
  site-title      12px  label    — top-left identifier
  section-label   10px  label    — SECTION markers
  h1              28/36px
  h2              20/24px
  h3              16/18px
  body            14/15px
  caption         12px
  meta            11px

Line height:
  heading: 1.15
  body:    1.7   (wide for Chinese readability)

Letter spacing:
  heading: -0.02em
  body:     0
  label:    0.15em
```

## Layout

```
Max content width: 720px (text column, not full-width)
Page padding:      16px mobile / 32px desktop
Section gap:       96px (architectural breathing room)

Navigation (desktop):
  Left:  JIMI1126 [site-title]
  Right: WORK · NOTES · ABOUT [section-label style]
  Fixed top, no blur, border-bottom: 1px solid border

Navigation (mobile):
  Same layout, reduced font size, no hamburger

Footer (3 lines, fg-tertiary, 11px):
  email | github | ICP备案号
```

## Pages

### Home (`/`)

Strategic-report narrative. Four sections:

1. **Positioning** — label + headline + 1-2 sentence thesis + 3 key metrics (years/projects/domains). No CTA buttons.
2. **Capability** — 3-column text grid: 系统架构 / 界面开发 / 技术判断. Each: title + keyword list.
3. **Selected Work** — flat list rows: [name] [tech tags] [→]. No images, no cards.
4. **Current Direction** — 3-4 sentence paragraph on AI + low-code + Three.js intersection, future trajectory.

Replaces current: Hero CTA + card-grid projects + services grid + CTA + FAQ.

### Work (`/work`)

Full project index. List format:
- Each row: [project name] [year] [tech tags]
- One-line description below, 12px, fg-secondary
- No images. Pure text index.

### Notes (`/notes`)

Blog index + detail:
- Index: [title] [date] per row, no excerpts
- Detail (`/notes/[slug]`): 720px text column, MDX content

### About (`/about`)

Three paragraphs:
1. Identity (2-3 sentences)
2. Technical trajectory (2-3 sentences)
3. Current direction + future thinking (3-4 sentences)

Bottom: skill list (text only, no badge components) + GitHub + Email.
No avatar, no social card.

### 404

Centered: `404 — Page not found` + link to home.

## Removed Pages

- `/services` — deleted
- `/contact` — deleted. Contact info lives in footer.

## Component Changes

### Deleted
- `badge`, `accordion`, `sheet`, `card`, `avatar`, `button`, `dropdown-menu`
- `ThemeToggle`, `ThemeProvider`

### Kept (simplified)
- `separator` → 1px line only
- `ScrollAnimate` → opacity-only fade-in (200ms, linear), no transforms

### Not used
- All shadcn/ui components. Retain in dependencies but do not import.

## Dark Mode

- Dark only. Remove `next-themes`.
- `globals.css`: no `:root` light variables, no `.dark` class.
- Remove theme toggle from navbar.

## Content Strategy

- Language: Chinese primary
- Tone: direct, confident, no "help" rhetoric, no warm greetings
- No emoji, no exclamation marks, no "Hi I'm X"

## Implementation Notes

- Preserve MDX blog infrastructure (`@next/mdx`, `content/`, `src/lib/blog.ts`)
- Preserve projects data (`src/lib/projects.ts`)
- Preserve framer-motion for scroll-reveal only
- Preserve lucide-react for minimal functional icons (external link, mail, github)
- Rewrite `globals.css` from scratch
- Rewrite all page components
- Rewrite Navbar + Footer
