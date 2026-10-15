/**
 * Scrolling to a section when a nav item or a call to action is clicked.
 *
 * WHY THIS IS NOT scrollIntoView({ behavior: "smooth" }) ANY MORE
 *
 * It was, and the result is not adjustable. `scroll-behavior` takes only
 * `auto` or `smooth`, and no shipped browser has a property for the duration
 * or the easing of a native smooth scroll. Chrome settles a 3500px jump on
 * this homepage in about 970ms on a curve that leaves fast and arrives
 * abruptly, and there is no parameter anywhere that changes it.
 *
 * So the jump is animated here instead, which is the only way to control it.
 *
 * WHAT THIS DELIBERATELY DOES NOT DO
 *
 * It does not touch ordinary scrolling. There is no wheel listener, no touch
 * listener that prevents anything, and no scroll handler that repositions the
 * page. A wheel, a trackpad, a scrollbar drag, space, Page Down and the arrow
 * keys all behave exactly as the browser intends, because nothing here runs
 * unless somebody clicks a link that points at a section.
 *
 * The animation yields immediately to the person. Any wheel, touch, key or
 * pointer input cancels it where it stands rather than fighting for the
 * scroll position, which is the behaviour that separates this from scroll
 * hijacking. Starting a second jump cancels the first for the same reason.
 */

/** Gentle at both ends. Long jumps need the deceleration most. */
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Longer than the browser's own, but scaled so a short hop does not crawl.
 *
 * The ceiling matters more than the floor: past about 1.3 seconds a scroll
 * stops reading as a transition and starts reading as a wait.
 */
const MIN_MS = 450;
const MAX_MS = 1250;
const durationFor = (distance) =>
  Math.min(MAX_MS, Math.max(MIN_MS, 400 + Math.abs(distance) * 0.22));

let activeScroll = null;

function cancelActiveScroll() {
  if (!activeScroll) return;
  activeScroll.cancel();
  activeScroll = null;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * How far above the target to stop, so the fixed header does not cover it.
 *
 * The sections carry `scroll-mt-[calc(var(--header-height)+8px)]`, but CSS
 * scroll-margin only applies to scrollIntoView and scroll snapping, not to a
 * scrollTo, so the same figure is read back from the variable the header
 * publishes and applied here.
 */
function headerOffset() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(
    "--header-height"
  );
  const height = Number.parseFloat(raw);
  return (Number.isFinite(height) ? height : 68) + 8;
}

function animateScrollTo(targetY) {
  cancelActiveScroll();

  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return;

  const duration = durationFor(distance);
  const startedAt = performance.now();
  let frame = 0;

  const stop = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchstart", stop);
    window.removeEventListener("keydown", stop);
    window.removeEventListener("pointerdown", stop);
    if (activeScroll && activeScroll.cancel === stop) activeScroll = null;
  };

  // Passive: these only ever cancel, they never preventDefault, so the
  // browser is free to scroll on the very same event that stops us.
  window.addEventListener("wheel", stop, { passive: true });
  window.addEventListener("touchstart", stop, { passive: true });
  window.addEventListener("keydown", stop);
  window.addEventListener("pointerdown", stop, { passive: true });

  activeScroll = { cancel: stop };

  const step = (now) => {
    const progress = Math.min(1, (now - startedAt) / duration);
    window.scrollTo(0, Math.round(startY + distance * easeInOutCubic(progress)));
    if (progress < 1) frame = requestAnimationFrame(step);
    else stop();
  };

  frame = requestAnimationFrame(step);
}

/**
 * Scroll to a homepage section. When called from another route (the 404 page,
 * an article), navigate to "/" with the hash and let Home's mount effect
 * finish the job.
 */
export const scrollToSection = (id) => {
  if (window.location.pathname !== "/") {
    window.location.href = `/#${id}`;
    return;
  }

  const target = document.getElementById(id);
  if (!target) return;

  const targetY = Math.max(
    0,
    target.getBoundingClientRect().top + window.scrollY - headerOffset()
  );

  if (prefersReducedMotion()) {
    cancelActiveScroll();
    window.scrollTo(0, targetY);
    return;
  }

  animateScrollTo(targetY);
};

/** Exported for tests: is a programmatic scroll running right now? */
export const isScrollAnimationActive = () => activeScroll !== null;
