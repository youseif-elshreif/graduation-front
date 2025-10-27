// FILE: src/components/modals/ThreatDetailsModal.jsx
// Modal component for viewing detailed threat information (placeholder skeleton)

import React, { useEffect } from "react";
import {
  FiX,
  FiCopy,
  FiShield,
  FiActivity,
  FiClock,
  FiMapPin,
} from "react-icons/fi";

const ThreatDetailsModal = ({ threat, isOpen, onClose }) => {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !threat) return null;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const getSeverityBadgeClass = (severity) => {
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

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2
                id="modal-title"
                className="text-2xl font-bold text-white mb-2"
              >
                Threat Details
              </h2>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityBadgeClass(
                    threat.severity
                  )}`}
                >
                  {threat.severity}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                  {threat.threatType}
                </span>
                <span className="text-sm text-blue-100">ID: {threat.id}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
              aria-label="Close modal"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <FiActivity className="w-5 h-5 text-blue-400" />
                Attack Information
              </h3>

              <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Source IP:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-white">
                      {threat.sourceIp}
                    </span>
                    <button
                      onClick={() => copyToClipboard(threat.sourceIp)}
                      className="p-1 rounded hover:bg-gray-700 text-gray-400 hover:text-white transition-all"
                    >
                      <FiCopy className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Target IP:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-white">
                      {threat.targetIp}
                    </span>
                    <button
                      onClick={() => copyToClipboard(threat.targetIp)}
                      className="p-1 rounded hover:bg-gray-700 text-gray-400 hover:text-white transition-all"
                    >
                      <FiCopy className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Protocol/Port:</span>
                  <span className="text-white">
                    {threat.protocol}:{threat.port}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Hit Count:</span>
                  <span className="text-white font-semibold">
                    {threat.hits.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Source Label:</span>
                  <span className="text-white">{threat.sourceLabel}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <FiClock className="w-5 h-5 text-green-400" />
                Timeline & Status
              </h3>

              <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Detected:</span>
                  <span className="text-white">
                    {formatTimestamp(threat.timestamp)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      threat.status === "New"
                        ? "bg-blue-100 text-blue-800"
                        : threat.status === "Investigating"
                        ? "bg-yellow-100 text-yellow-800"
                        : threat.status === "Blocked"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {threat.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Pattern:</span>
                  <span className="text-white bg-gray-700 px-2 py-1 rounded text-sm">
                    {threat.pattern}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FiShield className="w-5 h-5 text-red-400" />
              Threat Description
            </h3>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-300 leading-relaxed">{threat.notes}</p>
            </div>
          </div>

          {/* Raw Data (JSON-like) */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              Raw Threat Data
            </h3>
            <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm">
              <pre className="text-gray-300 overflow-x-auto">
                {JSON.stringify(threat, null, 2)}
              </pre>
            </div>
          </div>

          {/* Placeholder Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FiMapPin className="w-5 h-5 text-purple-400" />
                Geolocation Analysis
              </h3>
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <div className="text-6xl mb-4">🌍</div>
                <p className="text-gray-400">
                  Geolocation data will be available here
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  IP location, ISP information, and threat intelligence
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Packet Capture
              </h3>
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-gray-400">
                  Packet analysis will be available here
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Network traffic patterns and payload analysis
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Placeholder */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Attack Timeline
            </h3>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-6xl mb-4">⏰</div>
              <p className="text-gray-400">
                Detailed timeline analysis will be available here
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Attack progression, response actions, and related events
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-800 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg 
                     font-medium transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThreatDetailsModal;
