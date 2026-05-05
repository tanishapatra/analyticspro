import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, change, trend, target, icon, iconColor }) => {
  const targetProgress = target ? (value / target) * 100 : null;

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-sm border border-border hover:shadow-md transition-smooth">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex-1">
          <p className="text-sm md:text-base text-muted-foreground font-medium mb-1">
            {title}
          </p>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground">
            {value}
          </h3>
        </div>
        <div 
          className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Icon name={icon} size={20} color={iconColor} className="md:w-6 md:h-6" />
        </div>
      </div>

      {/* ❌ removed fake change + comparison */}

      {target && (
        <div className="mt-3 md:mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Target Progress</span>
            <span className="text-xs font-medium text-foreground">{targetProgress?.toFixed(1)}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${Math.min(targetProgress, 100)}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-3 md:mt-4 h-12 md:h-16">
        <svg width="100%" height="100%" className="sparkline">
          <polyline
            points={trend?.map((val, idx) => 
              `${(idx / (trend?.length - 1)) * 100},${100 - val}`
            )?.join(' ')}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
};

export default KPICard;