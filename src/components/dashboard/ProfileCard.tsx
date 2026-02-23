import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ProfileCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass rounded-2xl p-6 flex items-center gap-5"
    >
      <Avatar className="h-16 w-16 border-2 border-primary/40">
        <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold font-display">
          אט
        </AvatarFallback>
      </Avatar>
      <div className="space-y-1 text-right">
        <h2 className="text-lg font-bold text-foreground font-display">ארז טל שיר</h2>
        <p className="text-sm text-primary font-medium">ארכיטקט חוסן ארגוני · מייסד COR-SYS</p>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-lg">
          עובד סוציאלי (מערכתי) ומומחה להנדסת תהליכים בארגוני Scale-up. לא מטפל באנשים — מרפא את המבנה שבו הם פועלים. באמצעות "העדשה הכפולה", מאתר משאבים שדולפים עקב נורמליזציה של סטייה ניהולית, ומטמיע חוסמי עורקים טכנולוגיים לעצירת הדימום תוך 14 יום.
        </p>
      </div>
    </motion.div>
  );
};

export { ProfileCard };
