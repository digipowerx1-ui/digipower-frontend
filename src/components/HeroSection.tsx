import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Database, Cloud } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto text-center">
        <div className="mb-6 animate-fade-in">
          <span className="text-brand-orange font-medium text-sm uppercase tracking-wide">
            THE AI INFRASTRUCTURE COMPANY
          </span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-brand-dark mb-6 leading-tight animate-slide-up">
          AI INFRASTRUCTURE<br />FOR INNOVATION
        </h1>
        
        <p className="text-xl text-brand-gray max-w-4xl mx-auto mb-16 animate-fade-in animation-delay-300">
          Data center and cloud solutions for scaling training, inference, and other demanding high-performance compute workloads.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto animate-scale-in animation-delay-500">
          <Card className="bg-brand-light-gray border-0 p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <CardContent className="p-0">
              <div className="flex items-center justify-center mb-6">
                <Database className="h-12 w-12 text-brand-dark group-hover:text-brand-orange transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-4 group-hover:text-brand-orange transition-colors duration-300">Data Centers</h3>
              <p className="text-brand-gray mb-8">
                Custom colocation and managed infrastructure for sovereign AI and HPC.
              </p>
              <Button 
                variant="ghost" 
                className="text-brand-dark hover:text-brand-orange font-medium group/btn"
              >
                Take me there
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-brand-light-gray border-0 p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <CardContent className="p-0">
              <div className="flex items-center justify-center mb-6">
                <Cloud className="h-12 w-12 text-brand-dark group-hover:text-brand-orange transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-4 group-hover:text-brand-orange transition-colors duration-300">Cloud</h3>
              <p className="text-brand-gray mb-8">
                The GPU cloud built and optimized for AI workloads.
              </p>
              <Button 
                variant="ghost" 
                className="text-brand-dark hover:text-brand-orange font-medium group/btn"
              >
                Take me there
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;