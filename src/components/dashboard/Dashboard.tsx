"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
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

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
  } | null>(null);

  useEffect(() => {
    const initializeDashboard = () => {
      // Check authentication
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      const userData = localStorage.getItem("user");

      if (!isAuthenticated || isAuthenticated !== "true") {
        window.location.href = "/";
        return;
      }

      if (userData) {
        setUser(JSON.parse(userData));
      }

      // Simulate loading
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    initializeDashboard();
  }, []);

  const handleFilterChange = (filters: {
    dateRange: string;
    timeRange: string;
    severity: string[];
    attackTypes: string[];
  }) => {
    console.log("Filters changed:", filters);
    // Here you would typically update your data based on filters
  };

  if (isLoading || !user) {
    return <DashboardSkeleton />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
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
                          <span className="text-sm text-gray-600">
                            {protocol.count}
                          </span>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${protocol.color}`}
                              style={{ width: `${protocol.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 w-8">
                            {protocol.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Overview */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Security Overview
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium text-red-700">
                        Critical Threats
                      </span>
                      <span className="text-lg font-bold text-red-600">12</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="text-sm font-medium text-orange-700">
                        High Priority
                      </span>
                      <span className="text-lg font-bold text-orange-600">
                        28
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-green-700">
                        Blocked Successfully
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        1,247
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-blue-700">
                        Detection Rate
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        96.8%
                      </span>
                    </div>
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
                        value: 68,
                        color: "text-yellow-600",
                        bg: "bg-yellow-500",
                      },
                      {
                        name: "Memory",
                        value: 45,
                        color: "text-green-600",
                        bg: "bg-green-500",
                      },
                      {
                        name: "Storage",
                        value: 35,
                        color: "text-blue-600",
                        bg: "bg-blue-500",
                      },
                      {
                        name: "Network",
                        value: 78,
                        color: "text-purple-600",
                        bg: "bg-purple-500",
                      },
                    ].map((metric) => (
                      <div key={metric.name}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">
                            {metric.name}
                          </span>
                          <span className={`text-sm font-bold ${metric.color}`}>
                            {metric.value}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${metric.bg}`}
                            style={{ width: `${metric.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 4: Enhanced Tables */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Enhanced Blocked IPs */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900">
                        Recent Blocked IPs
                      </h3>
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                        {mockKPIData.blockedIPs.today} Today
                      </span>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            IP Address
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Country
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Threat
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {[
                          {
                            ip: "185.220.101.42",
                            country: "🇷🇺 Russia",
                            threat: "DDoS",
                            status: "Blocked",
                            time: "2m ago",
                          },
                          {
                            ip: "103.28.36.181",
                            country: "🇨🇳 China",
                            threat: "Brute Force",
                            status: "Blocked",
                            time: "5m ago",
                          },
                          {
                            ip: "45.146.164.110",
                            country: "🇳🇱 Netherlands",
                            threat: "Port Scan",
                            status: "Monitored",
                            time: "8m ago",
                          },
                          {
                            ip: "91.240.118.172",
                            country: "🇺🇦 Ukraine",
                            threat: "Web Attack",
                            status: "Blocked",
                            time: "12m ago",
                          },
                        ].map((item, index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 text-sm font-mono text-gray-900">
                              {item.ip}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {item.country}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  item.threat === "DDoS"
                                    ? "bg-red-100 text-red-800"
                                    : item.threat === "Brute Force"
                                    ? "bg-orange-100 text-orange-800"
                                    : item.threat === "Port Scan"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-purple-100 text-purple-800"
                                }`}
                              >
                                {item.threat}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  item.status === "Blocked"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-blue-100 text-blue-800"
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
                  <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                      View All Blocked IPs ({mockKPIData.blockedIPs.total}{" "}
                      total) →
                    </button>
                  </div>
                </div>

                {/* Enhanced Blocked Ports */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900">
                        Secured Ports
                      </h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {mockKPIData.blockedPorts.total} Active
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {[
                      {
                        port: "22",
                        protocol: "SSH",
                        attacks: 145,
                        status: "Protected",
                        risk: "high",
                      },
                      {
                        port: "23",
                        protocol: "Telnet",
                        attacks: 89,
                        status: "Protected",
                        risk: "high",
                      },
                      {
                        port: "135",
                        protocol: "RPC",
                        attacks: 67,
                        status: "Protected",
                        risk: "medium",
                      },
                      {
                        port: "445",
                        protocol: "SMB",
                        attacks: 43,
                        status: "Monitored",
                        risk: "medium",
                      },
                      {
                        port: "3389",
                        protocol: "RDP",
                        attacks: 28,
                        status: "Protected",
                        risk: "low",
                      },
                    ].map((port) => (
                      <div
                        key={port.port}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900">
                              {port.port}
                            </div>
                            <div className="text-xs text-gray-500">
                              {port.protocol}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {port.attacks} attacks blocked
                            </p>
                            <p className="text-xs text-gray-500">
                              Last 24 hours
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              port.risk === "high"
                                ? "bg-red-100 text-red-800"
                                : port.risk === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {port.risk} risk
                          </span>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              port.status === "Protected"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {port.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                      Manage All Ports →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {activeTab
                  .replace("-", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </h3>
              <p className="text-gray-500">This section is under development</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ${
          isSidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* Header */}
        <Header
          userName={`${user.firstName} ${user.lastName}`}
          userRole={user.role}
          notificationCount={5}
          title={
            activeTab === "dashboard"
              ? "Security Dashboard"
              : activeTab
                  .replace("-", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())
          }
          subtitle={
            activeTab === "dashboard"
              ? "Real-time monitoring and threat detection system overview"
              : `Manage ${activeTab.replace("-", " ")}`
          }
          sidebarWidth={isSidebarCollapsed ? "w-16" : "w-64"}
        />

        {/* Page Content */}
        <main className="pt-24 px-6 pb-8">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
