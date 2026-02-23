import { motion } from "framer-motion";
import { Eye, Lock, Scale, HeartHandshake } from "lucide-react";

const commitments = [
  {
    icon: Eye,
    title: "Glass Box, לא Black Box",
    desc: "כל מודל, כל חישוב, כל המלצה, שקופים לחלוטין. אתה רואה בדיוק איך הגעתי למסקנה.",
  },
  {
    icon: Lock,
    title: "אפס ניגוד אינטרסים",
    desc: "אני לא מוכר תוכנה, לא מוכר הדרכות, ולא מרוויח מזה שתישאר תלוי בי. ההצלחה שלי = שלא תצטרך אותי.",
  },
  {
    icon: Scale,
    title: "אתיקה מקצועית",
    desc: "אם האבחון מראה שאתה לא צריך אותי, אגיד לך. אני לא ממציא בעיות כדי למכור פתרונות.",
  },
  {
    icon: HeartHandshake,
    title: "הגינות כלכלית",
    desc: "אבחון ראשוני חינם. אם לא הוכחתי ערך מדיד, לא שילמת. פשוט.",
  },
];

export function EthicsSection() {
  return (
    <section className="py-24 px-6">
      <div className="container max-w-4xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <p className="text-sm text-primary font-medium tracking-wider">ההתחייבויות שלי</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display">אתיקה קודמת לעסקים</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            בעולם מלא באגו של יועצים ובאזוורדס, אני מתחייב לסטנדרט אחר.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {commitments.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 space-y-3 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <c.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold font-display text-foreground">{c.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
