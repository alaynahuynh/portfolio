import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig, socialLinks } from "@/lib/site-config";

// Renders on every route, the homepage included — the sketchbook's back
// cover (see BackCoverPage) deliberately has no copyright line of its
// own anymore, exactly so it doesn't repeat this one right above it.
//
// White in the light theme; navy in the dark theme (the hero's pendant
// lamp toggles it site-wide, see src/lib/theme.ts).
const LINK = "transition-colors hover:text-foreground dark:hover:text-[#E8E1CF]";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background transition-colors duration-500 dark:border-[#1A2742] dark:bg-[#0E1424]">
      <Container className="flex flex-col gap-4 py-10 text-sm text-muted-foreground transition-colors duration-500 dark:text-[#E8E1CF]/75 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a href={`mailto:${siteConfig.email}`} className={LINK}>
            {siteConfig.email}
          </a>
          {socialLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
