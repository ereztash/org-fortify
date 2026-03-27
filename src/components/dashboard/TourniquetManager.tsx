import { useCOR } from "@/contexts/CORContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Zap, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function TourniquetManager() {
  const { tourniquets, updateTourniquetStatus } = useCOR();

  const statusConfig = {
    pending: { label: "ממתין", icon: Clock, color: "bg-health-warning/15 text-health-warning border-health-warning/20" },
    active: { label: "פעיל", icon: Zap, color: "bg-health-optimal/15 text-health-optimal border-health-optimal/20" },
    resolved: { label: "טופל", icon: CheckCircle, color: "bg-health-stable/15 text-health-stable border-health-stable/20" },
  };

  const sorted = [...tourniquets].sort((a, b) => b.priority - a.priority);

  return (
    <Card className="glass-strong border-border/30 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      <CardHeader className="relative">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <ShieldAlert className="w-4 h-4 text-primary" />
          </div>
          Tourniquets
          <Badge variant="outline" className="mr-auto text-[10px] border-primary/20 text-primary bg-primary/5">
            {tourniquets.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        {sorted.length === 0 ? (
          <div className="text-center py-8 space-y-2">
            <ShieldAlert className="w-8 h-8 text-muted-foreground/30 mx-auto" />
            <p className="text-sm text-muted-foreground">
              אין tourniquets. הפעל ניתוח ASA וצור פעולות מניעתיות
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence>
              {sorted.map((t) => {
                const cfg = statusConfig[t.status];
                const Icon = cfg.icon;
                return (
                  <motion.div
                    key={t.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-background/30 border border-border/20 hover:border-border/40 transition-all duration-200"
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${cfg.color.split(' ')[0]}`}>
                      <Icon className="w-3.5 h-3.5 text-current" style={{ color: 'inherit' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{t.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={`text-[10px] ${cfg.color}`}>{cfg.label}</Badge>
                        <span className="text-[10px] text-muted-foreground">עדיפות: {t.priority}</span>
                      </div>
                    </div>
                    {t.status === "pending" && (
                      <Button size="sm" variant="ghost" className="text-xs text-primary hover:bg-primary/10" onClick={() => updateTourniquetStatus(t.id, "active")}>
                        הפעל
                      </Button>
                    )}
                    {t.status === "active" && (
                      <Button size="sm" variant="ghost" className="text-xs text-health-stable hover:bg-health-stable/10" onClick={() => updateTourniquetStatus(t.id, "resolved")}>
                        סגור
                      </Button>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
