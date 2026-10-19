"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Paperclip, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { resumeUrl } from "@/lib/resume";
import { siteConfig, socialLinks } from "@/lib/site-config";
import {
  HeroRetroWindow,
  RETRO_BEVEL,
  RETRO_WELL,
} from "@/components/sections/home/HeroRetroWindow";

const linkedIn = socialLinks.find((link) => link.label === "LinkedIn");

const BUTTON =
  "inline-flex items-center gap-1.5 px-3 py-1 font-sans text-xs text-foreground transition-[filter] hover:brightness-105 active:shadow-[inset_1px_1px_#5c574b] focus-visible:outline-2 focus-visible:outline-mauve-deep";

/**
 * The About page's contact block, framed as a little retro mail window to
 * match the photo browser above it. The message box is real: Send opens
 * the visitor's mail app with the subject and whatever they typed
 * prefilled. Copy is there for anyone without a mail app set up.
 */
export function AboutContactWindow() {
  const [subject, setSubject] = useState("Hi Alayna!");
  const [body, setBody] = useState("");
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(copiedTimer.current), []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  const mailto = `mailto:${siteConfig.email}?${new URLSearchParams({ subject, body })
    .toString()
    .replace(/\+/g, "%20")}`;

  return (
    // Sage title bar, so it reads as its own window next to the mauve
    // photo browser.
    <HeroRetroWindow
      title="New Message"
      menu={["File", "Edit", "Insert"]}
      destination="playground"
      className="bg-[#e3dccb] shadow-[0_2px_10px_rgba(46,50,42,0.08)]"
    >
      <div className="flex flex-wrap gap-1 px-1 pb-1.5">
        <a href={mailto} className={cn(BUTTON, RETRO_BEVEL, "bg-[#f3ead6] font-semibold")}>
          <Send aria-hidden="true" className="size-3.5" />
          Send
        </a>
        {resumeUrl && (
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className={cn(BUTTON, RETRO_BEVEL)}>
            <Paperclip aria-hidden="true" className="size-3.5" />
            Resume.pdf
          </a>
        )}
        {linkedIn && (
          <a href={linkedIn.href} target="_blank" rel="noopener noreferrer" className={cn(BUTTON, RETRO_BEVEL)}>
            LinkedIn
          </a>
        )}
      </div>

      <div className="grid grid-cols-[3.75rem_1fr] items-center gap-x-2 gap-y-1 px-1 pb-1.5 font-sans text-xs text-foreground">
        <span>To:</span>
        <div className="flex min-w-0 items-center gap-1">
          <span className={cn("min-w-0 flex-1 truncate bg-white px-1.5 py-1", RETRO_WELL)}>{siteConfig.email}</span>
          <button
            type="button"
            onClick={copyEmail}
            className={cn(BUTTON, RETRO_BEVEL, "px-2")}
            aria-label={copied ? "Email copied" : "Copy email address"}
          >
            {copied ? <Check aria-hidden="true" className="size-3.5" /> : <Copy aria-hidden="true" className="size-3.5" />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
        <label htmlFor="contact-subject">Subject:</label>
        <input
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={cn("min-w-0 bg-white px-1.5 py-1 outline-none focus-visible:outline-2 focus-visible:outline-sage-deep", RETRO_WELL)}
        />
      </div>

      <label htmlFor="contact-body" className="sr-only">
        Message
      </label>
      <textarea
        id="contact-body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={5}
        placeholder="Tell me about a role, a project, or just say hi…"
        className={cn(
          "block w-full resize-none bg-white p-2 font-alayna-handwriting text-xl leading-snug text-foreground outline-none placeholder:text-foreground/40 focus-visible:outline-2 focus-visible:outline-sage-deep",
          RETRO_WELL,
        )}
      />
      <p aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </p>
    </HeroRetroWindow>
  );
}
