import { Button } from "@/components/ui/button";
import dotsIcon from "@/assets/dots-icon.svg";
import checkmarkIcon from "@/assets/checkmark-icon.svg";

const DataCenterSection = () => {
  const features = [
    "Custom design and colocation services with access to cutting-edge hardware.",
    "Cross-data center dark fiber connectivity for redundancy and scale.",
    "Strategic data center footprint to support global deployment strategies."
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Dots Icon */}
          <div className="flex justify-center mb-8">
            <img 
              src={dotsIcon} 
              alt="Decorative dots"
              className="w-16 h-16"
            />
          </div>

          {/* Section Title */}
          <div className="text-center mb-8">
            <p className="text-whitefiber-light-gray text-sm uppercase tracking-widest mb-4">
              WhiteFiber Data Centers
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-whitefiber-dark mb-8">
              World-Class Data Centers Engineered for HPC & Private AI
            </h2>
            <p className="text-xl text-whitefiber-light-gray leading-relaxed mb-12">
              WhiteFiber Data Centers provide AI and HPC optimized colocation, tailored racks, 
              and managed infrastructure with high-density power, direct liquid cooling, 
              and accelerated deployment timelines.
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <img 
                  src={checkmarkIcon} 
                  alt="Checkmark"
                  className="w-6 h-6 mr-4 mt-1 flex-shrink-0"
                />
                <p className="text-whitefiber-light-gray leading-relaxed">
                  {feature}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button 
              variant="outline"
              size="lg"
              className="border-whitefiber-dark text-whitefiber-dark hover:bg-whitefiber-dark hover:text-white px-8 py-3"
            >
              WhiteFiber Data Center
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataCenterSection;