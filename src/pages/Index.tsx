import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Network, Boxes, Leaf, Mail, MapPin, Phone, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Navigation from "@/components/Navigation";
import FeatureCard from "@/components/FeatureCard";
import StatCard from "@/components/StatCard";
import ContactUs from "@/components/ContactUs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import GradientText from "@/components/GradientText";
import Footer from "@/components/Footer";
import DataCenterMap from "@/components/DataCenterMap";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideIn } from "@/components/animations/SlideIn";
import { ScaleIn } from "@/components/animations/ScaleIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import WireLines from "@/components/WireLines";
import backgroundVideo from "@/assets/background.mp4";
import bannerLogo from "@/assets/USDC-logo.png";
import logo from "@/assets/logo.png";

interface StockDataPoint {   
  date: string;
  price: number;
  volume: number;
}

const Index = () => {
  const [chartPeriod, setChartPeriod] = useState<'1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'>('1M');

  // Sample stock data - Replace with real API data
  const generateStockData = (period: string): StockDataPoint[] => {
    const basePrice = 24.50;
    const dataPoints: StockDataPoint[] = [];

    const configs = {
      '1D': { points: 24, format: (i: number) => `${9 + Math.floor(i/2)}:${i % 2 === 0 ? '00' : '30'}` },
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
  };

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
                        whileHover={{ scale: 1.05, y: -5 }}
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
                        size="md"
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
                      size="md"
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
            <img
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
          "https://thankful-miracle-1ed8bdfdaf.strapiapp.com/api/notify-mes",
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

        setMessage("✅ You will be notified!");
        setEmail("");
      } catch (err) {
        setMessage("❌ Something went wrong. Try again.");
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
          <FadeIn direction="up" className="max-w-4xl mx-auto text-center mb-16 space-y-4">
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

          {/* Centered Stats Grid with Stagger */}
     {/* <div className="flex justify-center">
  <StaggerContainer
    staggerDelay={0.2}
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full max-w-6xl"
  >
    <StaggerItem>
      <StatCard
        value="3"
        label="United States-based mining sites"
        delay={0}
        className="h-full"
      />
    </StaggerItem>

    <StaggerItem>
      <StatCard
        value="11.8k+"
        label="miners under our domain"
        delay={100}
        className="h-full"
      />
    </StaggerItem>

    <StaggerItem>
      <StatCard
        value="100"
        label="electrical infrastructure"
        delay={200}
        className="h-full"
      />
    </StaggerItem>
  </StaggerContainer>
</div> */}

        </div>
      </section>

      {/* Stock Performance Section */}
      {/* <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-block p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-lg mb-4 transition-colors duration-300">
                <TrendingUp className="w-10 h-10 text-brand-cyan" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
                <span className="bg-gradient-to-r from-[#245592] to-[#01d3ff] bg-clip-text text-transparent">
                  Stock Performance
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
                Track DigiPowerX's real-time stock performance | <span className="text-brand-cyan font-bold">Nasdaq: DGXX</span>
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 md:p-8 max-w-6xl mx-auto border border-gray-100 dark:border-slate-700 transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                <div className="mb-4 md:mb-0">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1 transition-colors duration-300">Current Price</p>
                  <p className="text-4xl font-bold text-slate-900 dark:text-white transition-colors duration-300">$24.50</p>
                  <p className="text-sm text-green-500 mt-1">+2.5% Today</p>
                </div>

                {/* Time Period Selector */}
                {/* <div className="flex gap-2 flex-wrap">
                  {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const).map((period) => (
                    <motion.button
                      key={period}
                      onClick={() => setChartPeriod(period)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                        chartPeriod === period
                          ? 'bg-gradient-to-r from-brand-navy to-brand-cyan text-white shadow-lg'
                          : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
                      }`}
                    >
                      {period}
                    </motion.button>
                  ))}
                </div> */}
              {/* </div> */}

              {/* Chart */}
              {/* <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={stockData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorPriceHome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#01d3ff" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#01d3ff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="date"
                      stroke="#64748b"
                      style={{ fontSize: '12px' }}
                      interval={Math.floor(stockData.length / 6)}
                    />
                    <YAxis
                      stroke="#64748b"
                      style={{ fontSize: '12px' }}
                      domain={['auto', 'auto']}
                      tickFormatter={(value) => `$${value.toFixed(2)}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="#01d3ff"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorPriceHome)"
                      animationDuration={1000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div> */}

              {/* <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-slate-500">
                    <span className="inline-block w-3 h-3 bg-brand-cyan rounded-full mr-2"></span>
                    Live data powered by market providers
                  </p>
                  <a href="/investor" className="text-brand-cyan hover:text-brand-navy font-semibold text-sm transition-colors">
                    View Full Investor Relations →
                  </a>
                </div>
              </div> */}
            {/* </motion.div>
          </FadeIn>
        </div>
      </section>} */}

      {/* Interactive Data Center Map Section */}
      {/* <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-block p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-lg mb-4 transition-colors duration-300">
                <MapPin className="w-10 h-10 text-brand-cyan" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
                <span className="bg-gradient-to-r from-[#245592] to-[#01d3ff] bg-clip-text text-transparent">
                  Our Data Center Network
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
                Explore our strategically located Tier III data centers across the United States
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <DataCenterMap />
          </FadeIn>

          {/* Quick Stats Below Map */}
          {/* <FadeIn delay={0.5}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-12">
              <motion.div
                className="bg-gradient-to-br from-brand-navy to-brand-cyan rounded-2xl p-6 text-white text-center shadow-xl"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <p className="text-3xl md:text-4xl font-bold mb-2">300+</p>
                <p className="text-sm md:text-base opacity-90">Total MW</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl p-6 text-white text-center shadow-xl"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <p className="text-3xl md:text-4xl font-bold mb-2">4</p>
                <p className="text-sm md:text-base opacity-90">Locations</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white text-center shadow-xl"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <p className="text-3xl md:text-4xl font-bold mb-2">3</p>
                <p className="text-sm md:text-base opacity-90">States</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white text-center shadow-xl"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <p className="text-3xl md:text-4xl font-bold mb-2">Tier III</p>
                <p className="text-sm md:text-base opacity-90">Certified</p>
              </motion.div>
            </div>
          </FadeIn> */}
        {/* </div>
      </section>} */}




     {/* ✅ DATA CENTER MAP SECTION */}
<section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
  <div className="max-w-7xl mx-auto px-6">
    {/* Heading */}
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        <GradientText>Nationwide Coverage</GradientText>
      </h2>
      <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
        View our distributed U.S. footprint powering AI and cloud workloads.
      </p>
    </div>

    {/* Map Component */}
    <FadeIn delay={0.3}>
      <DataCenterMap />
    </FadeIn>
  </div>
</section>









      {/* About Us Details Section */}
      <section id="solutions" className="bg-white dark:bg-slate-950 transition-colors duration-300">
        {/* About Section */}
        <div className="relative py-24 w-full">
          <div className="container mx-auto px-6">
            {/* Heading Section */}
            <FadeIn direction="up" className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
                <span className="bg-gradient-to-r from-[#245592] to-[#01d3ff] bg-clip-text text-transparent">
                  About Us
                </span>
              </h2>

              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium transition-colors duration-300">
                Infrastructure That Scales With Innovation
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-[#245592] to-[#01d3ff] rounded-full mx-auto mt-4"></div>
            </FadeIn>

            {/* Content Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              {/* LEFT — Text */}
              <SlideIn direction="left" className="md:w-1/2 text-center md:text-left text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-6 text-justify transition-colors duration-300">
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
                  Every site we develop adheres to TIA-942 Tier III standards, guaranteeing redundancy, uptime, and energy efficiency.
                    </p>
              </SlideIn>

              {/* RIGHT — Image */}
              <SlideIn direction="right" className="md:w-1/2 relative group">
                <motion.div
                  className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 transition-transform duration-500"
                  whileHover={{ scale: 1.05, rotateY: 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img
                    src="/aboutus.jpeg"
                    alt="DigiPowerX Data Center"
                    className="w-full h-[400px] object-cover"
                  />
                </motion.div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
              </SlideIn>
            </div>
          </div>
        </div>

        {/* Key Differentiators Section */}
        <div className="container mx-auto px-6 mt-24">
          <FadeIn direction="up" className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
              Key{" "}
              <span className="bg-gradient-to-r from-[#245592] to-[#01d3ff] bg-clip-text text-transparent">
                Differentiators
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-medium transition-colors duration-300">
              The Pillars of DigiPowerX Infrastructure Excellence
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#245592] to-[#01d3ff] rounded-full mx-auto mt-4"></div>
          </FadeIn>

   <StaggerContainer
  staggerDelay={0.15}
  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
>
  {[
    {
      image: "/modular.png",
      title: "Modular Architecture:",
      description:
        "Our ARMS 200 pods deliver 600 kW – 10 MW+ units that scale seamlessly.",
      delay: 0,
    },
    {
      image: "/certified.png",
      title: "Tier III Certified Design",
      description:
        "Concurrent maintainability and fault-tolerant infrastructure.",
      delay: 100,
    },
    {
      image: "/power.png",
      title: "Power Advantage",
      description:
        "Direct connection to high-voltage substations and on-site generation.",
      delay: 200,
    },
    {
      image: "/speed.png",
      title: "Speed to Market",
      description: "From permitting to commissioning in under 12 months.",
      delay: 300,
    },
    {
      image: "/sustainable.png",
      title: "Sustainable Build Philosophy",
      description:
        "Low PUE designs with optimized water and air systems.",
      delay: 400,
    },
    {
      image: "/certified2.png",
      title: "AI-Optimized Infrastructure",
      description:
        "Purpose-built for AI workloads with high-density compute, GPU support, and ultra-low latency networking.",
      delay: 500,
    },
  ].map((feature, idx) => (
    <StaggerItem key={idx} className="flex">
      <FeatureCard
        image={feature.image}    // <-- Using image instead of icon
        title={feature.title}
        description={feature.description}
        delay={feature.delay}
        className="bg-gradient-to-br from-[#245592] to-[#01d3ff] text-white shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl p-6 flex flex-col flex-1"
      />
    </StaggerItem>
  ))}
</StaggerContainer>



        </div>
      </section>





      {/* ARMS 200 System Section */}
  <section
  id="technology"
  className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300"
>
  <div className="container mx-auto px-6">
    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
      
      {/* LEFT CONTENT */}
      <SlideIn direction="left" className="space-y-5 text-justify">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight text-left transition-colors duration-300">
          The{" "}
          <span className="bg-gradient-to-r from-[#245592] to-[#01d3ff] bg-clip-text text-transparent">
            ARMS 200
          </span>{" "}
          System
        </h2>

        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
          Revolutionary modular pod architecture designed for the AI era. Each
          ARMS 200 unit delivers up to 600 kW of computing power in a compact,
          rapidly deployable package.
        </p>

        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
          The ARMS 200 is DigiPowerX’s proprietary modular data-center platform.
          Each module delivers up to 600 kW of critical IT load and is designed
          for Tier III redundancy (concurrent maintainability). The system’s
          prefabricated architecture allows rapid on-site assembly and
          integration with chilled-water or direct-to-chip cooling systems.
        </p>

        <FadeIn delay={0.3} direction="up">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-[#245592] mt-6 mb-3 text-left">
              ARMS 200 Advantages:
            </h3>

            <StaggerContainer staggerDelay={0.1} className="space-y-3">
              {[
                "Tier III rated under TIA-942 design standards",
                "Pre-engineered for liquid or air-cooled workloads",
                "Fully integrated power, cooling, and network distribution",
                "Scalable from 200 kW to 50 MW+ campuses",
                "Deployable in ≤ 12 months",
              ].map((item, idx) => (
                <StaggerItem key={idx}>
                  <motion.li
                    className="flex items-start text-sm md:text-base text-gray-700 leading-relaxed"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#01d3ff]/20 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[#01d3ff]" />
                    </div>
                    <span className="text-justify">{item}</span>
                  </motion.li>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeIn>

        {/* Read More Button */}
        <FadeIn delay={0.4} direction="up">
          <Link to="/arms">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-[#245592] to-[#01d3ff] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Learn More About ARMS
            </motion.button>
          </Link>
        </FadeIn>
      </SlideIn>

      {/* RIGHT IMAGE / DIAGRAM */}
  <SlideIn direction="right" className="flex justify-center lg:justify-end">
  <motion.div
    className="
      relative 
      rounded-2xl 
      overflow-hidden
      border border-gray-300 dark:border-slate-700
      shadow-lg
      hover:shadow-2xl
      transition-all duration-500
      bg-white dark:bg-slate-900
      p-2                /* 👈 Tight padding so border fits image */
      inline-block       /* 👈 Makes the box match the exact size of the image */
    "
    style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    whileHover={{
      scale: 1.08,
      rotateY: 15,
      rotateX: 5,
      boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
      transition: { duration: 0.6, ease: "easeOut" },
    }}
    transition={{ type: "spring", stiffness: 200, damping: 15 }}
  >
    {/* IMAGE */}
    <img
      src="/arms.jpeg"
      alt="DigiPowerX Data Center"
      className="
        block
        w-full
        max-w-[260px]
        h-[220px]
        sm:max-w-[340px]
        sm:h-[260px]
        md:max-w-none
        md:h-[400px]
        object-contain
        rounded-xl    /* inner radius for clean look */
      "
    />

    {/* Fade Layer */}
    <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent rounded-xl pointer-events-none" />
  </motion.div>
</SlideIn>

    </div>
  </div>
</section>


<section className="py-12  bg-gray-50 dark:bg-slate-900">
  <div className="max-w-6xl mx-auto px-6 text-center">

    {/* Title */}
    <h2
      className="text-2xl md:text-3xl font-bold mb-6
      bg-gradient-to-r from-[#245592] via-[#3b82f6] to-[#01d3ff]
      bg-clip-text text-transparent"
    >
      Strategic Partnerships & Collaborations
    </h2>

    {/* Description */}
    <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-10">
      DigiPowerX works closely with <strong>Supermicro</strong> and 
      <strong> Nano Nuclear Energy Inc.</strong> to deliver next-generation 
      compute performance, advanced energy resilience, and cutting-edge 
      infrastructure within our ARMS ecosystem.
    </p>

    {/* Logos */}
    <div className="flex flex-col sm:flex-row justify-center items-center gap-12">

      {/* Supermicro */}
      <img
        src="/supermicro.png"
        alt="Supermicro"
        className="h-24 md:h-28 object-contain"
      />

      {/* Nano Nuclear */}.    
      {/* <img
        src="/nano.png"
        alt="Nano Nuclear"
        className="h-24 md:h-28 object-contain"
      /> */}

    </div>

  </div>
</section>









      {/* Sustainability Section */}
      <section id="sustainability" className="py-24 bg-white dark:bg-slate-950 w-full transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* LEFT — Image */}
            <SlideIn direction="left">
              <motion.div
                className="relative h-[420px] rounded-2xl overflow-hidden border border-gray-200 shadow-xl"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img
                  src="/image.jpeg"
                  alt="Sustainability"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent rounded-2xl"></div>
              </motion.div>
            </SlideIn>

            {/* RIGHT — Content */}
            <SlideIn direction="right" className="space-y-6">
              <ScaleIn delay={0.2}>
                <div className="inline-flex items-center space-x-2 text-[#01d3ff]">
                  <Leaf className="w-6 h-6" />
                  <span className="font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-300">Sustainability First</span>
                </div>
              </ScaleIn>

              <FadeIn delay={0.3} direction="up">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                  Building a{" "}
                  <span className="bg-gradient-to-r from-[#245592] to-[#01d3ff] bg-clip-text text-transparent">
                    Greener Future
                  </span>
                </h2>
              </FadeIn>

              <FadeIn delay={0.4} direction="up">
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-justify transition-colors duration-300">
                  DigiPowerX is committed to responsible energy infrastructure.
                  Our data centers leverage high-efficiency power distribution, heat-recovery designs,
                  and low-PUE operations. Wherever possible, we integrate on-site generation and renewable
                  power purchase agreements to offset carbon impact. We believe sustainable power is
                  intelligent power — and that scalable AI infrastructure can coexist with environmental
                  responsibility.
                </p>
              </FadeIn>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Contact Section (moved to reusable component) */}
      <ContactUs />

      {/* Footer */}
    </div>
  );
};

export default Index;

