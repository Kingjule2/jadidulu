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

At desktop widths the process cards scroll horizontally so the fourth card remains accessible, as in the partially clipped Figma row. At 800px and below they stack in order. The navigation collapses below 900px; the portfolio cards stack below 600px. FAQ answers start closed and expand from the numbered rows.

The Figma frame provides no destination for the showcased products or closing invitation. Their pictured labels are rendered without invented links. The header and hero invitations scroll to the closing section until a verified contact destination is available.
