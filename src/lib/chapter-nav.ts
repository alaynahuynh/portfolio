/**
 * Shared contract between the nav's "Creative Practice" dropdown
 * (Header.tsx / CreativePracticeNavItem.tsx) and the sketchbook's
 * scroll-driven pages (CreativePracticeBook.tsx). Dispatching this
 * event on `window` with a page key tells the book to smooth-scroll
 * straight to that page — from anywhere on the site, not just while
 * already looking at it.
 */
export const CHAPTER_NAV_EVENT = "book:go-to-chapter";

export interface ChapterLink {
  /** Must match a `key` in CreativePracticeBook's `PAGES` array. */
  key: string;
  label: string;
}

/** The pages surfaced in the "Creative Practice" dropdown specifically — not every page in the book. About has its own top-level nav item instead (see navLinks in site-config.ts); cover/contact/back-cover are entry/exit points rather than destinations. */
export const creativePracticeChapters: ChapterLink[] = [
  { key: "2d", label: "2D Works" },
  { key: "3d", label: "3D Works" },
];
