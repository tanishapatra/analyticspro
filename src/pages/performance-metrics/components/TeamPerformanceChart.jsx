import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const TeamPerformanceChart = ({ data }) => {

  const COLORS = {
    bar: 'var(--color-primary)'
  };

  // 🔥 TOOLTIP (ONLY SALES NOW)
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {

      const sales = payload.find(p => p.dataKey === "productivity");

      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3 md:p-4">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>

          {sales && (
            <div className="flex justify-between gap-4 text-xs">
              <span className="text-muted-foreground">Sales:</span>
              <span className="font-semibold text-primary">
                ₹ {Number(sales.value || 0).toLocaleString('en-IN')}
              </span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-5 lg:p-6 shadow-sm">

      {/* HEADER */}
      <div className="mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-1">
          Team Performance Analysis
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground">
          Sales distribution across customers
        </p>
      </div>

      {/* CHART */}
      <div className="w-full h-64 md:h-80 lg:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />

            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
            />

            <YAxis
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend />

            {/* 🔥 ONLY SALES BAR */}
            <Bar
              dataKey="productivity"
              fill={COLORS.bar}
              radius={[4, 4, 0, 0]}
              name="Sales"
            />

          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TeamPerformanceChart;