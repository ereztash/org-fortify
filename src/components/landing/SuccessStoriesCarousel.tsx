import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, TrendingDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const cases = [
  {
    company: "Trigo",
    sector: "פינטק / קמעונאות",
    problem: "נרמול סטייה — פיטרו 15% מהעובדים תוך הצהרה על \"צמיחה\". תרבות גיבורים הסוותה דימום מבני.",
    analysis: "עלות שיהוי שנתית: 12 מנהלים × 20 שעות שבועיות מבוזבזות × $175 × 52 × 0.2",
    result: "$436,800",
    resultLabel: "עלות שיהוי שנתית שזוהתה",
    color: "hsl(var(--destructive))",
  },
  {
    company: "Mesh Payments",
    sector: "פינטק",
    problem: "סחיפה סמנטית — מציגה עצמה כפלטפורמת קריפטו, אך הלקוחות צריכים ניהול הוצאות B2B. פער שגורם לעומס קוגניטיבי.",
    analysis: "עלות הסחיפה: 10 מנהלים × שעות נוספות × $320 תעריף ממוצע × 52 שבועות",
    result: "$332,800",
    resultLabel: "עלות עומס קוגניטיבי שנתית",
    color: "hsl(var(--health-warning))",
  },
  {
    company: "Navina",
    sector: "Healthtech",
    problem: "הייפ AI מול צורך באוטומציה טקטית. פער בין חזון שיווקי ליכולות הפיתוח בפועל, שמעכב delivery ועולה במיליונים.",
    analysis: "ניתוח COR-SYS: J-Quotient נמוך מ-1.0, E > 0.65C — מעל סף השבירה",
    result: "מיליונים",
    resultLabel: "עלות עיכוב פיתוח מוערכת",
    color: "hsl(var(--health-critical))",
  },
];

export function SuccessStoriesCarousel() {
  const [active, setActive] = useState(0);
  const prev = () => setActive((i) => (i - 1 + cases.length) % cases.length);
  const next = () => setActive((i) => (i + 1) % cases.length);

  return (
    <section className="py-24 px-6">
      <div className="container max-w-4xl mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <p className="text-sm text-primary font-medium tracking-wider">מקרי בוחן אמיתיים</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display">Problem → Analysis → Result</h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-2xl p-8 md:p-10 space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold font-display text-foreground">{cases[active].company}</h3>
                  <p className="text-sm text-primary">{cases[active].sector}</p>
                </div>
                <div className="flex gap-2">
                  {cases.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        i === active ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-xs text-destructive font-medium flex items-center gap-1">
                    <TrendingDown className="h-3 w-3" /> הבעיה
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cases[active].problem}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-primary font-medium flex items-center gap-1">
                    <ArrowRight className="h-3 w-3" /> ניתוח COR-SYS
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed font-mono text-xs">{cases[active].analysis}</p>
                </div>
                <div className="space-y-2 text-center md:text-right">
                  <p className="text-xs text-muted-foreground font-medium">{cases[active].resultLabel}</p>
                  <p className="text-3xl font-bold font-display" style={{ color: cases[active].color }}>
                    {cases[active].result}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 mt-6">
            <Button variant="outline" size="icon" onClick={prev} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={next} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
