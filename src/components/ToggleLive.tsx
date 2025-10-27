// FILE: src/components/ToggleLive.jsx
// Toggle component for enabling/disabling live threat updates

import React from "react";
import { FiBell, FiBellOff } from "react-icons/fi";

const ToggleLive = ({
  isEnabled,
  onToggle,
  newItemsCount = 0,
  showNewItemsButton = false,
  onShowNewItems,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* New Items Notification */}
      {showNewItemsButton && newItemsCount > 0 && (
        <button
          onClick={onShowNewItems}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 
                   text-white rounded-lg font-medium transition-all shadow-lg 
                   hover:shadow-blue-500/25 animate-pulse"
        >
          <FiBell className="w-4 h-4" />
          {newItemsCount} new threat{newItemsCount !== 1 ? "s" : ""}
        </button>
      )}

      {/* Live Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isEnabled ? "bg-blue-600" : "bg-gray-600"
          }`}
          aria-label={`${isEnabled ? "Disable" : "Enable"} live updates`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isEnabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>

        <div className="flex items-center gap-1 text-sm">
          {isEnabled ? (
            <>
              <FiBell className="w-4 h-4 text-blue-400" />
              <span className="text-white font-medium">Live Updates</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </>
          ) : (
            <>
              <FiBellOff className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">Updates Paused</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToggleLive;
