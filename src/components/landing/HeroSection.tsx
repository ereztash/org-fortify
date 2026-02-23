import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function HeroSection() {
  const navigate = useNavigate();
  const scrollToROI = () => {
    document.getElementById("roi-engine")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
        style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.08), transparent 70%)" }}
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full"
        style={{ background: "radial-gradient(circle, hsl(var(--health-optimal) / 0.06), transparent 70%)" }}
        animate={{ x: [0, -40, 20, 0], y: [0, 25, -35, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative z-10 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-muted-foreground"
          >
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            <span>COR-SYS v3.4 — אבחון מערכתי פעיל</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-tight"
          >
            <span className="text-foreground">מתקנים את </span>
            <motion.span
              className="text-primary inline-block"
              animate={{ textShadow: ["0 0 8px hsl(var(--primary) / 0)", "0 0 20px hsl(var(--primary) / 0.4)", "0 0 8px hsl(var(--primary) / 0)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              המבנה
            </motion.span>
            <br />
            <span className="text-muted-foreground text-3xl md:text-4xl lg:text-5xl">לא את הנפש.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            מערכת אבחון וחוסן ארגוני המבצעת התמרה אונטולוגית —
            מזהה כשלים מבניים, מחשבת עלות אי-עשייה, ומתקנת בזמן אמת.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Button size="lg" onClick={scrollToROI} className="gap-2 text-base px-8 py-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
              <Shield className="h-5 w-5" />
              חשב את עלות אי-העשייה
            </Button>
            <Button variant="ghost" size="lg" className="gap-2 text-muted-foreground" onClick={() => document.getElementById("architect")?.scrollIntoView({ behavior: "smooth" })}>
              הכר את הארכיטקט
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="gap-2" onClick={() => navigate("/dashboard")}>
              <BarChart3 className="h-4 w-4" />
              דשבורד מערכתי
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
