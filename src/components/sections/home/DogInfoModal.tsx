"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";

interface Photo {
  src: string;
  alt: string;
}

interface DogInfoModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  subtitle: string;
  description: string;
  photos: Photo[];
}

/**
 * The real dog behind one of the hero's little characters — a popup,
 * not a page navigation, per the brief. Same accessible-dialog pattern
 * as the 2D gallery lightbox: focus moves to the close button on open,
 * Escape closes and returns focus to whatever triggered it, background
 * scroll is locked while open. Shared by both dogs so their content
 * (real for one, still-pending for the other) can't drift into two
 * different dialog implementations.
 *
 * Rendered through a portal straight to `document.body`, not inline
 * where this component is mounted. HeroArtScene (where both dogs live)
 * sits inside Hero's shrinking frame — a `motion.div` with its own
 * `transform` and `mask-image` — and a `position: fixed` element nested
 * under either one stops being positioned against the real viewport: it
 * becomes relative to that ancestor's own box instead, and gets capped
 * inside that ancestor's local stacking order no matter how high its own
 * z-index is set. In practice that meant this modal's backdrop/dialog
 * rendered clipped to the hero's frame and painted *underneath* the
 * hero's own heading text. A portal sidesteps the whole class of bug —
 * this is a real child of `<body>`, so no ancestor's transform/mask/
 * filter/stacking context can ever reach it, regardless of where in the
 * tree it's triggered from (the hero today, ClosingMeadow, or anywhere
 * else this gets reused).
 */
export function DogInfoModal({ open, onClose, name, subtitle, description, photos }: DogInfoModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = `${name.toLowerCase()}-modal-title`;

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-6"
      onClick={onClose}
    >
      <div
        className="relative max-h-[85vh] w-full max-w-md overflow-y-auto rounded-(--radius-default) bg-surface p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hover"
        >
          <X className="size-5" />
        </button>

        <p id={titleId} className="font-heading text-2xl text-foreground">
          {name}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        <p className="mt-4 text-foreground">{description}</p>

        {photos.length > 0 && (
          <div className="mt-6 grid grid-cols-3 gap-2">
            {photos.map((photo) => (
              <div key={photo.src} className="relative aspect-3/4 overflow-hidden rounded-(--radius-default)">
                <Image src={photo.src} alt={photo.alt} fill sizes="140px" className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
