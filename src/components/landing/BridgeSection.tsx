import { motion } from "framer-motion";

export function BridgeSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Dramatic gradient background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            background: "linear-gradient(135deg, hsl(var(--destructive)), transparent 50%, hsl(var(--primary)))",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.04),transparent_70%)]" />
      </div>

      {/* Decorative line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 container max-w-2xl mx-auto text-center space-y-6"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-3xl md:text-4xl font-serif font-bold leading-relaxed text-foreground">
            הבעיה היא לא האנשים.
            <br />
            הבעיה היא <span className="gradient-text">המבנה</span>.
          </p>
        </motion.div>

        <div className="w-12 h-px bg-primary/40 mx-auto" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-3"
        >
          <p className="text-lg text-muted-foreground">
            המודל שלי מבוסס על בדיקה של 100 ארגונים ו-10,000 סימולציות.
          </p>
          <p className="text-sm text-muted-foreground/70 max-w-lg mx-auto">
            אני מודד את יחס היציבות של הארגון: כמה משאבים יש לך מול כמה בזבוז קיים.{" "}
            <span className="text-destructive/80 font-medium">כשהבזבוז עולה על 65% מהמשאבים, הסיכון לקריסה עולה פי 3.</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
