import { useCOR } from "@/contexts/CORContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Zap } from "lucide-react";

export function TourniquetManager() {
  const { tourniquets, updateTourniquetStatus } = useCOR();

  const statusConfig = {
    pending: { label: "ממתין", icon: Clock, color: "bg-amber-500/20 text-amber-400" },
    active: { label: "פעיל", icon: Zap, color: "bg-blue-500/20 text-blue-400" },
    resolved: { label: "טופל", icon: CheckCircle, color: "bg-emerald-500/20 text-emerald-400" },
  };

  const sorted = [...tourniquets].sort((a, b) => b.priority - a.priority);

  return (
    <Card className="glass border-border/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Tourniquets
          <Badge variant="outline" className="mr-auto text-xs">{tourniquets.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            אין tourniquets — הפעל ניתוח ASA וצור פעולות מניעתיות
          </p>
        ) : (
          <div className="space-y-3">
            {sorted.map((t) => {
              const cfg = statusConfig[t.status];
              const Icon = cfg.icon;
              return (
                <div
                  key={t.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/30"
                >
                  <Icon className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{t.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className={`text-xs ${cfg.color}`}>{cfg.label}</Badge>
                      <span className="text-xs text-muted-foreground">עדיפות: {t.priority}</span>
                    </div>
                  </div>
                  {t.status === "pending" && (
                    <Button size="sm" variant="ghost" className="text-xs" onClick={() => updateTourniquetStatus(t.id, "active")}>
                      הפעל
                    </Button>
                  )}
                  {t.status === "active" && (
                    <Button size="sm" variant="ghost" className="text-xs" onClick={() => updateTourniquetStatus(t.id, "resolved")}>
                      סגור
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
