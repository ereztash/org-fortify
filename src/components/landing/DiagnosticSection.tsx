import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Activity,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  Clock,
  DollarSign,
  Brain,
  Share2,
  Check,
  Mail,
  CalendarDays,
} from "lucide-react";
import {
  DIAGNOSTIC_QUESTIONS,
  RESOURCE_LABELS,
  RESOURCE_COLORS,
  DiagnosticAnswers,
  ResourceType,
} from "@/lib/diagnosticQuestions";
import {
  computeDiagnosticResult,
  computeResourceScore,
  isDiagnosticComplete,
  getDiagnosticProgress,
  getDynamicCTA,
  buildMirrorSentence,
  buildShareCliffhanger,
  buildShareUrl,
  decodeDiagnosticFromHash,
  DiagnosticResult,
  ResourceScore,
} from "@/lib/diagnosticScoring";

// ── Resource icons ──────────────────────────────────────────────────────────
const RESOURCE_ICONS: Record<ResourceType, typeof Clock> = {
  time: Clock,
  money: DollarSign,
  attention: Brain,
};

// Question indices where each resource block ends (0-indexed)
const RESOURCE_BLOCK_ENDS: Record<number, ResourceType> = {
  2: "time",      // after q3
  5: "money",     // after q6
  8: "attention", // after q9 → goes to computing phase instead
};

// ── Typewriter Effect Hook ────────────────────────────────────────────────────
function useTypewriter(text: string, active: boolean, speed = 22): string {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active || !text) { setDisplayed(""); return; }
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, active, speed]);
  return displayed;
}

