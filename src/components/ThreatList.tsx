// FILE: src/components/ThreatList.tsx
// Container component for rendering a list of threat cards

import React from "react";
import { FiShield } from "react-icons/fi";
import ThreatCard from "./ThreatCard";
import { ThreatListProps } from "@/types/threats";

interface ExtendedThreatListProps extends ThreatListProps {
  showCheckboxes?: boolean;
  loading?: boolean;
  emptyMessage?: string;
}

const ThreatList: React.FC<ExtendedThreatListProps> = ({
  threats,
  selectedIds = new Set(),
  onSelect,
  onViewDetails,
  onBlock,
  onInvestigate,
  onDismiss,
  showActions = false,
  showCheckboxes = false,
  loading = false,
  emptyMessage = "No threats found",
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 
                     p-6 shadow-sm animate-pulse"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="h-4 bg-gray-200 rounded w-48"></div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
            </div>

            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-gray-200 rounded-full w-16"></div>
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
              <div className="h-6 bg-gray-200 rounded-full w-12"></div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-4 bg-gray-200 rounded w-36"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-28"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            </div>

            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (threats.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <FiShield className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Threats Found
          </h3>
          <p className="text-gray-600">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {threats.map((threat) => (
        <ThreatCard
          key={threat.id}
          threat={threat}
          isSelected={selectedIds.has(threat.id)}
          onSelect={onSelect}
          onViewDetails={onViewDetails}
          onBlock={onBlock}
          onInvestigate={onInvestigate}
          onDismiss={onDismiss}
          showActions={showActions}
          showCheckbox={showCheckboxes}
          className=""
        />
      ))}
    </div>
  );
};

export default ThreatList;
