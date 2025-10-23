'use client';

import React, { useState } from 'react';
import { FiCalendar, FiClock, FiFilter, FiRefreshCw } from 'react-icons/fi';
import { Button } from '@/components/ui';

interface DateRangeFilterProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  dateRange: 'today' | 'yesterday' | 'last7days' | 'last30days' | 'custom';
  customStartDate?: string;
  customEndDate?: string;
  timeRange: 'all' | 'last1h' | 'last6h' | 'last12h' | 'last24h';
  severity: string[];
  attackTypes: string[];
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: 'today',
    timeRange: 'all',
    severity: [],
    attackTypes: []
  });
  
  const [isExpanded, setIsExpanded] = useState(false);

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const timeRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'last1h', label: 'Last 1 Hour' },
    { value: 'last6h', label: 'Last 6 Hours' },
    { value: 'last12h', label: 'Last 12 Hours' },
    { value: 'last24h', label: 'Last 24 Hours' }
  ];

  const severityOptions = [
    { value: 'critical', label: 'Critical', color: 'text-red-600' },
    { value: 'high', label: 'High', color: 'text-orange-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'low', label: 'Low', color: 'text-blue-600' }
  ];

  const attackTypeOptions = [
    { value: 'ddos', label: 'DDoS Attack' },
    { value: 'brute_force', label: 'Brute Force' },
    { value: 'port_scan', label: 'Port Scan' },
    { value: 'web_attack', label: 'Web Attack' },
    { value: 'infiltration', label: 'Infiltration' },
    { value: 'botnet', label: 'Botnet' }
  ];

  const updateFilter = (key: keyof FilterState, value: FilterState[keyof FilterState]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const toggleSeverity = (severity: string) => {
    const newSeverity = filters.severity.includes(severity)
      ? filters.severity.filter(s => s !== severity)
      : [...filters.severity, severity];
    updateFilter('severity', newSeverity);
  };

  const toggleAttackType = (type: string) => {
    const newTypes = filters.attackTypes.includes(type)
      ? filters.attackTypes.filter(t => t !== type)
      : [...filters.attackTypes, type];
    updateFilter('attackTypes', newTypes);
  };

  const resetFilters = () => {
    const resetState: FilterState = {
      dateRange: 'today',
      timeRange: 'all',
      severity: [],
      attackTypes: []
    };
    setFilters(resetState);
    onFilterChange?.(resetState);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FiFilter className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Filter & Time Range</h3>
            <p className="text-sm text-gray-500">Customize your data view</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={resetFilters}
            className="flex items-center space-x-1"
          >
            <FiRefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </Button>
          
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-1"
          >
            <FiCalendar className="w-4 h-4" />
            <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
          </Button>
        </div>
      </div>

      {/* Quick Filters - Always Visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Date Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
            <FiCalendar className="w-4 h-4" />
            <span>Date Range</span>
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => updateFilter('dateRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {dateRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Time Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
            <FiClock className="w-4 h-4" />
            <span>Time Range</span>
          </label>
          <select
            value={filters.timeRange}
            onChange={(e) => updateFilter('timeRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {timeRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Custom Date Range */}
      {filters.dateRange === 'custom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              value={filters.customStartDate || ''}
              onChange={(e) => updateFilter('customStartDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              value={filters.customEndDate || ''}
              onChange={(e) => updateFilter('customEndDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="pt-4 border-t border-gray-200 space-y-4">
          {/* Severity Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Severity Levels</label>
            <div className="flex flex-wrap gap-2">
              {severityOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => toggleSeverity(option.value)}
                  className={`
                    px-3 py-1.5 rounded-lg text-sm font-medium border transition-all
                    ${filters.severity.includes(option.value)
                      ? `${option.color} bg-opacity-10 border-current`
                      : 'text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Attack Types Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Attack Types</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {attackTypeOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => toggleAttackType(option.value)}
                  className={`
                    px-3 py-2 rounded-lg text-sm font-medium border text-left transition-all
                    ${filters.attackTypes.includes(option.value)
                      ? 'text-blue-700 bg-blue-50 border-blue-200'
                      : 'text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {(filters.severity.length > 0 || filters.attackTypes.length > 0) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="font-medium">Active filters:</span>
            <span className="text-blue-600 font-medium">
              {filters.severity.length + filters.attackTypes.length} selected
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;