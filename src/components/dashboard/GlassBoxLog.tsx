import { useCOR } from "@/contexts/CORContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { getSizeFactor, getIndustryFactor } from "@/lib/industryFactors";
import { motion } from "framer-motion";

export function GlassBoxLog() {
  const { insights, roiParams, aiRiskFactor, deltaPotential, jQuotient, capacity, entropy, organizationSize, industry } = useCOR();

  const sizeFactor = getSizeFactor(organizationSize);
  const industryFactor = getIndustryFactor(industry);

  return (
    <Card className="glass-strong border-border/30 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-health-optimal/5 to-transparent pointer-events-none" />
      <CardHeader className="relative">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-health-optimal/10 flex items-center justify-center">
            <Eye className="w-4 h-4 text-health-optimal" />
          </div>
          Glass Box: שרשרת הסקה מלאה
        </CardTitle>
      </CardHeader>
      <CardContent className="relative space-y-3 text-sm font-mono">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="p-3 rounded-xl bg-background/30 border border-border/20 space-y-1.5"
        >
          <p className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">// פרמטרי קלט</p>
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-3 rounded-xl bg-background/30 border border-border/20 space-y-1.5"
        >
          <p className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">// חישוב ΔPotential</p>
          <p className="text-muted-foreground text-xs">
            ΔP = ({roiParams.h} × {roiParams.c} × 52) × ({roiParams.p.toFixed(2)} + {aiRiskFactor.toFixed(2)}) × {sizeFactor} × {industryFactor}
          </p>
          <p className="text-primary font-bold text-lg">
            = ₪{deltaPotential.toLocaleString("he-IL", { maximumFractionDigits: 0 })}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-3 rounded-xl bg-background/30 border border-border/20 space-y-1.5"
        >
          <p className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">// J-Quotient = C / E</p>
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
        </motion.div>

        {insights.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">תובנות ASA ({insights.length}):</p>
            {insights.slice(-5).map((ins, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="p-2.5 rounded-lg bg-background/20 border border-border/15 text-xs"
              >
                <span className="text-primary">[w={ins.weight.toFixed(2)}]</span>{" "}
                <span className="text-muted-foreground">{ins.content}</span>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
