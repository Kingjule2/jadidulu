# Jadidulu

React + Vite website for Jadidulu.

## Run locally

```sh
npm install
npm run dev
```

`npm run build` creates the production bundle. `npm run lint` runs Oxlint.

## Portfolio carousel

The “See What Our Team Has Built” section is implemented in `src/components/PortfolioSection.jsx`, with its styles in `src/components/PortfolioSection.css`. Edit the `projects` array there to add, remove, or update cards; project images live under `public/images/`. The carousel loops over the number of cards. Drag with a mouse or swipe on touchscreens; when the carousel is focused, the left/right arrow keys also navigate. Reduced-motion preferences are respected.

The current portfolio copy and images come from the project's existing sample portfolio component. Replace them with verified project details and distinct images before presenting them as client work.

## Responsive layout

The page uses fluid section widths up to a 1440px content canvas. At 900px and below, navigation collapses behind a menu button and the four process steps display in document order instead of inside a scroll region. At 600px and below, buttons and content stack for narrow screens; the portfolio carousel supports touch swipes and vertical page scrolling.

## Rocket section

The launch animation between the portfolio and FAQ is implemented in `src/components/RocketSection.jsx` with canvas drawing in `src/components/rocketScene.js`. Its backdrop stays transparent against the page; the launch pad is drawn without a gray ground fill. It starts 1.5 seconds after the section enters view (the pending start is canceled if the visitor leaves), supports pause/resume while playing, and shows the final message immediately when reduced motion is preferred.
