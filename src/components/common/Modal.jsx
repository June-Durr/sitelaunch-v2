import { useEffect, useId, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "../../utils/motion";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Centred dialog for long-form legal text. Square ivory panel per DESIGN.md:
// opacity + a small scale in (200ms), a faster exit (150ms), no bounce.
const Modal = ({ isOpen, onClose, title, children }) => {
  const titleId = useId();
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  // Callers pass inline handlers; reading the latest one through a ref keeps
  // the open effect from re-running (and stealing focus) on every render.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen) return undefined;

    // Return focus to whatever opened the dialog once it closes.
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      // Keep Tab inside the dialog while it is open.
      const focusable = panelRef.current.querySelectorAll(FOCUSABLE);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement) trigger.focus();
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            aria-hidden="true"
            className="fixed inset-0 bg-ink/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2, ease: EASE } }}
            exit={{ opacity: 0, transition: { duration: 0.15, ease: EASE } }}
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative flex max-h-[85vh] w-full max-w-2xl flex-col bg-ivory text-ink"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.2, ease: EASE } }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15, ease: EASE } }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-ink/20 py-2 pl-6 pr-2 sm:pl-8">
              <h2 id={titleId} className="type-card text-ink">
                {title}
              </h2>
              <button
                ref={closeRef}
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="flex h-11 w-11 flex-none items-center justify-center text-ink/65 transition-colors duration-150 hover:text-ink"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-6 sm:px-8">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
