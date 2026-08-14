import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MotionConfig } from "framer-motion";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollManager from "./components/common/ScrollManager";
import Home from "./pages/Home";
import InsightArticle from "./pages/InsightArticle";
import NotFound from "./pages/NotFound";
import analytics from "./services/analytics";

function App() {
  useEffect(() => {
    analytics.init();
  }, []);

  return (
    <HelmetProvider>
      {/* "user" makes every motion.* animation in the tree respect the
          visitor's OS-level prefers-reduced-motion setting automatically. */}
      <MotionConfig reducedMotion="user">
        <Router>
          <ScrollManager />
          <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/insights/:slug" element={<InsightArticle />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </MotionConfig>
    </HelmetProvider>
  );
}

export default App;
