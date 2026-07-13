import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "../common/Button";
import ContactForm from "../common/ContactForm";
import Modal from "../common/Modal";

const ServiceTierCard = ({ tier, isActive, onClick }) => {
  const features = tier.features;

  return (
    <motion.div
      className={`relative bg-white rounded-3xl overflow-hidden border transition-[border-color,box-shadow,transform] duration-300 h-full ${
        isActive
          ? "border-primary-500 shadow-lg scale-105 z-10"
          : "border-gray-200 shadow-sm hover:shadow-md"
      }`}
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ willChange: "opacity, transform" }}
      suppressHydrationWarning
      onClick={(e) => onClick(tier.id, e)}
    >
      <div className="p-8">
        <span className="inline-block text-primary-600 font-semibold tracking-wider text-sm uppercase">
          {tier.label}
        </span>
        <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-2">
          {tier.title}
        </h3>
        <p className="text-gray-600 mb-4">{tier.description}</p>

        <div className="mb-6">
          {tier.price && (
            <p className="text-3xl font-bold text-gray-900 mb-1">{tier.price}</p>
          )}
          {tier.timeframe && (
            <p className="text-sm text-gray-500">{tier.timeframe}</p>
          )}
        </div>

        <Button
          variant={isActive ? "primary" : "outline"}
          fullWidth
          className={isActive ? "bg-secondary-500 hover:bg-secondary-600" : ""}
        >
          {tier.ctaText}
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
    </motion.div>
  );
};

const ServiceTiers = () => {
  const [activeTier, setActiveTier] = useState(1); // Default the middle tier as active and popular choice
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);

  const tiers = [
    {
      id: 0,
      label: "Intro Rate",
      title: "Landing Page",
      description:
        "A high-converting single page built to turn visitors into leads — fast.",
      price: "$159",
      timeframe: "Delivered in 5–7 days",
      features: [
        "Mobile-first single page (React + Tailwind)",
        "Lead capture form with email notifications",
        "On-page SEO (meta tags, OG, schema markup)",
        "Google Analytics setup",
        "Fast load times — under 1 second on mobile",
        "2 rounds of revisions",
        "30 days post-launch support",
      ],
      ctaText: "Get Started",
    },
    {
      id: 1,
      label: "Most Popular",
      title: "Business Website",
      description:
        "A full multi-page website that builds trust and drives consistent leads.",
      price: "$1,200",
      timeframe: "Delivered in 2–3 weeks",
      features: [
        "4–5 page website (Home, About, Services, Contact + 1 more)",
        "Everything in Landing Page",
        "Custom animations & scroll interactions",
        "Portfolio or blog section",
        "Advanced SEO setup",
        "Google Business Profile optimization",
        "3 rounds of revisions",
        "60 days post-launch support",
      ],
      ctaText: "Get Started",
    },
    {
      id: 2,
      label: "Custom",
      title: "E-commerce & Custom",
      description:
        "A full online store or custom React application built to scale your revenue.",
      price: "From $2,500",
      timeframe: "Timeline based on project scope",
      features: [
        "Everything in Business Website",
        "E-commerce store with product catalog & checkout",
        "Payment processing integration (Stripe / PayPal)",
        "AI-powered features & personalization",
        "Custom React application development",
        "Admin dashboard & inventory management",
        "Progressive Web App (PWA) capability",
        "90 days post-launch support & strategy",
      ],
      ctaText: "Let's Talk",
    },
  ];

  const handleTierClick = (tierId, event) => {
    // Prevent default browser behavior which causes scrolling
    if (event) event.preventDefault();

    setActiveTier(tierId);
    setSelectedTier(tiers.find((tier) => tier.id === tierId));
    setIsModalOpen(true);
  };

  return (
    <section id="services" className="py-20 ">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-600 font-semibold tracking-wider text-sm uppercase">
            Our Services
          </span>
          <h2 className="heading-lg text-gray-900 mt-2 mb-4">
            Simple, Transparent Pricing. No Surprises.
          </h2>
          <p className="text-xl text-gray-600">
            Pick what fits your business right now. Every project gets the same care and quality regardless of tier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 mt-8 relative">
          {tiers.map((tier) => (
            <ServiceTierCard
              key={tier.id}
              tier={tier}
              isActive={activeTier === tier.id}
              onClick={() => handleTierClick(tier.id)}
            />
          ))}
        </div>

        <div className="text-center mt-12 space-y-2">
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
            Custom pricing based on project scope and requirements
          </p>
          <p className="text-sm text-gray-400">
            * Prices do not include domain registration (~$12/yr) or any third-party subscription costs. Hosting is included free via Netlify.
          </p>
        </div>
      </div>

      {/* Contact Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          selectedTier ? `Get Started with ${selectedTier.title}` : "Contact Us"
        }
      >
        <div className="mb-6">
          <p className="text-gray-600">
            Please fill out the form below and we'll get back to you with a
            detailed project plan based on your specific requirements.
          </p>
          {selectedTier && (
            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                {selectedTier.description}
              </p>
              <p className="text-xs text-gray-500">{selectedTier.timeframe}</p>
            </div>
          )}
        </div>

        <ContactForm
          inline={false}
          buttonText="Submit Request"
          successMessage={`Thank you for your interest in our ${
            selectedTier ? selectedTier.title : ""
          } service! We'll be in touch shortly with a detailed project proposal.`}
          hiddenFields={{
            source: "Service Tier Form",
            selectedTier: selectedTier ? selectedTier.title : "Not specified",
          }}
        />
      </Modal>
    </section>
  );
};

export default ServiceTiers;
