// src/components/common/SEOHead.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

const SEOHead = ({
  title = "SiteLaunch Studios - Mobile-First Web Development in Miami",
  description = "Miami's premier web development agency specializing in mobile-first, SEO-optimized websites. React development, AI integration, and digital solutions for Miami businesses.",
  keywords = "Miami web development, React developer Miami, mobile-first websites, SEO optimization Miami, web design Miami, AI integration",
  image = "https://sitelaunchstudios.com/og-image.jpg",
  url = "https://sitelaunchstudios.com",
  type = "website",
  structuredData = null,
  canonicalUrl = null,
}) => {
  const fullTitle = title.includes("SiteLaunch Studios")
    ? title
    : `${title} | SiteLaunch Studios`;
  const finalUrl = canonicalUrl || url;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={finalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:type" content={type} />

      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
