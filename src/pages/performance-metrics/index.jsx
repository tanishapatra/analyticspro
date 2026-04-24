import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import NavigationBar from '../../components/ui/NavigationBar';
import Select from '../../components/ui/Select';
import { loadCSV } from '../../utils/loadCSV';

import MetricCard from './components/MetricCard';
import TeamPerformanceChart from './components/TeamPerformanceChart';
import TeamLeaderboard from './components/TeamLeaderboard';
import PerformanceDistribution from './components/PerformanceDistribution';
// ❌ removed MilestoneTracker import
import ResourceAllocationMatrix from './components/ResourceAllocationMatrix';

const PerformanceMetrics = () => {
  const [data, setData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('engineering');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  // 🔥 FIXED: now listens to uploaded CSV change
  useEffect(() => {

    const fetchData = async () => {
      const csv = await loadCSV();
      setData(csv);
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

    // ✅ LISTEN TO CUSTOM EVENT
    window.addEventListener("dataUpdated", loadData);

    return () => {
      window.removeEventListener("dataUpdated", loadData);
    };

  }, []);

  const teamMap = {
    engineering: 'Technology',
    sales: 'Office Supplies',
    marketing: 'Furniture'
  };

  // 🔥 FILTER (unchanged)
  const filteredData = useMemo(() => {
    return data
      .filter(row => row["Category"] === teamMap[selectedTeam])
      .filter(row => {
        const date = new Date(row["Order Date"]);
        if (isNaN(date)) return false;

        const m = date.getMonth();

        if (selectedPeriod === 'monthly') return m === 0;
        if (selectedPeriod === 'quarterly') return m >= 0 && m <= 2;
        if (selectedPeriod === 'yearly') return true;

        return true;
      });
  }, [data, selectedTeam, selectedPeriod]);

  // 🔥 KPI (unchanged)
  const totalSales = filteredData.reduce((s, r) => s + Number(r.Sales || 0), 0);
  const totalProfit = filteredData.reduce((s, r) => s + Number(r.Profit || 0), 0);
  const totalQuantity = filteredData.reduce((s, r) => s + Number(r.Quantity || 0), 0);

  const profitMargin = totalSales ? (totalProfit / totalSales) * 100 : 0;

  const performanceMetrics = [
    {
      title: 'Total Sales',
      value: totalSales.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }),
      iconName: 'TrendingUp',
      iconColor: 'var(--color-primary)',
      trend: 'up',
      trendValue: 'Live'
    },
    {
      title: 'Total Profit',
      value: totalProfit.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }),
      iconName: 'Activity',
      iconColor: 'var(--color-success)',
      trend: 'up',
      trendValue: 'Live'
    },
    {
      title: 'Total Quantity',
      value: totalQuantity.toLocaleString('en-IN'),
      iconName: 'Package',
      iconColor: 'var(--color-accent)',
      trend: 'neutral',
      trendValue: 'Live'
    },
    {
      title: 'Profit Margin',
      value: `${profitMargin.toFixed(2)}%`,
      iconName: 'Target',
      iconColor: 'var(--color-secondary)',
      trend: profitMargin > 20 ? 'up' : 'down',
      trendValue: 'Efficiency'
    }
  ];

  // 🔥 CUSTOMER MAP (unchanged)
  const customerMap = {};
  filteredData.forEach(row => {
    const name = row["Customer Name"];
    const sales = Number(row.Sales || 0);
    const profit = Number(row.Profit || 0);
    const qty = Number(row.Quantity || 0);

    if (!customerMap[name]) {
      customerMap[name] = { sales: 0, profit: 0, qty: 0 };
    }

    customerMap[name].sales += sales;
    customerMap[name].profit += profit;
    customerMap[name].qty += qty;
  });

  const chartData = Object.entries(customerMap).map(([name, v]) => ({
    name,
    productivity: v.sales
  }));

  // 🔥 LEADERBOARD (unchanged)
  const leaderboardMembers = Object.entries(customerMap)
    .map(([name, v], i) => {
      const score = v.sales > 0 ? (v.profit / v.sales) * 100 : 0;

      return {
        id: i,
        name,
        role: 'Customer',
        avatar: `https://randomuser.me/api/portraits/men/${i % 50}.jpg`,
        score: Math.round(score)
      };
    })
    .filter(m => !isNaN(m.score))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  // 🔥 DISTRIBUTION (unchanged)
  const distributionData = [
    { range: '0-5000', count: 0 },
    { range: '5000-20000', count: 0 },
    { range: '20000-50000', count: 0 },
    { range: '50000+', count: 0 }
  ];

  filteredData.forEach(row => {
    const s = Number(row.Sales || 0);

    if (s <= 5000) distributionData[0].count++;
    else if (s <= 20000) distributionData[1].count++;
    else if (s <= 50000) distributionData[2].count++;
    else distributionData[3].count++;
  });

  // 🔥 RESOURCE (unchanged)
  const regionMap = {};
  filteredData.forEach(row => {
    const region = row.Region;
    const sales = Number(row.Sales || 0);

    if (!regionMap[region]) regionMap[region] = 0;
    regionMap[region] += sales;
  });

  const totalRegionSales = Object.values(regionMap).reduce((a, b) => a + b, 0);

  const resourceAllocations = Object.entries(regionMap).map(([region, val], i) => {
    const capacity = 40;

    const utilizationPercent = totalRegionSales
      ? (val / totalRegionSales) * 100
      : 0;

    const utilization = Math.round(utilizationPercent);
    const hours = Math.round((utilization / 100) * capacity);

    let status = "Under-utilized";
    if (utilization >= 90) status = "Over-allocated";
    else if (utilization >= 75) status = "High Load";
    else if (utilization >= 50) status = "Optimal";

    return {
      id: i,
      name: region,
      role: 'Region',
      project: selectedTeam.toUpperCase(),
      utilization,
      hoursPerWeek: hours,
      totalCapacity: capacity,
      status
    };
  });

  return (
    <>
      <Helmet>
        <title>Performance Metrics</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <NavigationBar />

        <main className="pt-20 px-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Select value={selectedTeam} onChange={setSelectedTeam} options={[
              { value: 'engineering', label: 'Engineering' },
              { value: 'sales', label: 'Sales' },
              { value: 'marketing', label: 'Marketing' }
            ]} />

            <Select value={selectedPeriod} onChange={setSelectedPeriod} options={[
              { value: 'monthly', label: 'Monthly' },
              { value: 'quarterly', label: 'Quarterly' },
              { value: 'yearly', label: 'Yearly' }
            ]} />
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            {performanceMetrics.map((m, i) => (
              <MetricCard key={i} {...m} />
            ))}
          </div>

          <TeamPerformanceChart data={chartData} />
          <TeamLeaderboard members={leaderboardMembers} />

          <PerformanceDistribution data={distributionData} />
          <ResourceAllocationMatrix allocations={resourceAllocations} />

        </main>
      </div>
    </>
  );
};

export default PerformanceMetrics;