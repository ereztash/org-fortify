import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "972524545963";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const WhatsAppFAB = () => {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-health-stable text-primary-foreground shadow-lg shadow-health-stable/30 hover:shadow-xl hover:shadow-health-stable/40 transition-shadow"
      aria-label="צור קשר בוואטסאפ"
    >
      <MessageCircle className="h-6 w-6" />
    </motion.a>
  );
};

export { WhatsAppFAB };
