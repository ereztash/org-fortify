import { useState } from "react";
import { useCOR } from "@/contexts/CORContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileText, Loader2, Download, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WHATSAPP_URL = "https://wa.me/972524545963?text=היי%20ארז%2C%20הפקתי%20הצעת%20מחיר%20ואשמח%20לדון%20בתוצאות";

export function QuoteEngine() {
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactName, setContactName] = useState("");
  const [loading, setLoading] = useState(false);
  const { roiParams, deltaPotential, aiRiskFactor, healthScore, insights, tourniquets } = useCOR();
  const { toast } = useToast();

  const generateQuote = async () => {
    if (!email.trim()) {
      toast({ title: "נדרש אימייל", description: "הזן כתובת אימייל לקבלת ההצעה", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      // Save lead
      await supabase.from("leads").insert({
        name: contactName || "לא צוין",
        email,
        phone: phone || null,
        org_name: orgName || null,
        delta_potential: deltaPotential,
      });

      // Generate quote
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
          Quote Engine: הצעת ספרינט
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="שם איש קשר" value={contactName} onChange={(e) => setContactName(e.target.value)} className="bg-background/50" />
          <Input placeholder="שם הארגון" value={orgName} onChange={(e) => setOrgName(e.target.value)} className="bg-background/50" />
        </div>
        <Input type="email" placeholder="אימייל *" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-background/50 text-left" dir="ltr" required />
        <Input type="tel" placeholder="טלפון (אופציונלי)" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-background/50 text-left" dir="ltr" />

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>הצעת מחיר: ₪{Math.round(deltaPotential * 0.15).toLocaleString()}</span>
          <span>15% מעלות אי-עשייה</span>
        </div>

        <div className="flex gap-3">
          <Button onClick={generateQuote} disabled={loading} className="flex-1 gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {loading ? "מייצר..." : "הפק הצעת מחיר"}
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" />
              דון עם ארז
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
