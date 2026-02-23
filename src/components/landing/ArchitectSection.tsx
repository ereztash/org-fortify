import { Card, CardContent } from "@/components/ui/card";
import { Layers, Target, Wrench } from "lucide-react";

export function ArchitectSection() {
  return (
    <section id="architect" className="py-24 px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="glass rounded-2xl p-8 md:p-12 space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <p className="text-sm text-primary font-medium tracking-wider uppercase">Meet the Architect</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display">
              The Social Technologist
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              עובד סוציאלי מהמסורת המערכתית-קהילתית. מומחה לחוסן ארגוני.
              המיקוד: תיקון ארכיטקטורת הזרימה — לא טיפול פרטני.
            </p>
          </div>

          {/* Principles */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: Target,
                title: "אבחון מבני",
                desc: "זיהוי סטיות מנורמליזציה, סתירות לוגיות וכשלי עומק בארכיטקטורה הארגונית.",
              },
              {
                icon: Layers,
                title: "התמרה אונטולוגית",
                desc: "שינוי מהותי של מערכות הפעלה ארגוניות — לא קוסמטיקה.",
              },
              {
                icon: Wrench,
                title: "חוסמי עורקים",
                desc: "פעולות מניעתיות מדויקות שמונעות דימום ארגוני לפני שמתחיל.",
              },
            ].map((item) => (
              <Card key={item.title} className="bg-secondary/50 border-border/50">
                <CardContent className="p-6 space-y-3">
                  <item.icon className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold font-display">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Signature */}
          <div className="border-t border-border/50 pt-6">
            <p className="text-sm text-muted-foreground italic">
              "צריך גלגל — אני גלגל. אפס פוזה."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
