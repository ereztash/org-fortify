import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/972524545963?text=היי%20ארז%2C%20אשמח%20לשיחת%20אבחון%20ראשונית";

const faqs = [
  {
    q: "מה ההבדל בינך לבין יועץ ארגוני רגיל?",
    a: "יועצים ארגוניים בדרך כלל עובדים על תרבות, הדרכות, או תוכניות אסטרטגיות. אני עובד על המבנה עצמו. זה כמו ההבדל בין פסיכולוג לבין מהנדס בניין. אני משתמש בכלי מדידה כמותיים כדי למצוא בדיוק איפה הכסף דולף, ומתקן את זה.",
  },
  {
    q: "מה זה 'תיקון ממוקד'?",
    a: "זו התערבות מדויקת שעוצרת בזבוז בנקודה ספציפית. בדיוק כמו טיפול ממוקד ברפואה: לא מטפלים בכל הגוף, אלא עוצרים את הבעיה במקור. כל תיקון מדיד: אתה יודע בדיוק כמה כסף הוא חוסך לך.",
  },
  {
    q: 'למה "14 יום"? זה לא מהיר מדי?',
    a: "14 יום לעצירת הבזבוז, לא לשינוי כל הארגון. אני מזהה את 20% מהבעיות שגורמות ל-80% מהנזק, ומטפל בהן ראשון. המטרה: להפסיק להפסיד כסף, עכשיו. עבודה נוספת, אם נדרשת, מתוכננת אחרי.",
  },
  {
    q: "כמה זה עולה?",
    a: "שיחה ראשונית חינם, 15 דקות. אם רלוונטי, אציע תוכנית עם מחיר שקוף: 15% מעלות הבזבוז השנתי. אני לא עובד עם תשלום חודשי קבוע. אם לא חסכתי לך יותר ממה ששילמת, לא הייתה הצדקה.",
  },
  {
    q: "אין לנו תקציב לייעוץ עכשיו.",
    a: "השאלה היא לא כמה זה עולה, אלא כמה אתה מפסיד עכשיו. אם הארגון מפסיד מיליון וחצי שקל בשנה על עיכובים, תהליך של 14 יום שעולה 15% מזה ומחזיר את עצמו תוך חודשיים, זו לא הוצאה, זו השקעה. תבדוק את המחשבון למעלה.",
  },
  {
    q: "כבר ניסינו ייעוץ ולא עבד.",
    a: "כנראה שניסיתם ייעוץ שמתמקד בתרבות או בהדרכות. הגישה שלי שונה לגמרי: אני לא מייעץ, אני בודק ומתקן. כמו רופא מיון, לא פסיכולוג. 14 יום, תוצאות מדידות, אפס תלות. אם לא עבד, לא שילמת.",
  },
  {
    q: "איך אני יודע שזה רלוונטי לארגון שלי?",
    a: "בשיחה הראשונית (15 דקות, חינם) אני שואל 5-7 שאלות ממוקדות. תוך 15 דקות אני יכול לומר לך אם יש כאן בעיה שאני יכול לפתור, או לא. אם לא, אגיד לך בגלוי.",
  },
];

export function FAQSection() {
  return (
    <section id="faq-section" className="py-28 px-6 section-divider">
      <div className="container max-w-3xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display">שאלות שכולם שואלים</h2>
          <p className="text-muted-foreground text-lg">תשובות כנות. בלי שיווק.</p>
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
                className="glass rounded-xl border-border/20 px-5 hover:border-primary/20 transition-colors data-[state=open]:glow-primary"
              >
                <AccordionTrigger className="text-base font-medium text-foreground hover:text-primary transition-colors py-5 text-right">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Mini CTA after FAQ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center pt-4"
        >
          <p className="text-muted-foreground mb-4">לא מצאת תשובה? דבר איתי ישירות.</p>
          <Button variant="outline" size="lg" asChild className="gap-2 border-border/30 hover:border-primary/40">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              שאל אותי בוואטסאפ
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
