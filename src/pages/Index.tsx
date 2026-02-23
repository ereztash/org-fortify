import { HeroSection } from "@/components/landing/HeroSection";
import { PainSection } from "@/components/landing/PainSection";
import { BridgeSection } from "@/components/landing/BridgeSection";
import { SocialProofSection } from "@/components/landing/SocialProofSection";
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
      <PainSection />
      <BridgeSection />
      <SocialProofSection />
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
