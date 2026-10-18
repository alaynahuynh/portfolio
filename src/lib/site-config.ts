/**
 * Central place for site-wide text and links. Edit this file to update
 * your name, tagline, navigation, and social links across the whole site.
 */

export const siteConfig = {
  name: "Alayna Huynh",
  title: "Alayna Huynh — Portfolio",
  /** Small uppercase eyebrow above the hero name — deliberately just "Product
   * Designer," not "+ Developer": development should read as an advantage
   * (see heroSupportingLine below), not compete with the primary identity. */
  heroEyebrow: "Product Designer",
  /** The hero's main statement (shown in the About Me Notepad window) — what she does, not just where she studied. */
  positioningStatement: "I design and build digital products — a 3D gallery platform, an AI course assistant, and a live restaurant website.",
  /** Small supporting line under the main statement — where "I build, too" lives, deliberately smaller/quieter than the statement above it. */
  heroSupportingLine: "I prototype and build, too.",
  /** Subtitle on the hero monitor's screen, under the name. */
  heroScreenSubtitle: "Product Designer · University of Michigan",
  /** Hero credential line — school/degree, shown below the positioning statement. */
  credential: "University of Michigan · BSI in UX Design",
  /** SEO meta description (see layout.tsx) — the actual positioning
   * statement, not a generic "portfolio of a UX student" line, so
   * search results and link previews say what she actually does. */
  description: "Alayna Huynh — product designer at the University of Michigan. I design and build digital products.",
  /** The live site's base URL (e.g. "https://alaynahuynh.com"). Used as
   * metadataBase so link previews resolve absolute image URLs — leave
   * empty until the real domain is known. */
  url: "",
  email: "aahuynh@umich.edu",
};

/**
 * Top nav. "Work" anchors into the homepage section — an absolute `/#work`
 * href works the same whether the visitor is already on the homepage
 * (same-page jump, see Header.tsx's scrollToSection) or on an internal
 * page (navigate home, then jump). "Playground" and "About" are real
 * standalone routes, so they're plain links with no special handling.
 */
export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Playground", href: "/playground" },
  { label: "About", href: "/about" },
] satisfies { label: string; href: string }[];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/alaynahuynh" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/alayna-huynh-977269374" },
] satisfies { label: string; href: string }[];
