"use client";

import React, { useState } from "react";
import {
  FiSearch,
  FiBell,
  FiUser,
  FiSettings,
  FiLogOut,
  FiShield,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { Badge } from "@/components/ui";

interface HeaderProps {
  userName?: string;
  userRole?: string;
  notificationCount?: number;
}

const Header: React.FC<HeaderProps> = ({
  userName = "System Administrator",
  userRole = "admin",
  notificationCount = 5,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Logo & Navigation */}
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
                <FiShield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">IDS-AI</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6 ml-8">
              <a
                href="/dashboard"
                className="text-blue-600 font-medium px-3 py-2 rounded-md text-sm"
              >
                Dashboard
              </a>
              <a
                href="/threats"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm transition-colors"
              >
                Threats
              </a>
              <a
                href="/network"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm transition-colors"
              >
                Network
              </a>
              <a
                href="/reports"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm transition-colors"
              >
                Reports
              </a>
              <a
                href="/settings"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm transition-colors"
              >
                Settings
              </a>
            </nav>
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className={`
                    block w-full pl-10 pr-12 py-2 border rounded-lg 
                    bg-gray-50 placeholder-gray-500 text-gray-900
                    transition-colors duration-200
                    ${
                      isSearchFocused
                        ? "border-blue-500 bg-white ring-1 ring-blue-500"
                        : "border-gray-300 hover:bg-white"
                    }
                  `}
                  placeholder="Search threats, IPs, logs... (Ctrl+K)"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <kbd className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded">
                    ⌘K
                  </kbd>
                </div>
              </div>
            </form>
          </div>

          {/* Right Section - Notifications & User Menu */}
          <div className="flex items-center space-x-4">
            {/* System Status */}
            <div className="hidden lg:flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">System Online</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiBell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <Badge
                    variant="danger"
                    size="sm"
                    className="absolute -top-1 -right-1 min-w-5 h-5 flex items-center justify-center text-xs"
                  >
                    {notificationCount > 99 ? "99+" : notificationCount}
                  </Badge>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {[1, 2, 3].map((notification) => (
                      <div
                        key={notification}
                        className="p-4 border-b border-gray-100 hover:bg-gray-50"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Critical Threat Detected
                            </p>
                            <p className="text-sm text-gray-600">
                              DDoS attack from 185.220.101.42
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              2 minutes ago
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3">
                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <FiUser className="w-4 h-4 text-white" />
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {userName}
                  </p>
                  <p className="text-xs text-gray-600 capitalize">{userRole}</p>
                </div>
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <a
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FiUser className="w-4 h-4 mr-3" />
                      Profile
                    </a>
                    <a
                      href="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FiSettings className="w-4 h-4 mr-3" />
                      Settings
                    </a>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <FiLogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <FiX className="w-5 h-5" />
              ) : (
                <FiMenu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="space-y-2">
              <a
                href="/dashboard"
                className="block px-3 py-2 text-blue-600 font-medium rounded-md"
              >
                Dashboard
              </a>
              <a
                href="/threats"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 rounded-md"
              >
                Threats
              </a>
              <a
                href="/network"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 rounded-md"
              >
                Network
              </a>
              <a
                href="/reports"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 rounded-md"
              >
                Reports
              </a>
              <a
                href="/settings"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 rounded-md"
              >
                Settings
              </a>
            </nav>

            {/* Mobile Search */}
            <div className="mt-4">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-500"
                    placeholder="Search..."
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
