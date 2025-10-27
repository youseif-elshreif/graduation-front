// FILE: src/components/ThreatFilterBar.tsx
// Filter bar component for threat management pages

import React, { useState } from "react";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";
import { ThreatFilterBarProps, FilterState } from "@/types/threats";

const ThreatFilterBar: React.FC<ThreatFilterBarProps> = ({
  onFiltersChange,
  initialFilters = {},
}) => {
  const [filters, setFilters] = useState({
    search: "",
    threatTypes: [],
    severity: "all",
    source: "",
    timeRange: "all",
    ...initialFilters,
  });

  const threatTypeOptions = [
    "DDoS",
    "Port Scan",
    "Brute Force",
    "SQLi",
    "XSS",
    "Malware",
    "Phishing",
    "Vulnerability Scan",
    "Data Exfiltration",
    "Buffer Overflow",
  ];

  const severityOptions = [
    { value: "all", label: "All Severities" },
    { value: "Critical", label: "Critical" },
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];

  const timeRangeOptions = [
    { value: "all", label: "All Time" },
    { value: "1min", label: "Last 1 min" },
    { value: "5min", label: "Last 5 min" },
    { value: "1hour", label: "Last 1 hour" },
    { value: "24hours", label: "Last 24 hours" },
  ];

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  };

  const toggleThreatType = (type: string) => {
    const newThreatTypes = filters.threatTypes.includes(type)
      ? filters.threatTypes.filter((t) => t !== type)
      : [...filters.threatTypes, type];

    updateFilters({ threatTypes: newThreatTypes });
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: "",
      threatTypes: [],
      severity: "all",
      source: "",
      timeRange: "all",
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-600 text-white";
      case "High":
        return "bg-orange-500 text-white";
      case "Medium":
        return "bg-yellow-400 text-black";
      case "Low":
        return "bg-green-400 text-black";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const hasActiveFilters =
    filters.search ||
    filters.threatTypes.length > 0 ||
    filters.severity !== "all" ||
    filters.source ||
    filters.timeRange !== "all";

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 mb-6 shadow-lg">
      {/* Search and Basic Filters Row */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by IP, threat type, or description..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg 
                     text-white placeholder-gray-300 focus:outline-none focus:ring-2 
                     focus:ring-blue-400 focus:border-transparent transition-all"
          />
        </div>

        {/* Severity Filter */}
        <div className="min-w-[180px]">
          <select
            value={filters.severity}
            onChange={(e) => updateFilters({ severity: e.target.value })}
            className="w-full py-3 px-4 bg-white/20 border border-white/30 rounded-lg 
                     text-white focus:outline-none focus:ring-2 focus:ring-blue-400 
                     focus:border-transparent transition-all"
          >
            {severityOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-gray-800 text-white"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Time Range Filter */}
        <div className="min-w-40">
          <select
            value={filters.timeRange}
            onChange={(e) => updateFilters({ timeRange: e.target.value })}
            className="w-full py-3 px-4 bg-white/20 border border-white/30 rounded-lg 
                     text-white focus:outline-none focus:ring-2 focus:ring-blue-400 
                     focus:border-transparent transition-all"
          >
            {timeRangeOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-gray-800 text-white"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-3 bg-red-500/20 border border-red-400/30 
                     rounded-lg text-red-300 hover:bg-red-500/30 transition-all"
          >
            <FiX className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      {/* Source Filter Row */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by source IP or label..."
          value={filters.source}
          onChange={(e) => updateFilters({ source: e.target.value })}
          className="w-full lg:w-1/3 px-4 py-2 bg-white/20 border border-white/30 rounded-lg 
                   text-white placeholder-gray-300 focus:outline-none focus:ring-2 
                   focus:ring-blue-400 focus:border-transparent transition-all"
        />
      </div>

      {/* Threat Types Tags */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <FiFilter className="w-4 h-4 text-gray-300" />
          <span className="text-sm font-medium text-gray-300">
            Threat Types:
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {threatTypeOptions.map((type) => {
            const isSelected = filters.threatTypes.includes(type);
            return (
              <button
                key={type}
                onClick={() => toggleThreatType(type)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isSelected
                    ? "bg-blue-500 text-white shadow-lg transform scale-105"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ThreatFilterBar;
