# Design System: Jadidulu

## Visual Direction & Brand Tokens
- **Brand Name:** jadidulu
- **Logo Icon:** 3 angled speed stripes (`#38BDF8`, `#2563EB`, `#1D4ED8`)
- **Aesthetic Tone:** Crisp, modern, trustworthy, high-craft SaaS product studio.

## Typography
- **Primary Font Family:** `Plus Jakarta Sans`, sans-serif (Weights: 400, 500, 600, 700, 800)
- **Hierarchy:**
  - Hero Title: 3.5rem (56px), Weight 800, Line Height 1.18, Letter Spacing -0.035em
  - Section Titles: 2.75rem (44px), Weight 800, Line Height 1.18, Letter Spacing -0.03em
  - Subheadings / Eyebrows: 1.25rem - 1.45rem, Weight 700
  - Body Text: 1.05rem - 1.15rem, Line Height 1.7 - 1.75
  - Badges / Microcopy: 0.8rem - 0.875rem, Weight 600-700

## Color System
| Token | Value | Purpose |
|---|---|---|
| `--color-primary` | `#2563EB` | Core Brand & CTA Button |
| `--color-primary-hover` | `#1D4ED8` | Hover state for buttons |
| `--color-accent-cyan` | `#2F9AE0` | Eyebrow text, timeline guide, speed bar |
| `--color-accent-bright` | `#38BDF8` | Highlight text ("App Idea"), light speed bar |
| `--color-purple` | `#9333EA` | Reassurance & Accent highlight ("Buildable", "Build") |
| `--color-text-main` | `#0F172A` | Primary headings (Tinted Deep Slate, no pure #000) |
| `--color-text-secondary` | `#475569` | High-contrast readable body text |
| `--color-text-muted` | `#64748B` | Captions, secondary labels |
| `--color-bg-white` | `#FFFFFF` | Core surface |
| `--color-bg-subtle` | `#F8FAFC` | Alternating section surface |
| `--color-border` | `#E2E8F0` | Subtle hairline dividers |

## Motion & Animation Architecture
- **Engine:** GSAP 3 + `@gsap/react`
- **Plugins:** `ScrollTrigger`, `CustomEase`, `Draggable`, `Flip`, `TextPlugin`, `Observer`
- **Guidelines:**
  - Purposeful motion: elements reveal cleanly as user scrolls.
  - Interactive micro-interactions on buttons, service tabs, and accordion cards.
  - Floating badges with gentle organic hover physics.
  - Avoid jarring or dated elastic bounce.
