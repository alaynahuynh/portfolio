"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { paintings } from "@/data/creative-practice";

/**
 * The full 2D collection. Intentionally simple for now (a clean gallery +
 * lightbox) — this is the honest destination the homepage workspace links
 * to, not the fuller per-work detail view (medium/year/process) described
 * for a later phase. No invented metadata: just the real images.
 */
export function TwoDGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  function closeLightbox(returnIndex: number) {
    setActiveIndex(null);
    triggerRefs.current[returnIndex]?.focus();
  }

  useEffect(() => {
    if (activeIndex === null) return;
    const returnIndex = activeIndex;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox(returnIndex);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  const active = activeIndex !== null ? paintings[activeIndex] : null;

  return (
    <>
      <section className="bg-graph-paper py-24 sm:py-32">
        <Container>
          <Link
            href="/#creative-practice"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to the workspace
          </Link>
          <Heading level={1} className="mt-4">
            2D Works
          </Heading>
          <p className="mt-3 max-w-xl text-lg text-muted-foreground">
            Painting, drawing, illustration, and visual exploration.
          </p>

          <div className="mt-14 columns-1 gap-10 sm:columns-2 lg:columns-3">
            {paintings.map((painting, i) => (
              <div key={painting.slug} id={painting.slug} className="mb-10 scroll-mt-24 break-inside-avoid">
                <button
                  type="button"
                  ref={(el) => {
                    triggerRefs.current[i] = el;
                  }}
                  onClick={() => setActiveIndex(i)}
                  className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-hover"
                >
                  <span className="block overflow-hidden rounded-(--radius-default) shadow-md transition-shadow duration-(--duration-base) ease-(--ease-soft) group-hover:shadow-xl">
                    <Image
                      src={painting.src}
                      alt={painting.alt}
                      width={painting.width}
                      height={painting.height}
                      sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
                      className="h-auto w-full transition-transform duration-(--duration-slow) ease-(--ease-soft) group-hover:scale-[1.02]"
                    />
                  </span>
                </button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
          onClick={() => closeLightbox(activeIndex!)}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox(activeIndex!);
            }}
            aria-label="Close"
            className="absolute top-6 right-6 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X className="size-6" />
          </button>
          <Image
            src={active.src}
            alt={active.alt}
            width={active.width}
            height={active.height}
            sizes="90vw"
            className="max-h-[85vh] w-auto max-w-[90vw] rounded-sm object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
