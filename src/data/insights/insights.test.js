// @vitest-environment node
//
// The published-article contract. Every Insight is a reader-facing article
// followed by a compact answer section, and these assert that shape holds for
// all of them rather than only the ones somebody remembered to check. Nothing
// here renders, so it runs in node rather than jsdom.
import { describe, expect, it } from "vitest";
import { INSIGHTS, getInsightBySlug, getAdjacentInsights } from "./index.js";
import {
  readingTimeFor,
  visibleTextOf,
  wordCountOf,
  WORDS_PER_MINUTE,
} from "../../lib/readingTime.js";

const faqOf = (insight) =>
  insight.sections.find((section) => section.type === "faq") || null;

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
    expect(getAdjacentInsights("seven-second-contractor-website-test").previous).toBeNull();
    expect(getAdjacentInsights("seven-second-contractor-website-test").next.number).toBe("002");
    expect(getAdjacentInsights("claims-dont-convert-proof-does").previous.number).toBe("001");
    expect(getAdjacentInsights("claims-dont-convert-proof-does").next.number).toBe("003");
    expect(getAdjacentInsights("website-brand-recognition-system").next).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// The format every article has to follow. Insight 001 shipped without an
// answer section while 002 and 003 had one, which is the omission these exist
// to make impossible to repeat.
// ---------------------------------------------------------------------------

describe("every published Insight carries an answer section", () => {
  for (const insight of INSIGHTS) {
    describe(`Insight ${insight.number}`, () => {
      it("has a Common questions section", () => {
        const faq = faqOf(insight);
        expect(faq, `Insight ${insight.number} has no faq section`).toBeTruthy();
        expect(faq.heading).toBe("Common questions");
      });

      it("asks between four and six questions", () => {
        const faq = faqOf(insight);
        expect(faq.items.length).toBeGreaterThanOrEqual(4);
        expect(faq.items.length).toBeLessThanOrEqual(6);
      });

      it("puts the answers after the article body and before the call to action", () => {
        const types = insight.sections.map((s) => s.type);
        expect(types[types.length - 1]).toBe("faq");
        expect(types.filter((t) => t === "faq")).toHaveLength(1);
        // There is real article above the questions, not just a stub.
        expect(types.filter((t) => t !== "faq").length).toBeGreaterThanOrEqual(4);
      });

      it("writes answers that stand on their own", () => {
        for (const { question, answer } of faqOf(insight).items) {
          expect(question.endsWith("?"), `not a question: ${question}`).toBe(true);
          // Long enough to actually answer, and not a one-line brush-off.
          expect(answer.split(/\s+/).length, `too short: ${question}`).toBeGreaterThan(25);
          // An answer that opens with a bare pronoun cannot be read on its own,
          // which is the whole point of this section.
          expect(answer, `starts with a bare pronoun: ${question}`).not.toMatch(
            /^(This|That|These|Those|It)\b/
          );
        }
      });

      it("uses no em dashes and makes no unsupported numeric claim", () => {
        const faq = faqOf(insight);
        const text = faq.items.map((i) => `${i.question} ${i.answer}`).join(" ");
        expect(text).not.toMatch(/—/);
        // Percentages and "studies show" are the shapes invented evidence takes.
        expect(text).not.toMatch(/\d+\s?%|studies show|research shows|guaranteed/i);
      });
    });
  }

  it("asks a different set of questions on every article", () => {
    const all = INSIGHTS.flatMap((i) => faqOf(i).items.map((q) => q.question));
    expect(new Set(all).size, "two articles share a question").toBe(all.length);
  });

  it("names its own subject rather than relying on a vague reference", () => {
    // Each article's questions should mention something specific to it.
    const subjects = {
      "001": /contractor|first mobile screen|service area|estimate|advertis/i,
      "002": /proof|testimonial|portfolio|claim|review/i,
      "003": /brand|recogni|template|logo|interchangeable/i,
    };
    for (const insight of INSIGHTS) {
      const text = faqOf(insight).items.map((i) => i.question).join(" ");
      expect(text, `Insight ${insight.number} questions are not topic specific`).toMatch(
        subjects[insight.number]
      );
    }
  });
});

describe("reading time is computed, never typed in", () => {
  it("is derived from the article's own visible words", () => {
    for (const insight of INSIGHTS) {
      const expected = Math.max(1, Math.round(wordCountOf(insight) / WORDS_PER_MINUTE));
      expect(readingTimeFor(insight)).toBe(`${expected} min read`);
    }
  });

  it("has no hand-maintained readTime left to drift", () => {
    for (const insight of INSIGHTS) {
      expect(insight.readTime, `Insight ${insight.number} still stores readTime`).toBeUndefined();
    }
  });

  it("counts the answer section, because a reader reads it", () => {
    for (const insight of INSIGHTS) {
      const faq = faqOf(insight);
      const text = visibleTextOf(insight);
      expect(text).toContain(faq.items[0].question);
      expect(text).toContain(faq.items[0].answer);
    }
  });

  it("moves when the article grows", () => {
    const base = INSIGHTS[0];
    const longer = {
      ...base,
      sections: [
        ...base.sections,
        { type: "prose", id: "extra", paragraphs: ["word ".repeat(900).trim()] },
      ],
    };
    expect(wordCountOf(longer)).toBeGreaterThan(wordCountOf(base) + 800);
    expect(readingTimeFor(longer)).not.toBe(readingTimeFor(base));
  });
});

describe("article metadata stays article specific", () => {
  it("has a unique slug, number, title, cover and keyword set", () => {
    for (const key of ["slug", "number", "title", "coverImage", "keywords"]) {
      expect(new Set(INSIGHTS.map((i) => i[key])).size, `${key} is shared`).toBe(INSIGHTS.length);
    }
  });

  it("states each cover's real pixel size, so the homepage card cannot resize", () => {
    for (const insight of INSIGHTS) {
      expect(typeof insight.coverWidth, `Insight ${insight.number}`).toBe("number");
      expect(typeof insight.coverHeight, `Insight ${insight.number}`).toBe("number");
      expect(insight.coverWidth).toBeGreaterThan(0);
      expect(insight.coverHeight).toBeGreaterThan(0);
    }
  });

  it("does not let 002 or 003 inherit Insight 001's title or keywords", () => {
    const first = INSIGHTS[0];
    for (const insight of INSIGHTS.slice(1)) {
      expect(insight.seoTitle).not.toBe(first.seoTitle);
      expect(insight.keywords).not.toBe(first.keywords);
      expect(insight.seoTitle.toLowerCase()).not.toContain("seven seconds");
    }
  });

  it("reintroduces no pricing figures", () => {
    for (const insight of INSIGHTS) {
      expect(visibleTextOf(insight)).not.toMatch(/\$\s?\d/);
    }
  });
});
