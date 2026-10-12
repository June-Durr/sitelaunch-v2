import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import SelectedWorkReel from "./SelectedWorkReel";

// The reel's contract: play once when it is actually on screen, then stop.
// framer-motion also constructs an IntersectionObserver for whileInView, so
// the reel's own observer is identified by the threshold it asks for.
const REEL_THRESHOLD = 0.4;

let observers = [];
let playMock;

class MockIntersectionObserver {
  constructor(callback, options = {}) {
    this.callback = callback;
    this.options = options;
    this.disconnected = false;
    observers.push(this);
  }
  observe() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
  disconnect() {
    this.disconnected = true;
  }
}

const reelObserver = () =>
  observers.find((o) => o.options.threshold === REEL_THRESHOLD);

const scrollIntoView = (ratio = 0.9) =>
  act(() => {
    const observer = reelObserver();
    observer.callback(
      [{ isIntersecting: ratio >= REEL_THRESHOLD, intersectionRatio: ratio }],
      observer
    );
  });

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

beforeEach(() => {
  observers = [];
  setReducedMotion(false);
  // jsdom implements neither, and the component must survive both outcomes.
  playMock = vi.fn(() => Promise.resolve());
  window.HTMLMediaElement.prototype.play = playMock;
  window.HTMLMediaElement.prototype.pause = vi.fn(function pause() {
    Object.defineProperty(this, "paused", { value: true, configurable: true });
  });
  window.IntersectionObserver = MockIntersectionObserver;
  globalThis.IntersectionObserver = MockIntersectionObserver;
});

afterEach(() => {
  // vitest runs without `globals`, so Testing Library's automatic cleanup
  // never registers itself. Without this, each render leaves its DOM behind
  // and the next query finds two reels.
  cleanup();
  vi.restoreAllMocks();
});

describe("the showreel plays once and stops", () => {
  it("does not loop", () => {
    const { container } = render(<SelectedWorkReel />);
    const video = container.querySelector("video");

    expect(video).toBeTruthy();
    expect(video.hasAttribute("loop")).toBe(false);
    expect(video.loop).toBe(false);
  });

  it("keeps muted, playsInline and the poster", () => {
    const { container } = render(<SelectedWorkReel />);
    const video = container.querySelector("video");

    expect(video.muted).toBe(true);
    expect(video.hasAttribute("playsinline")).toBe(true);
    expect(video.getAttribute("poster")).toBe(
      "/images/sitelaunch-showreel-poster.webp"
    );
  });

  it("does not autoplay from the markup, so playback waits for visibility", () => {
    const { container } = render(<SelectedWorkReel />);
    const video = container.querySelector("video");

    expect(video.hasAttribute("autoplay")).toBe(false);
    expect(playMock).not.toHaveBeenCalled();
  });

  it("attempts to play only once, and only once it is 40% visible", async () => {
    render(<SelectedWorkReel />);

    const observer = reelObserver();
    expect(observer).toBeTruthy();
    expect(observer.options.threshold).toBe(REEL_THRESHOLD);

    // Partly on screen is not enough.
    await scrollIntoView(0.2);
    expect(playMock).not.toHaveBeenCalled();

    await scrollIntoView(0.9);
    expect(playMock).toHaveBeenCalledTimes(1);

    // Scrolling away and back must not start it again.
    await scrollIntoView(0.9);
    await scrollIntoView(0.9);
    expect(playMock).toHaveBeenCalledTimes(1);
    expect(observer.disconnected).toBe(true);
  });

  it("retries once from onCanPlay when the first play is rejected", async () => {
    playMock.mockRejectedValueOnce(new Error("not ready"));
    const { container } = render(<SelectedWorkReel />);
    const video = container.querySelector("video");

    await scrollIntoView();
    expect(playMock).toHaveBeenCalledTimes(1);

    // The element buffers a frame and tells us it is ready.
    await act(async () => {
      fireEvent.canPlay(video);
    });
    expect(playMock).toHaveBeenCalledTimes(2);

    // Exactly one retry: further canplay events do not keep trying.
    await act(async () => {
      fireEvent.canPlay(video);
      fireEvent.canPlay(video);
    });
    expect(playMock).toHaveBeenCalledTimes(2);
  });

  it("does not retry on canPlay when the first play succeeded", async () => {
    const { container } = render(<SelectedWorkReel />);
    const video = container.querySelector("video");

    await scrollIntoView();
    await act(async () => {
      fireEvent.canPlay(video);
    });

    expect(playMock).toHaveBeenCalledTimes(1);
  });

  it("tracks real playback state from the video's own events", async () => {
    const { container } = render(<SelectedWorkReel />);
    const video = container.querySelector("video");

    // Before anything plays, the control offers play, not pause.
    expect(screen.getByRole("button", { name: /play showreel/i })).toBeTruthy();

    await act(async () => {
      fireEvent.play(video);
    });
    expect(screen.getByRole("button", { name: /pause showreel/i })).toBeTruthy();

    await act(async () => {
      fireEvent.pause(video);
    });
    expect(screen.getByRole("button", { name: /play showreel/i })).toBeTruthy();
  });

  it("shows the replay control once the reel has ended, and stays stopped", async () => {
    const { container } = render(<SelectedWorkReel />);
    const video = container.querySelector("video");

    await scrollIntoView();
    await act(async () => {
      fireEvent.play(video);
    });
    await act(async () => {
      fireEvent.ended(video);
    });

    expect(screen.getByRole("button", { name: /replay showreel/i })).toBeTruthy();
    expect(
      screen.queryByRole("button", { name: /pause showreel/i })
    ).toBeNull();
    // It stopped on its own; nothing restarted it.
    expect(playMock).toHaveBeenCalledTimes(1);
  });

  it("replays from the start when the control is pressed after ending", async () => {
    const { container } = render(<SelectedWorkReel />);
    const video = container.querySelector("video");
    Object.defineProperty(video, "paused", { value: true, configurable: true });
    Object.defineProperty(video, "ended", { value: true, configurable: true });

    await scrollIntoView();
    await act(async () => {
      fireEvent.play(video);
      fireEvent.ended(video);
    });

    video.currentTime = 12;
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /replay showreel/i }));
    });

    expect(video.currentTime).toBe(0);
    expect(playMock).toHaveBeenCalledTimes(2);
  });
});

describe("reduced motion", () => {
  it("shows only the poster and never plays", async () => {
    setReducedMotion(true);
    const { container } = render(<SelectedWorkReel />);

    expect(container.querySelector("video")).toBeNull();
    const poster = screen.getByAltText("Selected SiteLaunch website projects");
    expect(poster.getAttribute("src")).toBe(
      "/images/sitelaunch-showreel-poster.webp"
    );

    // Even if the section scrolls into view, nothing is asked to play.
    const observer = reelObserver();
    if (observer) {
      await act(async () => {
        observer.callback([{ isIntersecting: true, intersectionRatio: 1 }], observer);
      });
    }
    expect(playMock).not.toHaveBeenCalled();

    // No playback control is offered either.
    expect(screen.queryByRole("button", { name: /showreel/i })).toBeNull();
  });
});
