// The footer's Privacy link.
//
// It used to be a <button> that opened a modal. Google's OAuth verification
// needs a URL it can fetch, and a crawler needs an anchor it can follow, and a
// button is neither. These tests are here so that distinction cannot be
// undone by somebody reaching for a modal again because it looked tidier.

import { describe, expect, it, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Footer from "./Footer";

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );
}

describe("the footer links to the privacy policy", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders Privacy as a real anchor pointing at /privacy", () => {
    renderFooter();
    const link = screen.getByRole("link", { name: "Privacy" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/privacy");
  });

  it("is an anchor and not a button, so a crawler can follow it", () => {
    renderFooter();
    const link = screen.getByRole("link", { name: "Privacy" });
    expect(link.tagName).toBe("A");
    // The old behaviour, asserted absent rather than assumed gone.
    expect(screen.queryByRole("button", { name: "Privacy" })).toBeNull();
  });

  it("does not open in a new tab or carry a nofollow", () => {
    // Both would work against the thing the link is for.
    renderFooter();
    const link = screen.getByRole("link", { name: "Privacy" });
    expect(link).not.toHaveAttribute("target");
    expect(link.getAttribute("rel") ?? "").not.toContain("nofollow");
  });

  it("is visible rather than hidden from assistive technology", () => {
    renderFooter();
    const link = screen.getByRole("link", { name: "Privacy" });
    expect(link).not.toHaveAttribute("aria-hidden");
    expect(link.textContent?.trim()).toBe("Privacy");
  });

  it("keeps Terms working, which was not part of this change", () => {
    renderFooter();
    expect(screen.getByRole("button", { name: "Terms" })).toBeInTheDocument();
  });

  it("no longer carries a second, contradicting privacy policy", () => {
    // The modal copy was removed rather than left beside the new page. Two
    // privacy policies that disagree is worse than one that is inconvenient.
    renderFooter();
    const text = document.body.textContent ?? "";
    expect(text).not.toContain("1. Information We Collect");
    expect(text).not.toContain("Last Updated: January 1, 2026");
  });

  it("still shows the published phone number", () => {
    // The contact details on the privacy page are these, and the page says so
    // because the footer already does. If this disappears, that claim is stale.
    renderFooter();
    const link = screen.getByRole("link", { name: "(786) 505-5791" });
    expect(link).toHaveAttribute("href", "tel:+17865055791");
  });
});

describe("the privacy link sits in the footer's legal row", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("appears next to Terms, where somebody would look for it", () => {
    const { container } = renderFooter();
    const terms = screen.getByRole("button", { name: "Terms" });
    const row = terms.parentElement;
    expect(within(row).getByRole("link", { name: "Privacy" })).toBeInTheDocument();
    expect(container.querySelector("footer")).toBeTruthy();
  });
});
