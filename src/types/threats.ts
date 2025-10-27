export interface Threat {
  id: string;
  timestamp: string;
  sourceIp: string;
  sourceLabel: string;
  targetIp: string;
  threatType: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  status: "New" | "Investigating" | "Blocked" | "Dismissed";
  protocol: string;
  port: number;
  hits: number;
  notes: string;
  pattern: string;
}

export interface FilterState {
  search: string;
  threatTypes: string[];
  severity: string;
  source: string;
  timeRange: string;
}

export interface ThreatCardProps {
  threat: Threat;
  isSelected?: boolean;
  showActions?: boolean;
  onSelect?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  onBlock?: (id: string) => void;
  onInvestigate?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export interface ThreatListProps {
  threats: Threat[];
  selectedIds?: Set<string>;
  showActions?: boolean;
  onSelect?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  onBlock?: (id: string) => void;
  onInvestigate?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export interface ThreatFilterBarProps {
  onFiltersChange: (filters: FilterState) => void;
  initialFilters?: Partial<FilterState>;
}

export interface BulkActionBarProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onBlockSelected: () => void;
  onDismissSelected: () => void;
  onInvestigateSelected: () => void;
  onClearSelection: () => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export interface ThreatsSidebarProps {
  threats: Threat[];
  className?: string;
}
