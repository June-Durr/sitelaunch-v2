import { useRef, useState } from "react";
import Kicker from "../common/Kicker";
import analytics from "../../services/analytics";

// Same Web3Forms endpoint and access key already used in production by the
// site's other forms — this preserves the working lead-delivery mechanism.
const WEB3FORMS_KEY = "8bdbd83f-f6b1-47b8-b5ed-f9a3ecacabfc";
const PHONE_DISPLAY = "(786) 505-5791";
const PHONE_HREF = "tel:+17865055791";

const fieldClasses =
  "w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-base text-white placeholder-white/35 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500";
const labelClasses =
  "block text-xs font-semibold uppercase tracking-[0.12em] text-white/50";

const FreeWebsiteReviewForm = () => {
  const [mode, setMode] = useState("have");
  const [values, setValues] = useState({
    websiteUrl: "",
    email: "",
    businessType: "",
    businessName: "",
    goal: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [errorMessage, setErrorMessage] = useState("");
  const hasStarted = useRef(false);

  const trackStart = () => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    analytics.trackEvent("form_start", {
      category: "lead_generation",
      label: "review_form",
    });
  };

  const handleModeChange = (nextMode) => {
    trackStart();
    setMode(nextMode);
  };

  const handleChange = (field) => (event) => {
    trackStart();
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!values.email || !values.email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (mode === "have" && !values.websiteUrl.trim()) {
      setErrorMessage("Please enter your website URL.");
      return;
    }
    if (mode === "need" && !values.businessName.trim()) {
      setErrorMessage("Please enter your business name.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Free Website Review (${
            mode === "have" ? "has a website" : "needs a website"
          }) - SiteLaunch Studios`,
          form_type: "Free Website Review",
          starting_point:
            mode === "have" ? "I already have a website" : "I need a website",
          website_url: mode === "have" ? values.websiteUrl : "Not applicable",
          business_name:
            mode === "need" ? values.businessName : "Not provided",
          email: values.email,
          replyto: values.email,
          business_type: values.businessType || "Not provided",
          goal_for_website: mode === "need" ? values.goal : "Not applicable",
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message || "Submission failed");

      analytics.trackContact(
        "form",
        mode === "have" ? "review_form_have_website" : "review_form_need_website"
      );
      setStatus("success");
    } catch (error) {
      console.error("Error submitting website review request:", error);
      analytics.trackEvent("form_submit_error", {
        category: "form_submission",
        label: "review_form",
      });
      setErrorMessage(
        "There was an error sending your request. Please try again or call us directly."
      );
      setStatus("idle");
    }
  };

  const handlePhoneClick = () => {
    analytics.trackEvent("click_phone", {
      category: "contact",
      label: "review_form",
    });
  };

  return (
    <section
      id="review"
      className="scroll-mt-[calc(var(--header-height,68px)+8px)] bg-ink py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Kicker tone="inverted">Free Website Review</Kicker>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Send the site. Get three things to fix.
            </h2>
            <p className="mt-4 max-w-md text-base text-white/60">
              No call, no pitch deck. One email back covering mobile
              usability, how clearly the next step is presented, and whether
              the site can be found.
            </p>

            <a
              href={PHONE_HREF}
              onClick={handlePhoneClick}
              className="mt-6 block text-base font-semibold text-white hover:text-violet-400"
            >
              {PHONE_DISPLAY}
            </a>
            <p className="mt-3 max-w-md text-sm text-white/50">
              Miami based, working with clients anywhere. Consultations
              available in English and Spanish.
            </p>
          </div>

          <div className="lg:col-span-7">
            {status === "success" ? (
              <div className="border border-white/15 bg-white/5 p-6 sm:p-8">
                <h3 className="font-display text-xl font-semibold text-white">
                  Got it, thank you.
                </h3>
                <p className="mt-2 text-base text-white/60">
                  No call required. We reply by email, usually within two
                  business days, with your 3-point review.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <fieldset>
                  <legend className="block text-xs font-semibold uppercase tracking-[0.14em] text-white">
                    Where are you starting from?
                  </legend>
                  {/* A single bordered, divided control (not two separate
                      boxes) so it reads as one decision with two mutually
                      exclusive positions, not a pair of inputs. */}
                  <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-md border border-white/15">
                    <label
                      className={`flex min-h-[52px] cursor-pointer items-center justify-center gap-1.5 px-2 text-center text-sm font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-inset has-[:focus-visible]:ring-violet-400 ${
                        mode === "have"
                          ? "bg-violet-600 text-white"
                          : "bg-transparent text-white/50 hover:text-white/75"
                      }`}
                    >
                      <input
                        type="radio"
                        name="starting-point"
                        value="have"
                        checked={mode === "have"}
                        onChange={() => handleModeChange("have")}
                        className="sr-only"
                      />
                      {mode === "have" && (
                        <svg
                          aria-hidden="true"
                          width="14"
                          height="14"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="flex-none"
                        >
                          <path
                            d="M3 8.5 6.5 12 13 4.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      I already have a website
                    </label>
                    <label
                      className={`flex min-h-[52px] cursor-pointer items-center justify-center gap-1.5 border-l border-white/15 px-2 text-center text-sm font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-inset has-[:focus-visible]:ring-violet-400 ${
                        mode === "need"
                          ? "bg-violet-600 text-white"
                          : "bg-transparent text-white/50 hover:text-white/75"
                      }`}
                    >
                      <input
                        type="radio"
                        name="starting-point"
                        value="need"
                        checked={mode === "need"}
                        onChange={() => handleModeChange("need")}
                        className="sr-only"
                      />
                      {mode === "need" && (
                        <svg
                          aria-hidden="true"
                          width="14"
                          height="14"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="flex-none"
                        >
                          <path
                            d="M3 8.5 6.5 12 13 4.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      I need a website
                    </label>
                  </div>
                </fieldset>

                <div className="mt-7 space-y-4">
                  {mode === "have" ? (
                    <div>
                      <label htmlFor="websiteUrl" className={labelClasses}>
                        Website URL
                      </label>
                      <input
                        id="websiteUrl"
                        type="text"
                        inputMode="url"
                        placeholder="yourbusiness.com"
                        value={values.websiteUrl}
                        onChange={handleChange("websiteUrl")}
                        className={`mt-1.5 ${fieldClasses}`}
                      />
                      <p className="mt-1 text-xs text-white/40">
                        No http needed.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="businessName" className={labelClasses}>
                        Business name
                      </label>
                      <input
                        id="businessName"
                        type="text"
                        placeholder="Your business name"
                        value={values.businessName}
                        onChange={handleChange("businessName")}
                        className={`mt-1.5 ${fieldClasses}`}
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="email" className={labelClasses}>
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@business.com"
                      value={values.email}
                      onChange={handleChange("email")}
                      className={`mt-1.5 ${fieldClasses}`}
                    />
                  </div>

                  <div>
                    <label htmlFor="businessType" className={labelClasses}>
                      Business type
                    </label>
                    <input
                      id="businessType"
                      type="text"
                      placeholder="Contractor or trade"
                      value={values.businessType}
                      onChange={handleChange("businessType")}
                      className={`mt-1.5 ${fieldClasses}`}
                    />
                  </div>

                  {mode === "need" && (
                    <div>
                      <label htmlFor="goal" className={labelClasses}>
                        What should the website help customers do?
                      </label>
                      <textarea
                        id="goal"
                        rows={3}
                        placeholder="Call, request an estimate, book, buy..."
                        value={values.goal}
                        onChange={handleChange("goal")}
                        className={`mt-1.5 ${fieldClasses}`}
                      />
                    </div>
                  )}
                </div>

                {errorMessage && (
                  <p
                    role="alert"
                    className="mt-4 text-sm font-medium text-red-400"
                  >
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-6 flex min-h-[52px] w-full items-center justify-center rounded-md bg-violet-600 px-6 text-base font-semibold text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting"
                    ? "Sending..."
                    : "Get My Free 3-Point Review"}
                </button>

                <p className="mt-3 text-xs text-white/40">
                  No call required. We reply by email. Your details are not
                  shared or added to a list.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeWebsiteReviewForm;
