// @vitest-environment node
//
// Pure data assertions: the registry, per-article metadata, and the content
// rules the articles were written to. Nothing here renders, so it runs in
// node rather than jsdom.
import { describe, expect, it } from "vitest";
import {
  INSIGHTS,
  getInsightBySlug,
  getAdjacentInsights,
} from "./index.js";

const WORDS_PER_MINUTE = 225;

// Every string a reader actually sees on the article page. Fields that are
// metadata, markup plumbing or alt text are skipped, because reading time is
// about body copy.
const NON_VISIBLE_KEYS = new Set([
  "slug", "type", "id", "src", "coverImage", "href", "seoTitle",
  "seoDescription", "keywords", "publishedDate", "modifiedDate", "readTime",
  "alt", "coverAlt", "homepageExcerpt", "featured", "number", "width", "height",
]);

const collectVisibleText = (node, out = []) => {
  if (node == null) return out;
  if (typeof node === "string") {
    out.push(node);
    return out;
  }
  if (Array.isArray(node)) {
    node.forEach((child) => collectVisibleText(child, out));
    return out;
  }
  if (typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      if (NON_VISIBLE_KEYS.has(key)) continue;
      collectVisibleText(value, out);
    }
  }
  return out;
};

const visibleTextOf = (insight) =>
  collectVisibleText({
    title: insight.title,
    deck: insight.deck,
    sections: insight.sections,
    cta: insight.cta,
  }).join(" ");

const wordCountOf = (insight) =>
  visibleTextOf(insight).trim().split(/\s+/).filter(Boolean).length;

const NEW_ARTICLES = ["claims-dont-convert-proof-does", "website-brand-recognition-system"];

describe("the Insights registry", () => {
  it("registers all three published Insights", () => {
    expect(INSIGHTS).toHaveLength(3);
    expect(INSIGHTS.map((i) => i.slug)).toEqual([
      "seven-second-contractor-website-test",
      "claims-dont-convert-proof-does",
      "website-brand-recognition-system",
    ]);
  });

  it("lists them in numerical order, which is the order the homepage rotates", () => {
    expect(INSIGHTS.map((i) => i.number)).toEqual(["001", "002", "003"]);
  });

  it("resolves every slug, and refuses an unknown one", () => {
    for (const insight of INSIGHTS) {
      expect(getInsightBySlug(insight.slug)).toBe(insight);
    }
    expect(getInsightBySlug("not-a-real-article")).toBeNull();
  });

  it("links every article to every other one", () => {
    for (const insight of INSIGHTS) {
      const { previous, next, others } = getAdjacentInsights(insight.slug);
      const linked = [previous, next, ...others].filter(Boolean);
      expect(linked.map((i) => i.slug).sort()).toEqual(
        INSIGHTS.filter((i) => i !== insight).map((i) => i.slug).sort()
      );
    }
  });

  it("gives 002 a previous and a next, and the ends only one neighbour", () => {
    const first = getAdjacentInsights("seven-second-contractor-website-test");
    expect(first.previous).toBeNull();
    expect(first.next.number).toBe("002");

    const middle = getAdjacentInsights("claims-dont-convert-proof-does");
    expect(middle.previous.number).toBe("001");
    expect(middle.next.number).toBe("003");

    const last = getAdjacentInsights("website-brand-recognition-system");
    expect(last.previous.number).toBe("002");
    expect(last.next).toBeNull();
  });
});

describe("each article carries its own metadata", () => {
  const unique = (key) => new Set(INSIGHTS.map((i) => i[key]));

  it("has a unique slug, number, title and cover", () => {
    for (const key of ["slug", "number", "title", "coverImage"]) {
      expect(unique(key).size, `${key} is shared between articles`).toBe(
        INSIGHTS.length
      );
    }
  });

  it("has a unique SEO title, description and keyword set", () => {
    const titles = INSIGHTS.map((i) => i.seoTitle || i.title);
    const descriptions = INSIGHTS.map((i) => i.seoDescription || i.deck);
    const keywords = INSIGHTS.map((i) => i.keywords);

    expect(new Set(titles).size).toBe(INSIGHTS.length);
    expect(new Set(descriptions).size).toBe(INSIGHTS.length);
    expect(new Set(keywords).size).toBe(INSIGHTS.length);
    for (const value of [...titles, ...descriptions, ...keywords]) {
      expect(typeof value).toBe("string");
      expect(value.length).toBeGreaterThan(0);
    }
  });

  it("does not let 002 or 003 inherit Insight 001's title or keywords", () => {
    const first = INSIGHTS[0];
    for (const insight of INSIGHTS.slice(1)) {
      expect(insight.seoTitle).not.toBe(first.seoTitle);
      expect(insight.keywords).not.toBe(first.keywords);
      expect(insight.seoTitle.toLowerCase()).not.toContain("seven seconds");
      expect(insight.keywords).not.toContain("mobile website usability");
    }
  });

  it("describes a real cover image for each article", () => {
    for (const insight of INSIGHTS) {
      expect(insight.coverImage).toMatch(/^\/images\/insights\/insight-00\d\//);
      expect(insight.coverAlt.length).toBeGreaterThan(10);
    }
  });
});

describe("the content rules the new articles were written to", () => {
  const newOnes = INSIGHTS.filter((i) => NEW_ARTICLES.includes(i.slug));

  it("covers both new articles", () => {
    expect(newOnes).toHaveLength(2);
  });

  it("runs between 900 and 1300 useful words", () => {
    for (const insight of newOnes) {
      const words = wordCountOf(insight);
      expect(words, `${insight.slug} has ${words} words`).toBeGreaterThanOrEqual(900);
      expect(words, `${insight.slug} has ${words} words`).toBeLessThanOrEqual(1300);
    }
  });

  it("states a reading time derived from its own word count at 225 wpm", () => {
    for (const insight of newOnes) {
      const expected = Math.max(1, Math.round(wordCountOf(insight) / WORDS_PER_MINUTE));
      expect(insight.readTime, `${insight.slug}`).toBe(`${expected} min read`);
    }
  });

  it("uses no em dashes in visible copy", () => {
    for (const insight of newOnes) {
      expect(visibleTextOf(insight), `${insight.slug}`).not.toMatch(/—/);
    }
  });

  it("reintroduces no pricing figures", () => {
    for (const insight of INSIGHTS) {
      expect(visibleTextOf(insight)).not.toMatch(/\$\s?\d/);
    }
  });

  it("makes no ranking, conversion or AI-citation guarantees", () => {
    const forbidden =
      /\b(guarantee[ds]?|guaranteed results|rank (?:#?1|first|higher)|will double|we promise)\b/i;
    for (const insight of newOnes) {
      expect(visibleTextOf(insight), `${insight.slug}`).not.toMatch(forbidden);
    }
  });

  it("renders a visible FAQ with five questions on each new article", () => {
    for (const insight of newOnes) {
      const faq = insight.sections.find((s) => s.type === "faq");
      expect(faq, `${insight.slug} has no faq section`).toBeTruthy();
      expect(faq.items).toHaveLength(5);
      for (const item of faq.items) {
        expect(item.question.endsWith("?")).toBe(true);
        expect(item.answer.split(/\s+/).length).toBeGreaterThan(20);
      }
    }
  });
});
