# Components

## Purpose

Defines the reusable layout and shared components that form the site's UI shell and interaction primitives.

## Requirements

### Requirement: NavBar

**File:** `src/components/layout/navbar.tsx`

The NavBar SHALL be a sticky header with:
- Site title "Sonnet" (left, 12px, wide tracking) linking to `/`
- Navigation links: WORK (`/work`), NOTES (`/notes`), ABOUT (`/about`)
- ThemeToggle button (rightmost)
- Border-bottom separator (`border-border`)
- Max-width: 960px, height: 56px (h-14)

Navigation links SHALL use 10px font with 0.15em tracking, tertiary color, hover to foreground.

### Requirement: Footer

**File:** `src/components/layout/footer.tsx`

The Footer SHALL display a minimal copyright line at the bottom of every page.

### Requirement: ThemeProvider

**File:** `src/components/layout/theme-provider.tsx`

The ThemeProvider SHALL wrap the application with next-themes `<ThemeProvider>` configured with:
- `attribute="class"` (toggles `.light` class on `<html>`)
- `defaultTheme="system"`
- `enableSystem`

TypeScript compatibility: Uses `ComponentProps<typeof NextThemesProvider>` to satisfy next-themes' `Attribute | Attribute[]` type.

### Requirement: ThemeToggle

**File:** `src/components/layout/theme-toggle.tsx`

The ThemeToggle SHALL cycle through themes in order: system → light → dark.

Implementation: Uses `useTheme()` from next-themes. Renders a button with Sun/Moon/Monitor icons based on current theme. Calls `setTheme()` with the next theme in the cycle.

### Requirement: ScrollAnimate

**File:** `src/components/shared/scroll-animate.tsx`

The ScrollAnimate component SHALL provide fade-in animations on scroll using framer-motion.

Behavior:
- Wraps children with `motion.div`
- Animate from `opacity: 0, y: 12` to `opacity: 1, y: 0`
- Duration: 200ms (linear easing)
- Accepts optional `delay` prop (seconds)
- Uses `whileInView` with `once: true`
- Viewport margin: `-50px` (triggers slightly before element enters viewport)

### Requirement: Component Organization

Components SHALL be organized into two directories:
- `src/components/layout/` — structural components (NavBar, Footer, ThemeProvider, ThemeToggle)
- `src/components/shared/` — reusable UI primitives (ScrollAnimate)

Each component SHALL be a single file with a named export matching the filename.
