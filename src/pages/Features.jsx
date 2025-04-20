import React from "react";
import FeaturesSection from "../components/sections/Features";

const Features = () => {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="container-custom">
          <h1 className="heading-lg text-center mb-6">
            Powerful Features to Grow Your Business
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            Everything you need to create high-converting landing pages and
            capture more leads.
          </p>
        </div>
      </div>

      <FeaturesSection />

      {/* Additional feature sections could be added here */}
    </div>
  );
};

export default Features;
