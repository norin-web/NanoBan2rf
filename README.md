# Nano Banana — promo site

Promo site for the Nano Banana iOS app (AI images, photo edits and short videos from a prompt).
Design source: Paper file **"Nano Banana v2 RF"**, page **Promo** (desktop 1440 + mobile 390, Handoff artboard).

## Run

```bash
pnpm install
pnpm dev        # http://localhost:5173/
pnpm build      # → dist/
```

## Deploy

GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`
(repo `norin-web/NanoBan2rf`, Pages → Source: **GitHub Actions**).
The workflow copies `index.html` to `404.html` so deep links load the app.

### ⚠️ `base` and the custom domain

- Custom domain (now): **https://nanobananagen.skin** — `base: "/"` in `vite.config.ts` + `public/CNAME`.
- If the domain is ever removed: in **one commit** delete `public/CNAME`, set `base: "/NanoBan2rf/"` and point
  `site.url`, `canonical` and `og:*` in `index.html` back to `https://norin-web.github.io/NanoBan2rf/`. Otherwise every asset 404s (white screen).
- All image paths go through `img()` (`src/app/utils/img.ts`), so they follow `base` automatically.

## Where content lives

- `src/app/content/site.ts` — brand, email, App Store ID/link, features, styles, FAQ, specs. Pages never hard-code facts.
- `src/app/content/legal.ts` — Privacy Policy and Terms. **Paste the owner's texts verbatim**
  (only markup changes: `## ` headings, `- ` lists, `**bold**` lead-ins, `[text](url)` links) and update `legalUpdated`.
- Operator, address and the brand disclaimer (`site.operator`, `site.address`, `site.disclaimer`) follow the documents
  effective 11 November 2026. The iOS version (`app.minIOS`) is unknown until the App Store release; it stays hidden until then.

## Motion rules

- Native scrolling only (no Lenis); the header is always visible.
- Reveals use CSS transitions + `useReveal`; hidden-at-rest states are scoped to `html.js`, and both
  fallbacks are gated on real geometry, so content is never left invisible.
- Pinned scenes (`App`, `About`, `Support`, legal split) use `position: sticky` + `usePinnedSteps`;
  with `prefers-reduced-motion` the Support deck becomes a plain list and the About manifesto renders fully lit.
