export const industryFactors: Record<string, { label: string; factor: number }> = {
  fintech: { label: "פינטק", factor: 1.4 },
  cyber: { label: "סייבר", factor: 1.3 },
  healthtech: { label: "Healthtech", factor: 1.2 },
  logistics: { label: "לוגיסטיקה מורכבת", factor: 1.15 },
  saas: { label: "SaaS", factor: 1.1 },
  other: { label: "אחר", factor: 1.0 },
};

export function getIndustryFactor(industry: string): number {
  return industryFactors[industry]?.factor ?? 1.0;
}

export function getSizeFactor(size: number): number {
  if (size > 200) return 1.3;
  if (size > 100) return 1.1;
  return 0.9;
}

export function calculateLatencyCost(
  numManagers: number,
  hoursPerWeek: number,
  avgRate: number
): number {
  return numManagers * hoursPerWeek * avgRate * 52 * 0.2;
}

export function calculateSemanticDriftCost(
  numTeamLeads: number,
  extraHours: number,
  avgRate: number
): number {
  return numTeamLeads * extraHours * avgRate * 52;
}

// Benchmark data from 100 organizations research
export const benchmarkData = {
  percentiles: [
    { percentile: 10, j: 0.6, delta: 850000 },
    { percentile: 25, j: 0.85, delta: 520000 },
    { percentile: 50, j: 1.15, delta: 310000 },
    { percentile: 75, j: 1.6, delta: 150000 },
    { percentile: 90, j: 2.1, delta: 60000 },
  ],
  collapseThreshold: 1.2,
  collapseTimeMonths: 18,
};
