// src/services/emailService.js
import emailjs from "emailjs-com";

// EmailJS configuration constants - using environment variables
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_zuasdyq";
const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID || "X2c5eM1-C7UfNvc_T";

// Templates from environment variables
const TEMPLATES = {
  NOTIFICATION:
    import.meta.env.VITE_EMAILJS_NOTIFICATION_TEMPLATE || "template_gbjlotl",
  AUTO_RESPONSE:
    import.meta.env.VITE_EMAILJS_AUTORESPONSE_TEMPLATE || "template_arwmjaj",
};

/**
 * Service to handle email submissions via EmailJS
 */
const emailService = {
  /**
   * Initialize EmailJS
   * Call this function once when your app loads
   */
  init() {
    emailjs.init(USER_ID);
    if (import.meta.env.DEV) {
      console.log("EmailJS initialized with:", {
        SERVICE_ID,
        USER_ID,
        TEMPLATES,
      });
    }
  },

  /**
   * Helper function to determine if this is a priority submission
   */
  _isPrioritySubmission(formType) {
    const priorityTypes = ["consultation", "demo", "urgent"];
    return priorityTypes.some((type) => formType.toLowerCase().includes(type));
  },

  /**
   * Test function to send a simple email first
   */
  testSimpleEmail: async (formData) => {
    try {
      // Start with just the notification email using minimal parameters
      const simpleParams = {
        to_name: "SiteLaunch Studios",
        from_name: formData.name || "Test User",
        from_email: formData.email || "test@example.com",
        message: formData.projectDetails || "Test message",
      };

      console.log(
        "Testing simple notification email with params:",
        simpleParams
      );

      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATES.NOTIFICATION,
        simpleParams
      );

      return {
        success: true,
        message: "Simple test email sent successfully",
        result,
      };
    } catch (error) {
      console.error("Simple email test failed:", error);
      throw error;
    }
  },

  /**
   * Submit contact form data via EmailJS
   *
   * @param {Object} formData - The form data to submit
   * @param {string} formType - The type of form (e.g. 'contact', 'consultation', 'service-tier')
   * @returns {Promise} - The EmailJS response
   */
  submitForm: async (formData, formType = "Contact Form") => {
    try {
      // Create basic template parameters from the form data
      const baseParams = {
        to_name: "SiteLaunch Studios",
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || "Not provided",
        company: formData.company || "Not provided",
        website: formData.website || "Not provided",
        message: formData.projectDetails || "No details provided",
        source: formData.source || "Website Form",
        date_submitted: new Date().toLocaleString(),
        reply_to: formData.email,
      };

      // --- NOTIFICATION EMAIL PARAMS ---
      // Add special parameters for the admin notification
      const notificationParams = {
        ...baseParams,
        form_type: formType,
        subject: `New ${formType} from ${formData.name}`,
        // Show priority flag for consultation requests
        show_priority: emailService._isPrioritySubmission(formType)
          ? "block"
          : "none",
        // Add service tier info if it exists
        selected_tier: formData.selectedTier || "Not applicable",
      };

      // --- AUTO RESPONSE EMAIL PARAMS ---
      // Add special parameters for the auto-response
      const responseParams = {
        ...baseParams,
        to_name: formData.name, // For auto-response, send to the customer
        to_email: formData.email,
        subject: `Thank you for contacting SiteLaunch Studios`,
        form_type_title: formType.toUpperCase(),
        submission_type: formType.toLowerCase(),
        // Control visibility of tier info section
        show_tier_info: formData.selectedTier ? "block" : "none",
        // Control visibility of consultation section
        show_consultation_info: formType.toLowerCase().includes("consultation")
          ? "block"
          : "none",
        selected_tier: formData.selectedTier || "",
      };

      // Log data in development environment
      if (import.meta.env.DEV) {
        console.log("Sending form submission with type:", formType);
        console.log("Notification params:", notificationParams);
        console.log("Response params:", responseParams);
      }

      // Try sending just the notification email first
      console.log("Sending notification email...");
      const notificationResult = await emailjs.send(
        SERVICE_ID,
        TEMPLATES.NOTIFICATION,
        notificationParams
      );

      console.log(
        "Notification sent successfully, now sending auto-response..."
      );

      // Send the auto-response email to user
      const responseResult = await emailjs.send(
        SERVICE_ID,
        TEMPLATES.AUTO_RESPONSE,
        responseParams
      );

      return {
        success: true,
        message: "Emails sent successfully",
        notification: notificationResult,
        response: responseResult,
      };
    } catch (error) {
      console.error("EmailJS Error:", error);
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        status: error.status,
        text: error.text,
      });
      throw error;
    }
  },

  /**
   * Submit contact form data
   * @param {Object} formData - The form data
   */
  submitContactForm: async (formData) => {
    return emailService.submitForm(formData, "Contact Form");
  },

  /**
   * Submit consultation request
   * @param {Object} formData - The form data
   */
  submitConsultationForm: async (formData) => {
    return emailService.submitForm(formData, "Consultation Request");
  },

  /**
   * Submit service tier request
   * @param {Object} formData - The form data including tier info
   */
  submitServiceTierForm: async (formData) => {
    return emailService.submitForm(formData, "Service Tier Request");
  },

  /**
   * Submit hero form (typically first contact)
   * @param {Object} formData - The form data
   */
  submitHeroForm: async (formData) => {
    return emailService.submitForm(formData, "Hero Form Submission");
  },
};

export default emailService;
