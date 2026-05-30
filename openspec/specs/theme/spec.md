# Theme System

## Purpose

Defines the theme switching system using next-themes — supporting system preference detection, manual override, and hydration-safe rendering.

## Requirements

### Requirement: Three-Theme Support

The system SHALL support three theme modes: system (default), dark, light.

Theme resolution:
- **system**: Follows `prefers-color-scheme` media query
- **dark**: Forces dark mode (`--background: #0a0a0a`)
- **light**: Forces light mode (`.light` class applied)

### Requirement: Theme Cycling

The ThemeToggle button SHALL cycle themes in fixed order: system → light → dark → system.

Current theme detection:
- Resolved theme (system-resolved) determines the icon shown
- Raw theme (user selection) determines the next cycle target
- If `theme === 'system'`, resolved theme is detected from `prefers-color-scheme`

### Requirement: Hydration Safety

The layout SHALL use `suppressHydrationWarning` on `<html>` to prevent theme flash and hydration mismatch warnings.

The ThemeProvider SHALL be the outermost client-component wrapper in the layout tree, ensuring theme context is available before any themed content renders.

### Requirement: CSS Variable Strategy

Dark theme colors SHALL be defined in `:root {}` (the default). Light theme colors SHALL be defined in `.light {}` (the override).

This approach ensures:
- No JavaScript is required to apply the correct colors (CSS handles the cascade)
- next-themes only toggles the `.light` class on `<html>`
- The system preference mode works without any class manipulation

### Requirement: Tailwind v4 Integration

Design tokens SHALL be bridged to Tailwind via `@theme inline {}` in `globals.css`:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-fg-secondary: var(--fg-secondary);
  --color-fg-tertiary: var(--fg-tertiary);
  --color-fg-inactive: var(--fg-inactive);
  --color-surface: var(--surface);
  --color-border: var(--border);
  --color-border-hi: var(--border-hi);
}
```

This enables Tailwind utility classes like `bg-background`, `text-fg-secondary`, `border-border`.

### Requirement: Icon Mapping

Theme icons SHALL use lucide-react:
- System/resolved dark: `Moon` icon
- Light: `Sun` icon
- Dark (explicit): `Moon` icon
- System/resolved light: `Sun` icon

The button SHALL have `sr-only` text for accessibility and appropriate `aria-label`.
