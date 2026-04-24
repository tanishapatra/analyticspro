import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      id: 'executive-overview',
      label: 'Executive Overview',
      path: '/executive-overview',
      icon: 'LayoutDashboard',
      description: 'Strategic dashboard for C-level KPI monitoring'
    },
    {
      id: 'performance-metrics',
      label: 'Performance Metrics',
      path: '/performance-metrics',
      icon: 'TrendingUp',
      description: 'Operational dashboard for team performance tracking'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // 🔥 CSV Upload Logic
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target.result;

      const rows = text.split("\n").map(r => r.split(","));
      const headers = rows[0];

      const parsedData = rows.slice(1).map(row => {
        let obj = {};
        headers.forEach((h, i) => {
          obj[h.trim()] = row[i]?.trim();
        });
        return obj;
      });

      localStorage.setItem("dashboardData", JSON.stringify(parsedData));

    
      window.dispatchEvent(new Event("dataUpdated"));

      alert("CSV Uploaded ");
    };

    reader.readAsText(file);
  };

  return (
    <>
      <nav className="nav-bar">
        <div className="nav-bar-container">
          <div className="nav-bar-logo">
            <button
              onClick={() => handleNavigation('/executive-overview')}
              className="focus-ring rounded-md"
              aria-label="AnalyticsPro Home"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="BarChart3" size={24} color="var(--color-primary)" />
                </div>
                <span className="text-xl font-heading font-semibold text-foreground">
                  AnalyticsPro
                </span>
              </div>
            </button>
          </div>

          {/* 🔥 MENU + UPLOAD */}
          <div className="nav-bar-menu flex items-center gap-4">
            {navigationItems?.map((item) => (
              <button
                key={item?.id}
                onClick={() => handleNavigation(item?.path)}
                className={`nav-bar-item ${isActive(item?.path) ? 'active' : ''} focus-ring rounded-md`}
                aria-current={isActive(item?.path) ? 'page' : undefined}
                title={item?.description}
              >
                {item?.label}
              </button>
            ))}

            {/* 🔥 Styled Upload Button */}
            <div>
              <label
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#2563eb",
                  color: "white",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px"
                }}
              >
                Upload CSV
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="nav-bar-mobile-toggle focus-ring rounded-md"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`nav-bar-mobile-menu ${isMobileMenuOpen ? 'open' : 'closed'}`}>
        <div className="nav-bar-mobile-header">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="BarChart3" size={24} color="var(--color-primary)" />
            </div>
            <span className="text-xl font-heading font-semibold text-foreground">
              AnalyticsPro
            </span>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="nav-bar-mobile-close focus-ring rounded-md"
            aria-label="Close navigation menu"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="nav-bar-mobile-items">
          {navigationItems?.map((item) => (
            <button
              key={item?.id}
              onClick={() => handleNavigation(item?.path)}
              className={`nav-bar-mobile-item ${isActive(item?.path) ? 'active' : ''} focus-ring`}
              aria-current={isActive(item?.path) ? 'page' : undefined}
            >
              <Icon name={item?.icon} size={20} className="mr-3" />
              <span>{item?.label}</span>
            </button>
          ))}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[1050] bg-background md:hidden"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default NavigationBar;