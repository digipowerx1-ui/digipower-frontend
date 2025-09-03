import datacenterHero from "@/assets/datacenter-hero.jpg";
import cloudHero from "@/assets/cloud-hero.jpg";
import hardware1 from "@/assets/hardware-1.jpg";
import fiberOptic from "@/assets/fiber-optic.jpg";

const HardwareShowcase = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="aspect-square overflow-hidden rounded-lg group cursor-pointer">
            <img 
              src={datacenterHero} 
              alt="Data center hardware" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="aspect-square overflow-hidden rounded-lg group cursor-pointer">
            <img 
              src={cloudHero} 
              alt="Cloud infrastructure" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="aspect-square overflow-hidden rounded-lg group cursor-pointer">
            <img 
              src={hardware1} 
              alt="NVIDIA hardware" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="aspect-square overflow-hidden rounded-lg group cursor-pointer">
            <img 
              src={fiberOptic} 
              alt="Fiber optic cables" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HardwareShowcase;