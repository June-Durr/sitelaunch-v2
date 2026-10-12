// Two-column "this, versus that" table: the weak version on the left in
// muted ivory, the strong version on the right on charcoal. Used for
// claim/proof and generic/distinct. A real <table> so the pairing survives
// a screen reader and a stylesheet-less render.
const InsightComparison = ({ section }) => {
  const { heading, leftLabel, rightLabel, rows = [] } = section;

  return (
    <section className="bg-ivory py-8 sm:py-10 lg:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-[43.75rem] lg:ml-[8.333%]">
          {heading && (
            <h2 className="font-display text-2xl font-bold leading-[1.1] tracking-[-0.025em] text-ink lg:text-[2.125rem]">
              {heading}
            </h2>
          )}

          <div className="mt-5 overflow-x-auto lg:mt-7">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-ink/[0.18]">
                  <th
                    scope="col"
                    className="w-1/2 py-3 pr-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink/45"
                  >
                    {leftLabel}
                  </th>
                  <th
                    scope="col"
                    className="w-1/2 bg-ink py-3 pl-4 pr-4 text-xs font-semibold uppercase tracking-[0.14em] text-violet-400"
                  >
                    {rightLabel}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.left} className="border-b border-ink/[0.18] align-top">
                    <td className="py-4 pr-4 text-[1.0625rem] leading-[1.5] text-[#5C5952] sm:text-[1.1875rem]">
                      {row.left}
                    </td>
                    <td className="bg-ink py-4 pl-4 pr-4 text-[1.0625rem] leading-[1.5] text-ivory sm:text-[1.1875rem]">
                      {row.right}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {section.note && (
            <p className="mt-5 text-[1.0625rem] leading-[1.7] text-[#2A2926] lg:text-[1.1875rem]">
              {section.note}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default InsightComparison;
