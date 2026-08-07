// src/services/analytics.js
// Google Analytics 4 Implementation

const GA_MEASUREMENT_ID =
  import.meta.env.VITE_GA_MEASUREMENT_ID || "G-NH1CR7MCH2";

// Global flag to prevent multiple initializations
let globallyInitialized = false;

class AnalyticsService {
  constructor() {
    this.isInitialized = false;
    this.debugMode = import.meta.env.DEV;
    this.initPromise = null;
    this.lastScrollPercentage = 0;
  }

  // Initialize GA4 - only once globally
  init() {
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise((resolve, reject) => {
      try {
        // Global check to prevent multiple initializations
        if (globallyInitialized) {
          this.isInitialized = true;
          resolve();
          return;
        }

        // Skip if no GA ID provided
        if (
          !GA_MEASUREMENT_ID ||
          GA_MEASUREMENT_ID === "G-YOUR-ACTUAL-ID-HERE"
        ) {
          if (this.debugMode) {
            console.warn(
              "Google Analytics ID not configured - skipping initialization"
            );
          }
          resolve();
          return;
        }

        // Check if gtag is already loaded
        if (window.gtag) {
          this.isInitialized = true;
          globallyInitialized = true;
          resolve();
          return;
        }

        // Load GA4 script
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;

        script.onload = () => {
          // Initialize gtag
          window.dataLayer = window.dataLayer || [];
          window.gtag = function () {
            window.dataLayer.push(arguments);
          };

          window.gtag("js", new Date());
          window.gtag("config", GA_MEASUREMENT_ID, {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: false, // We'll manually send page views
          });

          this.isInitialized = true;
          globallyInitialized = true;

          if (this.debugMode) {
            console.log(
              "📊 Google Analytics 4 initialized with ID:",
              GA_MEASUREMENT_ID
            );
          }

          resolve();
        };

        script.onerror = () => {
          console.error("Failed to load Google Analytics script");
          reject(new Error("Failed to load GA script"));
        };

        document.head.appendChild(script);
      } catch (error) {
        console.error("Failed to initialize Google Analytics:", error);
        reject(error);
      }
    });

    return this.initPromise;
  }

  // Track page views
  trackPageView(path, title) {
    if (!this.isInitialized || !window.gtag) return;

    try {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: path,
        page_title: title,
      });

      if (this.debugMode) {
        console.log("📄 Page view tracked:", { path, title });
      }
    } catch (error) {
      console.error("Failed to track page view:", error);
    }
  }

  // Track custom events
  trackEvent(eventName, parameters = {}) {
    if (!this.isInitialized || !window.gtag) return;

    try {
      window.gtag("event", eventName, {
        event_category: parameters.category || "engagement",
        event_label: parameters.label || "",
        value: parameters.value || 0,
        ...parameters,
      });

      if (this.debugMode) {
        console.log("📈 Event tracked:", eventName, parameters);
      }
    } catch (error) {
      console.error("Failed to track event:", error);
    }
  }

  // Convenience methods for common events
  trackFormSubmission(formType, formName) {
    this.trackEvent("form_submit", {
      category: "lead_generation",
      label: formName,
      form_type: formType,
    });
  }

  trackButtonClick(buttonName, location) {
    this.trackEvent("button_click", {
      category: "engagement",
      label: buttonName,
      button_location: location,
    });
  }

  trackScroll(percentage) {
    // Prevent duplicate scroll tracking
    if (this.lastScrollPercentage === percentage) return;
    this.lastScrollPercentage = percentage;

    this.trackEvent("scroll", {
      category: "engagement",
      label: `${percentage}%`,
      value: percentage,
    });
  }

  trackFileDownload(fileName, fileType) {
    this.trackEvent("file_download", {
      category: "engagement",
      label: fileName,
      file_type: fileType,
    });
  }

  trackOutboundLink(url, linkText) {
    this.trackEvent("click", {
      event_category: "outbound",
      event_label: url,
      transport_type: "beacon",
      link_text: linkText,
    });
  }

  // Track conversion events
  trackConversion(conversionType, value = 0) {
    this.trackEvent("conversion", {
      category: "conversions",
      label: conversionType,
      value: value,
      currency: "USD",
    });
  }

  // Track contact form submissions specifically
  trackContact(method, source) {
    this.trackEvent("generate_lead", {
      category: "lead_generation",
      method: method, // 'form', 'phone', 'email'
      source: source, // 'header', 'hero', 'footer', etc.
      value: 1,
    });
  }

  // Track service tier interest
  trackServiceInterest(tierName, tierValue) {
    this.trackEvent("select_content", {
      category: "service_interest",
      content_type: "service_tier",
      content_id: tierName.toLowerCase().replace(/\s+/g, "_"),
      value: tierValue,
    });
  }
}

// Create singleton instance
const analytics = new AnalyticsService();

export default analytics;
