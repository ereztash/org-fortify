import { motion } from "framer-motion";
import { Users, Clock, GitBranch } from "lucide-react";

const pathologies = [
  {
    icon: Users,
    title: "תרבות גיבורים רעילה",
    desc: "עובדים שנדרשים \"לחבוש כמה כובעים\" ולעבוד מעבר לשעות. זה נראה כמו מסירות, אבל בפועל זה סימן שהארגון נכשל לבנות מערכות שעובדות בלי תלות בגיבורים בודדים. התוצאה: שחיקה מסיבית ועזיבה של אנשי מפתח.",
    metric: "70%",
    metricLabel: "מהחברות בצמיחה סובלות מזה",
    indicator: "סימן אזהרה: דרישה ל״גמישות״ ו״סביבה כאוטית״ בתיאורי משרה",
  },
  {
    icon: Clock,
    title: "השהיית החלטות ונתק מהשטח",
    desc: "ההנהלה מנותקת מהמציאות התפעולית. מנהלי ביניים עוזבים בקצב גבוה כי אף אחד לא מוכן להגיד את האמת. החלטות מתקבלות על בסיס תחזיות ולא על בסיס נתונים, ונכשלות שוב ושוב.",
    metric: "₪1.5M",
    metricLabel: "עלות השהיה ממוצעת לשנה",
    indicator: "סימן אזהרה: תחלופה גבוהה של סמנכ״לים ומנהלי מוצר",
  },
  {
    icon: GitBranch,
    title: "פער בין מה שמספרים לבין מה שקורה",
    desc: "החברה מציגה את עצמה בצורה אחת כלפי חוץ, אבל המציאות הפנימית שונה לחלוטין. העובדים חיים בקונפליקט יומיומי: נדרשים לקיים מצג שווא מול לקוחות ושותפים, בזמן שהמערכות שבורות מבפנים.",
    metric: "עומס",
    metricLabel: "קוגניטיבי על כל הצוותים",
    indicator: "סימן אזהרה: הודעות לעיתונות מלאות במילים גדולות, ביקורות עובדים מלאות בתסכול",
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
          <p className="text-sm text-destructive font-medium tracking-wider">שלוש פתולוגיות שהורסות חברות מבפנים</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display">
            ממצאים מתוך בדיקה של 100 ארגונים
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            חברות צמיחה בין 50 ל-300 עובדים חוות את שלושת הדפוסים האלה. ברוב המקרים, ההנהלה לא מודעת לזה.
          </p>
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
                <h3 className="font-semibold font-display text-foreground">{p.title}</h3>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.desc}</p>

              <div className="pt-3 border-t border-border/30 space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-display text-destructive">{p.metric}</span>
                  <span className="text-xs text-muted-foreground">{p.metricLabel}</span>
                </div>
                <p className="text-xs text-muted-foreground/70">{p.indicator}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-muted-foreground"
        >
          אם זיהית לפחות אחת מהבעיות, הארגון שלך צריך בדיקה מבנית. לא עוד הדרכה.
        </motion.p>
      </div>
    </section>
  );
}
