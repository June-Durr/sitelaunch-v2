import { useState } from "react";
import { Link } from "react-router-dom";
import { scrollToSection } from "../../utils/scroll";
import analytics from "../../services/analytics";
import { NAV_LINKS } from "../../data/nav";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (id) => {
    setIsMenuOpen(false);
    scrollToSection(id);
  };

  const handleReviewCta = (location) => {
    setIsMenuOpen(false);
    analytics.trackEvent("review_cta_click", {
      category: "engagement",
      label: location,
      location,
    });
    scrollToSection("review");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 md:py-4 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src="/images/sitelaunch-icon-transparent-background.svg"
            alt=""
            className="h-7 w-auto"
            width="22"
            height="32"
            loading="eager"
            fetchpriority="high"
          />
          <span className="font-display text-base font-semibold uppercase tracking-wide text-ink">
            SiteLaunch
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) =>
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm font-medium text-ink/80 transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className="text-sm font-medium text-ink/80 transition-colors hover:text-ink"
              >
                {link.label}
              </button>
            )
          )}
        </nav>

        <div className="hidden md:block">
          <button
            type="button"
            onClick={() => handleReviewCta("header")}
            className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-ink px-5 text-sm font-semibold text-ivory transition-colors hover:bg-ink/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
          >
            Get a Website Review
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center text-ink md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav panel */}
      {isMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-ink/10 bg-ivory md:hidden"
        >
          <ul className="mx-auto max-w-6xl divide-y divide-ink/10 px-4 sm:px-6">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {link.to ? (
                  <Link
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex min-h-[44px] items-center text-base font-medium text-ink"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.id)}
                    className="flex min-h-[44px] w-full items-center text-left text-base font-medium text-ink"
                  >
                    {link.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
          <div className="mx-auto max-w-6xl px-4 pb-4 pt-2 sm:px-6">
            <button
              type="button"
              onClick={() => handleReviewCta("header_mobile")}
              className="flex min-h-[44px] w-full items-center justify-center rounded-md bg-ink px-5 text-sm font-semibold text-ivory transition-colors hover:bg-ink/85"
            >
              Get a Website Review
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
