import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();
  const scrollToROI = () => {
    document.getElementById("roi-engine")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container relative z-10 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            <span>COR-SYS v3.4 — אבחון מערכתי פעיל</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-tight">
            <span className="text-foreground">מתקנים את </span>
            <span className="text-primary">המבנה</span>
            <br />
            <span className="text-muted-foreground text-3xl md:text-4xl lg:text-5xl">לא את הנפש.</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            מערכת אבחון וחוסן ארגוני המבצעת התמרה אונטולוגית —
            מזהה כשלים מבניים, מחשבת עלות אי-עשייה, ומתקנת בזמן אמת.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" onClick={scrollToROI} className="gap-2 text-base px-8 py-6">
              <Shield className="h-5 w-5" />
              חשב את עלות אי-העשייה
            </Button>
            <Button variant="ghost" size="lg" className="gap-2 text-muted-foreground" onClick={() => document.getElementById("architect")?.scrollIntoView({ behavior: "smooth" })}>
              הכר את הארכיטקט
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="gap-2" onClick={() => navigate("/dashboard")}>
              <BarChart3 className="h-4 w-4" />
              דשבורד מערכתי
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
