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
  /** The hero's main statement — what she does, not just where she studied. */
  positioningStatement: "I design digital products that make complex experiences intuitive, engaging, and human.",
  /** Small supporting line under the main statement — where "I build, too" lives, deliberately smaller/quieter than the statement above it. */
  heroSupportingLine: "I prototype and build, too.",
  /** Subtitle on the hero monitor's screen, under the name. */
  heroScreenSubtitle: "Product Designer · University of Michigan",
  /** Intro line in the hero's Notepad window. */
  heroNotepadText: "I turn complex problems into thoughtful, playful digital experiences.",
  /** Hero credential line — school/degree, shown below the positioning statement. */
  credential: "University of Michigan · BSI in UX Design",
  /** Hero availability line — shown below the credential. Update once the search window changes. */
  availability: "Available for Summer 2027 Product Design internships",
  /** SEO meta description (see layout.tsx) — the actual positioning
   * statement, not a generic "portfolio of a UX student" line, so
   * search results and link previews say what she actually does. */
  description: "Alayna Huynh — I design digital products that make complex experiences intuitive, engaging, and human.",
  url: "https://example.com",
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
