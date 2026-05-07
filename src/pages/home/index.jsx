import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // 🔥 Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex flex-col items-center justify-center text-white">

        <div className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-8"></div>

        <h1 className="text-4xl font-bold mb-4">
          Processing Data...
        </h1>

        <p className="text-slate-300 text-lg text-center max-w-md">
          Analyzing CSV data and generating business insights.
        </p>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center px-6 py-12 relative">

      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>

          <div className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-6 shadow-sm">
            Cloud-Based Business Intelligence Platform
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
            AnalyticsPro
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            Transform raw CSV sales data into meaningful business insights
            using interactive dashboards, KPI metrics, charts, and
            real-time analytics.
          </p>

          {/* FEATURE LIST */}
          <div className="mt-6 space-y-3">

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <span className="text-slate-700">
                Dynamic CSV Upload & Analysis
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <span className="text-slate-700">
                Real-Time KPI Monitoring
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <span className="text-slate-700">
                Interactive Dashboard Visualizations
              </span>
            </div>

          </div>

          {/* BUTTON */}
          <div className="mt-10 flex flex-wrap gap-4">

            {/* Upload CSV Button */}
            <label className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition cursor-pointer shadow-xl hover:scale-105 duration-300">

              Upload CSV

              <input
                type="file"
                accept=".csv"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (!file) return;

                  const reader = new FileReader();

                  reader.onload = (event) => {
                    const text = event.target.result;

                    const rows = text
                      .split("\n")
                      .map((row) => row.split(","));

                    const headers = rows[0];

                    const parsedData = rows.slice(1).map((row) => {
                      let obj = {};

                      headers.forEach((header, index) => {
                        obj[header.trim()] = row[index]?.trim();
                      });

                      return obj;
                    });

                    localStorage.setItem(
                      "dashboardData",
                      JSON.stringify(parsedData)
                    );

                    window.dispatchEvent(new Event("dataUpdated"));

                    // 🔥 Show loading screen
                    setLoading(true);

                    // 🔥 Open dashboard after delay
                    setTimeout(() => {
                      navigate("/executive-overview");
                    }, 2500);
                  };

                  reader.readAsText(file);
                }}
              />
            </label>

          </div>

          {/* FEATURE CARDS */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200 shadow-lg hover:shadow-2xl transition duration-300">

              <h3 className="font-bold text-slate-900 text-lg">
                Real-Time Insights
              </h3>

              <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                Instantly analyze uploaded business data and monitor
                key performance indicators dynamically.
              </p>

            </div>

            <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200 shadow-lg hover:shadow-2xl transition duration-300">

              <h3 className="font-bold text-slate-900 text-lg">
                Interactive Dashboards
              </h3>

              <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                Visualize trends, profit, sales performance,
                and business metrics through charts and reports.
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex justify-center relative">

          {/* Glow Effect */}
          <div className="absolute w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>

          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
            alt="Dashboard"
            className="relative rounded-3xl shadow-2xl w-full max-w-2xl object-contain hover:scale-105 transition duration-500"
          />

        </div>

      </div>

      {/* FOOTER */}
      <footer className="absolute bottom-4 text-center w-full text-sm text-slate-500">
        AnalyticsPro © 2026 | Cloud-Based Business Intelligence Application
      </footer>

    </div>
  );
};

export default Home;