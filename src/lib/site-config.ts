/**
 * Central place for site-wide text and links. Edit this file to update
 * your name, tagline, navigation, and social links across the whole site.
 */

export const siteConfig = {
  name: "Alayna Huynh",
  title: "Alayna Huynh — Portfolio",
  /** The hero's one-line positioning statement — what she does, not just where she studied. */
  positioningStatement:
    "I design playful digital products that make complex experiences easier to understand and explore.",
  /** Secondary, below the positioning statement — school/credential, not the main pitch. */
  description: "University of Michigan · BSI",
  url: "https://example.com",
  email: "aahuynh@umich.edu",
};

/**
 * Top nav. Each entry anchors into a homepage section — using an absolute
 * `/#id` href means it works the same whether the visitor is already on
 * the homepage (same-page jump) or on an internal page (navigate home,
 * then jump), with no extra client-side routing logic needed.
 */
export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Sketchbook", href: "/#creative-practice" },
  // Not a real section anymore — About lives inside the sketchbook now.
  // Header.tsx special-cases this key to jump straight to that page
  // (see lib/chapter-nav.ts) instead of a plain anchor scroll.
  { label: "About", href: "/#about" },
] satisfies { label: string; href: string }[];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/alaynahuynh" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/alayna-huynh-977269374" },
] satisfies { label: string; href: string }[];
