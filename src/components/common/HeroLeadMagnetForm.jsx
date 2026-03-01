import React, { useState } from "react";
import { motion } from "framer-motion";

const HeroLeadMagnetForm = ({ onSubmit, className = "" }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    // Basic email validation
    if (!email || !email.includes("@")) {
      setFormError("Please enter a valid email address");
      return;
    }

    try {
      setIsSubmitting(true);

      // Create form data for the lead magnet
      const formData = {
        email: email,
        name: "", // We'll ask for this in the follow-up
        phone: "",
        company: "",
        website: "",
        projectDetails: "Website Health Check Download Request",
        source: "Hero Lead Magnet - Website Health Check",
        leadMagnet: "Website Health Check",
        submissionTime: new Date().toISOString(),
      };

      console.log("Submitting lead magnet form:", formData);

      // Call the parent's onSubmit function
      if (onSubmit) {
        await onSubmit(formData);
      }

      setIsSubmitted(true);
      setIsSubmitting(false);

      // Reset form after 8 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 8000);
    } catch (error) {
      console.error("Error submitting lead magnet form:", error);
      setFormError(
        "There was an error. Please try again or contact us directly."
      );
      setIsSubmitting(false);
    }
  };

  // Success state
  if (isSubmitted) {
    return (
      <motion.div
        className={`max-w-md mx-auto ${className}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-6 text-center border border-white border-opacity-30 shadow-lg">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
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
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            ✅ Sent Successfully!
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Your <strong>Free Website Health Check</strong> is on its way to{" "}
            <strong>{email}</strong>. Check your inbox in the next few minutes.
          </p>
          <div className="bg-blue-50 rounded-lg p-3 text-left">
            <p className="text-xs text-gray-600">
              <strong>What's Next:</strong> Use the checklist to audit your
              website, then we'll follow up with personalized insights for your
              Miami business.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Don't see it? Check your spam folder or contact us at
              sitelaunchstudio@gmail.com
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`max-w-md mx-auto ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Lead Magnet Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">
          📱 Free Website Health Check
        </h3>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {formError && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
            {formError}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-grow">
            <input
              type="email"
              placeholder="Enter your business email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-90 backdrop-blur-sm text-gray-800 placeholder-gray-500 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="group bg-secondary-500 hover:bg-secondary-600 text-white font-medium py-3 px-6 rounded-lg inline-flex items-center justify-center transition-all duration-200 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
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
                Sending...
              </span>
            ) : (
              <>
                Get Free Check
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center justify-center space-x-4 text-xs text-gray-300">
          <div className="flex items-center">
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Secure
          </div>
          <div className="flex items-center">
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            No spam
          </div>
          <div className="flex items-center">
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Instant download
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default HeroLeadMagnetForm;
