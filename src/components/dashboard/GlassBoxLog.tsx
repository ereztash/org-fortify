import { useCOR } from "@/contexts/CORContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { getSizeFactor, getIndustryFactor } from "@/lib/industryFactors";

export function GlassBoxLog() {
  const { insights, roiParams, aiRiskFactor, deltaPotential, jQuotient, capacity, entropy, organizationSize, industry } = useCOR();

  const sizeFactor = getSizeFactor(organizationSize);
  const industryFactor = getIndustryFactor(industry);

  return (
    <Card className="glass border-border/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Eye className="w-5 h-5 text-primary" />
          Glass Box — שרשרת הסקה מלאה
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm font-mono">
        <div className="p-3 rounded-lg bg-background/50 border border-border/30 space-y-1.5">
          <p className="text-xs text-muted-foreground/60">// פרמטרי קלט</p>
          <p className="text-muted-foreground">
            <span className="text-primary">ROI.params</span> → H={roiParams.h} C=₪{roiParams.c} P={roiParams.p}
          </p>
          <p className="text-muted-foreground">
            <span className="text-primary">org.size</span> → {organizationSize} עובדים (sizeFactor={sizeFactor})
          </p>
          <p className="text-muted-foreground">
            <span className="text-primary">org.industry</span> → {industry} (industryFactor={industryFactor})
          </p>
          <p className="text-muted-foreground">
            <span className="text-primary">AI.risk</span> → {aiRiskFactor.toFixed(3)}
          </p>
        </div>

        <div className="p-3 rounded-lg bg-background/50 border border-border/30 space-y-1.5">
          <p className="text-xs text-muted-foreground/60">// חישוב ΔPotential</p>
          <p className="text-muted-foreground text-xs">
            ΔP = ({roiParams.h} × {roiParams.c} × 52) × ({roiParams.p.toFixed(2)} + {aiRiskFactor.toFixed(2)}) × {sizeFactor} × {industryFactor}
          </p>
          <p className="text-primary font-bold">
            = ₪{deltaPotential.toLocaleString("he-IL", { maximumFractionDigits: 0 })}
          </p>
        </div>

        <div className="p-3 rounded-lg bg-background/50 border border-border/30 space-y-1.5">
          <p className="text-xs text-muted-foreground/60">// J-Quotient = C / E</p>
          <p className="text-muted-foreground">
            <span className="text-primary">C (Capacity)</span> → {capacity.toLocaleString()}
          </p>
          <p className="text-muted-foreground">
            <span className="text-primary">E (Entropy)</span> → {entropy.toLocaleString()}
          </p>
          <p className="text-muted-foreground">
            <span className="text-primary">J</span> → {jQuotient.toFixed(3)}
            {entropy > 0.65 * capacity && <span className="text-destructive"> ⚠ מעל סף שבירה</span>}
          </p>
        </div>

        {insights.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">תובנות ASA ({insights.length}):</p>
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
