import { motion, useInView } from "framer-motion";
import { Users, Clock, GitBranch, AlertTriangle } from "lucide-react";
import { useRef } from "react";

const pathologies = [
  {
    icon: Users,
    title: "תרבות גיבורים רעילה",
    desc: "עובדים שנדרשים \"לחבוש כמה כובעים\" ולעבוד מעבר לשעות. זה נראה כמו מסירות, אבל בפועל זה סימן שהארגון נכשל לבנות מערכות שעובדות בלי תלות בגיבורים בודדים.",
    metric: "70%",
    metricLabel: "מהחברות בצמיחה סובלות מזה",
    indicator: "סימן אזהרה: דרישה ל״גמישות״ ו״סביבה כאוטית״ בתיאורי משרה",
    gradient: "from-destructive/20 to-destructive/5",
  },
  {
    icon: Clock,
    title: "השהיית החלטות ונתק מהשטח",
    desc: "ההנהלה מנותקת מהמציאות התפעולית. מנהלי ביניים עוזבים בקצב גבוה כי אף אחד לא מוכן להגיד את האמת. החלטות נכשלות שוב ושוב.",
    metric: "₪1.5M",
    metricLabel: "עלות השהיה ממוצעת לשנה",
    indicator: "סימן אזהרה: תחלופה גבוהה של סמנכ״לים ומנהלי מוצר",
    gradient: "from-health-warning/20 to-health-warning/5",
  },
  {
    icon: GitBranch,
    title: "פער בין מה שמספרים לבין מה שקורה",
    desc: "החברה מציגה את עצמה בצורה אחת כלפי חוץ, אבל המציאות הפנימית שונה לחלוטין. העובדים חיים בקונפליקט יומיומי.",
    metric: "עומס",
    metricLabel: "קוגניטיבי על כל הצוותים",
    indicator: "סימן אזהרה: ביקורות עובדים מלאות בתסכול מול הודעות לעיתונות מלאות במילים גדולות",
    gradient: "from-health-optimal/20 to-health-optimal/5",
  },
];

function AnimatedMetric({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="text-3xl font-bold font-display text-destructive"
    >
      {value}
    </motion.span>
  );
}

export function PainSection() {
  return (
    <section id="pain-section" className="py-28 px-6 relative section-divider">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-destructive/[0.02] to-transparent" />

      <div className="container max-w-5xl mx-auto space-y-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium bg-destructive/10 text-destructive border border-destructive/20"
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            שלוש פתולוגיות שהורסות חברות מבפנים
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold font-display">
            ממצאים מתוך בדיקה של{" "}
            <span className="gradient-text-warm">100 ארגונים</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            חברות צמיחה בין 50 ל-300 עובדים חוות את שלושת הדפוסים האלה.
            <br className="hidden md:block" />
            ברוב המקרים, ההנהלה לא מודעת לזה.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {pathologies.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative glass rounded-2xl p-6 space-y-4 group card-hover flex flex-col overflow-hidden"
            >
              {/* Top gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${p.gradient}`} />

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-destructive/10 border border-destructive/10">
                  <p.icon className="h-5 w-5 text-destructive" />
                </div>
                <h3 className="font-semibold font-display text-foreground text-lg">{p.title}</h3>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.desc}</p>

              <div className="pt-4 border-t border-border/30 space-y-3">
                <div className="flex items-baseline gap-2">
                  <AnimatedMetric value={p.metric} />
                  <span className="text-xs text-muted-foreground">{p.metricLabel}</span>
                </div>
                <div className="flex items-start gap-1.5 p-2 rounded-lg bg-destructive/5 border border-destructive/10">
                  <AlertTriangle className="h-3 w-3 text-destructive/60 mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground/80">{p.indicator}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-muted-foreground text-lg"
        >
          אם זיהית לפחות אחת מהבעיות,{" "}
          <span className="text-foreground font-medium">הארגון שלך צריך בדיקה מבנית</span>. לא עוד הדרכה.
        </motion.p>
      </div>
    </section>
  );
}
