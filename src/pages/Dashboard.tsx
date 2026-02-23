import { useCOR } from "@/contexts/CORContext";
import { TrendingUp } from "lucide-react";
import { HealthGauge } from "@/components/dashboard/HealthGauge";
import { ASAEngine } from "@/components/dashboard/ASAEngine";
import { TourniquetManager } from "@/components/dashboard/TourniquetManager";
import { GanttChart } from "@/components/dashboard/GanttChart";
import { GlassBoxLog } from "@/components/dashboard/GlassBoxLog";
import { QuoteEngine } from "@/components/dashboard/QuoteEngine";

const Dashboard = () => {
  const { deltaPotential, healthLevel } = useCOR();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 px-6 py-4">
        <div className="container max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground font-display">
            COR-SYS <span className="text-primary">Command Center</span>
          </h1>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto p-6 space-y-6">
        {/* Top row — Health + Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass rounded-2xl p-6 flex items-center justify-center">
            <HealthGauge />
          </div>
          <div className="glass rounded-2xl p-6 col-span-1 md:col-span-2 flex items-center gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">עלות אי-עשייה שנתית</p>
              <div className="flex items-baseline gap-2">
                <TrendingUp className="w-5 h-5 text-destructive" />
                <span className="text-3xl font-bold font-display text-foreground">
                  ₪{deltaPotential.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                מצב מערכתי: <span className="text-primary font-medium">{healthLevel}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ASAEngine />
          <TourniquetManager />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GanttChart />
          <GlassBoxLog />
        </div>

        {/* Quote Engine */}
        <QuoteEngine />
      </main>
    </div>
  );
};

export default Dashboard;
