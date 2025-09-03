import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const DataCenterSection = () => {
  const features = [
    "Custom design and colocation services with access to cutting-edge hardware.",
    "Cross-data center dark fiber connectivity for redundancy and scale.",
    "Strategic data center footprint to support global deployment strategies."
  ];

  return (
    <section className="py-20 px-4 bg-brand-light-gray">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <div className="mb-6">
            <svg className="mx-auto h-12 w-12 text-[#123F55] animate-scale-in" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3"/>
              <circle cx="12" cy="4" r="2" fill="currentColor"/>
              <circle cx="12" cy="20" r="2" fill="currentColor"/>
              <circle cx="4" cy="12" r="2" fill="currentColor"/>
              <circle cx="20" cy="12" r="2" fill="currentColor"/>
            </svg>
          </div>
          
          <h2 className="text-sm text-[#123F55] uppercase tracking-wide mb-4">
            DigiPowerX Data Centers
          </h2>
          
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6 animate-slide-up animation-delay-150">
            World-Class Data Centers Engineered for HPC & Private AI
          </h1>
          
          <p className="text-lg text-brand-gray max-w-4xl mx-auto mb-12 animate-fade-in animation-delay-300">
            DigiPowerX Data Centers provide AI and HPC optimized colocation, tailored racks, and managed infrastructure 
            with high-density power, direct liquid cooling, and accelerated deployment timelines.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6 mb-12 animate-slide-up animation-delay-300">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 group hover:translate-x-2 transition-transform duration-300">
              <Check className="h-6 w-6 text-green-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-brand-dark leading-relaxed group-hover:text-brand-orange transition-colors duration-300">{feature}</p>
            </div>
          ))}
        </div>

        <div className="text-center animate-fade-in animation-delay-500">
          <Button className="text-[#123F55] hover:bg-brand-white-hover text-white px-8 py-3 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
            DigiPowerX Data Center
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DataCenterSection;