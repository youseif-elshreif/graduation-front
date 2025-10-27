// FILE: src/components/modals/ThreatDetailsModal.tsx
// Modal component for viewing detailed threat information

import React from "react";
import { FiCopy, FiActivity } from "react-icons/fi";
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

  // Generate extended threat data as JSON
  const generateThreatData = () => {
    // Generate random values for demonstration
    const generateRandomValue = (min: number, max: number, decimal = 2) => {
      return +(Math.random() * (max - min) + min).toFixed(decimal);
    };

    const generateRandomInt = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return {
      "Dst Port": threat.port,
      Protocol: threat.protocol,
      Timestamp: threat.timestamp,
      "Flow Duration": generateRandomValue(1000, 50000, 0),
      "Tot Fwd Pkts": generateRandomInt(10, 1000),
      "Tot Bwd Pkts": generateRandomInt(5, 500),
      "TotLen Fwd Pkts": generateRandomInt(500, 10000),
      "TotLen Bwd Pkts": generateRandomInt(200, 5000),
      "Fwd Pkt Len Max": generateRandomInt(100, 1500),
      "Fwd Pkt Len Min": generateRandomInt(20, 100),
      "Fwd Pkt Len Mean": generateRandomValue(50, 800),
      "Fwd Pkt Len Std": generateRandomValue(10, 200),
      "Bwd Pkt Len Max": generateRandomInt(100, 1500),
      "Bwd Pkt Len Min": generateRandomInt(20, 100),
      "Bwd Pkt Len Mean": generateRandomValue(50, 800),
      "Bwd Pkt Len Std": generateRandomValue(10, 200),
      "Flow Byts/s": generateRandomValue(1000, 100000),
      "Flow Pkts/s": generateRandomValue(10, 1000),
      "Flow IAT Mean": generateRandomValue(100, 10000),
      "Flow IAT Std": generateRandomValue(50, 5000),
      "Flow IAT Max": generateRandomValue(1000, 50000),
      "Flow IAT Min": generateRandomValue(1, 100),
      "Fwd IAT Tot": generateRandomValue(5000, 500000),
      "Fwd IAT Mean": generateRandomValue(100, 10000),
      "Fwd IAT Std": generateRandomValue(50, 5000),
      "Fwd IAT Max": generateRandomValue(1000, 50000),
      "Fwd IAT Min": generateRandomValue(1, 100),
      "Bwd IAT Tot": generateRandomValue(2000, 200000),
      "Bwd IAT Mean": generateRandomValue(100, 8000),
      "Bwd IAT Std": generateRandomValue(50, 4000),
      "Bwd IAT Max": generateRandomValue(1000, 40000),
      "Bwd IAT Min": generateRandomValue(1, 100),
      "Fwd PSH Flags": generateRandomInt(0, 10),
      "Bwd PSH Flags": generateRandomInt(0, 5),
      "Fwd URG Flags": generateRandomInt(0, 2),
      "Bwd URG Flags": generateRandomInt(0, 2),
      "Fwd Header Len": generateRandomInt(20, 60),
      "Bwd Header Len": generateRandomInt(20, 60),
      "Fwd Pkts/s": generateRandomValue(5, 500),
      "Bwd Pkts/s": generateRandomValue(2, 200),
      "Pkt Len Min": generateRandomInt(20, 100),
      "Pkt Len Max": generateRandomInt(1000, 1500),
      "Pkt Len Mean": generateRandomValue(100, 800),
      "Pkt Len Std": generateRandomValue(50, 300),
      "Pkt Len Var": generateRandomValue(1000, 50000),
      "FIN Flag Cnt": generateRandomInt(0, 5),
      "SYN Flag Cnt": generateRandomInt(0, 5),
      "RST Flag Cnt": generateRandomInt(0, 3),
      "PSH Flag Cnt": generateRandomInt(0, 10),
      "ACK Flag Cnt": generateRandomInt(5, 50),
      "URG Flag Cnt": generateRandomInt(0, 2),
      "CWE Flag Count": generateRandomInt(0, 2),
      "ECE Flag Cnt": generateRandomInt(0, 2),
      "Down/Up Ratio": generateRandomValue(0.1, 10),
      "Pkt Size Avg": generateRandomValue(100, 800),
      "Fwd Seg Size Avg": generateRandomValue(100, 800),
      "Bwd Seg Size Avg": generateRandomValue(50, 400),
      "Fwd Byts/b Avg": generateRandomValue(0, 100),
      "Fwd Pkts/b Avg": generateRandomValue(0, 10),
      "Fwd Blk Rate Avg": generateRandomValue(0, 1),
      "Bwd Byts/b Avg": generateRandomValue(0, 100),
      "Bwd Pkts/b Avg": generateRandomValue(0, 10),
      "Bwd Blk Rate Avg": generateRandomValue(0, 1),
      "Subflow Fwd Pkts": generateRandomInt(1, 100),
      "Subflow Fwd Byts": generateRandomInt(100, 10000),
      "Subflow Bwd Pkts": generateRandomInt(1, 50),
      "Subflow Bwd Byts": generateRandomInt(50, 5000),
      "Init Fwd Win Byts": generateRandomInt(1000, 65535),
      "Init Bwd Win Byts": generateRandomInt(1000, 65535),
      "Fwd Act Data Pkts": generateRandomInt(1, 50),
      "Fwd Seg Size Min": generateRandomInt(20, 100),
      "Active Mean": generateRandomValue(1000, 100000),
      "Active Std": generateRandomValue(500, 50000),
      "Active Max": generateRandomValue(5000, 500000),
      "Active Min": generateRandomValue(100, 5000),
      "Idle Mean": generateRandomValue(1000, 100000),
      "Idle Std": generateRandomValue(500, 50000),
      "Idle Max": generateRandomValue(5000, 500000),
      "Idle Min": generateRandomValue(100, 5000),
      Label: threat.threatType,
    };
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
          <div className="space-y-6">
            {/* Basic Information Grid */}
            <div className="grid grid-cols-1 gap-6">
              {/*  Basic Info */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Basic Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Status:</span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
                        {threat.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Detection Time:</span>
                      <span className="text-gray-900 font-medium">
                        {new Date(threat.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Source IP:</span>
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {threat.sourceIp}
                        </code>
                        <button
                          onClick={() => copyToClipboard(threat.sourceIp)}
                          className="p-1 text-gray-500 hover:text-gray-700"
                          title="Copy IP"
                        >
                          <FiCopy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Target IP:</span>
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {threat.targetIp}
                        </code>
                        <button
                          onClick={() => copyToClipboard(threat.targetIp)}
                          className="p-1 text-gray-500 hover:text-gray-700"
                          title="Copy IP"
                        >
                          <FiCopy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Network Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Port:</span>
                      <span className="text-gray-900 font-medium">
                        {threat.port}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Protocol:</span>
                      <span className="text-gray-900 font-medium">
                        {threat.protocol}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Source Label:</span>
                      <span className="text-gray-900 font-medium">
                        {threat.sourceLabel}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Threat Type:</span>
                      <span className="text-gray-900 font-medium">
                        {threat.threatType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* JSON Data Display */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FiActivity className="w-5 h-5 text-blue-600" />
                    Raw Network Analysis Data (JSON)
                  </h3>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        JSON.stringify(generateThreatData(), null, 2)
                      )
                    }
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    title="Copy JSON to clipboard"
                  >
                    <FiCopy className="w-4 h-4" />
                    Copy JSON
                  </button>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-green-400 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                    {JSON.stringify(generateThreatData(), null, 2)}
                  </pre>
                </div>
              </div>
              {/* Right Column - Details & Actions */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Threat Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600 block mb-1">
                        Detected At:
                      </span>
                      <p className="text-gray-900 text-sm">
                        {new Date(threat.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600 block mb-1">
                        Current Status:
                      </span>
                      <p className="text-gray-900 text-sm">{threat.status}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 block mb-1">
                        Severity Level:
                      </span>
                      <p className="text-gray-900 text-sm">{threat.severity}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Actions
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
                      Block IP Address
                    </button>
                    <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                      Start Investigation
                    </button>
                    <button className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">
                      Dismiss Threat
                    </button>
                  </div>
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
