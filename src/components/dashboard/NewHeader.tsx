'use client';

import React, { useState } from 'react';
import { 
  FiBell, 
  FiUser, 
  FiSettings, 
  FiLogOut
} from 'react-icons/fi';
import { Badge } from '@/components/ui';

interface HeaderProps {
  userName?: string;
  userRole?: string;
  notificationCount?: number;
  title?: string;
  subtitle?: string;
  sidebarWidth?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  userName = 'System Administrator',
  userRole = 'admin',
  notificationCount = 5,
  title = 'Security Dashboard',
  subtitle = 'Real-time monitoring and threat detection system overview',
  sidebarWidth = 'w-64'
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <header className={`bg-white border-b border-gray-200 fixed top-0 right-0 z-30 ${sidebarWidth === 'w-16' ? 'left-16' : 'left-64'} transition-all duration-300`}>
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* Page Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          </div>

          {/* Right Section - Notifications & User Menu */}
          <div className="flex items-center space-x-4">
            
            {/* System Status */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-700 font-medium">System Online</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
              >
                <FiBell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <Badge 
                    variant="danger" 
                    size="sm"
                    className="absolute -top-1 -right-1 min-w-5 h-5 flex items-center justify-center text-xs"
                  >
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </Badge>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                      <Badge variant="danger" size="sm">{notificationCount}</Badge>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {[1, 2, 3, 4].map((notification) => (
                      <div key={notification} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Critical Threat Detected</p>
                            <p className="text-sm text-gray-600 mt-1">DDoS attack from 185.220.101.{40 + notification}</p>
                            <p className="text-xs text-gray-500 mt-2">{notification * 2} minutes ago</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-gray-50">
                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium py-2">
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
                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-600 capitalize">{userRole}</p>
                </div>
                <div className="w-10 h-10 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <FiUser className="w-5 h-5 text-white" />
                </div>
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 z-50">
                  <div className="p-2">
                    <a
                      href="/profile"
                      className="flex items-center px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <FiUser className="w-4 h-4 mr-3" />
                      Profile Settings
                    </a>
                    <a
                      href="/settings"
                      className="flex items-center px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <FiSettings className="w-4 h-4 mr-3" />
                      System Settings
                    </a>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiLogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;