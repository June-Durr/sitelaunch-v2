import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Kicker from "../common/Kicker";
import { mediaReveal, viewportOnce } from "../../utils/motion";

const DESKTOP_REEL = "/videos/sitelaunch-showreel-2026.mp4";
const MOBILE_REEL = "/videos/sitelaunch-showreel-2026-mobile-v3.mp4";
const REEL_POSTER = "/images/sitelaunch-showreel-poster.webp";

// Fraction of the reel that must be on screen before the one automatic play
// attempt is made.
const VISIBLE_ENOUGH = 0.4;

// The reel plays once, muted and inline, when it comes into view, and then
// stops on its last frame.
//
// Three things this deliberately does NOT do:
//   - loop. It is a 22 second showreel, not a background texture.
//   - trust `autoPlay`. That fires at load, which is usually off screen, and
//     gives no way to know whether playback actually started.
//   - treat "we asked it to play" as "it is playing". `isPlaying` comes from
//     the video's own play/pause/ended events, so the control always matches
//     what the element is really doing.
//
// A first play() can be rejected simply because `preload="metadata"` has not
// buffered a frame yet. That is recoverable, so one retry is allowed from
// onCanPlay. Autoplay blocked by policy rejects the retry too, and the reel
// then just waits behind its poster with a working play button.
//
// No session flag: "once" means once per mount. The observer disconnects the
// moment it fires, so scrolling away and back never starts it again.
// React sets `muted` as a DOM property, never as an attribute, and it does
// not re-apply it when hydrating prerendered markup. A video that is not
// muted is refused autoplay by every browser's policy, so assert it right
// before asking it to play rather than trusting the JSX prop to have landed.
const startPlayback = (video) => {
  video.muted = true;
  const started = video.play();
  return started && typeof started.catch === "function" ? started : null;
};

const SelectedWorkReel = () => {
  const videoRef = useRef(null);
  const frameRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const autoPlayAttemptedRef = useRef(false);
  const retryPendingRef = useRef(false);
  const retryUsedRef = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(query.matches);

    const handleChange = (event) => setPrefersReducedMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    if (autoPlayAttemptedRef.current) return undefined;

    // The build's prerender pass scrolls a headless browser through the whole
    // page, which would start the reel and bake a mid-playback "Pause
    // showreel" control into the shipped HTML. React's first render on the
    // visitor's machine says "Play showreel", and the two disagree, which is
    // a hydration mismatch and a console error on every load. Automated
    // browsers therefore get the poster and an idle control, the same as a
    // reduced-motion visitor. Same `navigator.webdriver` guard the analytics
    // bootstrap already uses.
    if (typeof navigator !== "undefined" && navigator.webdriver) return undefined;

    const frame = frameRef.current;
    if (!frame || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (!entry || !entry.isIntersecting) return;

        // Disconnect before playing, so a second entry in the same batch
        // cannot queue a second attempt.
        observer.disconnect();
        if (autoPlayAttemptedRef.current) return;
        autoPlayAttemptedRef.current = true;

        const video = videoRef.current;
        if (!video) return;

        const started = startPlayback(video);
        if (started) {
          started.catch(() => {
            // Possibly just "no frame buffered yet". Let onCanPlay try once.
            retryPendingRef.current = true;
          });
        }
      },
      { threshold: VISIBLE_ENOUGH }
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  // The single retry. Anything after this is the visitor's to start.
  const handleCanPlay = () => {
    if (!retryPendingRef.current || retryUsedRef.current) return;
    retryPendingRef.current = false;
    retryUsedRef.current = true;

    const video = videoRef.current;
    if (!video) return;
    const started = startPlayback(video);
    if (started) started.catch(() => {});
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      if (video.ended || hasEnded) video.currentTime = 0;
      const started = startPlayback(video);
      if (started) started.catch(() => {});
    } else {
      video.pause();
    }
  };

  const controlLabel = isPlaying
    ? "Pause showreel"
    : hasEnded
      ? "Replay showreel"
      : "Play showreel";

  return (
    <section
      id="reel"
      aria-label="SiteLaunch Studios showreel"
      className="scroll-mt-[calc(var(--header-height,68px)+8px)] bg-ivory pb-8 pt-1 sm:pb-20 sm:pt-2"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 hidden items-center justify-between sm:flex">
          <Kicker>Selected Work / 2026 Reel</Kicker>
          <span className="font-display text-sm font-semibold text-ink/65">
            00:22
          </span>
        </div>

        <motion.div
          className="relative overflow-hidden rounded-lg bg-ink sm:rounded-none"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={mediaReveal}
        >
          <div ref={frameRef} className="aspect-[3/4] w-full sm:aspect-video">
            {prefersReducedMotion ? (
              <img
                src={REEL_POSTER}
                alt="Selected SiteLaunch website projects"
                className="h-full w-full object-cover object-center"
                width={1920}
                height={1080}
                loading="eager"
                fetchpriority="high"
              />
            ) : (
              <video
                ref={videoRef}
                className="h-full w-full object-cover object-center"
                poster={REEL_POSTER}
                muted
                playsInline
                preload="metadata"
                aria-hidden="true"
                onPlay={() => {
                  setIsPlaying(true);
                  setHasEnded(false);
                }}
                onPause={() => setIsPlaying(false)}
                onEnded={() => {
                  setIsPlaying(false);
                  setHasEnded(true);
                }}
                onCanPlay={handleCanPlay}
              >
                <source
                  src={MOBILE_REEL}
                  media="(max-width: 639px)"
                  type="video/mp4"
                />
                <source src={DESKTOP_REEL} type="video/mp4" />
              </video>
            )}
          </div>

          {!prefersReducedMotion && (
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={controlLabel}
              className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-ink/75 text-white backdrop-blur-sm transition-colors hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-4 sm:top-4"
            >
              {isPlaying ? (
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
                  <path d="M1 1v12M11 1v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
                  <path d="m1 1 10 6-10 6V1Z" fill="currentColor" />
                </svg>
              )}
            </button>
          )}

        </motion.div>
      </div>
    </section>
  );
};

export default SelectedWorkReel;
