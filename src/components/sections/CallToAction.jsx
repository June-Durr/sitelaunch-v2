import React, { useState } from "react";
import Modal from "../common/Modal";
import ContactForm from "../common/ContactForm";
// import apiService from "../../services/apiService";

const CallToAction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormSubmit = async (formData) => {
    try {
      // Add source information to the form data
      const enhancedFormData = {
        ...formData,
        source: "CTA Section",
      };

      // Submit to API service
      await apiService.submitContactForm(enhancedFormData);

      console.log("CTA form submitted successfully:", enhancedFormData);
    } catch (error) {
      console.error("Error submitting CTA form:", error);
    }
  };

  return (
    <>
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="heading-lg mb-6">
              Ready to launch your digital presence?
            </h2>
            <p className="text-xl mb-8">
              Partner with Miami's tech-forward web development agency
              specializing in mobile-first, high-performance websites and
              applications.
            </p>

            <button
              className="group bg-secondary-500 hover:bg-secondary-600 text-white shadow-sm py-3 px-6 rounded-md font-medium inline-flex items-center"
              onClick={() => setIsModalOpen(true)}
            >
              Start your project
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>

            <p className="mt-4 text-sm text-purple-200">
              Get a free consultation and project estimate.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Start Your Project"
      >
        <div className="mb-6">
          <p className="text-gray-600">
            Tell us about your project, and we'll get back to you with a free
            consultation and estimate.
          </p>
        </div>

        <ContactForm
          inline={false}
          buttonText="Submit Request"
          successMessage="Thank you for your interest! We'll be in touch shortly to discuss your project."
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </>
  );
};

export default CallToAction;
