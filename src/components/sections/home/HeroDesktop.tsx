"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  DESTINATION_COLORS,
  type HeroDestination,
} from "@/components/sections/home/hero-destinations";
import { RETRO_BEVEL, RETRO_BEVEL_PRESSED } from "@/components/sections/home/retro-styles";
import { cn } from "@/lib/utils";

export type WindowStatus = "open" | "minimized" | "closed";

interface HiddenWindow {
  id: string;
  title: string;
  destination: HeroDestination;
  status: Exclude<WindowStatus, "open">;
}

/** Where a reopening window should zoom out from (its taskbar button, or
 * the monitor's screen for a closed window), and whether it should take
 * keyboard focus when it arrives. */
interface OpenFrom {
  rect: DOMRect;
  fromScreen: boolean;
  focus: boolean;
}

interface DesktopContextValue {
  statusOf: (id: string) => WindowStatus;
  zIndexOf: (id: string) => number;
  /** Bring a window to the front of the stack. */
  focusWindow: (id: string) => void;
  hide: (window: HiddenWindow, focusTaskbar: boolean) => void;
  /** Read (once) where a window is reopening from. */
  takeOpenFrom: (id: string) => OpenFrom | undefined;
  stageRef: React.RefObject<HTMLDivElement | null>;
  taskbarRef: React.RefObject<HTMLDivElement | null>;
  /** True on desktop-sized screens with a fine pointer (mouse/trackpad). */
  canDrag: boolean;
}

const DesktopContext = createContext<DesktopContextValue | null>(null);

/** The hero monitor's screen, which closed windows disappear into. */
export function monitorScreen(stage: HTMLElement | null) {
  return stage?.querySelector<HTMLElement>("[data-monitor-screen]") ?? null;
}

export function useHeroDesktop() {
  return useContext(DesktopContext);
}

/**
 * The hero's stage as a little Windows 98 desktop: tracks which windows
 * are open, minimized or closed, their stacking order, and renders the
 * taskbar that holds minimized and closed windows so they can be reopened.
 * Closed windows vanish into the monitor's screen and come back out of it.
 * The windows themselves are HeroWindow.tsx.
 */
export function HeroDesktop({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const taskbarRef = useRef<HTMLDivElement>(null);
  const openFrom = useRef<Record<string, OpenFrom>>({});
  const [hidden, setHidden] = useState<HiddenWindow[]>([]);
  const [order, setOrder] = useState<string[]>([]);
  const chipToFocus = useRef<string | null>(null);
  const [canDrag, setCanDrag] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 640px) and (pointer: fine)");
    const update = () => setCanDrag(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Move focus to a window's taskbar button once it has been rendered.
  useEffect(() => {
    if (!chipToFocus.current) return;
    taskbarRef.current
      ?.querySelector<HTMLButtonElement>(`[data-chip="${chipToFocus.current}"]`)
      ?.focus();
    chipToFocus.current = null;
  }, [hidden]);

  const focusWindow = useCallback((id: string) => {
    setOrder((prev) =>
      prev[prev.length - 1] === id ? prev : [...prev.filter((w) => w !== id), id],
    );
  }, []);

  const hide = useCallback((window: HiddenWindow, focusTaskbar: boolean) => {
    setHidden((prev) => [...prev.filter((w) => w.id !== window.id), window]);
    if (focusTaskbar) chipToFocus.current = window.id;
  }, []);

  const restore = useCallback(
    (id: string, chip: HTMLButtonElement, wasClosed: boolean) => {
      const screen = wasClosed ? monitorScreen(stageRef.current) : null;
      openFrom.current[id] = {
        rect: (screen ?? chip).getBoundingClientRect(),
        fromScreen: !!screen,
        focus: document.activeElement === chip,
      };
      setHidden((prev) => prev.filter((w) => w.id !== id));
      focusWindow(id);
    },
    [focusWindow],
  );

  const value = useMemo<DesktopContextValue>(
    () => ({
      statusOf: (id) => hidden.find((w) => w.id === id)?.status ?? "open",
      zIndexOf: (id) => 10 + Math.max(0, order.indexOf(id)),
      focusWindow,
      hide,
      takeOpenFrom: (id) => {
        const from = openFrom.current[id];
        delete openFrom.current[id];
        return from;
      },
      stageRef,
      taskbarRef,
      canDrag,
    }),
    [hidden, order, focusWindow, hide, canDrag],
  );

  return (
    <DesktopContext.Provider value={value}>
      <div ref={stageRef} className={className}>
        {children}

        {/* Taskbar: minimized and closed windows wait here. Always
            rendered (empty when every window is open) so a minimizing
            window knows where to fly to. */}
        <div
          ref={taskbarRef}
          role="toolbar"
          aria-label="Hidden windows"
          className="absolute top-full left-1/2 z-30 mt-12 flex -translate-x-1/2 gap-1 sm:top-[93%] sm:left-0 sm:mt-0 sm:translate-x-0"
        >
          {hidden.map((w) => (
            <button
              key={w.id}
              type="button"
              data-chip={w.id}
              onClick={(e) => restore(w.id, e.currentTarget, w.status === "closed")}
              aria-label={`${w.status === "closed" ? "Reopen" : "Restore"} ${w.title} window`}
              className={cn(
                "hero-taskbar-chip group/chip keep-light flex h-7 min-w-28 items-center gap-1.5 px-2 font-sans text-[11px] text-foreground transition-[filter] duration-100 select-none hover:brightness-[1.05] focus-visible:outline-1 focus-visible:-outline-offset-4 focus-visible:outline-dotted focus-visible:outline-foreground",
                RETRO_BEVEL,
                RETRO_BEVEL_PRESSED,
              )}
            >
              <span
                aria-hidden="true"
                className="size-3 shrink-0 shadow-[inset_-1px_-1px_rgba(0,0,0,0.35),inset_1px_1px_rgba(255,255,255,0.5)] group-active/chip:translate-px"
                style={{ backgroundColor: DESTINATION_COLORS[w.destination].deep }}
              />
              <span className="truncate group-active/chip:translate-px">{w.title}</span>
            </button>
          ))}
        </div>
      </div>
    </DesktopContext.Provider>
  );
}
