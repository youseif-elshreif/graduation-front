import {
  KPIData,
  ThreatAlert,
  AttackTypeDistribution,
  AlertsTimelineData,
  SeverityLevelData,
  SystemHealth,
  Protocol,
  BlockedIP,
  BlockedPort,
  NetworkNode,
  NetworkConnection,
  TimeSeriesPoint,
} from "@/types";

// Generate random data for charts
const generateTimeSeriesData = (
  hours: number = 24,
  baseValue: number = 10
): TimeSeriesPoint[] => {
  const data: TimeSeriesPoint[] = [];
  const now = new Date();

  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    const variation = Math.random() * baseValue * 0.6;
    const value = Math.max(
      0,
      Math.floor(baseValue + variation - baseValue * 0.3)
    );

    data.push({
      timestamp,
      value,
    });
  }

  return data;
};

// KPI Dashboard Data
export const mockKPIData: KPIData = {
  activeThreats: {
    current: 23,
    change: 5,
    trend: "up",
    sparklineData: [15, 18, 12, 25, 20, 28, 23, 19, 22, 25, 30, 23],
  },
  blockedIPs: {
    total: 1247,
    today: 15,
    change: 8,
  },
  blockedPorts: {
    total: 18,
    mostTargeted: "22 (SSH)",
    change: 2,
  },
  responseTime: {
    average: 850, // milliseconds
    fastest: 120,
    slowest: 2300,
    status: "good",
  },
};

// Threat Alerts Data
export const mockThreatAlerts: ThreatAlert[] = [
  {
    id: "1",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    type: "ddos",
    severity: "critical",
    status: "active",
    sourceIP: "185.220.101.42",
    sourceCountry: "Russia",
    targetIP: "192.168.1.50",
    targetPort: 80,
    description: "High-volume DDoS attack detected targeting web server",
    details: {
      protocol: "TCP",
      packetCount: 50000,
      dataSize: 250000000, // 250MB
      duration: 120,
      attackVector: "SYN Flood",
    },
    isBlocked: true,
    responseTime: 450,
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    type: "brute_force",
    severity: "high",
    status: "investigating",
    sourceIP: "103.28.36.181",
    sourceCountry: "China",
    targetIP: "192.168.1.10",
    targetPort: 22,
    description: "SSH brute force attack detected",
    details: {
      protocol: "SSH",
      packetCount: 847,
      duration: 300,
      attackVector: "Dictionary Attack",
    },
    isBlocked: true,
    responseTime: 320,
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    type: "port_scan",
    severity: "medium",
    status: "resolved",
    sourceIP: "45.146.164.110",
    sourceCountry: "Netherlands",
    targetIP: "192.168.1.0/24",
    description: "Port scanning activity detected across network range",
    details: {
      protocol: "TCP",
      packetCount: 1250,
      duration: 180,
    },
    isBlocked: true,
    responseTime: 180,
  },
];

// Attack Type Distribution Data
export const mockAttackTypeDistribution: AttackTypeDistribution[] = [
  {
    type: "ddos",
    count: 45,
    percentage: 28.5,
    priority: { critical: 12, high: 18, medium: 15, low: 0 },
  },
  {
    type: "port_scan",
    count: 38,
    percentage: 24.1,
    priority: { critical: 2, high: 8, medium: 20, low: 8 },
  },
  {
    type: "brute_force",
    count: 32,
    percentage: 20.3,
    priority: { critical: 5, high: 15, medium: 12, low: 0 },
  },
  {
    type: "web_attack",
    count: 24,
    percentage: 15.2,
    priority: { critical: 3, high: 8, medium: 10, low: 3 },
  },
  {
    type: "infiltration",
    count: 12,
    percentage: 7.6,
    priority: { critical: 8, high: 4, medium: 0, low: 0 },
  },
  {
    type: "botnet",
    count: 7,
    percentage: 4.4,
    priority: { critical: 2, high: 3, medium: 2, low: 0 },
  },
];

// Alerts Timeline Data
export const mockAlertsTimelineData: AlertsTimelineData = {
  critical: generateTimeSeriesData(24, 8),
  high: generateTimeSeriesData(24, 15),
  medium: generateTimeSeriesData(24, 25),
  low: generateTimeSeriesData(24, 12),
};

// Severity Levels Over Time
export const mockSeverityLevelData: SeverityLevelData[] = (() => {
  const data: SeverityLevelData[] = [];
  const now = new Date();

  for (let i = 23; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      timestamp,
      high: Math.floor(Math.random() * 15) + 5,
      medium: Math.floor(Math.random() * 25) + 10,
      low: Math.floor(Math.random() * 20) + 5,
    });
  }

  return data;
})();

// Network Protocols Data
export const mockProtocolData: Protocol[] = [
  {
    name: "TCP",
    connections: 15420,
    percentage: 45.2,
    attacks: 120,
    bandwidth: 850000,
    status: "warning",
  },
  {
    name: "UDP",
    connections: 8950,
    percentage: 26.3,
    attacks: 45,
    bandwidth: 620000,
    status: "normal",
  },
  {
    name: "HTTP",
    connections: 4280,
    percentage: 12.6,
    attacks: 80,
    bandwidth: 320000,
    status: "critical",
  },
  {
    name: "HTTPS",
    connections: 2840,
    percentage: 8.3,
    attacks: 25,
    bandwidth: 280000,
    status: "normal",
  },
  {
    name: "SSH",
    connections: 950,
    percentage: 2.8,
    attacks: 65,
    bandwidth: 45000,
    status: "warning",
  },
  {
    name: "FTP",
    connections: 680,
    percentage: 2.0,
    attacks: 35,
    bandwidth: 32000,
    status: "normal",
  },
  {
    name: "DNS",
    connections: 520,
    percentage: 1.5,
    attacks: 15,
    bandwidth: 28000,
    status: "normal",
  },
  {
    name: "SMTP",
    connections: 380,
    percentage: 1.1,
    attacks: 8,
    bandwidth: 18000,
    status: "normal",
  },
  {
    name: "ICMP",
    connections: 280,
    percentage: 0.8,
    attacks: 12,
    bandwidth: 15000,
    status: "normal",
  },
  {
    name: "Others",
    connections: 150,
    percentage: 0.4,
    attacks: 5,
    bandwidth: 8000,
    status: "normal",
  },
];

