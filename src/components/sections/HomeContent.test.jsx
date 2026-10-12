import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Faq from "./Faq";
import Insights from "./Insights";
import ServicesPricing from "./ServicesPricing";
import { HOMEPAGE_FAQS } from "../../data/faqs";
import { INSIGHTS } from "../../data/insights";
import { homepageStructuredData } from "../../data/homepageStructuredData";

// vitest runs without `globals`, so Testing Library's automatic cleanup never
// registers itself; several tests below render more than once.
afterEach(cleanup);

describe("the compact services and FAQ update", () => {
  it("removes public package prices while preserving clear services", () => {
    const { container } = render(<ServicesPricing />);
    expect(screen.getByText("Launch a new website")).toBeInTheDocument();
    expect(screen.getByText("Build one focused landing page")).toBeInTheDocument();
    expect(screen.getByText("Improve the site you already have")).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/\$199|\$699|\$1,200/);
  });

  it("keeps every FAQ answer in the HTML even while rows are collapsed", () => {
    render(<Faq />);
    for (const item of HOMEPAGE_FAQS) {
      expect(screen.getByText(item.question)).toBeInTheDocument();
      expect(screen.getByText(item.answer)).toBeInTheDocument();
    }
  });

  it("uses visible FAQ copy in schema and contains no self-review rating", () => {
    const graph = homepageStructuredData["@graph"];
    const faq = graph.find((entry) => entry["@type"] === "FAQPage");
    expect(faq.mainEntity).toHaveLength(HOMEPAGE_FAQS.length);
    expect(faq.mainEntity[0].name).toBe(HOMEPAGE_FAQS[0].question);
    expect(JSON.stringify(homepageStructuredData)).not.toContain("aggregateRating");
  });
});

describe("the registry-driven Insights browser", () => {
  it("shows only genuinely published articles and links to the index", () => {
    render(
      <MemoryRouter>
        <Insights />
      </MemoryRouter>
    );

    expect(screen.getByText(/Insights \/ 03 stories/i)).toBeInTheDocument();
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(INSIGHTS.length);
    expect(
      screen.getByRole("link", { name: /View all published insights/i })
    ).toHaveAttribute("href", "/insights");
  });

  it("reports the published count rather than a hard-coded one", () => {
    render(
      <MemoryRouter>
        <Insights />
      </MemoryRouter>
    );

    const label = String(INSIGHTS.length).padStart(2, "0");
    const noun = INSIGHTS.length === 1 ? "story" : "stories";
    expect(
      screen.getByText(new RegExp(`Insights / ${label} ${noun}`, "i"))
    ).toBeInTheDocument();
  });

  it("opens the correct article from every cover", () => {
    render(
      <MemoryRouter>
        <Insights />
      </MemoryRouter>
    );

    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(INSIGHTS.length);

    INSIGHTS.forEach((insight, index) => {
      // Selecting a field note swaps the preview; the cover and the read link
      // must both point at that article, not whichever one loaded first.
      fireEvent.click(tabs[index]);

      const cover = screen.getByRole("link", {
        name: new RegExp(`Read Insight ${insight.number}:`, "i"),
      });
      expect(cover).toHaveAttribute("href", `/insights/${insight.slug}/`);

      // Both the cover plate and the "Read insight" link lead to the article,
      // so every one of them has to move with the selection.
      const readLinks = screen.getAllByRole("link", { name: /read insight/i });
      expect(readLinks.length).toBeGreaterThanOrEqual(2);
      for (const link of readLinks) {
        expect(link).toHaveAttribute("href", `/insights/${insight.slug}/`);
      }

      const image = cover.querySelector("img");
      expect(image).toHaveAttribute("src", insight.coverImage);
      expect(image.getAttribute("alt")).toBe(insight.coverAlt);
    });
  });
});
