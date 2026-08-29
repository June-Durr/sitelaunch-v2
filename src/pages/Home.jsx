import { useEffect } from "react";
import SEOHead from "../components/common/SEOHead";
import Hero from "../components/sections/Hero";
import SelectedWorkReel from "../components/sections/SelectedWorkReel";
import GoogleTrustStrip from "../components/sections/GoogleTrustStrip";
import CaseStudies from "../components/sections/CaseStudies";
import AudiencePathways from "../components/sections/AudiencePathways";
import ServicesPricing from "../components/sections/ServicesPricing";
import WhySiteLaunch from "../components/sections/WhySiteLaunch";
import HowWeWork from "../components/sections/HowWeWork";
import FeaturedReview from "../components/sections/FeaturedReview";
import Insights from "../components/sections/Insights";
import FreeWebsiteReviewForm from "../components/sections/FreeWebsiteReviewForm";
import analytics from "../services/analytics";

const homepageStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SiteLaunch Studios",
  description:
    "SiteLaunch Studios designs and builds websites for businesses and contractors. Miami-based, working with clients anywhere.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Miami",
    addressRegion: "FL",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "25.7617",
    longitude: "-80.1918",
  },
  url: "https://sitelaunchstudios.com",
  priceRange: "$$",
  image: "https://sitelaunchstudios.com/images/logo.png",
  telephone: "+1-786-505-5791",
  sameAs: ["https://instagram.com/sitelaunchstudios"],
  areaServed: "Miami, Florida",
  availableLanguage: ["English", "Spanish"],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Starter Launch Page",
        description: "One scrolling page, up to five sections, one conversion action.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Conversion Landing Page",
        description: "Built around one offer, with the copy and the form designed together.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Business Website",
        description: "Multiple pages covering services, portfolio and contact.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Website Review",
        description: "Three specific things to fix on the site you already have.",
      },
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "5",
  },
};

const Home = () => {
  useEffect(() => {
    analytics.trackPageView("/", "Home - SiteLaunch Studios");
    // Hash-on-load scrolling (e.g. arriving at /#review) is handled
    // globally by <ScrollManager> in App.jsx, not per-page.

    let scrollTimeout;
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollPercent = Math.round(
          (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
            100
        );
        if ([25, 50, 75, 100].includes(scrollPercent)) {
          analytics.trackScroll(scrollPercent);
        }
      }, 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div>
      <SEOHead
        title="SiteLaunch Studios | Website Design & Development in Miami"
        description="SiteLaunch Studios designs and builds websites for businesses and contractors. Miami-based, working with clients anywhere. Get a free website review."
        keywords="website design Miami, web development Miami, contractor websites, small business websites, website review"
        url="https://sitelaunchstudios.com"
        image="https://sitelaunchstudios.com/images/og-image.png"
        structuredData={homepageStructuredData}
      />

      <Hero />
      <SelectedWorkReel />
      <GoogleTrustStrip />
      <CaseStudies />
      <AudiencePathways />

      <section
        id="services"
        className="scroll-mt-[calc(var(--header-height,68px)+8px)] border-t border-ink/10 bg-ivory py-12 sm:py-24 lg:py-[4.5rem]"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="lg:border-r lg:border-ink/10 lg:pr-16">
              <ServicesPricing />
            </div>
            <div>
              <WhySiteLaunch />
            </div>
          </div>
        </div>
      </section>

      <HowWeWork />
      <FeaturedReview />
      <Insights />
      <FreeWebsiteReviewForm />
    </div>
  );
};

export default Home;
