/**
 * Records real phone-sized sessions of the live sites for the tall
 * Selected Works thumbnails.
 *
 * 1. Start Chrome with remote debugging (headless is fine):
 *      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
 *        --headless=new --remote-debugging-port=9333 --user-data-dir=/tmp/phone-rec about:blank
 * 2. node scripts/thumbnails/record-phone.mjs <mymuseum|noodle-house>
 *
 * Writes design-refs/<project>/recording-tall.mp4 (1080x1920, 20 fps,
 * near-lossless) and recording-tall.json (tap times/positions, which
 * build_thumbnails.py draws as soft touch ripples).
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const PORT = 9333;
// iPhone 8 Plus viewport: exactly 9:16, scaled to a 1080x1920 capture.
const VIEW = { width: 414, height: 736, deviceScaleFactor: 1080 / 414, mobile: true };
const FPS = 20;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Finds the first button/link whose text matches. */
const byText = (re, extra = "true") =>
  `[...document.querySelectorAll("a,button")].find((e) => ${re}.test(e.innerText.trim()) && e.getBoundingClientRect().height > 0 && (${extra}))`;

const SESSIONS = {
  // My Little World's grid -> scroll to the first artwork -> View artwork -> Next.
  // Ends on the artwork viewer; build_thumbnails.py crossfades back.
  mymuseum: {
    url: "https://mymuseum-eta.vercel.app/museum/my-little-world",
    async prepare(s) {
      // The Controls menu opens on first visit; close it so the grid is clear.
      await s.ev(`(() => {
        const b = [...document.querySelectorAll("button")].find((b) => /^Controls/.test(b.innerText.trim()));
        if (b && b.getAttribute("aria-expanded") === "true") b.click();
      })()`);
      await sleep(1500);
    },
    async run(s) {
      await sleep(1200); // hold on the title
      await s.scroll(285, 1800); // lands in the gap above the first card
      await sleep(600);
      await s.tap(byText(/View artwork/));
      await sleep(2200);
      await s.tap(byText(/^Next/));
      await sleep(2400);
    },
  },

  // Homepage -> Order Online -> Locations -> scroll to Camillus -> Select
  // Camillus (the "You're ordering from" sheet slides up) -> Change location
  // -> logo back to the homepage. Ends on the frame it starts on, so the
  // clip loops with no crossfade.
  "noodle-house": {
    url: "https://vietnoodlehouse.com/",
    async prepare(s) {
      // Warm the cache so the Locations page and its maps paint instantly.
      await s.nav("https://vietnoodlehouse.com/locations");
      await sleep(4000);
      // Arrive on the homepage the same way the clip ends (logo tap from
      // Locations), so the first and last frames match. The hero's "Beef
      // Pho" label only fades in ~3.6s after arriving, so it's hidden in both.
      await s.ev(`[...document.querySelectorAll("a")].find((a) => a.getAttribute("href") === "/").click()`);
      await s.homePainted();
    },
    async run(s) {
      await sleep(1000); // hold on the hero
      await s.tap(byText(/^ORDER ONLINE$/, "e.getBoundingClientRect().top > 100"));
      await s.waitFor(`location.pathname === "/locations"`);
      await sleep(700);
      // Camillus card just under the sticky header, Select button in view.
      const y = await s.ev(`(() => {
        const b = ${byText(/^SELECT CAMILLUS$/)};
        return b.getBoundingClientRect().top + scrollY - 480;
      })()`);
      await s.scroll(y, 1300);
      await sleep(350);
      await s.tap(byText(/^SELECT CAMILLUS$/));
      await sleep(1700); // sheet slides up and holds
      await s.tap(byText(/^CHANGE LOCATION$/));
      await sleep(650);
      await s.tap(`[...document.querySelectorAll("a")].find((a) => a.getAttribute("href") === "/")`);
      await s.homePainted();
    },
  },
};

const project = process.argv[2];
const session = SESSIONS[project];
if (!session) {
  console.error(`usage: node record-phone.mjs <${Object.keys(SESSIONS).join("|")}>`);
  process.exit(1);
}
const OUT_DIR = path.resolve(import.meta.dirname, "../../design-refs", project);

// --- Chrome DevTools Protocol plumbing ------------------------------------
const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
let nextId = 0;
const pending = new Map();
const listeners = [];
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  } else if (m.method) listeners.forEach((fn) => fn(m));
};
await new Promise((r) => (ws.onopen = r));
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, (m) => (m.error ? reject(new Error(`${method}: ${m.error.message}`)) : resolve(m.result)));
    ws.send(JSON.stringify({ id, method, params }));
  });
