import { ArrowRight, Zap, Shield, Network, Boxes, Leaf, Mail, MapPin, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import FeatureCard from "@/components/FeatureCard";
import StatCard from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import heroImage from "@/assets/hero-datacenter.jpg";
import armsImage from "@/assets/arms-200-system.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Data Center Infrastructure" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Powering the Future of{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                AI & Cloud Infrastructure
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Enterprise-grade data centers built for scalability, innovation, and American excellence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 py-6 animate-pulse-glow"
              >
                Get Started <ArrowRight className="ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-accent/50 text-foreground hover:bg-accent/10 font-semibold text-lg px-8 py-6"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-accent rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Infrastructure That Scales With{" "}
              <span className="text-accent">Innovation</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              DigiPowerX delivers cutting-edge data infrastructure solutions powered by our revolutionary 
              ARMS 200 modular system, enabling rapid deployment and unmatched flexibility for enterprise clients.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <StatCard value="200MW" label="Total Capacity" delay={0} />
            <StatCard value="99.99%" label="Uptime SLA" delay={100} />
            <StatCard value="5" label="U.S. Locations" delay={200} />
            <StatCard value="50ms" label="Low Latency" delay={300} />
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section id="solutions" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why <span className="text-accent">DigiPowerX</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Five critical advantages that set us apart in the data infrastructure landscape
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={Zap}
              title="Lightning-Fast Deployment"
              description="Deploy infrastructure in weeks, not years. Our modular ARMS 200 system enables rapid scalability without compromising quality."
              delay={0}
            />
            <FeatureCard
              icon={Shield}
              title="Enterprise Security"
              description="Military-grade security protocols, multi-layer redundancy, and 24/7 monitoring keep your data safe and accessible."
              delay={100}
            />
            <FeatureCard
              icon={Network}
              title="Carrier-Neutral Connectivity"
              description="Connect to any provider seamlessly. Our strategic U.S. locations ensure optimal network performance."
              delay={200}
            />
            <FeatureCard
              icon={Boxes}
              title="Modular Scalability"
              description="Scale on demand with our innovative ARMS 200 pods. Add capacity as you grow without infrastructure overhaul."
              delay={300}
            />
            <FeatureCard
              icon={Leaf}
              title="Sustainable Operations"
              description="100% renewable energy commitment. Advanced cooling systems reduce environmental impact while maximizing efficiency."
              delay={400}
            />
            <FeatureCard
              icon={Zap}
              title="AI-Optimized Infrastructure"
              description="Purpose-built for AI workloads with high-density compute, GPU support, and ultra-low latency networking."
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* ARMS 200 System */}
      <section id="technology" className="py-24 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold">
                The <span className="text-accent">ARMS 200</span> System
              </h2>
              <p className="text-xl text-muted-foreground">
                Revolutionary modular pod architecture designed for the AI era. Each ARMS 200 unit delivers 
                200kW of computing power in a compact, rapidly deployable package.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                  </div>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Rapid Deployment:</strong> Fully operational in 90 days
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                  </div>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Modular Design:</strong> Add capacity seamlessly without disruption
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                  </div>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Energy Efficient:</strong> Advanced cooling reduces power consumption by 30%
                  </span>
                </li>
              </ul>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                Download Technical Specs
              </Button>
            </div>

            <div className="relative animate-slide-in-right">
              <img 
                src={armsImage} 
                alt="ARMS 200 System Architecture" 
                className="rounded-2xl shadow-2xl border border-accent/20"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* NeoCloudz Coming Soon */}
      <section className="py-24 bg-gradient-to-r from-primary via-secondary to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-accent/20 rounded-full border border-accent/30 text-accent font-semibold mb-4">
              Coming Soon
            </div>
            <h2 className="text-4xl md:text-6xl font-bold">
              Introducing <span className="text-accent">NeoCloudz</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              The next generation of cloud orchestration. Seamless multi-cloud management, 
              AI-powered optimization, and unparalleled performance. Be the first to experience the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-4">
              <Input 
                placeholder="Enter your email" 
                className="bg-background/50 border-accent/30 text-foreground"
              />
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold whitespace-nowrap">
                Notify Me
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section id="sustainability" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center space-x-2 text-accent">
                <Leaf className="w-6 h-6" />
                <span className="font-semibold">Sustainability First</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">
                Building a Greener <span className="text-accent">Future</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Our commitment to environmental responsibility drives every decision. From renewable 
                energy sourcing to innovative cooling technologies, we're building the sustainable 
                infrastructure the world needs.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-accent">100%</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Renewable Energy</p>
                    <p className="text-sm text-muted-foreground">All facilities powered by clean energy</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-accent">30%</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Less Power Consumption</p>
                    <p className="text-sm text-muted-foreground">Advanced cooling reduces energy use</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-accent">0</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Carbon Emissions</p>
                    <p className="text-sm text-muted-foreground">Net-zero carbon footprint by 2025</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[500px] rounded-2xl overflow-hidden border border-accent/20 animate-slide-in-right">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Leaf className="w-64 h-64 text-accent/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section id="partners" className="py-24 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted <span className="text-accent">Partners</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Building the future together with industry-leading technology providers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
            {["NVIDIA", "AMD", "Intel", "Cisco", "Dell", "HPE", "Lenovo", "Juniper"].map((partner, index) => (
              <div 
                key={partner}
                className="bg-card border border-border/50 rounded-xl p-8 flex items-center justify-center hover:border-accent/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-xl font-bold text-muted-foreground">{partner}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
              Become a Partner
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Let's Build the <span className="text-accent">Future Together</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Get in touch with our team to discuss your infrastructure needs
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Name</label>
                  <Input placeholder="Your name" className="bg-card border-border" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                  <Input type="email" placeholder="your@email.com" className="bg-card border-border" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Message</label>
                  <Textarea placeholder="Tell us about your project" rows={6} className="bg-card border-border" />
                </div>
                <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                  Send Message
                </Button>
              </div>

              {/* Contact Info */}
              <div className="space-y-8 animate-slide-in-right">
                <div className="bg-card border border-border/50 rounded-xl p-6 hover:border-accent/50 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-foreground">Email Us</h3>
                      <p className="text-muted-foreground">info@digipowerx.com</p>
                      <p className="text-muted-foreground">sales@digipowerx.com</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border/50 rounded-xl p-6 hover:border-accent/50 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-foreground">Call Us</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      <p className="text-sm text-muted-foreground">Mon-Fri, 9am-6pm EST</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border/50 rounded-xl p-6 hover:border-accent/50 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-foreground">Headquarters</h3>
                      <p className="text-muted-foreground">Silicon Valley, CA</p>
                      <p className="text-sm text-muted-foreground">United States</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-primary border-t border-border/40">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">D</span>
              </div>
              <span className="font-bold text-foreground">DigiPowerX</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 DigiPowerX. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">Careers</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
