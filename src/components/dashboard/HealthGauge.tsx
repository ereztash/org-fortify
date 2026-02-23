import { useCOR } from "@/contexts/CORContext";

export function HealthGauge() {
  const { healthScore, healthLevel } = useCOR();

  const colorMap = {
    critical: "hsl(var(--health-critical))",
    warning: "hsl(var(--health-warning))",
    stable: "hsl(var(--health-stable))",
    optimal: "hsl(var(--health-optimal))",
  };

  const labelMap = {
    critical: "קריטי",
    warning: "אזהרה",
    stable: "יציב",
    optimal: "אופטימלי",
  };

  const color = colorMap[healthLevel];
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (healthScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold font-display" style={{ color }}>
            {Math.round(healthScore)}
          </span>
          <span className="text-xs text-muted-foreground">{labelMap[healthLevel]}</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center">Health Score</p>
    </div>
  );
}
