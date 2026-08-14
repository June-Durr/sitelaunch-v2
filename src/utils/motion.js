import { useEffect, useState } from "react";

// Shared motion language for the homepage. Keep variants here and reuse them
// rather than hand-rolling one-off transitions per section. Global reduced-motion
// handling lives in App.jsx via <MotionConfig reducedMotion="user">, which makes
// framer-motion collapse transform-based motion for users who ask for it.
export const EASE = [0.16, 1, 0.3, 1];

// framer-motion's own useReducedMotion() reads the media query into a plain
// useState *once*, lazily, with no listener-driven re-render (confirmed in
// its source - it's a known one-shot snapshot, not reactive). That's fine
// for MotionConfig's internal use but not safe for our own conditional
// rendering. Use this instead wherever a component needs to branch on the
// live value - matches the pattern already proven in SelectedWorkReel.jsx.
export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(query.matches);
    const handleChange = (event) => setPrefersReducedMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
};

// Page-load hero sequence: kicker -> headline lines -> supporting copy -> CTA.
// Runs once via initial/animate (never whileInView), so it never replays when
// scrolling back to the top. Each stage's `delay` is measured from a shared
// t=0 at mount, chosen so the whole thing reads as active within ~1s:
//   kicker       0.00s -> 0.35s
//   headline L1  0.15s -> 0.70s   (500-650ms duration, per line)
//   headline L2  0.23s -> 0.78s   (+80ms stagger)
//   headline L3  0.31s -> 0.86s
//   supporting   0.45s -> 0.85s   (starts once headline is underway)
//   CTA          0.60s -> 0.95s   (short fade/rise after copy)
export const heroKicker = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: EASE } },
};

// Headline lines: overflow-hidden per line at the call site, translateY
// 24px -> 0 + fade, ~550ms, ~80ms stagger via the `custom` index. No bounce.
export const heroLine = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.15 + i * 0.08, ease: EASE },
  }),
};

export const heroCopy = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.45, ease: EASE } },
};

export const heroCta = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.6, ease: EASE } },
};

// Default section-entrance reveal for kickers/headings: opacity 0->1, y 14->0.
export const fadeRise = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

// Stagger container for list-like rows (services, process, reasons). ~60ms
// between children keeps it inside the requested 50-80ms range.
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

// Subtle masked scale-reveal for project media.
export const mediaReveal = {
  hidden: { opacity: 0, scale: 1.02 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

// Trigger entrance animations once, slightly before the element is fully
// in view, so content is settled by the time a scrolling thumb reaches it.
export const viewportOnce = { once: true, margin: "-60px" };

// Expand/collapse for accordion-style disclosures ("Details" toggles etc).
// framer-motion special-cases height:"auto" and measures it correctly.
export const accordionVariants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { height: "auto", opacity: 1, transition: { duration: 0.3, ease: EASE } },
};
