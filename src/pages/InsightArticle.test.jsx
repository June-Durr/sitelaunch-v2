import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import InsightArticle from "./InsightArticle";
import { buildInsightSchema } from "./insightSchema";
import { INSIGHTS } from "../data/insights";

afterEach(cleanup);

const renderArticle = (slug) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[`/insights/${slug}/`]}>
        <Routes>
          <Route path="/insights/:slug" element={<InsightArticle />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );

const faqSectionOf = (insight) =>
  insight.sections.find((section) => section.type === "faq") || null;

const renderedFaq = (container) =>
  container.querySelector('section[aria-labelledby="article-faq-heading"]');

describe("every article renders its own content", () => {
  for (const insight of INSIGHTS) {
    it(`renders ${insight.number} with its own H1 and body copy`, () => {
      const { container } = renderArticle(insight.slug);

      const h1 = container.querySelector("h1");
      expect(h1.textContent).toBe(insight.title);

      // The deck, and the first paragraph of the opening section, are real
      // readable text rather than an empty shell.
      expect(screen.getByText(insight.deck)).toBeInTheDocument();
      const opening = insight.sections.find((s) => s.id === "opening");
      expect(screen.getByText(opening.paragraphs[0])).toBeInTheDocument();
    });
  }

  it("does not give 002 or 003 Insight 001's headline", () => {
    for (const insight of INSIGHTS.slice(1)) {
      const { container } = renderArticle(insight.slug);
      expect(container.querySelector("h1").textContent).not.toMatch(
        /seven seconds/i
      );
      cleanup();
    }
  });

  it("renders the 404 page for an unknown slug", () => {
    renderArticle("no-such-article");
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});

describe("article FAQ schema matches the answers a visitor can read", () => {
  const withFaq = INSIGHTS.filter((insight) => faqSectionOf(insight));

  it("covers the articles that have an FAQ", () => {
    expect(withFaq.length).toBeGreaterThanOrEqual(2);
  });

  for (const insight of withFaq) {
    it(`${insight.number}: every structured answer is rendered verbatim`, () => {
      const { container } = renderArticle(insight.slug);
      const faq = renderedFaq(container);
      expect(faq, "the FAQ section is not rendered").toBeTruthy();

      const renderedQuestions = [...faq.querySelectorAll("dt")].map((n) =>
        n.textContent.trim()
      );
      const renderedAnswers = [...faq.querySelectorAll("dd")].map((n) =>
        n.textContent.trim()
      );

      const schema = buildInsightSchema(insight, faqSectionOf(insight));
      const faqPage = schema["@graph"].find((e) => e["@type"] === "FAQPage");
      expect(faqPage).toBeTruthy();

      const schemaQuestions = faqPage.mainEntity.map((q) => q.name);
      const schemaAnswers = faqPage.mainEntity.map(
        (q) => q.acceptedAnswer.text
      );

      // Same questions, same answers, same order, no extras on either side.
      expect(schemaQuestions).toEqual(renderedQuestions);
      expect(schemaAnswers).toEqual(renderedAnswers);
    });
  }

  it("emits no FAQPage for an article with no visible FAQ", () => {
    const withoutFaq = INSIGHTS.find((insight) => !faqSectionOf(insight));
    expect(withoutFaq, "expected at least one article without an FAQ").toBeTruthy();

    const { container } = renderArticle(withoutFaq.slug);
    expect(renderedFaq(container)).toBeNull();

    const schema = buildInsightSchema(withoutFaq, null);
    expect(schema["@graph"].some((e) => e["@type"] === "FAQPage")).toBe(false);
  });

  it("always emits BlogPosting with article-specific values", () => {
    for (const insight of INSIGHTS) {
      const schema = buildInsightSchema(insight, faqSectionOf(insight));
      const posting = schema["@graph"].find((e) => e["@type"] === "BlogPosting");

      expect(posting.headline).toBe(insight.title);
      expect(posting.url).toBe(
        `https://sitelaunchstudios.com/insights/${insight.slug}/`
      );
      expect(posting.datePublished).toBe(insight.publishedDate);
      expect(posting.articleSection).toBe(insight.category);
      expect(posting.image[0]).toContain(insight.coverImage);
    }
  });
});

describe("articles link to each other", () => {
  it("offers previous/next navigation to the other published Insights", () => {
    const { container } = renderArticle("claims-dont-convert-proof-does");
    const nav = container.querySelector('nav[aria-label="More insights"]');
    expect(nav).toBeTruthy();

    const hrefs = [...nav.querySelectorAll("a")].map((a) =>
      a.getAttribute("href")
    );
    expect(hrefs).toContain("/insights/seven-second-contractor-website-test/");
    expect(hrefs).toContain("/insights/website-brand-recognition-system/");

    expect(
      within(nav).getByText(/previous insight/i)
    ).toBeInTheDocument();
    expect(within(nav).getByText(/next insight/i)).toBeInTheDocument();
  });

  it("links every article to all the others", () => {
    for (const insight of INSIGHTS) {
      const { container } = renderArticle(insight.slug);
      const nav = container.querySelector('nav[aria-label="More insights"]');
      const hrefs = [...nav.querySelectorAll("a")].map((a) =>
        a.getAttribute("href")
      );

      for (const other of INSIGHTS.filter((i) => i !== insight)) {
        expect(hrefs, `${insight.number} does not link to ${other.number}`).toContain(
          `/insights/${other.slug}/`
        );
      }
      cleanup();
    }
  });
});
