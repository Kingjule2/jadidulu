# Jadidulu

React + Vite implementation of the updated Jadidulu [Figma landing-page frame](https://www.figma.com/design/qtAkwmMSYOICokjz0Hp9o3/Jadidulu-26-27?node-id=282-8410&m=dev). The adjacent Desktop - 1 frame is the older reference; this site follows Desktop - 2.

## Run locally

```sh
npm install
npm run dev
```

`npm run build` creates the production bundle. `npm run lint` runs Oxlint. To measure actual visitor transfer, run `npm run preview:prod`, open `http://127.0.0.1:4173/`, and inspect a fresh visit in DevTools Network with cache disabled. `npm run dev` serves unminified React, HMR, and dependency modules; its transfer size is not the production payload.

## Traffic analytics

Create a GA4 web data stream for this site, then set `VITE_GA_MEASUREMENT_ID` to its `G-...` Measurement ID in the local environment and the deployment project's environment variables. Rebuild/redeploy after setting it. The Google tag loads and sends a page view on each page load only when the ID is configured; without it, no analytics data is collected.

## Page structure

The page follows the Figma order: navigation and hero, blue planning banner, idea-to-prototype section, four illustrated process steps, Jaga Anabul and Vclass portfolio cards, six FAQ disclosures, closing invitation, and footer. Exported artwork and the black Jadidulu SVG logo (`logo.svg`) are in `public/figma/updated/`; its mark is also used in `public/favicon.svg`, with a compact embedded WebP image to preserve its shading. The hero button icons are in `public/figma/` and inherit their labels' colors.

Above 1200px the four process cards form a mouse-draggable, touch-swipeable, keyboard-scrollable row; at 601–1200px they form a two-column grid, and below 601px they stack. Card borders stay at 1px and are not animated. The page background fills wide laptop/desktop viewports while section gutters retain their 1440px Figma-frame spacing rather than growing with a fixed maximum content width. The header remains visible while scrolling; the navigation collapses below 900px and portfolio cards stack below 600px. Below-fold illustrations and portfolio logos load lazily; FAQ answers start closed and expand from the numbered rows.

The portfolio labels are display-only because no project destinations are configured. Header and hero invitations scroll to the closing section; its action opens the configured WhatsApp URL.

The hero headline uses a deliberate crop reveal; on fine-pointer desktop screens, its content recedes on scroll and returns when scrolling back. In the planning, solution, and process sections, copy slides in from the left one rendered line at a time; the planning button follows its text. The solution illustration fades in from slightly below, and the four process cards fade upward in sequence as they enter view. Reveals animate out when they leave view and replay on return without collapsing the page layout. Line breaks adjust to screen width and loaded fonts. Portfolio cards retain their separate stagger. The reference video is motion inspiration, not an embedded asset.

GSAP ScrollTrigger and ScrollSmoother load only on fine-pointer desktop screens for smooth scrolling. Touch devices and users requesting reduced motion keep native scrolling. The planning card itself stays in place as its contents animate. Subset WOFF2 SF Pro Text and Display files from [sahibjotsaggu/San-Francisco-Pro-Fonts](https://github.com/sahibjotsaggu/San-Francisco-Pro-Fonts) are served locally from `public/fonts/`; system fonts remain fallbacks. [Apple's SF Pro license](https://developer.apple.com/fonts/) does not permit web distribution, so deploying these files carries a licensing risk.

The hero uses separate desktop and mobile WebP artwork; the planning background uses AVIF with a WebP fallback. The six font files cover the site's Latin copy (Latin-1 and Latin Extended-A included); other scripts fall back to system fonts until the subset is expanded. Measure first-visit transfer against `npm run preview:prod` with an empty browser cache, not the Vite development server. Scrolling loads additional artwork, so first-viewport transfer is not the full-page total. Background artwork is removed from offscreen sections after they leave the preload range, but hiding content cannot undo bytes already transferred; Network totals are cumulative and downloaded images remain eligible for browser caching.

## Asset caching

`vercel.json` gives content-hashed Vite `/assets/` files a one-year immutable browser cache. Public `/figma/`, `/fonts/`, and favicon files have a one-hour browser cache and one-day Vercel edge TTL because their filenames are not hashed. HTML retains Vercel's revalidation default. The Vite preview server does not emulate these Vercel response headers; verify them on a deployment before relying on them in production.

Vite minifies the CSS bundle. The preview server responds to a CSS `GET` with `Content-Encoding: gzip` when the client requests gzip; Vercel negotiates Brotli first and gzip otherwise for CSS automatically. Do not ship an extra `.css.gz` file without an explicit server route and correct `Content-Encoding`.
