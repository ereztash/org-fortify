import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import erezPhoto from "@/assets/erez-profile.png";

const manifesto = [
  {
    label: "עצירת הדימום קודמת",
    desc: "להפסיד משאבים כואב פי 2 מלהרוויח. קודם כל עוצרים את הבזבוז, ואז בונים צמיחה.",
  },
  {
    label: "קשב לסימנים מוקדמים",
    desc: "כל סטייה קטנה היא סימן אזהרה. לא מתעלמים, מודדים ופועלים בזמן.",
  },
  {
    label: "לזנק קדימה, לא לחזור אחורה",
    desc: "המטרה היא לא לחזור למצב הקודם, אלא ליצור מצב טוב יותר ממה שהיה.",
  },
  {
    label: "שקיפות מלאה",
    desc: "כל חישוב, כל הנחה, כל מספר גלויים לך. אתה רואה בדיוק איך הגעתי לכל מסקנה.",
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
          {/* Header with avatar */}
          <div className="flex flex-col md:flex-row items-start gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Avatar className="h-20 w-20 border-2 border-primary/30">
                <AvatarImage src={erezPhoto} alt="ארז טל שיר" />
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold font-display">
                  אט
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <div className="space-y-3">
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm text-primary font-medium tracking-wider"
              >
                מי עומד מאחורי זה
              </motion.p>
              <h2 className="text-3xl md:text-4xl font-bold font-display">ארז טל שיר</h2>
              <p className="text-primary font-medium">מומחה לחוסן ארגוני ויציבות מערכתית</p>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
            <p>
              רקע בעבודה סוציאלית מערכתית. מתמחה בשיפור תהליכים בארגונים בצמיחה מהירה.
            </p>
            <p>
              אני לא מטפל באנשים. אני מתקן את <span className="text-foreground font-medium">המבנה</span> שבו הם עובדים.
              אני מאתר משאבים שהולכים לאיבוד בגלל הרגלי עבודה שגויים, ומטמיע פתרונות שעוצרים את הבזבוז.
            </p>
          </div>

          {/* Research Manifesto */}
          <div>
            <p className="text-sm text-primary font-medium mb-4 tracking-wider">4 עקרונות מנחים</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {manifesto.map((v, i) => (
                <motion.div
                  key={v.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="bg-secondary/50 rounded-xl p-4 space-y-1 border border-border/50"
                >
                  <p className="font-semibold text-primary">{v.label}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="border-t border-border/50 pt-6"
          >
            <p className="text-muted-foreground italic">
              "14 יום שמשנים את התמונה. לא עוד ייעוץ רגיל, אלא בדיקה מעמיקה ותיקון ממוקד."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
