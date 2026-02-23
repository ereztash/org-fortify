import { motion } from "framer-motion";
import { AlertTriangle, Clock, DollarSign, Users } from "lucide-react";

const pains = [
  {
    icon: DollarSign,
    title: "תקציבים נשחקים",
    desc: 'עשרות אלפי שקלים בחודש נעלמים בתהליכים "שתמיד ככה עבדנו". אף אחד לא שואל למה.',
  },
  {
    icon: Users,
    title: "עובדים טובים עוזבים",
    desc: "לא בגלל השכר. בגלל חיכוך מבני שגורם לתחושה שהמערכת עובדת נגדם.",
  },
  {
    icon: Clock,
    title: "ישיבות בלי סוף",
    desc: "אותן בעיות חוזרות כל שבוע. כולם יודעים. אף אחד לא עוצר את הלופ.",
  },
  {
    icon: AlertTriangle,
    title: "נורמליזציה של סטייה",
    desc: 'כשלים הופכים ל"ככה זה פה". עד שמשהו נשבר, ואז כולם בהלם.',
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
          <p className="text-sm text-destructive font-medium tracking-wider">זה מוכר לך?</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display">
            הסימפטומים שאף יועץ לא אומר לך עליהם
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {pains.map((pain, i) => (
            <motion.div
              key={pain.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 space-y-3 group hover:border-destructive/30 transition-colors duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <pain.icon className="h-5 w-5 text-destructive" />
                </div>
                <h3 className="font-semibold font-display text-foreground">{pain.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{pain.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-muted-foreground text-sm"
        >
          אם סימנת 2 או יותר, הארגון שלך צריך אבחון מבני, לא עוד הדרכה.
        </motion.p>
      </div>
    </section>
  );
}
