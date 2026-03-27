import { useCOR } from "@/contexts/CORContext";
import { motion } from "framer-motion";

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

  const glowMap = {
    critical: "drop-shadow(0 0 12px hsl(var(--health-critical) / 0.5))",
    warning: "drop-shadow(0 0 12px hsl(var(--health-warning) / 0.5))",
    stable: "drop-shadow(0 0 12px hsl(var(--health-stable) / 0.5))",
    optimal: "drop-shadow(0 0 12px hsl(var(--health-optimal) / 0.5))",
  };

  const color = colorMap[healthLevel];
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (healthScore / 100) * circumference;
  const breachThreshold = 0.65;
  const isAboveThreshold = entropy > breachThreshold * capacity;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90" style={{ filter: glowMap[healthLevel] }}>
          {/* Background track */}
          <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" opacity={0.3} />
          {/* Breach threshold marker */}
          <circle
            cx="60" cy="60" r="54" fill="none"
            stroke="hsl(var(--health-critical))"
            strokeWidth="1.5"
            strokeDasharray={`${circumference * 0.65} ${circumference * 0.35}`}
            opacity={0.3}
          />
          {/* Active arc */}
          <motion.circle
            cx="60" cy="60" r="54" fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Inner glow ring */}
          <circle cx="60" cy="60" r="48" fill="none" stroke={color} strokeWidth="0.5" opacity={0.2} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-4xl font-bold font-display"
            style={{ color }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
          >
            {Math.round(healthScore)}
          </motion.span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">{labelMap[healthLevel]}</span>
        </div>
      </div>

      <div className="text-center space-y-1.5">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">J-Quotient = C / E</p>
        <p className="text-xl font-bold font-display" style={{ color }}>
          J = {jQuotient.toFixed(2)}
        </p>
        {isAboveThreshold && (
          <motion.p
            className="text-[10px] text-destructive font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⚠ מעל סף שבירה: E &gt; 0.65C
          </motion.p>
        )}
      </div>
    </div>
  );
}
