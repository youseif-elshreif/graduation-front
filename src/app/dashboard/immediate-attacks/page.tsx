"use client";

import React, { useState, useEffect } from "react";
import ThreatFilterBar from "@/components/ThreatFilterBar";
import ThreatList from "@/components/ThreatList";
import ThreatDetailsModal from "@/components/modals/ThreatDetailsModal";
import { loadSeedData } from "../../../../lib/threats";
import { Threat, FilterState } from "@/types/threats";

const ImmediateAttacksPage: React.FC = () => {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [filteredThreats, setFilteredThreats] = useState<Threat[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    threatTypes: [],
    severity: "",
    source: "",
    timeRange: "1h", // Shorter default for immediate attacks
  });
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const seedData = await loadSeedData();
        // Filter to show only immediate threats (Critical and High priority)
        const immediateThreats = seedData.filter(
          (threat) =>
            threat.severity === "Critical" || threat.severity === "High"
        ) as Threat[];
        setThreats(immediateThreats);
        setFilteredThreats(immediateThreats);
      } catch (error) {
        console.error("Failed to load seed data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

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
      timeRangeHours[filters.timeRange as keyof typeof timeRangeHours] || 1;
    const cutoffTime = new Date(now.getTime() - hours * 60 * 60 * 1000);

    filtered = filtered.filter(
      (threat) => new Date(threat.timestamp) > cutoffTime
    );

    setFilteredThreats(filtered);
  }, [threats, filters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleViewDetails = (id: string) => {
    const threat = threats.find((t) => t.id === id);
    if (threat) {
      setSelectedThreat(threat);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Immediate Attacks
            </h1>
            <p className="text-gray-600 mt-1">
              Critical and High priority threats requiring immediate attention
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <ThreatFilterBar
          onFiltersChange={handleFilterChange}
          initialFilters={filters}
        />

        {/* Stats Banner */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {
                  filteredThreats.filter((t) => t.severity === "Critical")
                    .length
                }
              </div>
              <div className="text-sm text-gray-600">Critical Threats</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {filteredThreats.filter((t) => t.severity === "High").length}
              </div>
              <div className="text-sm text-gray-600">High Priority</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700">
                {filteredThreats.filter((t) => t.status === "New").length}
              </div>
              <div className="text-sm text-gray-600">Awaiting Action</div>
            </div>
          </div>
        </div>

        {/* Threats List */}
        <ThreatList
          threats={filteredThreats}
          onSelect={() => {}} // No selection for immediate attacks
          onViewDetails={handleViewDetails}
          onBlock={(id: string) => handleThreatAction(id, "block")}
          onInvestigate={(id: string) => handleThreatAction(id, "investigate")}
          onDismiss={(id: string) => handleThreatAction(id, "dismiss")}
          showActions={false} // Show view button instead of action buttons
          showCheckboxes={false} // No checkboxes for immediate attacks
          emptyMessage="No immediate threats detected at the moment."
        />
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

export default ImmediateAttacksPage;
