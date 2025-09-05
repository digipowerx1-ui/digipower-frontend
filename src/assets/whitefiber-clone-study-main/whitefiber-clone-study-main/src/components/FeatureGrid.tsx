import chipIcon from "@/assets/chip-icon.svg";
import boltIcon from "@/assets/bolt-icon.svg";
import headsetIcon from "@/assets/headset-icon.svg";

const FeatureGrid = () => {
  const features = [
    {
      icon: chipIcon,
      description: "Access to the latest advancements in hardware across the stack."
    },
    {
      icon: boltIcon,
      description: "Ultra-fast ethernet mesh network and cross-data center workload scaling."
    },
    {
      icon: boltIcon,
      description: "Proprietary cluster management, orchestration, and observability software."
    },
    {
      icon: headsetIcon,
      description: "Enterprise grade support and SLAs."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <p className="text-whitefiber-light-gray text-sm uppercase tracking-widest mb-4">
            Why customers choose WhiteFiber
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <img 
                  src={feature.icon} 
                  alt={feature.description}
                  className="w-12 h-12"
                />
              </div>

              {/* Description */}
              <p className="text-whitefiber-light-gray leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;