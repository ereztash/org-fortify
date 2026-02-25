import { motion } from "framer-motion";
import { Users, Clock, GitBranch } from "lucide-react";

const pathologies = [
  {
    icon: Users,
    title: "נרמול סטייה (NOD)",
    subtitle: "Normalization of Deviance",
    desc: 'תרבות גיבורים — "לחבוש כמה כובעים" הפך לנורמה. חריגות בטיחות מאושרות בשגרה, שחיקה נתפסת כמחויבות.',
    metric: "70%",
    metricLabel: "מהארגונים סובלים משחיקה מבנית",
    indicator: "אינדיקטור: מספר חריגות שאושרו ב-30 יום (>5 = סיכון)",
  },
  {
    icon: Clock,
    title: "שיהוי החלטות",
    subtitle: "Decision Latency",
    desc: "נתק בין C-level למציאות התפעולית. ישיבות סרק, תחלופה גבוהה של מנהלי ביניים, החלטות בתוך בועה.",
    metric: "$400K",
    metricLabel: "עלות שיהוי ממוצעת לשנה",
    indicator: "נוסחה: מנהלים × שעות שבועיות × תעריף × 52 × 0.2",
  },
  {
    icon: GitBranch,
    title: "סחיפה סמנטית",
    subtitle: "Semantic Drift",
    desc: "פער בין מה שהארגון אומר שהוא לבין מה שהוא באמת עושה. עומס קוגניטיבי על צוותי הפיתוח, מסרים סותרים.",
    metric: "פער",
    metricLabel: "בין תיאורי תפקידים לביקורות עובדים",
    indicator: "מדד: ניתוח טקסטואלי של חוסר התאמה פנים-חוץ",
  },
];

export function PainSection() {
  return (
    <section id="pain-section" className="py-24 px-6">
      <div className="container max-w-5xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <p className="text-sm text-destructive font-medium tracking-wider">שלוש הפתולוגיות שהורסות ארגונים</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display">
            ממצאים מתוך מחקר של 100 ארגונים
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {pathologies.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="glass rounded-2xl p-6 space-y-4 group hover:border-destructive/30 transition-colors duration-300 flex flex-col"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-destructive/10">
                  <p.icon className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-semibold font-display text-foreground text-sm">{p.title}</h3>
                  <p className="text-xs text-muted-foreground">{p.subtitle}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.desc}</p>

              <div className="pt-3 border-t border-border/30 space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-display text-destructive">{p.metric}</span>
                  <span className="text-xs text-muted-foreground">{p.metricLabel}</span>
                </div>
                <p className="text-[10px] text-muted-foreground/70 font-mono">{p.indicator}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-muted-foreground text-sm"
        >
          אם זיהית לפחות אחת מהפתולוגיות — הארגון שלך צריך אבחון מבני, לא עוד הדרכה.
        </motion.p>
      </div>
    </section>
  );
}
