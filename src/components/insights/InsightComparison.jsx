// Two-column "this, versus that" table: the weak version on the left in
// muted ivory, the strong version on the right on charcoal. Used for
// claim/proof and generic/distinct. A real <table> so the pairing survives
// a screen reader and a stylesheet-less render.
const InsightComparison = ({ section }) => {
  const { heading, leftLabel, rightLabel, rows = [] } = section;

  return (
    <section className="bg-ivory py-8 sm:py-10 lg:py-14">
      <div className="container-page">
        <div className="max-w-[43.75rem] lg:ml-[8.333%]">
          {heading && (
            <h2 className="type-heading text-ink">
              {heading}
            </h2>
          )}

          <div className="mt-6 overflow-x-auto lg:mt-8">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-ink/20">
                  <th
                    scope="col"
                    className="w-1/2 py-3 pr-4 type-label text-ink/65"
                  >
                    {leftLabel}
                  </th>
                  <th
                    scope="col"
                    className="w-1/2 bg-ink py-3 pl-4 pr-4 type-label text-accent-400"
                  >
                    {rightLabel}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.left} className="border-b border-ink/20 align-top">
                    <td className="py-4 pr-4 type-prose text-ink/65">
                      {row.left}
                    </td>
                    <td className="bg-ink py-4 pl-4 pr-4 type-prose text-white">
                      {row.right}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {section.note && (
            <p className="mt-5 type-prose text-ink/80">
              {section.note}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default InsightComparison;
