import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";

interface ChartWrapperProps {
  option: echarts.EChartsOption;
  width?: number | string;
  height?: number | string;
  className?: string;
  loading?: boolean;
  theme?: "light" | "dark";
  onChartReady?: (chart: echarts.ECharts) => void;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({
  option,
  width = "100%",
  height = 300,
  className = "",
  loading = false,
  theme = "light",
  onChartReady,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Initialize chart
    const chart = echarts.init(chartRef.current, theme);
    chartInstanceRef.current = chart;

    // Set initial option
    if (option) {
      chart.setOption(option);
    }

    // Call onChartReady callback
    if (onChartReady) {
      onChartReady(chart);
    }

    // Handle resize
    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [theme, onChartReady, option]);

  // Update chart option when it changes
  useEffect(() => {
    if (chartInstanceRef.current && option) {
      chartInstanceRef.current.setOption(option, true);
    }
  }, [option]);

  // Handle loading state
  useEffect(() => {
    if (chartInstanceRef.current) {
      if (loading) {
        chartInstanceRef.current.showLoading();
      } else {
        chartInstanceRef.current.hideLoading();
      }
    }
  }, [loading]);

  return (
    <div className={`relative ${className}`}>
      <div ref={chartRef} style={{ width, height }} className="w-full" />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
};

export default ChartWrapper;
