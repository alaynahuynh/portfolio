import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig, socialLinks } from "@/lib/site-config";

// Renders on every route, the homepage included — the sketchbook's back
// cover (see BackCoverPage) deliberately has no copyright line of its
// own anymore, exactly so it doesn't repeat this one right above it.
export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
