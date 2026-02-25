import { motion, useInView } from "framer-motion";
import { Search, Activity, Syringe, ShieldCheck, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const WHATSAPP_URL = "https://wa.me/972524545963?text=היי%20ארז%2C%20אשמח%20לשיחת%20אבחון%20ראשונית";

const steps = [
  {
    icon: Search,
    day: "ימים 1-3",
    title: "בדיקה מהירה",
    desc: "שיחות ממוקדות עם אנשי מפתח. זיהוי הדפוסים שגורמים לבזבוז: היכן הזמן מתבזבז, איפה ההחלטות נתקעות, ומה חוזר על עצמו.",
    accent: "from-health-optimal/20 to-health-optimal/5",
  },
  {
    icon: Activity,
    day: "ימים 3-5",
    title: "מדידת יציבות ועלויות",
    desc: "חישוב מדויק של יחס היציבות הארגונית. בדיקה האם הארגון חצה את סף הסיכון. תרגום של כל ממצא למספרים בשקלים.",
    accent: "from-health-warning/20 to-health-warning/5",
  },
  {
    icon: Syringe,
    day: "ימים 5-10",
    title: "תיקון ממוקד",
    desc: "התערבויות קצרות ומדויקות בנקודות הבעיה. כל תיקון מדיד: אתה יודע בדיוק כמה כסף הוא חוסך לך.",
    accent: "from-primary/20 to-primary/5",
  },
  {
    icon: ShieldCheck,
    day: "ימים 11-14",
    title: "בדיקה חוזרת וסיום",
    desc: "וידוא שהבעיות נפתרו. מדידת השיפור. העברת שליטה מלאה לצוות שלך, בלי תלות חיצונית.",
    accent: "from-primary/30 to-primary/5",
  },
];

function TimelineStep({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative flex gap-6 md:gap-8"
    >
      {/* Timeline connector */}
      <div className="flex flex-col items-center shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 glow-primary relative z-10"
        >
          <step.icon className="h-5 w-5 text-primary" />
        </motion.div>
        {index < steps.length - 1 && (
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-px bg-gradient-to-b from-primary/30 to-transparent flex-1 mt-2"
          />
        )}
      </div>

      {/* Content */}
      <div className="glass rounded-2xl p-6 flex-1 mb-4 card-hover relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${step.accent} rounded-bl-full opacity-50`} />
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10 font-medium">
              {step.day}
            </span>
          </div>
          <h3 className="text-lg font-semibold font-display text-foreground">{step.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-28 px-6 relative section-divider">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.015] to-transparent" />

      <div className="container max-w-3xl mx-auto space-y-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            14 יום. לא 14 חודש.
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-display">איך זה עובד</h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-lg">
            נכנסים, בודקים, מתקנים, מוודאים. בלי תלות, בלי תשלום חודשי אינסופי.
          </p>
        </motion.div>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <TimelineStep key={step.title} step={step} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center pt-4"
        >
          <Button
            size="lg"
            asChild
            className="gap-2 px-8 py-6 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all glow-primary"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              בוא נבדוק אם זה רלוונטי לך
            </a>
          </Button>
          <p className="text-sm text-muted-foreground mt-3">שיחה של 15 דקות. אם לא רלוונטי, אגיד לך.</p>
        </motion.div>
      </div>
    </section>
  );
}
