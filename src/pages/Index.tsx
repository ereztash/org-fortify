import { useState } from "react";
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
import { IntroAnimation } from "@/components/landing/IntroAnimation";
import { useScrollDepth, useSectionVisibility } from "@/hooks/useScrollDepth";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  useScrollDepth();

  // Section visibility — fired once per section per session
  useSectionVisibility("hero-section", "Hero");
  useSectionVisibility("diagnostic-section", "Diagnostic");
  useSectionVisibility("pain-section", "Pain");
  useSectionVisibility("bridge-section", "Bridge");
  useSectionVisibility("success-stories", "SuccessStories");
  useSectionVisibility("how-it-works", "HowItWorks");
  useSectionVisibility("roi-engine", "ROIEngine");
  useSectionVisibility("faq-section", "FAQ");

  return (
    <>
      {!introComplete && <IntroAnimation onComplete={() => setIntroComplete(true)} />}
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
    </>
  );
};

export default Index;
