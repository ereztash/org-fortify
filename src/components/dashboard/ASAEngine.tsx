import { useState } from "react";
import { useCOR } from "@/contexts/CORContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, Loader2, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIInsight {
  content: string;
  weight: number;
  type: "normalization" | "contradiction" | "structural_failure";
}

const guidedQuestions = [
  "תאר את תהליך קבלת ההחלטות בארגון שלך: מי מחליט, כמה זמן לוקח, ומה קורה כשיש חילוקי דעות?",
  "כמה חריגות בטיחות / תפעול אושרו בחודש האחרון? האם יש דפוס חוזר?",
  "איזה מסרים אתם משדרים לשוק, ומה צוותי הפיתוח עושים בפועל? יש פער?",
];

export function ASAEngine({ orgId }: { orgId?: string }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AIInsight[]>([]);
  const { addInsight, addTourniquet } = useCOR();
  const { toast } = useToast();

  const analyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("asa-analyze", {
        body: { text, org_id: orgId || "demo" },
      });
      if (error) throw error;
      const insights: AIInsight[] = data?.insights || [];
      setResults(insights);

      insights.forEach((ins, i) => {
        addInsight({
          id: `ins-${Date.now()}-${i}`,
          content: ins.content,
          weight: ins.weight,
          source: "asa",
          type: ins.type,
          createdAt: new Date(),
        });
      });
    } catch (e: any) {
      toast({ title: "שגיאת ניתוח", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const convertToTourniquet = (insight: AIInsight, index: number) => {
    addTourniquet({
      id: `tq-${Date.now()}-${index}`,
      title: insight.content,
      priority: Math.round(insight.weight * 10),
      status: "pending",
      linkedInsightId: `ins-${index}`,
    });
    toast({ title: "Tourniquet נוצר", description: "התובנה הומרה לפעולה מניעתית" });
  };

  const typeLabels: Record<string, string> = {
    normalization: "נרמול סטייה",
    contradiction: "סתירה",
    structural_failure: "כשל מבני",
  };

  const typeColors: Record<string, string> = {
    normalization: "bg-amber-500/20 text-amber-400",
    contradiction: "bg-red-500/20 text-red-400",
    structural_failure: "bg-rose-500/20 text-rose-400",
  };

  return (
    <div className="space-y-6">
      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="w-5 h-5 text-primary" />
            ASA: ניתוח סוקרטי כפול-עדשה
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Guided Questions */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">שאלות מנחות, לחץ כדי להוסיף לניתוח:</p>
            <div className="flex flex-wrap gap-2">
              {guidedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setText((prev) => prev ? `${prev}\n\n${q}` : q)}
                  className="text-xs text-right px-3 py-2 rounded-lg bg-primary/5 border border-primary/10 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors max-w-xs"
                >
                  {q.slice(0, 60)}...
                </button>
              ))}
            </div>
          </div>

          <Textarea
            placeholder="הדבק טקסט ארגוני לניתוח: פרוטוקול ישיבה, דוח, תלונה, או ענה על השאלות המנחות..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[120px] bg-background/50"
          />
          <Button onClick={analyze} disabled={loading || !text.trim()} className="gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
            {loading ? "מנתח..." : "הפעל ניתוח"}
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">הבזקי תובנה</h3>
          {results.map((insight, i) => (
            <Card key={i} className="glass border-border/50">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm text-foreground leading-relaxed">{insight.content}</p>
                  <Badge variant="outline" className={typeColors[insight.type]}>
                    {typeLabels[insight.type]}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${insight.weight * 100}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{(insight.weight * 100).toFixed(0)}%</span>
                  </div>
                  <Button size="sm" variant="ghost" className="gap-1 text-xs text-primary hover:text-primary" onClick={() => convertToTourniquet(insight, i)}>
                    <Zap className="w-3 h-3" />
                    הפוך ל-Tourniquet
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
