// Renders one "prose" section: an optional H2 (with its leading numeral,
// e.g. "01 What do you do?", split out and set in purple per the handoff),
// a run of paragraphs, and an optional trailing <ul> of pass/fail-marked
// outcomes for sections like "Reading the answers".
//
// Self-contained (own outer container + vertical rhythm) to match how every
// other homepage section works in this project - the page just maps each
// content-data section to a component and renders them in order.
const NUMBERED_HEADING = /^(\d+)\s+(.+)$/;

const OutcomeMarker = ({ pass }) =>
  pass ? (
    <span aria-hidden="true" className="h-3.5 w-3.5 flex-none bg-accent-600" />
  ) : (
    <span aria-hidden="true" className="h-3.5 w-3.5 flex-none border-[3px] border-signal" />
  );

const InsightProse = ({ section }) => {
  const { heading, paragraphs = [], outcomes } = section;
  const match = heading ? heading.match(NUMBERED_HEADING) : null;
  // "The first paragraph of the article runs [larger]" (handoff) means the
  // article's opening paragraph specifically, not each section's first line.
  const isOpening = section.id === "opening";

  return (
    <div className="bg-ivory py-4 sm:py-5 lg:py-6">
      <div className="container-page">
        <div className="max-w-[43.75rem] lg:ml-[8.333%]">
          {heading && (
            <h2 className="type-heading text-ink">
              {match ? (
                <>
                  <span className="text-accent-600">{match[1]}</span>
                  {` ${match[2]}`}
                </>
              ) : (
                heading
              )}
            </h2>
          )}

          <div
            className={
              heading
                ? "mt-5 space-y-4 lg:mt-7 lg:space-y-5"
                : "space-y-4 lg:space-y-5"
            }
          >
            {paragraphs.map((paragraph, i) => (
              <p
                key={paragraph.slice(0, 24) + i}
                className={
                  isOpening && i === 0
                    ? "type-lead text-ink/80"
                    : "type-prose text-ink/80"
                }
              >
                {paragraph}
              </p>
            ))}

            {outcomes && (
              <ul className="list-none divide-y divide-ink/20 border-t border-ink/20">
                {outcomes.map((outcome) => (
                  <li
                    key={outcome.text.slice(0, 24)}
                    className="flex items-center gap-3 py-4 type-prose text-ink/80"
                  >
                    <OutcomeMarker pass={outcome.pass} />
                    {outcome.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightProse;
