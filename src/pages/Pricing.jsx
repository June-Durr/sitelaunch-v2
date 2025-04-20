import React from "react";
import PricingSection from "../components/sections/Pricing";

const Pricing = () => {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="container-custom">
          <h1 className="heading-lg text-center mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            Choose the plan that's right for your business and start creating
            high-converting landing pages today.
          </p>
        </div>
      </div>

      <PricingSection />
    </div>
  );
};

export default Pricing;
