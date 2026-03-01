import React, { useState } from "react";
import emailService from "../../services/emailService";

const DebugEmailTest = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Only show in development environment
  if (import.meta.env.PROD) {
    return null;
  }

  const testEmail = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const testData = {
        name: "Test User",
        email: "test@example.com",
        phone: "555-123-4567",
        company: "Test Company",
        website: "https://test.com",
        projectDetails: "This is a test submission from the debug component",
        source: "Debug Component",
      };

      const response = await emailService.submitContactForm(testData);
      setResult({
        success: true,
        message: "Email sent successfully!",
        data: response,
      });
    } catch (error) {
      setResult({ success: false, message: error.message, error: error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isVisible ? (
        <button
          onClick={() => setIsVisible(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
        >
          🧪 Email Test
        </button>
      ) : (
        <div className="bg-white border border-gray-300 rounded-lg shadow-xl p-4 max-w-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">EmailJS Debug</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <button
            onClick={testEmail}
            disabled={isLoading}
            className={`w-full px-4 py-2 rounded-md text-white font-medium ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isLoading ? "Sending..." : "Test Email"}
          </button>

          {result && (
            <div
              className={`mt-3 p-2 rounded text-sm ${
                result.success
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <p className="font-medium">{result.message}</p>
              {result.error && (
                <details className="mt-1">
                  <summary className="cursor-pointer">Error Details</summary>
                  <pre className="text-xs mt-1 overflow-auto">
                    {JSON.stringify(result.error, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DebugEmailTest;
