import { useMemo } from "react";
import { useCOR } from "@/contexts/CORContext";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { motion } from "framer-motion";

const WHATSAPP_ROI_URL = "https://wa.me/972524545963?text=היי%20ארז%2C%20המחשבון%20הראה%20לי%20מספרים%20מעניינים";

export function ROIEngine() {
  const { roiParams, setROIParams, aiRiskFactor, deltaPotential } = useCOR();

  const annualLoss = roiParams.h * roiParams.c * 52;

  const chartData = useMemo(() => {
    return [
      { name: "עלות אי-עשייה שנתית", value: annualLoss, color: "hsl(0, 72%, 51%)" },
      { name: "ΔPotential (כולל AI)", value: deltaPotential, color: "hsl(38, 92%, 50%)" },
      { name: "חיסכון פוטנציאלי", value: deltaPotential * 0.7, color: "hsl(160, 84%, 39%)" },
    ];
  }, [annualLoss, deltaPotential]);

  return (
    <section id="roi-engine" className="py-24 px-6 scroll-mt-20">
      <div className="container max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <p className="text-sm text-primary font-medium tracking-wider uppercase">Dynamic ROI Engine</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display">מחשבון עלות אי-עשייה</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            הזז את הסליידרים. הנוסחה שקופה. התוצאה מתעדכנת בזמן אמת.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Sliders */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <Card className="glass border-border/30">
              <CardContent className="p-6 space-y-8">
                {/* H: שעות */}
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <label className="text-sm font-medium">H: שעות אובדן שבועיות</label>
                    <motion.span
                      key={roiParams.h}
                      initial={{ scale: 1.3, color: "hsl(var(--primary))" }}
                      animate={{ scale: 1 }}
                      className="text-2xl font-bold font-display text-primary"
                    >
                      {roiParams.h}
                    </motion.span>
                  </div>
                  <Slider
                    value={[roiParams.h]}
                    onValueChange={([v]) => setROIParams({ ...roiParams, h: v })}
                    min={1}
                    max={40}
                    step={1}
                  />
                  <p className="text-xs text-muted-foreground">כמה שעות בשבוע מבוזבזות על תהליכים שבורים, ישיבות מיותרות, או עבודה כפולה?</p>
                </div>

                {/* C: עלות */}
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <label className="text-sm font-medium">C: עלות לשעה (₪)</label>
                    <motion.span
                      key={roiParams.c}
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                      className="text-2xl font-bold font-display text-primary"
                    >
                      ₪{roiParams.c}
                    </motion.span>
                  </div>
                  <Slider
                    value={[roiParams.c]}
                    onValueChange={([v]) => setROIParams({ ...roiParams, c: v })}
                    min={50}
                    max={1000}
                    step={10}
                  />
                  <p className="text-xs text-muted-foreground">עלות ממוצעת לשעת עובד כולל תקורה (שכר + הוצאות נלוות).</p>
                </div>

                {/* P: הסתברות */}
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <label className="text-sm font-medium">P: הסתברות הישנות</label>
                    <motion.span
                      key={roiParams.p}
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                      className="text-2xl font-bold font-display text-primary"
                    >
                      {(roiParams.p * 100).toFixed(0)}%
                    </motion.span>
                  </div>
                  <Slider
                    value={[roiParams.p * 100]}
                    onValueChange={([v]) => setROIParams({ ...roiParams, p: v / 100 })}
                    min={5}
                    max={95}
                    step={5}
                  />
                  <p className="text-xs text-muted-foreground">מה הסיכוי שהבעיות האלה יחזרו על עצמן בלי טיפול מבני?</p>
                </div>
              </CardContent>
            </Card>

            {/* Glass Box: נוסחה שקופה */}
            <Card className="glass border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-primary flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
                  Glass Box: נוסחה שקופה
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm font-mono" dir="ltr">
                <p className="text-muted-foreground">
                  ΔPotential = (H × C × 52) × (P + ai_risk_factor)
                </p>
                <p className="text-foreground">
                  ΔPotential = ({roiParams.h} × {roiParams.c} × 52) × ({roiParams.p.toFixed(2)} + {aiRiskFactor.toFixed(2)})
                </p>
                <motion.p
                  key={deltaPotential}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-primary pt-2"
                >
                  = ₪{deltaPotential.toLocaleString("he-IL", { maximumFractionDigits: 0 })}
                </motion.p>
                {aiRiskFactor > 0 && (
                  <p className="text-xs text-health-warning">
                    ⚠ ai_risk_factor מעודכן מתובנות ASA: +{aiRiskFactor.toFixed(2)}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <Card className="glass border-border/30 h-full">
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
          </motion.div>
        </div>

        {/* Dynamic CTA */}
        {annualLoss > 50000 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4 pt-4"
          >
            <motion.p
              key={annualLoss}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              className="text-lg md:text-xl font-display font-semibold text-foreground"
            >
              הארגון שלך מפסיד{" "}
              <span className="text-primary animate-pulse">
                ₪{annualLoss.toLocaleString("he-IL")}
              </span>{" "}
              בשנה. בוא נדבר.
            </motion.p>
            <a
              href={WHATSAPP_ROI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              שיחת אבחון חינם
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
