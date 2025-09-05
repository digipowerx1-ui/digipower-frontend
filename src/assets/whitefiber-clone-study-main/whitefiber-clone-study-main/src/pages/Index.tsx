import TopBanner from "@/components/TopBanner";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServiceCards from "@/components/ServiceCards";
import HardwareGallery from "@/components/HardwareGallery";
import DifferenceSection from "@/components/DifferenceSection";
import FeatureGrid from "@/components/FeatureGrid";
import DataCenterSection from "@/components/DataCenterSection";
import CloudSection from "@/components/CloudSection";
import IntegratedSolutions from "@/components/IntegratedSolutions";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBanner />
      <Navigation />
      <HeroSection />
      <ServiceCards />
      <HardwareGallery />
      <DifferenceSection />
      <FeatureGrid />
      <DataCenterSection />
      <CloudSection />
      <IntegratedSolutions />
      <CTASection />
    </div>
  );
};

export default Index;
