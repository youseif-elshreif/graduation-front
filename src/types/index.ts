// Base Types
export interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "analyst" | "manager" | "executive";
  firstName: string;
  lastName: string;
  avatar?: string;
  lastLogin?: Date;
  isActive: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresIn: number;
}

// Alert and Threat Types
export type ThreatSeverity = "critical" | "high" | "medium" | "low";
export type ThreatStatus =
  | "active"
  | "resolved"
  | "investigating"
  | "dismissed";
export type AttackType =
  | "ddos"
  | "port_scan"
  | "brute_force"
  | "web_attack"
  | "infiltration"
  | "botnet";

export interface ThreatAlert {
  id: string;
  timestamp: Date;
  type: AttackType;
  severity: ThreatSeverity;
  status: ThreatStatus;
  sourceIP: string;
  sourceCountry?: string;
  targetIP: string;
  targetPort?: number;
  description: string;
  details: {
    protocol?: string;
    packetCount?: number;
    dataSize?: number;
    duration?: number;
    attackVector?: string;
  };
  isBlocked: boolean;
  responseTime?: number; // in milliseconds
}

// Network Types
export interface NetworkNode {
  id: string;
  type: "server" | "workstation" | "router" | "firewall" | "switch";
  name: string;
  ip: string;
  status: "healthy" | "warning" | "critical" | "offline";
  connections: string[]; // IDs of connected nodes
  threats: string[]; // IDs of active threats
  position: { x: number; y: number };
}

export interface NetworkConnection {
  id: string;
  sourceId: string;
  targetId: string;
  type: "normal" | "suspicious" | "attack" | "blocked";
  protocol: string;
  bandwidth: number;
  isActive: boolean;
}

export interface Protocol {
  name: string;
  connections: number;
  percentage: number;
  attacks: number;
  bandwidth: number;
  status: "normal" | "warning" | "critical";
}

// Blocking Types
export interface BlockedIP {
  id: string;
  ip: string;
  country: string;
  blockedAt: Date;
  reason: string;
  attackType: AttackType;
  duration: "temporary" | "permanent";
  expiresAt?: Date;
  isActive: boolean;
  attackCount: number;
}

export interface BlockedPort {
  id: string;
  port: number;
  protocol: "TCP" | "UDP" | "BOTH";
  reason: string;
  blockedAt: Date;
  attacksBlocked: number;
  isActive: boolean;
  lastAttackAt?: Date;
}

// Dashboard KPI Types
export interface KPIData {
  activeThreats: {
    current: number;
    change: number;
    trend: "up" | "down" | "stable";
    sparklineData: number[];
  };
  blockedIPs: {
    total: number;
    today: number;
    change: number;
  };
  blockedPorts: {
    total: number;
    mostTargeted: string;
    change: number;
  };
  responseTime: {
    average: number;
    fastest: number;
    slowest: number;
    status: "excellent" | "good" | "warning" | "critical";
  };
}

// Chart Data Types
export interface TimeSeriesPoint {
  timestamp: Date;
  value: number;
  label?: string;
}

export interface AlertsTimelineData {
  critical: TimeSeriesPoint[];
  high: TimeSeriesPoint[];
  medium: TimeSeriesPoint[];
  low: TimeSeriesPoint[];
}

export interface AttackTypeDistribution {
  type: AttackType;
  count: number;
  percentage: number;
  priority: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export interface SeverityLevelData {
  timestamp: Date;
  high: number;
  medium: number;
  low: number;
}

// System Health Types
export interface SystemHealth {
  cpu: {
    usage: number;
    cores: number;
    temperature?: number;
  };
  memory: {
    usage: number;
    total: number;
    available: number;
  };
  storage: {
    usage: number;
    total: number;
    available: number;
  };
  network: {
    inbound: number;
    outbound: number;
    packetsPerSecond: number;
  };
  database: {
    status: "healthy" | "warning" | "critical";
    connections: number;
    responseTime: number;
  };
  aiEngine: {
    status: "active" | "training" | "offline";
    modelAccuracy: number;
    detectionRate: number;
    processingSpeed: number; // flows per second
  };
  uptime: number; // in seconds
}

// Report Types
export interface ReportConfig {
  id: string;
  name: string;
  type: "daily" | "weekly" | "monthly" | "custom";
  dateRange: {
    start: Date;
    end: Date;
  };
  sections: string[];
  format: "pdf" | "excel" | "csv";
  recipients: string[];
  isScheduled: boolean;
  schedule?: string; // cron expression
}

// Component Props Types
export interface ChartProps {
  data: any;
  width?: number | string;
  height?: number | string;
  className?: string;
  loading?: boolean;
  error?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  children: React.ReactNode;
}

export interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
  loading?: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Search and Filter Types
export interface FilterOptions {
  severity?: ThreatSeverity[];
  attackType?: AttackType[];
  status?: ThreatStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  sourceIP?: string;
  targetIP?: string;
}

export interface SortOptions {
  field: string;
  direction: "asc" | "desc";
}

// Real-time Update Types
export interface LiveUpdate {
  type: "threat" | "block" | "system" | "user";
  data: any;
  timestamp: Date;
}

export interface WebSocketMessage {
  event: string;
  data: any;
  timestamp: Date;
}
