import { useCOR } from "@/contexts/CORContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";

export function GlassBoxLog() {
  const { insights, roiParams, aiRiskFactor, deltaPotential } = useCOR();

  return (
    <Card className="glass border-border/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Eye className="w-5 h-5 text-primary" />
          Glass Box — שרשרת הסקה
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm font-mono">
        <div className="p-3 rounded-lg bg-background/50 border border-border/30 space-y-1">
          <p className="text-muted-foreground">
            <span className="text-primary">ROI.params</span> → H={roiParams.h} C={roiParams.c} P={roiParams.p}
          </p>
          <p className="text-muted-foreground">
            <span className="text-primary">AI.risk</span> → {aiRiskFactor.toFixed(3)}
          </p>
          <p className="text-muted-foreground">
            <span className="text-primary">ΔPotential</span> → ₪{deltaPotential.toLocaleString()}
          </p>
        </div>

        {insights.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">תובנות ({insights.length}):</p>
            {insights.slice(-5).map((ins, i) => (
              <div key={i} className="p-2 rounded bg-background/30 border border-border/20 text-xs">
                <span className="text-primary">[w={ins.weight.toFixed(2)}]</span>{" "}
                <span className="text-muted-foreground">{ins.content}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
