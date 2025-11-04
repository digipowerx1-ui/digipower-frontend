import { ArrowRight, Zap, Shield, Network, Boxes, Leaf, Mail, MapPin, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import FeatureCard from "@/components/FeatureCard";
import StatCard from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import heroImage from "@/assets/hero-datacenter.jpg";



const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
   <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
  <div className="container mx-auto px-6 py-20">
    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">

      {/* Left Content */}
      <div className="space-y-8 animate-slide-in-left">
        <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-snug text-slate-900 dark:text-white">
          Powering the Future of
          <span className="block mt-3 bg-gradient-to-r from-[#334152] to-[#01d3ff] bg-clip-text text-transparent">
            AI & Cloud Infrastructure
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl text-justify">
          DigiPowerX builds, owns, and operates Tier III-certified modular data-center infrastructure across the United States — engineered for speed, scalability, and reliability.
        </p>

        {/* Button Section */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-start items-start">
          <Button
            size="md"
            className="bg-gradient-to-r from-[#334152] to-[#01d3ff] hover:from-[#01b4e5] hover:to-[#334152] text-white font-medium text-base px-6 py-3 rounded-lg shadow-md transition-all duration-300"
          >
            Explore Our Data Centers
          </Button>

          <Button
  size="md"
  variant="outline"
  className="border border-blue-600 text-white hover:bg-blue-50 font-medium text-base px-6 py-3 rounded-lg transition-all duration-300"
>
  Learn About ARMS 200 Modular Systems
</Button>

        </div>
      </div>

      {/* Right-section */}
      <div className="relative animate-slide-in-right">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 group cursor-pointer">
          <video
            src="src/assets/background.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          ></video>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
        </div>
      </div>

    </div>
  </div>
</section>


{/* {banner-section} */}

 <section className="bg-[#1d212b] text-white py-10 px-6 md:px-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* LEFT TEXT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold leading-snug">
            DigiPower X Launches <br />
            <span className="text-[#00a6ff] font-semibold">US Data Centers, Inc.</span>
          </h2>
        </div>

        {/* right-section */}
        <div className="flex items-center gap-6 text-right">
          {/* Logo */}
          <div className=" p-4 rounded-lg flex items-center justify-center w-36 h-20">
            <img
              src="src/assets/banner-logo.png" 
              alt="USDC Logo"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Text */}
          <div className="space-y-1">
            <p className="text-gray-300 text-sm md:text-base">February 11, 2025</p>
            <a
              href="#"
              className="text-[#00a6ff] hover:underline text-sm md:text-base font-medium"
            >
              View Company Presentation
            </a>
          </div>
        </div>
      </div>
    </section>







  {/* NeoCloudz Coming Soon */}
  <section className="relative py-24 bg-white overflow-hidden">
  {/* Subtle Animated Background Pattern */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIzMjMyMyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] animate-pulse"></div>
  </div>

  {/* Glowing Accent Orb */}
  <div className="absolute -top-32 right-0 w-72 h-72 bg-[#01d3ff]/20 rounded-full blur-3xl opacity-40 animate-pulse"></div>

  <div className="container mx-auto px-6 relative z-10">
    <div className="max-w-4xl mx-auto text-center space-y-8 fade-up">

      {/* Tagline */}
      <div className="inline-block px-5 py-2 bg-[#01d3ff]/10 rounded-full border border-[#01d3ff]/30 text-[#245592] font-semibold tracking-wide shadow-sm fade-up">
        ☁️ Coming Soon
      </div>

      {/* Heading */}
      <h2 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900 drop-shadow-md fade-up">
        <span className="bg-gradient-to-r from-[#245592] to-[#01d3ff] bg-clip-text text-transparent">
          NeoCloudz
        </span>{" "}
        – The Next Generation of Compute-as-a-Service
      </h2>

      {/* Description */}
      <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto fade-up">
        Launching in <span className="text-[#01b4e5] font-medium">2026</span>,{" "}
        <strong className="text-gray-900">NeoCloudz</strong> is the consumer and enterprise-facing arm of
        <strong className="text-[#245592]"> DigiPowerX</strong>. It offers on-demand GPU and AI compute directly from our Tier III infrastructure —
        empowering developers, startups, and enterprises with sustainable U.S.-based high-performance computing power.
      </p>

      {/* Highlights */}
      <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left text-gray-600 text-sm md:text-base mt-6 fade-up">
        {[
          "Instant GPU rentals through a cloud interface",
          "Backed by DigiPowerX Tier III data centers",
          "Competitive, U.S.-based, low-latency compute",
          "API access for AI, rendering, and scientific workloads",
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-start space-x-3 bg-gray-100 rounded-xl p-4 border border-[#01d3ff]/20 hover:border-[#01d3ff]/40 transition-all duration-300 hover:bg-gray-50"
          >
            <div className="w-2 h-2 mt-2 rounded-full bg-[#01d3ff]"></div>
            <p>{item}</p>
          </div>
        ))}
      </div>

      {/* Sign-Up Form */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-10 fade-up">
        <Input
          placeholder="Enter your email"
          className="bg-gray-50 border-[#01d3ff]/40 text-gray-900 placeholder:text-gray-400 rounded-xl focus:border-[#01d3ff]/60 focus:ring-2 focus:ring-[#01d3ff]/40"
        />
        <Button
          size="lg"
          className="rounded-xl bg-gradient-to-r from-[#245592] to-[#01d3ff] hover:from-[#01b4e5] hover:to-[#334152] text-white font-semibold whitespace-nowrap shadow-lg transition-all duration-300"
        >
          Sign Up for Updates
        </Button>
      </div>

      {/* Teaser Text */}
      <p className="text-sm text-gray-500 italic mt-4 tracking-wide fade-up">
        Launching Soon — Be the first to experience the power of NeoCloudz.
      </p>

    </div>
  </div>
</section>

















      {/* About Section */}
    <section id="about" className="py-24 bg-white">
  <div className="container mx-auto px-6">
    {/* Heading */}
    <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
        DigiPowerX: Build Faster, Operate Smarter,{" "}
        <span className="bg-gradient-to-r from-[#245592] to-[#01d3ff] bg-clip-text text-transparent">
          Deliver Sustainable Compute
        </span>
      </h2>

      <p className="text-xl text-gray-600">
        DigiPowerX delivers cutting-edge data infrastructure solutions powered by our revolutionary{" "}
        <strong className="text-gray-900">ARMS 200 modular system</strong>, enabling rapid deployment and
        unmatched flexibility for enterprise clients.
      </p>
    </div>

    {/* ✅ Centered grid */}
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
        <StatCard value="3" label="United States-based mining sites" delay={0} />
        <StatCard value="11.8k+" label="miners under our domain" delay={100} />
        <StatCard value="100" label="megawatts of developed electrical infrastructure" delay={200} />
      </div>
    </div>
  </div>
</section>


      {/* about */}
   <section id="solutions" className="py-24 bg-white">
  {/* 🔹 About Section */}
  <div className="relative py-24 w-full">
    <div className="container mx-auto px-6">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          <span className="bg-gradient-to-r from-[#245592] to-[#01d3ff] bg-clip-text text-transparent">
            About Us
          </span>
        </h2>

        <p className="text-lg md:text-xl text-gray-700 font-medium">
          Infrastructure That Scales With Innovation
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-[#245592] to-[#01d3ff] rounded-full mx-auto mt-4"></div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* LEFT — Text */}
        <div className="md:w-1/2 text-center md:text-left text-lg text-gray-700 leading-relaxed space-y-6 text-justify">
          <p>
            <strong className="text-[#245592]">DigiPowerX</strong> is an American infrastructure company
            focused on the intersection of power and data. Our team has decades of combined experience in
            energy generation, high-voltage transmission, and mission-critical facility design.
          </p>

          <p>
            We specialize in converting power assets into{" "}
            <strong className="text-[#245592]">Tier III-ready data-center campuses</strong>,
            using modular designs that cut deployment timelines by over{" "}
            <strong className="text-gray-900 font-semibold">60%</strong>.
          </p>

          <p>
            Every site we develop adheres to{" "}
            <strong className="text-[#245592]">TIA-942 Tier III standards</strong>,
            guaranteeing redundancy, uptime, and energy efficiency across our entire operational network.
          </p>
        </div>

        {/* RIGHT — Video */}
        <div className="md:w-1/2 relative group">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 transition-transform duration-500 group-hover:scale-105">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-[400px] object-cover"
            >
              <source src="src/assets/background.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
        </div>
      </div>
    </div>
  </div>

  {/* 🔹 Key Differentiators Section */}
  <div className="container mx-auto px-6 mt-24">
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
        Key{" "}
        <span className="bg-gradient-to-r from-[#245592] to-[#01d3ff] bg-clip-text text-transparent">
          Differentiators
        </span>
      </h2>
      <p className="text-lg text-gray-600 font-medium">
        The Pillars of DigiPowerX Infrastructure Excellence
      </p>
      <div className="w-24 h-1 bg-gradient-to-r from-[#245592] to-[#01d3ff] rounded-full mx-auto mt-4"></div>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <FeatureCard
        icon={Zap}
        title="Lightning-Fast Deployment"
        description="Modular Architecture: Our ARMS 200 pods deliver 200 kW – 5 MW units that scale seamlessly."
        delay={0}
      />
      <FeatureCard
        icon={Shield}
        title="Enterprise Security"
        description="Tier III Certified Design: Concurrent maintainability and fault-tolerant infrastructure."
        delay={100}
      />
      <FeatureCard
        icon={Network}
        title="Carrier-Neutral Connectivity"
        description="Power Advantage: Direct connection to high-voltage substations and on-site generation."
        delay={200}
      />
      <FeatureCard
        icon={Boxes}
        title="Modular Scalability"
        description="Speed to Market: From permitting to commissioning in under 12 months."
        delay={300}
      />
      <FeatureCard
        icon={Leaf}
        title="Sustainable Operations"
        description="Sustainable Build Philosophy: Low PUE designs with optimized water and air systems."
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
   <section id="technology" className="py-24 bg-white">
  <div className="container mx-auto px-6">
    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
      
      {/* LEFT CONTENT */}
      <div className="space-y-5 animate-fade-in text-justify">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight text-left">
          The{" "}
          <span className="bg-gradient-to-r from-[#245592] to-[#01d3ff] bg-clip-text text-transparent">
            ARMS 200
          </span>{" "}
          System
        </h2>

        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
          Revolutionary modular pod architecture designed for the AI era. Each ARMS 200 unit delivers
          200kW of computing power in a compact, rapidly deployable package.
        </p>

        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
          The <strong className="text-gray-900">ARMS 200</strong> is DigiPowerX’s proprietary modular data-center platform.
          Each module delivers up to <strong className="text-[#01b4e5]">200 kW</strong> of critical IT load and is designed for
          <strong className="text-[#245592]"> Tier III redundancy</strong> (concurrent maintainability). The system’s prefabricated
          architecture allows rapid on-site assembly and integration with chilled-water or direct-to-chip cooling systems.
        </p>

        {/* ARMS 200 Advantages */}
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-[#245592] mt-6 mb-3 text-left">
            ARMS 200 Advantages:
          </h3>
          <ul className="space-y-3">
            {[
              "Tier III rated under TIA-942 design standards",
              "Pre-engineered for liquid or air-cooled workloads",
              "Fully integrated power, cooling, and network distribution",
              "Scalable from 200 kW to 50 MW+ campuses",
              "Deployable in ≤ 12 months",
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex items-start text-sm md:text-base text-gray-700 leading-relaxed"
              >
                <div className="w-5 h-5 rounded-full bg-[#01d3ff]/20 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#01d3ff]"></div>
                </div>
                <span className="text-justify">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT IMAGE / DIAGRAM */}
      <div className="relative animate-slide-in-right flex justify-center lg:justify-end">
        <div className="w-full max-w-xl relative rounded-2xl overflow-hidden  border-gray-200 transition-transform duration-500 hover:scale-105">
          {/* Image */}
          <img
            src="src/assets/usdc200.png" // 🔁 Replace this with your actual image path
            alt="DigiPowerX Data Center"
            className="w-full h-[400px] md:h-[500px] object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent rounded-2xl"></div>
        </div>
      </div>
    </div>
  </div>
</section>




    

      {/* Sustainability */}
     <section id="sustainability" className="py-24 bg-white w-full">
  <div className="container mx-auto px-6">
    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
      
      {/* LEFT — Image */}
      <div className="relative h-[420px] rounded-2xl overflow-hidden border border-gray-200 shadow-xl animate-slide-in-right">
        <img
          src="src/assets/image.jpeg" // ✅ Replace with your actual image path
          alt="Sustainability"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent rounded-2xl"></div>
      </div>

      {/* RIGHT — Content */}
      <div className="space-y-6 animate-fade-in">
        <div className="inline-flex items-center space-x-2 text-[#01d3ff]">
          <Leaf className="w-6 h-6" />
          <span className="font-semibold text-gray-800">Sustainability First</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Building a {" "}
          <span className="bg-gradient-to-r from-[#245592] to-[#01d3ff] bg-clip-text text-transparent animate-gradient">
          Greener  Future
          </span>
        </h2>

        <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-justify">
          DigiPowerX is committed to responsible energy infrastructure.
          Our data centers leverage high-efficiency power distribution, heat-recovery designs,
          and low-PUE operations. Wherever possible, we integrate on-site generation and renewable
          power purchase agreements to offset carbon impact. We believe sustainable power is
          intelligent power — and that scalable AI infrastructure can coexist with environmental
          responsibility.
        </p>
      </div>

    </div>
  </div>
</section>


      {/* Partnerships */}
  <section id="partners" className="py-24 bg-white">
  <div className="container mx-auto px-6">
    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
        Trusted{" "}
        <span className="bg-gradient-to-r from-[#245592] to-[#01d3ff] bg-clip-text text-transparent animate-gradient">
          Partners
        </span>
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        We collaborate with utilities, equipment manufacturers, and cloud providers
        to bring Tier&nbsp;III capacity to market faster.
        <br />
        <br />
        If you are an energy producer, investor, or technology partner,{" "}
        <span className="text-[#245592] font-semibold">DigiPowerX</span> offers
        co-development opportunities within our modular infrastructure network.
        <br />
        <br />
        Contact us to explore joint ventures, power purchase agreements, and
        colocation partnerships.
      </p>
    </div>

    {/* CTA Button */}
    <div className="text-center">
      <Button
        size="lg"
        className="bg-gradient-to-r from-[#245592] to-[#01d3ff] hover:from-[#01b4e5] hover:to-[#334152] text-white font-semibold rounded-lg shadow-lg transition-all duration-300 px-8 py-4"
      >
        Become a Partner
      </Button>
    </div>
  </div>
</section>



      {/* Contact Section */}
  <section id="contact" className="py-24 bg-white">
  <div className="container mx-auto px-6">
    <div className="max-w-5xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Let’s Build the{" "}
          <span className="bg-gradient-to-r from-[#245592] to-[#01d3ff] bg-clip-text text-transparent animate-gradient">
            Future Together
          </span>
        </h2>
        <p className="text-xl text-gray-600">
          Get in touch with our team to discuss your infrastructure needs.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-[#245592] to-[#01d3ff] rounded-full mx-auto mt-4"></div>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="space-y-6 animate-fade-in">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-800">Name</label>
            <Input
              placeholder="Your name"
              className="bg-gray-50 border border-gray-200 focus:border-[#01d3ff] focus:ring-[#01d3ff] transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-800">Email</label>
            <Input
              type="email"
              placeholder="your@email.com"
              className="bg-gray-50 border border-gray-200 focus:border-[#01d3ff] focus:ring-[#01d3ff] transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-800">Message</label>
            <Textarea
              placeholder="Tell us about your project"
              rows={6}
              className="bg-gray-50 border border-gray-200 focus:border-[#01d3ff] focus:ring-[#01d3ff] transition-all"
            />
          </div>
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-[#245592] to-[#01d3ff] hover:from-[#01b4e5] hover:to-[#334152] text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
          >
            Send Message
          </Button>
        </div>

        {/* Contact Info */}
        <div className="space-y-8 animate-slide-in-right">
          {[
            {
              icon: Mail,
              title: "Email Us",
              lines: ["info@digipowerx.com", "sales@digipowerx.com"],
            },
            {
              icon: Phone,
              title: "Call Us",
              lines: ["+1 (555) 123-4567", "Mon–Fri, 9am–6pm EST"],
            },
            {
              icon: MapPin,
              title: "Headquarters",
              lines: ["Silicon Valley, CA", "United States"],
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-[#01d3ff]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-[#245592]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-gray-900">{item.title}</h3>
                  {item.lines.map((line, idx) => (
                    <p key={idx} className="text-gray-600 text-sm md:text-base">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
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
              
              <span className="font-bold text-foreground">
                <img
        src="src/assets/Group1.png"
        alt="DigiPowerX Logo"
        className="h-10 w-auto object-contain"
      />
              </span>
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
