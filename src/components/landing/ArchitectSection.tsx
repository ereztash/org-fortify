import { Card, CardContent } from "@/components/ui/card";
import { Layers, Target, Wrench } from "lucide-react";
import { motion } from "framer-motion";

const principles = [
  {
    icon: Target,
    title: "אבחון מבני",
    desc: "זיהוי סטיות מנורמליזציה, סתירות לוגיות וכשלי עומק בארכיטקטורה הארגונית.",
  },
  {
    icon: Layers,
    title: "התמרה אונטולוגית",
    desc: "שינוי מהותי של מערכות הפעלה ארגוניות — לא קוסמטיקה.",
  },
  {
    icon: Wrench,
    title: "חוסמי עורקים",
    desc: "פעולות מניעתיות מדויקות שמונעות דימום ארגוני לפני שמתחיל.",
  },
];

export function ArchitectSection() {
  return (
    <section id="architect" className="py-24 px-6">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="glass rounded-2xl p-8 md:p-12 space-y-8"
        >
          {/* Header */}
          <div className="space-y-3">
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm text-primary font-medium tracking-wider uppercase"
            >
              Meet the Architect
            </motion.p>
            <h2 className="text-3xl md:text-4xl font-bold font-display">
              The Social Technologist
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              עובד סוציאלי מהמסורת המערכתית-קהילתית. מומחה לחוסן ארגוני.
              המיקוד: תיקון ארכיטקטורת הזרימה — לא טיפול פרטני.
            </p>
          </div>

          {/* Principles */}
          <div className="grid md:grid-cols-3 gap-4">
            {principles.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 * i + 0.3 }}
              >
                <Card className="bg-secondary/50 border-border/50 h-full group hover:border-primary/30 transition-colors duration-300">
                  <CardContent className="p-6 space-y-3">
                    <motion.div whileHover={{ scale: 1.15, rotate: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                      <item.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <h3 className="font-semibold font-display">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="border-t border-border/50 pt-6"
          >
            <p className="text-sm text-muted-foreground italic">
              "צריך גלגל — אני גלגל. אפס פוזה."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
