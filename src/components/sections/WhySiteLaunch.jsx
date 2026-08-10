const REASONS = [
  {
    title: "You talk to the person building it",
    description:
      "No account manager between the brief and the build, and no handover halfway through.",
  },
  {
    title: "Mobile decides the design",
    description:
      "The phone layout is drawn first, because that is where most visitors arrive and where most sites fall apart.",
  },
  {
    title: "Focused scope and real dates",
    description:
      "A defined build with a start and an end, so you know when the site goes live.",
  },
  {
    title: "Built to be found",
    description:
      "Page structure, titles and metadata are set up at build time rather than added later.",
  },
  {
    title: "English and Spanish",
    description:
      "Consultations in either language, which matters for a lot of businesses working in South Florida.",
  },
];

const WhySiteLaunch = () => (
  <div id="why-sitelaunch" className="scroll-mt-20">
    <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
      Why work with SiteLaunch
    </h2>

    <dl className="mt-8 divide-y divide-ink/10 border-t border-ink/10">
      {REASONS.map((reason) => (
        <div key={reason.title} className="py-5">
          <dt className="font-display text-lg font-semibold text-ink">
            {reason.title}
          </dt>
          <dd className="mt-2 max-w-md text-sm text-ink/70">
            {reason.description}
          </dd>
        </div>
      ))}
    </dl>
  </div>
);

export default WhySiteLaunch;
