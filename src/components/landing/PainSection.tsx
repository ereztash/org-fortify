import { motion } from "framer-motion";
import { Users, Clock, GitBranch } from "lucide-react";

const pathologies = [
  {
    icon: Users,
    title: "תרבות גיבורים",
    desc: "כשכולם \"חובשים כמה כובעים\" ועובדים מעבר לשעות, זה נראה כמו מסירות. בפועל, זו שחיקה מבנית שעולה לארגון הון.",
    metric: "70%",
    metricLabel: "מהארגונים סובלים משחיקה מבנית",
    indicator: "סימן אזהרה: יותר מ-5 חריגות שאושרו ב-30 יום",
  },
  {
    icon: Clock,
    title: "עיכוב בקבלת החלטות",
    desc: "ההנהלה מנותקת מהשטח. ישיבות שלא מובילות להחלטות, מנהלי ביניים שעוזבים, והחלטות שמתקבלות באיחור.",
    metric: "₪1.5M",
    metricLabel: "עלות עיכובים ממוצעת לשנה",
    indicator: "חישוב: מנהלים × שעות מבוזבזות × עלות שעה × 52 שבועות",
  },
  {
    icon: GitBranch,
    title: "פער בין מה שאומרים למה שעושים",
    desc: "הארגון מציג את עצמו בצורה אחת, אבל עובד בצורה אחרת. הצוותים מבולבלים, המסרים סותרים, והלקוחות מרגישים את זה.",
    metric: "פער",
    metricLabel: "בין התיאור לביצוע בפועל",
    indicator: "מדד: השוואה בין מסרים חיצוניים לחוויית העובדים",
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
          <p className="text-sm text-destructive font-medium tracking-wider">שלוש בעיות שהורסות ארגונים מבפנים</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display">
            ממצאים מתוך בדיקה של 100 ארגונים
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
          אם זיהית לפחות אחת מהבעיות האלה, הארגון שלך צריך בדיקה מבנית. לא עוד הדרכה.
        </motion.p>
      </div>
    </section>
  );
}
