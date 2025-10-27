// FILE: lib/threats.js
// Threat data management and real-time simulation for security dashboard

import threatsData from "../data/threats-seed.json";

let simulationInterval = null;
let eventCallback = null;

// Generate random threat types and severity levels
const threatTypes = [
  "DDoS",
  "Port Scan",
  "Brute Force",
  "SQLi",
  "XSS",
  "Malware",
  "Phishing",
  "Vulnerability Scan",
  "Data Exfiltration",
  "Buffer Overflow",
];
const severityLevels = ["Critical", "High", "Medium", "Low"];
const protocols = ["TCP", "UDP", "HTTP", "HTTPS", "SSH", "FTP", "SMTP"];
const statuses = ["New", "Investigating", "Blocked", "Dismissed"];

// Generate random IP address
function generateRandomIP() {
  return `${Math.floor(Math.random() * 256)}.${Math.floor(
    Math.random() * 256
  )}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
}

// Generate random threat object
function generateRandomThreat() {
  const threatType =
    threatTypes[Math.floor(Math.random() * threatTypes.length)];
  const severity =
    severityLevels[Math.floor(Math.random() * severityLevels.length)];
  const protocol = protocols[Math.floor(Math.random() * protocols.length)];

  return {
    id: `t${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    sourceIp: generateRandomIP(),
    sourceLabel: [
      "unknown-isp",
      "malicious-bot",
      "compromised-host",
      "external-attacker",
      "botnet-member",
    ][Math.floor(Math.random() * 5)],
    targetIp: `10.0.0.${Math.floor(Math.random() * 255)}`,
    threatType,
    severity,
    status: "New",
    protocol,
    port: Math.floor(Math.random() * 65535) + 1,
    hits: Math.floor(Math.random() * 5000) + 1,
    notes: `${threatType} detected from ${generateRandomIP()}`,
    pattern: `${threatType.toLowerCase()} pattern detected`,
  };
}

// Load initial seed data
export function loadSeedData() {
  return [...threatsData];
}

// Start real-time threat simulation
export function startRealtimeSimulation(onNewAttack, intervalMs = 5000) {
  if (simulationInterval) {
    clearInterval(simulationInterval);
  }

  eventCallback = onNewAttack;

  simulationInterval = setInterval(() => {
    const newThreat = generateRandomThreat();
    if (eventCallback) {
      eventCallback(newThreat);
    }
  }, intervalMs);

  return simulationInterval;
}

// Stop real-time simulation
export function stopRealtimeSimulation() {
  if (simulationInterval) {
    clearInterval(simulationInterval);
    simulationInterval = null;
  }
  eventCallback = null;
}

// Filter threats based on criteria
export function filterThreats(threats, filters) {
  return threats.filter((threat) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        threat.sourceIp.toLowerCase().includes(searchLower) ||
        threat.targetIp.toLowerCase().includes(searchLower) ||
        threat.threatType.toLowerCase().includes(searchLower) ||
        threat.notes.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;
    }

    // Threat type filter
    if (filters.threatTypes && filters.threatTypes.length > 0) {
      if (!filters.threatTypes.includes(threat.threatType)) return false;
    }

    // Severity filter
    if (filters.severity && filters.severity !== "all") {
      if (threat.severity !== filters.severity) return false;
    }

    // Source filter
    if (filters.source) {
      const sourceLower = filters.source.toLowerCase();
      const matchesSource =
        threat.sourceIp.toLowerCase().includes(sourceLower) ||
        threat.sourceLabel.toLowerCase().includes(sourceLower);

      if (!matchesSource) return false;
    }

    // Time range filter
    if (filters.timeRange && filters.timeRange !== "all") {
      const now = new Date();
      const threatTime = new Date(threat.timestamp);
      const diffMs = now - threatTime;

      switch (filters.timeRange) {
        case "1min":
          if (diffMs > 60 * 1000) return false;
          break;
        case "5min":
          if (diffMs > 5 * 60 * 1000) return false;
          break;
        case "1hour":
          if (diffMs > 60 * 60 * 1000) return false;
          break;
        case "24hours":
          if (diffMs > 24 * 60 * 60 * 1000) return false;
          break;
      }
    }

    return true;
  });
}

// Paginate threats
export function paginateThreats(threats, page = 1, pageSize = 10) {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    threats: threats.slice(startIndex, endIndex),
    totalPages: Math.ceil(threats.length / pageSize),
    totalCount: threats.length,
    currentPage: page,
    hasNext: endIndex < threats.length,
    hasPrev: page > 1,
  };
}

// Calculate threat statistics
export function calculateThreatStats(threats) {
  const stats = {
    total: threats.length,
    new: threats.filter((t) => t.status === "New").length,
    investigating: threats.filter((t) => t.status === "Investigating").length,
    blocked: threats.filter((t) => t.status === "Blocked").length,
    dismissed: threats.filter((t) => t.status === "Dismissed").length,
    bySeverity: {
      Critical: threats.filter((t) => t.severity === "Critical").length,
      High: threats.filter((t) => t.severity === "High").length,
      Medium: threats.filter((t) => t.severity === "Medium").length,
      Low: threats.filter((t) => t.severity === "Low").length,
    },
    byType: {},
  };

  // Calculate by threat type
  threatTypes.forEach((type) => {
    stats.byType[type] = threats.filter((t) => t.threatType === type).length;
  });

  return stats;
}

// Get top attackers
export function getTopAttackers(threats, limit = 5) {
  const ipCounts = {};

  threats.forEach((threat) => {
    const ip = threat.sourceIp;
    ipCounts[ip] = (ipCounts[ip] || 0) + threat.hits;
  });

  return Object.entries(ipCounts)
    .map(([ip, count]) => ({ ip, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

// Get attack patterns
export function getAttackPatterns(threats) {
  const patterns = {};

  threats.forEach((threat) => {
    const key = `${threat.threatType}:${threat.port}`;
    patterns[key] = (patterns[key] || 0) + 1;
  });

  return Object.entries(patterns)
    .map(([pattern, count]) => {
      const [type, port] = pattern.split(":");
      return { type, port: parseInt(port), count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}
