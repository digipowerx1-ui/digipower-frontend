import { Cpu, Zap, Settings, Headphones } from "lucide-react";

const FeaturesGrid = () => {
  const features = [
    {
      icon: Cpu,
      title: "Access to the latest advancements in hardware across the stack."
    },
    {
      icon: Zap,
      title: "Ultra-fast ethernet mesh network and cross-data center workload scaling."
    },
    {
      icon: Settings,
      title: "Proprietary cluster management, orchestration, and observability software."
    },
    {
      icon: Headphones,
      title: "Enterprise grade support and SLAs."
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex justify-center mb-4">
                <feature.icon className="h-8 w-8 text-brand-orange group-hover:scale-110 transition-transform duration-300" />
              </div>
              <p className="text-brand-dark leading-relaxed group-hover:text-brand-orange transition-colors duration-300">
                {feature.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;