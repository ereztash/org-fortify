import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, ChevronDown, Shield, Award, TrendingUp, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useTransform, useScroll } from "framer-motion";
import erezPhoto from "@/assets/erez-profile.png";

const WHATSAPP_URL = "https://wa.me/972524545963?text=היי%20ארז%2C%20אשמח%20לשיחת%20אבחון%20ראשונית";

const headlines = [
  { main: "החברה שלך בנויה על גיבורים?", sub: "זו בעיה.", persona: "CEO / מייסד" },
  { main: "בדקתי 100+ ארגונים.", sub: "חצי מהם היו על סף קריסה.", persona: "COO / VP Ops" },
  { main: "בוא נבדוק את יציבות הארגון שלך", sub: "תוך 14 יום.", persona: "CTO / VP R&D" },
  { main: "כמה עולה לך חוסר יציבות ארגונית?", sub: "בוא נדבר מספרים.", persona: "CFO / סמנכ״ל כספים" },
  { main: "העובדים הטובים עוזבים ראשונים.", sub: "זה לא מקרי.", persona: "VP HR / People" },
];

export function HeroSection() {
  const navigate = useNavigate();
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const orbX1 = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const orbY1 = useTransform(mouseY, [-0.5, 0.5], [-15, 15]);
  const orbX2 = useTransform(mouseX, [-0.5, 0.5], [15, -15]);
  const orbY2 = useTransform(mouseY, [-0.5, 0.5], [10, -10]);

  const scrollToDiagnostic = () => {
    document.getElementById("diagnostic-section")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToNext = () => {
    document.getElementById("diagnostic-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity: heroOpacity, scale: heroScale }}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-4 sm:px-6 scroll-mt-20 noise-overlay"
    >
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--primary) / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Interactive orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(160 84% 39% / 0.08), transparent 60%)",
          x: orbX1,
          y: orbY1,
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(210 92% 56% / 0.05), transparent 60%)",
          x: orbX2,
          y: orbY2,
        }}
        animate={{ scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Radial gradient vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_75%)]" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          {/* Profile photo with glow ring */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/40 via-primary/10 to-transparent blur-sm" />
              <img
                src={erezPhoto}
                alt="ארז טל שיר, מומחה לחוסן ארגוני"
                className="relative h-20 w-20 md:h-28 md:w-28 rounded-full object-cover border-2 border-primary/40 shadow-lg shadow-primary/20"
              />
            </div>
          </motion.div>

          {/* Status + persona badge combined */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="inline-flex items-center gap-2 glass-strong rounded-full px-4 py-2 text-xs md:text-sm text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span>מומחה לחוסן ארגוני ויציבות מערכתית</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.span
                key={headlineIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="text-xs font-medium text-primary/70"
              >
                רלוונטי עבורך: {headlines[headlineIndex].persona}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Rotating headline */}
          <div className="min-h-[130px] md:min-h-[180px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={headlineIndex}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-[1.1]"
              >
                <span className="text-foreground">{headlines[headlineIndex].main}</span>
                <br />
                <span className="gradient-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 inline-block">
                  {headlines[headlineIndex].sub}
                </span>
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            14 יום שמשנים את התמונה. לא עוד ייעוץ רגיל —{" "}
            <span className="text-foreground font-medium">בדיקה מעמיקה ותיקון ממוקד.</span>
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              { icon: Award, text: "ניתחתי 100+ ארגונים" },
              { icon: TrendingUp, text: "+67% הכנסות בסניף קמעונאי" },
            ].map((badge) => (
              <div key={badge.text} className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs text-muted-foreground bg-secondary/50 border border-border/30">
                <badge.icon className="h-3.5 w-3.5 text-primary" />
                {badge.text}
              </div>
            ))}
          </motion.div>

          {/* Simplified CTA - 2 buttons max */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col items-center gap-4 pt-4"
          >
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full sm:w-auto">
              <Button
                size="lg"
                onClick={scrollToDiagnostic}
                className="gap-3 text-base md:text-lg px-8 md:px-10 py-6 md:py-7 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-[1.03] glow-primary w-full sm:w-auto"
              >
                <Activity className="h-5 w-5" />
                בצע אבחון מיידי, חינם
              </Button>
              <Button variant="outline" size="lg" asChild className="gap-2 px-6 md:px-8 py-5 md:py-6 border-border/50 hover:border-primary/40 transition-all w-full sm:w-auto">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 shrink-0" />
                  <span>שיחה ישירה עם ארז</span>
                </a>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground/70">
              90 שניות · ללא הרשמה · תקבל תוצאה מיידית
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/50 hover:text-primary transition-colors"
        aria-label="גלול למטה"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.button>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/50 to-transparent" />
    </motion.section>
  );
}
