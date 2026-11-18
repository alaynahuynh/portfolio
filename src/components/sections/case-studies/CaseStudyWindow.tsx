import Image from "next/image";
import Link from "next/link";
import { RETRO_BEVEL } from "@/components/sections/home/retro-styles";
import { TASKBAR_ICONS } from "@/components/sections/home/taskbar-icons";
import { getProjectBySlug } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * A case study's hero media, opened as a window on the homepage desktop:
 * the same warm-grey Windows 98 bevel as the hero's About and Playground
 * windows (retro-styles.ts), with the project's taskbar icon and name in
 * the title bar. The title bar runs from a deepened shade of the
 * project's Selected Works card color to the color itself, so each
 * project keeps one color from homepage card to case study.
 *
 * `bare` drops the inner padding, for designed heroes (Nudge, Jurnee)
 * that fill the window edge to edge. The boxes in the title bar are
 * decorative here, as they are outside the homepage hero.
 */
export function CaseStudyWindow({
  slug,
  bare = false,
  className,
  children,
}: {
  slug: string;
  bare?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const project = getProjectBySlug(slug);
  const title = project?.title ?? "";
  const color = project?.media?.bgColor ?? project?.dominantColor ?? "var(--color-sage)";
  const icon = TASKBAR_ICONS[slug];

  return (
    <div className={cn("keep-light p-[3px]", RETRO_BEVEL, className)}>
      <div
        className="flex items-center gap-1.5 bg-linear-to-r from-(--bar-deep) to-(--bar-soft) px-1.5 py-[3px] select-none"
        style={
          {
            // White title text needs the deep end dark enough on every card color.
            "--bar-deep": `color-mix(in srgb, ${color} 55%, #1b1a17)`,
            "--bar-soft": color,
          } as React.CSSProperties
        }
      >
        {icon && <Image src={icon} alt="" width={48} height={48} className="size-4 shrink-0" />}
        <span className="flex-1 truncate font-sans text-[12px] font-bold text-white sm:text-[13px]">{title}</span>
        <span aria-hidden="true" className="flex gap-px">
          <TitleBox>
            <span className="h-px w-1/2 translate-y-[0.15em] bg-current" />
          </TitleBox>
          <TitleBox>
            <span className="size-[48%] border border-t-2 border-current" />
          </TitleBox>
          <TitleBox className="ml-[2px]">×</TitleBox>
        </span>
      </div>
      <div
        className={cn(
          "mt-[3px] overflow-hidden bg-[#fffdf8] shadow-[inset_1px_1px_#84817a,inset_-1px_-1px_#fffdf8]",
          !bare && "p-3 sm:p-5",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function TitleBox({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "flex size-[15px] items-center justify-center text-[11px] leading-none text-[#1b1a17]",
        RETRO_BEVEL,
        className,
      )}
    >
      {children}
    </span>
  );
}

/** "← Back to Work", written in Alayna's hand like the hero's
 * "Click around to explore" note, so every case study opens with the
 * same voice the desktop does. */
export function BackToWork() {
  return (
    <Link
      href="/#work"
      className="inline-block -rotate-2 font-alayna-handwriting text-lg text-muted-foreground transition-colors hover:text-foreground sm:text-xl"
    >
      ← Back to Work
    </Link>
  );
}
