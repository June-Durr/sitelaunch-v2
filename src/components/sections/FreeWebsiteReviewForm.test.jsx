// The free website review form is the site's only lead capture, so the rules
// below are the ones that decide whether an enquiry arrives at all.
//
// The validation here was merged by hand from two implementations: one that
// only checked an address contained "@", and one that checks it looks like
// name@domain.tld. "bob@" and "bob@site" passing the first means a lead that
// can never be replied to, so those two strings are asserted directly.
//
// Nothing in this file is allowed to reach the network. fetch is replaced in
// every test and asserted against, so running the suite never sends a real
// enquiry to Web3Forms.

import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";

vi.mock("../../services/analytics", () => ({
  default: {
    trackEvent: vi.fn(),
    trackContact: vi.fn(),
  },
}));

import FreeWebsiteReviewForm from "./FreeWebsiteReviewForm";

const ok = () =>
  Promise.resolve({ json: () => Promise.resolve({ success: true }) });

function setup() {
  const fetchMock = vi.fn(ok);
  globalThis.fetch = fetchMock;
  render(<FreeWebsiteReviewForm />);
  return fetchMock;
}

const field = (label) => screen.getByLabelText(label);
const type = (label, value) =>
  fireEvent.change(field(label), { target: { value } });
const submit = () =>
  fireEvent.click(screen.getByRole("button", { name: /Review/i }));

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
  delete globalThis.fetch;
});

describe("email validation", () => {
  it.each(["bob@", "bob@site", "bob", "bob @site.com", ""])(
    "rejects %o and sends nothing",
    async (bad) => {
      const fetchMock = setup();
      type("Website URL", "yourbusiness.com");
      type("Email", bad);
      submit();

      await waitFor(() => {
        expect(screen.getByText(/email address/i)).toBeInTheDocument();
      });
      expect(fetchMock).not.toHaveBeenCalled();
    },
  );

  it("accepts a normal address and submits once", async () => {
    const fetchMock = setup();
    type("Website URL", "yourbusiness.com");
    type("Email", "bob@site.com");
    submit();

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock.mock.calls[0][0]).toBe("https://api.web3forms.com/submit");
  });
});

describe("website address validation", () => {
  it.each(["yourbusiness.com", "www.yourbusiness.co.uk", "https://yourbusiness.com/page"])(
    "accepts %o",
    async (good) => {
      const fetchMock = setup();
      type("Website URL", good);
      type("Email", "bob@site.com");
      submit();

      await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    },
  );

  it.each(["", "not a website", "yourbusiness"])(
    "rejects %o and sends nothing",
    async (bad) => {
      const fetchMock = setup();
      type("Website URL", bad);
      type("Email", "bob@site.com");
      submit();

      await waitFor(() => {
        expect(screen.getByText(/website address/i)).toBeInTheDocument();
      });
      expect(fetchMock).not.toHaveBeenCalled();
    },
  );
});

describe("the error is announced and tied to its field", () => {
  it("marks the field invalid and points aria-describedby at the message", async () => {
    setup();
    type("Website URL", "yourbusiness.com");
    type("Email", "bob@");
    submit();

    await waitFor(() => {
      expect(field("Email")).toHaveAttribute("aria-invalid", "true");
    });
    const described = field("Email").getAttribute("aria-describedby") || "";
    expect(described).toContain("email-error");
    expect(document.getElementById("email-error")).toBeInTheDocument();
  });

  it("clears the error once the field is edited", async () => {
    setup();
    type("Website URL", "yourbusiness.com");
    type("Email", "bob@");
    submit();

    await waitFor(() => {
      expect(field("Email")).toHaveAttribute("aria-invalid", "true");
    });

    type("Email", "bob@site.com");
    await waitFor(() => {
      expect(field("Email")).not.toHaveAttribute("aria-invalid");
    });
  });

  it("focuses the first field that failed, not the last", async () => {
    setup();
    type("Website URL", "");
    type("Email", "bob@");
    submit();

    await waitFor(() => {
      expect(document.activeElement).toBe(field("Website URL"));
    });
  });
});

describe("the needs a website path", () => {
  it("requires a business name instead of a URL", async () => {
    const fetchMock = setup();
    fireEvent.click(screen.getByLabelText(/I need a website/i));
    type("Email", "bob@site.com");
    submit();

    // By id, not by text: "Business name" is also the field's label, so a
    // text match would find two elements and say nothing about the error.
    await waitFor(() => {
      expect(document.getElementById("businessName-error")).toBeInTheDocument();
    });
    expect(field("Business name")).toHaveAttribute("aria-invalid", "true");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("submits once a business name is given", async () => {
    const fetchMock = setup();
    fireEvent.click(screen.getByLabelText(/I need a website/i));
    type("Business name", "Durr Plumbing");
    type("Email", "bob@site.com");
    submit();

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
  });
});

describe("after a successful send", () => {
  it("shows the confirmation and moves focus to it", async () => {
    setup();
    type("Website URL", "yourbusiness.com");
    type("Email", "bob@site.com");
    submit();

    const heading = await screen.findByRole("heading", { name: /thank you/i });
    await waitFor(() => expect(document.activeElement).toBe(heading));
    expect(screen.queryByLabelText("Email")).toBeNull();
  });
});

describe("when the request fails", () => {
  it("keeps the form, reports the failure, and does not claim success", async () => {
    const fetchMock = vi.fn(() => Promise.reject(new Error("offline")));
    globalThis.fetch = fetchMock;
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(<FreeWebsiteReviewForm />);

    type("Website URL", "yourbusiness.com");
    type("Email", "bob@site.com");
    submit();

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/error sending/i);
    });
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /thank you/i })).toBeNull();
  });
});
