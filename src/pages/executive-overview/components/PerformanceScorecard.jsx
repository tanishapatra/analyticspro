import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceScorecard = ({ departments }) => {
  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4 md:mb-6 flex-wrap gap-3">
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
          Department Performance Scorecard
        </h3>
      </div>

      <div className="space-y-4 md:space-y-6">
        {departments?.map((dept, index) => {
          const progressPercentage = (dept?.current / dept?.target) * 100;
          const isOnTarget = progressPercentage >= 90;

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">

                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${dept?.color}15` }}
                  >
                    <Icon name={dept?.icon} size={18} color={dept?.color} className="md:w-5 md:h-5" />
                  </div>

                  <div>
                    <p className="text-sm md:text-base font-medium text-foreground">
                      {dept?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {dept?.metric}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm md:text-base font-semibold text-foreground">
                      {dept?.current?.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Target: {dept?.target?.toLocaleString()}
                    </p>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isOnTarget ? 'bg-success/10' : 'bg-warning/10'
                  }`}>
                    <Icon 
                      name={isOnTarget ? 'CheckCircle' : 'Clock'}
                      size={16}
                      color={isOnTarget ? 'var(--color-success)' : 'var(--color-warning)'}
                    />
                  </div>
                </div>

              </div>

              <div className="relative">
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-500 rounded-full"
                    style={{ 
                      width: `${Math.min(progressPercentage, 100)}%`,
                      backgroundColor: dept?.color
                    }}
                  />
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerformanceScorecard;