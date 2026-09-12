"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface CaseStudyNavSection {
  id: string;
  label: string;
}

/** Clears the floating header pill (see Header.tsx) — matches the
 * scroll-mt-28 applied to each anchor target so both the scroll listener
 * below and native anchor jumps agree on where "the top" is. */
const HEADER_CLEARANCE = 112;

/** Tracks which section's top has scrolled past the header line, so the
 * mobile "Jump to section" disclosure can highlight the current one. */
function useActiveSection(sections: CaseStudyNavSection[]) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    if (sections.length === 0) return;
    let frame = 0;

    function update() {
      frame = 0;
      const line = HEADER_CLEARANCE + 24;
      let current = sections[0].id;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActiveId(current);
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sections]);

  return activeId;
}

function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
}

/**
 * Compact "Jump to section" disclosure, placed by CaseStudyPage.tsx right
 * after the hero. The only section-nav control on these pages — there's
 * no separate sticky sidebar rail, so the content column can stay
 * centered instead of sharing width with a nav column.
 */
export function CaseStudySectionMobileNav({
  sections,
}: {
  sections: CaseStudyNavSection[];
}) {
  const activeId = useActiveSection(sections);
  const [open, setOpen] = useState(false);

  if (sections.length === 0) return null;

  return (
    <div className="lg:hidden">
      <Container className="pb-8">
        <details
          open={open}
          onToggle={(event) =>
            setOpen((event.target as HTMLDetailsElement).open)
          }
          className="rounded-(--radius-default) border border-border bg-surface"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-foreground">
            Jump to section
            <span
              aria-hidden="true"
              className={cn(
                "text-muted-foreground transition-transform duration-(--duration-base)",
                open && "rotate-180",
              )}
            >
              ⌄
            </span>
          </summary>
          <ul className="space-y-0.5 px-2 pb-2">
            {sections.map(({ id, label }) => {
              const active = id === activeId;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active ? "location" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      goTo(id);
                      setOpen(false);
                    }}
                    className={cn(
                      "block rounded-(--radius-default) px-3 py-2 text-sm transition-colors duration-(--duration-base)",
                      active
                        ? "font-medium text-sage-deep"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </details>
      </Container>
    </div>
  );
}
