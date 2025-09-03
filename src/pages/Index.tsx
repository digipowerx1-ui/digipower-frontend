// Update this page (the content is just a fallback if you fail to update the page)

import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HardwareShowcase from "@/components/HardwareShowcase";
import DifferencesSection from "@/components/DifferencesSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import DataCenterSection from "@/components/DataCenterSection";
import CloudSection from "@/components/CloudSection";
import IntegratedSolutions from "@/components/IntegratedSolutions";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />
      <HeroSection />
      <HardwareShowcase />
      <DifferencesSection />
      <FeaturesGrid />
      <DataCenterSection />
      <CloudSection />
      <IntegratedSolutions />
      <Footer />
    </div>
  );
};

export default Index;
