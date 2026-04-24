import React, { useState, useEffect } from "react";
import { loadCSV } from "../../utils/loadCSV";
import {
  calculateTotalSales,
  calculateTotalProfit,
  calculateTotalQuantity,
  salesByRegion,
  salesByCategory
} from "../../utils/metrics";

import { Helmet } from "react-helmet";
import NavigationBar from "../../components/ui/NavigationBar";
import KPICard from "./components/KPICard";
import MetricsChart from "./components/MetricsChart";
import PerformanceScorecard from "./components/PerformanceScorecard";
import FilterControls from "./components/FilterControls";

const ExecutiveOverview = () => {

  const [data, setData] = useState([]);

  const [dateRange, setDateRange] = useState("q1-2026");
  const [department, setDepartment] = useState("all");

  const [lastUpdated, setLastUpdated] = useState("");
  const [activeMetrics, setActiveMetrics] = useState([
    "revenue",
    "customers",
    "efficiency",
  ]);

  /*
  =============================
  LOAD CSV DATA (FIXED)
  =============================
  */

  useEffect(() => {

    const fetchData = async () => {
      const csvData = await loadCSV();
      setData(csvData);
    };

    const loadData = () => {
      const stored = localStorage.getItem("dashboardData");

      if (stored) {
        setData(JSON.parse(stored)); // ✅ uploaded CSV
      } else {
        fetchData(); // default CSV
      }
    };

    loadData();

    // ✅ FIX: use custom event instead of storage
    window.addEventListener("dataUpdated", loadData);

    return () => {
      window.removeEventListener("dataUpdated", loadData);
    };

  }, []);

  /*
  =============================
  TIMESTAMP
  =============================
  */

  useEffect(() => {
    const updateTimestamp = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setLastUpdated(timeString);
    };

    updateTimestamp();
    const interval = setInterval(updateTimestamp, 60000);

    return () => clearInterval(interval);
  }, []);

  /*
  =============================
  FILTER DATA
  =============================
  */

  let filteredData = [...data];

  if (dateRange === "q1-2026") {
    filteredData = filteredData.filter((row) => {
      const date = new Date(row["Order Date"]);
      const month = date.getMonth() + 1;
      return month >= 1 && month <= 3;
    });
  }

  if (dateRange === "q2-2025") {
    filteredData = filteredData.filter((row) => {
      const date = new Date(row["Order Date"]);
      const month = date.getMonth() + 1;
      return month >= 4 && month <= 6;
    });
  }

  if (dateRange === "q3-2025") {
    filteredData = filteredData.filter((row) => {
      const date = new Date(row["Order Date"]);
      const month = date.getMonth() + 1;
      return month >= 7 && month <= 9;
    });
  }

  if (dateRange === "q4-2025") {
    filteredData = filteredData.filter((row) => {
      const date = new Date(row["Order Date"]);
      const month = date.getMonth() + 1;
      return month >= 10 && month <= 12;
    });
  }

  if (department !== "all") {
    filteredData = filteredData.filter((row) => row.Region === department);
  }

  /*
  =============================
  METRICS
  =============================
  */

  const totalSales = calculateTotalSales(filteredData);
  const totalProfit = calculateTotalProfit(filteredData);
  const totalQuantity = calculateTotalQuantity(filteredData);
  const regionSales = salesByRegion(filteredData);
  const categorySales = salesByCategory(filteredData);

  /*
  =============================
  KPI CARDS
  =============================
  */

  const kpiData = [
    {
      title: "Total Sales",
      value: totalSales.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      }),
      change: 0,
      target: null,
      icon: "TrendingUp",
      iconColor: "var(--color-success)",
      trend: [],
    },
    {
      title: "Total Profit",
      value: totalProfit.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      }),
      change: 0,
      target: null,
      icon: "TrendingUp",
      iconColor: "var(--color-primary)",
      trend: [],
    },
    {
      title: "Total Quantity",
      value: totalQuantity.toLocaleString("en-IN"),
      change: 0,
      target: null,
      icon: "Users",
      iconColor: "var(--color-accent)",
      trend: [],
    },
    {
      title: "Regions",
      value: regionSales.length,
      change: 0,
      target: null,
      icon: "Zap",
      iconColor: "var(--color-warning)",
      trend: [],
    },
  ];

  /*
  =============================
  CHART DATA
  =============================
  */

  const chartData = regionSales.map((r) => ({
    period: r.region,
    revenue: r.sales,
    customers: 0,
    efficiency: 0,
  }));

  const chartMetrics = [
    { key: "revenue", label: "Sales", color: "var(--color-success)" },
  ];

  /*
  =============================
  CATEGORY PERFORMANCE
  =============================
  */

  const departmentPerformance = categorySales.map((c) => ({
    name: c.name,
    metric: "Sales Performance",

    current: c.sales.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    }),

    target: (c.sales * 1.2).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    }),

    icon: "TrendingUp",
    color: "var(--color-success)",
  }));

  const handleRefresh = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    setLastUpdated(timeString);
  };

  const handleMetricToggle = (metricKey) => {
    setActiveMetrics((prev) =>
      prev.includes(metricKey)
        ? prev.filter((key) => key !== metricKey)
        : [...prev, metricKey]
    );
  };

  return (
    <>
      <Helmet>
        <title>Executive Overview - AnalyticsPro</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <NavigationBar />

        <main className="pt-20 md:pt-24 px-4 md:px-6 lg:px-8 pb-8 md:pb-12">
          <div className="max-w-[1600px] mx-auto">

            <FilterControls
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              department={department}
              onDepartmentChange={setDepartment}
              comparisonEnabled={false}
              onComparisonToggle={() => {}}
              onRefresh={handleRefresh}
              lastUpdated={lastUpdated}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              {kpiData.map((kpi, index) => (
                <KPICard key={index} {...kpi} />
              ))}
            </div>

            <MetricsChart
              data={chartData}
              metrics={chartMetrics}
              onMetricToggle={handleMetricToggle}
            />

            <PerformanceScorecard departments={departmentPerformance} />

          </div>
        </main>
      </div>
    </>
  );
};

export default ExecutiveOverview;