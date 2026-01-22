"use client";

import { motion } from "framer-motion";
import "@splidejs/splide/dist/css/splide.min.css";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GradientText from "@/components/GradientText";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
// import Projects from "@/components/Projects"; // Commented out in original
import { Building2, Zap, Server, Gauge, TrendingUp, Shield, Leaf } from "lucide-react";
import dynamic from "next/dynamic";
// import { Helmet } from "react-helmet-async";

const DataCenterMap = dynamic(() => import("@/components/DataCenterMap"), { ssr: false });

/* interface SlideData {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  capacity: string;
  location: string;
  status: 'Operational' | 'Development' | 'Expansion';
} */

interface Stat {
    icon: typeof Building2;
    value: string;
    label: string;
    color: string;
}

export default function Page() {
    /* const slides: SlideData[] = [
      {
        imageUrl: "https://cdn.prod.website-files.com/66f727b0f2cf943df67f3121/672193ab70dde9c6e62ee75f_Unknown.avif",
        imageAlt: "North Tonawanda Power Plant",
        title: "NY Power Plant",
        capacity: "123 MW",
        location: "New York",
        status: "Operational",
        description:
          "State-of-the-art 123 MW + 63 MW combined cycle facility, combined with 60 MW utility power for maximum efficiency.",
      },
      ...
    ]; */

    const stats: Stat[] = [
        { icon: Building2, value: "4", label: "Active Facilities", color: "from-blue-500 to-cyan-500" },
        { icon: Zap, value: "400+", label: "Total MW Capacity", color: "from-green-500 to-teal-500" },
        { icon: Server, value: "99.982%", label: "Uptime SLA", color: "from-purple-500 to-pink-500" },
        { icon: Gauge, value: "Tier III", label: "Compliance Standard", color: "from-orange-500 to-red-500" },
    ];

    const features = [
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

            {/* ⭐ PAGE TITLE ADDED HERE */}
            {/* <Helmet>
        <title>DigiPowerX Projects | AI Cloud & Advanced Infrastructure Builds
        </title>
        <meta
          name="description"
          content="Explore DigiPowerX’s projects featuring cloud infrastructure, AI-ready data centres, and enterprise solutions built for secure, high-performance workloads.
."
        />
      </Helmet> */}

            <Navigation />

            {/* HERO SECTION */}
            <section className="relative py-32 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-6xl font-bold mb-6">
                        <GradientText>U.S. Data Centers</GradientText>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                        DigiPowerX develops and operates Tier III-compliant data-center campuses strategically located across the United States.
                        Each facility integrates our ARMS 200 modular platform — engineered for accelerated deployment and operational reliability.
                    </p>
                </div>
            </section>

            {/* STATS */}
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
                                        className="p-8 rounded-2xl text-center shadow-xl bg-gradient-to-br from-[#245592] to-[#01d3ff] text-white border border-white/10 hover:scale-[1.03] transition-transform"
                                    >
                                        <Icon className="w-12 h-12 mb-4 opacity-90" />
                                        <h3 className="text-4xl font-extrabold tracking-tight">{stat.value}</h3>
                                        <p className="text-white/90 text-lg mt-2">{stat.label}</p>
                                    </motion.div>
                                </StaggerItem>
                            );
                        })}
                    </StaggerContainer>
                </div>
            </section>

            {/* MAP */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">
                        <GradientText>Nationwide Coverage</GradientText>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12">
                        View our distributed U.S. footprint powering AI and cloud workloads.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto">
                    <DataCenterMap />
                </div>
            </section>

            {/* FEATURES */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
                    {features.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg">
                                <Icon className="w-10 h-10 mb-4 text-brand-cyan" />
                                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            <Footer />
        </div>
    );
}
