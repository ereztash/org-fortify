import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

export interface Insight {
  id: string;
  content: string;
  weight: number; // 0-1 semantic weight
  source: string;
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
  h: number; // hours lost per week
  c: number; // cost per hour
  p: number; // probability of recurrence
}

interface CORState {
  roiParams: ROIParams;
  aiRiskFactor: number;
  insights: Insight[];
  tourniquets: Tourniquet[];
  healthScore: number;
  deltaPotential: number;
}

interface CORContextType extends CORState {
  setROIParams: (params: ROIParams) => void;
  addInsight: (insight: Insight) => void;
  addTourniquet: (tourniquet: Tourniquet) => void;
  updateTourniquetStatus: (id: string, status: Tourniquet["status"]) => void;
  healthLevel: "critical" | "warning" | "stable" | "optimal";
}

const CORContext = createContext<CORContextType | undefined>(undefined);

function calculateDeltaPotential(params: ROIParams, aiRiskFactor: number): number {
  return (params.h * params.c * 52) * (params.p + aiRiskFactor);
}

function calculateHealthScore(deltaP: number, insightCount: number, resolvedCount: number): number {
  const base = Math.max(0, 100 - (deltaP / 5000) * 40);
  const insightPenalty = insightCount * 5;
  const resolvedBonus = resolvedCount * 10;
  return Math.min(100, Math.max(0, base - insightPenalty + resolvedBonus));
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

  const deltaPotential = useMemo(
    () => calculateDeltaPotential(roiParams, aiRiskFactor),
    [roiParams, aiRiskFactor]
  );

  const resolvedCount = useMemo(
    () => tourniquets.filter((t) => t.status === "resolved").length,
    [tourniquets]
  );

  const healthScore = useMemo(
    () => calculateHealthScore(deltaPotential, insights.length, resolvedCount),
    [deltaPotential, insights.length, resolvedCount]
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
        healthLevel,
        setROIParams,
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
