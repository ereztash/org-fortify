import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, MessageCircle, Linkedin, Award, TrendingUp } from "lucide-react";
import erezPhoto from "@/assets/erez-profile.png";

const WHATSAPP_URL = "https://wa.me/972524545963";

const ProfileCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-strong rounded-2xl p-6 flex flex-col md:flex-row items-start gap-5 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

      <div className="relative">
        <Avatar className="h-16 w-16 border-2 border-primary/30 shrink-0 ring-4 ring-primary/5">
          <AvatarImage src={erezPhoto} alt="ארז טל שיר" />
          <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold font-display">
            אט
          </AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-health-stable border-2 border-background" />
      </div>

      <div className="space-y-3 flex-1 relative">
        <div>
          <h2 className="text-lg font-bold text-foreground font-display">ארז טל שיר</h2>
          <p className="text-sm text-primary/80 font-medium">מומחה לחוסן ארגוני ואנטרופיה מערכתית · מייסד COR-SYS</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] px-3 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-primary">
            <Award className="h-3 w-3" />
            100+ ארגונים נותחו
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] px-3 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-primary">
            <TrendingUp className="h-3 w-3" />
            2M$+ נחסכו
          </span>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed max-w-lg">
          עובד סוציאלי (מערכתי) ומומחה להנדסת תהליכים בארגוני Scale-up. באמצעות "העדשה הכפולה", מאתר משאבים שדולפים עקב נורמליזציה של סטייה, ומטמיע חוסמי עורקים לעצירת הדימום תוך 14 יום.
        </p>

        <div className="flex gap-2">
          <a href="mailto:Erez2812345@gmail.com" className="inline-flex items-center gap-1.5 text-xs bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg px-3 py-1.5 transition-all duration-200 hover:shadow-md">
            <Mail className="h-3.5 w-3.5" /> אימייל
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs bg-health-stable/20 hover:bg-health-stable/30 text-health-stable rounded-lg px-3 py-1.5 transition-all duration-200 hover:shadow-md hover:shadow-health-stable/10">
            <MessageCircle className="h-3.5 w-3.5" /> וואטסאפ
          </a>
          <a href="https://www.linkedin.com/in/erez-tal-shir/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs bg-health-optimal/20 hover:bg-health-optimal/30 text-health-optimal rounded-lg px-3 py-1.5 transition-all duration-200 hover:shadow-md hover:shadow-health-optimal/10">
            <Linkedin className="h-3.5 w-3.5" /> לינקדאין
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export { ProfileCard };
