import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import emailService from "./services/emailService";
import analytics from "./services/analytics";
import DebugEmailTest from "./components/debug/DebugEmailTest";

// Global flag to prevent multiple initializations
let servicesInitialized = false;

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-500"></div>
  </div>
);

function App() {
  // Initialize services when the app loads - ONLY ONCE GLOBALLY
  useEffect(() => {
    const initializeServices = async () => {
      // Global check to prevent multiple initializations across all component remounts
      if (servicesInitialized) {
        return;
      }

      try {
        // Initialize analytics first
        await analytics.init();

        // Initialize email service
        emailService.init();

        // Set global flag
        servicesInitialized = true;

        // Optional: Log initialization in development (only once)
        if (import.meta.env.DEV) {
          console.log(
            "✅ SiteLaunch Studios services initialized successfully"
          );
        }
      } catch (error) {
        console.error("❌ Service initialization failed:", error);
      }
    };

    initializeServices();
  }, []); // Empty dependency array - run only once

  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen overflow-x-hidden">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />

          {/* Debug component - only shows in development */}
          <DebugEmailTest />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
