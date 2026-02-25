import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { getIndustryFactor, getSizeFactor } from "@/lib/industryFactors";

export interface Insight {
  id: string;
  content: string;
  weight: number;
  source: string;
  type?: "normalization" | "contradiction" | "structural_failure";
  createdAt: Date;
}

export interface Tourniquet {
  id: string;
  title: string;
  priority: number;
  status: "pending" | "active" | "resolved";
  linkedInsightId?: string;
}

export interface ROIParams {
  h: number;
  c: number;
  p: number;
}

interface CORState {
  roiParams: ROIParams;
  aiRiskFactor: number;
  insights: Insight[];
  tourniquets: Tourniquet[];
  healthScore: number;
  deltaPotential: number;
  jQuotient: number;
  organizationSize: number;
  industry: string;
  capacity: number;
  entropy: number;
}

interface CORContextType extends CORState {
  setROIParams: (params: ROIParams) => void;
  setOrganizationSize: (size: number) => void;
  setIndustry: (industry: string) => void;
  addInsight: (insight: Insight) => void;
  addTourniquet: (tourniquet: Tourniquet) => void;
  updateTourniquetStatus: (id: string, status: Tourniquet["status"]) => void;
  healthLevel: "critical" | "warning" | "stable" | "optimal";
}

const CORContext = createContext<CORContextType | undefined>(undefined);

/** ΔPotential = (h × c × 52) × (p + aiRisk) × sizeFactor × industryFactor */
function calculateDeltaPotential(
  params: ROIParams,
  aiRiskFactor: number,
  orgSize: number,
  industry: string
): number {
  const sizeFactor = getSizeFactor(orgSize);
  const industryFactor = getIndustryFactor(industry);
  return (params.h * params.c * 52) * (params.p + aiRiskFactor) * sizeFactor * industryFactor;
}

/** C (Capacity) = base resources minus structural losses */
function calculateCapacity(orgSize: number, resolvedCount: number): number {
  const baseCapacity = orgSize * 1000; // Resource units per employee
  const resolvedBonus = resolvedCount * 5000;
  return baseCapacity + resolvedBonus;
}

/** E (Entropy) = accumulated deviations */
function calculateEntropy(insightCount: number, aiRiskFactor: number, unresolvedCount: number): number {
  const insightEntropy = insightCount * 2000;
  const riskEntropy = aiRiskFactor * 50000;
  const unresolvedEntropy = unresolvedCount * 3000;
  return Math.max(1, insightEntropy + riskEntropy + unresolvedEntropy);
}

/** J-Quotient = C / E. Breach threshold: E > 0.65 * C → 300% collapse risk */
function calculateJQuotient(capacity: number, entropy: number): number {
  return capacity / entropy;
}

/** Health Score normalized 0-100 from J-Quotient */
function calculateHealthScore(j: number, capacity: number, entropy: number): number {
  const rawScore = (j / 2.5) * 100;
  const breachThreshold = 0.65;
  const breachRisk = entropy > breachThreshold * capacity ? 0.8 : 1.0;
  return Math.min(100, Math.max(0, rawScore * breachRisk));
}

function getHealthLevel(score: number): "critical" | "warning" | "stable" | "optimal" {
  if (score < 25) return "critical";
  if (score < 50) return "warning";
  if (score < 75) return "stable";
  return "optimal";
}

export function CORProvider({ children }: { children: React.ReactNode }) {
  const [roiParams, setROIParams] = useState<ROIParams>({ h: 8, c: 250, p: 0.3 });
  const [aiRiskFactor, setAiRiskFactor] = useState(0);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [tourniquets, setTourniquets] = useState<Tourniquet[]>([]);
  const [organizationSize, setOrganizationSize] = useState(100);
  const [industry, setIndustry] = useState("other");

  const resolvedCount = useMemo(
    () => tourniquets.filter((t) => t.status === "resolved").length,
    [tourniquets]
  );

  const unresolvedCount = useMemo(
    () => tourniquets.filter((t) => t.status !== "resolved").length,
    [tourniquets]
  );

  const capacity = useMemo(
    () => calculateCapacity(organizationSize, resolvedCount),
    [organizationSize, resolvedCount]
  );

  const entropy = useMemo(
    () => calculateEntropy(insights.length, aiRiskFactor, unresolvedCount),
    [insights.length, aiRiskFactor, unresolvedCount]
  );

  const jQuotient = useMemo(() => calculateJQuotient(capacity, entropy), [capacity, entropy]);

  const deltaPotential = useMemo(
    () => calculateDeltaPotential(roiParams, aiRiskFactor, organizationSize, industry),
    [roiParams, aiRiskFactor, organizationSize, industry]
  );

  const healthScore = useMemo(
    () => calculateHealthScore(jQuotient, capacity, entropy),
    [jQuotient, capacity, entropy]
  );

  const healthLevel = useMemo(() => getHealthLevel(healthScore), [healthScore]);

  const addInsight = useCallback((insight: Insight) => {
    setInsights((prev) => [...prev, insight]);
    setAiRiskFactor((prev) => Math.min(1, prev + insight.weight * 0.1));
  }, []);

  const addTourniquet = useCallback((tourniquet: Tourniquet) => {
    setTourniquets((prev) => [...prev, tourniquet]);
  }, []);

  const updateTourniquetStatus = useCallback((id: string, status: Tourniquet["status"]) => {
    setTourniquets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  }, []);

  return (
    <CORContext.Provider
      value={{
        roiParams,
        aiRiskFactor,
        insights,
        tourniquets,
        healthScore,
        deltaPotential,
        jQuotient,
        organizationSize,
        industry,
        capacity,
        entropy,
        healthLevel,
        setROIParams,
        setOrganizationSize,
        setIndustry,
        addInsight,
        addTourniquet,
        updateTourniquetStatus,
      }}
    >
      <div className={`health-${healthLevel}`}>{children}</div>
    </CORContext.Provider>
  );
}

export function useCOR() {
  const context = useContext(CORContext);
  if (!context) throw new Error("useCOR must be used within CORProvider");
  return context;
}
