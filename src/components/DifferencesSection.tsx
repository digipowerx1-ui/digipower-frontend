import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const DifferencesSection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-sm text-brand-orange uppercase tracking-wide mb-4">
          The DigiPowerX Difference
        </h2>
        
        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
          Unmatched Performance, Flexibility, and Scale
        </h1>
        
        <p className="text-lg text-brand-gray max-w-4xl mx-auto mb-12">
          Vertically integrated AI and HPC infrastructure solutions combining cutting-edge technology, performance innovation, 
          and expertise that enables secure scalability on sovereign infrastructure or in the DigiPowerX Cloud.
        </p>

        <div className="flex justify-center mb-16">
          <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-3 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg group">
            Contact us
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>

        <div className="mb-12">
          <img 
            src="https://cdn.prod.website-files.com/673bd4e39d0fb4773ffa1054/68404818f80f36704e4fc56a_NVIDIA.svg" 
            alt="NVIDIA preferred partner"
            className="mx-auto h-8"
          />
        </div>

        <h3 className="text-2xl font-semibold text-brand-dark mb-12">
          Why customers choose DigiPowerX
        </h3>
      </div>
    </section>
  );
};

export default DifferencesSection;