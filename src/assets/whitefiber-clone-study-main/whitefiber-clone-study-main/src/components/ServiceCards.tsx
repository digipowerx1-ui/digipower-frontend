import { Card } from "@/components/ui/card";
import stackIcon from "@/assets/stack-icon.svg";
import cloudIcon from "@/assets/cloud-icon.svg";
import arrowIcon from "@/assets/arrow-icon.svg";

const ServiceCards = () => {
  const services = [
    {
      icon: stackIcon,
      title: "Data Centers",
      description: "Custom colocation and managed infrastructure for sovereign AI and HPC.",
      cta: "Take me there",
      link: "/data-center/ai-hpc-colocation"
    },
    {
      icon: cloudIcon,
      title: "Cloud",
      description: "The GPU cloud built and optimized for AI workloads.",
      cta: "Take me there",
      link: "/cloud/compute"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="p-8 border border-whitefiber-border hover:shadow-lg transition-shadow duration-300 bg-white group cursor-pointer"
            >
              <div className="flex flex-col items-start">
                {/* Icon */}
                <div className="mb-6">
                  <img 
                    src={service.icon} 
                    alt={`${service.title} icon`}
                    className="w-12 h-12"
                  />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-whitefiber-dark mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-whitefiber-light-gray mb-8 leading-relaxed">
                  {service.description}
                </p>

                {/* CTA */}
                <div className="flex items-center text-whitefiber-dark group-hover:text-whitefiber-orange transition-colors duration-200">
                  <span className="font-medium mr-2">{service.cta}</span>
                  <img 
                    src={arrowIcon} 
                    alt="Arrow"
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;