"use client";

import React, { useState } from "react";
import {
  FiHome,
  FiShield,
  FiAlertTriangle,
  FiUsers,
  FiActivity,
  FiSettings,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: FiHome },
    { id: "all-attacks", label: "All Attacks", icon: FiShield },
    {
      id: "immediate-attacks",
      label: "Immediate Attacks",
      icon: FiAlertTriangle,
    },
    { id: "users-management", label: "Users Management", icon: FiUsers },
    { id: "actions", label: "Actions", icon: FiActivity },
    { id: "settings", label: "Settings", icon: FiSettings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const shouldShowText = !isCollapsed || isHovered;

  return (
    <div
      className="bg-slate-900 text-white h-full w-full flex flex-col transition-all duration-300 ease-in-out shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="sticky top-0 h-dvh flex flex-col">
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center space-x-3 ${
                !shouldShowText ? "justify-center" : ""
              }`}
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                <FiShield className="w-6 h-6 text-white" />
              </div>
              {shouldShowText && (
                <div>
                  <h2 className="text-xl font-bold">IDS-AI</h2>
                  <p className="text-xs text-slate-400">Security System</p>
                </div>
              )}
            </div>

            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="p-1 rounded-lg hover:bg-slate-700 transition-colors"
              >
                {isCollapsed ? (
                  <FiChevronRight className="w-4 h-4" />
                ) : (
                  <FiChevronLeft className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2 flex-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
              w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200
              ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }
              ${!shouldShowText ? "justify-center" : ""}
            `}
            >
              <item.icon
                className={`w-5 h-5 shrink-0 ${
                  activeTab === item.id ? "text-white" : ""
                }`}
              />
              {shouldShowText && (
                <span className="font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-slate-700">
          {/* User Info */}
          {shouldShowText && (
            <div className="mb-4 p-3 bg-slate-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <FiUsers className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Administrator</p>
                  <p className="text-xs text-slate-400">System Admin</p>
                </div>
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`
            w-full flex items-center space-x-3 p-3 rounded-lg text-red-400 
            hover:bg-red-600 hover:text-white transition-all duration-200
            ${!shouldShowText ? "justify-center" : ""}
          `}
          >
            <FiLogOut className="w-5 h-5 shrink-0" />
            {shouldShowText && <span className="font-medium">Log Out</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
