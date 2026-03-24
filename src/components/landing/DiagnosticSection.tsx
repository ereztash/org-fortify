import { useState, useMemo, useEffect, useRef } from "react";
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
  isDiagnosticComplete,
  getDiagnosticProgress,
  buildWhatsAppMessage,
  DiagnosticResult,
  ResourceScore,
} from "@/lib/diagnosticScoring";

// ── Resource icons ──────────────────────────────────────────────────────────
const RESOURCE_ICONS: Record<ResourceType, typeof Clock> = {
  time: Clock,
  money: DollarSign,
  attention: Brain,
};

// ── SVG Circular Progress Meter ─────────────────────────────────────────────
function ResourceMeter({
  score,
  delayMs,
  animate,
}: {
  score: ResourceScore;
  delayMs: number;
  animate: boolean;
}) {
  const circumference = 2 * Math.PI * 50; // r=50 → ≈314.16
  const dashOffset = circumference - (score.leakScore / 100) * circumference;
  const Icon = RESOURCE_ICONS[score.resource];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-28 h-28 md:w-32 md:h-32">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          {/* Track */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="hsl(215 25% 15%)"
            strokeWidth="10"
          />
          {/* Fill */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke={score.color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animate ? dashOffset : circumference}
            style={{
              transition: `stroke-dashoffset 1.4s ease ${delayMs}ms`,
              filter: `drop-shadow(0 0 6px ${score.color}80)`,
            }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold font-display" style={{ color: score.color }}>
            {score.leakScore}%
          </span>
          <span className="text-[10px] text-muted-foreground">דליפה</span>
        </div>
      </div>

      {/* Label */}
      <div className="text-center space-y-1">
        <div className="flex items-center justify-center gap-1.5">
          <Icon className="h-3.5 w-3.5" style={{ color: score.color }} />
          <span className="text-sm font-semibold text-foreground">
            {RESOURCE_LABELS[score.resource]}
          </span>
        </div>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{
            color: score.color,
            background: `${score.color}18`,
            border: `1px solid ${score.color}30`,
          }}
        >
          {score.label}
        </span>
      </div>
    </div>
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
      {/* Resource badge */}
      <div
        className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
        style={{
          color: resourceColor,
          background: `${resourceColor}15`,
          border: `1px solid ${resourceColor}30`,
        }}
      >
        <Icon className="h-3.5 w-3.5" />
        {RESOURCE_LABELS[question.resource]}
      </div>

      {/* Question text */}
      <div className="space-y-2">
        <h3 className="text-xl md:text-2xl font-bold font-display text-foreground leading-snug">
          {question.text}
        </h3>
        {question.subtext && (
          <p className="text-sm text-muted-foreground">{question.subtext}</p>
        )}
      </div>

      {/* MCQ */}
      {question.format === "mcq" && question.options && (
        <div className="space-y-2.5">
          {question.options.map((opt) => {
            const isSelected = currentValue === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => handleMCQSelect(opt.value)}
                className={`w-full text-right px-4 py-3.5 rounded-xl border text-sm font-medium transition-all duration-200
                  ${
                    isSelected
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

      {/* Slider */}
      {question.format === "slider" && question.sliderLabels && (
        <div className="space-y-6">
          <div className="space-y-4">
            <Slider
              dir="rtl"
              value={[currentValue ?? 3]}
              onValueChange={([v]) => onSelect(v)}
              min={1}
              max={5}
              step={1}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{question.sliderLabels.high}</span>
              <span>{question.sliderLabels.low}</span>
            </div>
          </div>

          {/* Value indicator */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                onClick={() => onSelect(v)}
                className={`w-8 h-8 rounded-full text-xs font-bold border transition-all duration-200
                  ${
                    currentValue === v
                      ? "border-primary bg-primary/20 text-primary scale-110"
                      : "border-border/30 text-muted-foreground hover:border-border/60"
                  }`}
              >
                {v}
              </button>
            ))}
          </div>

          <Button
            onClick={onNext}
            disabled={currentValue === undefined}
            className="w-full gap-2"
          >
            המשך
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      )}
    </motion.div>
  );
}

// ── Revelation Phase ─────────────────────────────────────────────────────────
function RevelationPhase({ result }: { result: DiagnosticResult }) {
  const [metersAnimated, setMetersAnimated] = useState(false);
  const [copied, setCopied] = useState(false);
  const waUrl = buildWhatsAppMessage(result);

  useEffect(() => {
    const t = setTimeout(() => setMetersAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  const dominantLabel = RESOURCE_LABELS[result.dominantLeak];
  const dominantScore = result[result.dominantLeak];

  const handleCopyResult = async () => {
    const text = `ציון יציבות מערכת: ${result.healthIndex}/100 (${result.healthLabel})\nדליפה ב${dominantLabel}: ${dominantScore.leakScore}%\nגרירה שבועית: ~${result.weeklyDragHours} שעות`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-10"
    >
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

      {/* Three meters */}
      <div className="flex justify-center gap-8 md:gap-14">
        {(["time", "money", "attention"] as ResourceType[]).map((r, i) => (
          <ResourceMeter
            key={r}
            score={result[r]}
            delayMs={i * 300}
            animate={metersAnimated}
          />
        ))}
      </div>

      {/* System Health Index */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="glass rounded-2xl p-6 text-center space-y-3 border border-border/20"
      >
        <p className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
          System Health Index
        </p>
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150, delay: 0.8 }}
          className="text-6xl md:text-7xl font-bold font-display"
          style={{ color: result.healthColor }}
        >
          {result.healthIndex}
        </motion.div>
        <div
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold"
          style={{
            color: result.healthColor,
            background: `${result.healthColor}15`,
            border: `1px solid ${result.healthColor}30`,
          }}
        >
          {result.healthLabel}
        </div>
      </motion.div>

      {/* Dominant insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="space-y-3"
      >
        <div className="glass rounded-xl p-4 border border-border/20 space-y-2">
          <p className="text-sm font-semibold text-foreground">
            הדליפה הגדולה ביותר שלך:{" "}
            <span style={{ color: RESOURCE_COLORS[result.dominantLeak] }}>
              {dominantLabel} — {dominantScore.leakScore}%
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            תרגום לזמן: ~
            <span className="text-foreground font-bold">{result.weeklyDragHours} שעות בשבוע</span>{" "}
            של גרירה בלתי נראית
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          המספרים האלה לא מדידים — עד עכשיו.
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="space-y-3"
      >
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 glow-primary"
        >
          <MessageCircle className="h-5 w-5" />
          קבל פרשנות לתוצאות שלך, חינם
        </a>
        <Button
          variant="outline"
          className="w-full gap-2 border-border/40"
          onClick={handleCopyResult}
        >
          {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
          {copied ? "הועתק!" : "שתף את התוצאות"}
        </Button>
      </motion.div>
    </motion.div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
type Phase = "intro" | "questions" | "result";

export function DiagnosticSection() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<DiagnosticAnswers>({});
  const sectionRef = useRef<HTMLElement>(null);

  // Restore partial progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cor-sys-diagnostic");
      if (saved) {
        const parsed = JSON.parse(saved) as DiagnosticAnswers;
        setAnswers(parsed);
      }
    } catch {
      // ignore
    }
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
    try {
      localStorage.setItem("cor-sys-diagnostic", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleNext = () => {
    if (currentIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setPhase("result");
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

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
    localStorage.removeItem("cor-sys-diagnostic");
  };

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
          {/* Progress bar — visible during questions */}
          {phase === "questions" && (
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
                  {/* Three resource icons */}
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
                          <span className="text-xs text-muted-foreground font-medium">
                            {RESOURCE_LABELS[r]}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-3 text-center">
                    <p className="text-foreground font-medium leading-relaxed">
                      כל מערכת — ארגון, צוות, עסק עצמאי — פועלת על שלושה משאבים בלבד.
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      הבעיה: רוב הדליפות הן בלתי נראות. לא כי הן לא קיימות — אלא כי אף אחד לא
                      מדד אותן.
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
                  {/* Step counter */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      שאלה {currentIndex + 1} מתוך {DIAGNOSTIC_QUESTIONS.length}
                    </span>
                    <span
                      className="font-medium"
                      style={{ color: RESOURCE_COLORS[currentQuestion.resource] }}
                    >
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

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handlePrev}
                      className="gap-1.5 text-muted-foreground hover:text-foreground"
                    >
                      <ChevronRight className="h-4 w-4" />
                      חזור
                    </Button>

                    {currentQuestion.format === "mcq" && (
                      <Button
                        variant="ghost"
                        size="sm"
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

              {/* ── RESULT ── */}
              {phase === "result" && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <RevelationPhase result={result} />
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
