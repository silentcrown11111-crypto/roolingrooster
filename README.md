# The Rolling Rooster — website (v2, cinematic rebuild)

Static site. Open `index.html`, or upload the folder to any static host (Netlify, Vercel, GitHub Pages, cPanel).

## Structure
- `index.html` — the page (11 scenes: hero + deconstructed Zinger, manifesto, signature five, campaign deal, deals rail, food story, full menu, "Hungry?", collage, order/find us, footer)
- `assets/css/styles.css` — design tokens at the top; one block per scene
- `assets/js/menu-data.js` — **all menu items, prices, deals, phones, hours, address** (the page renders from this)
- `assets/js/main.js` — rendering + GSAP/ScrollTrigger scenes + Lenis smooth scroll; full `prefers-reduced-motion` fallback
- `assets/products/` — processed product imagery (crops from the printed menu → Real-ESRGAN ×2–×3 upscale → cut-outs/alpha). `zinger-*.webp` are the four real slices of the Zinger photo used in the scroll deconstruction.
- `assets/brand/rooster-logo.png` — logo keyed from the menu artwork
- `assets/fonts/` — Big Shoulders Display (display), Manrope (body), Instrument Serif italic (accents), self-hosted
- `assets/vendor/` — gsap, ScrollTrigger, lenis (no CDN dependency)

## Editing
Prices/items/deals/contact → `menu-data.js`. Copy → `index.html`. Colours/type → `:root` in `styles.css`.

## Still to supply
Instagram profile URL (`instagramUrl` in menu-data.js + the two `instagram.com` links in index.html); exact Google Maps place link (`mapsUrl`); any higher-resolution product photography — drop in `assets/products/` keeping filenames.
