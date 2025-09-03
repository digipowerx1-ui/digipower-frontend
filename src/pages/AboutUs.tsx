import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Building, Zap, Target, Award, Users, TrendingUp } from "lucide-react";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  const values = [
    {
      icon: Zap,
      title: "Innovation",
      description: "Pioneering cutting-edge energy infrastructure solutions for the digital economy"
    },
    {
      icon: Target,
      title: "Sustainability",
      description: "Building resilient, environmentally conscious energy systems for the future"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Delivering world-class energy infrastructure with uncompromising quality"
    },
    {
      icon: Users,
      title: "Partnership",
      description: "Collaborating with industry leaders to drive technological advancement"
    }
  ];

  const stats = [
    { number: "100+", label: "Megawatts of Infrastructure" },
    { number: "3", label: "Strategic US Locations" },
    { number: "11.8k+", label: "Miners Under Management" },
    { number: "$37M", label: "Fiscal Year 2024 Revenue" }
  ];

  return (
    <>
      <Helmet>
        <title>About DigiPowerX - Innovative Energy Infrastructure Company</title>
        <meta name="description" content="Learn about DigiPowerX's mission to create efficient, reliable energy solutions through advanced infrastructure for high-performance computing and digital economy." />
        <meta name="keywords" content="energy infrastructure, data centers, sustainable energy, Bitcoin mining, HPC" />
        <link rel="canonical" href="/about" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Hero Section */}
        <section className="relative py-24 px-4 bg-gradient-to-r from-brand-dark to-brand-blue overflow-hidden">
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/800')] bg-cover bg-center opacity-10"></div>
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                Powering the
                <span className="text-brand-orange"> Digital Future</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 animate-slide-up animation-delay-150">
                DigiPowerX is an innovative energy infrastructure company developing cutting-edge 
                data centers to drive the expansion of sustainable energy assets.
              </p>
              <Button 
                className="bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 animate-bounce-in animation-delay-300"
                size="lg"
              >
                Our Vision
              </Button>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="animate-slide-in-left">
                <h2 className="text-sm text-brand-orange uppercase tracking-wide mb-4">Our Mission</h2>
                <h3 className="text-4xl font-bold text-brand-dark mb-6">
                  Creating Efficient, Reliable Energy Solutions
                </h3>
                <p className="text-lg text-brand-gray mb-6 leading-relaxed">
                  Our mission is to create efficient, reliable, and cost-effective energy solutions by 
                  maximizing the potential of our power facilities and building advanced infrastructure 
                  to meet the demands of high-performance computing, Bitcoin mining, and other 
                  energy-intensive industries.
                </p>
                <p className="text-lg text-brand-gray mb-8 leading-relaxed">
                  We are focused on continuously expanding our power infrastructure to create a 
                  resilient backbone for the future of energy and technology, powering the digital 
                  economy and the energy grid of tomorrow.
                </p>
                <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white">
                  Learn More
                </Button>
              </div>
              <div className="animate-slide-in-right">
                <Card className="p-8 shadow-card hover:shadow-energy transition-all duration-300">
                  <CardContent className="space-y-6">
                    <Building className="h-16 w-16 text-brand-orange mx-auto" />
                    <h4 className="text-2xl font-bold text-brand-dark text-center">
                      Strategic Vision
                    </h4>
                    <p className="text-brand-gray text-center">
                      Building the foundation for tomorrow's energy ecosystem through 
                      innovative infrastructure and sustainable practices.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 bg-brand-light-gray">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm text-brand-orange uppercase tracking-wide mb-4">Our Values</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
                What Drives Us Forward
              </h3>
              <p className="text-lg text-brand-gray max-w-3xl mx-auto">
                Our core values guide every decision we make and every solution we build
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card 
                  key={value.title} 
                  className="p-6 text-center hover:shadow-card transition-all duration-300 hover:-translate-y-2 group animate-scale-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent>
                    <value.icon className="h-12 w-12 text-brand-orange mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h4 className="text-xl font-bold text-brand-dark mb-3">{value.title}</h4>
                    <p className="text-brand-gray">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 bg-brand-dark text-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm text-brand-orange uppercase tracking-wide mb-4">By The Numbers</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-6">
                Driving Digital Infrastructure Growth
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="text-center group animate-slide-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="text-5xl md:text-6xl font-bold text-brand-orange mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm text-brand-orange uppercase tracking-wide mb-4">Leadership</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
                Experienced Energy Industry Leaders
              </h3>
              <p className="text-lg text-brand-gray max-w-3xl mx-auto">
                Our leadership team brings decades of experience in energy infrastructure, 
                technology, and sustainable development
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 shadow-card">
                <CardContent className="text-center">
                  <TrendingUp className="h-16 w-16 text-brand-orange mx-auto mb-6" />
                  <h4 className="text-2xl font-bold text-brand-dark mb-4">
                    Proven Track Record
                  </h4>
                  <p className="text-lg text-brand-gray leading-relaxed">
                    With multiple sites including state-of-the-art combined cycle and high-capacity 
                    substations, we tap into and enhance the energy grid, supporting both industrial 
                    clients and broader energy markets with sustainable, scalable solutions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default AboutUs;