const ev = async (expression) =>
  (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result.value;

const taps = [];
const s = {
  ev,
  async nav(url) {
    await send("Page.navigate", { url });
  },
  async waitFor(cond, timeout = 8000) {
    const end = Date.now() + timeout;
    while (Date.now() < end) {
      if (await ev(`!!(${cond})`)) return;
      await sleep(50);
    }
    throw new Error(`timed out waiting for ${cond}`);
  },
  /** Homepage hero on screen (the URL changes before it paints), then a
   * fixed 300ms, so the clip's first and last frames are the same moment. */
  async homePainted() {
    await this.waitFor(`location.pathname === "/" && scrollY === 0 && [...document.querySelectorAll("a")].some((a) => a.innerText.trim() === "VIEW MENU" && a.getBoundingClientRect().top < innerHeight)`);
    // ...and the hero photo loaded and fully faded in.
    await this.waitFor(`[...document.images].filter((i) => { const r = i.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.width > 200; }).every((i) => {
      if (!i.complete || !i.naturalWidth) return false;
      for (let p = i; p; p = p.parentElement) if (+getComputedStyle(p).opacity < 1) return false;
      return true;
    })`);
    await ev(`new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))`);
    await sleep(300);
  },
  /** Real touch events at an element's center. */
  async tap(elementJs) {
    const p = await ev(`(() => { const r = (${elementJs}).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })()`);
    taps.push({ t: Date.now() / 1000, x: p.x / VIEW.width, y: p.y / VIEW.height });
    await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [p] });
    await sleep(90);
    await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  },
  /** Eased scroll of the page (or its inner scroll container). */
  async scroll(to, ms) {
    await ev(`(() => {
      const sc = [...document.querySelectorAll("*")].find((e) => /(auto|scroll)/.test(getComputedStyle(e).overflowY) && e.scrollHeight > e.clientHeight + 10) || document.scrollingElement;
      const from = sc.scrollTop, start = performance.now();
      return new Promise((done) => (function step() {
        const k = Math.min((performance.now() - start) / ${ms}, 1);
        sc.scrollTop = from + (${to} - from) * (0.5 - 0.5 * Math.cos(Math.PI * k));
        k < 1 ? requestAnimationFrame(step) : done();
      })());
    })()`);
  },
};

await send("Emulation.setDeviceMetricsOverride", VIEW);
await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
await send("Emulation.setUserAgentOverride", {
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
});
await send("Page.enable");
await s.nav(session.url);
await sleep(8000);
// Wait (up to 5s) for on-screen images; lazy ones may never fire onload.
const imagesReady = () =>
  ev(`Promise.race([
    Promise.all([...document.images].filter((i) => i.getBoundingClientRect().top < innerHeight).map((i) => i.complete ? 0 : new Promise((r) => i.onload = i.onerror = r))),
    new Promise((r) => setTimeout(r, 5000)),
  ])`);
await imagesReady();
await sleep(1500);
// prepare() leaves the page exactly where the recording should start.
await session.prepare(s);

// --- Record ----------------------------------------------------------------
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "phone-rec-"));
const frames = [];
listeners.push((m) => {
  if (m.method !== "Page.screencastFrame") return;
  const file = path.join(tmp, `f${String(frames.length).padStart(5, "0")}.png`);
  fs.writeFileSync(file, Buffer.from(m.params.data, "base64"));
  frames.push({ file, t: m.params.metadata.timestamp });
  send("Page.screencastFrameAck", { sessionId: m.params.sessionId });
});
await send("Page.startScreencast", { format: "png", maxWidth: 1080, maxHeight: 1920, everyNthFrame: 1 });
const t0 = Date.now() / 1000;
await session.run(s);
await send("Page.stopScreencast");
await sleep(300);
// The screencast only emits on repaint, so a still page sends nothing.
// Grab the settled final state and hold it to the real stop time.
{
  const { data } = await send("Page.captureScreenshot", { format: "png" });
  const file = path.join(tmp, "final.png");
  fs.writeFileSync(file, Buffer.from(data, "base64"));
  frames.push({ file, t: Date.now() / 1000 });
}
const tEnd = frames.at(-1).t;

// Resample the variable-rate screencast to a constant 20 fps.
const tStart = Math.max(frames[0].t, t0);
const lines = [];
let j = 0;
for (let t = tStart; t <= tEnd; t += 1 / FPS) {
  while (j + 1 < frames.length && frames[j + 1].t <= t) j++;
  lines.push(`file '${frames[j].file}'\nduration ${1 / FPS}`);
}
fs.writeFileSync(path.join(tmp, "list.txt"), lines.join("\n") + `\nfile '${frames[j].file}'\n`);
fs.mkdirSync(OUT_DIR, { recursive: true });
const out = path.join(OUT_DIR, "recording-tall.mp4");
execFileSync("ffmpeg", [
  "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", path.join(tmp, "list.txt"),
  "-vf", `scale=1080:1920:flags=lanczos,fps=${FPS}`, "-c:v", "libx264", "-crf", "10", "-preset", "slow",
  "-pix_fmt", "yuv420p", out,
]);
const rel = taps.map((p) => ({ ...p, t: +(p.t - tStart).toFixed(3) }));
fs.writeFileSync(path.join(OUT_DIR, "recording-tall.json"), JSON.stringify({ taps: rel }, null, 2));
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`${frames.length} frames over ${(tEnd - tStart).toFixed(2)}s -> ${out}`);
console.log(JSON.stringify(rel.map((p) => ({ t: +p.t.toFixed(2), x: +p.x.toFixed(2), y: +p.y.toFixed(2) }))));
process.exit(0);
