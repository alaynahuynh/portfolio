import type { CaseStudyData } from "@/types/case-study";

/**
 * Paste your Figma prototype's share link here once you have it. While
 * it's empty the "Explore Prototype" CTA doesn't render at all — never a
 * dead "#" link or a guessed URL.
 */
const FIGMA_PROTOTYPE_URL =
  "https://www.figma.com/proto/c5uDoRYFrhstqHvJTzUVbq/Untitled?node-id=226-14336&page-id=174%3A3539&starting-point-node-id=226%3A14336&t=RNFbRCqgp1YYD79c-1";

/**
 * CoursePilot — the one project with a real source document (the
 * Canvas AI Companion Project Brief) plus 5 real student interviews.
 * Research, findings, key insights, product requirements, and the HMW
 * below are all drawn from that real material — nothing invented. High-
 * fidelity design and a clickable Figma prototype are done, plus five
 * real usability sessions (`testing`). Their findings haven't been
 * designed into the prototype yet, so they're framed as what I'd change.
 */
export const coursePilot: CaseStudyData = {
  slug: "coursepilot",

  // CoursePilot's case-study accent — brown (earth). The homepage
  // spread's full-bleed background is now olive (`--color-olive`,
  // see projects.ts), but olive doesn't have enough contrast to use as
  // small text/border color on cream, so earth stays the accessible
  // accent used throughout this page (see CoursePilotCaseStudy's
  // `--project-accent` wiring).
  accentColor: "var(--color-earth)",

  hero: {
    category: "Product Design · UX Research · Interaction Design",
    title: "CoursePilot",
    tagline: "Turning scattered Canvas information into answers students can act on.",
    description:
      "I designed an AI assistant inside Canvas that helps students find course information, prioritize work, and build realistic study plans.",
    statusLabel: "Interactive prototype",
    ctaLabel: "Explore Prototype",
    ctaHref: FIGMA_PROTOTYPE_URL,
    platform: "Canvas-integrated desktop experience",
    tools: ["Figma"],
    disclosure:
      "Conceptual Canvas integration, designed as a Figma prototype. Not an official Canvas or university product.",
  },

  overview: {
    year: "2026",
    duration: "Ongoing",
    role: "Solo Product Designer",
    // No feature list here — the Final Experience section walks through
    // the same examples with the real screens.
    features: [],
  },

  background: {
    heading: "The information was all in Canvas. Students just couldn't find it fast enough to use it.",
    narrative:
      "Assignments, announcements, grades, syllabi, files, and deadlines are all in Canvas, but they're spread across different pages, and each professor organizes them a little differently. Nothing ties that information to what a student should do next.",
    placeholder: false,
  },

  research: {
    intro:
      "All five use Canvas regularly. We covered how they track coursework, decide what to work on first, find course information, and feel about using AI for academic planning.",
    participants: "5 college students who currently use Canvas",

    // Real SWOT/participant data now lives in `landscape` + `findings`
    // below; this stays empty only to satisfy the shared shape.
    swot: { strengths: [], weaknesses: [], opportunities: [], threats: [] },
    swotPlaceholder: true,

    landscape: {
      heading: "Students already have tools for pieces of the problem",
      intro:
        "I compared the tools students already use to understand where CoursePilot could add value rather than duplicate existing workflows.",
      columns: ["Canvas", "ChatGPT", "Motion", "CoursePilot"],
      rows: [
        {
          capability: "Course context",
          values: ["Native", "Requires supplied context", "Limited", "Native"],
        },
        {
          capability: "Natural-language help",
          values: ["Partial", "Strong", "Limited", "Strong"],
        },
        {
          capability: "Coursework prioritization",
          values: ["Limited", "Requires supplied context", "Task-based", "Course-aware"],
        },
        {
          capability: "Actionable planning",
          values: ["Limited", "Manual", "Strong", "Course-aware"],
        },
        {
          capability: "Verification",
          values: ["Original course content", "Depends on supplied context/source", "Not core", "Built into responses"],
        },
      ],
      gap: {
        eyebrow: "THE GAP",
        heading:
          "Course context, conversation, and planning rarely live in the same student workflow.",
        body:
          "That led me to focus CoursePilot on interpreting information already in Canvas and turning it into decisions students could verify and act on.",
      },
    },

    keyFindings: [
      {
        title: "Important information gets missed",
        whatParticipantsSaid:
          "Students relied heavily on the Canvas calendar, but announcements and other important updates often lived elsewhere.",
        whyItMatters:
          "Students are often unaware of important course updates because information is spread across different areas of Canvas.",
        designResponse:
          "A Catch Me Up feature combines new announcements and upcoming assignments into one weekly summary.",
      },
      {
        title: "Prioritization requires more than a due date",
        whatParticipantsSaid:
          "Students considered deadline, estimated effort, difficulty, and grade importance when deciding what to work on first.",
        whyItMatters: "Students do not simply complete assignments in chronological order.",
        designResponse:
          "Plan My Night builds a schedule around deadline and estimated effort rather than listing assignments chronologically.",
      },
      {
        title: "Students want answers, not more navigation",
        whatParticipantsSaid:
          "Students often knew what they needed to know but had to search across Assignments, Announcements, Modules, Syllabus, Inbox, and other Canvas pages.",
        whyItMatters: "Students spend unnecessary time searching for information instead of completing coursework.",
        designResponse:
          "Conversational questions return structured answers directly, with a link back to the original Canvas page.",
      },
      {
        title: "AI has to show its work",
        whatParticipantsSaid:
          "Students said inaccurate academic information would quickly erode their trust. They wanted to see where answers came from and why tasks were ranked (in a small expandable dropdown, not a paragraph), and to change priorities themselves.",
        whyItMatters: "An AI assistant is only useful if students believe the information is reliable.",
        designResponse:
          "Sources on every answer, a compact “Why this?” on each recommended task, and Adjust Plan to change a plan before acting on it.",
      },
    ],

    // The complete real research record — all 5 interviews' findings,
    // not just the 4 elevated above. Kept as the research foundation;
    // `keyFindings` is what actually renders on the page.
    findings: [
      {
        title: "Students rely on the Canvas calendar to stay organized",
        whatParticipantsSaid:
          "Most participants said the Canvas calendar is the first place they check when opening Canvas. Several also use Google Calendar as a backup because the Canvas calendar can occasionally be unreliable or glitch on mobile devices.",
        whyItMatters:
          "Students already organize their coursework around a calendar, so introducing another separate planning system would likely add unnecessary complexity.",
        designResponse:
          "Instead of replacing the calendar, the product builds on it by displaying today's priorities alongside upcoming assignments and deadlines.",
      },
      {
        title: "Students frequently miss announcements and important updates",
        whatParticipantsSaid:
          "Nearly everyone mentioned missing announcements because announcements do not appear alongside assignments on the calendar. Several participants also wished Canvas would notify them when assignments were approaching their due dates but had not yet been completed.",
        whyItMatters:
          "Students are often unaware of important course updates because information is spread across different areas of Canvas.",
        designResponse:
          "A Catch Me Up feature summarizes new announcements, unread course updates, assignments approaching their deadline, recently posted grades, and changes made by instructors.",
      },
      {
        title: "Canvas feels fragmented and difficult to navigate",
        whatParticipantsSaid:
          "Participants felt that important information is scattered across too many different pages — Inbox, Announcements, Modules, Assignments, People, Syllabus, and the Course Homepage. Several also mentioned that every professor organizes Canvas differently, making it difficult to quickly locate information.",
        whyItMatters: "Students spend unnecessary time searching for information instead of completing coursework.",
        designResponse:
          "Students can ask natural language questions like “Where is my syllabus?” or “What assignments are due this week?” — the AI answers directly and links back to the original Canvas page.",
      },
      {
        title: "Students prioritize work using multiple factors",
        whatParticipantsSaid:
          "Participants said they usually prioritize assignments based on due date, estimated time required, difficulty, and importance to their grade.",
        whyItMatters: "Students do not simply complete assignments in chronological order.",
        designResponse:
          "The AI prioritizes assignments using several factors instead of only due dates: deadline, estimated completion time, difficulty, grade impact, and student study habits.",
      },
      {
        title: "Students want fast answers to Canvas questions",
        whatParticipantsSaid:
          "Participants liked the idea of asking specific questions instead of searching through Canvas — things like “What grade do I need to pass this class?” or “What assignments am I missing?”",
        whyItMatters: "Students often know what information they need but struggle to find it quickly.",
        designResponse:
          "An Ask AI feature searches Canvas information and provides direct answers with links back to the original source.",
      },
      {
        title: "Trust is essential",
        whatParticipantsSaid:
          "Every participant said they would quickly lose trust in the AI if it gave inaccurate or inconsistent information. Because Canvas contains grades and deadlines, students expect a very high level of accuracy, and said they would trust the AI more if they could verify where information came from.",
        whyItMatters: "An AI assistant is only useful if students believe the information is reliable.",
        designResponse:
          "Every AI response includes a link to the original Canvas source, the last updated time, an explanation of where the information came from, and clear messaging when the AI is uncertain.",
      },
      {
        title: "Students want to understand AI recommendations",
        whatParticipantsSaid:
          "Participants wanted the AI to explain why it prioritized certain assignments — but preferred a small expandable dropdown over a large paragraph.",
        whyItMatters: "Students want transparency without cluttering the interface.",
        designResponse:
          "Every recommended task includes a “Why this?” dropdown covering due date, estimated study time, difficulty, grade importance, and personal study patterns. Students can also manually change priorities.",
      },
      {
        title: "Students care about privacy",
        whatParticipantsSaid:
          "Most participants were comfortable allowing AI to access Canvas information, but some were concerned about their submitted assignments or written responses being stored or shared.",
        whyItMatters: "Students want to know how their information is being used.",
        designResponse:
          "The product clearly explains what information AI can access, what is never stored, and how personal data is protected — and lets students control what the AI can use.",
      },
      {
        title: "Students want an ethical academic assistant",
        whatParticipantsSaid:
          "Participants agreed the AI should help students learn rather than complete coursework, and specifically mentioned it should refuse requests involving cheating, completing assignments, violence, self-harm, or gossip.",
        whyItMatters: "Students want the AI to support learning while maintaining academic integrity.",
        designResponse:
          "The AI can explain instructions, organize coursework, build study schedules, summarize announcements, and help students prepare to study — but refuses to complete graded assignments, generate quiz or exam answers, help students cheat, or respond to harmful requests.",
      },
    ],
    findingsPlaceholder: false,
  },

  keyInsights: [
    "Students organize nearly all of their coursework around the Canvas calendar.",
    "Important announcements and updates are frequently missed because they are separated from assignments.",
    "Canvas information feels fragmented across many different pages.",
    "Students prioritize work based on deadlines, workload, difficulty, and grade importance.",
    "Students want quick, personalized answers instead of manually searching Canvas.",
    "Trust and transparency are critical for AI adoption.",
    "Students want AI recommendations to be explainable and editable.",
    "Privacy controls and academic integrity should be built into the product from the beginning.",
  ],

  define: {
    hmw: "How might we help students quickly understand what changed, decide what to work on, and build a realistic study plan — without doing the work for them?",
  },

  researchToDesign: {
    rows: [
      {
        learned: "Important updates get missed",
        designed: "Catch Me Up combines assignments, announcements, and course changes.",
      },
      {
        learned: "Students prioritize using several factors",
        designed: "Planning responses consider deadline + estimated effort rather than only chronological order.",
      },
      {
        learned: "Students want direct answers",
        designed:
          "Conversational questions return structured responses instead of forcing students to search Canvas manually.",
      },
      {
        learned: "Students distrust unexplained AI",
        designed: "Sources, Why this?, Grades used, and View in syllabus.",
      },
      {
        learned: "Students want control",
        designed: "Adjust Plan lets students modify AI-generated recommendations before acting on them.",
      },
    ],
  },

  // The idea that used to live here as a standalone "opportunity"
  // section now opens `platformIntegration` below instead — one home
  // for "students didn't need another app," not two.

  aiBoundary:
    "Help with understanding and planning, never with completing graded work.",

  ideation: {
    whyThisTitle: "Why AI?",
    whyThis: [],
    whyThisPlaceholder: false,
    flowsIntro:
      "CoursePilot is a conversational AI assistant, not a fixed set of features — these three flows are just examples of the kinds of things a student can ask it to do.",
    flows: [
      {
        name: "Plan My Night",
        steps: [],
        image: {
          src: "/images/projects/coursepilot/flows/plan-my-night.png",
          alt: "Flowchart of the Plan My Night flow: opening CoursePilot, gathering upcoming tasks, generating a suggested plan, reviewing it, then either adding it to the student's plan or editing and regenerating it.",
          width: 1640,
          height: 3010,
        },
      },
      {
        name: "Catch Me Up",
        steps: [],
        image: {
          src: "/images/projects/coursepilot/flows/catch-me-up.png",
          alt: "Flowchart of the Catch Me Up flow: scanning recent course activity, gathering assignments, deadlines, and announcements, generating a weekly summary, then opening or marking items as reviewed.",
          width: 1640,
          height: 2984,
        },
      },
      {
        name: "Ask CoursePilot",
        steps: [],
        image: {
          src: "/images/projects/coursepilot/flows/ask-coursepilot.png",
          alt: "Flowchart of the Ask CoursePilot flow: entering a question, searching course materials, generating an AI response with sources, then refining the question if the answer wasn't helpful.",
          width: 1640,
          height: 3008,
        },
      },
    ],
    flowsPlaceholder: false,
  },

  productRequirements: [
    { need: "Know what to work on", requirement: "AI-powered priority dashboard" },
    { need: "Never miss announcements", requirement: "Catch Me Up summary" },
    { need: "Find information quickly", requirement: "Ask AI search" },
    { need: "Understand assignments", requirement: "AI assignment explanations" },
    { need: "Build a study schedule", requirement: "AI Study Planner" },
    { need: "Trust AI responses", requirement: "Source links & timestamps" },
    { need: "Understand recommendations", requirement: "“Why This?” dropdown" },
    { need: "Maintain privacy", requirement: "User-controlled permissions" },
    { need: "Support learning ethically", requirement: "Academic integrity safeguards" },
  ],

  designPrinciples: [
    "Give students immediate value without requiring them to type a prompt",
    "Keep students in control of AI recommendations",
    "Show the source behind every important AI response",
    "Clearly communicate uncertainty",
    "Avoid overwhelming users with too many suggestions",
    "Support learning rather than doing assignments",
    "Use accessible language and visual hierarchy",
  ],
  designPrinciplesDetailed: [
    {
      title: "Actionable over informational",
      description: "Help students decide what to do next rather than simply repeating Canvas data.",
    },
    {
      title: "AI remains controllable",
      description: "Recommendations can be reviewed, modified, or rejected before CoursePilot takes action.",
    },
    {
      title: "Important answers are verifiable",
      description: "Academic recommendations expose their source, inputs, or reasoning.",
    },
  ],

  platformIntegration: {
    heading: "Students already spend their time in Canvas, so CoursePilot lives there instead of in a separate app.",
    copy: "CoursePilot opens from the Canvas sidebar. A popup handles quick questions; anything that needs planning or follow-up expands into a full workspace.",
    flowSteps: ["Canvas Dashboard", "CoursePilot", "New Chat"],
    // Once exported: save the Canvas dashboard screenshot showing the
    // CoursePilot icon to /public/images/projects/coursepilot/canvas-entry.png
    // and set:
    // image: { src: "/images/projects/coursepilot/canvas-entry.png", alt: "Canvas dashboard with the CoursePilot icon in the navigation", width, height },
    regularDashboardImage: {
      src: "/images/projects/coursepilot/canvas-dashboard-regular.png",
      alt: "Regular Canvas dashboard, unmodified",
      width: 1446,
      height: 1024,
    },
    popupDashboardImage: {
      src: "/images/projects/coursepilot/canvas-dashboard-popup.png",
      alt: "Canvas dashboard with the CoursePilot popup open",
      width: 1446,
      height: 1024,
    },
  },

  brand: {
    heading: "A product identity that can live across campuses.",
    copy: "CoursePilot needed its own recognizable identity while still feeling compatible with the institution using Canvas. The core CoursePilot identity stays consistent while surrounding school branding can adapt.",
    logo: {
      src: "/images/projects/coursepilot/brand/logo.png",
      alt: "CoursePilot logo mark: a smiling face wearing a pilot cap, inside a circle, in the generic (non-institutional) black-and-white version",
      width: 1002,
      height: 1004,
    },
    adaptations: [
      {
        src: "/images/projects/coursepilot/brand/adaptation-syracuse.png",
        alt: "Conceptual CoursePilot logo adaptation in Syracuse University's orange and navy, with an “S” on the pilot cap",
        width: 1002,
        height: 1004,
        caption: "Syracuse University",
      },
      {
        src: "/images/projects/coursepilot/brand/adaptation-michigan.png",
        alt: "Conceptual CoursePilot logo adaptation in the University of Michigan's maize and navy, with an “M” on the pilot cap",
        width: 1002,
        height: 1004,
        caption: "University of Michigan",
      },
    ],
    disclaimer: "Institutional adaptations are conceptual and do not represent official university partnerships.",
  },

  earlyExploration: {
    heading: "Sketching the structure before the visuals.",
    copy: "Before any high-fidelity screens, I sketched how the dashboard, the AI popup, and daily summaries should feel as raw structure.",
    items: [
      {
        label: "Dashboard structure",
        image: {
          src: "/images/projects/coursepilot/exploration/sketch-dashboard.png",
          alt: "Early sketch of the Canvas dashboard: a course grid with a To Do column, before any CoursePilot entry point was added",
          width: 778,
          height: 554,
        },
      },
      {
        label: "CoursePilot popup entry",
        image: {
          src: "/images/projects/coursepilot/exploration/sketch-popup.png",
          alt: "Early sketch of the CoursePilot popup opening from the Canvas dashboard, with a “How can we help?” prompt and an “Ask anything” input",
          width: 777,
          height: 554,
        },
      },
      {
        label: "Welcome / ask CoursePilot",
        image: {
          src: "/images/projects/coursepilot/exploration/sketch-welcome.png",
          alt: "Early sketch of the full CoursePilot welcome screen: “Meet CoursePilot, your AI course assistant” above an “Ask CoursePilot” input",
          width: 778,
          height: 541,
        },
      },
      {
        label: "Daily summary concept",
        image: {
          src: "/images/projects/coursepilot/exploration/sketch-daily-summary.png",
          alt: "Early sketch of a Daily Summary response listing assignments due today, announcements, and upcoming exams as counts",
          width: 777,
          height: 541,
        },
      },
    ],
  },

  design: {
    heading: "From conversational answers to structured decisions",
    processNarrative:
      "Early concepts relied heavily on conversational responses. As the questions became more complex, schedules, grade calculations, and course updates became difficult to scan as plain text. I kept conversation as the input model, but shifted CoursePilot's responses toward structured interfaces designed around the task.",
    wireframeScreens: [],
    highFidelityScreens: [],
    placeholder: false,
    iterationStory: {
      problem:
        "Early CoursePilot concepts relied heavily on conversational, chat-style responses. As I designed more complex tasks like study planning, grade calculations, and weekly summaries, long text responses got hard to scan.",
      decision:
        "Students still ask in plain words, but the answer comes back as a schedule, a summary, or a breakdown instead of a paragraph.",
      pairs: [
        {
          task: "Plan My Night",
          beforeLabel: "Early — conversational response",
          afterLabel: "Final — structured schedule",
          before: {
            src: "/images/projects/coursepilot/iteration/plan-my-night-early.png",
            alt: "Early Plan My Night response: a plain conversational paragraph listing a suggested 3-hour schedule as text.",
            width: 990,
            height: 750,
          },
          after: {
            src: "/images/projects/coursepilot/iteration/plan-my-night-final.png",
            alt: "Final Plan My Night response: a structured card UI with top tasks, due dates, a suggested 3-hour plan, and source links.",
            width: 990,
            height: 750,
          },
        },
        {
          task: "Grade calculation",
          beforeLabel: "Early — conversational response",
          afterLabel: "Final — structured breakdown",
          before: {
            src: "/images/projects/coursepilot/iteration/grade-calc-early.png",
            alt: "Early grade calculation response: a plain conversational paragraph stating the required exam score and listing recent grades as text.",
            width: 990,
            height: 750,
          },
          after: {
            src: "/images/projects/coursepilot/iteration/grade-calc-final.png",
            alt: "Final grade calculation response: a structured card UI with the required exam score, current grade, exam weight, a grades-used table, and source links.",
            width: 990,
            height: 750,
          },
        },
      ],
      takeaway:
        "Each answer gets a layout that fits the task the student is trying to do.",
      comparisonLabels: {
        early: ["Harder to scan", "Reasoning buried", "Limited direct action"],
        final: ["Scannable hierarchy", "Visible reasoning + sources", "Editable/actionable output"],
      },
    },
    // Once exported, wire the real screens into `beforeAfter` below —
    // CoursePilotCaseStudy.tsx renders it automatically via the shared
    // CaseStudyBeforeAfter component instead of the labeled placeholders
    // that `iterationStory.pairs` produces today:
    // beforeAfter: [
    //   {
    //     before: { src: "/images/projects/coursepilot/iteration/plan-my-night-early.png", alt: "...", width, height },
    //     after: { src: "/images/projects/coursepilot/final/plan-my-night.png", alt: "...", width, height },
    //     beforeLabel: "Conversational", afterLabel: "Structured",
    //   },
    //   {
    //     before: { src: "/images/projects/coursepilot/iteration/grade-calc-early.png", alt: "...", width, height },
    //     after: { src: "/images/projects/coursepilot/final/exam-grade.png", alt: "...", width, height },
    //     beforeLabel: "Conversational", afterLabel: "Structured",
    //   },
    // ],
  },

  // Real task-based sessions with five students on the Figma prototype.
  // Each session focused on one or two features, so every finding below
  // comes from a single participant — quotes are verbatim from session
  // notes. Nothing has been redesigned from them yet, so the response
  // column says what I'd change, never what I changed.
  testing: {
    heading: "Five students, one prototype",
    intro:
      "I ran task-based usability sessions with five students on the Figma prototype, each focused on one or two features. Every participant saw value in it, and each session also turned up a different problem. Because each finding comes from one participant, I treat them as signals to design against, not patterns yet.",
    tasks: [
      "P1 · Junior, uses Canvas Calendar and a notes app · tested Catch Me Up, then Plan My Night",
      "P2 · Sophomore, often starts close to deadlines · tested Plan My Night",
      "P3 · First-year, relies on Canvas notifications · tested Catch Me Up",
      "P4 · Senior, checks syllabi before academic decisions · tested a grade question",
      "P5 · Junior, balancing clubs and coursework · tested Plan My Night",
    ],
    changedLabel: "What I'd change",
    iterations: [
      {
        title: "The task order didn't explain itself",
        feedback:
          "P1, looking at the generated plan: “Wait, why is this assignment first?” Then: “Unless there's a reason this one is more important, but I can't really tell from looking at it.”",
        finalIteration:
          "Each task already has a “Why this?” link, but the reason needs to be visible without clicking: show the deciding factor (due date or estimated effort) right on the task row.",
      },
      {
        title: "Time estimates read as fixed",
        feedback:
          "P2: “It says this assignment should take an hour and a half. I feel like it would take me way longer than that.” Asked what they'd do: “I don't really know how it would know how long I take to finish something.”",
        finalIteration:
          "Label estimates as approximate, say where they come from, and put the way to edit them (Adjust Plan) right next to the estimate.",
      },
      {
        title: "No way to say how much time you actually have",
        feedback:
          "P5 had a meeting that night: “Is there somewhere I can change how much time I have?” What they expected: “Like if I only have an hour, show me what I can realistically finish in that hour.”",
        finalIteration:
          "Adjust Plan changes time per task, not the total. Add a control for available time on the plan itself that regenerates a shorter plan without starting over.",
      },
      {
        title: "Announcements didn't say whether action was needed",
        feedback:
          "P3, reading the Catch Me Up summary: “I'm not sure if I'm supposed to do something for this announcement or if it's just telling us something. It mentions an assignment, but I can't tell if there's anything I need to submit.” Their fallback was opening Canvas to read the original.",
        finalIteration:
          "Mark each announcement as action needed or informational, and keep the direct link back to the original post.",
      },
      {
        title: "A source wasn't enough to trust a grade",
        feedback:
          "P4 found the source (“That's good”), but added: “I think I'd still want to know if it's missing anything, though. Like if participation isn't graded yet.” And: “I wouldn't make a decision about dropping a class or anything serious without checking it myself.”",
        finalIteration:
          "Show the calculation's assumptions and missing inputs, such as ungraded categories, next to the result, not just where the numbers came from.",
      },
    ],
    whatWorked: [
      {
        who: "P1, on Catch Me Up",
        quote: "Normally I'd have to click through each class to see if there's anything new, so this is easier.",
      },
      {
        who: "P2, on Plan My Night",
        quote: "It makes everything seem less overwhelming when it's broken down like that.",
      },
      {
        who: "P3, comparing it with checking each class",
        quote: "It's definitely faster.",
      },
      {
        who: "P5, on Plan My Night",
        quote: "I think I'd use it, especially when I have a lot going on.",
      },
    ],
    placeholder: false,
    validateNextHeading: "What I'd test next round",
    validateNext: [
      {
        title: "Prioritization",
        question: "With the deciding factor shown on each task, do students agree with the order?",
      },
      {
        title: "Control",
        question: "Can students find Adjust Plan and change their available time without help?",
      },
      {
        title: "Breadth",
        question: "Do these issues hold up across more students? Each finding here came from one session.",
      },
      {
        title: "Feasibility",
        question: "How should CoursePilot respond when Canvas information is incomplete, conflicting, or unavailable?",
      },
    ],
  },

  finalExperience: {
    subheading:
      "Three flows from the prototype, each shaped around what the student does next.",
    // The old per-feature gallery (one heading + paragraph + full
    // screenshot per screen) is replaced by the story below —
    // `architecture` / `heroMoment` / `secondaryMoments` / `synthesis`.
    features: [],

    // No `architecture` stills: "Where it lives" shows the same Canvas →
    // popup → workspace path as one click-through video instead.

    heroMoment: {
      heading: "A plan built around the time you have.",
      copy: "A student describes their evening; CoursePilot ranks what's due and lays out a schedule that fits.",
      prompt: "I have 3 hours tonight. What should I work on?",
      callouts: [
        { title: "Priority", description: "Ranked by due date and estimated effort." },
        { title: "Fits the time", description: "The schedule fills the hours the student says they have." },
        { title: "Why this?", description: "Each task can explain why it's ranked where it is." },
        { title: "Sources", description: "Every task links back to its Canvas assignment." },
      ],
      principle: "Nothing changes in a student's plan or calendar until they approve it.",
    },

    secondaryMoments: [
      {
        name: "Catch Me Up",
        heading: "Understand what changed without checking every course.",
        copy: "Assignments and announcements from every course in one summary. Nearly every student I interviewed mentioned missing announcements.",
        image: {
          src: "/images/projects/coursepilot/final/catch-me-up.png",
          alt: "Catch Me Up response to “Catch me up on this week”: 2 assignments due and 1 announcement, listed with due dates, estimated time, and the Canvas sources they came from.",
          width: 2000,
          height: 1422,
        },
        callouts: [
          { title: "Needs attention", description: "Surfaces the most time-sensitive coursework first." },
          { title: "Important updates", description: "Announcements sit apart from assignments, so they don't get buried." },
        ],
        size: "large",
      },
      {
        name: "Sourced Q&A",
        heading: "Answers you can check.",
        copy: "AI can be wrong, so important answers show where they came from. A short answer comes with the original wording and where it came from.",
        steps: ["“What's the late work policy?”", "Concise answer", "Source", "View in syllabus"],
        image: {
          src: "/images/projects/coursepilot/final/syllabus-answer.png",
          alt: "Answer to “What is the late assignment policy for Art History?”: a short summary, the quoted Late Work Policy from the syllabus, its source path, and a View in syllabus link.",
          width: 2000,
          height: 1422,
        },
        // The trust features across all three flows, listed once here.
        callouts: [
          { title: "View in syllabus", description: "One click to the policy as the professor wrote it." },
          { title: "Grades used", description: "Grade calculations list every score behind the number." },
          { title: "Sources everywhere", description: "Plans, summaries, and answers all name the Canvas pages they used." },
        ],
        size: "large",
      },
    ],

    // No standalone `trust` block: the trust features are covered once,
    // in the Sourced Q&A moment's callouts.
    interactionDesign: {
      heading: "Acting without losing context",
      copy: "Actions such as adjusting a recommendation or adding a calendar event happen in lightweight overlays so students can make changes without losing the original conversation.",
      images: [
        {
          src: "/images/projects/coursepilot/final/adjust-plan.png",
          alt: "Adjust your plan overlay: each task with minus and plus time controls, an Anything else CoursePilot should consider? field, a 2 hr 35 planned, 25 min remaining summary, and Cancel and Update Plan buttons.",
          width: 704,
          height: 576,
          caption: "Adjust Plan: students change the time per task before anything is saved.",
        },
        {
          src: "/images/projects/coursepilot/final/add-to-calendar.png",
          alt: "Add plan to calendar overlay listing the three time blocks for Friday, May 16, a calendar picker with Canvas Calendar and Google Calendar, and Cancel and Add Plan buttons.",
          width: 704,
          height: 648,
          caption: "Add to Calendar: students review the exact events before they're added.",
        },
      ],
    },
  },

  // No results section: the testing findings above haven't been designed
  // into the prototype yet, so there are no outcomes to report.

  finalThoughts: {
    whatILearned:
      "The hard part was deciding when AI should summarize, when it should recommend, when students needed control, and when an answer needed evidence. Testing showed I'd underestimated the last one: students wanted the reasoning visible, not one click away.",
    nextSteps:
      "Design the five changes from testing (visible reasons, approximate estimates, available time, action-needed announcements, and stated assumptions) and test them with new students before adding any new AI features.",
    placeholder: false,
  },

  // Recruiter-facing scope summary — what exists as a Figma prototype vs.
  // what research called for but hasn't been designed vs. what hasn't
  // started. Keep in sync with the screens actually shown on the page.
  projectStatus: [
    {
      label: "Prototyped in Figma",
      items: [
        "Canvas entry point, popup, and full workspace",
        "Plan My Night, with Adjust Plan and Add to Calendar",
        "Catch Me Up",
        "Sourced syllabus answers",
        "Grade calculation",
      ],
    },
    {
      label: "Researched, not yet designed",
      items: [
        "Uncertainty and error states",
        "Privacy and data-access controls",
        "Academic-integrity refusals",
      ],
    },
    {
      label: "Not yet done",
      items: ["Redesign from testing findings", "Canvas API feasibility review", "Engineering (this is a design prototype, not built software)"],
    },
  ],

  whatIsComplete: [
    { label: "Research plan", done: true },
    { label: "Student interviews", done: true },
    { label: "Key findings", done: true },
    { label: "Product requirements", done: true },
    { label: "User flows", done: true },
    { label: "Information architecture", done: true },
    { label: "Low-fidelity wireframes", done: true },
    { label: "Visual direction", done: true },
    { label: "High-fidelity screens", done: true },
    { label: "Clickable prototype", done: true },
    { label: "Usability testing", done: true },
    { label: "Iterations after testing", done: false },
  ],
};
