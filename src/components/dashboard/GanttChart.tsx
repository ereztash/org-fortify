import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

const phases = [
  { name: "Diagnostic", days: [1, 2, 3], color: "bg-health-warning", glow: "shadow-amber-500/20" },
  { name: "Engineering", days: [4, 5, 6, 7], color: "bg-health-optimal", glow: "shadow-blue-500/20" },
  { name: "Tourniquet", days: [8, 9, 10, 11], color: "bg-primary", glow: "shadow-primary/20" },
  { name: "Validation", days: [12, 13, 14], color: "bg-health-stable", glow: "shadow-emerald-500/20" },
];

export function GanttChart() {
  return (
    <Card className="glass-strong border-border/30 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-health-optimal/5 to-transparent pointer-events-none" />
      <CardHeader className="relative">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-health-optimal/10 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-health-optimal" />
          </div>
          ספרינט 14 יום
        </CardTitle>
      </CardHeader>
      <CardContent className="relative space-y-4">
        {phases.map((phase, phaseIdx) => (
          <motion.div
            key={phase.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: phaseIdx * 0.1, duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <span className="text-xs text-muted-foreground w-20 text-left shrink-0 font-medium">{phase.name}</span>
            <div className="flex-1 flex gap-0.5">
              {Array.from({ length: 14 }, (_, i) => {
                const day = i + 1;
                const active = phase.days.includes(day);
                return (
                  <motion.div
                    key={day}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: phaseIdx * 0.1 + i * 0.02, duration: 0.3 }}
                    className={`h-7 flex-1 rounded-sm transition-all duration-300 ${
                      active
                        ? `${phase.color} shadow-sm ${phase.glow}`
                        : "bg-muted/20 hover:bg-muted/30"
                    }`}
                    title={`יום ${day}`}
                  />
                );
              })}
            </div>
          </motion.div>
        ))}
        <div className="flex justify-between text-[10px] text-muted-foreground/60 pt-2 px-[86px]">
          <span>יום 1</span>
          <span>יום 7</span>
          <span>יום 14</span>
        </div>
      </CardContent>
    </Card>
  );
}
