import { HeroSection } from "@/components/landing/HeroSection";
import { PainSection } from "@/components/landing/PainSection";
import { DiagnosticSection } from "@/components/landing/DiagnosticSection";
import { BridgeSection } from "@/components/landing/BridgeSection";
import { SuccessStoriesCarousel } from "@/components/landing/SuccessStoriesCarousel";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { ArchitectSection } from "@/components/landing/ArchitectSection";
import { ROIEngine } from "@/components/landing/ROIEngine";
import { EthicsSection } from "@/components/landing/EthicsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingWhatsAppFAB } from "@/components/landing/WhatsAppFAB";
import { StickyNav } from "@/components/landing/StickyNav";
import { ScrollProgress } from "@/components/landing/ScrollProgress";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <StickyNav />
      <HeroSection />
      <DiagnosticSection />
      <PainSection />
      <BridgeSection />
      <SuccessStoriesCarousel />
      <HowItWorksSection />
      <ArchitectSection />
      <ROIEngine />
      <EthicsSection />
      <FAQSection />
      <LandingFooter />
      <LandingWhatsAppFAB />
    </div>
  );
};

export default Index;
