// FILE: src/components/modals/ThreatDetailsModal.tsx
// Modal component for viewing detailed threat information

import React from "react";
import { FiCopy, FiShield, FiActivity, FiClock } from "react-icons/fi";
import { Threat } from "@/types/threats";
import { Modal } from "@/components/ui";

interface ThreatDetailsModalProps {
  threat: Threat | null;
  isOpen: boolean;
  onClose: () => void;
}

const ThreatDetailsModal: React.FC<ThreatDetailsModalProps> = ({
  threat,
  isOpen,
  onClose,
}) => {
  if (!threat) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-600 text-white";
      case "High":
        return "bg-orange-500 text-white";
      case "Medium":
        return "bg-yellow-500 text-white";
      case "Low":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "New":
        return "bg-red-100 text-red-800 border-red-200";
      case "Investigating":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Blocked":
        return "bg-green-100 text-green-800 border-green-200";
      case "Dismissed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${threat.threatType} Attack Details`}
      className="max-w-4xl w-full max-h-[90vh] overflow-hidden"
    >
      <div className="flex flex-col h-[calc(90vh-64px)] overflow-y-auto">
        {/* Header Info */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityBadgeClass(
                  threat.severity
                )}`}
              >
                {threat.severity}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                {threat.threatType}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              ID:{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">{threat.id}</code>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiShield className="w-5 h-5 text-blue-600" />
                  Basic Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadgeClass(
                        threat.status
                      )}`}
                    >
                      {threat.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Severity:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityBadgeClass(
                        threat.severity
                      )}`}
                    >
                      {threat.severity}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Detection Time:</span>
                    <span className="text-gray-900 font-medium">
                      {new Date(threat.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Network Information */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiActivity className="w-5 h-5 text-blue-600" />
                  Network Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-gray-600 block mb-1">
                      Source IP:
                    </label>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-3 py-2 rounded-lg text-gray-900 font-mono flex-1">
                        {threat.sourceIp}
                      </code>
                      <button
                        onClick={() => copyToClipboard(threat.sourceIp)}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Copy to clipboard"
                      >
                        <FiCopy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-600 block mb-1">
                      Target IP:
                    </label>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-3 py-2 rounded-lg text-gray-900 font-mono flex-1">
                        {threat.targetIp}
                      </code>
                      <button
                        onClick={() => copyToClipboard(threat.targetIp)}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Copy to clipboard"
                      >
                        <FiCopy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-600 block mb-1">
                        Source:
                      </label>
                      <span className="text-gray-900 font-medium">
                        {threat.sourceLabel}
                      </span>
                    </div>
                    <div>
                      <label className="text-gray-600 block mb-1">Port:</label>
                      <span className="text-gray-900 font-medium">
                        {threat.port}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-600 block mb-1">
                      Protocol:
                    </label>
                    <span className="text-gray-900 font-medium">
                      {threat.protocol}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Details and Actions */}
            <div className="space-y-6">
              {/* Threat Details */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiClock className="w-5 h-5 text-blue-600" />
                  Threat Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-gray-600 block mb-1">Pattern:</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg font-mono text-sm">
                      {threat.pattern}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-600 block mb-1">Notes:</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {threat.notes || "No additional notes available"}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-600 block mb-1">
                      Hits Count:
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {threat.hits} hits detected
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Activity Timeline
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-2 h-2 bg-red-500 rounded-full shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">
                        Threat Detected
                      </p>
                      <p className="text-gray-600 text-sm">
                        {new Date(threat.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">
                        Analysis Started
                      </p>
                      <p className="text-gray-600 text-sm">
                        Automated analysis in progress...
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <button className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all">
                    Block IP Address
                  </button>
                  <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all">
                    Start Investigation
                  </button>
                  <button className="w-full px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all">
                    Mark as Dismissed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ThreatDetailsModal;
