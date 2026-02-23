import { motion } from "framer-motion";
import { MessageCircle, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/972524545963?text=היי%20ארז%2C%20אשמח%20לשיחת%20אבחון%20ראשונית";
const LINKEDIN_URL = "https://www.linkedin.com/in/erez-tal-shir/";
const EMAIL = "mailto:erez@cor-sys.com";

export function LandingFooter() {
  return (
    <footer className="border-t border-border/50">
      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-6 text-center space-y-6"
      >
        <h2 className="text-2xl md:text-3xl font-bold font-display">
          הארגון שלך מפסיד כסף <span className="text-primary">עכשיו</span>.
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          15 דקות שיחה יכולות לחשוף דליפה של מאות אלפי שקלים בשנה.
          <br />
          אם לא רלוונטי, אגיד לך.
        </p>
        <Button
          size="lg"
          asChild
          className="gap-2 px-8 py-6 text-base shadow-lg shadow-primary/20"
        >
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-5 w-5" />
            דבר איתי בוואטסאפ
          </a>
        </Button>
      </motion.div>

      {/* Bottom bar */}
      <div className="py-6 px-6 border-t border-border/30">
        <div className="container max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
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
          </div>

          <p className="text-center sm:text-left">חוסן ארגוני · אבחון מבני · הנדסת תהליכים</p>
        </div>
      </div>
    </footer>
  );
}
