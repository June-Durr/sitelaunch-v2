import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import analytics from "./services/analytics";

function App() {
  useEffect(() => {
    analytics.init();
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen overflow-x-hidden">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
