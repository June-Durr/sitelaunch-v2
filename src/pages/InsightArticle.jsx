import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SEOHead from "../components/common/SEOHead";
import InsightHero from "../components/insights/InsightHero";
import InsightProse from "../components/insights/InsightProse";
import InsightDiagnostic from "../components/insights/InsightDiagnostic";
import InsightPullStatement from "../components/insights/InsightPullStatement";
import InsightFixOrder from "../components/insights/InsightFixOrder";
import InsightGallery from "../components/insights/InsightGallery";
import InsightCTA from "../components/insights/InsightCTA";
import NotFound from "./NotFound";
import { getInsightBySlug } from "../data/insights";
import analytics from "../services/analytics";

const SITE_URL = "https://sitelaunchstudios.com";

const SECTION_COMPONENTS = {
  prose: InsightProse,
  diagnostic: InsightDiagnostic,
  pullStatement: InsightPullStatement,
  fixOrder: InsightFixOrder,
  gallery: InsightGallery,
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

  const canonicalUrl = `${SITE_URL}/insights/${insight.slug}/`;
  const coverUrl = `${SITE_URL}${insight.coverImage}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.deck,
    image: coverUrl,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    datePublished: "2026-08",
    publisher: {
      "@type": "Organization",
      name: "SiteLaunch Studios",
    },
  };

  return (
    <article>
      <SEOHead
        title={`${insight.title} | SiteLaunch Studios`}
        description={insight.deck}
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

      <InsightCTA cta={insight.cta} />
    </article>
  );
};

export default InsightArticle;
