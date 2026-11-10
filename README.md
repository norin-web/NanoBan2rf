# Nano Banana — promo site

Promo site for the Nano Banana iOS app (AI images, photo edits and short videos from a prompt).
Design source: Paper file **"Nano Banana v2 RF"**, page **Promo** (desktop 1440 + mobile 390, Handoff artboard).

## Run

```bash
pnpm install
pnpm dev        # http://localhost:5173/NanoBan2rf/
pnpm build      # → dist/
```

## Deploy

GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`
(repo `norin-web/NanoBan2rf`, Pages → Source: **GitHub Actions**).
The workflow copies `index.html` to `404.html` so deep links load the app.

### ⚠️ `base` and the custom domain

- No domain (now): `base: "/NanoBan2rf/"` in `vite.config.ts`, site at `https://norin-web.github.io/NanoBan2rf/`.
- When a domain is attached in Pages settings: in **one commit** set `base: "/"` **and** add `public/CNAME`
  with the bare domain; update `site.url`, `canonical` and `og:*` URLs in `index.html`. Otherwise every asset 404s (white screen).
- All image paths go through `img()` (`src/app/utils/img.ts`), so they follow `base` automatically.

## Where content lives

- `src/app/content/site.ts` — brand, email, App Store ID/link, features, styles, FAQ, specs. Pages never hard-code facts.
- `src/app/content/legal.ts` — Privacy Policy and Terms. **Paste the owner's texts verbatim**
  (only markup changes: `## ` headings, `- ` lists) and set `legalUpdated`. Currently placeholders.
- PLACEHOLDER: operator name + brand disclaimer (`site.operator`, `site.disclaimer`) and iOS version (`app.minIOS`)
  — fill in from the documents / the App Store lookup after release.

## Motion rules

- Native scrolling only (no Lenis); the header is always visible.
- Reveals use CSS transitions + `useReveal`; hidden-at-rest states are scoped to `html.js`, and both
  fallbacks are gated on real geometry, so content is never left invisible.
- Pinned scenes (`App`, `About`, `Support`, legal split) use `position: sticky` + `usePinnedSteps`;
  with `prefers-reduced-motion` the Support deck becomes a plain list and the About manifesto renders fully lit.
