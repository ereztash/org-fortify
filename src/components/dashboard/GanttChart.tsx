import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const phases = [
  { name: "Diagnostic", days: [1, 2, 3], color: "bg-amber-500/60" },
  { name: "Engineering", days: [4, 5, 6, 7], color: "bg-blue-500/60" },
  { name: "Tourniquet", days: [8, 9, 10, 11], color: "bg-primary/60" },
  { name: "Validation", days: [12, 13, 14], color: "bg-emerald-500/60" },
];

export function GanttChart() {
  return (
    <Card className="glass border-border/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          ספרינט 14 יום
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {phases.map((phase) => (
          <div key={phase.name} className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-20 text-left shrink-0">{phase.name}</span>
            <div className="flex-1 flex gap-0.5">
              {Array.from({ length: 14 }, (_, i) => {
                const day = i + 1;
                const active = phase.days.includes(day);
                return (
                  <div
                    key={day}
                    className={`h-6 flex-1 rounded-sm transition-colors ${active ? phase.color : "bg-muted/30"}`}
                    title={`יום ${day}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
        <div className="flex justify-between text-xs text-muted-foreground pt-1">
          <span>יום 1</span>
          <span>יום 14</span>
        </div>
      </CardContent>
    </Card>
  );
}
