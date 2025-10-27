// FILE: src/components/RightSidebar/ThreatsSidebar.tsx
// Right sidebar component displaying threat statistics and insights

import React, { useMemo } from "react";
import {
  FiShield,
  FiAlertTriangle,
  FiActivity,
  FiTrendingUp,
} from "react-icons/fi";
import { ThreatsSidebarProps, Threat } from "@/types/threats";
import { IconType } from "react-icons";

// Stat Card Component
const StatCard: React.FC<{
  icon: IconType;
  title: string;
  value: number;
  color?: string;
}> = ({ icon: Icon, title, value, color = "blue" }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
    <div className="flex items-center space-x-3">
      <div className={`p-2 rounded-lg bg-${color}-100`}>
        <Icon className={`w-5 h-5 text-${color}-600`} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">
          {value.toLocaleString()}
        </p>
      </div>
    </div>
  </div>
);

// Progress Bar Component
const ProgressBar: React.FC<{
  percentage: number;
  color?: string;
}> = ({ percentage, color = "blue" }) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div
      className={`h-2 rounded-full bg-${color}-600 transition-all duration-500`}
      style={{ width: `${Math.min(percentage, 100)}%` }}
    />
  </div>
);

const ThreatsSidebar: React.FC<ThreatsSidebarProps> = ({
  threats,
  className = "",
}) => {
  // Calculate statistics
  const stats = useMemo(() => {
    const totalThreats = threats.length;
    const activeThreats = threats.filter(
      (t: Threat) => t.status === "New"
    ).length;
    const blockedThreats = threats.filter(
      (t: Threat) => t.status === "Blocked"
    ).length;

    // Get top attackers
    const ipCounts: Record<string, number> = {};
    threats.forEach((threat) => {
      const ip = threat.sourceIp;
      ipCounts[ip] = (ipCounts[ip] || 0) + threat.hits;
    });

    const topAttackers = Object.entries(ipCounts)
      .map(([ip, count]) => ({ ip, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Get attack patterns
    const patterns: Record<string, number> = {};
    threats.forEach((threat) => {
      const key = threat.threatType;
      patterns[key] = (patterns[key] || 0) + 1;
    });

    const attackPatterns = Object.entries(patterns)
      .map(([pattern, count]) => ({ pattern, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);

    return {
      totalThreats,
      activeThreats,
      blockedThreats,
      topAttackers,
      attackPatterns,
    };
  }, [threats]);

  const maxHits = stats.topAttackers[0]?.count || 1;
  const maxPatternCount = stats.attackPatterns[0]?.count || 1;

  return (
    <div
      className={`w-80 h-full bg-gray-50/50 backdrop-blur-sm border-l border-gray-200 p-6 overflow-y-auto ${className}`}
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Threat Statistics
          </h2>
          <p className="text-sm text-gray-600">Real-time security overview</p>
        </div>

        {/* Statistics Cards */}
        <div className="space-y-4">
          <StatCard
            icon={FiShield}
            title="Total Threats"
            value={stats.totalThreats}
            color="blue"
          />
          <StatCard
            icon={FiAlertTriangle}
            title="Active Threats"
            value={stats.activeThreats}
            color="red"
          />
          <StatCard
            icon={FiActivity}
            title="Blocked"
            value={stats.blockedThreats}
            color="green"
          />
        </div>

        {/* Top Attackers */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <FiTrendingUp className="w-5 h-5 text-gray-700" />
            <h3 className="text-lg font-semibold text-gray-900">
              Top Attackers
            </h3>
          </div>
          <div className="space-y-3">
            {stats.topAttackers.map((attacker) => {
              const percentage = (attacker.count / maxHits) * 100;
              return (
                <div
                  key={attacker.ip}
                  className="bg-white/80 rounded-lg p-3 border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-mono text-gray-900">
                      {attacker.ip}
                    </span>
                    <span className="text-xs text-gray-500">
                      {attacker.count.toLocaleString()} hits
                    </span>
                  </div>
                  <ProgressBar percentage={percentage} color="red" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Attack Patterns */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Attack Patterns
          </h3>
          <div className="space-y-3">
            {stats.attackPatterns.map((pattern) => {
              const percentage = (pattern.count / maxPatternCount) * 100;
              return (
                <div
                  key={pattern.pattern}
                  className="bg-white/80 rounded-lg p-3 border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {pattern.pattern}
                    </span>
                    <span className="text-xs text-gray-500">
                      {pattern.count}
                    </span>
                  </div>
                  <ProgressBar percentage={percentage} color="yellow" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatsSidebar;
