import { useCOR } from "@/contexts/CORContext";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SlidersHorizontal } from "lucide-react";

export function ROISliders() {
  const { roiParams, setROIParams, aiRiskFactor, deltaPotential } = useCOR();

  return (
    <Card className="glass border-border/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          פרמטרי ROI
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>H: שעות אובדן שבועיות</span>
            <span className="font-bold text-primary">{roiParams.h}</span>
          </div>
          <Slider
            value={[roiParams.h]}
            onValueChange={([v]) => setROIParams({ ...roiParams, h: v })}
            min={1}
            max={40}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>C: עלות לשעה (₪)</span>
            <span className="font-bold text-primary">₪{roiParams.c}</span>
          </div>
          <Slider
            value={[roiParams.c]}
            onValueChange={([v]) => setROIParams({ ...roiParams, c: v })}
            min={50}
            max={1000}
            step={10}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>P: הסתברות הישנות</span>
            <span className="font-bold text-primary">{(roiParams.p * 100).toFixed(0)}%</span>
          </div>
          <Slider
            value={[roiParams.p * 100]}
            onValueChange={([v]) => setROIParams({ ...roiParams, p: v / 100 })}
            min={5}
            max={95}
            step={5}
          />
        </div>

        <div className="pt-2 border-t border-border/30 space-y-1 text-sm font-mono" dir="ltr">
          <p className="text-muted-foreground">
            ΔPotential = ({roiParams.h} × {roiParams.c} × 52) × ({roiParams.p.toFixed(2)} + {aiRiskFactor.toFixed(2)})
          </p>
          <p className="text-xl font-bold text-primary">
            = ₪{deltaPotential.toLocaleString("he-IL", { maximumFractionDigits: 0 })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
