// src/services/emailService.js
import emailjs from "emailjs-com";

// EmailJS configuration constants
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_zuasdyq";
const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID || "X2c5eM1-C7UfNvc_T";

const TEMPLATES = {
  NOTIFICATION:
    import.meta.env.VITE_EMAILJS_NOTIFICATION_TEMPLATE || "template_gbjlotl",
  AUTO_RESPONSE:
    import.meta.env.VITE_EMAILJS_AUTORESPONSE_TEMPLATE || "template_arwmjaj",
};

// Global flag to prevent multiple initializations
let globallyInitialized = false;

class EmailService {
  constructor() {
    this.isInitialized = false;
    this.debugMode = import.meta.env.DEV;
  }

  init() {
    // Global check to prevent multiple initializations
    if (globallyInitialized) {
      if (this.debugMode) {
        console.log("📧 EmailJS already initialized globally, skipping...");
      }
      this.isInitialized = true;
      return;
    }

    try {
      emailjs.init(USER_ID);
      this.isInitialized = true;
      globallyInitialized = true;

      if (this.debugMode) {
        console.log("📧 EmailJS initialized successfully:", {
          SERVICE_ID: SERVICE_ID || "Missing",
          USER_ID: USER_ID ? "Set" : "Missing",
          TEMPLATES,
        });
      }
    } catch (error) {
      console.error("EmailJS initialization failed:", error);
    }
  }

  /**
   * Submit form with simplified approach - send notification first
   */
  submitForm = async (formData, formType = "Contact Form") => {
    try {
      // Check if service is initialized
      if (!this.isInitialized && !globallyInitialized) {
        this.init(); // Try to initialize if not done
      }

      // Validate required fields
      if (!formData.email) {
        throw new Error("Email is required");
      }

      // For lead magnets, use email as name if name is empty
      if (!formData.name && formData.leadMagnet) {
        formData.name = formData.email.split("@")[0];
      }

      // Create notification parameters (email to you)
      const notificationParams = {
        to_name: "SiteLaunch Studios",
        to_email: "sitelaunchstudio@gmail.com",
        from_name: formData.name || formData.email.split("@")[0],
        from_email: formData.email,
        reply_to: formData.email,
        phone: formData.phone || "Not provided",
        company: formData.company || "Not provided",
        website: formData.website || "Not provided",
        message: formData.projectDetails || "No details provided",
        form_type: formType,
        source: formData.source || "Website Form",
        date_submitted: new Date().toLocaleString(),
        selected_tier: formData.selectedTier || "Not applicable",
        lead_magnet: formData.leadMagnet || "None",
        subject: formData.leadMagnet
          ? `🎯 Lead Magnet Download: ${formData.leadMagnet} from ${formData.email}`
          : `New ${formType} from ${formData.name || formData.email}`,
      };

      if (this.debugMode) {
        console.log("📤 Sending notification email...", {
          formType,
          email: formData.email,
        });
      }

      // Send notification email first
      const notificationResult = await emailjs.send(
        SERVICE_ID,
        TEMPLATES.NOTIFICATION,
        notificationParams
      );

      // Create auto-response parameters (email to customer)
      const responseParams = {
        to_name: formData.name || formData.email.split("@")[0],
        to_email: formData.email,
        from_name: "SiteLaunch Studios",
        from_email: "sitelaunchstudio@gmail.com",
        subject: formData.leadMagnet
          ? `📱 Your Free Website Health Check is here!`
          : "Thank you for contacting SiteLaunch Studios",
        form_type_title: formType.toUpperCase(),
        submission_type: formType.toLowerCase(),
        selected_tier: formData.selectedTier || "",
        lead_magnet_name: formData.leadMagnet || "",
        show_tier_info: formData.selectedTier ? "block" : "none",
        show_consultation_info: formType.toLowerCase().includes("consultation")
          ? "block"
          : "none",
        show_lead_magnet_info: formData.leadMagnet ? "block" : "none",
      };

      if (this.debugMode) {
        console.log("📨 Sending auto-response email...");
      }

      // Send auto-response email
      const responseResult = await emailjs.send(
        SERVICE_ID,
        TEMPLATES.AUTO_RESPONSE,
        responseParams
      );

      if (this.debugMode) {
        console.log("✅ Both emails sent successfully");
      }

      return {
        success: true,
        message: "Both emails sent successfully",
        notification: notificationResult,
        response: responseResult,
      };
    } catch (error) {
      console.error("❌ EmailJS Error:", error);

      let errorMessage = "Failed to send email. Please try again.";

      if (error.text) {
        if (error.text.includes("recipients address is empty")) {
          errorMessage = "Email configuration error. Please contact support.";
        } else if (error.text.includes("Invalid 'To' email")) {
          errorMessage = "Invalid email address provided.";
        } else {
          errorMessage = error.text;
        }
      } else if (error.status === 400) {
        errorMessage =
          "Invalid email configuration. Please check your details.";
      } else if (error.status === 401) {
        errorMessage = "Authentication failed. Please try again later.";
      }

      throw new Error(errorMessage);
    }
  };

  // Wrapper methods
  submitContactForm = async (formData) => {
    return this.submitForm(formData, "Contact Form");
  };

  submitConsultationForm = async (formData) => {
    return this.submitForm(formData, "Consultation Request");
  };

  submitServiceTierForm = async (formData) => {
    return this.submitForm(formData, "Service Tier Request");
  };

  submitHeroForm = async (formData) => {
    return this.submitForm(formData, "Hero Form Submission");
  };
}

// Create singleton instance
const emailService = new EmailService();

export default emailService;
