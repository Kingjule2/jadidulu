# Jadidulu

React + Vite implementation of the updated Jadidulu landing-page artboard in [Figma](https://www.figma.com/design/fLQhsIgRFXSBYsERppms40/Jadidulu?node-id=138-362). The file also contains an older adjacent artboard; this site follows the newer one.

## Run locally

```sh
npm install
npm run dev
```

`npm run build` creates the production bundle. `npm run lint` runs Oxlint.

## Page structure

The page follows the Figma order: navigation and hero, blue planning banner, idea-to-prototype section, four illustrated process steps, Jaga Anabul and Vclass portfolio cards, six FAQ disclosures, closing invitation, and footer. Exported artwork is in `public/figma/updated/`; the two CTA icons are in `public/figma/`.

Above 1200px the four process cards form a keyboard-scrollable row; at 601–1200px they form a two-column grid, and below 601px they stack. Card borders stay at 1px and are not animated. The page background fills wide laptop/desktop viewports while inner content remains constrained. The header remains visible while scrolling; the navigation collapses below 900px and portfolio cards stack below 600px. FAQ answers start closed and expand from the numbered rows.

The Figma frame provides no destination for the showcased products or closing invitation. Their pictured labels are rendered without invented links. The header and hero invitations scroll to the closing section until a verified contact destination is available.

GSAP ScrollTrigger and ScrollSmoother smooth desktop scrolling for fine-pointer devices. Touch devices and users requesting reduced motion keep native scrolling. The font stack prefers locally available SF Pro Text/Display (including the Apple system font) throughout the site; other devices use Segoe UI or system sans-serif because Apple does not license redistributing SF Pro font files with a website.
