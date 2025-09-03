import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import datacenterHero from "@/assets/datacenter-hero.jpg";
import cloudHero from "@/assets/cloud-hero.jpg";
import fiberOptic from "@/assets/fiber-optic.jpg";

const CloudSection = () => {
  const cloudFeatures = [
    {
      image: datacenterHero,
      title: "Seamlessly scale GPU clusters from hundreds to tens of thousands of GPUs with no disruption.",
      linkText: "DigiPowerX Compute",
      href: "/cloud/compute"
    },
    {
      image: cloudHero,
      title: "Ultra-fast ethernet with up to 8,000Gbps per GPU node, enabling massive data throughput and faster training.",
      linkText: "DigiPowerX Networking",
      href: "/cloud/networking"
    },
    {
      image: fiberOptic,
      title: "Flexible reserved access options for your project or mission critical workload.",
      linkText: "DigiPowerX GPU Pricing",
      href: "/gpu-pricing"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-sm text-brand-orange uppercase tracking-wide mb-4">
            DigiPowerX Cloud
          </h2>
          
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6 animate-slide-up animation-delay-150">
            The GPU Cloud Built for Unmatched Performance
          </h1>
          
          <p className="text-lg text-brand-gray max-w-4xl mx-auto animate-fade-in animation-delay-300">
            Purpose-built GPU-as-a-Service for AI workloads. DigiPowerX combines NVIDIA GPUs, VAST/WEKA storage, 
            and ultra-fast Ethernet/IB, to deliver high-performance compute that scales with your business.
          </p>
        </div>

        <div className="space-y-16 animate-slide-up animation-delay-500">
          {cloudFeatures.map((feature, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-12 items-center group">
              <div className={`${index % 2 === 1 ? 'order-2' : ''} overflow-hidden rounded-lg`}>
                <img 
                  src={feature.image} 
                  alt={`Cloud feature ${index + 1}`}
                  className="w-full rounded-lg transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className={`${index % 2 === 1 ? 'order-1' : ''} animate-fade-in`}>
                <p className="text-lg text-brand-dark mb-8 leading-relaxed group-hover:text-brand-orange transition-colors duration-300">
                  {feature.title}
                </p>
                <Button 
                  variant="ghost" 
                  className="text-brand-dark hover:text-brand-orange font-medium group/btn p-0 hover:scale-105 transition-all duration-200"
                >
                  {feature.linkText}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CloudSection;