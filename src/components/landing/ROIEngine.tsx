import { useMemo } from "react";
import { useCOR } from "@/contexts/CORContext";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export function ROIEngine() {
  const { roiParams, setROIParams, aiRiskFactor, deltaPotential } = useCOR();

  const chartData = useMemo(() => {
    const annualLoss = roiParams.h * roiParams.c * 52;
    return [
      { name: "עלות אי-עשייה שנתית", value: annualLoss, color: "hsl(0, 72%, 51%)" },
      { name: "ΔPotential (כולל AI)", value: deltaPotential, color: "hsl(38, 92%, 50%)" },
      { name: "חיסכון פוטנציאלי", value: deltaPotential * 0.7, color: "hsl(160, 84%, 39%)" },
    ];
  }, [roiParams, deltaPotential]);

  return (
    <section id="roi-engine" className="py-24 px-6">
      <div className="container max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <p className="text-sm text-primary font-medium tracking-wider uppercase">Dynamic ROI Engine</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display">מחשבון עלות אי-עשייה</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            הזז את הסליידרים. הנוסחה שקופה. התוצאה מתעדכנת בזמן אמת.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Sliders */}
          <div className="space-y-6">
            <Card className="glass border-border/30">
              <CardContent className="p-6 space-y-8">
                {/* H — Hours */}
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <label className="text-sm font-medium">H — שעות אובדן שבועיות</label>
                    <span className="text-2xl font-bold font-display text-primary">{roiParams.h}</span>
                  </div>
                  <Slider
                    value={[roiParams.h]}
                    onValueChange={([v]) => setROIParams({ ...roiParams, h: v })}
                    min={1}
                    max={40}
                    step={1}
                  />
                </div>

                {/* C — Cost */}
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <label className="text-sm font-medium">C — עלות לשעה (₪)</label>
                    <span className="text-2xl font-bold font-display text-primary">₪{roiParams.c}</span>
                  </div>
                  <Slider
                    value={[roiParams.c]}
                    onValueChange={([v]) => setROIParams({ ...roiParams, c: v })}
                    min={50}
                    max={1000}
                    step={10}
                  />
                </div>

                {/* P — Probability */}
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <label className="text-sm font-medium">P — הסתברות הישנות</label>
                    <span className="text-2xl font-bold font-display text-primary">{(roiParams.p * 100).toFixed(0)}%</span>
                  </div>
                  <Slider
                    value={[roiParams.p * 100]}
                    onValueChange={([v]) => setROIParams({ ...roiParams, p: v / 100 })}
                    min={5}
                    max={95}
                    step={5}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Glass Box — Formula */}
            <Card className="glass border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-primary flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Glass Box — נוסחה שקופה
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm font-mono" dir="ltr">
                <p className="text-muted-foreground">
                  ΔPotential = (H × C × 52) × (P + ai_risk_factor)
                </p>
                <p className="text-foreground">
                  ΔPotential = ({roiParams.h} × {roiParams.c} × 52) × ({roiParams.p.toFixed(2)} + {aiRiskFactor.toFixed(2)})
                </p>
                <p className="text-2xl font-bold text-primary pt-2">
                  = ₪{deltaPotential.toLocaleString("he-IL", { maximumFractionDigits: 0 })}
                </p>
                {aiRiskFactor > 0 && (
                  <p className="text-xs text-health-warning">
                    ⚠ ai_risk_factor מעודכן מתובנות ASA: +{aiRiskFactor.toFixed(2)}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          <Card className="glass border-border/30">
            <CardContent className="p-6 h-full flex flex-col justify-center">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 25%, 15%)" />
                  <XAxis
                    type="number"
                    tick={{ fill: "hsl(215, 16%, 55%)", fontSize: 12 }}
                    tickFormatter={(v: number) => `₪${(v / 1000).toFixed(0)}K`}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fill: "hsl(215, 16%, 55%)", fontSize: 11 }}
                    width={140}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(222, 47%, 7%)",
                      border: "1px solid hsl(215, 25%, 15%)",
                      borderRadius: "8px",
                      color: "hsl(210, 40%, 93%)",
                    }}
                    formatter={(value: number) => [`₪${value.toLocaleString("he-IL")}`, ""]}
                  />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={36}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
