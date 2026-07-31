# Project Handoff

Snapshot of the codebase as of 2026-07-31, written for a fresh session with
no memory of prior conversations. Purely factual/technical — no visual
direction or roadmap included, since both are being replaced by a new brief.

## 1. Architecture & framework

- **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript** (strict), **Tailwind CSS v4**.
- No `tailwind.config.js` — Tailwind v4 reads theme tokens directly from the `@theme` block in `src/app/globals.css`.
- `motion` (Framer Motion) is installed and used for drag physics (see §3). `MotionConfig reducedMotion="user"` is set in `src/app/layout.tsx`, applied globally.
- Path alias: `@/*` → `src/*`.

## 2. Routes

| Route | File | Status |
|---|---|---|
| `/` | `src/app/page.tsx` | Fully built homepage (see §3 for section order) |
| `/projects` | `src/app/projects/page.tsx` | Placeholder — reads `src/data/projects.ts` (2 placeholder entries) |
| `/projects/[slug]` | `src/app/projects/[slug]/page.tsx` | Placeholder detail page, statically generated via `generateStaticParams` |
| `/about` | `src/app/about/page.tsx` | Placeholder page (unstyled boilerplate copy) |
| `/contact` | `src/app/contact/page.tsx` | Placeholder page |
| `/creative-practice/2d` | `src/app/creative-practice/2d/page.tsx` → renders `src/components/sections/TwoDGallery.tsx` | Real, working gallery + lightbox for the 6 paintings |
| `/creative-practice/3d` | `src/app/creative-practice/3d/page.tsx` | Real, working display of the 3 3D objects with size hierarchy |

## 3. Homepage section order (`src/app/page.tsx`)

1. `Hero` — name, tagline, cursor-reactive background, entrance animation
2. `WorksCallout` — CTA into `/projects` (stand-in for a real "Featured UX Work" section, not yet built)
3. `CreativeTransition` — one-sentence narrative bridge
4. `CreativeDesk` — the interactive workspace (2D paintings + 3D objects interleaved)
5. `StickyNoteBio` — "Hi I'm Alayna" note + headshot photo
6. `AboutLetter` — envelope/letter bio + a framed drawing

All sections except `Hero` are wrapped in `<Reveal>` (scroll-triggered fade/rise, `src/components/ui/Reveal.tsx`).

## 4. Reusable components

**`src/components/ui/`** (generic):
- `Button.tsx` — link/button, variant+size props (used by `/contact` only)
- `Container.tsx` — centers content, caps width via `--container-max`
- `Section.tsx` — vertical spacing wrapper (used by `/about`, `/contact`, `/projects`, `/projects/[slug]`)
- `Heading.tsx` — h1–h4 with consistent sizing
- `Badge.tsx` — small pill (used by `ProjectCard` and `/projects/[slug]`)
- `MagneticText.tsx` — cursor-reactive character-level text animation, `intensity` prop scales strength, word-wrap-safe (each word is its own `whitespace-nowrap` box)
- `Reveal.tsx` — `IntersectionObserver`-driven fade+rise wrapper

**`src/components/layout/`**: `Header.tsx` (nav w/ keyboard-accessible dropdowns via native `<details>`), `Footer.tsx`

**`src/components/sections/`**: `ProjectCard.tsx` (used by `/projects`), `TwoDGallery.tsx` (client component behind `/creative-practice/2d`)

**`src/components/sections/home/`**: `Hero.tsx`, `HeroPaint.tsx` (cursor-reactive watercolor blob background), `ScrollIndicator.tsx`, `WorksCallout.tsx`, `CreativeTransition.tsx`, `CreativeDesk.tsx`, `DeskProps.tsx` (hand-drawn SVG desk objects + `Tape`, `PaintSplatter`, `DraggableProp`), `StickyNoteBio.tsx`, `AboutLetter.tsx`

**Data**: `src/data/projects.ts` (placeholder `Project[]`), `src/data/creative-practice.ts` (real `paintings: Painting2D[]` and `threeDObjects: Object3D[]`, each with a `size: "large"|"medium"|"small"` tier)

**Lib**: `src/lib/site-config.ts` (name/nav/email/socials), `src/lib/utils.ts` (`cn()`), `src/lib/motion.ts` (tuning constants + `prefersReducedMotion()` for the hand-rolled rAF-driven effects)

