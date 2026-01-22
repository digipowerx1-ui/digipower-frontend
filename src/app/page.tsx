"use client";
import dynamic from "next/dynamic";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Shield, Leaf } from "lucide-react";
import { motion } from "framer-motion";
/* import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"; */
import Navigation from "@/components/Navigation";
import FeatureCard from "@/components/FeatureCard";

import ContactUs from "@/components/ContactUs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { STRAPI_API } from "@/lib/strapi";

import GradientText from "@/components/GradientText";
import Footer from "@/components/Footer";
const DataCenterMap = dynamic(() => import("@/components/DataCenterMap"), { ssr: false });
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideIn } from "@/components/animations/SlideIn";
import { ScaleIn } from "@/components/animations/ScaleIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

const backgroundVideo = "/background.mp4";
import bannerLogo from "@/assets/USDC-logo.png";





export default function Home() {
    /* const [chartPeriod, setChartPeriod] = useState<'1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'>('1M');
  
    // Sample stock data - Replace with real API data
    const generateStockData = (period: string): StockDataPoint[] => {
      const basePrice = 24.50;
      const dataPoints: StockDataPoint[] = [];
  
      const configs = {
        '1D': { points: 24, format: (i: number) => `${9 + Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'}` },
        '1W': { points: 7, format: (i: number) => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i] },
        '1M': { points: 30, format: (i: number) => `Day ${i + 1}` },
        '3M': { points: 90, format: (i: number) => `Day ${i + 1}` },
        '1Y': { points: 52, format: (i: number) => `Week ${i + 1}` },
        'ALL': { points: 100, format: (i: number) => `Period ${i + 1}` },
      };
  
      const config = configs[period as keyof typeof configs];
  
      for (let i = 0; i < config.points; i++) {
        const variation = (Math.random() - 0.45) * 2;
        const price = basePrice + variation + (i * 0.05);
        dataPoints.push({
          date: config.format(i),
          price: Number(price.toFixed(2)),
          volume: Math.floor(1500000 + Math.random() * 2000000),
        });
      }
  
      return dataPoints;
    };
  
    const stockData = generateStockData(chartPeriod);
  
    const CustomTooltip = ({ active, payload }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-white p-4 rounded-xl shadow-xl border-2 border-brand-cyan/20">
            <p className="text-sm text-slate-600 mb-1">{payload[0].payload.date}</p>
            <p className="text-lg font-bold text-slate-900">
              ${payload[0].value.toFixed(2)}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Volume: {(payload[0].payload.volume / 1000000).toFixed(2)}M
            </p>
          </div>
        );
      }
      return null;
    }; */

    const heroStats = [
        {
            icon: Zap,
            label: "Power Assets",
            value: "400MW+",
            helper: "Available across campuses",
        },
        {
            icon: Shield,
            label: "Tier III Certified",
            value: "99.998%",
            helper: "TIA 942 certified",
        },
        // {
        //   icon: TrendingUp,
        //   label: "Latency",
        //   value: "<4ms",
        //   helper: "Avg. coast-to-core transit",
        // },
    ];
    return (
        <div className="min-h-screen bg-background scroll-smooth">

            <Navigation />

            {/* Hero Section with Enhanced Animations */}
            <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-white dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-black transition-colors duration-300">
                {/* Tron Grid Background */}
                <div className="absolute inset-0 opacity-10 dark:opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `
              linear-gradient(rgba(1, 211, 255, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(1, 211, 255, 0.2) 1px, transparent 1px)
            `,
                        backgroundSize: '50px 50px'
                    }}></div>
                </div>

                {/* Logo 1 - Moving in Rectangular Path (Clockwise) */}
                {/* <motion.div
          className="absolute z-0"
          animate={{
            x: ["0%", "80%", "80%", "0%", "0%"],
            y: ["20%", "20%", "70%", "70%", "20%"],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.div
            className="relative"
            animate={{
              filter: [
                "drop-shadow(0 0 20px rgba(1, 211, 255, 0.8)) drop-shadow(0 0 40px rgba(1, 211, 255, 0.5))",
                "drop-shadow(0 0 30px rgba(1, 211, 255, 1)) drop-shadow(0 0 60px rgba(1, 211, 255, 0.7))",
                "drop-shadow(0 0 20px rgba(1, 211, 255, 0.8)) drop-shadow(0 0 40px rgba(1, 211, 255, 0.5))",
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img
              src={logo}
              alt="DigiPowerX Logo 1"
              className="h-20 w-auto brightness-150 contrast-125"
              style={{
                filter: 'brightness(2) saturate(1.5)',
              }}
            />
          </motion.div>
        </motion.div> */}

                {/* Logo 2 - Moving in Rectangular Path (Counter-clockwise) */}
                {/* <motion.div
          className="absolute z-0"
          animate={{
            x: ["80%", "80%", "0%", "0%", "80%"],
            y: ["70%", "20%", "20%", "70%", "70%"],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.div
            className="relative"
            animate={{
              filter: [
                "drop-shadow(0 0 20px rgba(255, 94, 0, 0.8)) drop-shadow(0 0 40px rgba(255, 94, 0, 0.5))",
                "drop-shadow(0 0 30px rgba(255, 94, 0, 1)) drop-shadow(0 0 60px rgba(255, 94, 0, 0.7))",
                "drop-shadow(0 0 20px rgba(255, 94, 0, 0.8)) drop-shadow(0 0 40px rgba(255, 94, 0, 0.5))",
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img
              src={logo}
              alt="DigiPowerX Logo 2"
              className="h-20 w-auto brightness-150 contrast-125"
              style={{
                filter: 'brightness(2) saturate(1.5) hue-rotate(180deg)',
              }}
            />
          </motion.div>
        </motion.div> */}

                {/* Connection Point 1 - Top Right */}
                <motion.div
                    className="absolute z-0"
                    style={{ left: '80%', top: '20%' }}
                    animate={{
                        scale: [1, 2, 1],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.25, 0.5]
                    }}
                >
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-orange-400 rounded-full blur-md"></div>
                </motion.div>

                {/* Connection Point 2 - Bottom Left */}
                <motion.div
                    className="absolute z-0"
                    style={{ left: '0%', top: '70%' }}
                    animate={{
                        scale: [1, 2, 1],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.25, 0.5],
                        delay: 1.5
                    }}
                >
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-cyan-400 rounded-full blur-md"></div>
                </motion.div>

                {/* Energy Beam Connection - Animated Line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.6 }}>
                    <motion.line
                        x1="10%"
                        y1="20%"
                        x2="80%"
                        y2="20%"
                        stroke="url(#gradient1)"
                        strokeWidth="2"
                        animate={{
                            strokeDashoffset: [0, -100],
                            opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        strokeDasharray="10 5"
                    />
                    <motion.line
                        x1="80%"
                        y1="30%"
                        x2="80%"
                        y2="70%"
                        stroke="url(#gradient2)"
                        strokeWidth="2"
                        animate={{
                            strokeDashoffset: [0, -100],
                            opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 0.75
                        }}
                        strokeDasharray="10 5"
                    />
                    <motion.line
                        x1="10%"
                        y1="70%"
                        x2="80%"
                        y2="70%"
                        stroke="url(#gradient3)"
                        strokeWidth="2"
                        animate={{
                            strokeDashoffset: [0, -100],
                            opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 1.5
                        }}
                        strokeDasharray="10 5"
                    />
                    <motion.line
                        x1="10%"
                        y1="20%"
                        x2="10%"
                        y2="70%"
                        stroke="url(#gradient4)"
                        strokeWidth="2"
                        animate={{
                            strokeDashoffset: [0, -100],
                            opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 2.25
                        }}
                        strokeDasharray="10 5"
                    />
                    <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#01d3ff" />
                            <stop offset="100%" stopColor="#ff5e00" />
                        </linearGradient>
                        <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#ff5e00" />
                            <stop offset="100%" stopColor="#01d3ff" />
                        </linearGradient>
                        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#01d3ff" />
                            <stop offset="100%" stopColor="#ff5e00" />
                        </linearGradient>
                        <linearGradient id="gradient4" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#ff5e00" />
                            <stop offset="100%" stopColor="#01d3ff" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Ambient Glow Orbs */}
                <motion.div
                    className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.5, 0.3, 0.5]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 relative z-10">
                    <div className="grid lg:grid-cols-[1fr_1fr] gap-8 md:gap-12 items-center justify-center max-w-[1400px] mx-auto">
                        {/* Left Content with Stagger Animation */}
                        <StaggerContainer className="space-y-6 md:space-y-8 flex flex-col items-center justify-center text-center lg:text-left lg:items-start w-full">
                            <StaggerItem>
                                <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-600 dark:text-slate-200 shadow-lg shadow-brand-cyan/10 backdrop-blur">
                                    <span className="inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-brand-cyan to-brand-navy animate-pulse"></span>
                                    Live capacity expansion
                                </div>
                            </StaggerItem>
                            <StaggerItem>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight text-slate-900 dark:text-white transition-colors duration-300 text-center lg:text-left">
                                    <GradientText>Powering the Future of AI & Cloud Infrastructure</GradientText>
                                    <span className="block text-slate-500 dark:text-slate-300 text-sm md:text-base lg:text-lg tracking-[0.2em] md:tracking-[0.4em] uppercase mt-3">
                                        data infrastructure
                                    </span>
                                    {/* <span className="block mt-4">
                    <GradientText>Built for hyperscale AI velocity.</GradientText>
                  </span> */}
                                </h1>
                            </StaggerItem>

                            <StaggerItem>
                                <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed transition-colors duration-300 text-center lg:text-left mx-auto lg:mx-0 px-2 sm:px-0">
                                    At DigiPowerX, we design and deliver high-density, power-efficient data-center infrastructure that fuels AI, HPC, and enterprise workloads.
                                    Our mission is simple: build faster, operate smarter, and deliver sustainable compute power through Tier III facilities connected to robust power infrastructure.
                                    <br /><br />
                                    With utility-scale generation assets and modular Tier III designs, DigiPowerX enables partners to deploy AI capacity in months—not years.
                                </p>

                            </StaggerItem>

                            <StaggerItem>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mx-auto lg:mx-0">
                                    {heroStats.map((stat) => {
                                        const Icon = stat.icon;
                                        return (
                                            <motion.div
                                                key={stat.label}
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                className="rounded-2xl border border-slate-200/60 dark:border-white/5 bg-white/80 dark:bg-slate-900/60 p-6 shadow-lg shadow-brand-cyan/5 backdrop-blur text-center hover:shadow-xl hover:border-brand-cyan/30 transition-all duration-300"
                                            >
                                                <div className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                                                    <Icon className="h-4 w-4 text-brand-cyan" />
                                                    {stat.label}
                                                </div>
                                                <p className="text-3xl font-semibold text-slate-900 dark:text-white">
                                                    {stat.value}
                                                </p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                                                    {stat.helper}
                                                </p>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </StaggerItem>

                            {/* Enhanced Button Section */}
                            <StaggerItem>
                                <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start items-center w-full">
                                    <a href="/projects" className="w-full sm:w-auto">
                                        <motion.div
                                            whileHover={{ scale: 1.05, translateY: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                            className="w-full"
                                        >
                                            <Button
                                                size="lg"
                                                className="bg-gradient-to-r from-brand-navy to-brand-cyan hover:from-brand-cyan hover:to-brand-navy text-white font-medium text-base px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                                            >
                                                Explore Our Data Centers
                                                <ArrowRight className="ml-2 w-4 h-4 inline-block" />
                                            </Button>
                                        </motion.div>
                                    </a>

                                    <motion.div
                                        whileHover={{ scale: 1.05, translateY: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        className="w-full sm:w-auto"
                                    >
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            onClick={() => {
                                                const section = document.getElementById("technology");
                                                if (section) {
                                                    section.scrollIntoView({ behavior: "smooth" });
                                                }
                                            }}
                                            className="border border-blue-600 text-white hover:bg-blue-50 hover:border-blue-700 font-medium text-base px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg w-full sm:w-auto"
                                        >
                                            Learn About ARMS 200 Modular Systems
                                        </Button>
                                    </motion.div>
                                </div>
                            </StaggerItem>
                        </StaggerContainer>

                        {/* Right Video Section with Parallax Effect */}
                        <SlideIn direction="right" delay={0.2}>
                            <motion.div
                                className="relative w-full"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-gradient-to-r from-brand-navy/30 via-brand-cyan/30 to-white/20 blur-3xl opacity-60 animate-pulse"></div>
                                <div className="relative rounded-[32px] overflow-hidden shadow-[0_25px_80px_rgba(15,23,42,0.45)] border border-slate-200/60 dark:border-white/10 bg-slate-900 group cursor-pointer h-[350px] sm:h-[420px] md:h-[520px] xl:h-[640px]">
                                    <motion.video
                                        src={backgroundVideo}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                    >
                                        <source src={backgroundVideo} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </motion.video>

                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-900/10 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-700"></div>

                                    <div>
                                        {/* <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Live feed</p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">Phoenix Modular Campus</p> */}
                                        <p className="flex items-center gap-2 text-xs font-medium text-emerald-500">
                                            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                                            Cooling load active · 72%
                                        </p>
                                    </div>

                                    <div className="absolute bottom-6 right-6 w-60 rounded-2xl border border-white/40 dark:border-white/10 bg-slate-900/80 backdrop-blur-xl p-5 text-white shadow-2xl space-y-3">
                                        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70"></p>
                                        <div className="flex items-end justify-between gap-4">
                                            <div>
                                                {/* <p className="text-sm text-white/60"></p> */}
                                                <p className="text-3xl font-semibold">123MW</p>
                                            </div>
                                            {/* <div className="flex items-center gap-1 text-emerald-400 text-sm font-semibold">
                        <TrendingUp className="w-4 h-4" />
                        +12%
                      </div> */}
                                        </div>
                                        <div>
                                            {/* <div className="mb-1 flex items-center justify-between text-[11px] text-white/50">
                        <span>Deployment runway</span>
                        <span>72%</span>
                        <span>72%</span>
                      </div> */}
                                            <div className="h-1.5 rounded-full bg-white/15">
                                                <span className="block h-full w-[72%] rounded-full bg-gradient-to-r from-brand-cyan to-brand-navy"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </motion.div>
                        </SlideIn>
                    </div>
                </div>
            </section>

            {/* Banner Section with Slide Animation */}
            <FadeIn direction="up" duration={0.8}>
                <section className="bg-gradient-to-r from-[#245592] to-[#01d3ff] dark:from-[#12345a] dark:to-[#0190bb] text-white py-10 px-6 md:px-16 transition-colors duration-300">
                    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* LEFT TEXT */}
                        <SlideIn direction="left" delay={0.2}>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-semibold leading-snug">
                                    DigiPower X Launches <br />
                                    <span className="text-white font-semibold">US Data Centers, Inc.</span>
                                </h2>
                            </div>
                        </SlideIn>

                        {/* RIGHT SECTION */}
                        <SlideIn direction="right" delay={0.3}>
                            <div className="flex items-center gap-6 text-right">
                                {/* Logo */}
                                <ScaleIn delay={0.4}>
                                    <div className="p-4 rounded-lg flex items-center justify-center w-36 h-20 bg-white/10 backdrop-blur-sm">
                                        <Image
                                            src={bannerLogo}
                                            alt="US Data Centers Inc logo featuring modern data center design"
                                            className="w-full h-auto object-contain"
                                        />
                                    </div>
                                </ScaleIn>

                                {/* Text */}
                                <FadeIn delay={0.5}>
                                    <div className="space-y-1">
                                        <p className="text-gray-100 text-sm md:text-base">February 11, 2025</p>
                                        <motion.a
                                            href="https://cdn.prod.website-files.com/66f727b0f2cf943df67f3121/67aa03dcce10fc0e6ff625f4_USDC%20Deck_PS%202.7.25.pdf"
                                            className="text-white hover:underline text-sm md:text-base font-medium inline-block"
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        >
                                            View Company Presentation
                                        </motion.a>
                                    </div>
                                </FadeIn>
                            </div>
                        </SlideIn>
                    </div>
                </section>

            </FadeIn>

            {/* NeoCloudz Coming Soon Section */}
            {/* NeoCloudz Coming Soon Section */}
            <section className="relative py-24 bg-white dark:bg-slate-900 overflow-hidden transition-colors duration-300">
                {/* React State + Email Handler */}
                {(() => {
                    // We embed logic inside an IIFE block so the section still works standalone
                    const [email, setEmail] = useState("");
                    const [loading, setLoading] = useState(false);
                    const [message, setMessage] = useState("");

                    const handleNotifySubmit = async () => {
                        if (!email) {
                            setMessage("Please enter an email.");
                            return;
                        }

                        setLoading(true);
                        setMessage("");

                        try {
                            const res = await fetch(
                                STRAPI_API.notifyMe,
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        data: {
                                            email: email,
                                        },
                                    }),
                                }
                            );

                            if (!res.ok) throw new Error("Failed to submit");

                            setMessage("You will be notified!");
                            setEmail("");
                        } catch {
                            setMessage("Something went wrong. Try again.");
                        } finally {
                            setLoading(false);
                        }
                    };

                    return (
                        <>
                            {/* Animated Background */}
                            <motion.div
                                className="absolute inset-0 opacity-10"
                                animate={{ opacity: [0.05, 0.15, 0.05] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIzMjMyMyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
                            </motion.div>

                            {/* Glowing Orb */}
                            <motion.div
                                className="absolute -top-32 right-0 w-72 h-72 bg-[#01d3ff]/20 rounded-full blur-3xl opacity-40"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            />

                            <div className="container mx-auto px-6 relative z-10">
                                <div className="max-w-4xl mx-auto text-center space-y-8">

                                    {/* Tagline */}
                                    <ScaleIn delay={0.1}>
                                        <div className="inline-block px-5 py-2 bg-[#01d3ff]/10 rounded-full border border-[#01d3ff]/30 text-[#245592] font-semibold tracking-wide shadow-sm">
                                            ☁️ Coming Soon
                                        </div>
                                    </ScaleIn>

                                    {/* Heading */}
                                    <FadeIn delay={0.2} direction="up">
                                        <h2 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900 dark:text-white drop-shadow-md">
                                            <span className="bg-gradient-to-r from-[#245592] to-[#01d3ff] bg-clip-text text-transparent">
                                                NeoCloudz
                                            </span>{" "}
                                            – The Next Generation of Compute-as-a-Service
                                        </h2>
                                    </FadeIn>

                                    {/* Description */}
                                    <FadeIn delay={0.3} direction="up">
                                        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                                            Launching in <span className="text-[#01b4e5] font-medium">2026</span>,{" "}
                                            <strong className="text-gray-900 dark:text-white">NeoCloudz</strong> is the consumer and enterprise-facing arm of
                                            <strong className="text-[#245592] dark:text-[#01d3ff]"> DigiPowerX</strong>. It offers on-demand GPU and AI compute directly from our Tier III infrastructure.
                                        </p>
                                    </FadeIn>

                                    {/* Highlights */}
                                    <StaggerContainer staggerDelay={0.15} className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left text-gray-600 dark:text-gray-300 text-sm md:text-base mt-6">
                                        {[
                                            "Instant GPU rentals through a cloud interface",
                                            "Backed by DigiPowerX Tier III data centers",
                                            "Competitive, U.S.-based, low-latency compute",
                                            "API access for AI, rendering, and scientific workloads",
                                        ].map((item, i) => (
                                            <StaggerItem key={i}>
                                                <motion.div
                                                    className="flex items-start space-x-3 bg-gray-100 dark:bg-slate-800 rounded-xl p-4 border border-[#01d3ff]/20 hover:border-[#01d3ff]/40 transition-all duration-300"
                                                    whileHover={{ scale: 1.02, translateY: -2 }}
                                                >
                                                    <div className="w-2 h-2 mt-2 rounded-full bg-[#01d3ff]" />
                                                    <p>{item}</p>
                                                </motion.div>
                                            </StaggerItem>
                                        ))}
                                    </StaggerContainer>

                                    {/* ✅ SIGNUP FORM — LIVE API POST */}
                                    <FadeIn delay={0.5} direction="up">
                                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-10">

                                            <Input
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="bg-gray-50 border-[#01d3ff]/40 text-gray-900 placeholder:text-gray-400 rounded-xl"
                                            />

                                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                                <Button
                                                    size="lg"
                                                    disabled={loading}
                                                    onClick={handleNotifySubmit}
                                                    className="rounded-xl bg-gradient-to-r from-[#245592] to-[#01d3ff] text-white font-semibold shadow-lg"
                                                >
                                                    {loading ? "Submitting..." : "Sign Up for Updates"}
                                                </Button>
                                            </motion.div>
                                        </div>

                                        {message && (
                                            <p className="text-sm mt-3 text-gray-600 dark:text-gray-300">
                                                {message}
                                            </p>
                                        )}
                                    </FadeIn>

                                    {/* Teaser */}
                                    <FadeIn delay={0.6} direction="up">
                                        <p className="text-sm text-gray-500 italic mt-4 tracking-wide">
                                            Launching Soon — Be the first to experience the power of NeoCloudz.
                                        </p>
                                    </FadeIn>

                                    {/* </div>  ---  MISSING OR EXTRA DIV CLOSURE? LOOKS LIKE 441 in original */}
                                </div>
                            </div>
                        </>
                    );
                })()}
            </section>

            {/* About Section with Enhanced Stats */}
            <section id="about" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
                <div className="container mx-auto px-6">
                    {/* Heading */}
                    <FadeIn direction="up" className="max-w-4xl mx-auto text-center mb-3 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white transition-colors duration-300 mb-10">
                            DigiPowerX: Build Faster, Operate Smarter, <br />
                            <span className="bg-gradient-to-r from-[#245592] to-[#01d3ff] bg-clip-text text-transparent">
                                Deliver Sustainable Compute
                            </span>
                        </h2>


                        <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            DigiPowerX delivers cutting-edge data infrastructure solutions powered by our revolutionary{" "}
                            <strong className="text-gray-900">ARMS 200 modular system</strong>, enabling rapid deployment and
                            unmatched flexibility for enterprise clients.
                        </p>
                    </FadeIn>

                </div>
            </section>

            <Footer />
        </div>
    );
}
