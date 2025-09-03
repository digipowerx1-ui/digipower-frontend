import datacenterHero from "@/assets/datacenter-hero.jpg";
import cloudHero from "@/assets/cloud-hero.jpg";
import fiberOptic from "@/assets/fiber-optic.jpg";

const IntegratedSolutions = () => {
  return (
    <section className="py-20 px-4 bg-brand-light-gray">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-sm text-brand-orange uppercase tracking-wide mb-4">
            Integrated Solutions
          </h2>
          
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6 animate-slide-up animation-delay-150">
            Private AI meets the Public Cloud
          </h1>
          
          <p className="text-lg text-brand-gray max-w-4xl mx-auto mb-16 animate-fade-in animation-delay-300">
            DigiPowerX's unified cloud and data center solutions provide unmatched scalability, flexibility, 
            and performance - transforming your infrastructure into a competitive advantage.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16 animate-scale-in animation-delay-500">
          <div className="text-center group hover:scale-105 transition-all duration-300">
            <div className="overflow-hidden rounded-lg mb-6">
              <img 
                src={fiberOptic} 
                alt="Private cloud environments" 
                className="w-full aspect-square object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <p className="text-brand-dark font-medium group-hover:text-brand-orange transition-colors duration-300">
              End-to-end managed private and hybrid cloud environments
            </p>
          </div>
          
          <div className="text-center group hover:scale-105 transition-all duration-300">
            <div className="overflow-hidden rounded-lg mb-6">
              <img 
                src={datacenterHero} 
                alt="Workload bursting" 
                className="w-full aspect-square object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <p className="text-brand-dark font-medium group-hover:text-brand-orange transition-colors duration-300">
              Burst workloads between private data clusters and public GPU cloud
            </p>
          </div>
          
          <div className="text-center group hover:scale-105 transition-all duration-300">
            <div className="overflow-hidden rounded-lg mb-6">
              <img 
                src={cloudHero} 
                alt="Rapid scaling" 
                className="w-full aspect-square object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <p className="text-brand-dark font-medium group-hover:text-brand-orange transition-colors duration-300">
              Scale rapidly without sacrificing performance, reliability, or security
            </p>
          </div>
        </div>

        <div className="text-center animate-fade-in animation-delay-700">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
            Ready to make HPC infrastructure your strategic advantage?
          </h2>
        </div>
      </div>
    </section>
  );
};

export default IntegratedSolutions;