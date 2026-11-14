/**
 * Project write-ups shared by the company pitch pages (/pinterest,
 * /duolingo). Every claim comes from the case studies
 * (src/data/case-studies, src/app/projects/nudge); nothing is invented.
 * Each page picks its own projects and order with `pitchWork[slug]`.
 */

export type Shot = { src: string; alt: string; label: string; caption: string; width: number; height: number; position?: string };

export type Highlight = {
  kicker: string;
  title: string;
  /** Before → after screens. `phone` lays them out as two tall frames. */
  shots?: { before: Shot; after: Shot; phone?: boolean };
  /** Before → after text (used where the change was the problem itself). */
  statements?: { before: { label: string; text: string }; after: { label: string; text: string } };
  /** Short design rules, shown as chips above the rows. */
  principles?: string[];
  rowsLabel: string;
  rows: { heard: string; changed: string }[];
};

export type WorkEntry = {
  slug: string;
  year: string;
  /** Short label for the index, e.g. "Live product". */
  type: string;
  /** The one result a recruiter should leave with. */
  result: string;
  headline: string;
  summary: string;
  facts: { label: string; value: string }[];
  did: string[];
  metrics: { value: string; label: string }[];
  highlight: Highlight;
  liveUrl?: string;
};

export const pitchWork: Record<string, WorkEntry> = Object.fromEntries(
  ([
  {
    slug: "mymuseum",
    year: "2026",
    type: "Live product",
    result: "4 of 4 test findings shipped",
    headline: "Turning online art portfolios into galleries you can walk through.",
    summary:
      "Artists share their work as flat grids that lose its scale and order. After interviewing 5 artists, I designed and built a live platform that turns their uploads into a walkable 3D museum they can share by link.",
    facts: [
      { label: "Role", value: "Solo designer & developer" },
      { label: "Format", value: "Live web product" },
    ],
    did: ["User interviews", "Usability testing", "Interaction design", "3D web", "Next.js", "React Three Fiber"],
    metrics: [
      { value: "5", label: "artist interviews" },
      { value: "5", label: "usability participants" },
      { value: "4 / 4", label: "findings shipped as changes" },
    ],
    highlight: {
      kicker: "What testing changed",
      title: "Five testers, four problems, four shipped fixes.",
      shots: {
        before: {
          src: "/images/projects/mymuseum/history/aug-one-room.jpg",
          alt: "An early MyMuseum room: a visitor's humanoid avatar alone in one large, dark room.",
          label: "Before",
          caption: "One big room for every collection",
          width: 2940,
          height: 1520,
        },
        after: {
          src: "/images/projects/mymuseum/final/grid-view.png",
          alt: "MyMuseum's Grid View: a museum's full collection as cards with thumbnails, titles, and View artwork links, with an Enter 3D Gallery button.",
          label: "After",
          caption: "Grid View, so no piece is 3D-only",
          width: 2940,
          height: 1592,
          position: "object-left-top",
        },
      },
      rowsLabel: "What testers said → what shipped",
      rows: [
        { heard: "“A huge room was given for only 5 pieces of art.”", changed: "Rooms that size themselves to the collection" },
        { heard: "Walking through a room, visitors “would end up missing some.”", changed: "A Grid View of the whole collection" },
        { heard: "The avatars felt basic, with no theme of their own.", changed: "Simple shape avatars you can customize" },
        { heard: "Testers wanted to comment on a piece privately.", changed: "Museum Mail: private messages to the artist" },
      ],
    },
    liveUrl: "https://mymuseum-eta.vercel.app/",
  },
  {
    slug: "coursepilot",
    year: "2026",
    type: "AI product · Figma prototype",
    result: "Tested with 5 students",
    headline: "Turning scattered Canvas information into answers students can act on.",
    summary:
      "Students miss announcements and struggle to decide what to do first. From 5 student interviews, I designed an AI planning assistant inside Canvas that turns scattered course information into plans students can check and change.",
    facts: [
      { label: "Role", value: "Solo product designer" },
      { label: "Format", value: "Figma prototype" },
    ],
    did: ["User interviews", "Usability testing", "AI interaction design", "Figma prototyping"],
    metrics: [
      { value: "5", label: "student interviews" },
      { value: "5", label: "usability sessions" },
      { value: "5", label: "issues found to redesign next" },
    ],
    highlight: {
      kicker: "Designing the AI",
      title: "From a chat paragraph to a plan you can check.",
      shots: {
        before: {
          src: "/images/projects/coursepilot/iteration/plan-my-night-early.png",
          alt: "Early CoursePilot answer to 'I have 3 hours tonight. What should I work on?': a plain paragraph listing a schedule as text.",
          label: "Early",
          caption: "A chat-style paragraph, hard to scan",
          width: 990,
          height: 750,
        },
        after: {
          src: "/images/projects/coursepilot/iteration/plan-my-night-final.png",
          alt: "Final CoursePilot answer: ranked tasks with due dates, time estimates and 'Why this?' links, a 3-hour plan, Add to My Calendar and Adjust Plan buttons, and source links.",
          label: "Final",
          caption: "Ranked tasks, a plan, sources, and controls",
          width: 990,
          height: 750,
        },
      },
      principles: ["Sources on every answer", "“Why this?” on every task", "Nothing changes until you approve"],
      rowsLabel: "What testing showed → what I'm changing next",
      rows: [
        { heard: "P1: “Wait, why is this assignment first?”", changed: "Show the deciding factor on the task itself, not behind a click" },
        { heard: "P4 found the source, but: “I'd still want to know if it's missing anything.”", changed: "Show each grade calculation's assumptions and missing inputs" },
      ],
    },
  },
  {
    slug: "vietnamese-noodle-house",
    year: "2026",
    type: "Shipped client site",
    result: "Wrong-location orders ~8 → ~1 a month",
    headline: "Helping a family restaurant's customers order from the right location.",
    summary:
      "A family restaurant with two locations and a food truck kept getting orders at the wrong one. I audited the old site, then redesigned and built a new one that works inside the restaurant's existing ordering platforms.",
    facts: [
      { label: "Role", value: "Solo designer & developer" },
      { label: "Worked with", value: "The restaurant's owners" },
    ],
    did: ["UX audit", "Information architecture", "Responsive design", "Next.js", "Client work"],
    metrics: [
      { value: "~8 → ~1", label: "wrong-location orders a month, per the owners" },
      { value: "~50", label: "menu items, moved out of an 11-page PDF" },
    ],
    highlight: {
      kicker: "Working with the owners",
      title: "One extra tap, on purpose.",
      shots: {
        phone: true,
        before: {
          src: "/images/projects/vnh/before/old-site-mobile.png",
          alt: "The old site on a phone: a gray banner and one separate ordering button per location.",
          label: "Before",
          caption: "One ordering button per location",
          width: 1226,
          height: 2340,
          position: "object-top",
        },
        after: {
          src: "/images/projects/vnh/locations/mobile-bottom-sheet.png",
          alt: "The new site on a phone: after choosing Camillus, a sheet slides up saying 'You're ordering from Camillus' with Continue to order and Change location.",
          label: "After",
          caption: "Pick a location, then confirm it",
          width: 780,
          height: 1688,
          position: "object-bottom",
        },
      },
      rowsLabel: "What I heard and found → what shipped",
      rows: [
        { heard: "The owners: customers kept ordering from the wrong location.", changed: "A select-then-confirm step before checkout" },
        { heard: "The menu was an 11-page PDF.", changed: "One responsive menu page with a sticky category nav" },
        { heard: "The contact form said “Message sent!” but never sent anything.", changed: "A form that actually reaches the owners" },
      ],
    },
    liveUrl: "https://vietnoodlehouse.com/",
  },
  {
    slug: "nudge",
    year: "2026",
    type: "Team project",
    result: "My interviews reframed the problem",
    headline: "Helping first-time study abroad students get their travel-health prep done on time.",
    summary:
      "For the Business+Tech Innovation Jam, my team set out to help travelers find the vaccines and health steps they need. I ran our customer interviews, designed the app screens in Figma, and designed our pitch deck.",
    facts: [
      { label: "Role", value: "UX/UI designer" },
      { label: "Team", value: "PM, 2 designers, developer" },
    ],
    did: ["Customer interviews", "Personas", "Figma", "Pitch deck design"],
    metrics: [
      { value: "5", label: "customer interviews I ran" },
      { value: "7 → 3", label: "user needs cut down to MVP features" },
    ],
    highlight: {
      kicker: "What my interviews changed for the team",
      title: "Information wasn't the problem. Urgency was.",
      statements: {
        before: {
          label: "Week 1 · Before interviews",
          text: "Travelers can't tell which health advice applies to them, because it's scattered and not personalized.",
        },
        after: {
          label: "Week 2 · After interviews",
          text: "First-time study abroad students keep putting prep off: there's no clear deadline, their records are with their parents, and trusted sources feel too technical.",
        },
      },
      rowsLabel: "What students said → what the team changed",
      rows: [
        { heard: "Students had the information, but nothing pushed them to act.", changed: "A planner built around one small step a day" },
        { heard: "Students and parents trust the university most.", changed: "Our employer persona became a study abroad coordinator" },
      ],
    },
  },
] satisfies WorkEntry[]).map((e) => [e.slug, e]),
);

/** Index row with no section of its own (no case study yet). */
export const evolve = { year: "2025", title: "Evolve Salon & Spa", type: "Launched client site", result: "Fewer “what do you offer?” calls" };

