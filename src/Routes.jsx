import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";

import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

import NotFound from "pages/NotFound";

import Home from './pages/home';
import PerformanceMetrics from './pages/performance-metrics';
import ExecutiveOverview from './pages/executive-overview';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />

        <RouterRoutes>

          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Dashboard Pages */}
          <Route
            path="/executive-overview"
            element={<ExecutiveOverview />}
          />

          <Route
            path="/performance-metrics"
            element={<PerformanceMetrics />}
          />

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />

        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;