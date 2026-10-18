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
 * fidelity design and a clickable Figma prototype are done; usability
 * testing has not happened yet, so there is no results section and
 * `testing.validateNext` is framed as open questions, never findings.
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
    disclosure:
      "Conceptual Canvas integration — designed as a Figma prototype, not an official Canvas or university product.",
  },

  overview: {
    year: "2026",
    duration: "Ongoing",
    role: "Solo Product Designer",
    featuresHeading: "What students can ask CoursePilot",
    featuresIntro:
      "CoursePilot is built to answer open-ended questions about coursework, not to run through a fixed menu of features. These are examples from the Figma prototype — not the full range of what it can handle.",
    features: [
      {
        name: "“Help me plan my night”",
        description: "Prioritizes work around the time a student actually has.",
      },
      {
        name: "“What did I miss this week?”",
        description: "Summarizes assignments, announcements, and course changes.",
      },
      {
        name: "“What do I need on my final to pass?”",
        description: "Calculates the target and exposes the inputs behind it.",
      },
      {
        name: "“What’s the late work policy?”",
        description: "Answers from the syllabus and links back to the original source.",
      },
    ],
  },

  background: {
    heading: "Students had the information. Finding and acting on it was the problem.",
    narrative:
      "Assignments, announcements, grades, syllabi, files, and deadlines are all in Canvas — just spread across different pages, each organized a little differently by each professor. Students weren't missing information because it didn't exist; they were missing it because nothing connected it to what to do next. CoursePilot's goal: help students understand what changed, decide what to work on, and build a realistic study plan — without doing the work for them.",
    placeholder: false,
  },

  research: {
    intro:
      "I interviewed five college students who regularly use Canvas to understand how they track coursework, decide what to prioritize, find course information, and think about using AI for academic planning.",
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
        title: "AI needs to be verifiable",
        whatParticipantsSaid:
          "Students said inaccurate academic information would quickly erode trust and wanted to see where AI-generated answers came from.",
        whyItMatters: "An AI assistant is only useful if students believe the information is reliable.",
        designResponse:
          "Recommendations and answers expose their source, inputs, or reasoning — “Why this?”, Grades used, Sources, View in syllabus.",
      },
      {
        title: "Explanations should be small, and plans editable",
        whatParticipantsSaid:
          "Students wanted to know why the AI prioritized certain assignments — but preferred a small expandable dropdown over a large paragraph, and wanted to change priorities themselves.",
        whyItMatters: "Students want transparency without cluttering the interface.",
        designResponse:
          "A compact “Why this?” link on each recommended task, and Adjust Plan to change the plan before acting on it.",
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
    "Assist with understanding and planning — not completing graded work.",

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
    heading: "Students didn’t need another productivity app. They needed help inside the tool they already use.",
    copy: "Rather than introducing another standalone student app, CoursePilot is designed as a conceptual AI layer inside Canvas — students reach it from the navigation they already use, not a separate destination.",
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
    heading: "Exploring the experience before polishing the interface.",
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
        "Early CoursePilot concepts relied heavily on conversational, chat-style responses. As I designed more complex tasks — study planning, grade calculations, weekly summaries — long text responses became difficult to scan.",
      decision:
        "Conversation stayed the input. The response became structured UI, designed around the task.",
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
        "The shift wasn’t from chat to dashboard. It was from generic AI output to task-specific interfaces.",
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

  testing: {
    heading: "What I'd validate next",
    intro:
      "I haven't run usability testing on CoursePilot yet. These are the specific questions I'd want to answer first, not conclusions from testing that's already happened.",
    tasks: [
      "Find the most urgent assignment.",
      "Create a two-hour study plan.",
      "Check why the AI prioritized a certain task.",
      "Verify where an AI summary came from.",
      "Change the order of a generated study plan.",
      "Find announcements missed during the past three days.",
      "Ask the AI to explain an assignment.",
      "Respond when the AI shows uncertain information.",
    ],
    iterations: [],
    placeholder: true,
    validateNext: [
      {
        title: "Prioritization",
        question: "Do students agree with the order CoursePilot recommends?",
      },
      {
        title: "Trust",
        question: "Do sources and explanations meaningfully increase confidence?",
      },
      {
        title: "Control",
        question: "Do students understand how to modify AI-generated recommendations?",
      },
      {
        title: "Feasibility",
        question: "How should CoursePilot respond when Canvas information is incomplete, conflicting, or unavailable?",
      },
    ],
    closingStatement:
      "A next-stage prototype would also explore implementation feasibility through authorized Canvas APIs and institutional integration requirements.",
  },

  finalExperience: {
    subheading:
      "CoursePilot lets students ask questions naturally while adapting the response to the task — from quick answers to structured plans, summaries, and calculations.",
    // The old per-feature gallery (one heading + paragraph + full
    // screenshot per screen) is replaced by the story below —
    // `architecture` / `heroMoment` / `secondaryMoments` / `synthesis`.
    features: [],

    architecture: {
      heading: "Quick access without leaving Canvas.",
      copy: "CoursePilot is accessible directly from Canvas rather than as a separate productivity app. Students can use the popup for quick questions or expand into the full workspace when a task needs more context.",
      steps: [
        {
          label: "Canvas dashboard",
          image: {
            src: "/images/projects/coursepilot/canvas-dashboard-regular.png",
            alt: "Regular Canvas dashboard, unmodified",
            width: 1446,
            height: 1024,
          },
        },
        {
          label: "CoursePilot popup",
          image: {
            src: "/images/projects/coursepilot/final/canvas-popup-open.png",
            alt: "CoursePilot popup open over the Canvas dashboard: a welcome summary of 2 assignments due, 1 update, and 1 overdue, with Plan My Day, Catch Me Up, and Grades quick actions and an Ask anything input.",
            width: 2000,
            height: 1422,
          },
        },
        {
          label: "Full CoursePilot workspace",
          image: {
            src: "/images/projects/coursepilot/final/workspace-new-chat.png",
            alt: "Full CoursePilot workspace in its New Chat state: recent chats in a sidebar, a How can we help? prompt, suggested questions, and an Ask anything input.",
            width: 2000,
            height: 1422,
          },
        },
      ],
      callouts: [
        { title: "Quick entry", description: "Ask without leaving the current Canvas workflow." },
        { title: "Deeper workspace", description: "Expand when a task requires planning, comparison, or follow-up." },
      ],
    },

    heroMoment: {
      heading: "Conversation in. Actionable interface out.",
      copy: "Students don't need to learn special commands. They can describe their situation naturally, while CoursePilot structures the response around the decision they need to make.",
      prompt: "I have 3 hours tonight. What should I work on?",
      // No separate visual here: the plan itself is the "after" in Design
      // Evolution and plays in the hero video, so this moment shows what
      // students do with it next (see `interactionDesign.images`).
      callouts: [
        { title: "Priority", description: "Tasks are ordered using more than due date alone." },
        { title: "Estimated effort", description: "The response accounts for how much time the student actually has." },
        { title: "Why this?", description: "Students can understand why a task was prioritized." },
        { title: "Editable plan", description: "AI proposes the schedule; the student remains in control." },
        { title: "Sources", description: "Recommendations stay connected to the underlying Canvas information." },
      ],
      principle: "AI recommends. Students decide.",
    },

    secondaryMoments: [
      {
        name: "Catch Me Up",
        heading: "Understand what changed without checking every course.",
        copy: "CoursePilot brings assignments, announcements, and recent course changes into one summary so students can quickly understand what needs attention.",
        image: {
          src: "/images/projects/coursepilot/final/catch-me-up.png",
          alt: "Catch Me Up response to “Catch me up on this week”: 2 assignments due and 1 announcement, listed with due dates, estimated time, and the Canvas sources they came from.",
          width: 2000,
          height: 1422,
        },
        callouts: [
          { title: "Needs attention", description: "Surfaces the most time-sensitive coursework first." },
          { title: "Important updates", description: "Separates course changes and announcements from assignments." },
          { title: "Back to Canvas", description: "Students can open the original item when they need more detail." },
        ],
        size: "large",
      },
      {
        name: "Sourced Q&A",
        heading: "Answers that don't hide the source.",
        copy: "For straightforward course questions, CoursePilot keeps the response concise and provides a direct path back to the original Canvas material.",
        steps: ["“What's the late work policy?”", "Concise answer", "Source", "View in syllabus"],
        image: {
          src: "/images/projects/coursepilot/final/syllabus-answer.png",
          alt: "Answer to “What is the late assignment policy for Art History?”: a short summary, the quoted Late Work Policy from the syllabus, its source path, and a View in syllabus link.",
          width: 2000,
          height: 1422,
        },
        callouts: [
          { title: "Answer", description: "Concise response to the student's question." },
          { title: "Source", description: "Shows where the information came from." },
          { title: "View in syllabus", description: "Lets the student verify the original material." },
        ],
        size: "large",
      },
    ],

    trust: {
      copy: "The goal wasn’t to make AI look certain. It was to make important answers inspectable.",
      items: [
        {
          title: "Why this?",
          description: "Explains why CoursePilot made a recommendation.",
          image: {
            src: "/images/projects/coursepilot/trust/why-this.png",
            alt: "Cropped task row showing a “Why this?” link next to the due date and estimated time",
            width: 1020,
            height: 98,
          },
        },
        {
          title: "Grades used",
          description: "Shows the inputs behind calculations.",
          image: {
            src: "/images/projects/coursepilot/trust/grades-used.png",
            alt: "Cropped grades-used table listing each assignment's score and points behind a grade calculation",
            width: 1040,
            height: 260,
          },
        },
        {
          title: "Sources",
          description: "Shows where the answer came from.",
          image: {
            src: "/images/projects/coursepilot/trust/sources.png",
            alt: "Cropped sources list linking a recommendation back to its originating Canvas assignments and announcements",
            width: 1020,
            height: 100,
          },
        },
        {
          title: "View in syllabus",
          description: "Lets students verify the original material.",
          image: {
            src: "/images/projects/coursepilot/trust/view-in-syllabus.png",
            alt: "Cropped source row under a syllabus answer: Art History → Syllabus → Late Work Policy, with a View in syllabus link",
            width: 995,
            height: 62,
          },
        },
        // No uncertainty state exists yet, so no "Uncertainty" item is
        // listed here — nothing to show would mean inventing one.
      ],
    },
    interactionDesign: {
      heading: "Acting without losing context",
      copy: "Actions such as adjusting a recommendation or adding a calendar event happen in lightweight overlays so students can make changes without losing the original conversation.",
      images: [
        {
          src: "/images/projects/coursepilot/final/adjust-plan.png",
          alt: "Adjust your plan overlay: each task with minus and plus time controls, an Anything else CoursePilot should consider? field, a 2 hr 35 planned, 25 min remaining summary, and Cancel and Update Plan buttons.",
          width: 704,
          height: 576,
          caption: "Adjust Plan — students change time per task before anything is saved.",
        },
        {
          src: "/images/projects/coursepilot/final/add-to-calendar.png",
          alt: "Add plan to calendar overlay listing the three time blocks for Friday, May 16, a calendar picker with Canvas Calendar and Google Calendar, and Cancel and Add Plan buttons.",
          width: 704,
          height: 648,
          caption: "Add to Calendar — the exact events are reviewed before they're added.",
        },
      ],
    },
  },

  // No results section: usability testing hasn't happened yet, so there
  // are no real outcomes to report. See `testing.validateNext` instead.

  finalThoughts: {
    whatILearned:
      "The biggest shift in CoursePilot was realizing that designing an AI product wasn't primarily about designing a chat interface. I had to decide when AI should summarize, when it should recommend, when students needed control, and when an answer required supporting evidence.",
    nextSteps:
      "Those decisions are still the ones I'd keep refining — not by adding more AI features, but by getting sharper about when CoursePilot should stay quiet and let a student just work.",
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
      items: ["Usability testing", "Canvas API feasibility review", "Engineering — this is a design prototype, not built software"],
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
    { label: "Usability testing", done: false },
    { label: "Iterations after testing", done: false },
  ],
};
