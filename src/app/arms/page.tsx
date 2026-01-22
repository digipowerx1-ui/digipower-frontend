"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GradientText from "@/components/GradientText";
import { FadeIn } from "@/components/animations/FadeIn";
// import { Helmet } from "react-helmet-async";
import {
    Zap,
    Server,
    Gauge,
    Shield,
    Clock,
    Layers,
    TrendingUp,
    CheckCircle2,
    Download,
    Cpu,
    Snowflake
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Page() {
    const advantages = [
        {
            icon: Shield,
            title: "Tier III Rated",
            description: "Certified under TIA-942 design standards for concurrent maintainability"
        },
        {
            icon: Snowflake,
            title: "Flexible Cooling",
            description: "Pre-engineered for liquid or air-cooled workloads with direct-to-chip options"
        },
        {
            icon: Server,
            title: "Fully Integrated",
            description: "Complete power, cooling, and network distribution in one package"
        },
        {
            icon: TrendingUp,
            title: "Highly Scalable",
            description: "Expand from 200 kW to 50 MW+ campuses as your needs grow"
        },
        {
            icon: Clock,
            title: "Rapid Deployment",
            description: "Deployable in ≤ 12 months with prefabricated architecture"
        },
        {
            icon: Gauge,
            title: "High Performance",
            description: "Up to 600 kW of computing power per compact module"
        }
    ];

    const technicalSpecs = [
        { label: "Critical IT Load", value: "Up to 600 kW per module" },
        { label: "Redundancy", value: "Tier III (N+1)" },
        { label: "Cooling Systems", value: "Chilled-water or Direct-to-chip" },
        { label: "Deployment Time", value: "≤ 12 months" },
        { label: "Scalability", value: "200 kW to 50 MW+" },
        { label: "Architecture", value: "Modular prefabricated pods" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
            {/* ⭐ PAGE TITLE ADDED HERE */}
            {/* <Helmet>
        <title>DigiPowerX ARMS | Modular AI Cloud Infrastructure Solutions
        </title>
        <meta
          name="description"
          content="DigiPowerX ARMS delivers modular, Tier III-ready AI cloud pods with 600 kW high-density compute and rapid deployment for enterprise AI and cloud workloads.
."
        />
      </Helmet> */}
            <Navigation />

            {/* Hero Section */}
            <section className="relative py-24 px-6 text-white overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-brand-cyan rounded-full blur-[100px] animate-pulse" />
                    <div
                        className="absolute bottom-20 right-10 w-96 h-96 bg-brand-navy rounded-full blur-[120px] animate-pulse"
                        style={{ animationDelay: "1s" }}
                    />
                </div>

                <div className="relative max-w-7xl mx-auto text-center">
                    <FadeIn>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 mt-20">
                            <GradientText>The ARMS System</GradientText>
                        </h1>

                        {/* Underline */}
                        <div className="w-40 h-1.5 bg-gradient-to-r from-brand-navy to-brand-cyan rounded-full mx-auto mb-8"></div>



                        <p className="text-lg md:text-xl text-gray-500 max-w-4xl mx-auto mb-8">
                            Each ARMS 200 unit delivers up to 600 kW of computing power in a compact, rapidly deployable package.
                        </p>
                    </FadeIn>
                </div>
            </section>



            {/* ARMS 200 Overview */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <FadeIn delay={0.2}>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Left Column - Content */}
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                    <GradientText>ARMS 200 System</GradientText>
                                </h2>

                                <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                                    The ARMS 200 is DigiPowerX's proprietary modular data-center platform. Each module delivers up to 600 kW of critical IT load and is designed for Tier III redundancy (concurrent maintainability).
                                </p>

                                <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
                                    The system's prefabricated architecture allows rapid on-site assembly and integration with chilled-water or direct-to-chip cooling systems, making it the ideal solution for AI-ready infrastructure.
                                </p>

                                {/* Key Stats */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-gradient-to-br from-brand-cyan/10 to-brand-navy/10 border border-brand-cyan/20 rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Zap className="w-5 h-5 text-brand-cyan" />
                                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Power Capacity</span>
                                        </div>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">40 MW</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-brand-cyan/10 to-brand-navy/10 border border-brand-cyan/20 rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Clock className="w-5 h-5 text-brand-cyan" />
                                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Deployment</span>
                                        </div>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">≤ 12 Mo</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - ARMS Image */}
                            <div className="relative">
                                <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-12 border-2 border-gray-300 dark:border-slate-700 shadow-2xl">
                                    {/* ARMS 200 Image */}
                                    <div className="aspect-square flex items-center justify-center relative w-full h-full">
                                        <Image
                                            src="/arms.jpeg"
                                            alt="ARMS 200 System"
                                            fill
                                            className="object-contain rounded-xl"
                                        />
                                    </div>
                                </div>

                                {/* Floating badge */}
                                <div className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 border border-gray-200 dark:border-slate-700">
                                    <div className="flex items-center gap-2">
                                        <Shield className="w-6 h-6 text-brand-cyan" />
                                        <div>
                                            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Certified</p>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">Tier III</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ARMS Advantages */}
            <section className="py-20 px-6 bg-white dark:bg-slate-900 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    <FadeIn delay={0.3}>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                <GradientText>ARMS 200 Advantages</GradientText>
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                                Purpose-built for the demanding requirements of AI and high-performance computing workloads
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {advantages.map((advantage, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -8, scale: 1.03 }}
                                    className="
        relative p-[2px] rounded-2xl overflow-hidden
        bg-gradient-to-br from-brand-cyan/20 to-brand-navy/20
        hover:from-brand-cyan/40 hover:to-brand-navy/40
        transition-all duration-500
      "
                                >
                                    <div
                                        className="
          rounded-2xl p-6 h-full
          bg-white/40 dark:bg-slate-900/30 
          backdrop-blur-xl
          border border-white/20 dark:border-slate-700/40
          shadow-[0_4px_40px_rgba(0,0,0,0.15)]
          transition-all duration-500
        "
                                    >
                                        <div className="flex items-start gap-4">

                                            {/* Icon Box */}
                                            <div
                                                className="
              p-4 rounded-xl
              bg-gradient-to-br from-brand-cyan/20 to-brand-navy/20
              shadow-inner shadow-black/10
            "
                                            >
                                                <advantage.icon className="w-7 h-7 text-brand-cyan drop-shadow-[0_0_8px_rgba(34,197,252,0.6)]" />
                                            </div>

                                            <div>
                                                {/* Title with correct light + dark text colors */}
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                                    {advantage.title}
                                                </h3>

                                                {/* Description with correct light + dark theme text */}
                                                <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
                                                    {advantage.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                    </FadeIn>
                </div>
            </section>

            {/* Technical Specifications */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <FadeIn delay={0.4}>
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Specs Table */}
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-8">
                                    <GradientText>Technical Specifications</GradientText>
                                </h2>

                                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-xl overflow-hidden">
                                    {technicalSpecs.map((spec, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center justify-between p-5 ${index !== technicalSpecs.length - 1 ? 'border-b border-gray-200 dark:border-slate-700' : ''
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-brand-cyan flex-shrink-0" />
                                                <span className="font-semibold text-slate-700 dark:text-slate-300">
                                                    {spec.label}
                                                </span>
                                            </div>
                                            <span className="text-slate-900 dark:text-white font-bold text-right">
                                                {spec.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Future Expansion Info */}
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-8">
                                    <GradientText>Future-Ready Platform</GradientText>
                                </h2>

                                <div className="space-y-6">
                                    {/* ARMS 300 */}
                                    <div className="bg-gradient-to-br from-brand-cyan/5 to-brand-navy/5 border-2 border-brand-cyan/20 rounded-2xl p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Layers className="w-8 h-8 text-brand-cyan" />
                                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                                ARMS 300 Coming Soon
                                            </h3>
                                        </div>
                                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                            The next evolution of our ARMS platform, delivering even greater capacity and efficiency for next-generation AI workloads.
                                        </p>
                                    </div>

                                    {/* Strategic Partnerships */}
                                    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 shadow-lg">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Cpu className="w-8 h-8 text-brand-cyan" />
                                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                                Strategic Partnerships
                                            </h3>
                                        </div>
                                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                                            DigiPowerX leverages industry-leading technology through partnerships with:
                                        </p>
                                        <ul className="space-y-3">
                                            <li className="flex items-center gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-brand-cyan flex-shrink-0" />
                                                <span className="text-slate-700 dark:text-slate-300">
                                                    <strong className="text-slate-900 dark:text-white">Super Micro Computer</strong> - Advanced server solutions
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-brand-cyan flex-shrink-0" />
                                                <span className="text-slate-700 dark:text-slate-300">
                                                    <strong className="text-slate-900 dark:text-white">NVIDIA</strong> - GPU acceleration and AI compute
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <FadeIn delay={0.5}>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Deploy ARMS at Your Facility?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Contact our team to learn more about ARMS deployment, technical specifications, and customization options.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contact-us">
                                <Button
                                    size="lg"
                                    className="bg-white text-slate-900 hover:bg-gray-100 font-semibold px-8 py-6 text-lg"
                                >
                                    Request a Consultation
                                </Button>
                            </Link>
                            {/* <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Factsheet
              </Button> */}
                        </div>
                    </FadeIn>
                </div>
            </section>

            <Footer />
        </div>
    );
}
