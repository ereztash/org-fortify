import { useCOR } from "@/contexts/CORContext";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SlidersHorizontal } from "lucide-react";
import { industryFactors, getSizeFactor } from "@/lib/industryFactors";

export function ROISliders() {
  const { roiParams, setROIParams, aiRiskFactor, deltaPotential, organizationSize, setOrganizationSize, industry, setIndustry } = useCOR();

  return (
    <Card className="glass border-border/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          פרמטרי ROI
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">ענף</label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger className="bg-background/50 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(industryFactors).map(([key, { label, factor }]) => (
                  <SelectItem key={key} value={key}>{label} (×{factor})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">עובדים</label>
            <Input
              type="number"
              value={organizationSize}
              onChange={(e) => setOrganizationSize(Math.max(1, parseInt(e.target.value) || 1))}
              className="bg-background/50 h-8 text-xs"
              min={1}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>H: שעות אובדן שבועיות</span>
            <span className="font-bold text-primary">{roiParams.h}</span>
          </div>
          <Slider value={[roiParams.h]} onValueChange={([v]) => setROIParams({ ...roiParams, h: v })} min={1} max={40} step={1} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>C: עלות לשעה (₪)</span>
            <span className="font-bold text-primary">₪{roiParams.c}</span>
          </div>
          <Slider value={[roiParams.c]} onValueChange={([v]) => setROIParams({ ...roiParams, c: v })} min={50} max={1000} step={10} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>P: הסתברות הישנות</span>
            <span className="font-bold text-primary">{(roiParams.p * 100).toFixed(0)}%</span>
          </div>
          <Slider value={[roiParams.p * 100]} onValueChange={([v]) => setROIParams({ ...roiParams, p: v / 100 })} min={5} max={95} step={5} />
        </div>

        <div className="pt-2 border-t border-border/30 space-y-1 text-sm font-mono" dir="ltr">
          <p className="text-muted-foreground text-xs">
            ΔP = ({roiParams.h}×{roiParams.c}×52) × ({roiParams.p.toFixed(2)}+{aiRiskFactor.toFixed(2)}) × {getSizeFactor(organizationSize)} × {industryFactors[industry]?.factor ?? 1.0}
          </p>
          <p className="text-xl font-bold text-primary">
            = ₪{deltaPotential.toLocaleString("he-IL", { maximumFractionDigits: 0 })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
