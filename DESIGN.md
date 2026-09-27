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
    fontFamily: "SF Pro Text, SF Pro Display, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "48px"
    fontWeight: 700
    lineHeight: 1.25
  headline:
    fontFamily: "SF Pro Text, SF Pro Display, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "36px"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "SF Pro Text, SF Pro Display, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: "SF Pro Text, SF Pro Display, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
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

The [updated right-hand Figma artboard](https://www.figma.com/design/fLQhsIgRFXSBYsERppms40/Jadidulu?node-id=138-362) is the visual source of truth; the adjacent older artboard is not. Bright blue planning artwork leads into a warm product-direction explanation, illustrated process steps, two real project cards, a restrained FAQ, and a pastel invitation. Use the exact exported artwork in `public/figma/updated/`, not CSS approximations or the older illustrations.

The page is mostly flat and spacious. The artwork provides depth, while typography and clear rectangular actions keep the message legible. Narrow layouts reorder the same content without introducing new sections.

**Key Characteristics:**
- Blue action and emphasis colors against white and warm-white surfaces.
- SF Pro system typography on Apple devices with a system-sans fallback elsewhere.
- Figma-exported illustrations and background waves rather than substitute graphics.

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

**The Exported Background Rule.** Planning blue, hero wave, portfolio waves, and closing pastel gradient come from their Figma PNGs rather than palette-derived CSS gradients.

## Typography

**Site font:** SF Pro Text/Display, falling back to the Apple system font and then Segoe UI/system sans on devices without SF Pro. Apple does not license bundling the SF Pro font files for this website; the site does not download or redistribute them.

### Hierarchy
- **Display** (`display`): Hero and closing invitation.
- **Headline** (`headline`): Section headings; the planning card is a smaller instance.
- **Body** (`body`): Explanations, questions, and actions.
- **Label** (`label`): Uppercase eyebrows only on the hero, planning card, and closing invitation.

## Layout

The page fills the viewport at all desktop widths; content containers stay around 1248–1280px. The header is 84px high and stays visible during scrolling. The hero uses fluid padding rather than a fixed minimum height to avoid excessive empty space on laptops. Four process cards share a horizontal, keyboard-scrollable row above 1200px; they form a complete two-column grid from 601–1200px and stack on narrower phones. Navigation collapses at 900px and portfolio cards stack at 600px. Mobile header controls are at least 44px tall; supporting card and FAQ copy scales up for phone readability. Spacing uses the `compact`, `standard`, `section-gap`, and `section-padding` scale where appropriate.

The desktop footer shares the header logo's left gutter, centers its links independently of the copyright, and keeps the copyright on the right. Below 1100px the links use a centered second row; below 680px the footer stacks vertically.

## Elevation & Depth

Flat white cards and fine borders do the structural work; the planning card is translucent white over the blue illustration. The exported backgrounds carry the soft atmosphere. No generic drop shadow is part of the system.

## Motion

On first load, the header controls settle in, the hero headline resolves through an early crop-and-rise, and its copy, actions, and exported wave arrive in sequence. The planning card, solution artwork, headings, and portfolio cards enter once as they come into view. Process card borders remain stationary and 1px throughout scrolling. ScrollSmoother and ScrollTrigger provide native-backed smooth desktop scrolling for fine pointers, with the header fixed above the transformed content; touch screens and reduced-motion users retain native scrolling. Content stays visible if scripting or IntersectionObserver is unavailable. `prefers-reduced-motion: reduce` keeps the page static.

## Shapes

Actions use small rectangular corners (`control`); portfolio cards use softly rounded corners (`card`), the planning card uses a broader radius (`planning-card`), and its black link is a pill (`pill`). FAQ controls are black rounded rectangles with a white plus or minus.

## Components

### Buttons
- **Primary:** Action Blue fill, Paper text, and the small control radius. The hero uses the Figma-exported trailing icon.
- **Outline:** Paper fill, Emphasis Blue border and text, and its own exported icon.
- **Planning link:** Black pill on the translucent card, with a chevron.
- **Focus:** A visible Emphasis Blue outline; in-page scrolling respects reduced-motion settings.

### Cards / Containers
- **Process:** Four illustrated, copy-bearing cards with stationary 1px Quiet Rule borders and 8px corners; a scrollable desktop row, a two-column laptop/tablet grid, and a single-column phone layout.
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
