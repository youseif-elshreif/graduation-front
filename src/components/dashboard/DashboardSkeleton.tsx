import React from "react";

const DashboardSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-indigo-100">
      <div className="flex h-screen">
        {/* Sidebar Skeleton */}
        <div className="w-64 bg-white shadow-xl">
          {/* Logo Area */}
          <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg animate-pulse"></div>
              <div>
                <div className="w-16 h-4 bg-gray-200 rounded mb-1 animate-pulse"></div>
                <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="p-4 space-y-2">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg ${
                  index === 0 ? "bg-blue-50" : ""
                }`}
              >
                <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* User Section */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <div className="w-20 h-4 bg-gray-200 rounded mb-1 animate-pulse"></div>
                <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header Skeleton */}
          <div className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
            <div>
              <div className="w-40 h-6 bg-gray-200 rounded mb-1 animate-pulse"></div>
              <div className="w-60 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                <div>
                  <div className="w-24 h-4 bg-gray-200 rounded mb-1 animate-pulse"></div>
                  <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Date Range Filter Skeleton */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="w-24 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="w-28 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>

              {/* KPI Cards Skeleton - 4 cards in a row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl animate-pulse"></div>
                      <div className="w-8 h-6 bg-green-100 rounded animate-pulse"></div>
                    </div>
                    <div className="w-20 h-8 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="w-16 h-4 bg-gray-200 rounded mb-1 animate-pulse"></div>
                    <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="space-y-8">
                {/* Row 1: Timeline (3 cols) + Attack Types (2 cols) */}
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                  <div className="xl:col-span-3">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-24 h-8 bg-blue-100 rounded-lg animate-pulse"></div>
                      </div>
                      <div className="w-full h-80 bg-gray-100 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                  <div className="xl:col-span-2">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                      <div className="w-28 h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
                      <div className="w-full h-80 bg-gray-100 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Row 2: Severity Levels */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                    <div className="w-32 h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
                    <div className="w-full h-80 bg-gray-100 rounded-lg animate-pulse"></div>
                  </div>
                </div>

                {/* Row 3: Protocol Analysis + Security Overview + System Health */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Protocol Analysis */}
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                    <div className="w-32 h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-blue-200 rounded-full animate-pulse"></div>
                            <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-20 h-2 bg-gray-200 rounded-full animate-pulse"></div>
                            <div className="w-8 h-3 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Security Overview */}
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                    <div className="w-32 h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
                    <div className="space-y-4">
                      {[
                        { bg: "bg-red-50", color: "bg-red-200" },
                        { bg: "bg-orange-50", color: "bg-orange-200" },
                        { bg: "bg-green-50", color: "bg-green-200" },
                        { bg: "bg-blue-50", color: "bg-blue-200" },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className={`flex justify-between items-center p-3 rounded-lg ${item.bg}`}
                        >
                          <div
                            className={`w-24 h-4 ${item.color} rounded animate-pulse`}
                          ></div>
                          <div
                            className={`w-8 h-6 ${item.color} rounded animate-pulse`}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* System Health */}
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                    <div className="w-28 h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
                    <div className="space-y-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-12 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Row 4: Tables - Blocked IPs + Blocked Ports */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {/* Blocked IPs Table */}
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="w-36 h-6 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-16 h-6 bg-red-100 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      {/* Table Header */}
                      <div className="bg-gray-50 px-6 py-3">
                        <div className="grid grid-cols-4 gap-4">
                          <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-14 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                      {/* Table Rows */}
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="px-6 py-4 border-b border-gray-200 hover:bg-gray-50"
                        >
                          <div className="grid grid-cols-4 gap-4 items-center">
                            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-16 h-6 bg-red-100 rounded-full animate-pulse"></div>
                            <div className="w-16 h-6 bg-green-100 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Blocked Ports Table */}
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-20 h-6 bg-orange-100 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      {/* Table Header */}
                      <div className="bg-gray-50 px-6 py-3">
                        <div className="grid grid-cols-4 gap-4">
                          <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-14 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                      {/* Table Rows */}
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="px-6 py-4 border-b border-gray-200 hover:bg-gray-50"
                        >
                          <div className="grid grid-cols-4 gap-4 items-center">
                            <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-16 h-6 bg-yellow-100 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
