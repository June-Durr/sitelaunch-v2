import Kicker from "../common/Kicker";

const STEPS = [
  {
    number: "01",
    title: "Review",
    description: "We look at what you have and what it needs to do.",
  },
  {
    number: "02",
    title: "Direction",
    description:
      "Structure, message and a layout you sign off before any build.",
  },
  {
    number: "03",
    title: "Build",
    description: "Mobile first, then desktop, with one revision round included.",
  },
  {
    number: "04",
    title: "Launch",
    description: "Deployment, titles and metadata, and a check on real devices.",
  },
  {
    number: "05",
    title: "Improve",
    description:
      "Changes based on what visitors actually do once it is live.",
  },
];

const Process = () => (
  <section className="border-t border-ink/10 bg-ivory py-16 sm:py-24">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Kicker as="h2">Process</Kicker>

      <div className="mt-8 grid grid-cols-1 divide-y divide-ink/10 sm:grid-cols-5 sm:divide-y-0 sm:divide-x">
        {STEPS.map((step) => (
          <div key={step.number} className="py-5 sm:px-5 sm:py-0 first:sm:pl-0">
            <span className="font-display text-2xl font-bold text-violet-600">
              {step.number}
            </span>
            <h3 className="mt-2 font-display text-lg font-semibold text-ink">
              {step.title}
            </h3>
            <p className="mt-1.5 text-sm text-ink/70">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Process;
