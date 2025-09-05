import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-whitefiber-dark mb-12">
          Ready to make HPC infrastructure your strategic advantage?
        </h2>
        
        <Button 
          size="lg"
          className="bg-whitefiber-orange text-whitefiber-orange-foreground hover:bg-whitefiber-orange/90 px-8 py-4 text-lg font-medium"
        >
          Schedule a PoC
        </Button>
      </div>
    </section>
  );
};

export default CTASection;