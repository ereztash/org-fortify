import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function SocialProofSection() {
  return (
    <section className="py-20 px-6">
      <div className="container max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8 md:p-12 text-center space-y-6 relative"
        >
          <Quote className="h-8 w-8 text-primary/30 mx-auto" />
          <blockquote className="text-lg md:text-xl font-display leading-relaxed text-foreground">
            "אני לא מבטיח לשנות את העולם. אני מבטיח שתבין בדיוק איפה הכסף דולף, ותקבל כלים לעצור את זה. אם אין דליפה, אגיד לך ונחסוך את הזמן של שנינו."
          </blockquote>
          <div className="text-sm text-muted-foreground">
            ארז טל שיר · ארכיטקט חוסן ארגוני
          </div>
        </motion.div>
      </div>
    </section>
  );
}
