import { useCOR } from "@/contexts/CORContext";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SlidersHorizontal } from "lucide-react";
import { industryFactors, getSizeFactor } from "@/lib/industryFactors";
import { motion } from "framer-motion";

export function ROISliders() {
  const { roiParams, setROIParams, aiRiskFactor, deltaPotential, organizationSize, setOrganizationSize, industry, setIndustry } = useCOR();

  return (
    <Card className="glass-strong border-border/30 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-health-warning/5 to-transparent pointer-events-none" />
      <CardHeader className="relative">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-health-warning/10 flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4 text-health-warning" />
          </div>
          פרמטרי ROI
        </CardTitle>
      </CardHeader>
      <CardContent className="relative space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider">ענף</label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger className="bg-background/30 border-border/20 h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(industryFactors).map(([key, { label, factor }]) => (
                  <SelectItem key={key} value={key}>{label} (×{factor})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider">עובדים</label>
            <Input
              type="number"
              value={organizationSize}
              onChange={(e) => setOrganizationSize(Math.max(1, parseInt(e.target.value) || 1))}
              className="bg-background/30 border-border/20 h-9 text-xs"
              min={1}
            />
          </div>
        </div>

        {[
          { label: "H: שעות אובדן שבועיות", value: roiParams.h, display: `${roiParams.h}`, min: 1, max: 40, step: 1, onChange: (v: number) => setROIParams({ ...roiParams, h: v }) },
          { label: "C: עלות לשעה", value: roiParams.c, display: `₪${roiParams.c}`, min: 50, max: 1000, step: 10, onChange: (v: number) => setROIParams({ ...roiParams, c: v }) },
          { label: "P: הסתברות הישנות", value: roiParams.p * 100, display: `${(roiParams.p * 100).toFixed(0)}%`, min: 5, max: 95, step: 5, onChange: (v: number) => setROIParams({ ...roiParams, p: v / 100 }) },
        ].map((s, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{s.label}</span>
              <span className="font-bold text-primary font-display">{s.display}</span>
            </div>
            <Slider value={[s.value]} onValueChange={([v]) => s.onChange(v)} min={s.min} max={s.max} step={s.step} />
          </div>
        ))}

        <div className="pt-3 border-t border-border/20 space-y-2" dir="ltr">
          <p className="text-muted-foreground text-[10px] font-mono">
            ΔP = ({roiParams.h}×{roiParams.c}×52) × ({roiParams.p.toFixed(2)}+{aiRiskFactor.toFixed(2)}) × {getSizeFactor(organizationSize)} × {industryFactors[industry]?.factor ?? 1.0}
          </p>
          <motion.p
            key={deltaPotential}
            initial={{ scale: 1.05, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-bold text-primary font-display"
          >
            = ₪{deltaPotential.toLocaleString("he-IL", { maximumFractionDigits: 0 })}
          </motion.p>
        </div>
      </CardContent>
    </Card>
  );
}
