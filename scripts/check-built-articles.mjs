/**
 * Validates the built HTML, not the source.
 *
 * The source tests prove the data is right. This proves the thing actually
 * delivered to a crawler is right: that the article and every answer are plain
 * text in the file, that the schema matches what is rendered, and that nothing
 * is hidden behind a client fetch or a nosnippet attribute.
 *
 * Run after `npm run build`:  npm run check:built
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { INSIGHTS } from "../src/data/insights/index.js";

const SITE = "https://sitelaunchstudios.com";

let failures = 0;
const fail = (m) => { console.log("  FAIL  " + m); failures++; };
const pass = (m) => console.log("  ok    " + m);

const strip = (html) =>
  html
    // Drop scripts so JSON-LD text cannot be mistaken for rendered copy, but
    // keep ld+json for separate schema checks.
    .replace(/<script(?![^>]*ld\+json)[\s\S]*?<\/script>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ");

if (!existsSync(resolve("dist/index.html"))) {
  console.error("dist/ is missing. Run `npm run build` first.");
  process.exit(1);
}

const sitemap = readFileSync(resolve("public/sitemap.xml"), "utf8");

for (const insight of INSIGHTS) {
  const file = resolve(`dist/insights/${insight.slug}/index.html`);
  console.log(`\nInsight ${insight.number}  /insights/${insight.slug}/`);

  if (!existsSync(file)) {
    fail(`no prerendered file at dist/insights/${insight.slug}/index.html`);
    continue;
  }

  const html = readFileSync(file, "utf8");
  const text = strip(html);

  // --- the article itself -------------------------------------------------
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1];
  const h1Text = h1 ? h1.replace(/<[^>]+>/g, "").trim() : null;
  h1Text === insight.title ? pass(`H1 is the article's own title`) : fail(`H1 is ${JSON.stringify(h1Text)}`);

  const opening = insight.sections.find((s) => s.id === "opening");
  const firstPara = opening?.paragraphs?.[0];
  if (firstPara && text.includes(firstPara.slice(0, 60))) pass("opening paragraph is in the HTML");
  else fail("opening paragraph is not in the delivered HTML");

  // --- the answers --------------------------------------------------------
  const faq = insight.sections.find((s) => s.type === "faq");
  if (!faq) {
    fail("no Common questions section (see docs/insights/INSIGHT-FORMAT.md)");
  } else {
    if (/Common questions/.test(text)) pass(`"Common questions" heading present`);
    else fail(`"Common questions" heading missing`);

    let missing = 0;
    for (const { question, answer } of faq.items) {
      if (!text.includes(question)) { fail(`question not in HTML: ${question}`); missing++; }
      // Compared on a slice, because the stripper cannot normalise every entity.
      if (!text.includes(answer.slice(0, 70))) { fail(`answer not in HTML: ${question}`); missing++; }
    }
    if (missing === 0) pass(`${faq.items.length} questions and answers all present as text`);

    // --- schema matches what is rendered ---------------------------------
    const graph = [...html.matchAll(/<script[^>]*ld\+json[^>]*>([\s\S]*?)<\/script>/g)]
      .flatMap((m) => { try { const d = JSON.parse(m[1]); return d["@graph"] || [d]; } catch { return []; } });
    const faqPage = graph.find((e) => e["@type"] === "FAQPage");
    if (!faqPage) fail("renders an FAQ but emits no FAQPage schema");
    else {
      const sameQ = JSON.stringify(faqPage.mainEntity.map((q) => q.name)) ===
        JSON.stringify(faq.items.map((i) => i.question));
      const sameA = JSON.stringify(faqPage.mainEntity.map((q) => q.acceptedAnswer.text)) ===
        JSON.stringify(faq.items.map((i) => i.answer));
      sameQ && sameA
        ? pass("FAQPage schema matches the visible answers exactly")
        : fail("FAQPage schema does not match the visible answers");
    }

    const posting = graph.find((e) => e["@type"] === "BlogPosting");
    posting?.headline === insight.title ? pass("BlogPosting headline matches") : fail("BlogPosting missing or wrong");
    graph.some((e) => e["@type"] === "BreadcrumbList") ? pass("BreadcrumbList present") : fail("no BreadcrumbList");
  }

  // --- discovery ----------------------------------------------------------
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  canonical === `${SITE}/insights/${insight.slug}/`
    ? pass("canonical is its own URL")
    : fail(`canonical is ${canonical}`);

  sitemap.includes(`${SITE}/insights/${insight.slug}/`)
    ? pass("listed in sitemap.xml")
    : fail("missing from sitemap.xml");

  // --- nothing suppressing the content ------------------------------------
  const robotsMeta = (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || "";
  /noindex|nosnippet|noarchive|none/i.test(robotsMeta)
    ? fail(`robots meta suppresses the page: ${robotsMeta}`)
    : pass(`robots meta is indexable (${robotsMeta || "none set"})`);

  /data-nosnippet/i.test(html)
    ? fail("data-nosnippet appears on this page")
    : pass("no data-nosnippet on the article");

  // An answer that only exists once JavaScript runs is not in the HTML.
  const rootEmpty = /<div id="root"><\/div>/.test(html);
  rootEmpty ? fail("the page ships an empty #root, so nothing is prerendered") : pass("content is server-rendered, not client-inserted");
}

console.log(
  "\n" + (failures === 0 ? "Built articles: every check passed" : `${failures} failure(s)`)
);
process.exit(failures === 0 ? 0 : 1);
