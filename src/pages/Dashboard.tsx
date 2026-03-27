import { useCOR } from "@/contexts/CORContext";
import { TrendingUp, ArrowRight, Activity, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HealthGauge } from "@/components/dashboard/HealthGauge";
import { ASAEngine } from "@/components/dashboard/ASAEngine";
import { TourniquetManager } from "@/components/dashboard/TourniquetManager";
import { GanttChart } from "@/components/dashboard/GanttChart";
import { GlassBoxLog } from "@/components/dashboard/GlassBoxLog";
import { QuoteEngine } from "@/components/dashboard/QuoteEngine";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { WhatsAppFAB } from "@/components/dashboard/WhatsAppFAB";
import { ROISliders } from "@/components/dashboard/ROISliders";
import { BenchmarkingEngine } from "@/components/dashboard/BenchmarkingEngine";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const Dashboard = () => {
  const { deltaPotential, healthLevel, jQuotient, healthScore } = useCOR();
  const navigate = useNavigate();

  const healthColorMap: Record<string, string> = {
    critical: "from-red-500/20 to-red-900/5",
    warning: "from-amber-500/20 to-amber-900/5",
    stable: "from-emerald-500/20 to-emerald-900/5",
    optimal: "from-blue-500/20 to-blue-900/5",
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-radial ${healthColorMap[healthLevel]} blur-3xl opacity-40`} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-radial from-primary/10 to-transparent blur-3xl opacity-30" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/30 backdrop-blur-xl bg-background/60">
        <div className="container max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Activity className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground font-display tracking-tight">
                COR-SYS <span className="gradient-text">Command Center</span>
              </h1>
              <p className="text-[10px] text-muted-foreground">Resilience Intelligence Platform</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
            חזרה לדף הבית
          </Button>
        </div>
      </header>

      <motion.main
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 container max-w-7xl mx-auto p-6 space-y-6"
      >
        {/* Profile */}
        <motion.div variants={fadeUp}>
          <ProfileCard />
        </motion.div>

        {/* Top row: Health + Summary KPIs */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-strong rounded-2xl p-6 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <div className="relative z-10">
              <HealthGauge />
            </div>
          </div>

          <div className="glass-strong rounded-2xl p-6 col-span-1 md:col-span-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="space-y-3 flex-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">עלות אי-עשייה שנתית</p>
                <div className="flex items-baseline gap-3">
                  <TrendingUp className="w-6 h-6 text-destructive" />
                  <span className="text-4xl md:text-5xl font-bold font-display text-foreground tracking-tight">
                    ₪{deltaPotential.toLocaleString("he-IL", { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
                    <Shield className="w-3 h-3" />
                    J-Quotient: {jQuotient.toFixed(2)}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
                    <Zap className="w-3 h-3" />
                    מצב: {healthLevel}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-muted border border-border/30 text-muted-foreground">
                    Health Score: {Math.round(healthScore)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main grid */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ASAEngine />
          <TourniquetManager />
        </motion.div>

        <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GanttChart />
          <GlassBoxLog />
        </motion.div>

        {/* Benchmarking */}
        <motion.div variants={fadeUp}>
          <BenchmarkingEngine />
        </motion.div>

        {/* ROI Sliders + Quote Engine */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ROISliders />
          <QuoteEngine />
        </motion.div>
      </motion.main>

      <WhatsAppFAB />
    </div>
  );
};
export default Dashboard;
