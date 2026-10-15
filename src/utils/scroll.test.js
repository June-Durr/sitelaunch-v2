import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { scrollToSection, isScrollAnimationActive } from "./scroll";

/**
 * The contract that separates a controlled scroll from scroll hijacking:
 * nothing listens to wheel or touch in order to change the page position, the
 * animation yields to the person the instant they do anything, and reduced
 * motion gets no animation at all.
 *
 * Duration and easing are measured in a real browser (.qa/scroll-check.mjs),
 * because jsdom has no layout and no frame clock worth timing.
 */

const setReducedMotion = (reduce) => {
  window.matchMedia = (query) => ({
    matches: reduce,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
};

const addSection = (id, top) => {
  const el = document.createElement("div");
  el.id = id;
  el.getBoundingClientRect = () => ({
    top, bottom: top + 100, left: 0, right: 0, width: 0, height: 100, x: 0, y: top,
  });
  document.body.appendChild(el);
  return el;
};

beforeEach(() => {
  setReducedMotion(false);
  window.scrollTo = vi.fn();
  Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });
  window.history.replaceState({}, "", "/");
});

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("scrolling to a section", () => {
  it("does nothing when the section is not on the page", () => {
    scrollToSection("not-a-section");
    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(isScrollAnimationActive()).toBe(false);
  });

  it("jumps straight there under reduced motion, with no animation", () => {
    setReducedMotion(true);
    addSection("services", 3500);

    scrollToSection("services");

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    // 3500 minus the header offset, which falls back to 68 + 8 when the
    // variable the header publishes is not set.
    expect(window.scrollTo).toHaveBeenCalledWith(0, 3500 - 76);
    expect(isScrollAnimationActive()).toBe(false);
  });

  it("never scrolls above the top of the document", () => {
    setReducedMotion(true);
    addSection("hero", 10);

    scrollToSection("hero");

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("animates when motion is allowed", () => {
    addSection("services", 3500);
    scrollToSection("services");
    expect(isScrollAnimationActive()).toBe(true);
  });
});

describe("the animation yields to the person", () => {
  for (const [label, event] of [
    ["a wheel", () => new WheelEvent("wheel", { deltaY: 120 })],
    ["a touch", () => new Event("touchstart")],
    ["a key press", () => new KeyboardEvent("keydown", { key: "ArrowDown" })],
    ["a pointer press", () => new Event("pointerdown")],
  ]) {
    it(`stops on ${label}`, () => {
      addSection("services", 3500);
      scrollToSection("services");
      expect(isScrollAnimationActive()).toBe(true);

      window.dispatchEvent(event());
      expect(isScrollAnimationActive()).toBe(false);
    });
  }

  it("does not preventDefault on wheel or touch, so ordinary scrolling is untouched", () => {
    addSection("services", 3500);
    scrollToSection("services");

    const wheel = new WheelEvent("wheel", { deltaY: 120, cancelable: true });
    window.dispatchEvent(wheel);
    expect(wheel.defaultPrevented).toBe(false);

    scrollToSection("services");
    const touch = new Event("touchstart", { cancelable: true });
    window.dispatchEvent(touch);
    expect(touch.defaultPrevented).toBe(false);
  });

  it("starting a second jump replaces the first rather than racing it", () => {
    addSection("services", 3500);
    addSection("review", 6000);

    scrollToSection("services");
    scrollToSection("review");
    expect(isScrollAnimationActive()).toBe(true);

    // One cancel ends everything: there is only ever one animation.
    window.dispatchEvent(new WheelEvent("wheel", { deltaY: 1 }));
    expect(isScrollAnimationActive()).toBe(false);
  });
});
