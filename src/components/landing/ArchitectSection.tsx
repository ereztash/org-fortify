import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
              <p className="text-primary font-medium">ארכיטקט חוסן ארגוני · מייסד COR-SYS</p>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              עובד סוציאלי מהמסורת המערכתית. מומחה להנדסת תהליכים בארגוני Scale-up.
            </p>
            <p>
              אני לא מטפל באנשים — אני מרפא את <span className="text-foreground font-medium">המבנה</span> שבו הם פועלים.
              באמצעות מתודולוגיית <span className="text-primary font-medium">"העדשה הכפולה"</span>, אני מאתר
              משאבים שדולפים עקב נורמליזציה של סטייה ניהולית, ומטמיע חוסמי עורקים טכנולוגיים לעצירת הדימום.
            </p>
            <p className="text-sm">
              למה עובד סוציאלי? כי עבודה סוציאלית מערכתית לא עוסקת בפרט — היא עוסקת בסביבה.
              אני מביא את אותו החשיבה לארגונים: לא "מה לא בסדר עם האנשים", אלא "מה לא בסדר עם המבנה שבו הם פועלים".
            </p>
          </div>

          {/* Values */}
          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            {[
              { label: "שקיפות מלאה", desc: "כל נוסחה, כל הנחה, כל מספר — גלויים לך" },
              { label: "אפס תלות", desc: "אני נכנס, מתקן ויוצא. הצוות שלך ממשיך לבד" },
              { label: "מדיד ומוכח", desc: "אם לא חסכתי לך כסף — לא עבדתי" },
            ].map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-secondary/50 rounded-xl p-4 space-y-1 border border-border/50"
              >
                <p className="text-sm font-semibold text-primary">{v.label}</p>
                <p className="text-xs text-muted-foreground">{v.desc}</p>
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
