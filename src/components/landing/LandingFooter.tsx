import { motion } from "framer-motion";
import { MessageCircle, Linkedin, Mail, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/972524545963?text=היי%20ארז%2C%20אשמח%20לשיחת%20אבחון%20ראשונית";
const LINKEDIN_URL = "https://www.linkedin.com/in/erez-tal-shir/";
const EMAIL = "mailto:erez@cor-sys.com";

export function LandingFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative">
      {/* Dramatic Final CTA */}
      <div className="relative py-28 px-6 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.04] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center space-y-8 max-w-2xl mx-auto"
        >
          <div className="space-y-4">
            <motion.h2
              className="text-3xl md:text-5xl font-bold font-display leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              הארגון שלך מפסיד כסף{" "}
              <span className="gradient-text">עכשיו</span>.
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              15 דקות שיחה יכולות לחשוף דליפה של מאות אלפי שקלים בשנה.
              <br />
              <span className="text-foreground/80 font-medium">אם לא רלוונטי, אגיד לך.</span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <Button
              size="lg"
              asChild
              className="gap-3 px-10 py-7 text-lg shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all glow-primary hover:scale-[1.03]"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                דבר איתי בוואטסאפ
              </a>
            </Button>
          </motion.div>

          {/* Social proof micro-text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="text-xs text-muted-foreground/50"
          >
            אפס התחייבות · אפס מכירות · 15 דקות בלבד
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="py-6 px-6 border-t border-border/20">
        <div className="container max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/60">
          <p>ארז טל שיר · ארכיטקט חוסן ארגוני · COR-SYS</p>

          <div className="flex items-center gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="WhatsApp">
              <MessageCircle className="h-4 w-4" />
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href={EMAIL} className="hover:text-primary transition-colors" aria-label="Email">
              <Mail className="h-4 w-4" />
            </a>
            <button onClick={scrollToTop} className="hover:text-primary transition-colors" aria-label="חזור למעלה">
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>

          <p className="text-center sm:text-left">חוסן ארגוני · אבחון מבני · הנדסת תהליכים</p>
        </div>
      </div>
    </footer>
  );
}
