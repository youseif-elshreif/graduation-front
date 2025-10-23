"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/dashboard/Header";
import KPICards from "@/components/dashboard/KPICards";
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

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        userName={`${user.firstName} ${user.lastName}`}
        userRole={user.role}
        notificationCount={5}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Security Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Real-time monitoring and threat detection system overview
          </p>
        </div>

        {/* KPI Cards */}
        <KPICards data={mockKPIData} loading={isLoading} />

        {/* Charts Section */}
        <div className="space-y-8">
          {/* Row 1: Timeline & Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <AlertsTimelineChart
                data={mockAlertsTimelineData}
                loading={isLoading}
              />
            </div>
            <div className="lg:col-span-2">
              <AttackTypeChart
                data={mockAttackTypeDistribution}
                loading={isLoading}
              />
            </div>
          </div>

          {/* Row 3: Protocol Analysis & Security Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Top Network Protocols
              </h3>
              <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  Protocol analysis chart will be implemented here
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Network Security Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Most Attacked Ports
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    22, 80, 443
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Blocked Connections
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    1,247
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Detection Accuracy
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    96.8%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">System Status</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Healthy
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Blocking Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Blocked IPs
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        IP
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Country
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Reason
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        185.220.101.42
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        Russia
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        DDoS Attack
                      </td>
                      <td className="px-4 py-2">
                        <button className="text-xs text-red-600 hover:text-red-800">
                          Unblock
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        103.28.36.181
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">China</td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        Brute Force
                      </td>
                      <td className="px-4 py-2">
                        <button className="text-xs text-red-600 hover:text-red-800">
                          Unblock
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        45.146.164.110
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        Netherlands
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        Port Scan
                      </td>
                      <td className="px-4 py-2">
                        <button className="text-xs text-red-600 hover:text-red-800">
                          Unblock
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View All Blocked IPs →
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Blocked Ports
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="text-sm font-medium text-gray-900">
                      Port 22 (SSH)
                    </span>
                    <p className="text-xs text-gray-600">145 attacks blocked</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                    <button className="text-xs text-blue-600 hover:text-blue-800">
                      Manage
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="text-sm font-medium text-gray-900">
                      Port 23 (Telnet)
                    </span>
                    <p className="text-xs text-gray-600">89 attacks blocked</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                    <button className="text-xs text-blue-600 hover:text-blue-800">
                      Manage
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="text-sm font-medium text-gray-900">
                      Port 135 (RPC)
                    </span>
                    <p className="text-xs text-gray-600">67 attacks blocked</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                    <button className="text-xs text-blue-600 hover:text-blue-800">
                      Manage
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Manage All Ports →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
