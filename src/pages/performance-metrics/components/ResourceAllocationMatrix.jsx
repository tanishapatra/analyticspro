import React from 'react';
import Icon from '../../../components/AppIcon';

const ResourceAllocationMatrix = ({ allocations }) => {
  const getUtilizationColor = (utilization) => {
    if (utilization >= 90) return 'bg-error text-error-foreground';
    if (utilization >= 75) return 'bg-warning text-warning-foreground';
    if (utilization >= 50) return 'bg-success text-success-foreground';
    return 'bg-muted text-muted-foreground';
  };

  const getCapacityStatus = (utilization) => {
    if (utilization >= 90) return 'Over-allocated';
    if (utilization >= 75) return 'High Load';
    if (utilization >= 50) return 'Optimal';
    return 'Under-utilized';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-5 lg:p-6 shadow-sm">
      <div className="mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-1">
          Resource Allocation Matrix
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground">
          Capacity planning and workload distribution across projects
        </p>
      </div>

      <div className="overflow-x-auto -mx-4 md:-mx-5 lg:-mx-6 px-4 md:px-5 lg:px-6">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-12 gap-2 mb-3 pb-2 border-b border-border">
            <div className="col-span-3 text-xs font-medium text-muted-foreground">
              Team Member
            </div>
            <div className="col-span-3 text-xs font-medium text-muted-foreground">
              Current Project
            </div>
            <div className="col-span-2 text-xs font-medium text-muted-foreground text-center">
              Utilization
            </div>
            <div className="col-span-2 text-xs font-medium text-muted-foreground text-center">
              Estimated Weekly Load
            </div>
            <div className="col-span-2 text-xs font-medium text-muted-foreground text-center">
              Status
            </div>
          </div>

          <div className="space-y-2">
            {allocations?.map((allocation) => (
              <div 
                key={allocation?.id}
                className="grid grid-cols-12 gap-2 items-center p-3 rounded-lg hover:bg-muted/50 transition-smooth"
              >
                <div className="col-span-3">
                  <p className="text-sm font-medium text-foreground truncate">
                    {allocation?.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {allocation?.role}
                  </p>
                </div>

                <div className="col-span-3">
                  <p className="text-sm text-foreground truncate">
                    {allocation?.project}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Icon name="Calendar" size={12} color="var(--color-muted-foreground)" />
                    <span className="text-xs text-muted-foreground">
                      {allocation?.timeline}
                    </span>
                  </div>
                </div>

                <div className="col-span-2 flex flex-col items-center">
                  <span className="text-base font-semibold text-foreground mb-1">
                    {allocation?.utilization}%
                  </span>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        allocation?.utilization >= 90 ? 'bg-error' :
                        allocation?.utilization >= 75 ? 'bg-warning' :
                        allocation?.utilization >= 50 ? 'bg-success': 'bg-muted-foreground'
                      }`}
                      style={{ width: `${allocation?.utilization}%` }}
                    />
                  </div>
                </div>

                <div className="col-span-2 text-center">
                  <p className="text-sm font-medium text-foreground">
                    {allocation?.hoursPerWeek}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    out of {allocation?.totalCapacity}h capacity
                  </p>
                </div>

                <div className="col-span-2 flex justify-center">
                  <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${getUtilizationColor(allocation?.utilization)}`}>
                    {getCapacityStatus(allocation?.utilization)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ❌ legend removed completely */}

    </div>
  );
};

export default ResourceAllocationMatrix;