## 5. Features currently working (verified: build/lint/typecheck pass; manually tested in-browser with Playwright)

- **Hero**: cinematic entrance (name scales down from 2.15x on mount via `useLayoutEffect`, skips entirely under reduced motion — verified via computed-style checks, not just visually), cursor-reactive multi-blob watercolor background (`HeroPaint.tsx`, rAF+lerp, pauses via `IntersectionObserver` when off-screen), magnetic name + lower-intensity magnetic subtitle, custom SVG scroll indicator.
- **Header nav**: keyboard-accessible dropdowns (native `<details>`, no JS).
- **CreativeDesk workspace**: 2D paintings and 3D objects rendered in one hand-curated `flex-wrap` layout (`deskLayout` array in `CreativeDesk.tsx`), NOT grouped by type.
  - 2D paintings (`Painting` component): draggable via `motion` — grab-point offset maintained (verified), tilt derived from horizontal drag distance, `dragConstraints` ±70px with `dragElastic`, `dragMomentum` for a coasting settle (no forced snap-back to origin — verified). Click without drag navigates to `/creative-practice/2d#{slug}`; click-vs-drag is tracked explicitly via `justDraggedRef` set in `onDrag` (**not** left to `motion`'s built-in gesture recognition — testing showed a real drag could still fire the trailing click). Reduced motion: `useReducedMotion()` swaps in a near-instant `dragTransition` (verified ~230ms settle vs ~600ms normal).
  - 3D objects (`ThreeDObject` component): plain `<Link>`, no drag, hover-lift + shadow only, navigates to `/creative-practice/3d#{slug}`.
  - Decorative desk props (`DeskProps.tsx`): mostly static with CSS hover-nudge; one (`Eraser`, via `DraggableProp`) is freely draggable for delight — same reduced-motion handling pattern as paintings.
- **`/creative-practice/2d`**: gallery grid + same-page lightbox (focus trap on open, `Escape` closes and returns focus to the trigger — both paths go through one `closeLightbox` function, verified).
- **`/creative-practice/3d`**: featured (largest) + supporting grid, sorted by `size` tier.
- **Mobile**: verified responsive at 390px viewport — decorative desk props hidden below `sm`/`md`/`lg` breakpoints, `MagneticText` word-wrapping fixed (was breaking mid-word before the word-grouping fix).

## 6. Recently created/modified files (this session, roughly chronological)

**New this session:**
- `src/components/sections/home/CreativeTransition.tsx`
- `src/app/creative-practice/2d/page.tsx`, `src/app/creative-practice/3d/page.tsx`
- `src/components/sections/TwoDGallery.tsx`
- `src/data/creative-practice.ts`
- `public/creative-practice/3d/{eye-table,pig-lamp,monkey-sculpture}.png` (transparent cutouts — see §9 for provenance)
- `public/creative-practice/3d/process/eye-table-photo.jpg` (real, unprocessed studio photo)
- `docs/OLD_PROJECT_HANDOFF.md` (this file)

**Modified this session:**
- `src/app/page.tsx` — reordered (see §3)
- `src/components/sections/home/CreativeDesk.tsx` — full rewrite: merged 2D+3D, new drag physics, navigation instead of lightbox
- `src/components/sections/home/WorksCallout.tsx` — removed the old UI/UX·3D·2D category tabs (now stale, see §7)
- `src/components/sections/home/StickyNoteBio.tsx` — new headshot, tape corners added via `Tape` component, crayon image removed
- `src/components/sections/home/Hero.tsx` — added tagline line "I look for design everywhere."
- `src/components/sections/home/DeskProps.tsx` — added `Palette`, `Eraser`, `Ruler`, `PaintSplatter`, `DraggableProp`

**Deleted this session:** `public/illustrations/crayon.png` (and the now-empty `public/illustrations/` folder), `public/illustrations/corgi-*.png` (earlier in session), `public/images/home/desk/sketchbook-page.jpg` (the "duck painting" / Duckette comic — removed from the desk per explicit request)

## 7. Known bugs / unfinished / stale references

- **Stale nav links**: `src/lib/site-config.ts` → `navLinks` still has a "Works" dropdown with "3D"/"2D" items pointing to `/projects?category=3d` / `?category=2d`. These are dead ends — `/projects` doesn't implement category filtering, and 2D/3D content now actually lives at `/creative-practice/2d` and `/creative-practice/3d`. **Needs updating** to point at the real routes (or be removed in favor of a different nav structure).
- **`/projects`, `/projects/[slug]`, `/about`, `/contact`** are all still generic scaffold placeholders, not real content.
- **`WorksCallout`** links to `/projects`, which has no real UX case studies yet — it's a placeholder stand-in for a proper "Featured UX Work" section.
- **3D object images are AI-generated** (see §9) — acceptable per explicit user sign-off, but flagged in the data file (`temporaryAsset: true` on each `Object3D` entry) as needing real photos/cutouts eventually.
- **No individual detail pages** for 2D/3D pieces (medium, year, materials, process) — `/creative-practice/2d` and `/creative-practice/3d` are intentionally simple collection views, not full case-study pages.
- The final verification pass for the 2D/3D-merge redesign (this session's last major change) had completed **typecheck/lint/build** (all clean) and a visual screenshot review, but had **not yet finished** a full interactive re-test (drag on the new merged layout, click-to-navigate on both 2D and 3D items, mobile check of the new composition) before this handoff was requested — worth a quick pass before trusting it fully.

## 8. Do not lose

Everything in §6 (new/modified/deleted files) represents real, deliberate work from this session — none of it is scaffold boilerplate. In particular:
- The **click-vs-drag fix** in `CreativeDesk.tsx` (`justDraggedRef`) — this was a real bug found via testing, not a stylistic choice; removing it would reintroduce the bug.
- The **reduced-motion drag-transition overrides** (`useReducedMotion()` checks in `CreativeDesk.tsx` and `DeskProps.tsx`'s `DraggableProp`) — `MotionConfig`'s global `reducedMotion="user"` does **not** cover drag-release physics (verified by testing), so these explicit per-component checks are load-bearing.
- The **word-grouping fix** in `MagneticText.tsx` (each word wrapped in its own `whitespace-nowrap` span) — without it, headings wrap mid-word on narrow viewports.
- `src/data/creative-practice.ts` — the single source of truth for both the homepage workspace and the two collection pages; don't let it drift out of sync with either.

## 9. Dependencies & technical decisions

- **`motion` (Framer Motion)** was added specifically for the drag/spring physics on `CreativeDesk` — deliberate choice over hand-rolling spring math, and its use is confined to that interaction (everything else uses plain CSS transitions or hand-rolled rAF+lerp).
- **`clsx` + `tailwind-merge`** (via `cn()` in `lib/utils.ts`) and **`lucide-react`** (icons) are the only other non-framework dependencies.
- **3D object asset provenance**: `eye-table.png` is an AI (ChatGPT)-generated transparent cutout, cross-verified against a real studio photo (`public/creative-practice/3d/process/eye-table-photo.jpg`) that was found afterward — they match closely. `pig-lamp.png` and `monkey-sculpture.png` are AI-generated with **no** real photo found to cross-check against. The user explicitly approved using the AI versions for now ("Use ChatGPT versions for now, flagged as temporary") — this is recorded in `temporaryAsset: true` on each entry in `src/data/creative-practice.ts`.
- **Headshot**: cropped from `newphoto.JPG` (user-provided, originally a full NYC-subway-platform photo) down to a bust-level portrait; saved as `public/images/home/headshot.jpg`. The crop box used was `(392, 1250, 1512, 2650)` on the original 3072×4096 image, in case re-cropping is ever needed.
- Source assets (originals the above were derived from) live outside this repo, on the user's Desktop — `Desktop/portfolio web/` and `Desktop/Artworks/` — not committed to this project.

## 10. Commands

```bash
npm install       # first-time setup
npm run dev        # dev server (project convention this session: -- -p <port> to avoid clashing with the sibling `mymuseum` project also on :3000)
npm run build       # production build — also runs TypeScript checks
npm run lint         # ESLint
npx tsc --noEmit      # typecheck only, no build
```

No test suite exists in this project (verification this session was: typecheck + lint + build + manual Playwright-driven browser checks, not an automated test file).
