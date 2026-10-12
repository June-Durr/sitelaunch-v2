import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SEOHead from "../components/common/SEOHead";
import InsightHero from "../components/insights/InsightHero";
import InsightProse from "../components/insights/InsightProse";
import InsightDiagnostic from "../components/insights/InsightDiagnostic";
import InsightPullStatement from "../components/insights/InsightPullStatement";
import InsightFixOrder from "../components/insights/InsightFixOrder";
import InsightComparison from "../components/insights/InsightComparison";
import InsightChecklist from "../components/insights/InsightChecklist";
import InsightFigure from "../components/insights/InsightFigure";
import InsightFaq from "../components/insights/InsightFaq";
import InsightNav from "../components/insights/InsightNav";
import InsightCTA from "../components/insights/InsightCTA";
import NotFound from "./NotFound";
import { getInsightBySlug, getAdjacentInsights } from "../data/insights";
import {
  SITE_URL,
  canonicalFor,
  findRenderedFaq,
  buildInsightSchema,
} from "./insightSchema";
import analytics from "../services/analytics";

const SECTION_COMPONENTS = {
  prose: InsightProse,
  diagnostic: InsightDiagnostic,
  pullStatement: InsightPullStatement,
  fixOrder: InsightFixOrder,
  comparison: InsightComparison,
  checklist: InsightChecklist,
  figure: InsightFigure,
  faq: InsightFaq,
};

const InsightArticle = () => {
  const { slug } = useParams();
  const insight = getInsightBySlug(slug);

  useEffect(() => {
    if (!insight) return;
    analytics.trackPageView(
      `/insights/${insight.slug}/`,
      `${insight.title} - SiteLaunch Studios`
    );
  }, [insight]);

  if (!insight) {
    return <NotFound />;
  }

  const canonicalUrl = canonicalFor(insight);
  const coverUrl = `${SITE_URL}${insight.coverImage}`;
  const { previous, next, others } = getAdjacentInsights(insight.slug);

  // FAQPage schema is emitted only for an FAQ this page actually renders, so
  // the structured answers are always answers a visitor can read.
  const faqSection = findRenderedFaq(
    insight,
    new Set(Object.keys(SECTION_COMPONENTS))
  );
  const structuredData = buildInsightSchema(insight, faqSection);

  return (
    <article>
      <SEOHead
        title={insight.seoTitle || insight.title}
        description={insight.seoDescription || insight.deck}
        keywords={insight.keywords}
        url={canonicalUrl}
        canonicalUrl={canonicalUrl}
        image={coverUrl}
        type="article"
        structuredData={structuredData}
      />

      <InsightHero insight={insight} />

      {insight.sections.map((section, index) => {
        const Component = SECTION_COMPONENTS[section.type];
        if (!Component) return null;
        const key = section.id || section.heading || `section-${index}`;
        if (section.type === "pullStatement") {
          return <Component key={key} text={section.text} />;
        }
        return <Component key={key} section={section} />;
      })}

      <InsightNav previous={previous} next={next} others={others} />

      <InsightCTA cta={insight.cta} />
    </article>
  );
};

export default InsightArticle;
