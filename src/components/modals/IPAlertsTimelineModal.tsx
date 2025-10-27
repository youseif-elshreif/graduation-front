import React, { useState, useMemo } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import { Modal, ChartWrapper } from "@/components/ui";

interface IPAlertsTimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IPAlert {
  ip: string;
  country: string;
  alerts: {
    timestamp: Date;
    count: number;
    severity: "critical" | "high" | "medium" | "low";
  }[];
  totalAlerts: number;
}

const IPAlertsTimelineModal: React.FC<IPAlertsTimelineModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");

  // Mock data for IP alerts - using fixed data to avoid render issues
  const ipAlertsData: IPAlert[] = useMemo(() => {
    const baseTime = 1672531200000; // Fixed timestamp
    const severities: ("critical" | "high" | "medium" | "low")[] = [
      "critical",
      "high",
      "medium",
      "low",
    ];

    return [
      {
        ip: "192.168.1.45",
        country: "China",
        totalAlerts: 156,
        alerts: Array.from({ length: 24 }, (_, i) => ({
          timestamp: new Date(baseTime - (23 - i) * 60 * 60 * 1000),
          count: ((i * 3) % 15) + 1,
          severity: severities[i % 4],
        })),
      },
      {
        ip: "10.0.0.23",
        country: "Russia",
        totalAlerts: 89,
        alerts: Array.from({ length: 24 }, (_, i) => ({
          timestamp: new Date(baseTime - (23 - i) * 60 * 60 * 1000),
          count: ((i * 2) % 10) + 1,
          severity: severities[(i + 1) % 4],
        })),
      },
      {
        ip: "172.16.0.78",
        country: "Unknown",
        totalAlerts: 67,
        alerts: Array.from({ length: 24 }, (_, i) => ({
          timestamp: new Date(baseTime - (23 - i) * 60 * 60 * 1000),
          count: ((i * 2) % 8) + 1,
          severity: severities[(i + 2) % 4],
        })),
      },
      {
        ip: "203.45.67.89",
        country: "USA",
        totalAlerts: 45,
        alerts: Array.from({ length: 24 }, (_, i) => ({
          timestamp: new Date(baseTime - (23 - i) * 60 * 60 * 1000),
          count: ((i * 1) % 6) + 1,
          severity: severities[(i + 3) % 4],
        })),
      },
      {
        ip: "185.220.101.182",
        country: "Germany",
        totalAlerts: 78,
        alerts: Array.from({ length: 24 }, (_, i) => ({
          timestamp: new Date(baseTime - (23 - i) * 60 * 60 * 1000),
          count: ((i * 2 + 1) % 9) + 1,
          severity: severities[i % 4],
        })),
      },
    ];
  }, []);

  // Filter data based on search and severity
  const filteredData = useMemo(() => {
    return ipAlertsData.filter((item) => {
      const matchesSearch =
        item.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.country.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [ipAlertsData, searchTerm]);

  const createChartOption = (ipData: IPAlert) => {
    const severityColors = {
      critical: "#ef4444",
      high: "#f97316",
      medium: "#eab308",
      low: "#22c55e",
    };

    const series = Object.entries(severityColors).map(([severity, color]) => ({
      name: severity.charAt(0).toUpperCase() + severity.slice(1),
      type: "line" as const,
      data: ipData.alerts
        .filter(
          (alert) =>
            selectedSeverity === "all" || alert.severity === selectedSeverity
        )
        .map((alert) => [
          alert.timestamp.getTime(),
          alert.severity === severity ? alert.count : 0,
        ]),
      smooth: true,
      lineStyle: { color, width: 2 },
      areaStyle: { color: color + "20" },
      symbol: "circle",
      symbolSize: 4,
    }));

    return {
      title: {
        text: `${ipData.ip} (${ipData.country})`,
        left: "center",
        textStyle: {
          fontSize: 14,
          fontWeight: "bold" as const,
        },
      },
      tooltip: {
        trigger: "axis" as const,
        formatter: (params: unknown) => {
          const paramsArray = Array.isArray(params) ? params : [params];
          const firstParam = paramsArray[0] as { value: [number, number] };
          const date = new Date(firstParam.value[0]);
          let tooltip = `<strong>${date.toLocaleString()}</strong><br/>`;
          paramsArray.forEach(
            (param: { seriesName: string; value: [number, number] }) => {
              if (param.value[1] > 0) {
                tooltip += `${param.seriesName}: ${param.value[1]} alerts<br/>`;
              }
            }
          );
          return tooltip;
        },
      },
      legend: {
        data: ["Critical", "High", "Medium", "Low"],
        bottom: 0,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "15%",
        top: "15%",
        containLabel: true,
      },
      xAxis: {
        type: "time" as const,
        axisLabel: {
          formatter: (value: number) => {
            return new Date(value).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
          },
        },
      },
      yAxis: {
        type: "value" as const,
        name: "Alerts Count",
      },
      series,
    };
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="IP Alerts Timeline Analysis"
      className="max-w-4xl w-full max-h-[90vh] overflow-hidden"
    >
      <div className="flex flex-col h-[calc(90vh-64px)] overflow-y-auto">
        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by IP address or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[140px]"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="flex-1">
          {filteredData.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <FiSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-500">Try adjusting your search terms</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 pb-4">
              {filteredData.map((ipData) => (
                <div
                  key={ipData.ip}
                  className="bg-white border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {ipData.ip}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {ipData.country} • {ipData.totalAlerts} total alerts
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-800">
                        {ipData.alerts.reduce(
                          (sum, alert) => sum + alert.count,
                          0
                        )}{" "}
                        alerts (24h)
                      </span>
                    </div>
                  </div>
                  <ChartWrapper
                    option={createChartOption(ipData)}
                    height={300}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default IPAlertsTimelineModal;
