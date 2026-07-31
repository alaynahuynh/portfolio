# Project Guide

A map of where things live so you can make edits without hunting around.
Stack: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 +
`motion` (Framer Motion, for drag/spring interactions).

## Quick start

```bash
npm run dev     # start local dev server
npm run build   # production build (also type-checks)
npm run lint    # ESLint
```

## Status

- ✅ **Homepage** (`/`) — cinematic hero (entrance animation, cursor-reactive
  watercolor background, magnetic type), sticky-note bio, "about me" letter,
  a draggable creative-desk showcase for 2D work, and a works CTA. See below
  for how each piece maps to a component.
- 🚧 **Works / project pages** (`/projects`, `/projects/[slug]`) — still the
  generic placeholder scaffold from initial setup. The real UI/UX, 3D, and
  2D project content hasn't been built yet — that's next, and will likely
  need a richer per-project content model than the current simple `Project`
  type (see "Notes for next steps").
- 🚧 **About / Contact pages** — still placeholders.

## Folder structure

```
src/
  app/
    layout.tsx              Root layout: fonts, MotionConfig, skip link, Header + Footer
    page.tsx                  Homepage ("/") — composes the sections below
    globals.css                Design tokens (colors, fonts, radii, motion) + global styles
    projects/                 "/projects" + "/projects/[slug]" (placeholder — see Status)
    about/, contact/           Placeholder pages

  components/
    ui/                      Generic, content-agnostic building blocks
      Button.tsx, Container.tsx, Section.tsx, Heading.tsx, Badge.tsx
      MagneticText.tsx         Cursor-reactive heading/text (see Interaction system below)
      Reveal.tsx                Fades + lifts children in as they scroll into view
    layout/                  Page chrome, rendered on every page
      Header.tsx               Nav with dropdown support (see navLinks in site-config.ts)
      Footer.tsx
    sections/
      ProjectCard.tsx          Generic project preview card (used by /projects)
      home/                    Homepage-only sections, in the order they render
        Hero.tsx                 Name + tagline; entrance animation + cursor-reactive background
        HeroPaint.tsx             The cursor-reactive watercolor blobs behind the hero
        ScrollIndicator.tsx       Custom hand-drawn scroll cue (not a generic arrow)
        StickyNoteBio.tsx        "Hi I'm Alayna" note + taped photo + crayon
        AboutLetter.tsx          "A little bit about me" envelope + letter
        CreativeDesk.tsx         Draggable paintings taped to a desk, + lightbox
        DeskProps.tsx             Hand-drawn desk objects (pencil, brush, tape, ...) used by CreativeDesk
        WorksCallout.tsx         CTA into /projects + UI/UX·3D·2D category links

  data/
    projects.ts              Placeholder project list — will be reworked when
                              the Works pages are built (see Status above)

  types/
    index.ts                 Shared TypeScript types (e.g. Project)

  lib/
    site-config.ts            Name, tagline, nav (incl. dropdown items), email
    utils.ts                   cn() helper for merging Tailwind classes
    motion.ts                  Shared tuning for hero paint / magnetic type physics

public/
  images/
    home/                     Homepage photos (headshot, penguin signature)
      desk/                     The unframed paintings + sketchbook page on CreativeDesk
    projects/                  Project cover images (placeholder for now)
  illustrations/              Reusable hand-drawn assets (crayon)
```

## Where to edit common things

| I want to change...                     | Edit this file                          |
| ---------------------------------------- | ---------------------------------------- |
| My name, tagline, nav links, email       | `src/lib/site-config.ts`                 |
| Homepage sticky-note bio copy            | `src/components/sections/home/StickyNoteBio.tsx` (`passions` array) |
| Homepage "about me" letter copy          | `src/components/sections/home/AboutLetter.tsx` (`paragraphs` array) |
| Creative desk paintings/order            | `src/components/sections/home/CreativeDesk.tsx` (`deskItems` array) + `public/images/home/desk/` |
| Creative desk props (pencil, tape, ...)  | `src/components/sections/home/DeskProps.tsx` |
| Projects (add/edit/remove)               | `src/data/projects.ts` — placeholder until Works pages are rebuilt |
| Header / nav layout, dropdown items      | `src/components/layout/Header.tsx`, `navLinks` in `site-config.ts` |
| Footer layout                            | `src/components/layout/Footer.tsx`       |
| Colors                                   | `src/app/globals.css` (`:root`)          |
| Fonts                                    | `src/app/layout.tsx` (font imports) + `globals.css` (`--font-heading` / `--font-sans` / `--font-handwriting`) |
| Page width / spacing rhythm              | `--container-max` in `globals.css`, or the `Container` / `Section` components |
| Motion timing (durations/easing)         | `--ease-soft` / `--ease-spring` / `--duration-*` in `globals.css`, plus `src/lib/motion.ts` for JS-driven interactions |
| Button styles                            | `src/components/ui/Button.tsx`           |

## Design tokens (colors, fonts, radius, motion)

All design tokens live at the top of `src/app/globals.css` as CSS variables,
mapped to Tailwind utilities via `@theme inline` — change a variable once and
every component using it updates.

