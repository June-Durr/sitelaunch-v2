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
    <span aria-hidden="true" className="h-3.5 w-3.5 flex-none bg-violet-600" />
  ) : (
    <span aria-hidden="true" className="h-3.5 w-3.5 flex-none border-[3px] border-[#D95D5D]" />
  );

const InsightProse = ({ section }) => {
  const { heading, paragraphs = [], outcomes } = section;
  const match = heading ? heading.match(NUMBERED_HEADING) : null;
  // "The first paragraph of the article runs [larger]" (handoff) means the
  // article's opening paragraph specifically, not each section's first line.
  const isOpening = section.id === "opening";

  return (
    <div className="bg-ivory py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-[43.75rem] lg:ml-[8.333%]">
          {heading && (
            <h2 className="font-display text-2xl font-bold leading-[1.1] tracking-[-0.025em] text-ink lg:text-[2.125rem]">
              {match ? (
                <>
                  <span className="text-violet-600">{match[1]}</span>
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
                ? "mt-5 space-y-[1.125rem] lg:mt-7 lg:space-y-5"
                : "space-y-[1.125rem] lg:space-y-5"
            }
          >
            {paragraphs.map((paragraph, i) => (
              <p
                key={paragraph.slice(0, 24) + i}
                className={
                  isOpening && i === 0
                    ? "text-[1.125rem] leading-[1.6] text-[#2A2926] lg:text-[1.3125rem] lg:leading-[1.6]"
                    : "text-[1.0625rem] leading-[1.7] text-[#2A2926] lg:text-[1.1875rem]"
                }
              >
                {paragraph}
              </p>
            ))}

            {outcomes && (
              <ul className="list-none divide-y divide-ink/[0.18] border-t border-ink/[0.18]">
                {outcomes.map((outcome) => (
                  <li
                    key={outcome.text.slice(0, 24)}
                    className="flex items-center gap-3 py-4 text-[1.0625rem] leading-[1.5] text-[#2A2926] lg:text-[1.1875rem]"
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
