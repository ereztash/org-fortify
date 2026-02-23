import { HeroSection } from "@/components/landing/HeroSection";
import { PainSection } from "@/components/landing/PainSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { ArchitectSection } from "@/components/landing/ArchitectSection";
import { ROIEngine } from "@/components/landing/ROIEngine";
import { EthicsSection } from "@/components/landing/EthicsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingWhatsAppFAB } from "@/components/landing/WhatsAppFAB";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <PainSection />
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
