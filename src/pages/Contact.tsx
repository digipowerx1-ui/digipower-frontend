import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Send, Users } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: ["contact@digipowerx.com", "IR@digipowerx.com"],
      description: "General inquiries and investor relations"
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567"],
      description: "Business hours: Mon-Fri 9AM-6PM EST"
    },
    {
      icon: MapPin,
      title: "Headquarters",
      details: ["San Jose, California"],
      description: "Main office and business operations"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 9:00 AM - 6:00 PM EST"],
      description: "Available for consultation and support"
    }
  ];

  const offices = [
    {
      name: "North Tonawanda Facility",
      location: "North Tonawanda, NY",
      type: "Combined Cycle Plant",
      phone: "+1 (555) 123-4567",
      description: "Primary power generation and HPC facility"
    },
    {
      name: "Buffalo Data Center",
      location: "Buffalo, NY", 
      type: "Mining Operations",
      phone: "+1 (555) 123-4568",
      description: "Bitcoin mining and data center operations"
    },
    {
      name: "Alabama Facility",
      location: "Alabama",
      type: "Mining & HPC Center",
      phone: "+1 (555) 123-4569",
      description: "Expanding operations and infrastructure"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact DigiPowerX - Get in Touch for Energy Infrastructure Solutions</title>
        <meta name="description" content="Contact DigiPowerX for energy infrastructure, data center, and HPC solutions. Multiple locations across the US. Phone, email, and office information." />
        <meta name="keywords" content="contact DigiPowerX, energy infrastructure support, data center inquiries, HPC consultation" />
        <link rel="canonical" href="/contact" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Hero Section */}
        <section className="relative py-24 px-4 bg-gradient-to-r from-brand-dark to-brand-blue overflow-hidden">
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/800')] bg-cover bg-center opacity-10"></div>
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                Get in
                <span className="text-brand-orange"> Touch</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 animate-slide-up animation-delay-150">
                Ready to discuss your energy infrastructure needs? Our expert team is here to help 
                you find the perfect solution for your requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div className="animate-slide-in-left">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-3xl text-brand-dark flex items-center">
                      <Send className="h-8 w-8 text-brand-orange mr-3" />
                      Send us a Message
                    </CardTitle>
                    <p className="text-brand-gray">
                      Fill out the form below and we'll get back to you within 24 hours
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input 
                          id="firstName" 
                          placeholder="John"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input 
                          id="lastName" 
                          placeholder="Doe"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email" 
                        type="email"
                        placeholder="john@company.com"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input 
                        id="company" 
                        placeholder="Your Company Name"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="sales">Sales & Partnerships</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="investor">Investor Relations</SelectItem>
                          <SelectItem value="careers">Careers</SelectItem>
                          <SelectItem value="media">Media & Press</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea 
                        id="message"
                        placeholder="Tell us about your energy infrastructure needs..."
                        className="mt-1 min-h-[120px]"
                      />
                    </div>
                    
                    <Button 
                      size="lg"
                      className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </Button>
                    
                    <p className="text-sm text-brand-gray text-center">
                      * Required fields. We respect your privacy and will never share your information.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="animate-slide-in-right">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-brand-dark mb-6">
                      Contact Information
                    </h2>
                    <p className="text-lg text-brand-gray mb-8">
                      Multiple ways to reach our team for different types of inquiries
                    </p>
                  </div>
                  
                  <div className="grid gap-6">
                    {contactInfo.map((info, index) => (
                      <Card 
                        key={info.title} 
                        className="p-6 hover:shadow-card transition-all duration-300 group animate-scale-in"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <CardContent className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <info.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-brand-dark mb-2">{info.title}</h4>
                            {info.details.map((detail, i) => (
                              <p key={i} className="text-brand-dark font-medium">{detail}</p>
                            ))}
                            <p className="text-sm text-brand-gray mt-1">{info.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-20 px-4 bg-brand-light-gray">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm text-brand-orange uppercase tracking-wide mb-4">Our Locations</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
                Facilities Across the United States
              </h3>
              <p className="text-lg text-brand-gray max-w-3xl mx-auto">
                Visit our facilities or contact local teams for region-specific inquiries
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offices.map((office, index) => (
                <Card 
                  key={office.name} 
                  className="hover:shadow-card transition-all duration-300 hover:-translate-y-2 group animate-slide-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl text-brand-dark">{office.name}</CardTitle>
                      <MapPin className="h-5 w-5 text-brand-orange" />
                    </div>
                    <p className="text-brand-gray">{office.location}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-brand-gray">Type:</span>
                        <span className="text-sm font-medium text-brand-dark">{office.type}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-brand-gray">Phone:</span>
                        <span className="text-sm font-medium text-brand-dark">{office.phone}</span>
                      </div>
                      <p className="text-sm text-brand-gray mt-3">{office.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm text-brand-orange uppercase tracking-wide mb-4">Find Us</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
                Interactive Location Map
              </h3>
            </div>
            
            <Card className="overflow-hidden shadow-card">
              <CardContent className="p-0">
                <div className="h-96 bg-brand-light-gray flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-brand-orange mx-auto mb-4" />
                    <h4 className="text-2xl font-bold text-brand-dark mb-2">Interactive Map</h4>
                    <p className="text-brand-gray">
                      Interactive facility map will be integrated here showing all DigiPowerX locations
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-brand-dark text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your
              <span className="text-brand-orange"> Energy Project?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Our expert team is standing by to discuss your energy infrastructure needs 
              and provide customized solutions for your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-3"
              >
                <Users className="h-5 w-5 mr-2" />
                Schedule Consultation
              </Button>
              <Button 
                size="lg"
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-brand-dark px-8 py-3"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Contact;