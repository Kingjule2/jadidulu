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
    fontFamily: "Geist, 'Plus Jakarta Sans', sans-serif"
    fontSize: "48px"
    fontWeight: 700
    lineHeight: 1.25
  headline:
    fontFamily: "Geist, 'Plus Jakarta Sans', sans-serif"
    fontSize: "36px"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
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
- Geist headings paired with Plus Jakarta Sans body copy.
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

**Display Font:** Geist, with Plus Jakarta Sans fallback.  
**Body Font:** Plus Jakarta Sans, with sans-serif fallback.

### Hierarchy
- **Display** (`display`): Hero and closing invitation.
- **Headline** (`headline`): Section headings; the planning card is a smaller instance.
- **Body** (`body`): Explanations, questions, and actions.
- **Label** (`label`): Uppercase eyebrows only on the hero, planning card, and closing invitation.

## Layout

The desktop frame is at most 1440px wide, with content containers around 1248–1280px. The header is 84px high; the hero, planning banner, solution, portfolio, and closing invitation follow the Figma proportions. Four process cards share a horizontal, keyboard-scrollable row that clips the final card above 800px; they form a two-column tablet grid from 601–800px and stack on narrower phones. Navigation collapses at 900px and portfolio cards stack at 600px. Mobile header controls are at least 44px tall; supporting card and FAQ copy scales up for phone readability. Spacing uses the `compact`, `standard`, `section-gap`, and `section-padding` scale where appropriate.

The desktop footer shares the header logo's left gutter, centers its links independently of the copyright, and keeps the copyright on the right. Below 1100px the links use a centered second row; below 680px the footer stacks vertically.

## Elevation & Depth

Flat white cards and fine borders do the structural work; the planning card is translucent white over the blue illustration. The exported backgrounds carry the soft atmosphere. No generic drop shadow is part of the system.

## Motion

On first load, the header controls settle in, the hero headline resolves through an early crop-and-rise, and its copy, actions, and exported wave arrive in sequence. As sections enter the viewport, the planning card and solution artwork move in from opposite sides, supporting headings and portfolio cards settle upward, and the process cards resolve through a cropped reveal with a capped stagger. Entrances now take roughly 1–2.2 seconds with gentler easing; the headline's mask clears early so its copy stays legible while the rest of the animation continues. Scroll entrances play once per element; content stays visible if scripting or IntersectionObserver is unavailable. `prefers-reduced-motion: reduce` keeps the page static.

## Shapes

Actions use small rectangular corners (`control`); portfolio cards use softly rounded corners (`card`), the planning card uses a broader radius (`planning-card`), and its black link is a pill (`pill`). FAQ controls are black rounded rectangles with a white plus or minus.

## Components

### Buttons
- **Primary:** Action Blue fill, Paper text, and the small control radius. The hero uses the Figma-exported trailing icon.
- **Outline:** Paper fill, Emphasis Blue border and text, and its own exported icon.
- **Planning link:** Black pill on the translucent card, with a chevron.
- **Focus:** A visible Emphasis Blue outline; in-page scrolling respects reduced-motion settings.

### Cards / Containers
- **Process:** Four illustrated, copy-bearing cards with a 1px Quiet Rule border and 8px corners in a scrollable desktop row; stacked in source order on narrow screens.
- **Portfolio:** Two Paper cards for Jaga Anabul and Vclass with their actual exported logos. Do not fabricate projects.

### Navigation

The desktop header holds the logo, four section anchors, and the invitation. Narrow screens use a labeled menu control; its anchors close the menu after selection.

### FAQ

Six numbered rows start closed. The black plus changes to minus when its answer opens; the questions remain native buttons.

## Do's and Don'ts

### Do:
- **Do** follow the updated Figma artboard's content order, proportions, labels, and exported artwork.
- **Do** preserve keyboard access to the process row and FAQ and show focus states.

### Don't:
- **Don't** reuse the older artboard's rocket, illustrations, or carousel.
- **Don't** add unpictured projects, sections, or decorative motifs.
