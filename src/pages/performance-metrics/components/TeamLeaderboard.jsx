import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TeamLeaderboard = ({ members }) => {
  const getRankChangeIcon = (change) => {
    if (change > 0) return { icon: 'ArrowUp', color: 'text-success' };
    if (change < 0) return { icon: 'ArrowDown', color: 'text-error' };
    return { icon: 'Minus', color: 'text-muted-foreground' };
  };

  // 🔥 FIX: removed "Needs Improvement"
  const getPerformanceBadge = (score) => {
    if (score >= 90) return { label: 'Excellent', color: 'bg-success/10 text-success' };
    if (score >= 75) return { label: 'Good', color: 'bg-primary/10 text-primary' };
    if (score >= 60) return { label: 'Average', color: 'bg-accent/10 text-accent' };
    return null; // ❌ nothing for low scores
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-5 lg:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-1">
            Team Leaderboard
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground">
            Top performers this period
          </p>
        </div>
        <Icon name="Trophy" size={24} color="var(--color-accent)" />
      </div>

      <div className="space-y-3 md:space-y-4">
        {members?.map((member, index) => {
          const rankChange = getRankChangeIcon(member?.rankChange);
          const badge = getPerformanceBadge(member?.score);

          return (
            <div 
              key={member?.id}
              className="flex items-center gap-3 md:gap-4 p-3 rounded-lg hover:bg-muted/50 transition-smooth"
            >
              <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 text-primary font-semibold text-sm md:text-base flex-shrink-0">
                {index + 1}
              </div>

              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image 
                  src={member?.avatar}
                  alt={member?.avatarAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm md:text-base font-medium text-foreground truncate">
                    {member?.name}
                  </h4>

                  {/* 🔥 FIX: hide NaN */}
                  {member?.rankChange !== undefined && !isNaN(member?.rankChange) && (
                    <div className={`flex items-center gap-1 ${rankChange?.color}`}>
                      <Icon name={rankChange?.icon} size={14} />
                      <span className="text-xs font-medium">
                        {Math.abs(member?.rankChange)}
                      </span>
                    </div>
                  )}

                </div>

                <p className="text-xs text-muted-foreground truncate">
                  {member?.role}
                </p>
              </div>

              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-base md:text-lg font-semibold text-foreground whitespace-nowrap">
                  {member?.score}%
                </span>

                {/* 🔥 FIX: only show badge if exists */}
                {badge && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${badge?.color} whitespace-nowrap`}>
                    {badge?.label}
                  </span>
                )}

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamLeaderboard;