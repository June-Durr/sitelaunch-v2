import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToSection } from "../../utils/scroll";
import analytics from "../../services/analytics";
import { NAV_LINKS } from "../../data/nav";

const EASE = [0.16, 1, 0.3, 1];
const HIDE_AFTER_Y = 120; // don't hide near the very top of the page
const SCROLL_DELTA = 6; // ignore sub-pixel/jitter scroll movements
const MOBILE_BREAKPOINT = 768; // header hide/show is a mobile-only behavior

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
};

const barClass = "absolute left-0 h-0.5 w-6 rounded-full bg-ink";

// Three-bar icon that morphs into an X rather than swapping SVG paths.
const MenuGlyph = ({ open }) => (
  <span className="relative block h-4 w-6" aria-hidden="true">
    <motion.span
      className={barClass}
      animate={{ top: open ? 7 : 0, rotate: open ? 45 : 0 }}
      transition={{ duration: 0.25, ease: EASE }}
    />
    <motion.span
      className={barClass}
      style={{ top: 7 }}
      animate={{ opacity: open ? 0 : 1 }}
      transition={{ duration: 0.15, ease: EASE }}
    />
    <motion.span
      className={barClass}
      animate={{ top: open ? 7 : 14, rotate: open ? -45 : 0 }}
      transition={{ duration: 0.25, ease: EASE }}
    />
  </span>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const lastScrollY = useRef(0);

  // Measure the header's real height and publish it as a CSS variable so
  // <main> can offset for the switch from sticky to fixed positioning
  // (fixed is what lets the hide/show transform be a cheap, GPU-only
  // animation instead of an expensive height/layout animation).
  useLayoutEffect(() => {
    const node = headerRef.current;
    if (!node) return undefined;

    const setHeightVar = () => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${node.offsetHeight}px`
      );
    };

    setHeightVar();
    window.addEventListener("resize", setHeightVar);
    return () => window.removeEventListener("resize", setHeightVar);
  }, []);

  // Direction-aware show/hide, mobile only. Desktop keeps the header
  // permanently visible - this pass does not touch desktop composition.
  useEffect(() => {
    lastScrollY.current = window.scrollY;
    let ticking = false;

    const evaluate = () => {
      ticking = false;

      if (window.innerWidth >= MOBILE_BREAKPOINT) {
        setIsHidden(false);
        lastScrollY.current = window.scrollY;
        return;
      }

      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      if (currentY < HIDE_AFTER_Y) {
        setIsHidden(false);
      } else if (diff > SCROLL_DELTA) {
        setIsHidden(true);
      } else if (diff < -SCROLL_DELTA) {
        setIsHidden(false);
      }

      lastScrollY.current = currentY;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(evaluate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Scroll lock + Escape-to-close while the mobile menu is open.
  useEffect(() => {
    if (!isMenuOpen) return undefined;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

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

  const headerHidden = isHidden && !isMenuOpen;

  return (
    <>
      <header
        ref={headerRef}
        aria-hidden={headerHidden}
        className={`fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-ivory/95 backdrop-blur transition-transform duration-[260ms] ease-out motion-reduce:transition-none ${
          headerHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
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
            ref={menuButtonRef}
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center text-ink md:hidden"
          >
            <MenuGlyph open={isMenuOpen} />
          </button>
        </div>
      </header>

      {/* Reserve the header's height so fixed positioning doesn't cover
          the top of the page content. */}
      <div
        aria-hidden="true"
        style={{ height: "var(--header-height, 68px)" }}
      />

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Primary"
            className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-ivory md:hidden"
            style={{ top: "var(--header-height, 68px)" }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mx-auto max-w-6xl divide-y divide-ink/10 px-4 pt-2 sm:px-6"
            >
              {NAV_LINKS.map((link) => (
                <motion.li key={link.label} variants={staggerItem}>
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
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              variants={staggerItem}
              initial="hidden"
              animate="visible"
              className="mx-auto max-w-6xl px-4 pb-6 pt-4 sm:px-6"
            >
              <button
                type="button"
                onClick={() => handleReviewCta("header_mobile")}
                className="flex min-h-[44px] w-full items-center justify-center rounded-md bg-ink px-5 text-sm font-semibold text-ivory transition-colors hover:bg-ink/85"
              >
                Get a Website Review
              </button>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
