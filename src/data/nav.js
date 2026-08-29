// Shared primary navigation for the Header and Footer. Items with `id` are
// in-page anchors on the homepage; items with `to` are real routes.
// /contractors/ and /about do not exist yet in this project, so those
// entries anchor to an existing homepage section instead of linking out.
// Once a dedicated route is actually built, switch that entry back to
// `to: "/that-route/"` — Header.jsx and Footer.jsx already handle both.
export const NAV_LINKS = [
  { label: "Work", id: "case-studies" },
  { label: "Services", id: "services" },
  { label: "Contractors", id: "contractors" },
  { label: "Insights", to: "/insights/" },
  { label: "About", id: "why-sitelaunch" },
];
