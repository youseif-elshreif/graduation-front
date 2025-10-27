// FILE: src/components/ThreatList.tsx
// Container component for rendering a list of threat cards

import React from "react";
import ThreatCard from "./ThreatCard";
import { ThreatListProps, Threat } from "@/types/threats";

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
            className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 
                     p-6 shadow-lg animate-pulse"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="h-4 bg-white/20 rounded w-48"></div>
              <div className="h-8 w-8 bg-white/20 rounded"></div>
            </div>

            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-white/20 rounded-full w-16"></div>
              <div className="h-6 bg-white/20 rounded-full w-20"></div>
              <div className="h-6 bg-white/20 rounded-full w-12"></div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="h-4 bg-white/20 rounded w-32"></div>
                <div className="h-4 bg-white/20 rounded w-36"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-white/20 rounded w-28"></div>
                <div className="h-4 bg-white/20 rounded w-24"></div>
              </div>
            </div>

            <div className="h-4 bg-white/20 rounded w-3/4 mb-3"></div>
            <div className="flex justify-between">
              <div className="h-4 bg-white/20 rounded w-32"></div>
              <div className="h-4 bg-white/20 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (threats.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8 shadow-lg">
          <div className="text-6xl mb-4">🛡️</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No Threats Found
          </h3>
          <p className="text-gray-300">{emptyMessage}</p>
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
