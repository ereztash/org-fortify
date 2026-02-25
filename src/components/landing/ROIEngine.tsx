import { useMemo, useState } from "react";
import { useCOR } from "@/contexts/CORContext";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { industryFactors, getSizeFactor } from "@/lib/industryFactors";
import { Share2, Mail, MessageCircle, Check, TrendingDown, TrendingUp, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_ROI_URL = "https://wa.me/972524545963?text=היי%20ארז%2C%20המחשבון%20הראה%20לי%20מספרים%20מעניינים";
const ENGAGEMENT_COST = 45000;

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  return (
    <motion.span
      key={Math.round(value)}
      initial={{ scale: 1.15, opacity: 0.7 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {prefix}{value.toLocaleString("he-IL", { maximumFractionDigits: 0 })}{suffix}
    </motion.span>
  );
}

function MetricCard({ icon: Icon, label, value, sublabel, color }: { icon: any; label: string; value: React.ReactNode; sublabel?: string; color: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border/20 bg-card/30 backdrop-blur-sm p-4 space-y-2">
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${color}`} />
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-medium">{label}</span>
        <Icon className={`h-4 w-4 ${color.replace('bg-', 'text-').replace('/80', '')}`} />
      </div>
      <div className="text-2xl md:text-3xl font-bold font-display text-foreground">
        {value}
      </div>
      {sublabel && <p className="text-[10px] text-muted-foreground">{sublabel}</p>}
    </div>
  );
}

function BarVisual({ label, value, maxValue, color }: { label: string; value: number; maxValue: number; color: string }) {
  const percentage = Math.min(100, (value / maxValue) * 100);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono font-bold text-foreground">₪<AnimatedNumber value={value} /></span>
      </div>
      <div className="h-3 rounded-full bg-muted/30 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}

export function ROIEngine() {
  const { roiParams, setROIParams, aiRiskFactor, deltaPotential, organizationSize, setOrganizationSize, industry, setIndustry } = useCOR();
  const [copied, setCopied] = useState(false);

  const annualLoss = roiParams.h * roiParams.c * 52;
  const potentialSaving = deltaPotential * 0.7;

  const paybackWeeks = useMemo(() => {
    if (deltaPotential <= 0) return Infinity;
    const weeklyRecovery = deltaPotential / 52;
    return Math.ceil(ENGAGEMENT_COST / weeklyRecovery);
  }, [deltaPotential]);

  const maxChartValue = Math.max(annualLoss, deltaPotential, potentialSaving);

  const severityLevel = annualLoss > 500000 ? "critical" : annualLoss > 200000 ? "high" : annualLoss > 100000 ? "moderate" : "low";

  const shareText = `דוח עלות אי-עשייה ארגונית:\n- אובדן שנתי: ₪${annualLoss.toLocaleString("he-IL")}\n- פוטנציאל חיסכון: ₪${deltaPotential.toLocaleString("he-IL", { maximumFractionDigits: 0 })}\n- החזר השקעה תוך ${paybackWeeks} שבועות\n\nלפרטים: ${window.location.origin}`;

  const handleShareEmail = () => {
    const subject = encodeURIComponent("דוח עלות אי-עשייה ארגונית");
    const body = encodeURIComponent(shareText);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };
  const handleShareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
  };
  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="roi-engine" className="py-24 px-4 md:px-6 scroll-mt-20 relative">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container max-w-5xl mx-auto space-y-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <p className="text-sm text-primary font-medium tracking-wider uppercase">Dynamic ROI Engine</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display">מחשבון עלות אי-עשייה</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            הזז את הסליידרים. בחר ענף וגודל ארגון. הנוסחה שקופה. התוצאה מתעדכנת בזמן אמת.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Controls — 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 space-y-5"
          >
            {/* Sliders Card */}
            <Card className="glass border-border/20 overflow-hidden">
              <div className="h-0.5 bg-gradient-to-r from-primary/60 via-primary to-primary/60" />
              <CardContent className="p-5 md:p-6 space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs text-muted-foreground font-medium">ענף</label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger className="bg-background/50 h-9 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(industryFactors).map(([key, { label, factor }]) => (
                          <SelectItem key={key} value={key}>
                            {label} (×{factor})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-muted-foreground font-medium">גודל ארגון (עובדים)</label>
                    <Input
                      type="number"
                      value={organizationSize}
                      onChange={(e) => setOrganizationSize(Math.max(1, parseInt(e.target.value) || 1))}
                      className="bg-background/50 h-9 text-sm"
                      min={1}
                      max={10000}
                    />
                  </div>
                </div>

                {/* H slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <label className="text-sm font-medium text-foreground">H: שעות אובדן שבועיות</label>
                    <span className="text-2xl font-bold font-display text-primary">
                      <AnimatedNumber value={roiParams.h} />
                    </span>
                  </div>
                  <Slider value={[roiParams.h]} onValueChange={([v]) => setROIParams({ ...roiParams, h: v })} min={1} max={40} step={1} />
                  <p className="text-[11px] text-muted-foreground">כמה שעות בשבוע מבוזבזות על תהליכים שבורים?</p>
                </div>

                {/* C slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <label className="text-sm font-medium text-foreground">C: עלות לשעה (₪)</label>
                    <span className="text-2xl font-bold font-display text-primary">
                      ₪<AnimatedNumber value={roiParams.c} />
                    </span>
                  </div>
                  <Slider value={[roiParams.c]} onValueChange={([v]) => setROIParams({ ...roiParams, c: v })} min={50} max={1000} step={10} />
                </div>

                {/* P slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <label className="text-sm font-medium text-foreground">P: הסתברות הישנות</label>
                    <span className="text-2xl font-bold font-display text-primary">
                      <AnimatedNumber value={roiParams.p * 100} suffix="%" />
                    </span>
                  </div>
                  <Slider value={[roiParams.p * 100]} onValueChange={([v]) => setROIParams({ ...roiParams, p: v / 100 })} min={5} max={95} step={5} />
                </div>
              </CardContent>
            </Card>

            {/* Glass Box Formula */}
            <Card className="glass border-primary/15 overflow-hidden">
              <div className="h-0.5 bg-primary/40" />
              <CardContent className="p-4 md:p-5 space-y-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-primary font-semibold tracking-wide">Glass Box: נוסחה שקופה</span>
                </div>
                <div className="font-mono text-xs md:text-sm space-y-1" dir="ltr">
                  <p className="text-muted-foreground">
                    ΔP = (H × C × 52) × (P + ai_risk) × sizeFactor × industryFactor
                  </p>
                  <p className="text-foreground/80">
                    ΔP = ({roiParams.h} × {roiParams.c} × 52) × ({roiParams.p.toFixed(2)} + {aiRiskFactor.toFixed(2)}) × {getSizeFactor(organizationSize)} × {industryFactors[industry]?.factor ?? 1.0}
                  </p>
                </div>
                <motion.p
                  key={deltaPotential}
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  className="text-2xl md:text-3xl font-bold text-primary pt-1 font-display"
                  dir="ltr"
                >
                  = ₪{deltaPotential.toLocaleString("he-IL", { maximumFractionDigits: 0 })}
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results — 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Metric cards grid */}
            <div className="grid grid-cols-2 gap-3">
              <MetricCard
                icon={TrendingDown}
                label="אובדן שנתי"
                value={<span className="text-destructive">₪<AnimatedNumber value={annualLoss} /></span>}
                color="bg-destructive/80"
              />
              <MetricCard
                icon={TrendingUp}
                label="פוטנציאל חיסכון"
                value={<span className="text-emerald-400">₪<AnimatedNumber value={Math.round(potentialSaving)} /></span>}
                color="bg-emerald-500/80"
              />
              <MetricCard
                icon={Clock}
                label="החזר השקעה"
                value={paybackWeeks === Infinity ? "∞" : `${paybackWeeks} שבועות`}
                sublabel="על בסיס ספרינט 14 יום"
                color="bg-primary/80"
              />
              <MetricCard
                icon={AlertTriangle}
                label="רמת חומרה"
                value={
                  <span className={
                    severityLevel === "critical" ? "text-destructive" :
                    severityLevel === "high" ? "text-orange-400" :
                    severityLevel === "moderate" ? "text-yellow-400" :
                    "text-muted-foreground"
                  }>
                    {severityLevel === "critical" ? "קריטי" :
                     severityLevel === "high" ? "גבוה" :
                     severityLevel === "moderate" ? "בינוני" : "נמוך"}
                  </span>
                }
                color={
                  severityLevel === "critical" ? "bg-destructive/80" :
                  severityLevel === "high" ? "bg-orange-500/80" :
                  "bg-yellow-500/80"
                }
              />
            </div>

            {/* Visual Bars */}
            <Card className="glass border-border/20">
              <CardContent className="p-4 md:p-5 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">השוואה חזותית</p>
                <BarVisual
                  label="עלות אי-עשייה שנתית"
                  value={annualLoss}
                  maxValue={maxChartValue}
                  color="bg-destructive/80"
                />
                <BarVisual
                  label="ΔPotential (כולל מקדמים)"
                  value={Math.round(deltaPotential)}
                  maxValue={maxChartValue}
                  color="bg-amber-500/80"
                />
                <BarVisual
                  label="חיסכון פוטנציאלי (70%)"
                  value={Math.round(potentialSaving)}
                  maxValue={maxChartValue}
                  color="bg-emerald-500/80"
                />
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
              key={deltaPotential}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              className="text-lg md:text-xl font-display font-semibold text-foreground"
            >
              הארגון שלך מפסיד{" "}
              <span className="text-primary">₪{deltaPotential.toLocaleString("he-IL", { maximumFractionDigits: 0 })}</span>{" "}
              בשנה. בוא נדבר.
            </motion.p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={WHATSAPP_ROI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              >
                שיחת אבחון חינם
              </a>
            </div>

            <div className="pt-2 space-y-2">
              <p className="text-sm text-muted-foreground">רוצה לשתף את הממצאים עם ההנהלה?</p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button variant="outline" size="sm" onClick={handleShareEmail} className="gap-2">
                  <Mail className="h-4 w-4" />
                  שלח במייל
                </Button>
                <Button variant="outline" size="sm" onClick={handleShareWhatsApp} className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  שלח בוואטסאפ
                </Button>
                <Button variant="outline" size="sm" onClick={handleCopyLink} className="gap-2">
                  {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                  {copied ? "הועתק" : "העתק טקסט"}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
