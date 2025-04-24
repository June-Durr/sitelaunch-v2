import React, { useState } from "react";
import Button from "../common/Button";

const PricingCard = ({
  title,
  price,
  annualPrice,
  description,
  features,
  isPopular,
  ctaText,
  isAnnual,
}) => {
  return (
    <div
      className={`
      bg-white rounded-3xl overflow-hidden border transition-all duration-300
      ${
        isPopular
          ? "border-primary-500 shadow-lg scale-105 z-10"
          : "border-gray-200 shadow-sm hover:shadow-md"
      }
    `}
    >
      {isPopular && (
        <div className="bg-primary-500 text-white text-center py-2 text-sm font-medium">
          Most Popular
        </div>
      )}

      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>

        <div className="mb-6">
          <div className="flex items-end">
            <span className="text-4xl font-bold text-gray-900">
              ${isAnnual ? annualPrice : price}
            </span>
            <span className="text-gray-600 ml-2 pb-1">/month</span>
          </div>

          {isAnnual && (
            <p className="text-sm text-primary-500 font-medium mt-1">
              Billed annually (${annualPrice * 12}/year)
            </p>
          )}
        </div>

        <Button variant={isPopular ? "primary" : "outline"} fullWidth>
          {ctaText || "Get Started"}
        </Button>
      </div>

      <div className="border-t border-gray-100 bg-gray-50 p-8">
        <p className="font-medium text-gray-900 mb-4">What's included:</p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      title: "Standard",
      price: 49,
      annualPrice: 39,
      description: "Perfect for small businesses and entrepreneurs",
      features: [
        "Unlimited landing pages",
        "Unlimited pop-ups & alert bars",
        "Mobile-responsive templates",
        "Custom domains",
        "Lead notifications",
        "Email integration",
        "Standard support",
      ],
      ctaText: "Start Standard",
      isPopular: false,
    },
    {
      title: "Pro",
      price: 99,
      annualPrice: 79,
      description: "Advanced features for growing businesses",
      features: [
        "Everything in Standard",
        "Unlimited A/B testing",
        "Advanced analytics",
        "Online payments",
        "Unlimited team members",
        "Custom code editing",
        "Priority support",
        "Conversion consultation",
      ],
      ctaText: "Start Pro",
      isPopular: true,
    },
    {
      title: "Advanced",
      price: 199,
      annualPrice: 159,
      description: "For established businesses with high-volume needs",
      features: [
        "Everything in Pro",
        "Advanced integrations",
        "Dynamic content",
        "Dedicated account manager",
        "Compliance review",
        "Custom template design",
        "Phone support",
        "White-labeling",
      ],
      ctaText: "Start Advanced",
      isPopular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-purple-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-lg text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the plan that's right for your business and start creating
            high-converting landing pages today.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 flex items-center justify-center space-x-3">
            <span
              className={`text-sm font-medium ${
                !isAnnual ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Monthly
            </span>

            <button
              className="relative inline-flex h-6 w-12 items-center rounded-full focus:outline-none"
              onClick={() => setIsAnnual(!isAnnual)}
            >
              <span className="sr-only">Toggle billing frequency</span>
              <span
                className={`
                  absolute h-5 w-10 mx-auto rounded-full transition-colors duration-300
                  ${isAnnual ? "bg-primary-500" : "bg-gray-300"}
                `}
              />
              <span
                className={`
                  absolute mx-auto h-4 w-4 transform rounded-full bg-white transition-transform duration-300
                  ${isAnnual ? "translate-x-5" : "translate-x-1"}
                `}
              />
            </button>

            <div className="flex items-center">
              <span
                className={`text-sm font-medium ${
                  isAnnual ? "text-gray-900" : "text-gray-500"
                }`}
              >
                Annual
              </span>
              <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 mt-8 relative">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              annualPrice={plan.annualPrice}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
              ctaText={plan.ctaText}
              isAnnual={isAnnual}
            />
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-12">
          <p className="text-gray-600 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-primary-500 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            30-day money-back guarantee. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
