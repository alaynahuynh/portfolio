import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const STAGES = ["Cover", "2D Works", "3D Works", "The End"];

interface ChapterControlsProps {
  stage: number;
  onSelect: (stage: number) => void;
}

/**
 * Always-visible previous/next + chapter dots — the accessible fallback
 * for the scroll-linked book. Plain buttons, so keyboard (Tab + Enter/
 * Space) and touch (tap) both work identically to scrolling; navigation
 * never depends on the scroll gesture alone.
 *
 * Uses `aria-disabled` rather than the native `disabled` attribute at
 * the ends of the range. The button that's just been clicked can become
 * the "at the end" button in the same tick (e.g. Next → last stage) —
 * natively disabling a focused element blurs it immediately, and that
 * blur was observed to interrupt the in-flight smooth-scroll it had just
 * triggered. `aria-disabled` keeps the button focusable while still
 * announcing/styling it as disabled and no-op'ing the click.
 */
export function ChapterControls({ stage, onSelect }: ChapterControlsProps) {
  const atStart = stage <= 0;
  const atEnd = stage >= STAGES.length - 1;

  return (
    <div className="absolute inset-x-0 bottom-6 z-10 flex items-center justify-center gap-4 sm:bottom-10">
      <button
        type="button"
        onClick={() => !atStart && onSelect(stage - 1)}
        aria-disabled={atStart}
        aria-label="Previous chapter"
        className={cn(
          "flex size-10 items-center justify-center rounded-full bg-surface/90 text-foreground shadow-sm backdrop-blur-sm transition-opacity hover:bg-surface",
          atStart && "pointer-events-none opacity-30",
        )}
      >
        <ChevronLeft aria-hidden="true" className="size-5" />
      </button>

      <div className="flex items-center gap-2.5">
        {STAGES.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => onSelect(i)}
            aria-current={stage === i}
            aria-label={`Go to ${label}`}
            className={cn(
              "size-2.5 rounded-full transition-colors",
              stage === i ? "bg-mauve-deep" : "bg-surface/80 hover:bg-mauve",
            )}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => !atEnd && onSelect(stage + 1)}
        aria-disabled={atEnd}
        aria-label="Next chapter"
        className={cn(
          "flex size-10 items-center justify-center rounded-full bg-surface/90 text-foreground shadow-sm backdrop-blur-sm transition-opacity hover:bg-surface",
          atEnd && "pointer-events-none opacity-30",
        )}
      >
        <ChevronRight aria-hidden="true" className="size-5" />
      </button>
    </div>
  );
}
