import { useEffect, useRef, useState } from "react";
import Kicker from "../common/Kicker";

const StructureInterlude = () => {
  const videoRef = useRef(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let disposed = false;
    const syncPlayback = () => {
      if (disposed) return;
      if (visible && !document.hidden && !userPaused.current && !reducedMotion.matches) {
        video.muted = true;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      syncPlayback();
    }, { threshold: [0, 0.25] });
    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);
    reducedMotion.addEventListener("change", syncPlayback);
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      reducedMotion.removeEventListener("change", syncPlayback);
      video.pause();
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (video.paused) {
      userPaused.current = false;
      video.muted = true;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  return (
    <div className="border-t border-ink/10 py-10">
      <div className="grid grid-cols-1 items-center gap-8">
        <div>
          <Kicker as="h2">How We Work</Kicker>
          <p className="type-subheading mt-3 max-w-sm text-ink">
            Unclear becomes structured. Structured becomes responsive.
          </p>
        </div>
        <figure className="relative mx-auto w-full max-w-xl overflow-hidden bg-ink">
          {/* A visible poster survives desktop prerendering of this mobile-only section. */}
          <video
            ref={videoRef}
            src="/videos/structure-workflow.mp4"
            poster="/images/structure-workflow-1536.webp"
            width="1440"
            height="1440"
            muted
            loop
            playsInline
            preload="none"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            aria-label="Layered website content and layout guides beneath a finished design shown on desktop and mobile."
            className="block aspect-square h-auto w-full object-contain"
          />
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={playing ? "Pause workflow video" : "Play workflow video"}
            className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-ink/75 text-white backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-300"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              {playing ? <path d="M7 5h4v14H7zm6 0h4v14h-4z" /> : <path d="m8 5 11 7-11 7z" />}
            </svg>
          </button>
        </figure>
      </div>
    </div>
  );
};

export default StructureInterlude;
