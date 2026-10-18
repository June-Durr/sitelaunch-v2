import { useEffect, useRef, useState } from "react";
import Kicker from "../common/Kicker";
import analytics from "../../services/analytics";

// Same Web3Forms endpoint and access key already used in production by the
// site's other forms — this preserves the working lead-delivery mechanism.
const WEB3FORMS_KEY = "8bdbd83f-f6b1-47b8-b5ed-f9a3ecacabfc";
const PHONE_DISPLAY = "(786) 505-5791";
const PHONE_HREF = "tel:+17865055791";

// Border colour is left out here and added per state below, so the invalid
// border is not fighting the default one in the cascade.
const fieldClasses =
  "w-full rounded-md border bg-white/5 px-4 py-3 text-base text-white placeholder-white/50 transition-colors duration-150 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400";
const validFieldClasses = "border-white/40";
const labelClasses = "block type-label text-white/60";
// DESIGN.md defines an error colour, so the invalid border and the message
// both use it; aria-invalid still carries the state for screen readers.
const invalidFieldClasses = "border-error";
const fieldErrorClasses = "type-small mt-1.5 font-medium text-error";

// name@domain.tld, no spaces. Catches "bob@" and "bob@site" without trying
// to be a full RFC 5322 parser.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// yourbusiness.com, www.yourbusiness.co.uk, https://yourbusiness.com/page.
// The protocol is optional because the field tells people not to type it.
const URL_PATTERN = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(:\d+)?(\/\S*)?$/i;

const validate = (mode, values) => {
  const errors = {};
  if (mode === "have") {
    const url = values.websiteUrl.trim();
    if (!url) errors.websiteUrl = "Enter your website address.";
    else if (!URL_PATTERN.test(url))
      errors.websiteUrl = "Enter a website address like yourbusiness.com.";
  } else if (!values.businessName.trim()) {
    errors.businessName = "Enter your business name.";
  }
  const email = values.email.trim();
  if (!email) errors.email = "Enter your email address.";
  else if (!EMAIL_PATTERN.test(email))
    errors.email = "Enter an email address like you@business.com.";
  return errors;
};

// Order the fields appear in, so focus goes to the first one that failed.
const FIELD_ORDER = ["websiteUrl", "businessName", "email"];

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
  const [fieldErrors, setFieldErrors] = useState({});
  const hasStarted = useRef(false);
  const successHeadingRef = useRef(null);

  // The submit button disappears with the form, so move focus to the
  // confirmation instead of letting it fall back to the top of the page.
  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

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
    setFieldErrors({});
  };

  const handleChange = (field) => (event) => {
    trackStart();
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Props that tie a field to its hint and its error message for screen
  // readers. The error is listed first so it is read before the hint.
  const describeProps = (field, hintId) => {
    const ids = [fieldErrors[field] && `${field}-error`, hintId].filter(
      Boolean
    );
    return {
      ...(fieldErrors[field] && { "aria-invalid": true }),
      ...(ids.length && { "aria-describedby": ids.join(" ") }),
    };
  };
  const errorProps = (field) => describeProps(field);

  const renderFieldError = (field) =>
    fieldErrors[field] && (
      <p id={`${field}-error`} className={fieldErrorClasses}>
        {fieldErrors[field]}
      </p>
    );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const errors = validate(mode, values);
    setFieldErrors(errors);
    const firstInvalid = FIELD_ORDER.find((field) => errors[field]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
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
      className="scroll-mt-[calc(var(--header-height,68px)+8px)] section-y-lg bg-ink"
    >
      <div className="container-page">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Kicker tone="inverted">Free Website Review</Kicker>
            <h2 className="type-heading mt-3 text-white">
              Send the site. Get three things to fix.
            </h2>
            <p className="type-body mt-4 max-w-md text-white/80">
              No call, no pitch deck. One email back covering mobile
              usability, how clearly the next step is presented, and whether
              the site can be found.
            </p>

            <a
              href={PHONE_HREF}
              onClick={handlePhoneClick}
              className="mt-6 inline-flex min-h-[44px] items-center text-base font-semibold text-white transition-colors duration-150 hover:text-accent-400"
            >
              {PHONE_DISPLAY}
            </a>
            <p className="type-small mt-2 max-w-md text-white/60">
              Miami based, working with clients anywhere. Consultations
              available in English and Spanish.
            </p>
          </div>

          {/* Polite live region that exists before the swap, so the
              confirmation is announced when it replaces the form. */}
          <div className="lg:col-span-7" aria-live="polite">
            {status === "success" ? (
              <div className="border border-white/15 bg-white/5 p-6 sm:p-8">
                <h3
                  ref={successHeadingRef}
                  tabIndex={-1}
                  className="type-card text-white focus:outline-none"
                >
                  Got it, thank you.
                </h3>
                <p className="type-body mt-2 text-white/80">
                  No call required. We reply by email, usually within two
                  business days, with your 3-point review.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <fieldset>
                  <legend className="block type-label text-white">
                    Where are you starting from?
                  </legend>
                  {/* A single bordered, divided control (not two separate
                      boxes) so it reads as one decision with two mutually
                      exclusive positions, not a pair of inputs. */}
                  <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-md border border-white/15">
                    <label
                      className={`flex min-h-[52px] cursor-pointer items-center justify-center gap-1.5 px-2 text-center text-sm font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-inset has-[:focus-visible]:ring-accent-400 ${
                        mode === "have"
                          ? "bg-accent-600 text-white"
                          : "bg-transparent text-white/60 hover:text-white/80"
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
                      className={`flex min-h-[52px] cursor-pointer items-center justify-center gap-1.5 border-l border-white/15 px-2 text-center text-sm font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-inset has-[:focus-visible]:ring-accent-400 ${
                        mode === "need"
                          ? "bg-accent-600 text-white"
                          : "bg-transparent text-white/60 hover:text-white/80"
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

                <div className="mt-8 space-y-4">
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
                        {...describeProps("websiteUrl", "websiteUrl-hint")}
                        className={`mt-2 ${fieldClasses} ${
                          fieldErrors.websiteUrl ? invalidFieldClasses : validFieldClasses
                        }`}
                      />
                      {renderFieldError("websiteUrl")}
                      <p
                        id="websiteUrl-hint"
                        className="type-small mt-1 text-white/60"
                      >
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
                        {...errorProps("businessName")}
                        className={`mt-2 ${fieldClasses} ${
                          fieldErrors.businessName ? invalidFieldClasses : validFieldClasses
                        }`}
                      />
                      {renderFieldError("businessName")}
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
                      {...errorProps("email")}
                      className={`mt-2 ${fieldClasses} ${
                        fieldErrors.email ? invalidFieldClasses : validFieldClasses
                      }`}
                    />
                    {renderFieldError("email")}
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
                      className={`mt-2 ${fieldClasses} ${validFieldClasses}`}
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
                        className={`mt-2 ${fieldClasses} ${validFieldClasses}`}
                      />
                    </div>
                  )}
                </div>

                {errorMessage && (
                  <p
                    id="review-form-error"
                    role="alert"
                    className="type-small mt-4 font-medium text-error"
                  >
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn btn-primary mt-6 w-full"
                >
                  {status === "submitting"
                    ? "Sending..."
                    : "Get My Free 3-Point Review"}
                </button>

                <p className="type-small mt-3 text-white/60">
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
