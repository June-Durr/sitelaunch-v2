import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Faq from "./Faq";
import Insights from "./Insights";
import ServicesPricing from "./ServicesPricing";
import { HOMEPAGE_FAQS } from "../../data/faqs";
import { INSIGHTS } from "../../data/insights";
import { homepageStructuredData } from "../../data/homepageStructuredData";

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

    expect(screen.getByText(/Insights \/ 01 story/i)).toBeInTheDocument();
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(INSIGHTS.length);
    expect(
      screen.getByRole("link", { name: /View all published insights/i })
    ).toHaveAttribute("href", "/insights");
  });
});
