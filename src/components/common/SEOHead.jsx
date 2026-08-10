// src/components/common/SEOHead.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

const SEOHead = ({
  title = "SiteLaunch Studios | Website Design & Development in Miami",
  description = "SiteLaunch Studios designs and builds websites for businesses and contractors. Miami-based, working with clients anywhere.",
  keywords = "website design Miami, web development Miami, contractor websites, small business websites, website review",
  image = "https://sitelaunchstudios.com/images/og-image.png",
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
