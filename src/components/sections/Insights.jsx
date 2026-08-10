import Kicker from "../common/Kicker";

// The article route below does not exist in this project yet, so the
// title and "Read Insight 001" render as plain text, not a link — do not
// wrap them in <a>/<Link>/<button> until the route is live. Future route:
// /insights/seven-second-contractor-website-test/ — once it exists, wrap
// both the h3 and the "Read Insight 001" span in
// <Link to="/insights/seven-second-contractor-website-test/">.
const Insights = () => (
  <section id="insights" className="border-t border-ink/10 bg-ivory py-16 sm:py-24">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Kicker>Insights</Kicker>
      <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
        What we notice, written down.
      </h2>

      <div className="mt-8 max-w-2xl border-t border-ink/10 pt-8">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
          001 / Contractors
        </span>
        <h3 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
          The Seven-Second Contractor Website Test
        </h3>
        <p className="mt-3 text-base text-ink/70">
          A homeowner should understand what you do, where you work and how
          to request an estimate before they scroll. When those answers are
          missing, paid traffic leaves before it does anything.
        </p>
        <span className="mt-5 inline-block text-base font-semibold text-violet-600">
          Read Insight 001
        </span>
      </div>
    </div>
  </section>
);

export default Insights;
