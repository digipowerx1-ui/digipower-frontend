import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Zap, Server, Shield, Thermometer, Network } from "lucide-react";
import { Helmet } from "react-helmet-async";

import northTonawandaImg from "@/assets/nt-site.avif";
import buffaloImg from "@/assets/buffalo-site.avif";
import alabamaImg from "@/assets/alabama-site.jpeg";
import northCarolinaImg from "@/assets/nc-site.avif";

const Facilities = () => {
  const facilities = [
    {
      name: "North Tonawanda Power Plant",
      location: "North Tonawanda, NY",
      capacity: "60 MW",
      type: "Combined Cycle Plant",
      status: "Operational",
      features: [
        "Combined cycle power plant",
        "Gas and steam turbines",
        "Behind-the-grid operation",
        "Capacity payments",
        "Transmission infrastructure access"
      ],
      description: `Our North Tonawanda facility is a state-of-the-art 60 MW combined cycle power plant, utilizing both gas and steam turbines to maximize energy output while minimizing emissions. With its innovative design, this highly efficient plant operates behind the grid, providing a reliable, low-cost energy solution for power-intensive industries, including high-performance computing and Bitcoin mining. Additionally, the facility has the capability to sell power back to the utility, tapping into multiple revenue streams. We receive capacity payments for maintaining a standby role, ensuring the plant is ready to supply grid power during peak demands. With access to robust transmission infrastructure, North Tonawanda is a cornerstone in delivering sustainable power and versatile energy solutions for a variety of critical applications.`,
      image: northTonawandaImg
    },
    {
      name: "Buffalo Site",
      location: "Buffalo, NY",
      capacity: "18.7 MW",
      type: "Data Center Campus",
      status: "Operational",
      features: ["Repurposed site", "Grid-connected", "Custom cooling", "Scalable design"],
      description: "Located at a repurposed industrial site in Buffalo, this facility leverages 18.7 MW of grid power, primarily sourced from the region’s abundant hydroelectric resources.By utilizing clean, renewable energy from local hydro power, this site represents a strategic investment in sustainable energy solutions. The facility is equipped to support a variety of high-demand energy applications, ensuring reliable power for industrial operations while contributing to the region’s commitment to green energy.",
      image: buffaloImg
    },
    {
      name: "Alabama Site",
      location: "Alabama",
      capacity: "22 MW",
      type: "Mining & HPC Center",
      status: "Expansion Phase",
      features: ["22 MW substation", "Strategic location", "Future expansion potential"],
      description: "Situated at a repurposed industrial location, our Alabama facility features a 22 MW substation powered by the local utility grid. This site is designed to deliver consistent and reliable energy, making it ideal for high-demand operations such as data centers and industrial applications. With robust infrastructure and access to efficient utility power, the facility is positioned to support scalable energy needs while contributing to the economic revitalization of the region.",
      image: alabamaImg
    },
    {
      name: "North Carolina Site",
      location: "North Carolina",
      capacity: "200 MW (Potential)",
      type: "Integrated Energy Center",
      status: "Development",
      features: ["200 MW potential", "Prime substation adjacency", "20-acre land"],
      description: "Located adjacent to one of the largest substations in North Carolina, this 20-acre, fully graded site offers a significant development opportunity with up to 200 MW of infrastructure potential. Positioned for future growth, this prime location is ideal for large-scale energy projects and high-performance computing. With plans to begin development in the coming year, the site is poised to become a key energy hub, leveraging the existing electrical infrastructure to support a wide range of industrial and technological needs.",
      image: northCarolinaImg
    }
  ];

  const capabilities = [
    {
      icon: Zap,
      title: "Power Generation",
      description: "Advanced combined cycle plants delivering efficient, reliable power generation"
    },
    {
      icon: Server,
      title: "HPC Infrastructure",
      description: "Purpose-built facilities optimized for high-performance computing workloads"
    },
    {
      icon: Shield,
      title: "Security & Reliability",
      description: "24/7 monitoring and redundant systems ensuring maximum uptime"
    },
    {
      icon: Thermometer,
      title: "Advanced Cooling",
      description: "Innovative cooling solutions maintaining optimal operating temperatures"
    },
    {
      icon: Network,
      title: "Grid Integration",
      description: "Seamless integration with electrical grid infrastructure and energy markets"
    },
    {
      icon: MapPin,
      title: "Strategic Locations",
      description: "Facilities positioned in key markets with optimal power and connectivity access"
    }
  ];

  return (
    <>
      <Helmet>
        <title>DigiPowerX Facilities - Strategic Energy Infrastructure Locations</title>
        <meta name="description" content="Explore DigiPowerX's strategic facilities across North Tonawanda, Buffalo, Alabama, and North Carolina. Advanced energy infrastructure for HPC and Bitcoin mining." />
        <meta name="keywords" content="energy facilities, data centers, power plants, Bitcoin mining, HPC infrastructure" />
        <link rel="canonical" href="/facilities" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <section className="relative py-24 px-4 bg-gradient-to-r from-brand-blue to-brand-dark overflow-hidden">
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/800')] bg-cover bg-center opacity-10"></div>
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                Strategic
                <span className="text-brand-white"> Energy Facilities</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 animate-slide-up animation-delay-150">
                Purpose-built infrastructure across key US markets powering the future
                of high-performance computing and digital economy
              </p>
              <div className="flex flex-wrap gap-4 justify-center animate-bounce-in animation-delay-300">
                <Badge className="bg-brand-white text-white px-4 py-2 text-lg border border-white">
                  100+ MW Capacity
                </Badge>
                <Badge className="bg-brand-white text-white px-4 py-2 text-lg border border-white">
                  4 Strategic Locations
                </Badge>
                <Badge className="bg-brand-white text-white px-4 py-2 text-lg border border-white">
                  24/7 Operations
                </Badge>

              </div>
            </div>
          </div>
        </section>

        {/* Facilities Grid */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
                Our Sites
              </h3>
              <p className="text-lg text-brand-gray max-w-3xl mx-auto">
                Strategic locations across the United States, each designed for maximum efficiency and sustainable energy production.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {facilities.map((facility, index) => (
                <Card
                  key={facility.name}
                  className="overflow-hidden hover:shadow-card transition-all duration-300 hover:-translate-y-2 group animate-scale-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="aspect-video bg-brand-light-gray relative overflow-hidden">
                    <img
                      src={facility.image}
                      alt={`${facility.name} facility`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge
                        className={`${facility.status === 'Operational'
                          ? 'bg-brand-success text-white'
                          : facility.status === 'Expansion Phase'
                            ? 'bg-brand-warning text-brand-dark'
                            : 'bg-brand-blue text-white'
                          }`}
                      >
                        {facility.status}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-2xl text-brand-dark">{facility.name}</CardTitle>
                      <div className="text-right">
                        <div className="text-sm text-brand-gray">{facility.location}</div>
                        <div className="text-lg font-bold text-brand-white">{facility.capacity}</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="w-fit text-brand-blue border-brand-blue">
                      {facility.type}
                    </Badge>
                  </CardHeader>

                  <CardContent>
                    <p className="text-brand-gray mb-6 leading-relaxed">
                      {facility.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {facility.features.map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-brand-white rounded-full"></div>
                          <span className="text-sm text-brand-gray">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-brand-white text-brand-white hover:bg-brand-white hover:text-white"
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-20 px-4 bg-brand-light-gray">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm text-brand-white uppercase tracking-wide mb-4">Core Capabilities</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
                Advanced Infrastructure Solutions
              </h3>
              <p className="text-lg text-brand-gray max-w-3xl mx-auto">
                Comprehensive capabilities designed to meet the demanding requirements
                of modern energy-intensive applications
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {capabilities.map((capability, index) => (
                <Card
                  key={capability.title}
                  className="p-6 text-center hover:shadow-card transition-all duration-300 hover:-translate-y-2 group animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent>
                    <capability.icon className="h-12 w-12 text-brand-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h4 className="text-xl font-bold text-brand-dark mb-3">{capability.title}</h4>
                    <p className="text-brand-gray">{capability.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-brand-dark text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Power Your
              <span className="text-brand-white"> Computing Needs?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Contact our team to learn more about our facilities and how we can
              support your high-performance computing requirements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-brand-white hover:bg-brand-white-hover text-white px-8 py-3 border border-white"
              >
                Contact Sales
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-brand-white hover:bg-brand-white-hover text-white px-8 py-3"
              >
                Schedule Tour
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Facilities;