import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { navLinks, siteConfig } from "@/lib/site-config";

export function Header() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm">
      <Container className="flex min-h-20 flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3">
        <Link href="/" className="font-heading text-lg font-semibold tracking-tight">
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-4">
          {navLinks.map((link) =>
            link.items ? (
              <details key={link.label} className="group relative">
                <summary
                  className="flex cursor-pointer list-none items-center gap-1 rounded-(--radius-pill) px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent [&::-webkit-details-marker]:hidden"
                >
                  {link.label}
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="absolute right-0 z-10 mt-2 min-w-40 rounded-(--radius-default) border border-border bg-surface p-2 shadow-lg">
                  {link.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-(--radius-pill) px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>
      </Container>
    </header>
  );
}
