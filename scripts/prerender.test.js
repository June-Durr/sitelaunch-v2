// @vitest-environment node
//
// Node, not jsdom: this file imports prerender.js, which imports vite, which
// loads esbuild. esbuild refuses to run where TextEncoder does not produce a
// real Uint8Array, and jsdom's does not. Nothing here touches the DOM anyway.

// Direct-route support, which on this site is entirely a build-time matter.
//
// There is no SPA fallback here: no netlify.toml, no public/_redirects, and an
// unknown path answers with a real 404 from Netlify rather than the app shell.
// A route exists in production only because this script wrote a file for it. So
// "does /privacy survive a refresh" is the same question as "is /privacy in
// ROUTES", and that is what these assert.

import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { resolve, sep } from "node:path";

import { ROUTES, FLAT_ROUTES, outPathFor } from "./prerender.js";

describe("every route the app answers is prerendered", () => {
  it("includes /privacy, or the live URL would 404", () => {
    expect(ROUTES).toContain("/privacy");
  });

  it("still includes the routes that were already there", () => {
    // The point of adding one route is not to lose the others.
    expect(ROUTES).toContain("/");
    expect(ROUTES).toContain("/insights");
    expect(ROUTES).toContain("/insights/seven-second-contractor-website-test");
  });

  it("covers every concrete path the router declares", () => {
    // Parameterised and catch-all routes are excluded: ":slug" is covered by
    // the concrete insight URL above, and "*" is the 404 page, which is the
    // one route that should not have a file written for it.
    const app = readFileSync(resolve("src/App.jsx"), "utf8");
    const declared = [...app.matchAll(/path="([^"]+)"/g)]
      .map((m) => m[1])
      .filter((path) => !path.includes(":") && path !== "*");

    for (const path of declared) {
      expect(ROUTES, `${path} is a route with no prerendered file`).toContain(path);
    }
  });
});

describe("the privacy page is written flat, so its URL answers 200", () => {
  it("writes privacy.html rather than privacy/index.html", () => {
    // The directory form makes Netlify answer /privacy with a 301 to
    // /privacy/ first. The address handed to Google for OAuth verification
    // should not depend on a redirect being followed.
    expect(FLAT_ROUTES.has("/privacy")).toBe(true);
    expect(outPathFor("/privacy").endsWith(`${sep}privacy.html`)).toBe(true);
    expect(outPathFor("/privacy")).not.toContain(`privacy${sep}index.html`);
  });

  it("leaves the other routes exactly where they were", () => {
    expect(outPathFor("/").endsWith(`${sep}index.html`)).toBe(true);
    expect(
      outPathFor("/insights/seven-second-contractor-website-test").endsWith(
        `${sep}seven-second-contractor-website-test${sep}index.html`,
      ),
    ).toBe(true);
  });
});

describe("nothing reintroduces a fallback this site does not have", () => {
  it("has no _redirects or netlify.toml claiming otherwise", () => {
    // If one is ever added, the reasoning in these tests stops holding and
    // somebody should revisit it rather than find out from a 404.
    const root = readdirSync(resolve("."));
    expect(root).not.toContain("netlify.toml");
    const publicFiles = readdirSync(resolve("public"));
    expect(publicFiles).not.toContain("_redirects");
  });

  it("lists the privacy page in the sitemap", () => {
    const sitemap = readFileSync(resolve("public/sitemap.xml"), "utf8");
    expect(sitemap).toContain("https://sitelaunchstudios.com/privacy");
  });

  it("lists the Insights index in the sitemap", () => {
    const sitemap = readFileSync(resolve("public/sitemap.xml"), "utf8");
    expect(sitemap).toContain("https://sitelaunchstudios.com/insights</loc>");
  });

  it("explicitly allows the OpenAI search crawler without exposing private paths", () => {
    const robots = readFileSync(resolve("public/robots.txt"), "utf8");
    expect(robots).toContain("User-agent: OAI-SearchBot");
    expect(robots).toContain("Disallow: /.env");
  });
});
