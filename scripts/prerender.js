// Runs after `vite build`. Serves the built dist/ folder, visits each route in a
// headless browser, and replaces the shipped HTML with the fully-rendered DOM so
// crawlers get real content instead of an empty <div id="root">.
import { preview } from "vite";
import puppeteer from "puppeteer";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const ROUTES = [
  "/",
  "/insights",
  "/insights/seven-second-contractor-website-test",
  "/privacy",
];

// Routes written as <route>.html rather than <route>/index.html.
//
// Netlify serves /privacy straight from privacy.html with a 200. The
// directory form would answer /privacy with a 301 to /privacy/ first, and
// the address given to Google for OAuth verification should not depend on a
// redirect being followed.
export const FLAT_ROUTES = new Set(["/privacy"]);

/** Where one route's HTML is written. Exported so a test can check it
 *  without launching a browser. */
export function outPathFor(route) {
  if (route === "/") return resolve("dist/index.html");
  if (FLAT_ROUTES.has(route)) return resolve(`dist${route}.html`);
  return resolve(`dist${route}/index.html`);
}
// A realistic desktop size instead of Puppeteer's 800x600 default, so layout,
// canvas dimensions, and viewport-based animation thresholds match reality.
const VIEWPORT = { width: 1366, height: 768 };

// Scrolls the full page in viewport-sized steps so every whileInView /
// IntersectionObserver-gated element actually triggers before capture,
// instead of being frozen in its pre-animation state.
async function scrollThroughPage(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    for (let y = 0; y < scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 200));
    }
    window.scrollTo(0, scrollHeight);
    await new Promise((r) => setTimeout(r, 200));
    window.scrollTo(0, 0);
  });
}

// Waits until every running animation has finished, so elements aren't
// captured mid-transition. Infinitely-repeating animations (decorative
// background loops) never finish by definition, so they're treated as
// already "settled" - waiting for one of those would hang forever.
async function waitForAnimationsToSettle(page, timeout = 8000) {
  try {
    await page.waitForFunction(
      () =>
        document.getAnimations().every((anim) => {
          if (anim.playState !== "running") return true;
          const timing = anim.effect && anim.effect.getComputedTiming();
          return timing && timing.iterations === Infinity;
        }),
      { timeout, polling: 100 }
    );
  } catch {
    console.warn(
      "Prerender: animations did not fully settle within timeout, proceeding anyway"
    );
  }
}

async function run() {
  const server = await preview({ preview: { port: 0, host: "127.0.0.1" } });
  const baseUrl = server.resolvedUrls.local[0];

  const browser = await puppeteer.launch({ headless: true });

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      await page.setViewport(VIEWPORT);

      const url = new URL(route, baseUrl).toString();
      await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
      await page.waitForSelector("#root > *", { timeout: 10000 });

      await scrollThroughPage(page);
      await waitForAnimationsToSettle(page);

      const html = await page.evaluate(
        () => "<!DOCTYPE html>\n" + document.documentElement.outerHTML
      );

      const outPath = outPathFor(route);

      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, html);
      console.log(`Prerendered ${route} -> ${outPath}`);

      await page.close();
    }
  } finally {
    await browser.close();
    await server.close();
  }
}

// Only when run as a command. Importing this file (the tests do, to read the
// route table) must not launch a browser.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  run().catch((err) => {
    console.error("Prerender failed:", err);
    process.exit(1);
  });
}
