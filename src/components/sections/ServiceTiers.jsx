import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "../common/Button";
import Modal from "../common/Modal";
import ContactForm from "../common/ContactForm";
// import apiService from "../../services/apiService";

const ServiceTierCard = ({ tier, isActive, onClick }) => {
  const features = tier.features;

  return (
    <motion.div
      className={`relative bg-white rounded-3xl overflow-hidden border transition-all duration-300 h-full ${
        isActive
          ? "border-primary-500 shadow-lg scale-105 z-10"
          : "border-gray-200 shadow-sm hover:shadow-md"
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onClick={onClick}
    >
      {isActive && (
        <div className="bg-primary-500 text-white text-center py-2 text-sm font-medium">
          Popular Choice
        </div>
      )}

      <div className="p-8">
        <span className="inline-block text-primary-600 font-semibold tracking-wider text-sm uppercase">
          {tier.label}
        </span>
        <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-2">
          {tier.title}
        </h3>
        <p className="text-gray-600 mb-6">{tier.description}</p>

        <div className="mb-6">
          <div className="flex items-end">
            <span className="text-4xl font-bold text-gray-900">
              {tier.pricePrefix}
              {tier.price}
            </span>
            <span className="text-gray-600 ml-1 pb-1">{tier.priceSuffix}</span>
          </div>
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
  const [activeTier, setActiveTier] = useState(1); // Default the middle tier as active
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);

  const tiers = [
    {
      id: 0,
      label: "Tier 1",
      title: "Foundation",
      description:
        "Establish your online presence with mobile-first essentials",
      price: "Custom",
      pricePrefix: "",
      priceSuffix: "",
      features: [
        "Mobile-first responsive website development",
        "Basic SEO optimization",
        "Content management system implementation",
        "Simple contact/lead forms with AWS integration",
        "Google Analytics setup",
      ],
      ctaText: "Get Started",
    },
    {
      id: 1,
      label: "Tier 2",
      title: "Growth",
      description: "Enhance your digital presence and drive measurable results",
      price: "Custom",
      pricePrefix: "",
      priceSuffix: "",
      features: [
        "Everything in Foundation tier",
        "Advanced SEO strategy implementation",
        "User behavior analysis and UX optimizations",
        "Custom interactive elements",
        "Personalization based on user segments",
        "E-commerce functionality",
        "Marketing automation integration",
      ],
      ctaText: "Get Started",
    },
    {
      id: 2,
      label: "Tier 3",
      title: "Innovation",
      description:
        "Leverage cutting-edge technology for maximum competitive advantage",
      price: "Custom",
      pricePrefix: "",
      priceSuffix: "",
      features: [
        "Everything in Growth tier",
        "AI-powered personalization and recommendations",
        "Custom web applications with complex functionality",
        "Advanced analytics dashboards for clients",
        "Conversion rate optimization programs",
        "Progressive Web App implementation",
        "Multilingual/international optimization",
      ],
      ctaText: "Get Started",
    },
  ];

  const handleTierClick = (tierId) => {
    setActiveTier(tierId);
    setSelectedTier(tiers.find((tier) => tier.id === tierId));
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      // Add selected tier information to the form data
      const enhancedFormData = {
        ...formData,
        selectedTier: selectedTier ? selectedTier.title : "Not specified",
        selectedTierDetails: selectedTier
          ? `Tier ${selectedTier.id + 1}: ${selectedTier.title}`
          : "Not specified",
      };

      // Submit to API service
      await apiService.submitContactForm(enhancedFormData);

      console.log(
        "Service tier form submitted successfully:",
        enhancedFormData
      );

      // Close modal after successful submission
      // Note: ContactForm handles success state internally
    } catch (error) {
      console.error("Error submitting service tier form:", error);
    }
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-600 font-semibold tracking-wider text-sm uppercase">
            Our Services
          </span>
          <h2 className="heading-lg text-gray-900 mt-2 mb-4">
            Comprehensive Web Development Solutions
          </h2>
          <p className="text-xl text-gray-600">
            Choose the service tier that best fits your business needs and goals
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
            Custom pricing based on project scope and requirements
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
            custom quote based on your project requirements.
          </p>
          {selectedTier && (
            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-primary-600 mb-2">
                Selected Service Tier: {selectedTier.title}
              </h4>
              <p className="text-sm text-gray-600">
                {selectedTier.description}
              </p>
            </div>
          )}
        </div>

        <ContactForm
          inline={false}
          buttonText="Submit Request"
          successMessage={`Thank you for your interest in our ${
            selectedTier ? selectedTier.title : ""
          } service! We'll be in touch shortly with a custom quote.`}
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </section>
  );
};

export default ServiceTiers;
