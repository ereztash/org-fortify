import { motion } from "framer-motion";
import { Search, Syringe, ShieldCheck, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/972524545963?text=היי%20ארז%2C%20אשמח%20לשיחת%20אבחון%20ראשונית";

const steps = [
  {
    icon: Search,
    day: "ימים 1-3",
    title: "אבחון מבני",
    desc: "מיפוי מדויק של נקודות הדליפה: היכן המשאבים נעלמים, אילו תהליכים יוצרים חיכוך, ומה עלות אי-העשייה האמיתית.",
  },
  {
    icon: Syringe,
    day: "ימים 4-10",
    title: "הטמעת חוסמי עורקים",
    desc: "התערבויות מדויקות ומדידות בנקודות הדימום. לא תוכנית אסטרטגית של 80 עמודים, פעולות שעוצרות דליפה עכשיו.",
  },
  {
    icon: ShieldCheck,
    day: "ימים 11-14",
    title: "ייצוב ומדידה",
    desc: "אימות שהדימום נעצר. מדידת חיסכון. העברת שליטה מלאה לצוות שלך, בלי תלות בי.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 px-6 relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="container max-w-4xl mx-auto space-y-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <p className="text-sm text-primary font-medium tracking-wider">14 יום. לא 14 חודש.</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display">איך זה עובד</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            תהליך כירורגי: כניסה, תיקון, יציאה. בלי תלות, בלי ריטיינר אינסופי.
          </p>
        </motion.div>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start gap-5"
            >
              <div className="flex items-center gap-4 shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs font-mono text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                  {step.day}
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold font-display text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center pt-4"
        >
          <Button
            size="lg"
            asChild
            className="gap-2 px-8 py-6 text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              בוא נבדוק אם זה רלוונטי לך
            </a>
          </Button>
          <p className="text-xs text-muted-foreground mt-3">שיחה של 15 דקות. אם לא רלוונטי, אגיד לך.</p>
        </motion.div>
      </div>
    </section>
  );
}
