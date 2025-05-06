// src/services/apiService.js

/**
 * Service to handle API requests for forms and contact submissions
 */
const apiService = {
  /**
   * Submit contact form data to the backend API
   *
   * @param {Object} formData - The form data to submit
   * @returns {Promise} - The API response
   */
  submitContactForm: async (formData) => {
    try {
      // For development/testing - log the form data to console
      console.log("Submitting form data:", formData);

      // Replace with your actual API endpoint when deployed
      const API_URL =
        process.env.NODE_ENV === "production"
          ? "https://api.yourdomain.com/contact"
          : "/api/contact";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Form submission failed");
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", error);

      // For development/testing without a real backend
      if (process.env.NODE_ENV !== "production") {
        // Simulate successful API response after 1 second
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              success: true,
              message: "Form submitted successfully (dev mode)",
            });
          }, 1000);
        });
      }

      throw error;
    }
  },

  /**
   * Submit newsletter or subscription form data
   *
   * @param {Object} data - The subscription data
   * @returns {Promise} - The API response
   */
  subscribeNewsletter: async (data) => {
    try {
      // For development/testing - log the subscription data to console
      console.log("Subscribing email:", data);

      // Replace with your actual API endpoint when deployed
      const API_URL =
        process.env.NODE_ENV === "production"
          ? "https://api.yourdomain.com/subscribe"
          : "/api/subscribe";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Subscription failed");
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", error);

      // For development/testing without a real backend
      if (process.env.NODE_ENV !== "production") {
        // Simulate successful API response after 1 second
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              success: true,
              message: "Subscribed successfully (dev mode)",
            });
          }, 1000);
        });
      }

      throw error;
    }
  },
};

export default apiService;
