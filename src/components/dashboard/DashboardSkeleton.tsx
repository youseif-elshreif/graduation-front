import React from "react";
import {
  SkeletonCard,
  SkeletonKPICard,
  SkeletonChart,
  SkeletonTable,
  SkeletonFilter,
} from "@/components/ui";

interface DashboardSkeletonProps {
  showSidebar?: boolean;
}

const DashboardSkeleton: React.FC<DashboardSkeletonProps> = ({
  showSidebar = true,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <div className="flex h-screen">
        {/* Sidebar Skeleton */}
        {showSidebar && (
          <div className="w-64 bg-white shadow-xl">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded animate-pulse"></div>
                <div className="space-y-1">
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-2">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-3 p-3 rounded-lg"
                >
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="space-y-1">
                  <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                  <div className="h-2 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header Skeleton */}
          <div className="h-16 bg-white shadow border-b border-gray-200">
            <div className="flex items-center justify-between h-full px-6">
              <div className="flex items-center space-x-4">
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="space-y-1">
                  <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-48 animate-pulse"></div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Filter Section Skeleton */}
              <SkeletonFilter />

              {/* KPI Cards Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <SkeletonKPICard key={i} />
                ))}
              </div>

              {/* Charts Section Skeleton */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <SkeletonChart className="xl:col-span-2" height="24rem" />
                <SkeletonChart height="24rem" />
                <SkeletonChart className="xl:col-span-1" height="24rem" />
              </div>

              {/* Analysis Section Skeleton */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>

              {/* Tables Section Skeleton */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SkeletonTable rows={4} columns={3} />
                <SkeletonTable rows={4} columns={4} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
