"use client";

import React, { useState, useEffect } from "react";
import DateRangeFilter from "@/components/dashboard/DateRangeFilter";
import KPICards from "@/components/dashboard/KPICards";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import {
  AlertsTimelineChart,
  AttackTypeChart,
  SeverityLevelsChart,
} from "@/components/dashboard/Charts";
import {
  mockKPIData,
  mockAlertsTimelineData,
  mockAttackTypeDistribution,
  mockSeverityLevelData,
} from "@/data/mockData";

interface FilterState {
  dateRange: "today" | "yesterday" | "last7days" | "last30days" | "custom";
  customStartDate?: string;
  customEndDate?: string;
  timeRange: "all" | "last1h" | "last6h" | "last12h" | "last24h";
  severity: string[];
  attackTypes: string[];
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (filters: FilterState) => {
    console.log("Filters changed:", filters);
    // Handle filter changes here
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Date Range Filter */}
      <DateRangeFilter onFilterChange={handleFilterChange} />

      {/* KPI Cards */}
      <KPICards data={mockKPIData} />

      {/* Charts Section */}
      <div className="space-y-8">
        {/* Row 1: Timeline & Distribution */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <div className="xl:col-span-3">
            <AlertsTimelineChart data={mockAlertsTimelineData} />
          </div>
          <div className="xl:col-span-2">
            <AttackTypeChart data={mockAttackTypeDistribution} />
          </div>
        </div>

        {/* Row 2: Severity & Network Analysis */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <SeverityLevelsChart data={mockSeverityLevelData} />
        </div>

        {/* Row 3: Enhanced Statistics Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Protocol Analysis */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Protocol Analysis
            </h3>
            <div className="space-y-4">
              {[
                {
                  name: "TCP",
                  percentage: 45,
                  count: "15.4K",
                  color: "bg-blue-500",
                },
                {
                  name: "UDP",
                  percentage: 26,
                  count: "8.9K",
                  color: "bg-green-500",
                },
                {
                  name: "HTTP",
                  percentage: 13,
                  count: "4.2K",
                  color: "bg-yellow-500",
                },
                {
                  name: "HTTPS",
                  percentage: 8,
                  count: "2.8K",
                  color: "bg-purple-500",
                },
                {
                  name: "SSH",
                  percentage: 3,
                  count: "950",
                  color: "bg-red-500",
                },
              ].map((protocol) => (
                <div
                  key={protocol.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${protocol.color}`}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">
                      {protocol.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 min-w-12 text-right">
                      {protocol.count}
                    </span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${protocol.color} transition-all duration-500`}
                        style={{ width: `${protocol.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 w-8 text-right">
                      {protocol.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              System Health
            </h3>
            <div className="space-y-4">
              {[
                {
                  name: "CPU Usage",
                  value: 45,
                  status: "normal",
                  color: "bg-green-500",
                },
                {
                  name: "Memory",
                  value: 68,
                  status: "warning",
                  color: "bg-yellow-500",
                },
                {
                  name: "Disk Space",
                  value: 23,
                  status: "normal",
                  color: "bg-green-500",
                },
                {
                  name: "Network",
                  value: 89,
                  status: "critical",
                  color: "bg-red-500",
                },
              ].map((metric) => (
                <div key={metric.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {metric.name}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        metric.status === "critical"
                          ? "bg-red-100 text-red-800"
                          : metric.status === "warning"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {metric.value}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${metric.color} transition-all duration-500`}
                      style={{ width: `${metric.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Recent Alerts
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {[
                {
                  id: 1,
                  type: "High Risk",
                  message: "SQL Injection attempt detected",
                  time: "2 min ago",
                  severity: "critical",
                },
                {
                  id: 2,
                  type: "Medium Risk",
                  message: "Unusual login pattern observed",
                  time: "5 min ago",
                  severity: "warning",
                },
                {
                  id: 3,
                  type: "Low Risk",
                  message: "Port scan detected from 192.168.1.100",
                  time: "8 min ago",
                  severity: "info",
                },
                {
                  id: 4,
                  type: "High Risk",
                  message: "Brute force attack on SSH",
                  time: "12 min ago",
                  severity: "critical",
                },
              ].map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div
                    className={`w-3 h-3 ${
                      alert.severity === "critical"
                        ? "bg-red-500"
                        : alert.severity === "warning"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    } rounded-full mt-2 shrink-0`}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-sm font-medium ${
                        alert.severity === "critical"
                          ? "text-red-600"
                          : alert.severity === "warning"
                          ? "text-yellow-600"
                          : "text-blue-600"
                      } mb-1`}
                    >
                      {alert.type}
                    </div>
                    <div className="text-sm text-gray-700 mb-1 line-clamp-2">
                      {alert.message}
                    </div>
                    <div className="text-xs text-gray-500">{alert.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blocked Elements Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Blocked IPs */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Blocked IPs
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IP Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attacks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Seen
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { ip: "192.168.1.45", attacks: 156, lastSeen: "2 min ago" },
                    { ip: "10.0.0.23", attacks: 89, lastSeen: "5 min ago" },
                    { ip: "172.16.0.78", attacks: 67, lastSeen: "8 min ago" },
                    { ip: "203.45.67.89", attacks: 45, lastSeen: "12 min ago" },
                  ].map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                        {item.ip}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          {item.attacks}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.lastSeen}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Blocked Ports */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Blocked Ports
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Port
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Protocol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attacks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    {
                      port: 22,
                      protocol: "SSH",
                      attacks: 234,
                      status: "Critical",
                    },
                    {
                      port: 3389,
                      protocol: "RDP",
                      attacks: 178,
                      status: "High",
                    },
                    {
                      port: 80,
                      protocol: "HTTP",
                      attacks: 156,
                      status: "Medium",
                    },
                    {
                      port: 443,
                      protocol: "HTTPS",
                      attacks: 89,
                      status: "Low",
                    },
                  ].map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-gray-900">
                        {item.port}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.protocol}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                        {item.attacks}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            item.status === "Critical"
                              ? "bg-red-100 text-red-800"
                              : item.status === "High"
                              ? "bg-orange-100 text-orange-800"
                              : item.status === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
