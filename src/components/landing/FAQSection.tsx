import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "מה ההבדל בינך לבין יועץ ארגוני רגיל?",
    a: "יועצים ארגוניים בדרך כלל עובדים על תרבות, הדרכות, או תוכניות אסטרטגיות. אני עובד על הארכיטקטורה — המבנה עצמו. זה כמו ההבדל בין פסיכולוג לבין מהנדס בניין: שניהם חשובים, אבל אני מתקן את הקירות, לא את מי שגר בתוכם.",
  },
  {
    q: "מה זה 'חוסם עורקים טכנולוגי'?",
    a: "זו התערבות מדויקת שעוצרת דליפת משאבים בנקודה ספציפית. בדיוק כמו חוסם עורקים ברפואה — לא מרפא את כל הגוף, אבל עוצר את הדימום מיד. כל חוסם עורקים מדיד: אתה יודע בדיוק כמה כסף הוא חוסך לך.",
  },
  {
    q: 'למה "14 יום"? זה לא מהיר מדי?',
    a: "14 יום לעצירת הדימום, לא לריפוי כל הארגון. אני מזהה את 20% מהכשלים שגורמים ל-80% מהנזק, ומטפל בהם ראשון. המטרה היא להפסיק להפסיד כסף — עכשיו. עבודה עומק נוספת, אם נדרשת, מתוכננת אחרי שהדימום נעצר.",
  },
  {
    q: "כמה זה עולה?",
    a: "שיחת אבחון ראשונית — חינם, 15 דקות. אם רלוונטי, אציע תוכנית עם מחיר שקוף. אני לא עובד עם ריטיינר חודשי אינסופי. המודל שלי פשוט: אם לא חסכתי לך יותר ממה ששילמת — לא הייתה הצדקה לעבודה.",
  },
  {
    q: "איך אני יודע שזה רלוונטי לארגון שלי?",
    a: "בשיחת האבחון הראשונית (15 דקות, חינם) אני שואל 5-7 שאלות ממוקדות. בתוך 15 דקות אני יכול לומר לך אם יש כאן בעיה מבנית שאני יכול לפתור — או לא. אם לא, אגיד לך בגלוי.",
  },
];

export function FAQSection() {
  return (
    <section className="py-24 px-6">
      <div className="container max-w-3xl mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display">שאלות שכולם שואלים</h2>
          <p className="text-muted-foreground">התשובות הכנות. בלי שיווק.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="glass rounded-xl border-border/30 px-5"
              >
                <AccordionTrigger className="text-sm font-medium text-foreground hover:text-primary transition-colors py-5 text-right">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
