"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
  } | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userData = localStorage.getItem("user");

    if (!isAuthenticated || isAuthenticated !== "true") {
      router.push("/");
      return;
    }

    if (userData) {
      setTimeout(() => {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }, 0);
    }
  }, [router]);

  const handleTabChange = (tab: string) => {
    switch (tab) {
      case "dashboard":
        router.push("/dashboard");
        break;
      case "all-attacks":
        router.push("/dashboard/all-attacks");
        break;
      case "immediate-attacks":
        router.push("/dashboard/immediate-attacks");
        break;
      case "alerts":
        router.push("/dashboard/alerts");
        break;
      case "reports":
        router.push("/dashboard/reports");
        break;
      case "network":
        router.push("/dashboard/network");
        break;
      case "settings":
        router.push("/dashboard/settings");
        break;
      default:
        router.push("/dashboard");
    }
  };

  const getActiveTab = () => {
    if (pathname === "/dashboard") return "dashboard";
    if (pathname === "/dashboard/all-attacks") return "all-attacks";
    if (pathname === "/dashboard/immediate-attacks") return "immediate-attacks";
    if (pathname === "/dashboard/alerts") return "alerts";
    if (pathname === "/dashboard/reports") return "reports";
    if (pathname === "/dashboard/network") return "network";
    if (pathname === "/dashboard/settings") return "settings";
    return "dashboard";
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Fixed width */}
      <div
        className={`${
          isSidebarCollapsed ? "w-16" : "w-64"
        } transition-all duration-300 shrink-0`}
      >
        <Sidebar
          activeTab={getActiveTab()}
          onTabChange={handleTabChange}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header
          userName={
            user ? `${user.firstName} ${user.lastName}` : "Administrator"
          }
          userRole={user?.role || "admin"}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
          <div className="max-w-full w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