- **Colors**: `--color-background` (warm off-white paper), `--color-surface`
  (cards/notes), `--color-foreground`, `--color-accent` / `--color-accent-hover`
  (soft pink), scrapbook tokens (`--color-note-yellow`, `--color-kraft`,
  `--color-airmail-red` / `--color-airmail-blue`), and a `.bg-desk` texture
  class (warm, subtly grained) used only by CreativeDesk to make that section
  feel like its own "chapter" distinct from the paper sections above it.
- **Fonts**: `--font-heading` (Onest), `--font-sans` (Instrument Sans),
  `--font-handwriting` (Caveat) — used for anything that reads as
  hand-lettered (sticky note, letter, desk captions). Real, accessible text
  throughout, never text baked into an image.
- **Radius**: `--radius-default` (cards/images), `--radius-pill` (buttons/tags).
- **Motion**: `--ease-soft` / `--ease-spring` and `--duration-fast/base/slow`
  are the shared CSS transition timing, used everywhere for consistency.
  `src/lib/motion.ts` holds the equivalent tuning for JS-driven interactions
  (hero paint lerp speed, magnetic-text radius/displacement).
- **No dark mode**: intentional — the paper/scrapbook aesthetic is
  light-only. Revisit with a manual toggle (`next-themes`) later if wanted.

There's no separate `tailwind.config.js` — Tailwind v4 reads theme config
directly from the `@theme` block in `globals.css`.

## Interaction system

Two different animation mechanisms are in play, deliberately:

- **CSS transitions/animations** (hover lifts, dropdown, marquee-era leftovers)
  — timed via the `--ease-*`/`--duration-*` tokens, and globally collapsed to
  ~0ms under `prefers-reduced-motion` by a rule in `globals.css`.
- **`motion` (Framer Motion)** — used specifically for drag physics on
  `CreativeDesk` (spring-back, elastic constraints) and configured via
  `<MotionConfig reducedMotion="user">` in the root layout. Important gotcha
  learned the hard way: `MotionConfig`'s reduced-motion setting covers
  `whileHover`/`whileTap`, but **not** the drag-release spring — that's a
  separate code path, so `CreativeDesk.tsx` and `DeskProps.tsx` each check
  `useReducedMotion()` explicitly and swap in a much stiffer, faster spring
  rather than skipping the animation outright (dragging is user-initiated
  direct manipulation, not ambient motion, so it stays functional either way).

Hand-rolled cursor-tracking (`HeroPaint`, `MagneticText`) uses
`requestAnimationFrame` + linear interpolation rather than `motion`, gated
behind `prefers-reduced-motion` and (for `MagneticText`) `pointer: fine`
checks before ever attaching a listener.

## Accessibility & motion

- A "Skip to content" link is the first focusable element on every page.
- CreativeDesk paintings are real `<button>`s (keyboard-focusable, visible
  focus ring), not click-handlers on a `<div>`. The lightbox traps focus on
  its close button when opened, closes on Escape, and returns focus to the
  painting that opened it either way (verified — Escape and the close button
  both go through the same `closeLightbox` path, they didn't originally).
- Drag vs. click on desk paintings is **not** left to `motion`'s built-in
  gesture recognition — testing showed a real drag could still trigger the
  trailing click and open the lightbox unintentionally. `CreativeDesk.tsx`
  explicitly tracks `justDraggedRef` via `onDrag`/`onDragStart` and the click
  handler bails if a real drag just happened.
- Decorative-only images/icons use empty `alt=""` / `aria-hidden="true"` so
  screen readers skip them.

## Adding a new project

The current `src/data/projects.ts` / `Project` type is the placeholder
scaffold from initial setup — it'll be reworked when the Works pages are
built next, since UI/UX, 3D, and 2D projects each need different card styles
and content lengths. Don't invest heavily in the current shape yet.

## Adding a new page

Create a folder under `src/app/` with a `page.tsx` inside — e.g.
`src/app/blog/page.tsx` becomes `/blog`. Use `Section` and `Container` from
`components/ui` to match spacing/width, and add a link to it in `navLinks` in
`src/lib/site-config.ts` if it should appear in the header.

## Adding a new reusable component

- Generic (no knowledge of your content, reusable anywhere) → `components/ui/`
- Tied to a specific content type (projects, testimonials, etc.) → `components/sections/`
- Homepage-only → `components/sections/home/`
- Page chrome that appears on every page → `components/layout/`

Use the `cn()` helper from `src/lib/utils.ts` when a component needs to merge
its own default classes with a `className` prop passed in from outside.

## Notes for next steps

- Build the Works pages (`/projects`, `/projects/[slug]`) next, including a
  richer per-project content model (flexible content blocks) so each project
  type — UI/UX case study, 3D, 2D — can have its own layout without a
  one-off hardcoded page per project. The reference portfolio studied for
  this round (a Framer site) presents case studies as large photographic
  cards with one outcome-driven line + a real metric — worth revisiting then.
- The `CreativeDesk` lightbox intentionally has no medium/year/description/
  inspiration/process metadata yet — real details are needed before adding
  that copy rather than inventing placeholder text.
- No mobile hamburger menu — the header nav wraps naturally instead (fine
  for the current 3-item nav; revisit if it grows).
- No CMS/MDX — content lives directly in TypeScript/TSX files.
