import { useCOR } from "@/contexts/CORContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { benchmarkData } from "@/lib/industryFactors";

export function BenchmarkingEngine() {
  const { jQuotient, organizationSize } = useCOR();

  // Calculate percentile based on J-Quotient
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
    <Card className="glass border-border/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Benchmarking — מול 100 ארגונים
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Percentile bar */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            ביחס לארגונים בגודל {organizationSize > 200 ? "200+" : organizationSize > 100 ? "100-200" : "עד 100"} עובדים:
          </p>
          <div className="relative h-8 rounded-full bg-muted overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${percentile}%`,
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
            .map((p) => (
              <div
                key={p.percentile}
                className={`rounded-lg p-3 border ${
                  Math.abs(p.j - jQuotient) < 0.3
                    ? "border-primary/50 bg-primary/5"
                    : "border-border/30 bg-background/30"
                }`}
              >
                <p className="text-lg font-bold font-display text-foreground">{p.j}</p>
                <p className="text-[10px] text-muted-foreground">P{p.percentile} J</p>
              </div>
            ))}
        </div>

        {/* Risk warning */}
        {isAtRisk && (
          <div className="rounded-lg p-3 bg-destructive/10 border border-destructive/20 text-sm text-center">
            <p className="text-destructive font-medium">
              ⚠ חברות דומות עם J &lt; {benchmarkData.collapseThreshold} קרסו תוך {benchmarkData.collapseTimeMonths} חודשים
            </p>
          </div>
        )}

        <p className="text-[10px] text-muted-foreground/60 text-center font-mono">
          מקור: מחקר COR-SYS על 100 ארגונים ו-10,000 סימולציות
        </p>
      </CardContent>
    </Card>
  );
}
