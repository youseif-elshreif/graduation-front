import React from "react";
import {
  FiShield,
  FiAlertTriangle,
  FiLock,
  FiClock,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";
import { Card } from "@/components/ui";
import { KPIData } from "@/types";

interface KPICardsProps {
  data: KPIData;
  loading?: boolean;
}

const KPICards: React.FC<KPICardsProps> = ({ data, loading = false }) => {
  const cards = [
    {
      title: "Active Threats",
      value: data.activeThreats.current,
      change: data.activeThreats.change,
      trend: data.activeThreats.trend,
      icon: FiShield,
      color: "red",
      description: "Current security threats",
      sparklineData: data.activeThreats.sparklineData,
    },
    {
      title: "Blocked IPs",
      value: data.blockedIPs.total,
      subtitle: `${data.blockedIPs.today} today`,
      change: data.blockedIPs.change,
      icon: FiAlertTriangle,
      color: "orange",
      description: "Total blocked IP addresses",
    },
    {
      title: "Blocked Ports",
      value: data.blockedPorts.total,
      subtitle: `Most targeted: ${data.blockedPorts.mostTargeted}`,
      change: data.blockedPorts.change,
      icon: FiLock,
      color: "blue",
      description: "Secured network ports",
    },
    {
      title: "Response Time",
      value: `${data.responseTime.average}ms`,
      subtitle: `Status: ${data.responseTime.status}`,
      range: `${data.responseTime.fastest}ms - ${data.responseTime.slowest}ms`,
      icon: FiClock,
      color:
        data.responseTime.status === "excellent"
          ? "green"
          : data.responseTime.status === "good"
          ? "blue"
          : data.responseTime.status === "warning"
          ? "yellow"
          : "red",
      description: "Average threat response time",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      red: "text-red-600 bg-red-100",
      orange: "text-orange-600 bg-orange-100",
      blue: "text-blue-600 bg-blue-100",
      green: "text-green-600 bg-green-100",
      yellow: "text-yellow-600 bg-yellow-100",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getTrendIcon = (trend: string, change: number) => {
    if (change > 0) {
      return <FiTrendingUp className="w-4 h-4 text-red-500" />;
    } else if (change < 0) {
      return <FiTrendingDown className="w-4 h-4 text-green-500" />;
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <Card
          key={index}
          loading={loading}
          className="hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">
                  {card.title}
                </h3>
                <div
                  className={`p-2 rounded-lg ${getColorClasses(card.color)}`}
                >
                  <card.icon className="w-5 h-5" />
                </div>
              </div>

              {/* Main Value */}
              <div className="flex items-baseline space-x-2 mb-1">
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                {card.change !== undefined && (
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(card.trend || "stable", card.change)}
                    <span
                      className={`text-sm font-medium ${
                        card.change > 0
                          ? "text-red-600"
                          : card.change < 0
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {card.change > 0 ? "+" : ""}
                      {card.change}
                    </span>
                  </div>
                )}
              </div>

              {/* Subtitle or Range */}
              {card.subtitle && (
                <p className="text-sm text-gray-600 mb-1">{card.subtitle}</p>
              )}
              {card.range && (
                <p className="text-xs text-gray-500">Range: {card.range}</p>
              )}

              {/* Description */}
              <p className="text-xs text-gray-500 mt-2">{card.description}</p>

              {/* Sparkline for Active Threats */}
              {card.sparklineData && (
                <div className="mt-3">
                  <div className="flex items-end space-x-1 h-8">
                    {card.sparklineData.map((value, idx) => (
                      <div
                        key={idx}
                        className="bg-red-200 rounded-sm flex-1 transition-all hover:bg-red-300"
                        style={{
                          height: `${
                            (value / Math.max(...card.sparklineData)) * 100
                          }%`,
                          minHeight: "2px",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Last 12 hours</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View Details →
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default KPICards;
