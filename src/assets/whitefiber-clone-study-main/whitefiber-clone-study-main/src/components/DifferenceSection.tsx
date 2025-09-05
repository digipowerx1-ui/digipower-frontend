import { Button } from "@/components/ui/button";
import nvidiaLogo from "@/assets/nvidia-logo.svg";

const DifferenceSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        {/* Section Title */}
        <p className="text-whitefiber-light-gray text-sm uppercase tracking-widest mb-4">
          The WhiteFiber Difference
        </p>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-whitefiber-dark mb-8">
          Unmatched Performance, Flexibility, and Scale
        </h2>

        {/* Description */}
        <p className="text-xl text-whitefiber-light-gray max-w-4xl mx-auto mb-12 leading-relaxed">
          Vertically integrated AI and HPC infrastructure solutions combining cutting-edge technology, 
          performance innovation, and expertise that enables secure scalability on sovereign 
          infrastructure or in the WhiteFiber Cloud.
        </p>

        {/* CTA and Partner Logo */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <Button 
            size="lg"
            className="bg-whitefiber-dark text-white hover:bg-whitefiber-dark/90 px-8 py-3 text-lg font-medium"
          >
            Contact us
          </Button>
          
          <div className="flex items-center">
            <img 
              src={nvidiaLogo} 
              alt="NVIDIA Preferred Partner"
              className="h-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;