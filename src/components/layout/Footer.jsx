import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../common/Modal";
import { NAV_LINKS } from "../../data/nav";
import { scrollToSection } from "../../utils/scroll";
import analytics from "../../services/analytics";

const PHONE_DISPLAY = "(786) 505-5791";
const PHONE_HREF = "tel:+17865055791";
const INSTAGRAM_URL = "https://instagram.com/sitelaunchstudios";

// Terms only. The privacy policy moved to its own route at /privacy, because
// Google OAuth verification needs an address it can fetch and a crawler can
// follow, and a modal has neither. See src/pages/Privacy.jsx.
const legalContent = {
  terms: {
    title: "Terms of Service",
    content: `
      <div class="space-y-4">
        <p class="type-small text-ink/65">Last Updated: January 1, 2026</p>

        <h3 class="type-card pt-2 text-ink">1. Acceptance of Terms</h3>
        <p>By accessing and using the services provided by SiteLaunch Studios ("we," "us," or "our"), you agree to comply with and be bound by these Terms of Service.</p>

        <h3 class="type-card pt-2 text-ink">2. Description of Services</h3>
        <p>SiteLaunch Studios provides web design and development services as described on our website. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.</p>

        <h3 class="type-card pt-2 text-ink">3. Client Responsibilities</h3>
        <p>Clients are responsible for providing timely feedback, necessary content, and approvals as outlined in the project agreement. Delays caused by the client may affect project timelines and deliverables.</p>

        <h3 class="type-card pt-2 text-ink">4. Intellectual Property</h3>
        <p>Upon full payment, clients will own the rights to the final deliverables created specifically for their project. SiteLaunch Studios retains the right to display the work in our portfolio unless otherwise agreed upon.</p>

        <h3 class="type-card pt-2 text-ink">5. Payment Terms</h3>
        <p>Payment schedules and terms will be outlined in the project proposal or contract. Late payments may incur additional fees and affect project timelines.</p>

        <h3 class="type-card pt-2 text-ink">6. Limitation of Liability</h3>
        <p>SiteLaunch Studios shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>

        <h3 class="type-card pt-2 text-ink">7. Governing Law</h3>
        <p>These terms shall be governed by and construed in accordance with the laws of the State of Florida, without giving effect to any principles of conflicts of law.</p>
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

  const handleReviewClick = (location) => {
    analytics.trackEvent("review_cta_click", {
      category: "engagement",
      label: location,
      location,
    });
    scrollToSection("review");
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/15 bg-ink text-white">
      {/* Brand motif: the SiteLaunch mark, oversized and cropped, as a
          quiet background texture rather than a generated pattern. */}
      <img
        src="/images/sitelaunch-icon-transparent-background.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-20 h-[420px] w-auto opacity-[0.08] sm:-right-16 sm:h-[520px]"
      />

      <div className="container-page section-y relative">
        {/* Closing CTA */}
        <div className="max-w-xl border-b border-white/15 pb-8 sm:pb-14">
          <p className="type-heading-fit text-balance text-white">
            Have a site that needs work?
            <br />
            Or one that needs to exist?
          </p>
          <button
            type="button"
            onClick={() => handleReviewClick("footer_cta")}
            className="btn btn-primary mt-6 w-full sm:w-auto"
          >
            Get a Free Website Review
          </button>
        </div>

        {/* Utility grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-14 md:grid-cols-3 md:gap-10">
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
              <span className="font-display text-base font-semibold uppercase tracking-wide text-white">
                SiteLaunch Studios
              </span>
            </Link>
            <p className="type-small mt-3 max-w-xs text-white/60 sm:mt-4">
              Miami, clients anywhere.
            </p>
            <a
              href={PHONE_HREF}
              onClick={() => handlePhoneClick("footer")}
              className="type-small inline-flex min-h-[44px] items-center text-white/80 transition-colors duration-150 hover:text-white"
            >
              {PHONE_DISPLAY}
            </a>
            <p className="type-small max-w-xs text-white/60">
              Consultations in English and Spanish.
            </p>
          </div>

          <div>
            <h2 className="type-label text-white/60">
              Navigation
            </h2>
            <ul className="mt-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link
                      to={link.to}
                      className="type-small inline-flex min-h-[44px] items-center text-white/80 transition-colors duration-150 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => scrollToSection(link.id)}
                      className="type-small inline-flex min-h-[44px] items-center text-white/80 transition-colors duration-150 hover:text-white"
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="type-label text-white/60">
              Elsewhere
            </h2>
            <ul className="mt-2">
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-small inline-flex min-h-[44px] items-center text-white/80 transition-colors duration-150 hover:text-white"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 h-px w-full bg-accent-600/60 sm:mt-12" />

        <div className="type-small mt-4 flex flex-col gap-2 text-white/60 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <p>SiteLaunch Studios</p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="inline-flex min-h-[44px] items-center underline decoration-white/30 underline-offset-4 transition-colors duration-150 hover:text-white hover:decoration-accent-400"
            >
              Privacy
            </Link>
            <button
              type="button"
              onClick={() => setOpenLegal("terms")}
              className="inline-flex min-h-[44px] items-center underline decoration-white/30 underline-offset-4 transition-colors duration-150 hover:text-white hover:decoration-accent-400"
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
            className="type-body text-ink/80"
            dangerouslySetInnerHTML={{ __html: legalContent[openLegal].content }}
          />
        )}
      </Modal>
    </footer>
  );
};

export default Footer;