// Blocked IPs Data
export const mockBlockedIPs: BlockedIP[] = [
  {
    id: "1",
    ip: "185.220.101.42",
    country: "Russia",
    blockedAt: new Date(Date.now() - 2 * 60 * 1000),
    reason: "DDoS Attack",
    attackType: "ddos",
    duration: "temporary",
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    isActive: true,
    attackCount: 15,
  },
  {
    id: "2",
    ip: "103.28.36.181",
    country: "China",
    blockedAt: new Date(Date.now() - 5 * 60 * 1000),
    reason: "Brute Force SSH",
    attackType: "brute_force",
    duration: "permanent",
    isActive: true,
    attackCount: 8,
  },
  {
    id: "3",
    ip: "45.146.164.110",
    country: "Netherlands",
    blockedAt: new Date(Date.now() - 8 * 60 * 1000),
    reason: "Port Scanning",
    attackType: "port_scan",
    duration: "temporary",
    expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
    isActive: true,
    attackCount: 3,
  },
];

// Blocked Ports Data
export const mockBlockedPorts: BlockedPort[] = [
  {
    id: "1",
    port: 22,
    protocol: "TCP",
    reason: "Brute Force Protection",
    blockedAt: new Date(Date.now() - 60 * 60 * 1000),
    attacksBlocked: 145,
    isActive: true,
    lastAttackAt: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: "2",
    port: 23,
    protocol: "TCP",
    reason: "Telnet Security Risk",
    blockedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    attacksBlocked: 89,
    isActive: true,
    lastAttackAt: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: "3",
    port: 135,
    protocol: "TCP",
    reason: "RPC Vulnerability",
    blockedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    attacksBlocked: 67,
    isActive: true,
    lastAttackAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
];

// System Health Data
export const mockSystemHealth: SystemHealth = {
  cpu: {
    usage: 68,
    cores: 8,
    temperature: 72,
  },
  memory: {
    usage: 45,
    total: 32768, // 32GB in MB
    available: 18022,
  },
  storage: {
    usage: 35,
    total: 1024000, // 1TB in MB
    available: 665600,
  },
  network: {
    inbound: 125.5, // MB/s
    outbound: 89.2,
    packetsPerSecond: 15420,
  },
  database: {
    status: "healthy",
    connections: 45,
    responseTime: 12, // ms
  },
  aiEngine: {
    status: "active",
    modelAccuracy: 96.8,
    detectionRate: 15420, // flows per second
    processingSpeed: 8500,
  },
  uptime: 2592000, // 30 days in seconds
};

// Network Topology Data
export const mockNetworkNodes: NetworkNode[] = [
  {
    id: "firewall-1",
    type: "firewall",
    name: "Main Firewall",
    ip: "192.168.1.1",
    status: "healthy",
    connections: ["router-1", "server-1"],
    threats: [],
    position: { x: 400, y: 100 },
  },
  {
    id: "router-1",
    type: "router",
    name: "Core Router",
    ip: "192.168.1.2",
    status: "healthy",
    connections: ["firewall-1", "switch-1", "server-2"],
    threats: [],
    position: { x: 400, y: 250 },
  },
  {
    id: "server-1",
    type: "server",
    name: "Web Server",
    ip: "192.168.1.50",
    status: "critical",
    connections: ["firewall-1", "switch-1"],
    threats: ["1"],
    position: { x: 200, y: 150 },
  },
  {
    id: "server-2",
    type: "server",
    name: "Database Server",
    ip: "192.168.1.51",
    status: "warning",
    connections: ["router-1", "switch-1"],
    threats: ["2"],
    position: { x: 600, y: 150 },
  },
  {
    id: "switch-1",
    type: "switch",
    name: "Main Switch",
    ip: "192.168.1.10",
    status: "healthy",
    connections: ["router-1", "server-1", "server-2", "workstation-1"],
    threats: [],
    position: { x: 400, y: 400 },
  },
  {
    id: "workstation-1",
    type: "workstation",
    name: "Admin PC",
    ip: "192.168.1.100",
    status: "healthy",
    connections: ["switch-1"],
    threats: [],
    position: { x: 200, y: 500 },
  },
];

export const mockNetworkConnections: NetworkConnection[] = [
  {
    id: "conn-1",
    sourceId: "firewall-1",
    targetId: "router-1",
    type: "normal",
    protocol: "TCP",
    bandwidth: 85.2,
    isActive: true,
  },
  {
    id: "conn-2",
    sourceId: "firewall-1",
    targetId: "server-1",
    type: "attack",
    protocol: "TCP",
    bandwidth: 250.8,
    isActive: true,
  },
  {
    id: "conn-3",
    sourceId: "router-1",
    targetId: "switch-1",
    type: "normal",
    protocol: "TCP",
    bandwidth: 145.6,
    isActive: true,
  },
  {
    id: "conn-4",
    sourceId: "server-1",
    targetId: "switch-1",
    type: "suspicious",
    protocol: "TCP",
    bandwidth: 95.3,
    isActive: true,
  },
];

// Export all data
export { generateTimeSeriesData };
