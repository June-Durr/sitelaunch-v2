// Smooth-scrolls to a homepage section when already on "/". When called from
// another route (e.g. the 404 page), it navigates to "/" with the hash and
// lets the Home mount effect (see Home.jsx) finish the scroll.
export const scrollToSection = (id) => {
  if (window.location.pathname !== "/") {
    window.location.href = `/#${id}`;
    return;
  }

  const target = document.getElementById(id);
  if (!target) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  target.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
};
