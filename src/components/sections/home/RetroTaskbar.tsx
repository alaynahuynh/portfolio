"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { Volume2 } from "lucide-react";
import { RETRO_BEVEL, RETRO_BEVEL_PRESSED, RETRO_WELL } from "@/components/sections/home/retro-styles";
import { cn } from "@/lib/utils";

/**
 * Selected Works' header, drawn as a Windows 98 taskbar in the same warm
 * grey and bevels as the hero's windows (retro-styles.ts), so the desktop
 * reads as one system:
 *
 * - Start button: a raised button carrying the section's title in bold
 *   (the visible title; the real h2 is sr-only in FeaturedWork).
 * - Task buttons: one per featured project, like open windows, all
 *   raised, each with the project's small logo as its program icon
 *   (public/images/home/taskbar). Each links down to its project card (Lenis smooth-scrolls
 *   in-page anchors). md+ only; on phones there's no room beside the
 *   Start button.
 * - Tray: a sunken well with a speaker and a live clock (rendered
 *   client-only, so the server HTML never disagrees).
 *
 * The colors are fixed (not theme tokens), like the hero windows: the
 * taskbar stays Windows grey in the dark theme too.
 *
 * Also closes every case study (see CaseStudyEnd): there the tasks are
 * page links, the Start button links back to the homepage list, and the
 * project being read shows as the pressed (active) task, as on a real
 * taskbar.
 */

export interface TaskbarTask {
  /** In-page anchor id of the project's card. */
  id: string;
  title: string;
  /** The project's logo, shown as the button's program icon. */
  icon?: string;
  /** Page link; defaults to the in-page anchor `#${id}`. */
  href?: string;
  /** The page being viewed: drawn pressed, with aria-current. */
  current?: boolean;
}

/** Inverted bevel on a lighter dither, as Windows draws the active task. */
const TASK_ACTIVE =
  "bg-[#d6d3cb] font-bold shadow-[inset_-1px_-1px_#fffdf8,inset_1px_1px_#413f3a,inset_-2px_-2px_#e2dfd7,inset_2px_2px_#84817a]";

export function RetroTaskbar({
  tasks,
  startHref,
  label = "Selected projects",
}: {
  tasks: TaskbarTask[];
  /** Makes the Start button a link (e.g. back to the homepage list). */
  startHref?: string;
  label?: string;
}) {
  const startClass = cn("flex shrink-0 items-center px-3 text-[13px] font-bold sm:text-[14px]", RETRO_BEVEL);
  return (
    <nav
      aria-label={label}
      className="relative flex h-10 items-stretch gap-1 bg-[#c3c0b8] px-1 py-[4px] font-sans text-[12px] text-[#1b1a17] shadow-[inset_0_1px_#e2dfd7,inset_0_2px_#fffdf8,inset_0_-1px_#a9a69e,0_-4px_14px_rgba(0,0,0,0.18),0_3px_6px_-2px_rgba(46,42,32,0.18)] select-none"
    >
      {/* Start button */}
      {startHref ? (
        <Link
          href={startHref}
          className={cn(
            startClass,
            RETRO_BEVEL_PRESSED,
            "focus-visible:outline-1 focus-visible:-outline-offset-4 focus-visible:outline-[#1b1a17] focus-visible:outline-dotted",
          )}
        >
          Selected Works
        </Link>
      ) : (
        <div className={startClass}>Selected Works</div>
      )}

      {/* Divider grip, as between Start and the tasks on a real taskbar */}
      <span
        aria-hidden="true"
        className="mx-0.5 hidden w-[3px] shrink-0 shadow-[inset_1px_0_#84817a,inset_-1px_0_#fffdf8] md:block"
      />

      {/* Task buttons */}
      <ul className="hidden min-w-0 flex-1 items-stretch gap-1 md:flex">
        {tasks.map((task) => (
          <li key={task.id} className="max-w-40 min-w-0 flex-1">
            <TaskLink
              href={task.href ?? `#${task.id}`}
              aria-current={task.current ? "page" : undefined}
              className={cn(
                "flex h-full items-center gap-1.5 px-2 focus-visible:outline-1 focus-visible:-outline-offset-4 focus-visible:outline-[#1b1a17] focus-visible:outline-dotted",
                task.current ? TASK_ACTIVE : cn(RETRO_BEVEL, RETRO_BEVEL_PRESSED),
              )}
            >
              {task.icon && (
                <Image src={task.icon} alt="" width={48} height={48} className="size-[18px] shrink-0" />
              )}
              <span className="truncate">{task.title}</span>
            </TaskLink>
          </li>
        ))}
      </ul>

      {/* Tray */}
      <div
        aria-hidden="true"
        className={cn("ml-auto flex shrink-0 items-center gap-2 px-2.5 sm:px-3", RETRO_WELL)}
      >
        <Volume2 className="size-4" strokeWidth={2} />
        <Clock />
      </div>
    </nav>
  );
}

/** In-page anchors stay plain <a> (Lenis smooth-scrolls them); page
 * links go through next/link for client navigation. */
function TaskLink({ href, ...props }: React.ComponentProps<"a"> & { href: string }) {
  return href.startsWith("#") ? <a href={href} {...props} /> : <Link href={href} {...props} />;
}

/** "3:07 PM", ticking each 15 s; empty on the server and first paint. */
function Clock() {
  const time = useSyncExternalStore(
    (onChange) => {
      const id = window.setInterval(onChange, 15_000);
      return () => window.clearInterval(id);
    },
    () => new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    () => "",
  );
  return <span className="min-w-[3.6em] text-right">{time}</span>;
}
