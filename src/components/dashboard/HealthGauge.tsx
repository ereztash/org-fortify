import { useCOR } from "@/contexts/CORContext";

export function HealthGauge() {
  const { healthScore, healthLevel, jQuotient, capacity, entropy } = useCOR();

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

  // Breach threshold line position (0.65 of capacity)
  const breachThreshold = 0.65;
  const isAboveThreshold = entropy > breachThreshold * capacity;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
          {/* Breach threshold marker */}
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="hsl(var(--health-critical))"
            strokeWidth="2"
            strokeDasharray={`${circumference * 0.65} ${circumference * 0.35}`}
            opacity={0.4}
          />
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

      {/* J-Quotient display */}
      <div className="text-center space-y-1">
        <p className="text-xs text-muted-foreground">J-Quotient = C / E</p>
        <p className="text-lg font-bold font-display" style={{ color }}>
          J = {jQuotient.toFixed(2)}
        </p>
        {isAboveThreshold && (
          <p className="text-[10px] text-destructive font-medium animate-pulse">
            ⚠ מעל סף שבירה — E &gt; 0.65C
          </p>
        )}
      </div>
    </div>
  );
}
