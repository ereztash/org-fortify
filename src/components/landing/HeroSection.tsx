import { Button } from "@/components/ui/button";
import { MessageCircle, ChevronDown, Shield, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import erezPhoto from "@/assets/erez-profile.png";

const WHATSAPP_URL = "https://wa.me/972524545963?text=היי%20ארז%2C%20אשמח%20לשיחת%20אבחון%20ראשונית";

export function HeroSection() {
  const navigate = useNavigate();
  const scrollToROI = () => {
    document.getElementById("roi-engine")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToNext = () => {
    document.getElementById("pain-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-4 sm:px-6 scroll-mt-20">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-40 md:w-64 h-40 md:h-64 rounded-full"
        style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.08), transparent 70%)" }}
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-60 md:w-96 h-60 md:h-96 rounded-full"
        style={{ background: "radial-gradient(circle, hsl(var(--health-optimal) / 0.06), transparent 70%)" }}
        animate={{ x: [0, -40, 20, 0], y: [0, 25, -35, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-5 md:space-y-8">
          {/* Profile photo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <img
              src={erezPhoto}
              alt="ארז טל שיר"
              className="h-20 w-20 md:h-28 md:w-28 rounded-full object-cover border-2 border-primary/30 shadow-lg shadow-primary/10"
            />
          </motion.div>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-muted-foreground"
          >
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>אבחון מערכתי ראשוני, ללא עלות, ללא התחייבות</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-tight"
          >
            <span className="text-foreground">הארגון שלך </span>
            <motion.span
              className="text-primary inline-block"
              animate={{
                textShadow: [
                  "0 0 8px hsl(var(--primary) / 0)",
                  "0 0 20px hsl(var(--primary) / 0.4)",
                  "0 0 8px hsl(var(--primary) / 0)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              מדמם
            </motion.span>
            <br />
            <span className="text-muted-foreground text-xl sm:text-2xl md:text-4xl lg:text-5xl">
              ואף אחד לא יודע מאיפה.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            אני מאתר את הנקודה המדויקת שבה המשאבים דולפים,
            <br className="hidden md:block" />
            ועוצר את הדימום תוך 14 יום. בלי קוסמטיקה. בלי באזוורדס.
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col items-center gap-3 md:gap-4 pt-2 md:pt-4"
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full sm:w-auto">
              <Button
                size="lg"
                asChild
                className="gap-3 text-base md:text-lg px-8 md:px-10 py-6 md:py-7 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-[1.02] w-full sm:w-auto"
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  שיחת אבחון ראשונית, חינם
                </a>
              </Button>
              <div className="flex gap-3 w-full sm:w-auto">
                <Button variant="outline" size="lg" onClick={scrollToROI} className="gap-2 px-5 md:px-8 py-5 md:py-6 flex-1 sm:flex-initial">
                  <Shield className="h-5 w-5 shrink-0" />
                  <span className="text-sm md:text-base">חשב עלות אי-העשייה</span>
                </Button>
                <Button variant="ghost" size="lg" className="gap-2 px-4 md:px-6 py-5 md:py-6" onClick={() => navigate("/dashboard")}>
                  <BarChart3 className="h-4 w-4 shrink-0" />
                  <span className="text-sm md:text-base">דשבורד</span>
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              15 דקות בוואטסאפ · אפס התחייבות · אפס מכירות
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.5 }, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
        aria-label="גלול למטה"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.button>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
