// FILE: src/components/BulkActionBar.tsx
// Bulk action toolbar for selected threats

import React from "react";
import { FiSlash, FiX, FiSearch } from "react-icons/fi";
import { BulkActionBarProps } from "@/types/threats";

interface ExtendedBulkActionBarProps extends BulkActionBarProps {
  allSelected?: boolean;
}

const BulkActionBar: React.FC<ExtendedBulkActionBarProps> = ({
  selectedCount,
  totalCount,
  onSelectAll,
  onBlockSelected,
  onDismissSelected,
  onInvestigateSelected,
  onClearSelection,
  allSelected = false,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Selection Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(e) => onSelectAll(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded 
                       focus:ring-blue-500 focus:ring-2"
            />
            <span className="text-gray-900 font-medium">
              {selectedCount} of {totalCount} selected
            </span>
          </div>

          <button
            onClick={onClearSelection}
            className="text-gray-600 hover:text-gray-900 text-sm underline transition-colors"
          >
            Clear selection
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={onBlockSelected}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 
                     text-white rounded-lg font-medium transition-all shadow-sm 
                     hover:shadow-md"
          >
            <FiSlash className="w-4 h-4" />
            Block Selected ({selectedCount})
          </button>

          <button
            onClick={onInvestigateSelected}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 
                     text-white rounded-lg font-medium transition-all shadow-sm 
                     hover:shadow-md"
          >
            <FiSearch className="w-4 h-4" />
            Investigate ({selectedCount})
          </button>

          <button
            onClick={onDismissSelected}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 
                     text-white rounded-lg font-medium transition-all shadow-sm 
                     hover:shadow-md"
          >
            <FiX className="w-4 h-4" />
            Dismiss ({selectedCount})
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionBar;
