# Jadidulu

React + Vite implementation of the updated Jadidulu landing-page artboard in [Figma](https://www.figma.com/design/fLQhsIgRFXSBYsERppms40/Jadidulu?node-id=138-362). The file also contains an older adjacent artboard; this site follows the newer one.

## Run locally

```sh
npm install
npm run dev
```

`npm run build` creates the production bundle. `npm run lint` runs Oxlint.

## Traffic analytics

Create a GA4 web data stream for this site, then set `VITE_GA_MEASUREMENT_ID` to its `G-...` Measurement ID in the local environment and the deployment project's environment variables. Rebuild/redeploy after setting it. The Google tag loads and sends a page view on each page load only when the ID is configured; without it, no analytics data is collected.

## Page structure

The page follows the Figma order: navigation and hero, blue planning banner, idea-to-prototype section, four illustrated process steps, Jaga Anabul and Vclass portfolio cards, six FAQ disclosures, closing invitation, and footer. Exported artwork is in `public/figma/updated/`; the logo is the supplied `Downloads/Logojadidulu.png` in `public/figma/updated/logo.png`, with its mark also used as the favicon. The hero button icons are in `public/figma/` and inherit their labels' colors.

Above 1200px the four process cards form a keyboard-scrollable row; at 601–1200px they form a two-column grid, and below 601px they stack. Card borders stay at 1px and are not animated. The page background fills wide laptop/desktop viewports while inner content remains constrained. The header remains visible while scrolling; the navigation collapses below 900px and portfolio cards stack below 600px. Portfolio logos load eagerly on mobile, and FAQ answers start closed and expand from the numbered rows.

The Figma frame provides no destination for the showcased products or closing invitation. Their pictured labels are rendered without invented links. The header and hero invitations scroll to the closing section until a verified contact destination is available.

GSAP ScrollTrigger and ScrollSmoother smooth desktop scrolling for fine-pointer devices. Touch devices and users requesting reduced motion keep native scrolling. The planning card enters with opacity only, not a sideways transform. SF Pro Text and Display files from [sahibjotsaggu/San-Francisco-Pro-Fonts](https://github.com/sahibjotsaggu/San-Francisco-Pro-Fonts) are served locally from `public/fonts/` for all devices; system fonts remain fallbacks. [Apple's SF Pro license](https://developer.apple.com/fonts/) does not permit web distribution, so deploying these files carries a licensing risk.
