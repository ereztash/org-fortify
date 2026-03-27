import { useCOR } from "@/contexts/CORContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { benchmarkData } from "@/lib/industryFactors";
import { motion } from "framer-motion";

export function BenchmarkingEngine() {
  const { jQuotient, organizationSize } = useCOR();

  const getPercentile = (j: number): number => {
    const { percentiles } = benchmarkData;
    if (j <= percentiles[0].j) return percentiles[0].percentile;
    if (j >= percentiles[percentiles.length - 1].j) return percentiles[percentiles.length - 1].percentile;

    for (let i = 0; i < percentiles.length - 1; i++) {
      if (j >= percentiles[i].j && j < percentiles[i + 1].j) {
        const ratio = (j - percentiles[i].j) / (percentiles[i + 1].j - percentiles[i].j);
        return Math.round(percentiles[i].percentile + ratio * (percentiles[i + 1].percentile - percentiles[i].percentile));
      }
    }
    return 50;
  };

  const percentile = getPercentile(jQuotient);
  const isAtRisk = jQuotient < benchmarkData.collapseThreshold;

  return (
    <Card className="glass-strong border-border/30 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-health-optimal/5 to-transparent pointer-events-none" />
      <CardHeader className="relative">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-health-optimal/10 flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-health-optimal" />
          </div>
          Benchmarking: מול 100 ארגונים
        </CardTitle>
      </CardHeader>
      <CardContent className="relative space-y-5">
        {/* Percentile bar */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            ביחס לארגונים בגודל {organizationSize > 200 ? "200+" : organizationSize > 100 ? "100-200" : "עד 100"} עובדים:
          </p>
          <div className="relative h-10 rounded-xl bg-muted/20 overflow-hidden border border-border/15">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-xl"
              initial={{ width: 0 }}
              animate={{ width: `${percentile}%` }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: `linear-gradient(90deg, hsl(var(--health-critical)), hsl(var(--health-warning)), hsl(var(--primary)))`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">
              אחוזון {percentile}
            </div>
          </div>
        </div>

        {/* J comparison */}
        <div className="grid grid-cols-3 gap-3 text-center">
          {benchmarkData.percentiles
            .filter((_, i) => i % 2 === 0)
            .map((p) => {
              const isClose = Math.abs(p.j - jQuotient) < 0.3;
              return (
                <motion.div
                  key={p.percentile}
                  whileHover={{ scale: 1.03 }}
                  className={`rounded-xl p-3 border transition-all duration-300 ${
                    isClose
                      ? "border-primary/40 bg-primary/10 shadow-sm shadow-primary/10"
                      : "border-border/20 bg-background/20 hover:border-border/30"
                  }`}
                >
                  <p className="text-xl font-bold font-display text-foreground">{p.j}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">P{p.percentile} J</p>
                </motion.div>
              );
            })}
        </div>

        {/* Risk warning */}
        {isAtRisk && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-4 bg-destructive/10 border border-destructive/20 text-sm text-center"
          >
            <p className="text-destructive font-medium">
              ⚠ חברות דומות עם J &lt; {benchmarkData.collapseThreshold} קרסו תוך {benchmarkData.collapseTimeMonths} חודשים
            </p>
          </motion.div>
        )}

        <p className="text-[10px] text-muted-foreground/40 text-center font-mono">
          מקור: מחקר COR-SYS על 100 ארגונים ו-10,000 סימולציות
        </p>
      </CardContent>
    </Card>
  );
}
