# Jadidulu

React + Vite website for Jadidulu.

## Run locally

```sh
npm install
npm run dev
```

`npm run build` creates the production bundle. `npm run lint` runs Oxlint.

## Portfolio carousel

The “See What Our Team Has Built” section is implemented in `src/components/PortfolioSection.jsx`, with its styles in `src/components/PortfolioSection.css`. Edit the `projects` array there to add, remove, or update cards; project images live under `public/images/`. The carousel loops over the number of cards and supports previous/next buttons, left/right arrow keys when focused, and touch or mouse swipes. It also respects reduced-motion preferences.

The current portfolio copy and images come from the project's existing sample portfolio component. Replace them with verified project details and distinct images before presenting them as client work.
