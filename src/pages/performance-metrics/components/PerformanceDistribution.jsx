import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const PerformanceDistribution = ({ data }) => {
  const COLORS = [
    'var(--color-error)',
    'var(--color-warning)',
    'var(--color-accent)',
    'var(--color-success)',
    'var(--color-primary)'
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-foreground mb-1">
            {payload?.[0]?.payload?.range}
          </p>
          <p className="text-xs text-muted-foreground">
            {payload?.[0]?.value} orders
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-5 lg:p-6 shadow-sm">
      <div className="mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-1">
          Performance Distribution
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground">
          Order distribution across sales ranges
        </p>
      </div>

      <div className="w-full h-48 md:h-56 lg:h-64" aria-label="Performance Distribution Histogram">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />

            <XAxis 
              dataKey="range" 
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />

            <YAxis 
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 11 }}
              label={{ 
                value: 'Orders', 
                angle: -90, 
                position: 'insideLeft',
                style: { fill: 'var(--color-muted-foreground)', fontSize: 11 }
              }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Bar 
              dataKey="count" 
              radius={[4, 4, 0, 0]}
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {data?.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
            />
            <span className="text-xs text-muted-foreground truncate">
              {item?.range}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceDistribution;