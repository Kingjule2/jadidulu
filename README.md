# Jadidulu

React + Vite implementation of the updated Jadidulu [Figma landing-page frame](https://www.figma.com/design/qtAkwmMSYOICokjz0Hp9o3/Jadidulu-26-27?node-id=282-8410&m=dev). The adjacent Desktop - 1 frame is the older reference; this site follows Desktop - 2.

## Run locally

```sh
npm install
npm run dev
```

`npm run build` creates the production bundle. `npm run lint` runs Oxlint.

## Traffic analytics

Create a GA4 web data stream for this site, then set `VITE_GA_MEASUREMENT_ID` to its `G-...` Measurement ID in the local environment and the deployment project's environment variables. Rebuild/redeploy after setting it. The Google tag loads and sends a page view on each page load only when the ID is configured; without it, no analytics data is collected.

## Page structure

The page follows the Figma order: navigation and hero, blue planning banner, idea-to-prototype section, four illustrated process steps, Jaga Anabul and Vclass portfolio cards, six FAQ disclosures, closing invitation, and footer. Exported artwork and the black Jadidulu SVG logo (`logo.svg`) are in `public/figma/updated/`; its mark is also used in `public/favicon.png`. The hero button icons are in `public/figma/` and inherit their labels' colors.

Above 1200px the four process cards form a mouse-draggable, touch-swipeable, keyboard-scrollable row; at 601–1200px they form a two-column grid, and below 601px they stack. Card borders stay at 1px and are not animated. The page background fills wide laptop/desktop viewports while section gutters retain their 1440px Figma-frame spacing rather than growing with a fixed maximum content width. The header remains visible while scrolling; the navigation collapses below 900px and portfolio cards stack below 600px. Portfolio logos load eagerly on mobile, and FAQ answers start closed and expand from the numbered rows.

The portfolio labels are display-only because no project destinations are configured. Header and hero invitations scroll to the closing section; its action opens the configured WhatsApp URL.

The hero headline uses a deliberate crop reveal; on fine-pointer desktop screens, its content recedes on scroll and returns when scrolling back. In the planning, solution, and process sections, copy slides in from the left one rendered line at a time; the planning button follows its text. The solution illustration fades in from slightly below, and the four process cards fade upward in sequence as they enter view. Line breaks adjust to screen width and loaded fonts. Portfolio cards retain their separate stagger. The reference video is motion inspiration, not an embedded asset.

GSAP ScrollTrigger and ScrollSmoother smooth desktop scrolling for fine-pointer devices. Touch devices and users requesting reduced motion keep native scrolling. The planning card itself stays in place as its contents animate. SF Pro Text and Display files from [sahibjotsaggu/San-Francisco-Pro-Fonts](https://github.com/sahibjotsaggu/San-Francisco-Pro-Fonts) are served locally from `public/fonts/` for all devices; system fonts remain fallbacks. [Apple's SF Pro license](https://developer.apple.com/fonts/) does not permit web distribution, so deploying these files carries a licensing risk.
