import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "@splidejs/splide/dist/css/splide.min.css";
 
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GradientText from "@/components/GradientText";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import DataCenterMap from "@/components/DataCenterMap";
import Projects from "@/components/Projects";   // ✅ REUSABLE COMPONENT
 
import { Building2, Zap, Server, Gauge, MapPin, TrendingUp, Shield, Leaf } from "lucide-react";
 
// ✅ Interface stays same
interface SlideData {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  capacity: string;
  location: string;
  status: 'Operational' | 'Development' | 'Expansion';
}
 
interface Stat {
  icon: typeof Building2;
  value: string;
  label: string;
  color: string;
}
 
interface Feature {
  icon: typeof Shield;
  title: string;
  description: string;
  color: string;
}
 
export default function USDataCentersPage() {
 
  // ✅ DATA FOR REUSABLE PROJECTS COMPONENT
  const slides: SlideData[] = [
    {
      imageUrl: "https://cdn.prod.website-files.com/66f727b0f2cf943df67f3121/672193ab70dde9c6e62ee75f_Unknown.avif",
      imageAlt: "North Tonawanda Power Plant",
      title: "North Tonawanda Power Plant",
      capacity: "60 MW",
      location: "New York",
      status: "Operational",
      description:
        "State-of-the-art 60 MW combined cycle power plant utilizing both gas and steam turbines for maximum efficiency.",
    },
    {
      imageUrl: "https://cdn.prod.website-files.com/66f727b0f2cf943df67f3121/672193aa5666f763dd3c6466_Unknown-1.avif",
      imageAlt: "Buffalo Hydropower Facility",
      title: "Buffalo Hydropower Data Center",
      capacity: "18.7 MW",
      location: "Buffalo, NY",
      status: "Operational",
      description:
        "Powered by sustainable hydropower and built for Tier III compliance with advanced cooling technologies.",
    },
    {
      imageUrl: "https://cdn.prod.website-files.com/66f727b0f2cf943df67f3121/672533504e766ccec981b09a_Unknown.jpeg",
      imageAlt: "Alabama Data Center",
      title: "Alabama Utility-Powered Facility",
      capacity: "22 MW",
      location: "Alabama",
      status: "Operational",
      description:
        "High-density AI-ready facility with direct substation connectivity and optimized power distribution.",
    },
    {
      imageUrl: "https://cdn.prod.website-files.com/66f727b0f2cf943df67f3121/672533504e766ccec981b09a_Unknown.jpeg",
      imageAlt: "North Carolina Development Site",
      title: "North Carolina Development Site",
      capacity: "200 MW",
      location: "North Carolina",
      status: "Development",
      description:
        "200MW large-scale development site for next-generation AI compute expansion.",
    },
  ];
 
  const stats: Stat[] = [
    { icon: Building2, value: "4", label: "Active Facilities", color: "from-blue-500 to-cyan-500" },
    { icon: Zap, value: "300+", label: "Total MW Capacity", color: "from-green-500 to-teal-500" },
    { icon: Server, value: "99.982%", label: "Uptime SLA", color: "from-purple-500 to-pink-500" },
    { icon: Gauge, value: "Tier III", label: "Compliance Standard", color: "from-orange-500 to-red-500" },
  ];
 
  const features: Feature[] = [
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "24/7 monitoring with biometric access and SOC 2 compliance.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Leaf,
      title: "Sustainable Operations",
      description: "Renewable energy integration and efficient cooling systems.",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: TrendingUp,
      title: "Scalable Infrastructure",
      description: "Future-proof modular ARMS 200 platform for expansion.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Server,
      title: "AI-Optimized Hardware",
      description: "High-density GPU clustering and low-latency networking.",
      color: "from-orange-500 to-red-500",
    },
  ];
 
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900">
 
      <Navigation />
 
      {/* ✅ HERO SECTION */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6">
            <GradientText>U.S. Data Centers</GradientText>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
         DigiPowerX develops and operates Tier III-compliant data-center campuses strategically located across the United States.
Each facility integrates our ARMS 200 modular platform — a prefabricated, high-density system engineered for accelerated deployment and operational reliability.

          </p>
        </div>
      </section>
 
      {/* ✅ STATS */}
     {/* ✅ STATS SECTION – Gradient Premium Cards */}
<section className="py-20 px-6">
  <div className="max-w-7xl mx-auto">
    <StaggerContainer className="grid md:grid-cols-4 gap-8">

      {stats.map((stat, idx) => {
        const Icon = stat.icon;

        return (
          <StaggerItem key={idx}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 rounded-2xl text-center shadow-xl 
                         bg-gradient-to-br from-[#245592] to-[#01d3ff]
                         text-white border border-white/10 
                         hover:scale-[1.03] transition-transform"
            >
              
              <Icon className="w-12 h-12 mb-4 text-white opacity-90" />

              <h3 className="text-4xl font-extrabold tracking-tight">
                {stat.value}
              </h3>

              <p className="text-white/90 text-lg mt-2">
                {stat.label}
              </p>

            </motion.div>
          </StaggerItem>
        );
      })}

    </StaggerContainer>
  </div>
</section>

      <Projects slides={slides} />

 
      {/* ✅ MAP SECTION */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            <GradientText>Nationwide Coverage</GradientText>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            View our distributed U.S. footprint powering AI and cloud workloads.
          </p>
        </div>
 
        <FadeIn delay={0.3}>
          <DataCenterMap />
        </FadeIn>
      </section>
 
      {/* ✅ ✅ ✅ USE THE COMPONENT HERE */}
 
      {/* ✅ FEATURES */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg">
                <Icon className="w-10 h-10 mb-4 text-brand-cyan" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>
 
      <Footer />
    </div>
  );
}
 