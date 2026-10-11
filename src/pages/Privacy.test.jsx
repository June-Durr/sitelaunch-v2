// What the privacy policy has to say, and has to keep saying.
//
// This page exists to pass Google's OAuth verification and to be true. Both of
// those are things a later edit can quietly break: a tidy-up that drops the
// Limited Use sentence fails verification, and a reword that softens "we never
// delete an event" makes the page describe software we do not ship. So the
// claims are asserted individually rather than by a word count.

import { describe, expect, it, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { AppRoutes } from "../App";
import Privacy, { CONTACT_EMAIL, EFFECTIVE_DATE } from "./Privacy";

/** The page on its own, which is what most of these assertions are about. */
function renderPage() {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={["/privacy"]}>
        <Routes>
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
  );
}

/** The app's real route table, so the routing is under test and not a copy. */
function renderApp(path) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe("the privacy page renders publicly", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders without a session, a provider or any account state", () => {
    // Nothing is mocked and nothing is signed in. If this page ever grows a
    // dependency on auth, this is where it shows up.
    renderPage();
    expect(
      screen.getByRole("heading", { level: 1, name: "Privacy Policy" }),
    ).toBeInTheDocument();
  });

  it("states the effective date", () => {
    renderPage();
    expect(EFFECTIVE_DATE).toBe("October 11, 2026");
    expect(screen.getAllByText(new RegExp(EFFECTIVE_DATE)).length).toBeGreaterThan(0);
  });

  it("says who operates the service", () => {
    renderPage();
    expect(document.body.textContent).toContain("SiteLaunch Studios");
    expect(document.body.textContent).toContain("SiteLaunch Marketing Cockpit");
  });

  it("is a real document rather than a stub", () => {
    renderPage();
    // Not a word count for its own sake: a page Google fetches and finds
    // three sentences on does not pass verification.
    const text = document.body.textContent ?? "";
    expect(text.split(/\s+/).filter(Boolean).length).toBeGreaterThan(700);
    expect(screen.getAllByRole("heading", { level: 2 }).length).toBeGreaterThanOrEqual(12);
  });

  it("uses semantic headings in order, one h1 and then h2s", () => {
    renderPage();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    for (const heading of screen.getAllByRole("heading", { level: 2 })) {
      expect(heading.textContent?.trim()).not.toBe("");
    }
  });
});

describe("the Google data sections say what Google requires", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("names the exact scope requested, and no wider one", () => {
    renderPage();
    const text = document.body.textContent ?? "";
    expect(text).toContain(
      "https://www.googleapis.com/auth/calendar.events.owned",
    );
    // The wider scopes must not appear, because they are not requested and
    // naming one on a privacy policy is a claim about access we do not have.
    expect(text).not.toContain("auth/calendar.readonly");
    expect(text).not.toContain("auth/calendar.events ");
  });

  it("describes what is accessed: the account identity and owned events", () => {
    renderPage();
    const text = document.body.textContent ?? "";
    expect(text).toMatch(/email address of the Google account you connected/i);
    expect(text).toMatch(/follow-up events the Cockpit itself created/i);
  });

  it("says how Google data is used", () => {
    renderPage();
    const section = document.getElementById("how-we-use-google-data");
    expect(section).toBeTruthy();
    expect(section.textContent).toMatch(/putting your open follow-ups on your calendar/i);
  });

  it("says Google data is not sold and not used for advertising", () => {
    renderPage();
    const text = document.body.textContent ?? "";
    expect(text).toMatch(/do not sell Google user data/i);
    expect(text).toMatch(/do not use it for advertising/i);
  });

  it("carries the Limited Use sentence, which verification looks for", () => {
    renderPage();
    const section = document.getElementById("limited-use");
    expect(section).toBeTruthy();
    const text = section.textContent ?? "";
    expect(text).toContain("Google API Services User Data Policy");
    expect(text).toContain("Limited Use requirements");

    // And it links to the policy rather than only naming it.
    const link = within(section).getByRole("link", {
      name: /Google API Services User Data Policy/i,
    });
    expect(link).toHaveAttribute(
      "href",
      "https://developers.google.com/terms/api-services-user-data-policy",
    );
  });

  it("promises the three things the Cockpit actually guarantees", () => {
    renderPage();
    const text = document.body.textContent ?? "";
    // An appointment is not evidence of contact.
    expect(text).toMatch(/never treats an appointment on your calendar as evidence/i);
    // It never deletes an event, including unrelated ones.
    expect(text).toMatch(/never deletes a calendar event/i);
    // It cannot see events it did not create, because it never enumerates.
    expect(text).toMatch(/never lists, searches or reads through your calendar/i);
  });

  it("says the authorization is held server side and never reaches the browser", () => {
    renderPage();
    const section = document.getElementById("security");
    expect(section.textContent).toMatch(/server-side/i);
    expect(section.textContent).toMatch(/never sent to your browser/i);
    // And it does not overclaim.
    expect(section.textContent).toMatch(/No service can promise/i);
  });

  it("explains disconnecting, revoking at Google, and what survives it", () => {
    renderPage();
    const section = document.getElementById("disconnecting");
    expect(section.textContent).toMatch(/Disconnect/);
    const link = within(section).getByRole("link", {
      name: /myaccount\.google\.com\/permissions/i,
    });
    expect(link).toHaveAttribute("href", "https://myaccount.google.com/permissions");
    // The honest part: disconnecting does not remove events already created.
    expect(section.textContent).toMatch(/stay on your calendar after you disconnect/i);
  });

  it("explains how to have Cockpit data deleted, to a real address", () => {
    renderPage();
    const section = document.getElementById("deleting-your-data");
    const link = within(section).getByRole("link", { name: CONTACT_EMAIL });
    expect(link).toHaveAttribute("href", `mailto:${CONTACT_EMAIL}`);
    // The address is the one the site's own contact forms already use.
    expect(CONTACT_EMAIL).toBe("sitelaunchstudio@gmail.com");
  });

  it("names the infrastructure providers and no others", () => {
    renderPage();
    const section = document.getElementById("sharing");
    for (const provider of ["Google", "Supabase", "Netlify"]) {
      expect(section.textContent).toContain(provider);
    }
    expect(section.textContent).toMatch(/do not sell your information/i);
  });

  it("covers retention, children and changes", () => {
    renderPage();
    expect(document.getElementById("retention")).toBeTruthy();
    expect(document.getElementById("children").textContent).toMatch(/under 13/);
    expect(document.getElementById("changes").textContent).toMatch(/effective date/i);
  });
});

describe("the /privacy route resolves in the app router", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders the policy, not the 404 page", () => {
    renderApp("/privacy");
    expect(
      screen.getByRole("heading", { level: 1, name: "Privacy Policy" }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/404 - Page Not Found/)).toBeNull();
  });

  it("still resolves when the address carries a trailing slash", () => {
    // Somebody will link to it both ways, and a 404 on one of them is a
    // verification failure waiting to happen.
    renderApp("/privacy/");
    expect(
      screen.getByRole("heading", { level: 1, name: "Privacy Policy" }),
    ).toBeInTheDocument();
  });

  it("leaves an unknown path on the 404 page", () => {
    // The counterpart: proves the assertions above are about the route and
    // not about the page rendering for anything at all.
    renderApp("/not-a-real-path");
    expect(screen.queryByRole("heading", { level: 1, name: "Privacy Policy" })).toBeNull();
  });
});
