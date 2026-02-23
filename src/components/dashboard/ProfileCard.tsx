import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, MessageCircle } from "lucide-react";
import erezPhoto from "@/assets/erez-profile.png";

const WHATSAPP_URL = "https://wa.me/972524545963";

const ProfileCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass rounded-2xl p-6 flex items-center gap-5"
    >
      <Avatar className="h-16 w-16 border-2 border-primary/40">
        <AvatarImage src={erezPhoto} alt="ארז טל שיר" />
        <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold font-display">
          אט
        </AvatarFallback>
      </Avatar>
      <div className="space-y-2 text-right">
        <h2 className="text-lg font-bold text-foreground font-display">ארז טל שיר</h2>
        <p className="text-sm text-primary font-medium">ארכיטקט חוסן ארגוני · מייסד COR-SYS</p>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-lg">
          עובד סוציאלי (מערכתי) ומומחה להנדסת תהליכים בארגוני Scale-up. לא מטפל באנשים — מרפא את המבנה שבו הם פועלים. באמצעות "העדשה הכפולה", מאתר משאבים שדולפים עקב נורמליזציה של סטייה ניהולית, ומטמיע חוסמי עורקים טכנולוגיים לעצירת הדימום תוך 14 יום.
        </p>
        <div className="flex gap-2 justify-end">
          <a
            href="mailto:Erez2812345@gmail.com"
            className="inline-flex items-center gap-1.5 text-xs bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg px-3 py-1.5 transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
            אימייל
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg px-3 py-1.5 transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            וואטסאפ
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export { ProfileCard };
