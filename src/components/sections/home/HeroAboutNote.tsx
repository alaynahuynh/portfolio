import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * The hero's About object: a yellow sticky note carrying the
 * positioning statement in handwriting — the charming, personal take on
 * that line. It's deliberately not the *only* place that sentence
 * lives: see the plain-sans copy of it rendered directly in Hero.tsx
 * below the cluster, which is the fast-to-read version this note isn't
 * trying to be.
 */
export function HeroAboutNote({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex aspect-4/3 w-full -rotate-3 items-center justify-center rounded-sm bg-butter p-4 shadow-[0_10px_24px_-10px_rgba(46,50,42,0.35)]",
        className,
      )}
    >
      <p className="font-alayna-handwriting text-center text-lg leading-snug text-foreground sm:text-xl">
        {siteConfig.positioningStatement}
      </p>
    </div>
  );
}
