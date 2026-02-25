import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, TrendingDown, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const cases = [
  {
    company: "חברת פינטק / קמעונאות",
    sector: "200+ עובדים, סבב B",
    problem: "פיטרו 15% מהעובדים תוך שהם מכריזים על \"צמיחה\". תרבות גיבורים הסתירה בעיות מבניות אמיתיות.",
    analysis: "חישוב: 12 מנהלים × 20 שעות מבוזבזות בשבוע × $175 × 52 שבועות",
    result: "$436,800",
    resultLabel: "עלות שנתית שזוהתה",
    color: "hsl(var(--destructive))",
    bgAccent: "from-destructive/5 to-transparent",
  },
  {
    company: "חברת פינטק B2B",
    sector: "150 עובדים, סבב A",
    problem: "הציגה את עצמה כפלטפורמה אחת, אבל הלקוחות ציפו למשהו אחר לגמרי. הפער הזה יצר בלבול בכל הצוותים.",
    analysis: "חישוב: 10 מנהלים × שעות נוספות × $320 עלות ממוצעת × 52 שבועות",
    result: "$332,800",
    resultLabel: "עלות בלבול שנתית",
    color: "hsl(var(--health-warning))",
    bgAccent: "from-health-warning/5 to-transparent",
  },
  {
    company: "חברת Healthtech",
    sector: "100 עובדים, סבב A",
    problem: "פער גדול בין החזון השיווקי ליכולות בפועל. הבטחות ללקוחות שהפיתוח לא יכול לעמוד בהן.",
    analysis: "יחס היציבות נמוך מ-1.0. הבזבוז חצה את סף הסיכון.",
    result: "מיליונים",
    resultLabel: "עלות עיכובים מוערכת",
    color: "hsl(var(--health-critical))",
    bgAccent: "from-health-critical/5 to-transparent",
  },
];

export function SuccessStoriesCarousel() {
  const [active, setActive] = useState(0);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % cases.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setActive((i) => (i - 1 + cases.length) % cases.length);
  const next = () => setActive((i) => (i + 1) % cases.length);

  return (
    <section className="py-28 px-6 section-divider">
      <div className="container max-w-4xl mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            מקרים אמיתיים, שמות מוסתרים
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-display">בעיה ← בדיקה ← תוצאה</h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 60, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.98 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`glass-strong rounded-2xl p-8 md:p-10 space-y-6 relative overflow-hidden`}
            >
              {/* Background accent */}
              <div className={`absolute inset-0 bg-gradient-to-bl ${cases[active].bgAccent} pointer-events-none`} />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold font-display text-foreground">{cases[active].company}</h3>
                    <p className="text-sm text-primary">{cases[active].sector}</p>
                  </div>
                  {/* Progress dots */}
                  <div className="flex gap-2">
                    {cases.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        className="relative h-2 rounded-full overflow-hidden transition-all"
                        style={{ width: i === active ? 24 : 8 }}
                        aria-label={`מקרה ${i + 1}`}
                      >
                        <div className={`absolute inset-0 rounded-full ${i === active ? "bg-primary" : "bg-muted"}`} />
                        {i === active && (
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 7, ease: "linear" }}
                            className="absolute inset-y-0 right-0 bg-primary/50 rounded-full"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-xs text-destructive font-medium flex items-center gap-1.5">
                      <TrendingDown className="h-3.5 w-3.5" /> הבעיה
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cases[active].problem}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-primary font-medium flex items-center gap-1.5">
                      <ArrowLeft className="h-3.5 w-3.5" /> הבדיקה
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cases[active].analysis}</p>
                  </div>
                  <div className="space-y-2 flex flex-col items-center md:items-end justify-center">
                    <p className="text-xs text-muted-foreground font-medium">{cases[active].resultLabel}</p>
                    <motion.p
                      key={`result-${active}`}
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
                      className="text-4xl font-bold font-display"
                      style={{ color: cases[active].color }}
                    >
                      {cases[active].result}
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 mt-6">
            <Button variant="outline" size="icon" onClick={prev} className="rounded-full border-border/30 hover:border-primary/40" aria-label="הקודם">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={next} className="rounded-full border-border/30 hover:border-primary/40" aria-label="הבא">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
