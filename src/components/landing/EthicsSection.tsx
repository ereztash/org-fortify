import { motion } from "framer-motion";
import { Eye, Lock, Scale, HeartHandshake, Ban } from "lucide-react";

const commitments = [
  {
    icon: Eye,
    title: "שקיפות מלאה",
    desc: "כל חישוב, כל המלצה, כל מסקנה גלויים לך. אתה רואה בדיוק איך הגעתי לכל מספר.",
  },
  {
    icon: Lock,
    title: "אפס ניגוד אינטרסים",
    desc: "אני לא מוכר תוכנה, לא מוכר הדרכות, ולא מרוויח מזה שתישאר תלוי בי. ההצלחה שלי היא שלא תצטרך אותי.",
  },
  {
    icon: Scale,
    title: "כנות מקצועית",
    desc: "אם הבדיקה מראה שאתה לא צריך אותי, אגיד לך. אני לא ממציא בעיות כדי למכור פתרונות.",
  },
  {
    icon: HeartHandshake,
    title: "הגינות כלכלית",
    desc: "בדיקה ראשונית חינם. אם לא הוכחתי ערך מדיד, לא שילמת. פשוט.",
  },
];

const antiPatterns = [
  "לא הדרכות",
  "לא תשלום חודשי קבוע",
  "לא מצגת של 80 עמודים",
  "לא מילים גדולות בלי תוכן",
  "לא תלות ביועץ",
];

const dontWorkWith = [
  "מחפשות פתרון קוסמטי בלבד",
  "לא מוכנות לשקיפות פנימית",
  "מצפות לתוצאות בלי להשקיע זמן של ההנהלה",
  "רוצות דוח למגירה ולא שינוי אמיתי",
];

export function EthicsSection() {
  return (
    <section className="py-28 px-6 scroll-mt-20 section-divider">
      <div className="container max-w-4xl mx-auto space-y-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            ההתחייבויות שלי
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-display">הגינות קודמת לעסקים</h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-lg">
            בעולם מלא במילים גדולות ובהבטחות ריקות, אני מתחייב לסטנדרט אחר.
          </p>
        </motion.div>

        {/* Anti-Patterns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {antiPatterns.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="px-4 py-2 rounded-full border border-border/30 text-sm text-muted-foreground/60 line-through decoration-destructive/50 bg-secondary/30"
            >
              {item}
            </motion.span>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {commitments.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 space-y-3 card-hover group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/10 group-hover:glow-primary transition-shadow">
                  <c.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold font-display text-foreground">{c.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Don't work with */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass rounded-2xl p-6 md:p-8 space-y-4 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-destructive/30 to-transparent" />
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-destructive/10 border border-destructive/10">
              <Ban className="h-5 w-5 text-destructive" />
            </div>
            <h3 className="font-semibold font-display text-foreground">אני לא עובד עם חברות ש...</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {dontWorkWith.map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-muted-foreground">
                <span className="text-destructive mt-0.5 text-sm">✕</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground/50 pt-2 border-t border-border/20">
            זה לא יהירות. זה כבוד הדדי לזמן שלך ושלי.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
