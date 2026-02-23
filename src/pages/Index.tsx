import { HeroSection } from "@/components/landing/HeroSection";
import { ArchitectSection } from "@/components/landing/ArchitectSection";
import { ROIEngine } from "@/components/landing/ROIEngine";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ArchitectSection />
      <ROIEngine />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="container max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>COR-SYS v3.4 — מערכת אבחון וחוסן ארגוני</p>
          <p className="mt-1">המערכת מסנכרנת חוסן.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
