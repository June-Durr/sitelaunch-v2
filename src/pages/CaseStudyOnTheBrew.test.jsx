import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AppRoutes } from "../App";
import CaseStudies from "../components/sections/CaseStudies";
import { projects } from "../data/projects";

afterEach(cleanup);

const renderAt = (path) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </HelmetProvider>
  );

describe("the On The Brew case study", () => {
  it("answers at /work/on-the-brew with one h1 and the five sections", () => {
    renderAt("/work/on-the-brew");
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent("On The Brew");
    expect(
      screen.getByText("A café website designed around the next visit.")
    ).toBeInTheDocument();
    for (const name of [
      "The brief",
      "The design decisions",
      "Finding the café on mobile",
      "The outcome",
    ]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
    expect(screen.getByText("Previous homepage, July 2026")).toBeInTheDocument();
    expect(screen.getByText("Redesigned homepage")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Get a Free Website Review" })
    ).toHaveAttribute("href", "/#review");
  });

  it("gives every image a description and its real dimensions", () => {
    const { container } = renderAt("/work/on-the-brew");
    const images = container.querySelectorAll("img");
    expect(images.length).toBeGreaterThan(0);
    for (const img of images) {
      expect(img.getAttribute("alt")?.length).toBeGreaterThan(20);
      expect(Number(img.getAttribute("width"))).toBeGreaterThan(0);
      expect(Number(img.getAttribute("height"))).toBeGreaterThan(0);
    }
  });

  it("shows the desktop homepage once, as the opening, and compares phone with phone", () => {
    const { container } = renderAt("/work/on-the-brew");
    expect(container.querySelectorAll('img[src*="desktop-homepage"]')).toHaveLength(1);
    const comparison = screen.getByText("Previous homepage, July 2026").closest("figure").parentElement;
    const imgs = comparison.querySelectorAll("img");
    expect(imgs).toHaveLength(2);
    expect(imgs[0].getAttribute("src")).toMatch(/previous-homepage/);
    expect(imgs[1].getAttribute("src")).toMatch(/mobile-homepage/);
    expect(imgs[0].className).toBe(imgs[1].className);
  });

  it("leaves out the menu capture that still reads Description pending", () => {
    const { container } = renderAt("/work/on-the-brew");
    expect(container.innerHTML).not.toMatch(/menu-preview/);
    expect(container.textContent).not.toMatch(/Description pending/i);
  });

  it("keeps the copy inside the content guardrails", () => {
    const { container } = renderAt("/work/on-the-brew");
    const text = container.textContent;
    expect(text).not.toMatch(/[—–‘’“”]/);
    expect(text).not.toMatch(/\$\d/);
    expect(text).not.toMatch(/visit live site/i);
    expect(text).not.toMatch(/\bAI\b/);
  });

  it("shows the hours screen once, prominently, with no gallery controls", () => {
    const { container } = renderAt("/work/on-the-brew");
    expect(container.querySelectorAll('img[src*="mobile-hours-directions"]')).toHaveLength(1);
    expect(container.querySelectorAll('img[src*="mobile-homepage"]')).toHaveLength(1);
    expect(container.querySelector("article button")).toBeNull();
    expect(
      container.querySelector('a[href$="mobile-hours-directions-1179.webp"]')
    ).toHaveTextContent("Open this screen full size");
  });
});

describe("the Work section", () => {
  it("links On The Brew to its case study inside the site", () => {
    render(
      <MemoryRouter>
        <CaseStudies />
      </MemoryRouter>
    );
    const links = screen.getAllByRole("link", { name: /View case study: On The Brew/ });
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute("href", "/work/on-the-brew");
      expect(link).not.toHaveAttribute("target");
    }
    expect(projects.find((p) => p.id === "on-the-brew").url).toBeNull();
  });
});
