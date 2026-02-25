import { useCOR } from "@/contexts/CORContext";
import { TrendingUp, ArrowRight } from "lucide-react";
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
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const Dashboard = () => {
  const { deltaPotential, healthLevel, jQuotient } = useCOR();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 px-6 py-4">
        <div className="container max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground font-display">
            COR-SYS <span className="text-primary">Command Center</span>
          </h1>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2">
            <ArrowRight className="h-4 w-4" />
            חזרה לדף הבית
          </Button>
        </div>
      </header>

      <motion.main
        variants={stagger}
        initial="hidden"
        animate="show"
        className="container max-w-7xl mx-auto p-6 space-y-6"
      >
        <ProfileCard />

        {/* Top row — Health + Summary */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass rounded-2xl p-6 flex items-center justify-center">
            <HealthGauge />
          </div>
          <div className="glass rounded-2xl p-6 col-span-1 md:col-span-2 flex items-center gap-6">
            <div className="space-y-2 flex-1">
              <p className="text-sm text-muted-foreground">עלות אי-עשייה שנתית</p>
              <div className="flex items-baseline gap-2">
                <TrendingUp className="w-5 h-5 text-destructive" />
                <span className="text-3xl font-bold font-display text-foreground">
                  ₪{deltaPotential.toLocaleString("he-IL", { maximumFractionDigits: 0 })}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                J-Quotient: <span className="text-primary font-medium">{jQuotient.toFixed(2)}</span>
                {" · "}
                מצב: <span className="text-primary font-medium">{healthLevel}</span>
              </p>
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
