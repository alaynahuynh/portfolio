"use client";

import { useEffect, useState } from "react";
import { RetroTaskbar, type TaskbarTask } from "@/components/sections/home/RetroTaskbar";
import { cn } from "@/lib/utils";

/**
 * The Selected Works taskbar at the end of a case study. It stays tucked
 * below the screen's edge while the case study is being read, then rises
 * from the bottom of the screen once the end of the case study
 * (#case-study-end, see CaseStudyEnd) scrolls into view, the
 * same way the homepage's taskbar rises up over the hero. It settles into
 * its own place above the footer, and tucks away again if the reader
 * scrolls back up into the case study.
 *
 * Sticky to the bottom of its parent (the whole page; see
 * CaseStudyEnd, which renders it as a sibling rather than inside a short
 * wrapper), so it can rise at the screen's bottom edge before
 * reaching its place in flow, and stops there instead of covering the
 * footer.
 */
export function CaseStudyTaskbar({ tasks }: { tasks: TaskbarTask[] }) {
  const [raised, setRaised] = useState(false);

  useEffect(() => {
    const end = document.getElementById("case-study-end");
    if (!end) return;
    const observer = new IntersectionObserver(([entry]) => {
      // Raised once the end is on screen or scrolled past; tucked away
      // while it's still below the screen.
      setRaised(entry.isIntersecting || entry.boundingClientRect.top < 0);
    });
    observer.observe(end);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "sticky bottom-0 z-30 transition-transform duration-300 ease-out motion-reduce:transition-none",
        raised ? "translate-y-0" : "translate-y-[calc(100%+12px)]",
      )}
    >
      <RetroTaskbar tasks={tasks} startHref="/#work" label="All case studies" />
    </div>
  );
}
