const HeroSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        {/* Company Tagline */}
        <p className="text-whitefiber-orange text-sm font-medium uppercase tracking-widest mb-8">
          THE AI INFRASTRUCTURE COMPANY
        </p>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-whitefiber-dark mb-8 leading-tight">
          AI INFRASTRUCTURE<br />FOR INNOVATION
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-whitefiber-light-gray max-w-4xl mx-auto mb-16 leading-relaxed">
          Data center and cloud solutions for scaling training, inference, and other 
          demanding high-performance compute workloads.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;