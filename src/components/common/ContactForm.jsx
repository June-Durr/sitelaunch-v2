import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import emailService from "../../services/emailService";
import analytics from "../../services/analytics";

const ContactForm = ({
  inline = false,
  buttonText = "Get Free Consultation",
  successMessage = "Thank you! We'll be in touch shortly.",
  className = "",
  onSubmit = null,
  formType = "Contact Form", // Add form type prop
}) => {
  const [step, setStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    company: "",
    website: "",
    projectDetails: "",
  });
  const [formError, setFormError] = useState(null);

  // Determine which fields to show based on step and form type
  const getFieldsForStep = () => {
    // For the inline form in the hero (progressive disclosure)
    if (inline) {
      if (step === 0) return ["email"];
      if (step === 1) return ["name"];
      if (step === 2) return ["phone"];
      return [];
    }

    // For the full form (service tiers and other places)
    return ["name", "email", "phone", "company", "website", "projectDetails"];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContinue = (e) => {
    e.preventDefault();

    // For the inline form, advance through steps
    if (inline) {
      if (step < 2) {
        setStep(step + 1);
      } else {
        handleSubmit(e);
      }
    } else {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setFormError(null);

    // Validation - ensure required fields are filled
    const requiredFields = inline
      ? ["email", "name", "phone"]
      : ["email", "name"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setFormError("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);

      // 🔥 ADD THIS LINE HERE - Track form submission attempt
      analytics.trackFormSubmission(
        formType,
        inline ? "inline_form" : "full_form"
      );

      // Use the centralized email service
      if (onSubmit) {
        // If parent component wants to handle submission
        await onSubmit(formData);
      } else {
        // Default submission using email service
        await emailService.submitForm(formData, formType);
      }

      // 🔥 OPTIONALLY ADD SUCCESS TRACKING HERE TOO
      analytics.trackConversion("form_completion", 1);

      // Show success message
      setIsSubmitted(true);
      setIsSubmitting(false);

      // Reset form after 5 seconds if it's the inline version
      if (inline) {
        setTimeout(() => {
          setIsSubmitted(false);
          setStep(0);
          setFormData({
            email: "",
            name: "",
            phone: "",
            company: "",
            website: "",
            projectDetails: "",
          });
        }, 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      // 🔥 OPTIONALLY TRACK FORM ERRORS TOO
      analytics.trackEvent("form_error", {
        category: "form_submission",
        label: formType,
        error_message: error.message,
      });

      setFormError(
        "There was an error submitting your request. Please try again or contact us directly."
      );
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const fieldLabels = {
    email: "Work Email",
    name: "Full Name",
    phone: "Phone Number",
    company: "Company Name",
    website: "Current Website (if any)",
    projectDetails: "Tell us about your project",
  };

  const currentFields = getFieldsForStep();

  // Success message after form submission
  if (isSubmitted) {
    return (
      <motion.div
        className={`bg-green-100 border border-green-300 text-green-700 rounded-md p-4 text-center ${className}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <svg
          className="w-6 h-6 text-green-500 mx-auto mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <p className="font-medium">{successMessage}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleContinue} className={className}>
      {formError && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{formError}</span>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={formVariants}
          className={
            inline
              ? "flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2 w-full"
              : "space-y-4"
          }
        >
          {inline ? (
            // Inline form with progressive disclosure
            <>
              {currentFields.map((field) => (
                <div key={field} className={inline ? "flex-grow" : ""}>
                  <input
                    type={
                      field === "email"
                        ? "email"
                        : field === "phone"
                        ? "tel"
                        : "text"
                    }
                    name={field}
                    placeholder={fieldLabels[field]}
                    value={formData[field]}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 rounded-md bg-white bg-opacity-90 backdrop-blur-sm text-gray-800 placeholder-gray-500 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
                  />
                </div>
              ))}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group bg-secondary-500 hover:bg-secondary-600 text-white shadow-sm py-3 px-6 rounded-md font-medium inline-flex items-center transition-all duration-200 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <>
                    {step === 2 ? "Submit" : "Continue"}
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
                  </>
                )}
              </button>
            </>
          ) : (
            // Full form with all fields at once
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Current Website (if any)
                </label>
                <input
                  type="url"
                  name="website"
                  id="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://"
                />
              </div>
              <div>
                <label
                  htmlFor="projectDetails"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Project Details
                </label>
                <textarea
                  name="projectDetails"
                  id="projectDetails"
                  rows="4"
                  value={formData.projectDetails}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Tell us about your project goals and requirements"
                ></textarea>
              </div>
              <div className="text-center">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="bg-secondary-500 hover:bg-secondary-600 w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    buttonText
                  )}
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </form>
  );
};

export default ContactForm;
