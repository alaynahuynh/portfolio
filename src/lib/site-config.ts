/**
 * Central place for site-wide text and links. Edit this file to update
 * your name, tagline, navigation, and social links across the whole site.
 */

export const siteConfig = {
  name: "Alayna Huynh",
  title: "Alayna Huynh — Portfolio",
  description: "Industrial Design & User Interface and User Experience",
  url: "https://example.com",
  email: "hello@example.com",
};

/**
 * Top nav. Items with `items` render as a dropdown (chevron) instead of
 * a plain link — used to jump to a project category or a contact method.
 */
export const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Works",
    href: "/projects",
    items: [
      { label: "UI/UX", href: "/projects?category=ui-ux" },
      { label: "3D", href: "/projects?category=3d" },
      { label: "2D", href: "/projects?category=2d" },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    items: [{ label: siteConfig.email, href: `mailto:${siteConfig.email}` }],
  },
] satisfies { label: string; href: string; items?: { label: string; href: string }[] }[];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/yourhandle" },
  { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle" },
] satisfies { label: string; href: string }[];
