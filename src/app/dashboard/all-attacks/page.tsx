"use client";

import React, { useState, useEffect } from "react";
import ThreatFilterBar from "@/components/ThreatFilterBar";
import BulkActionBar from "@/components/BulkActionBar";
import ThreatList from "@/components/ThreatList";
import ThreatsSidebar from "@/components/RightSidebar/ThreatsSidebar";
import Pagination from "@/components/Pagination";
import ToggleLive from "@/components/ToggleLive";
import ThreatDetailsModal from "@/components/modals/ThreatDetailsModal";
import {
  loadSeedData,
  startRealtimeSimulation,
  stopRealtimeSimulation,
} from "../../../../lib/threats";
import { Threat, FilterState } from "@/types/threats";

const AllAttacksPage: React.FC = () => {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [filteredThreats, setFilteredThreats] = useState<Threat[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    threatTypes: [],
    severity: "",
    source: "",
    timeRange: "24h",
  });
  const [liveEnabled, setLiveEnabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const seedData = await loadSeedData();
        setThreats(seedData as Threat[]);
        setFilteredThreats(seedData as Threat[]);
      } catch (error) {
        console.error("Failed to load seed data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Handle real-time updates
  useEffect(() => {
    if (liveEnabled) {
      const handleNewThreat = (newThreat: Threat) => {
        setThreats((prev) => [newThreat, ...prev]);
      };
      startRealtimeSimulation(handleNewThreat);
    } else {
      stopRealtimeSimulation();
    }

    return () => stopRealtimeSimulation();
  }, [liveEnabled]);

  // Apply filters
  useEffect(() => {
    let filtered = [...threats];

    // Search filter
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        (threat) =>
          threat.sourceIp.toLowerCase().includes(search) ||
          threat.targetIp.toLowerCase().includes(search) ||
          threat.threatType.toLowerCase().includes(search)
      );
    }

    // Threat type filter
    if (filters.threatTypes.length > 0) {
      filtered = filtered.filter((threat) =>
        filters.threatTypes.includes(threat.threatType)
      );
    }

    // Severity filter
    if (filters.severity) {
      filtered = filtered.filter(
        (threat) => threat.severity === filters.severity
      );
    }

    // Source filter
    if (filters.source) {
      const source = filters.source.toLowerCase();
      filtered = filtered.filter(
        (threat) =>
          threat.sourceIp.toLowerCase().includes(source) ||
          threat.sourceLabel.toLowerCase().includes(source)
      );
    }

    // Time range filter
    const now = new Date();
    const timeRangeHours = {
      "1m": 1 / 60,
      "5m": 5 / 60,
      "1h": 1,
      "24h": 24,
    };

    const hours =
      timeRangeHours[filters.timeRange as keyof typeof timeRangeHours] || 24;
    const cutoffTime = new Date(now.getTime() - hours * 60 * 60 * 1000);

    filtered = filtered.filter(
      (threat) => new Date(threat.timestamp) > cutoffTime
    );

    setFilteredThreats(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [threats, filters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleThreatSelection = (id: string, selected: boolean) => {
    const newSelectedIds = new Set(selectedIds);
    if (selected) {
      newSelectedIds.add(id);
    } else {
      newSelectedIds.delete(id);
    }
    setSelectedIds(newSelectedIds);
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      const pageThreats = getPaginatedThreats();
      setSelectedIds(new Set(pageThreats.map((t) => t.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleBulkAction = (action: "block" | "dismiss" | "investigate") => {
    setThreats((prev) =>
      prev.map((threat) =>
        selectedIds.has(threat.id)
          ? {
              ...threat,
              status:
                action === "block"
                  ? "Blocked"
                  : action === "dismiss"
                  ? "Dismissed"
                  : "Investigating",
            }
          : threat
      )
    );
    setSelectedIds(new Set());
  };

  const handleViewDetails = (threat: Threat) => {
    setSelectedThreat(threat);
  };

  const handleThreatAction = (
    id: string,
    action: "block" | "dismiss" | "investigate"
  ) => {
    setThreats((prev) =>
      prev.map((threat) =>
        threat.id === id
          ? {
              ...threat,
              status:
                action === "block"
                  ? "Blocked"
                  : action === "dismiss"
                  ? "Dismissed"
                  : "Investigating",
            }
          : threat
      )
    );
  };

  const getPaginatedThreats = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredThreats.slice(startIndex, startIndex + pageSize);
  };

  const totalPages = Math.ceil(filteredThreats.length / pageSize);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-64"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">All Attacks</h1>
              <ToggleLive
                isEnabled={liveEnabled}
                onToggle={setLiveEnabled}
                onShowNewItems={() => {}}
              />
            </div>

            {/* Filter Bar */}
            <ThreatFilterBar
              onFiltersChange={handleFilterChange}
              initialFilters={filters}
            />

            {/* Bulk Actions */}
            <BulkActionBar
              selectedCount={selectedIds.size}
              totalCount={getPaginatedThreats().length}
              onSelectAll={handleSelectAll}
              onBlockSelected={() => handleBulkAction("block")}
              onDismissSelected={() => handleBulkAction("dismiss")}
              onInvestigateSelected={() => handleBulkAction("investigate")}
              onClearSelection={() => setSelectedIds(new Set())}
              allSelected={
                selectedIds.size === getPaginatedThreats().length &&
                getPaginatedThreats().length > 0
              }
            />

            {/* Threats List */}
            <ThreatList
              threats={getPaginatedThreats()}
              selectedIds={selectedIds}
              onSelect={handleThreatSelection}
              onViewDetails={handleViewDetails}
              onBlock={(id: string) => handleThreatAction(id, "block")}
              onInvestigate={(id: string) =>
                handleThreatAction(id, "investigate")
              }
              onDismiss={(id: string) => handleThreatAction(id, "dismiss")}
              showActions={false}
              showCheckboxes={true}
            />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalCount={filteredThreats.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 border-l border-gray-200 bg-white/50 backdrop-blur-sm">
          <ThreatsSidebar threats={filteredThreats} />
        </div>
      </div>

      {/* Threat Details Modal */}
      {selectedThreat && (
        <ThreatDetailsModal
          threat={selectedThreat}
          isOpen={true}
          onClose={() => setSelectedThreat(null)}
        />
      )}
    </div>
  );
};

export default AllAttacksPage;
