import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const MAX_WAIT_FRAMES = 30; // ~0.5s at 60fps - bounded, not an arbitrary timeout

// Mounted once at the app root. React Router doesn't reset scroll position
// on client-side route changes (unlike a full page load), so without this,
// navigating to a new route from a deep scroll position opens mid-page -
// e.g. clicking Insight 001 partway down the homepage previously opened the
// article near its footer.
//
// - New pathname, no hash: scroll to top (instant - "regular page
//   transitions can scroll to top without animation").
// - Hash present (same or different pathname): scroll to that element,
//   polling briefly since the target route may not have painted yet.
// - Back/forward (POP): does nothing, so the browser's native per-entry
//   scroll restoration handles it instead of fighting it.
//
// React Router reports the very first render as navigationType "POP" too
// (there's no prior action for the initial entry), so a plain POP check
// would also swallow the initial load - breaking scrollToSection's hard
// `window.location.href = "/#id"` fallback used from non-homepage routes,
// since the browser's own hash-scroll-on-load can't find a React-rendered
// target yet. isFirstRender lets that first pass still handle a hash.
const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();
  const prevPathnameRef = useRef(pathname);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const pathnameChanged = prevPathnameRef.current !== pathname;
    prevPathnameRef.current = pathname;

    const firstRender = isFirstRender.current;
    isFirstRender.current = false;

    if (navigationType === "POP" && !firstRender) return undefined;

    if (hash) {
      const id = hash.slice(1);
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      let frame = 0;
      let rafId;
      const tryScroll = () => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start",
          });
          return;
        }
        frame += 1;
        if (frame < MAX_WAIT_FRAMES) {
          rafId = requestAnimationFrame(tryScroll);
        }
      };
      rafId = requestAnimationFrame(tryScroll);
      return () => cancelAnimationFrame(rafId);
    }

    if (pathnameChanged) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    return undefined;
  }, [pathname, hash, navigationType]);

  return null;
};

export default ScrollManager;
