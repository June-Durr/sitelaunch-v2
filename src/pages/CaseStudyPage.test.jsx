import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AppRoutes } from "../App";
import CaseStudies from "../components/sections/CaseStudies";
import { caseStudies } from "../data/caseStudies";
import { projects } from "../data/projects";
import { carlosReview, tysonReview } from "../data/reviews";

afterEach(cleanup);

const renderAt = (path) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </HelmetProvider>
  );

describe.each(caseStudies.map((study) => [study.name, study]))(
  "the %s case study",
  (_name, study) => {
    it("answers at its route with one h1 and the four sections", () => {
      renderAt(study.path);
      const h1s = screen.getAllByRole("heading", { level: 1 });
      expect(h1s).toHaveLength(1);
      expect(h1s[0]).toHaveTextContent(study.name);
      expect(screen.getByText(study.lead)).toBeInTheDocument();
      for (const name of [
        "The brief",
        study.decisions.title,
        study.screens.title,
        "The outcome",
      ]) {
        expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
      }
      expect(
        screen.getByRole("link", { name: "Get a Free Website Review" })
      ).toHaveAttribute("href", "/#review");
    });

    it("gives every image a description and its real dimensions", () => {
      const { container } = renderAt(study.path);
      const images = container.querySelectorAll("img");
      expect(images).toHaveLength(study.desktop ? 3 : 2);
      for (const img of images) {
        expect(img.getAttribute("alt")?.length).toBeGreaterThan(20);
        expect(Number(img.getAttribute("width"))).toBeGreaterThan(0);
        expect(Number(img.getAttribute("height"))).toBeGreaterThan(0);
      }
    });

    it("keeps the copy inside the content guardrails", () => {
      const { container } = renderAt(study.path);
      const text = container.textContent;
      expect(text).not.toMatch(/[—–‘’“”]/);
      expect(text).not.toMatch(/\$\d/);
      expect(text).not.toMatch(/\bAI\b/);
    });

    it("links out to the client's site in a new tab", () => {
      renderAt(study.path);
      const project = projects.find((p) => p.id === study.id);
      const link = screen.getByRole("link", { name: new RegExp(study.liveLabel) });
      expect(link).toHaveAttribute("href", project.url);
      expect(link).toHaveAttribute("target", "_blank");
    });

    it("is linked from the Work section", () => {
      render(
        <MemoryRouter>
          <CaseStudies />
        </MemoryRouter>
      );
      const links = screen.getAllByRole("link", {
        name: new RegExp(`View case study: ${study.name}`),
      });
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link).toHaveAttribute("href", study.path);
      }
    });
  }
);

describe("the client reviews on the case studies", () => {
  it("quotes each Google review word for word", () => {
    const { container, unmount } = renderAt("/work/moth-to-flame");
    expect(container.textContent).toContain(tysonReview.quote);
    unmount();
    const second = renderAt("/work/sweet-stax");
    expect(second.container.textContent).toContain(carlosReview.quote);
  });
});
