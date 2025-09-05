import { Button } from "@/components/ui/button";
import gpuCluster from "@/assets/gpu-cluster.avif";
import gpuRoom from "@/assets/gpu-room.avif";
import fiberOptic from "@/assets/fiber-optic.avif";
import arrowWhite from "@/assets/arrow-white.svg";

const CloudSection = () => {
  const cloudFeatures = [
    {
      image: gpuCluster,
      title: "Seamless GPU Scaling",
      description: "Seamlessly scale GPU clusters from hundreds to tens of thousands of GPUs with no disruption.",
      cta: "WhiteFiber Compute",
      link: "/cloud/compute"
    },
    {
      image: gpuRoom,
      title: "Ultra-Fast Ethernet",
      description: "Ultra-fast ethernet with up to 8,000Gbps per GPU node, enabling massive data throughput and faster training.",
      cta: "WhiteFiber Networking",
      link: "/cloud/networking"
    },
    {
      image: fiberOptic,
      title: "Flexible Access",
      description: "Flexible reserved access options for your project or mission critical workload.",
      cta: "WhiteFiber GPU Pricing",
      link: "/gpu-pricing"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-whitefiber-light-gray text-sm uppercase tracking-widest mb-4">
            WhiteFiber Cloud
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-whitefiber-dark mb-8">
            The GPU Cloud Built for Unmatched Performance
          </h2>
          <p className="text-xl text-whitefiber-light-gray max-w-4xl mx-auto leading-relaxed">
            Purpose-built GPU-as-a-Service for AI workloads. WhiteFiber combines NVIDIA GPUs, 
            VAST/WEKA storage, and ultra-fast Ethernet/IB, to deliver high-performance compute 
            that scales with your business.
          </p>
        </div>

        {/* Cloud Features */}
        <div className="space-y-16">
          {cloudFeatures.map((feature, index) => (
            <div 
              key={index} 
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className="flex-1">
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <p className="text-xl text-whitefiber-light-gray leading-relaxed mb-8">
                  {feature.description}
                </p>
                
                <Button 
                  variant="outline"
                  className="border-whitefiber-dark text-whitefiber-dark hover:bg-whitefiber-dark hover:text-white group inline-flex items-center"
                >
                  {feature.cta}
                  <img 
                    src={arrowWhite} 
                    alt="Arrow"
                    className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  />
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