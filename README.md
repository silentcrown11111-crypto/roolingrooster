# The Rolling Rooster — website (v2, cinematic rebuild)

Static site. Open `index.html`, or upload the folder to any static host (Netlify, Vercel, GitHub Pages, cPanel).

## Structure
- `index.html` — the page (11 scenes: hero + deconstructed Zinger, manifesto, signature five, campaign deal, deals rail, food story, full menu, "Hungry?", collage, order/find us, footer)
- `assets/css/styles.css` — design tokens at the top; one block per scene
- `assets/js/menu-data.js` — **all menu items, prices, deals, phones, hours, address** (the page renders from this)
- `assets/js/main.js` — rendering + GSAP/ScrollTrigger scenes + Lenis smooth scroll; full `prefers-reduced-motion` fallback
- `assets/products/` — processed product imagery. `tower-burger.webp` is the supplied Tower Burger photo (Real-ESRGAN ×2, alpha cut-out, sharpened); `tower-bun-top / patty-1 / patty-2 / base.webp` are its four real slices for the hero deconstruction and `tower-seeds.webp` the falling sesame layer. Everything else is a crop from the printed menu (ESRGAN ×3), used only at thumbnail size.
- `assets/brand/rooster-logo.png` — logo keyed from the menu artwork
- `assets/fonts/` — Big Shoulders Display (display), Manrope (body), Instrument Serif italic (accents), self-hosted
- `assets/vendor/` — gsap, ScrollTrigger, lenis (no CDN dependency)

## Editing
Prices/items/deals/contact → `menu-data.js`. Copy → `index.html`. Colours/type → `:root` in `styles.css`.

## Still to supply
Instagram profile URL (`instagramUrl` in menu-data.js + the two `instagram.com` links in index.html); exact Google Maps place link (`mapsUrl`); higher-resolution photography for the small menu thumbnails (`thumb-*.webp`, `drinks.webp`) — drop replacements in `assets/products/` keeping filenames.
