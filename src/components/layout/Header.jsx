import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import Modal from "../common/Modal";
import ContactForm from "../common/ContactForm";
import emailService from "../../services/emailService";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      setIsMobileMenuOpen(false);
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Open contact form modal
  const openContactFormModal = () => {
    setIsModalOpen(true);
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      // Add source information to the form data
      const enhancedFormData = {
        ...formData,
        source: "Header Consultation Form",
      };

      // Submit the form using emailService
      await emailService.submitConsultationForm(enhancedFormData);

      console.log("Consultation form submitted successfully");

      // Success state and modal closing are handled by the ContactForm component
    } catch (error) {
      console.error("Error submitting consultation form:", error);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 p-3">
        <header
          className={`transition-all duration-300 w-full mx-auto max-w-6xl ${
            isScrolled
              ? "bg-navy-900 shadow-md border border-gray-700 rounded-lg"
              : "bg-transparent"
          }`}
        >
          <div className="flex justify-between items-center px-3 sm:px-4 py-2">
            {/* Logo Area */}
            <Link to="/" className="flex items-center">
              {/* Reserved space for logo image */}
              <div className="h-10 w-auto flex items-center">
                {/* This div serves as a placeholder for your logo */}
                <div className="h-8 w-8 rounded-lg flex items-center justify-center mr-2">
                  <img
                    src="/images/header.webp"
                    alt="Logo"
                    className="h-8 w-auto"
                    width="32"
                    height="32"
                    loading="eager"
                    fetchpriority="high"
                  />
                </div>
                <span
                  className={`font-semibold text-lg ${
                    isScrolled ? "text-white" : "text-white"
                  }`}
                >
                  SiteLaunch
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("services")}
                className={`${
                  isScrolled ? "text-white" : "text-white"
                } hover:text-primary-500 text-sm font-medium cursor-pointer transition-colors`}
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("mobile-first")}
                className={`${
                  isScrolled ? "text-white" : "text-white"
                } hover:text-primary-500 text-sm font-medium cursor-pointer transition-colors`}
              >
                Mobile-First
              </button>
              <button
                onClick={() => scrollToSection("advantages")}
                className={`${
                  isScrolled ? "text-white" : "text-white"
                } hover:text-primary-500 text-sm font-medium cursor-pointer transition-colors`}
              >
                Advantages
              </button>
              <button
                onClick={() => scrollToSection("tech")}
                className={`${
                  isScrolled ? "text-white" : "text-white"
                } hover:text-primary-500 text-sm font-medium cursor-pointer transition-colors`}
              >
                Tech Stack
              </button>
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href="mailto:sitelaunchstudio@gmail.com"
                className={`text-sm font-medium px-4 py-2 transition-colors rounded-md border ${
                  isScrolled
                    ? "text-white hover:text-primary-600 border-gray-700 hover:border-primary-500"
                    : "text-white hover:text-primary-200 border-white/30 hover:border-white/50"
                }`}
              >
                Contact Us
              </a>
              <Button
                variant="primary"
                size="sm"
                className="py-2 px-4 bg-secondary-500 hover:bg-secondary-600 shadow-sm"
                onClick={openContactFormModal}
              >
                Free Consultation
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className={`md:hidden focus:outline-none ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
              onClick={toggleMobileMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white mt-2 rounded-lg shadow-lg p-4 border border-gray-200 mx-auto max-w-6xl">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("services")}
                className="text-gray-700 hover:text-primary-500 font-medium cursor-pointer"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("mobile-first")}
                className="text-gray-700 hover:text-primary-500 font-medium cursor-pointer"
              >
                Mobile-First
              </button>
              <button
                onClick={() => scrollToSection("advantages")}
                className="text-gray-700 hover:text-primary-500 font-medium cursor-pointer"
              >
                Advantages
              </button>
              <button
                onClick={() => scrollToSection("tech")}
                className="text-gray-700 hover:text-primary-500 font-medium cursor-pointer"
              >
                Tech Stack
              </button>
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                <a href="mailto:sitelaunchstudio@gmail.com">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Contact Us
                  </Button>
                </a>
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  className="bg-secondary-500 hover:bg-secondary-600"
                  onClick={openContactFormModal}
                >
                  Free Consultation
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Contact Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Request a Free Consultation"
      >
        <div className="mb-6">
          <p className="text-gray-600">
            As Miami's tech-forward web development agency, we specialize in
            creating mobile-first, high-performance websites that drive
            measurable business results.
          </p>
          <p className="text-gray-600 mt-2">
            Fill out the form below to request your free consultation and
            website audit. We'll analyze your current online presence and
            suggest improvements to help your business grow.
          </p>
        </div>
        <ContactForm
          inline={false}
          buttonText="Submit Request"
          successMessage="Thank you for your interest! We'll be in touch shortly to discuss your project and how our mobile-first approach can help your business succeed online."
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </>
  );
};

export default Header;
