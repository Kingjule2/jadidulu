---
name: Jadidulu
description: Turn rough app ideas into clear, buildable product directions.
colors:
  primary: "#0c74b9"
  emphasis: "#0b709a"
  ink: "#141414"
  copy: "#3c4551"
  paper: "#ffffff"
  warm-paper: "#fafaf5"
  rule: "#e8e8e8"
typography:
  display:
    fontFamily: "SF Pro Display, SF Pro Text, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "48px"
    fontWeight: 700
    lineHeight: 1.25
  headline:
    fontFamily: "SF Pro Display, SF Pro Text, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "36px"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.5
rounded:
  control: "4px"
  card: "9px"
  process-card: "8px"
  planning-card: "16px"
  pill: "40px"
spacing:
  compact: "16px"
  standard: "24px"
  section-gap: "32px"
  section-padding: "80px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "10px 14px"
    height: "54px"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.emphasis}"
    rounded: "{rounded.control}"
    padding: "10px 14px"
    height: "54px"
  portfolio-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "20px 20px 30px"
---

# Design System: Jadidulu

## Overview

**Creative North Star: "Idea into Form"**

The [Desktop - 2 Figma artboard](https://www.figma.com/design/qtAkwmMSYOICokjz0Hp9o3/Jadidulu-26-27?node-id=282-8410&m=dev) is the visual source of truth; the adjacent Desktop - 1 artboard is not. Bright blue planning artwork leads into a warm product-direction explanation, illustrated process steps, two real project cards, a restrained FAQ, and a pastel invitation. Use the exact exported artwork in `public/figma/updated/`, not CSS approximations or the older illustrations.

The page is mostly flat and spacious. The artwork provides depth, while typography and clear rectangular actions keep the message legible. Narrow layouts reorder the same content without introducing new sections.

**Key Characteristics:**
- Blue action and emphasis colors against white and warm-white surfaces.
- Self-hosted SF Pro Display for headings and SF Pro Text for body copy and controls.
- Figma-exported illustrations and background waves rather than substitute graphics.
- The black Figma-exported Jadidulu SVG logo in both header and footer replaces the older blue mark; its shaded mark appears in the SVG favicon via an embedded WebP image.

## Colors

### Primary
- **Action Blue** (`primary`): Filled navigation and section actions.
- **Emphasis Blue** (`emphasis`): Selected heading words, labels, outlines, and keyboard focus.

### Neutral
- **Ink** (`ink`): Headlines and project titles.
- **Body Slate** (`copy`): Long-form text and navigation copy.
- **Paper** (`paper`): Main canvas and portfolio cards.
- **Warm Paper** (`warm-paper`): Solution section and footer.
- **Quiet Rule** (`rule`): FAQ dividers.

**The Exported Background Rule.** Planning blue, hero wave, portfolio waves, and closing pastel gradient come from their Figma artwork rather than palette-derived CSS gradients.

## Typography

**Site font:** Six locally served subset WOFF2 faces: SF Pro Display bold (hero/headings) and SF Pro Text regular, medium, semibold, bold, and heavy (body/UI) from [sahibjotsaggu/San-Francisco-Pro-Fonts](https://github.com/sahibjotsaggu/San-Francisco-Pro-Fonts) in `public/fonts/`. The subsets cover the site's Latin copy, Latin-1, and Latin Extended-A; other scripts use system fallbacks. Only Display bold is preloaded. These files are not licensed for web distribution under [Apple's SF Pro terms](https://developer.apple.com/fonts/); deployment carries a licensing risk.

### Hierarchy
- **Display** (`display`): Hero and closing invitation.
- **Headline** (`headline`): Section headings; the planning card is a smaller instance.
- **Body** (`body`): Explanations, questions, and actions.
- **Label** (`label`): Uppercase eyebrows only on the hero, planning card, and closing invitation.

## Layout

The page fills the viewport at all desktop widths. In the 1440px Figma frame, the blue planning card begins 58px from the left edge, the solution and process containers begin 80px from the edges, the portfolio container begins 105px from the edges, and the FAQ container begins 96px from the edges; these gutters do not keep growing beyond the frame width. The header is 84px high and stays visible during scrolling. The hero uses fluid padding rather than a fixed minimum height to avoid excessive empty space on laptops. Four process cards share a horizontal row above 1200px: drag with a mouse, swipe natively on touch screens, or scroll the focused row with the keyboard. They form a complete two-column grid from 601–1200px and stack on narrower phones. Navigation collapses at 900px and portfolio cards stack at 600px. Mobile header controls are at least 44px tall; supporting card and FAQ copy scales up for phone readability. Spacing uses the `compact`, `standard`, `section-gap`, and `section-padding` scale where appropriate.

The desktop footer shares the header logo's left gutter, centers its links independently of the copyright, and keeps the copyright on the right. Below 1100px the links use a centered second row; below 680px the footer stacks vertically.

## Elevation & Depth

Flat white cards and fine borders do the structural work; the planning card is translucent white over the blue illustration. The exported backgrounds carry the soft atmosphere. No generic drop shadow is part of the system.

## Motion

On first load, the header controls settle in, the hero headline resolves through a deliberate crop-and-rise, and its copy, actions, and exported wave arrive in sequence. On fine-pointer desktop screens the hero content recedes into the planning section on scroll and returns when scrolling back. The planning card stays in place: its eyebrow, heading, and paragraph slide in one rendered line at a time from the left, followed by its button. The solution heading and paragraphs and the process heading and intro use the same line-by-line entrance; line breaks are recalculated for loaded fonts and responsive widths. The solution artwork fades in from 30px below. Four process cards fade and rise 48px in sequence on desktop, by row on tablets, or individually when scrolled into view on phones; their borders stay 1px. Portfolio cards keep their own brief stagger, and other headings enter once in view. ScrollSmoother and ScrollTrigger smooth desktop scrolling beneath the fixed header; touch screens and reduced-motion users retain native scrolling. Portfolio logos load eagerly so Android browsers do not defer them behind reveal transitions. Without IntersectionObserver, content remains visible without scroll reveals. `prefers-reduced-motion: reduce` keeps the page static apart from color feedback on the contact action.

## Shapes

Actions use small rectangular corners (`control`); portfolio cards use softly rounded corners (`card`), the planning card uses a broader radius (`planning-card`), and its black link is a pill (`pill`). FAQ controls are black rounded rectangles with a white plus or minus.

## Components

### Buttons
- **Primary:** Action Blue fill, Paper text, and the small control radius. The hero uses the Figma-exported trailing icon masked to the same color as the label.
- **Outline:** Paper fill, Emphasis Blue border and text, and its exported icon masked to the same color as the label.
- **Planning link:** Black pill on the translucent card, with a chevron.
- **Focus:** A visible Emphasis Blue outline; in-page scrolling respects reduced-motion settings.

### Cards / Containers
- **Process:** Four illustrated, copy-bearing cards with stationary 1px Quiet Rule borders and 8px corners; a mouse-draggable, touch-swipeable, keyboard-scrollable desktop row, a two-column laptop/tablet grid, and a single-column phone layout.
- **Portfolio:** Two Paper cards for Jaga Anabul and Vclass with their actual exported logos. Do not fabricate projects.

### Navigation

The desktop header holds the logo, four section anchors, and the invitation. It remains visible while scrolling; hash links align sections below it. Narrow screens use a labeled menu control; its anchors close the menu after selection.

### FAQ

Six numbered rows start closed. The black plus changes to minus when its answer opens; the questions remain native buttons.

## Do's and Don'ts

### Do:
- **Do** follow the updated Figma artboard's content order, proportions, labels, and exported artwork.
- **Do** preserve keyboard access to the process row and FAQ and show focus states.

### Don't:
- **Don't** reuse the older artboard's rocket, illustrations, or carousel.
- **Don't** add unpictured projects, sections, or decorative motifs.
