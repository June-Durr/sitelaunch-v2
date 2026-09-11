import { useEffect } from "react";
import SEOHead from "../components/common/SEOHead";
import Hero from "../components/sections/Hero";
import SelectedWorkReel from "../components/sections/SelectedWorkReel";
import GoogleTrustStrip from "../components/sections/GoogleTrustStrip";
import CaseStudies from "../components/sections/CaseStudies";
import AudiencePathways from "../components/sections/AudiencePathways";
import ServicesPricing from "../components/sections/ServicesPricing";
import WhySiteLaunch from "../components/sections/WhySiteLaunch";
import AfterLaunch from "../components/sections/AfterLaunch";
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
    {
      "@type": "Offer",
      url: "https://sitelaunchstudios.com/services/sitelaunch-care/",
      itemOffered: {
        "@type": "Service",
        name: "SiteLaunch Care",
        description:
          "Monthly website checks, small updates, visibility reporting, and a quarterly health review.",
      },
    },
    {
      "@type": "Offer",
      url: "https://sitelaunchstudios.com/services/digital-brand-polish/",
      itemOffered: {
        "@type": "Service",
        name: "Digital Brand Polish",
        description:
          "Color, typography, logo-use, and imagery rules organized into one system for web and social.",
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
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-16">
            <div className="lg:border-r lg:border-ink/10 lg:pr-16">
              <ServicesPricing />
            </div>

            {/* Stacked-layout only. Once the two columns sit on one narrow
                scroll there is nothing marking where Services ends and "Why
                work with SiteLaunch" begins, so this draws the site's usual
                hairline with a short violet lead-in. display:none at lg
                takes it out of the grid entirely, so the desktop two-column
                layout is untouched; the mobile gap above was tightened from
                10 to 5 to absorb its height (net +2px). */}
            <div aria-hidden="true" className="lg:hidden">
              <div className="h-px w-full bg-ink/10" />
              <div className="-mt-px h-0.5 w-10 bg-violet-600" />
            </div>

            <div>
              <WhySiteLaunch />
            </div>
          </div>
        </div>
      </section>

      <AfterLaunch />

      <HowWeWork />
      <FeaturedReview />
      <Insights />
      <FreeWebsiteReviewForm />
    </div>
  );
};

export default Home;