// ── SVG Circular Progress Meter ─────────────────────────────────────────────
function ResourceMeter({
  score,
  delayMs,
  animate,
  isDominant = false,
}: {
  score: ResourceScore;
  delayMs: number;
  animate: boolean;
  isDominant?: boolean;
}) {
  const circumference = 2 * Math.PI * 50;
  const dashOffset = circumference - (score.leakScore / 100) * circumference;
  const Icon = RESOURCE_ICONS[score.resource];
  const strokeW = isDominant ? 11 : 9;
  const glowStrength = isDominant ? `drop-shadow(0 0 10px ${score.color}cc) drop-shadow(0 0 20px ${score.color}55)` : `drop-shadow(0 0 5px ${score.color}70)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delayMs / 1000 }}
      className="flex flex-col items-center gap-3"
    >
      {/* Ring outer glow for dominant */}
      <div className={`relative ${isDominant ? "w-36 h-36 md:w-40 md:h-40" : "w-24 h-24 md:w-28 md:h-28"}`}>
        {isDominant && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: `0 0 28px 4px ${score.color}35, 0 0 56px 8px ${score.color}18` }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(215 25% 15%)" strokeWidth={strokeW} />
          <circle
            cx="60" cy="60" r="50" fill="none"
            stroke={score.color} strokeWidth={strokeW} strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animate ? dashOffset : circumference}
            style={{
              transition: `stroke-dashoffset 1.4s ease ${delayMs}ms`,
              filter: glowStrength,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`font-bold font-display ${isDominant ? "text-3xl" : "text-xl"}`}
            style={{ color: score.color, textShadow: isDominant ? `0 0 20px ${score.color}80` : "none" }}
          >
            {score.leakScore}%
          </span>
          <span className="text-[10px] text-muted-foreground mt-0.5">דליפה</span>
        </div>
      </div>
      <div className="text-center space-y-1">
        <div className="flex items-center justify-center gap-1.5">
          <Icon className={isDominant ? "h-4 w-4" : "h-3.5 w-3.5"} style={{ color: score.color }} />
          <span className={`font-semibold text-foreground ${isDominant ? "text-base" : "text-sm"}`}>
            {RESOURCE_LABELS[score.resource]}
          </span>
          {isDominant && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ color: score.color, background: `${score.color}20`, border: `1px solid ${score.color}40` }}>
              ↑ מוביל
            </span>
          )}
        </div>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{ color: score.color, background: `${score.color}18`, border: `1px solid ${score.color}30` }}
        >
          {score.label}
        </span>
      </div>
    </motion.div>
  );
}

// ── Micro-Revelation Interstitial ────────────────────────────────────────────
// Shows a brief flash of the resource score after completing each 3-question block.
// Creates curiosity: "wait, my time leak is THAT high? What about attention?"
function MicroRevelation({
  resource,
  score,
  onContinue,
}: {
  resource: ResourceType;
  score: ResourceScore;
  onContinue: () => void;
}) {
  const Icon = RESOURCE_ICONS[resource];
  const color = RESOURCE_COLORS[resource];
  const nextResource: Record<ResourceType, string> = {
    time: "עכשיו — כסף",
    money: "עכשיו — קשב",
    attention: "",
  };

  useEffect(() => {
    const t = setTimeout(onContinue, 3200);
    return () => clearTimeout(t);
  }, [onContinue]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-5 py-6"
    >
      {/* Mini meter */}
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(215 25% 15%)" strokeWidth="10" />
          <motion.circle
            cx="60" cy="60" r="50" fill="none"
            stroke={score.color} strokeWidth="10" strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 50}
            initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
            animate={{ strokeDashoffset: (2 * Math.PI * 50) - (score.leakScore / 100) * (2 * Math.PI * 50) }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            style={{ filter: `drop-shadow(0 0 8px ${score.color}80)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl font-bold font-display"
            style={{ color: score.color }}
          >
            {score.leakScore}%
          </motion.span>
        </div>
      </div>

      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Icon className="h-4 w-4" style={{ color }} />
          <span className="text-sm font-semibold" style={{ color }}>
            דליפת {RESOURCE_LABELS[resource]}
          </span>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-xs text-muted-foreground"
        >
          {score.leakScore >= 50 ? "זה גבוה." : score.leakScore >= 25 ? "יש מקום לשיפור." : "נראה טוב."}
          {nextResource[resource] && <span className="text-foreground font-medium"> {nextResource[resource]}.</span>}
        </motion.p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2">
        {(["time", "money", "attention"] as ResourceType[]).map((r) => (
          <div
            key={r}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: r === resource ? RESOURCE_COLORS[r] : "hsl(215 25% 15%)",
              boxShadow: r === resource ? `0 0 8px ${RESOURCE_COLORS[r]}60` : "none",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ── Computing Animation (Pre-Revelation Tension) ─────────────────────────────
// The narrative "pause before the twist" — builds anticipation.
function ComputingPhase({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const steps = [
    "מנתח דפוסי זמן...",
    "חושב תדירות דליפות כספיות...",
    "ממפה עומס קשב...",
    "מחשב System Health Index...",
  ];

  useEffect(() => {
    const intervals = [800, 1600, 2400, 3400];
    const timers = intervals.map((ms, i) =>
      setTimeout(() => {
        if (i < steps.length) setStep(i + 1);
      }, ms)
    );
    const done = setTimeout(onDone, 4000);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-8 py-12"
    >
      {/* Orbiting icons */}
      <div className="relative w-32 h-32">
        {(["time", "money", "attention"] as ResourceType[]).map((r, i) => {
          const Icon = RESOURCE_ICONS[r];
          const color = RESOURCE_COLORS[r];
          const angle = (i * 120) - 90;
          return (
            <motion.div
              key={r}
              className="absolute w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: `${color}20`, border: `1px solid ${color}40`, top: "50%", left: "50%", marginTop: -20, marginLeft: -20 }}
              animate={{
                x: [Math.cos((angle * Math.PI) / 180) * 44, Math.cos(((angle + 360) * Math.PI) / 180) * 44],
                y: [Math.sin((angle * Math.PI) / 180) * 44, Math.sin(((angle + 360) * Math.PI) / 180) * 44],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Icon className="h-4 w-4" style={{ color }} />
            </motion.div>
          );
        })}
        {/* EKG bars — diagnostic aesthetic, perceived value */}
        <div className="absolute inset-0 flex items-center justify-center gap-[3px]">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-[3px] rounded-full bg-primary/75"
              animate={{ height: ["6px", "26px", "10px", "20px", "6px"] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.13, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>

      {/* Step labels */}
      <div className="space-y-2 text-center min-h-[60px]">
        <AnimatePresence mode="wait">
          {steps.slice(0, step).map((s, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: i === step - 1 ? 1 : 0.4, y: 0 }}
              className="text-xs text-muted-foreground"
            >
              {s}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── Question Card ────────────────────────────────────────────────────────────
function QuestionCard({
  question,
  currentValue,
  onSelect,
  onNext,
}: {
  question: (typeof DIAGNOSTIC_QUESTIONS)[0];
  currentValue: number | undefined;
  onSelect: (value: number) => void;
  onNext: () => void;
}) {
  const Icon = RESOURCE_ICONS[question.resource];
  const resourceColor = RESOURCE_COLORS[question.resource];

  const handleMCQSelect = (value: number) => {
    onSelect(value);
    setTimeout(() => onNext(), 340);
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div
        className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
        style={{ color: resourceColor, background: `${resourceColor}15`, border: `1px solid ${resourceColor}30` }}
      >
        <Icon className="h-3.5 w-3.5" />
        {RESOURCE_LABELS[question.resource]}
      </div>

      <div className="space-y-2">
        <h3 className="text-xl md:text-2xl font-bold font-display text-foreground leading-snug">
          {question.text}
        </h3>
        {question.subtext && (
          <p className="text-sm text-muted-foreground">{question.subtext}</p>
        )}
      </div>

      {question.format === "mcq" && question.options && (
        <div className="space-y-2.5">
          {question.options.map((opt) => {
            const isSelected = currentValue === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => handleMCQSelect(opt.value)}
                className={`w-full text-right px-4 py-3.5 rounded-xl border text-sm font-medium transition-all duration-200
                  ${isSelected
                    ? "border-primary/60 bg-primary/10 text-foreground scale-[1.01]"
                    : "border-border/30 bg-card/30 text-muted-foreground hover:border-border/60 hover:bg-card/50 hover:text-foreground"
                  }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}

      {question.format === "slider" && question.sliderLabels && (
        <div className="space-y-6">
          <div className="space-y-4">
            <Slider
              dir="rtl"
              value={[currentValue ?? 3]}
              onValueChange={([v]) => onSelect(v)}
              min={1} max={5} step={1}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{question.sliderLabels.high}</span>
              <span>{question.sliderLabels.low}</span>
            </div>
          </div>

          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                onClick={() => onSelect(v)}
                className={`w-8 h-8 rounded-full text-xs font-bold border transition-all duration-200
                  ${currentValue === v
                    ? "border-primary bg-primary/20 text-primary scale-110"
                    : "border-border/30 text-muted-foreground hover:border-border/60"
                  }`}
              >
                {v}
              </button>
            ))}
          </div>

          <Button onClick={onNext} disabled={currentValue === undefined} className="w-full gap-2">
            המשך
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      )}
    </motion.div>
  );
}

// ── Revelation Phase ─────────────────────────────────────────────────────────
function RevelationPhase({
  result,
  answers,
  isViewingShared,
  isReturningVisitor,
  onRestart,
}: {
  result: DiagnosticResult;
  answers: DiagnosticAnswers;
  isViewingShared: boolean;
  isReturningVisitor: boolean;
  onRestart: () => void;
}) {
  const [metersAnimated, setMetersAnimated] = useState(false);
  const [showMirror, setShowMirror] = useState(false);
  const [copied, setCopied] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(() => {
    try { return !!localStorage.getItem("cor-sys-email"); } catch { return false; }
  });

  const cta = getDynamicCTA(result);
  const mirrorSentence = buildMirrorSentence(answers, result.dominantLeak);
  const typedMirror = useTypewriter(mirrorSentence, showMirror);

  useEffect(() => {
    const t1 = setTimeout(() => setMetersAnimated(true), 100);
    // HOLD 0.8s after health index appears (delay 1.6s) → mirror at 2.4s
    const t2 = setTimeout(() => setShowMirror(true), 2400);
    // Auto-scroll to CTA when it appears so user never misses it
    const t3 = setTimeout(() => {
      ctaRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 2700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const dominantLabel = RESOURCE_LABELS[result.dominantLeak];
  const dominantScore = result[result.dominantLeak];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      localStorage.setItem("cor-sys-email", JSON.stringify({
        email: email.trim(),
        healthIndex: result.healthIndex,
        dominantLeak: result.dominantLeak,
        leakScore: result[result.dominantLeak].leakScore,
        ts: Date.now(),
      }));
    } catch { /* ignore */ }
    setEmailSubmitted(true);
  };

  const handleShare = async () => {
    const shareUrl = buildShareUrl(answers);
    const text = buildShareCliffhanger(result, shareUrl);
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      await navigator.clipboard.writeText(text);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-10"
    >
      {/* Returning visitor banner — secondary immune response */}
      {isReturningVisitor && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 flex items-center justify-between gap-3"
        >
          <p className="text-sm text-foreground/80 leading-snug">
            <span className="font-semibold text-primary">חזרת.</span>{" "}
            ה-Health Index שלך עדיין:{" "}
            <span className="font-bold" style={{ color: result.healthColor }}>{result.healthIndex}/100</span>.{" "}
            הדברים שזיהינו לא נעלמו.
          </p>
          <button
            onClick={onRestart}
            className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg border border-border/40 text-muted-foreground hover:text-foreground transition-colors"
          >
            עשה מחדש
          </button>
        </motion.div>
      )}

      {/* Shared-viewer banner */}
      {isViewingShared && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl border border-[hsl(38_92%_50%/0.3)] bg-[hsl(38_92%_50%/0.06)] px-4 py-3 flex items-center justify-between gap-3"
        >
          <p className="text-sm text-foreground/80 leading-snug">
            <span className="font-semibold text-[hsl(38_92%_50%)]">מישהו שיתף אותך</span> באבחון שלו.{" "}
            רוצה לראות איפה <span className="font-medium">אתה</span> עומד?
          </p>
          <button
            onClick={onRestart}
            className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            עשה את האבחון שלי
          </button>
        </motion.div>
      )}

      {/* Header */}
      <div className="text-center space-y-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium bg-primary/10 text-primary border border-primary/20"
        >
          <Activity className="h-3.5 w-3.5" />
          אבחון המשאבים הושלם
        </motion.div>
        <h3 className="text-2xl md:text-3xl font-bold font-display text-foreground">
          מפת הדליפות שלך
        </h3>
      </div>

      {/* Three meters — ordered best→worst (peak-end rule) */}
      <div className="flex justify-center gap-8 md:gap-14">
        {result.revealOrder.map((r, i) => (
          <ResourceMeter
            key={r}
            score={result[r]}
            delayMs={i * 500}
            animate={metersAnimated}
            isDominant={r === result.dominantLeak}
          />
        ))}
      </div>

      {/* System Health Index */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6 }}
        className="rounded-2xl p-6 text-center space-y-3 border"
        style={{
          background: `linear-gradient(135deg, hsl(222 47% 7% / 0.95), ${result.healthColor}10)`,
          borderColor: `${result.healthColor}30`,
          boxShadow: `0 8px 32px -8px ${result.healthColor}25, inset 0 1px 0 ${result.healthColor}15`,
        }}
      >
        <p className="text-xs text-muted-foreground font-medium tracking-widest uppercase">
          System Health Index
        </p>
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150, delay: 1.8 }}
          className="text-6xl md:text-7xl font-bold font-display"
          style={{
            color: result.healthColor,
            textShadow: `0 0 40px ${result.healthColor}70, 0 0 80px ${result.healthColor}35`,
          }}
        >
          {result.healthIndex}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0 }}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold"
          style={{ color: result.healthColor, background: `${result.healthColor}15`, border: `1px solid ${result.healthColor}40` }}
        >
          {result.healthLabel}
        </motion.div>
      </motion.div>

      {/* Mirror sentence — anagnorisis */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="space-y-3"
      >
        <div className="glass rounded-xl p-5 border border-border/20 space-y-3">
          <p className="text-sm font-semibold text-foreground">
            הדליפה הגדולה ביותר שלך:{" "}
            <span style={{ color: RESOURCE_COLORS[result.dominantLeak] }}>
              {dominantLabel} — {dominantScore.leakScore}%
            </span>
          </p>

          {/* Mirror: reflect the user's own answers back — staged anagnorisis */}
          <AnimatePresence>
            {showMirror && mirrorSentence && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-base font-medium text-foreground/90 leading-relaxed border-r-[3px] pr-4 min-h-[1.5rem]"
                style={{ borderColor: RESOURCE_COLORS[result.dominantLeak] }}
              >
                {typedMirror}
              </motion.p>
            )}
          </AnimatePresence>

          <p className="text-sm text-muted-foreground">
            תרגום לזמן: ~
            <span className="text-foreground font-bold">{result.weeklyDragHours} שעות בשבוע</span>{" "}
            של גרירה בלתי נראית
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          המספרים האלה לא היו מדידים — עד עכשיו.
        </p>
      </motion.div>

      {/* Primary CTA — Calendly first, visible immediately after aha moment */}
      <motion.div
        ref={ctaRef}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
        className="space-y-3"
      >
        {/* Mentor message */}
        <p className="text-center text-sm text-foreground font-medium leading-relaxed">
          {cta.text}
        </p>

        <p className="text-center text-xs text-muted-foreground/60 italic">
          הבהירות שאתה מרגיש עכשיו — היא אמיתית. היא גם דועכת.
        </p>

        <div className="relative">
          {/* Pulse ring — draws attention to primary CTA */}
          <motion.div
            className="absolute -inset-1 rounded-xl bg-primary/20"
            animate={{ scale: [1, 1.06], opacity: [0.5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute -inset-1 rounded-xl bg-primary/10"
            animate={{ scale: [1, 1.1], opacity: [0.3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
          />
          <a
            href="https://calendly.com/erez2812345/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center gap-3 w-full px-6 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/30 glow-primary"
          >
            <CalendarDays className="h-5 w-5" />
            קבע שיחת 30 דקות, חינם
          </a>
        </div>

        <a
          href={cta.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full px-6 py-3 rounded-xl border border-border/40 text-foreground text-sm font-medium hover:border-primary/40 hover:bg-primary/5 transition-all"
        >
          <MessageCircle className="h-4 w-4" />
          או שלח הודעה בוואטסאפ
        </a>
      </motion.div>

      {/* Secondary: Email capture + Share — below the fold intentionally */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.0 }}
        className="space-y-3 pt-2 border-t border-border/20"
      >
        {emailSubmitted ? (
          <div className="flex items-center justify-center gap-2 py-2 text-xs text-primary/70 font-medium">
            <Check className="h-3.5 w-3.5" />
            שלחנו לך את הניתוח המלא
          </div>
        ) : (
          <form onSubmit={handleEmailSubmit} className="space-y-2">
            <p className="text-xs text-muted-foreground text-center">
              רוצה לקבל את האבחון המלא עם המלצות ספציפיות לדליפה שלך?
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="המייל שלך"
                required
                dir="ltr"
                className="flex-1 min-w-0 rounded-xl border border-border/40 bg-card/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:bg-card/60 transition-all"
              />
              <button
                type="submit"
                className="shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl bg-primary/15 border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/25 transition-colors"
              >
                <Mail className="h-4 w-4" />
                שלח
              </button>
            </div>
          </form>
        )}

        {/* Share as cliffhanger */}
        <Button variant="ghost" className="w-full gap-2 text-muted-foreground text-xs" onClick={handleShare}>
          {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
          {copied ? "הועתק!" : "הדליפה שלי היא ב... — שתף אתגר"}
        </Button>
      </motion.div>
    </motion.div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
type Phase = "intro" | "questions" | "micro-reveal" | "computing" | "result";

export function DiagnosticSection() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<DiagnosticAnswers>({});
  const [microRevealResource, setMicroRevealResource] = useState<ResourceType | null>(null);
  const [isViewingShared, setIsViewingShared] = useState(false);
  const [isReturningVisitor, setIsReturningVisitor] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // On mount: check for shared result in URL hash, else restore partial progress
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash.includes("d=")) {
      const decoded = decodeDiagnosticFromHash(window.location.hash);
      if (decoded) {
        setAnswers(decoded);
        setPhase("result");
        setIsViewingShared(true);
        setTimeout(() => {
          sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
        return;
      }
    }
    // No shared hash — restore partial progress from localStorage
    try {
      const saved = localStorage.getItem("cor-sys-diagnostic");
      if (saved) {
        const parsed = JSON.parse(saved);
        setAnswers(parsed);
        // Secondary immune response: returning visitor with complete diagnostic → jump to result
        if (isDiagnosticComplete(parsed)) {
          setPhase("result");
          setIsReturningVisitor(true);
          setTimeout(() => {
            sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 300);
        }
      }
    } catch { /* ignore */ }
  }, []);

  const result = useMemo<DiagnosticResult | null>(() => {
    if (!isDiagnosticComplete(answers)) return null;
    return computeDiagnosticResult(answers);
  }, [answers]);

  const progress = getDiagnosticProgress(answers);
  const currentQuestion = DIAGNOSTIC_QUESTIONS[currentIndex];

  const handleAnswer = (value: number) => {
    const updated = { ...answers, [currentQuestion.id]: value };
    setAnswers(updated);
    try { localStorage.setItem("cor-sys-diagnostic", JSON.stringify(updated)); } catch { /* ignore */ }
  };

  const handleNext = useCallback(() => {
    const nextIndex = currentIndex + 1;

    // Check if we just finished a resource block (after q3 or q6)
    const blockResource = RESOURCE_BLOCK_ENDS[currentIndex];
    if (blockResource && blockResource !== "attention" && nextIndex < DIAGNOSTIC_QUESTIONS.length) {
      // Show micro-revelation for completed resource
      setMicroRevealResource(blockResource);
      setPhase("micro-reveal");
      return;
    }

    if (nextIndex < DIAGNOSTIC_QUESTIONS.length) {
      setCurrentIndex(nextIndex);
    } else {
      // All 9 done → computing animation → result
      setPhase("computing");
    }
  }, [currentIndex]);

  const handleMicroRevealDone = useCallback(() => {
    setMicroRevealResource(null);
    setPhase("questions");
    setCurrentIndex((i) => i + 1);
  }, []);

  const handleComputingDone = useCallback(() => {
    setPhase("result");
    // Write shareable hash to URL (no page reload)
    try {
      const encoded = btoa(
        ["q1","q2","q3","q4","q5","q6","q7","q8","q9"]
          .map((id) => String(answers[id] ?? "0"))
          .join("")
      );
      history.replaceState(null, "", `${window.location.pathname}#d=${encoded}`);
    } catch { /* ignore */ }
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, [answers]);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
    else setPhase("intro");
  };

  const handleStart = () => {
    setPhase("questions");
    setCurrentIndex(0);
  };

  const handleReset = () => {
    setPhase("intro");
    setCurrentIndex(0);
    setAnswers({});
    setMicroRevealResource(null);
    setIsViewingShared(false);
    setIsReturningVisitor(false);
    localStorage.removeItem("cor-sys-diagnostic");
    try { history.replaceState(null, "", window.location.pathname); } catch { /* ignore */ }
  };

  // Compute partial score for micro-revelation
  const microRevealScore = useMemo(() => {
    if (!microRevealResource) return null;
    return computeResourceScore(microRevealResource, answers);
  }, [microRevealResource, answers]);

  return (
    <section
      id="diagnostic-section"
      ref={sectionRef}
      className="py-24 px-4 md:px-6 scroll-mt-20 relative section-divider"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] bg-[hsl(38_92%_50%/0.04)]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full blur-[100px] bg-primary/[0.04]" />
      </div>

      <div className="container max-w-2xl mx-auto relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium bg-[hsl(38_92%_50%/0.1)] text-[hsl(38_92%_50%)] border border-[hsl(38_92%_50%/0.2)]">
            <Activity className="h-3.5 w-3.5" />
            System Resource Diagnostics
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display">
            מה שאתה לא מודד{" "}
            <span className="gradient-text-warm">גוזל ממך</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            9 שאלות. 3 דקות. תמונה ברורה של איפה זמן, כסף וקשב מאבדים ערך בצורה שאי אפשר
            לראות ברגיל.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-2xl border border-border/20 overflow-hidden"
        >
          {/* Progress bar */}
          {(phase === "questions" || phase === "micro-reveal") && (
            <div className="h-1 bg-muted/30">
              <motion.div
                className="h-full bg-gradient-to-r from-primary/80 via-primary to-[hsl(38_92%_50%)]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {/* ── INTRO ── */}
              {phase === "intro" && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="flex justify-center gap-6">
                    {(["time", "money", "attention"] as ResourceType[]).map((r) => {
                      const Icon = RESOURCE_ICONS[r];
                      const color = RESOURCE_COLORS[r];
                      return (
                        <div key={r} className="flex flex-col items-center gap-2">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                          >
                            <Icon className="h-5 w-5" style={{ color }} />
                          </div>
                          <span className="text-xs text-muted-foreground font-medium">{RESOURCE_LABELS[r]}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-3 text-center">
                    <p className="text-foreground font-medium leading-relaxed">
                      כל מערכת — ארגון, צוות, עסק עצמאי — פועלת על שלושה משאבים בלבד.
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      הבעיה: רוב הדליפות הן בלתי נראות. לא כי הן לא קיימות — אלא כי אף אחד לא מדד אותן.
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      האבחון הזה עושה בדיוק את זה.
                    </p>
                  </div>

                  <Button
                    size="lg"
                    onClick={handleStart}
                    className="w-full gap-2 text-base py-6 shadow-lg shadow-primary/20 hover:shadow-primary/35 transition-all hover:scale-[1.02]"
                  >
                    התחל את האבחון
                    <ChevronLeft className="h-5 w-5" />
                  </Button>

                  <p className="text-center text-xs text-muted-foreground/70">
                    9 שאלות · אנונימי לחלוטין · ללא הרשמה
                  </p>
                </motion.div>
              )}

              {/* ── QUESTIONS ── */}
              {phase === "questions" && currentQuestion && (
                <motion.div
                  key="questions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>שאלה {currentIndex + 1} מתוך {DIAGNOSTIC_QUESTIONS.length}</span>
                    <span className="font-medium" style={{ color: RESOURCE_COLORS[currentQuestion.resource] }}>
                      {RESOURCE_LABELS[currentQuestion.resource]}
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    <QuestionCard
                      key={currentQuestion.id}
                      question={currentQuestion}
                      currentValue={answers[currentQuestion.id]}
                      onSelect={handleAnswer}
                      onNext={handleNext}
                    />
                  </AnimatePresence>

                  <div className="flex justify-between items-center pt-2">
                    <Button variant="ghost" size="sm" onClick={handlePrev} className="gap-1.5 text-muted-foreground hover:text-foreground">
                      <ChevronRight className="h-4 w-4" />
                      חזור
                    </Button>
                    {currentQuestion.format === "mcq" && (
                      <Button
                        variant="ghost" size="sm"
                        disabled={answers[currentQuestion.id] === undefined}
                        onClick={handleNext}
                        className="gap-1.5 text-muted-foreground hover:text-foreground"
                      >
                        דלג
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              )}

              {/* ── MICRO-REVELATION ── */}
              {phase === "micro-reveal" && microRevealResource && microRevealScore && (
                <MicroRevelation
                  key={`micro-${microRevealResource}`}
                  resource={microRevealResource}
                  score={microRevealScore}
                  onContinue={handleMicroRevealDone}
                />
              )}

              {/* ── COMPUTING (tension builder) ── */}
              {phase === "computing" && (
                <ComputingPhase key="computing" onDone={handleComputingDone} />
              )}

              {/* ── RESULT ── */}
              {phase === "result" && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <RevelationPhase result={result} answers={answers} isViewingShared={isViewingShared} isReturningVisitor={isReturningVisitor} onRestart={handleReset} />
                  <button
                    onClick={handleReset}
                    className="mt-6 w-full text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                  >
                    אפס ועשה שוב
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
