import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../common/Modal";
import { NAV_LINKS } from "../../data/nav";
import { scrollToSection } from "../../utils/scroll";
import analytics from "../../services/analytics";

const PHONE_DISPLAY = "(786) 505-5791";
const PHONE_HREF = "tel:+17865055791";
const INSTAGRAM_URL = "https://instagram.com/sitelaunchstudios";

const legalContent = {
  terms: {
    title: "Terms of Service",
    content: `
      <div class="space-y-4">
        <p class="font-semibold">Last Updated: January 1, 2026</p>

        <h3 class="font-semibold text-lg">1. Acceptance of Terms</h3>
        <p>By accessing and using the services provided by SiteLaunch Studios ("we," "us," or "our"), you agree to comply with and be bound by these Terms of Service.</p>

        <h3 class="font-semibold text-lg">2. Description of Services</h3>
        <p>SiteLaunch Studios provides web design and development services as described on our website. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.</p>

        <h3 class="font-semibold text-lg">3. Client Responsibilities</h3>
        <p>Clients are responsible for providing timely feedback, necessary content, and approvals as outlined in the project agreement. Delays caused by the client may affect project timelines and deliverables.</p>

        <h3 class="font-semibold text-lg">4. Intellectual Property</h3>
        <p>Upon full payment, clients will own the rights to the final deliverables created specifically for their project. SiteLaunch Studios retains the right to display the work in our portfolio unless otherwise agreed upon.</p>

        <h3 class="font-semibold text-lg">5. Payment Terms</h3>
        <p>Payment schedules and terms will be outlined in the project proposal or contract. Late payments may incur additional fees and affect project timelines.</p>

        <h3 class="font-semibold text-lg">6. Limitation of Liability</h3>
        <p>SiteLaunch Studios shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>

        <h3 class="font-semibold text-lg">7. Governing Law</h3>
        <p>These terms shall be governed by and construed in accordance with the laws of the State of Florida, without giving effect to any principles of conflicts of law.</p>
      </div>
    `,
  },
  privacy: {
    title: "Privacy Policy",
    content: `
      <div class="space-y-4">
        <p class="font-semibold">Last Updated: January 1, 2026</p>

        <h3 class="font-semibold text-lg">1. Information We Collect</h3>
        <p>We collect information you provide when you contact us through forms, email, or phone, including your name, email address, phone number, and any other information you choose to provide.</p>

        <h3 class="font-semibold text-lg">2. How We Use Your Information</h3>
        <p>We use the information we collect to respond to your inquiries, provide our services, and comply with legal obligations. Your details are not shared with third parties or added to a marketing list.</p>

        <h3 class="font-semibold text-lg">3. Cookies and Tracking</h3>
        <p>Our website uses analytics tools to understand how visitors use our site. Form field values, including names, emails, phone numbers, and message text, are never sent to analytics.</p>

        <h3 class="font-semibold text-lg">4. Data Security</h3>
        <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>

        <h3 class="font-semibold text-lg">5. Your Rights</h3>
        <p>Depending on your location, you may have rights regarding your personal information, including the right to access, correct, or delete your data.</p>

        <p>For questions about this Privacy Policy, please contact us by phone at <a href="${PHONE_HREF}" class="text-violet-600 hover:underline">${PHONE_DISPLAY}</a>.</p>
      </div>
    `,
  },
};

const Footer = () => {
  const [openLegal, setOpenLegal] = useState(null);

  const handlePhoneClick = (location) => {
    analytics.trackEvent("click_phone", {
      category: "contact",
      label: location,
    });
  };

  const handleReviewClick = () => {
    analytics.trackEvent("review_cta_click", {
      category: "engagement",
      label: "footer",
      location: "footer",
    });
    scrollToSection("review");
  };

  return (
    <footer className="border-t border-ink/10 bg-ivory text-ink">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/images/sitelaunch-icon-transparent-background.svg"
                alt=""
                className="h-7 w-auto"
                width="22"
                height="32"
                loading="lazy"
              />
              <span className="font-display text-base font-semibold uppercase tracking-wide text-ink">
                SiteLaunch Studios
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-ink/70">
              Miami-based, working with clients anywhere.
            </p>
            <p className="mt-2 max-w-xs text-sm text-ink/70">
              Consultations available in English and Spanish.
            </p>
          </div>

          {/* Site nav */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/50">
              Site
            </h3>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link
                      to={link.to}
                      className="text-sm text-ink/80 hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => scrollToSection(link.id)}
                      className="text-sm text-ink/80 hover:text-ink"
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/50">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={PHONE_HREF}
                  onClick={() => handlePhoneClick("footer")}
                  className="text-sm text-ink/80 hover:text-ink"
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleReviewClick}
                  className="text-sm text-ink/80 hover:text-ink"
                >
                  Free website review
                </button>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink/80 hover:text-ink"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-violet-600/60" />

        <div className="mt-6 flex flex-col gap-3 text-sm text-ink/60 sm:flex-row sm:items-center sm:justify-between">
          <p>SiteLaunch Studios</p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setOpenLegal("privacy")}
              className="underline decoration-ink/30 underline-offset-2 hover:text-ink hover:decoration-violet-600"
            >
              Privacy
            </button>
            <button
              type="button"
              onClick={() => setOpenLegal("terms")}
              className="underline decoration-ink/30 underline-offset-2 hover:text-ink hover:decoration-violet-600"
            >
              Terms
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={openLegal !== null}
        onClose={() => setOpenLegal(null)}
        title={openLegal ? legalContent[openLegal].title : ""}
      >
        {openLegal && (
          <div
            className="prose prose-sm max-w-none text-gray-600"
            dangerouslySetInnerHTML={{ __html: legalContent[openLegal].content }}
          />
        )}
      </Modal>
    </footer>
  );
};

export default Footer;
