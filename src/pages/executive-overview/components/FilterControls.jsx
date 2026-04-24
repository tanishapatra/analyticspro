import React from "react";
import Select from "../../../components/ui/Select";
import Icon from "../../../components/AppIcon";

const FilterControls = ({
  dateRange,
  onDateRangeChange,
  department,
  onDepartmentChange,
  comparisonEnabled,
  onComparisonToggle,
  onRefresh,
  lastUpdated,
}) => {
  const dateRangeOptions = [
    { value: "q1-2026", label: "Q1 2026 (Jan-Mar)" },
    { value: "q4-2025", label: "Q4 2025 (Oct-Dec)" },
    { value: "q3-2025", label: "Q3 2025 (Jul-Sep)" },
    { value: "q2-2025", label: "Q2 2025 (Apr-Jun)" },
    { value: "ytd-2026", label: "Year to Date 2026" },
    { value: "last-12-months", label: "Last 12 Months" },
  ];

  /*
  =============================
  REGION FILTER (UPDATED)
  =============================
  */

  const departmentOptions = [
    { value: "all", label: "All Regions" },
    { value: "West", label: "West" },
    { value: "East", label: "East" },
    { value: "Central", label: "Central" },
    { value: "South", label: "South" },
  ];

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-sm border border-border mb-4 md:mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3 flex-wrap flex-1">

          {/* Date Range Filter */}
          <div className="w-full sm:w-auto sm:min-w-[200px]">
            <Select
              options={dateRangeOptions}
              value={dateRange}
              onChange={onDateRangeChange}
              placeholder="Select period"
            />
          </div>

          {/* Region Filter */}
          <div className="w-full sm:w-auto sm:min-w-[200px]">
            <Select
              options={departmentOptions}
              value={department}
              onChange={onDepartmentChange}
              placeholder="Select region"
            />
          </div>

          {/* Comparison Toggle (Disabled for project) */}
          {/*
          <button
            onClick={onComparisonToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth min-h-[44px] ${
              comparisonEnabled
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            <Icon name="GitCompare" size={16} />
            <span className="whitespace-nowrap">Period Comparison</span>
          </button>
          */}

        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>Updated: {lastUpdated}</span>
          </div>

          <button
            onClick={onRefresh}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-smooth"
            aria-label="Refresh data"
          >
            <Icon name="RefreshCw" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;