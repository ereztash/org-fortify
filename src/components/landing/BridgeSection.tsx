import { motion } from "framer-motion";

export function BridgeSection() {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          background: "linear-gradient(135deg, hsl(var(--destructive)), hsl(var(--primary)))",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 container max-w-2xl mx-auto text-center space-y-4"
      >
        <p className="text-2xl md:text-3xl font-display font-bold leading-relaxed text-foreground">
          הבעיה היא לא האנשים.
          <br />
          הבעיה היא <span className="text-primary">המבנה</span>.
        </p>
        <p className="text-lg text-muted-foreground">
          המודל שלי מבוסס על בדיקה של 100 ארגונים ו-10,000 סימולציות.
        </p>
        <p className="text-sm text-muted-foreground/70">
          אני מודד את יחס היציבות של הארגון: כמה משאבים יש לך מול כמה בזבוז קיים. כשהבזבוז עולה על 65% מהמשאבים, הסיכון לקריסה עולה פי 3.
        </p>
      </motion.div>
    </section>
  );
}
