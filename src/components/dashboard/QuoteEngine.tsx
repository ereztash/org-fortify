import { useState } from "react";
import { useCOR } from "@/contexts/CORContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileText, Loader2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function QuoteEngine() {
  const [orgName, setOrgName] = useState("");
  const [loading, setLoading] = useState(false);
  const { roiParams, deltaPotential, aiRiskFactor, healthScore, insights, tourniquets } = useCOR();
  const { toast } = useToast();

  const generateQuote = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-quote", {
        body: {
          orgName,
          roiParams,
          deltaPotential,
          aiRiskFactor,
          healthScore,
          insights: insights.map((i) => ({ content: i.content, weight: i.weight })),
          tourniquets: tourniquets.map((t) => ({ title: t.title, priority: t.priority, status: t.status })),
        },
      });

      if (error) throw error;

      // Open HTML quote in new tab for printing/PDF
      const blob = new Blob([data], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      toast({ title: "הצעה נוצרה", description: "ניתן להדפיס או לשמור כ-PDF" });
    } catch (e: any) {
      toast({ title: "שגיאה", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass border-border/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Quote Engine — הצעת ספרינט
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="שם הארגון"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          className="bg-background/50"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>הצעת מחיר: ₪{Math.round(deltaPotential * 0.15).toLocaleString()}</span>
          <span>15% מעלות אי-עשייה</span>
        </div>
        <Button onClick={generateQuote} disabled={loading} className="w-full gap-2">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          {loading ? "מייצר..." : "הפק הצעת מחיר"}
        </Button>
      </CardContent>
    </Card>
  );
}
