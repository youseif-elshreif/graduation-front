// FILE: src/components/ThreatCard.tsx
// Individual threat card component for displaying attack information

import React from "react";
import {
  FiEye,
  FiMoreVertical,
  FiSlash,
  FiSearch,
  FiX,
  FiCopy,
} from "react-icons/fi";
import { ThreatCardProps, Threat } from "@/types/threats";

interface ExtendedThreatCardProps extends ThreatCardProps {
  showCheckbox?: boolean;
  className?: string;
}

const ThreatCard: React.FC<ExtendedThreatCardProps> = ({
  threat,
  isSelected = false,
  onSelect,
  onViewDetails,
  onBlock,
  onInvestigate,
  onDismiss,
  showActions = false,
  showCheckbox = false,
  className = "",
}) => {
  const [showActionMenu, setShowActionMenu] = React.useState(false);
  const [isNewItem, setIsNewItem] = React.useState(false);

  // Trigger pulse animation for new items
  React.useEffect(() => {
    if (threat.isNew) {
      setIsNewItem(true);
      const timer = setTimeout(() => setIsNewItem(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [threat.isNew]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "border-red-500 bg-red-500/10";
      case "High":
        return "border-orange-500 bg-orange-500/10";
      case "Medium":
        return "border-yellow-500 bg-yellow-500/10";
      case "Low":
        return "border-green-500 bg-green-500/10";
      default:
        return "border-gray-500 bg-gray-500/10";
    }
  };

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-600 text-white";
      case "High":
        return "bg-orange-500 text-white";
      case "Medium":
        return "bg-yellow-400 text-black";
      case "Low":
        return "bg-green-400 text-black";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "Investigating":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "Blocked":
        return "bg-red-100 text-red-800 border border-red-200";
      case "Dismissed":
        return "bg-gray-100 text-gray-800 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleAction = (actionType: string) => {
    setShowActionMenu(false);
    switch (actionType) {
      case "block":
        if (onBlock) onBlock(threat.id);
        break;
      case "investigate":
        if (onInvestigate) onInvestigate(threat.id);
        break;
      case "dismiss":
        if (onDismiss) onDismiss(threat.id);
        break;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
        bg-white/10 backdrop-blur-sm rounded-xl border-l-4 border-r border-t border-b
        ${getSeverityColor(threat.severity)}
        border-white/20 p-6 shadow-lg hover:shadow-xl hover:-translate-y-1
        transition-all duration-300 group
        ${isNewItem ? "animate-pulse ring-2 ring-blue-400" : ""}
        ${isSelected ? "ring-2 ring-blue-500" : ""}
      `}
      >
        {/* Header Row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {showCheckbox && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onSelect && onSelect(threat.id)}
                className="w-4 h-4 text-blue-600 bg-white/20 border-white/30 rounded 
                         focus:ring-blue-500 focus:ring-2"
              />
            )}
            <div className="text-sm text-gray-300">
              {formatTimestamp(threat.timestamp)}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {!showActions && onViewDetails && (
              <button
                onClick={() => onViewDetails && onViewDetails(threat.id)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 
                         hover:text-white transition-all opacity-0 group-hover:opacity-100"
                aria-label="View Details"
              >
                <FiEye className="w-4 h-4" />
              </button>
            )}

            {showActions && (
              <div className="relative">
                <button
                  onClick={() => setShowActionMenu(!showActionMenu)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 
                           hover:text-white transition-all"
                  aria-label="Actions"
                >
                  <FiMoreVertical className="w-4 h-4" />
                </button>

                {showActionMenu && (
                  <div
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg 
                               shadow-xl border border-gray-200 py-2 z-10"
                  >
                    <button
                      onClick={() => handleAction("block")}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-red-50 
                               hover:text-red-700 flex items-center gap-2"
                    >
                      <FiSlash className="w-4 h-4" />
                      Block Source
                    </button>
                    <button
                      onClick={() => handleAction("investigate")}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-50 
                               hover:text-blue-700 flex items-center gap-2"
                    >
                      <FiSearch className="w-4 h-4" />
                      Investigate
                    </button>
                    <button
                      onClick={() => handleAction("dismiss")}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 
                               hover:text-gray-800 flex items-center gap-2"
                    >
                      <FiX className="w-4 h-4" />
                      Dismiss
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Badges Row */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityBadgeClass(
              threat.severity
            )}`}
          >
            {threat.severity}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-400/30">
            {threat.threatType}
          </span>
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeClass(
              threat.status
            )}`}
          >
            {threat.status}
          </span>
        </div>

        {/* Main Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Source IP:</span>
              <span className="font-mono text-sm text-white">
                {threat.sourceIp}
              </span>
              <button
                onClick={() => copyToClipboard(threat.sourceIp)}
                className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                aria-label="Copy Source IP"
              >
                <FiCopy className="w-3 h-3" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Target IP:</span>
              <span className="font-mono text-sm text-white">
                {threat.targetIp}
              </span>
              <button
                onClick={() => copyToClipboard(threat.targetIp)}
                className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                aria-label="Copy Target IP"
              >
                <FiCopy className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Protocol/Port:</span>
              <span className="text-sm text-gray-200">
                {threat.protocol}:{threat.port}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Hits:</span>
              <span className="text-sm text-gray-200 font-semibold">
                {threat.hits.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-3">
          <p className="text-sm text-gray-300 leading-relaxed">
            {threat.notes}
          </p>
        </div>

        {/* Pattern Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Pattern:</span>
            <span className="text-xs text-gray-300 bg-white/10 px-2 py-1 rounded">
              {threat.pattern}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Source:</span>
            <span className="text-xs text-gray-300">{threat.sourceLabel}</span>
          </div>
        </div>
      </div>

      {/* Click overlay to close action menu */}
      {showActionMenu && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowActionMenu(false)}
        />
      )}
    </div>
  );
};

export default ThreatCard;
