# Design System

## Purpose

Defines the monochrome INTJ-A visual design system — a cold, precise, typography-driven aesthetic with no accent colors. The system uses CSS custom properties for theming, with dark mode as the base and a `.light` class override for light mode. All visual hierarchy is communicated through weight, spacing, and opacity — never color.

## Requirements

### Requirement: Monochrome Palette

The system SHALL use a pure monochrome color palette with no accent or saturated colors.

#### Scenario: Dark mode (default)

- **GIVEN** the site is rendered in dark mode
- **WHEN** CSS custom properties are resolved
- **THEN** `--background` SHALL be `#0a0a0a`
- **AND** `--foreground` SHALL be `#f5f5f5`
- **AND** `--fg-secondary` SHALL be `#888888`
- **AND** `--fg-tertiary` SHALL be `#555555`
- **AND** `--border` SHALL be `#1a1a1a`

#### Scenario: Light mode

- **GIVEN** the `.light` class is applied to the HTML element
- **WHEN** CSS custom properties are resolved
- **THEN** `--background` SHALL be `#fafaf9`
- **AND** `--foreground` SHALL be `#1a1a1a`
- **AND** `--fg-secondary` SHALL be `#5c5c5c`

### Requirement: Design Tokens via CSS Custom Properties

The system SHALL expose design tokens as CSS custom properties mapped to Tailwind v4 `@theme inline` values.

Token list: `--background`, `--foreground`, `--fg-secondary`, `--fg-tertiary`, `--fg-inactive`, `--surface`, `--border`, `--border-hi`

Each token MUST map to a Tailwind color utility: `bg-background`, `text-foreground`, `text-fg-secondary`, `text-fg-tertiary`, `text-fg-inactive`, `bg-surface`, `border-border`, `border-border-hi`.

### Requirement: Typography Scale

The system SHALL use a restrained typography scale with Geist (sans) and Geist Mono (mono) fonts.

| Level | Size | Weight | Tracking | Usage |
|-------|------|--------|----------|-------|
| Display | 44–56px | extralight | -0.03em | Page headlines |
| Heading | 28–36px | normal | -0.02em | Section titles |
| Body | 14–15px | normal | — | Prose text |
| Label | 10–12px | normal | 0.15–0.2em | Navigation, metadata |
| Code | 13px | normal | — | Inline code, pre blocks |

### Requirement: Density-Narrative Homepage

The homepage SHALL follow a "density-narrative" layout:

- Oversized lightweight headline (56px, font-extralight)
- One-line metadata strip (11px, wide tracking)
- Full-width 1px hairline rules (`h-px bg-border`)
- Skills as text chips (`border border-border px-2.5 py-1`)
- Projects as text rows with `→` indicator
- All content in a single continuous flow, no section divisions
- Max content width: 720px (pages), 960px (listings)

### Requirement: No Decorative Elements

The system SHALL NOT use shadows, gradients, rounded corners (beyond defaults), background colors other than `bg-background` or `bg-surface`, icons as decoration, or emoji in UI copy.
