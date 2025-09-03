import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Cpu, Zap, Network, Server, Thermometer, Shield, Bitcoin, Brain } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Technology = () => {
  const technologies = [
    {
      icon: Zap,
      title: "Combined Cycle Plants",
      description: "Advanced combined cycle technology delivering industry-leading efficiency and reliability for energy-intensive computing operations.",
      features: ["95%+ efficiency", "Rapid startup", "Grid stability", "Low emissions"],
      image: "/api/placeholder/600/400"
    },
    {
      icon: Network,
      title: "Substation Integration", 
      description: "High-capacity substation infrastructure enabling seamless grid integration and power distribution optimization.",
      features: ["345kV transmission", "Smart grid ready", "Real-time monitoring", "Load balancing"],
      image: "/api/placeholder/600/400"
    },
    {
      icon: Server,
      title: "HPC Infrastructure",
      description: "Purpose-built high-performance computing infrastructure optimized for AI training, machine learning, and scientific computing.",
      features: ["GPU clusters", "High-speed networking", "Liquid cooling", "Scalable architecture"],
      image: "/api/placeholder/600/400"
    },
    {
      icon: Bitcoin,
      title: "Bitcoin Mining Operations",
      description: "Enterprise-grade Bitcoin mining infrastructure with optimized power delivery and advanced thermal management systems.",
      features: ["ASIC optimization", "Pool integration", "Monitoring systems", "Profitability analytics"],
      image: "/api/placeholder/600/400"
    }
  ];

  const innovations = [
    {
      icon: Brain,
      title: "AI-Powered Operations",
      description: "Machine learning algorithms optimize power distribution, cooling efficiency, and predictive maintenance across all facilities."
    },
    {
      icon: Thermometer,
      title: "Advanced Cooling Systems",
      description: "Innovative cooling technologies including liquid immersion and direct-to-chip cooling for maximum efficiency."
    },
    {
      icon: Shield,
      title: "Cybersecurity Framework",
      description: "Military-grade security protocols protecting critical infrastructure and sensitive computational workloads."
    },
    {
      icon: Network,
      title: "Grid Modernization",
      description: "Smart grid integration enabling bidirectional power flow, demand response, and grid stabilization services."
    }
  ];

  const specs = [
    { label: "Total Power Capacity", value: "100+ MW" },
    { label: "Mining Hashrate", value: "15+ EH/s" },
    { label: "HPC Performance", value: "500+ PFLOPS" },
    { label: "Uptime Guarantee", value: "99.9%" },
    { label: "Power Efficiency", value: "95%+" },
    { label: "Cooling Efficiency", value: "PUE 1.15" }
  ];

  return (
    <>
      <Helmet>
        <title>DigiPowerX Technology - Advanced Energy Infrastructure & Computing Solutions</title>
        <meta name="description" content="Explore DigiPowerX's cutting-edge technology including combined cycle plants, HPC infrastructure, Bitcoin mining, and grid integration solutions." />
        <meta name="keywords" content="combined cycle plants, HPC infrastructure, Bitcoin mining technology, grid integration, energy efficiency" />
        <link rel="canonical" href="/technology" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Hero Section */}
        <section className="relative py-24 px-4 bg-gradient-to-r from-brand-blue to-brand-dark overflow-hidden">
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/800')] bg-cover bg-center opacity-10"></div>
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                Advanced
                <span className="text-brand-orange"> Technology Stack</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 animate-slide-up animation-delay-150">
                Pioneering energy infrastructure technology powering the future of 
                high-performance computing and digital economy
              </p>
              <div className="flex flex-wrap gap-4 justify-center animate-bounce-in animation-delay-300">
                <Badge className="bg-brand-orange text-white px-4 py-2 text-lg">AI-Optimized</Badge>
                <Badge className="bg-white text-brand-dark px-4 py-2 text-lg">95%+ Efficiency</Badge>
                <Badge className="bg-brand-success text-white px-4 py-2 text-lg">99.9% Uptime</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Core Technologies */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm text-brand-orange uppercase tracking-wide mb-4">Core Technologies</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
                Integrated Infrastructure Solutions
              </h3>
              <p className="text-lg text-brand-gray max-w-3xl mx-auto">
                Our comprehensive technology stack combines power generation, grid integration, 
                and high-performance computing in an optimized ecosystem
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {technologies.map((tech, index) => (
                <Card 
                  key={tech.title} 
                  className="overflow-hidden hover:shadow-card transition-all duration-300 hover:-translate-y-2 group animate-scale-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="aspect-video bg-brand-light-gray relative overflow-hidden">
                    <img 
                      src={tech.image} 
                      alt={tech.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center">
                        <tech.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-2xl text-brand-dark">{tech.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-brand-gray mb-6 leading-relaxed">
                      {tech.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {tech.features.map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
                          <span className="text-sm text-brand-gray">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-20 px-4 bg-brand-light-gray">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm text-brand-orange uppercase tracking-wide mb-4">Technical Specifications</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
                Performance Metrics
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specs.map((spec, index) => (
                <Card 
                  key={spec.label} 
                  className="text-center p-6 hover:shadow-card transition-all duration-300 group animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent>
                    <div className="text-4xl font-bold text-brand-orange mb-2 group-hover:scale-110 transition-transform duration-300">
                      {spec.value}
                    </div>
                    <div className="text-brand-gray">{spec.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Innovation Section */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm text-brand-orange uppercase tracking-wide mb-4">Innovation</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
                Next-Generation Capabilities
              </h3>
              <p className="text-lg text-brand-gray max-w-3xl mx-auto">
                Continuous innovation drives our technology advancement and operational excellence
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {innovations.map((innovation, index) => (
                <Card 
                  key={innovation.title} 
                  className="p-8 hover:shadow-card transition-all duration-300 hover:-translate-y-2 group animate-scale-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-brand-orange rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <innovation.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-brand-dark mb-3">{innovation.title}</h4>
                        <p className="text-brand-gray leading-relaxed">{innovation.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Infrastructure Overview */}
        <section className="py-20 px-4 bg-brand-dark text-white">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="animate-slide-in-left">
                <h2 className="text-sm text-brand-orange uppercase tracking-wide mb-4">Infrastructure Overview</h2>
                <h3 className="text-4xl font-bold mb-6">
                  Integrated Energy & Computing Ecosystem
                </h3>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  Our technology stack represents a paradigm shift in energy infrastructure, 
                  combining traditional power generation with cutting-edge digital computing capabilities.
                </p>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  From combined cycle power plants to high-performance computing clusters, 
                  every component is optimized for maximum efficiency, reliability, and scalability.
                </p>
                <Button 
                  size="lg"
                  className="bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-3"
                >
                  Technical Documentation
                </Button>
              </div>
              
              <div className="animate-slide-in-right">
                <Card className="p-8 bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-brand-orange/20 rounded-lg">
                        <Cpu className="h-8 w-8 text-brand-orange mx-auto mb-2" />
                        <div className="text-sm text-gray-300">Computing Power</div>
                      </div>
                      <div className="text-center p-4 bg-brand-orange/20 rounded-lg">
                        <Zap className="h-8 w-8 text-brand-orange mx-auto mb-2" />
                        <div className="text-sm text-gray-300">Power Generation</div>
                      </div>
                      <div className="text-center p-4 bg-brand-orange/20 rounded-lg">
                        <Network className="h-8 w-8 text-brand-orange mx-auto mb-2" />
                        <div className="text-sm text-gray-300">Grid Integration</div>
                      </div>
                      <div className="text-center p-4 bg-brand-orange/20 rounded-lg">
                        <Shield className="h-8 w-8 text-brand-orange mx-auto mb-2" />
                        <div className="text-sm text-gray-300">Security</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
              Ready to Leverage Our
              <span className="text-brand-orange"> Technology?</span>
            </h2>
            <p className="text-xl text-brand-gray mb-8 max-w-3xl mx-auto">
              Contact our technical team to discuss how our infrastructure can power your 
              high-performance computing and energy-intensive applications
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-3"
              >
                Technical Consultation
              </Button>
              <Button 
                size="lg"
                variant="outline" 
                className="border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white px-8 py-3"
              >
                Download Specs
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Technology;