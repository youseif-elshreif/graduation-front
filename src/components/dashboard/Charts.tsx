import React, { useMemo, useState } from "react";
import { Card, ChartWrapper, Button } from "@/components/ui";
import { FiEye } from "react-icons/fi";
import IPAlertsTimelineModal from "./IPAlertsTimelineModal";
import {
  AlertsTimelineData,
  AttackTypeDistribution,
  SeverityLevelData,
} from "@/types";

interface AlertsTimelineChartProps {
  data: AlertsTimelineData;
  loading?: boolean;
}

export const AlertsTimelineChart: React.FC<AlertsTimelineChartProps> = ({
  data,
  loading,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const option = useMemo(
    () => ({
      title: {
        text: "Alerts Timeline",
      },
      tooltip: {
        trigger: "axis" as const,
      },
      legend: {
        data: ["Critical", "High", "Medium", "Low"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: "15%",
        containLabel: true,
      },
      xAxis: {
        type: "time" as const,
      },
      yAxis: {
        type: "value" as const,
      },
      series: [
        {
          name: "Critical",
          type: "line" as const,
          data: data.critical.map((d) => [d.timestamp, d.value]),
          smooth: true,
          lineStyle: { color: "#dc2626" },
          areaStyle: { color: "rgba(220, 38, 38, 0.1)" },
        },
        {
          name: "High",
          type: "line" as const,
          data: data.high.map((d) => [d.timestamp, d.value]),
          smooth: true,
          lineStyle: { color: "#ea580c" },
          areaStyle: { color: "rgba(234, 88, 12, 0.1)" },
        },
        {
          name: "Medium",
          type: "line" as const,
          data: data.medium.map((d) => [d.timestamp, d.value]),
          smooth: true,
          lineStyle: { color: "#d97706" },
          areaStyle: { color: "rgba(217, 119, 6, 0.1)" },
        },
        {
          name: "Low",
          type: "line" as const,
          data: data.low.map((d) => [d.timestamp, d.value]),
          smooth: true,
          lineStyle: { color: "#2563eb" },
          areaStyle: { color: "rgba(37, 99, 235, 0.1)" },
        },
      ],
    }),
    [data]
  );

  return (
    <>
      <Card
        title="Alerts Timeline"
        className="col-span-3"
        actions={
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2"
          >
            <FiEye className="w-4 h-4" />
            <span>View by IP</span>
          </Button>
        }
      >
        <ChartWrapper option={option} height={300} loading={loading} />
      </Card>

      <IPAlertsTimelineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

interface AttackTypeChartProps {
  data: AttackTypeDistribution[];
  loading?: boolean;
}

export const AttackTypeChart: React.FC<AttackTypeChartProps> = ({
  data,
  loading,
}) => {
  const option = useMemo(
    () => ({
      title: {
        text: "Attack Types Distribution",
      },
      tooltip: {
        trigger: "item" as const,
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical" as const,
        left: "left",
        top: "middle",
      },
      series: [
        {
          name: "Attack Types",
          type: "pie" as const,
          radius: ["40%", "70%"],
          center: ["60%", "50%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center" as const,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 18,
            },
          },
          labelLine: {
            show: false,
          },
          data: data.map((item) => ({
            value: item.count,
            name: item.type.replace("_", " ").toUpperCase(),
            itemStyle: {
              color: getAttackTypeColor(item.type),
            },
          })),
        },
      ],
    }),
    [data]
  );

  return (
    <Card title="Attack Distribution" className="col-span-2">
      <ChartWrapper option={option} height={300} loading={loading} />
    </Card>
  );
};

interface SeverityLevelsChartProps {
  data: SeverityLevelData[];
  loading?: boolean;
}

export const SeverityLevelsChart: React.FC<SeverityLevelsChartProps> = ({
  data,
  loading,
}) => {
  const option = useMemo(
    () => ({
      title: {
        text: "Severity Levels Over Time",
      },
      tooltip: {
        trigger: "axis" as const,
      },
      legend: {
        data: ["High", "Medium", "Low"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: "15%",
        containLabel: true,
      },
      xAxis: {
        type: "time" as const,
      },
      yAxis: {
        type: "value" as const,
      },
      series: [
        {
          name: "High",
          type: "line" as const,
          stack: "Total",
          data: data.map((d) => [d.timestamp, d.high]),
          areaStyle: { color: "#dc2626" },
          lineStyle: { color: "#dc2626" },
        },
        {
          name: "Medium",
          type: "line" as const,
          stack: "Total",
          data: data.map((d) => [d.timestamp, d.medium]),
          areaStyle: { color: "#ea580c" },
          lineStyle: { color: "#ea580c" },
        },
        {
          name: "Low",
          type: "line" as const,
          stack: "Total",
          data: data.map((d) => [d.timestamp, d.low]),
          areaStyle: { color: "#2563eb" },
          lineStyle: { color: "#2563eb" },
        },
      ],
    }),
    [data]
  );

  return (
    <Card title="Severity Distribution" className="col-span-3">
      <ChartWrapper option={option} height={300} loading={loading} />
    </Card>
  );
};

// Helper function for attack type colors
const getAttackTypeColor = (type: string): string => {
  const colors = {
    ddos: "#dc2626",
    port_scan: "#ea580c",
    brute_force: "#d97706",
    web_attack: "#65a30d",
    infiltration: "#7c3aed",
    botnet: "#dc2626",
  };
  return colors[type as keyof typeof colors] || "#6b7280";
};
