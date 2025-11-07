import { useState } from "react";
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
import Projects from "@/components/Projects";

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
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Navigation />

      {/* Hero Section with Enhanced Animations */}
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-12 
  bg-white dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-black transition-colors duration-300">

  {/* Tron Background Grid */}
  <div className="absolute inset-0 opacity-10 dark:opacity-20">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(1, 211, 255, 0.2) 1px, transparent 1px),
          linear-gradient(90deg, rgba(1, 211, 255, 0.2) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    ></div>
  </div>

  {/* Glow Orbs */}
  <motion.div
    className="absolute top-10 right-5 w-40 h-40 sm:w-64 sm:h-64 md:w-96 md:h-96 
    bg-cyan-500/10 rounded-full blur-3xl"
    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  />

  <motion.div
    className="absolute bottom-10 left-5 w-40 h-40 sm:w-64 sm:h-64 md:w-96 md:h-96 
    bg-blue-500/10 rounded-full blur-3xl"
    animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.3, 0.5] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  />

  <div className="container mx-auto px-4 sm:px-6 py-10 relative z-10">
    
    {/* ✅ Responsive Grid */}
    <div className="grid gap-10 lg:grid-cols-2 items-center max-w-7xl mx-auto">

      {/* LEFT CONTENT */}
      <StaggerContainer className="space-y-6 sm:space-y-8">

        <StaggerItem>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-snug 
            text-slate-900 dark:text-white transition-colors duration-300">

            Powering the Future of
            <span className="block mt-2 sm:mt-3">
              <GradientText>AI & Cloud Infrastructure</GradientText>
            </span>
          </h1>
        </StaggerItem>

        <StaggerItem>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 
            dark:text-slate-300 max-w-xl text-justify">
            DigiPowerX builds, owns, and operates Tier III-certified modular 
            data-center infrastructure across the United States — engineered 
            for speed, scalability, and reliability.
          </p>
        </StaggerItem>

        {/* ✅ BUTTONS (center on mobile, left elsewhere) */}
        <StaggerItem>
          <div className="
            flex flex-col sm:flex-row gap-4 pt-4 
            items-center sm:items-start justify-center sm:justify-start 
            text-center sm:text-left">

            <a href="/projects">
              <motion.div whileHover={{ scale: 1.05, y: -2 }}>
                <Button
                  size="md"
                  className="bg-gradient-to-r from-brand-navy to-brand-cyan 
                  hover:from-brand-cyan hover:to-brand-navy text-white text-base px-6 py-3 rounded-lg"
                >
                  Explore Our Data Centers
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            </a>

            <motion.div whileHover={{ scale: 1.05, y: -2 }}>
              <Button
                size="md"
                variant="outline"
                onClick={() => {
                  document.getElementById("technology")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="border border-blue-600 text-white hover:bg-blue-50 
                hover:border-blue-700 text-base px-6 py-3 rounded-lg"
              >
                Learn About ARMS 200 Modular Systems
              </Button>
            </motion.div>

          </div>
        </StaggerItem>

      </StaggerContainer>

      {/* ✅ Right Video — Fully Responsive */}
      <SlideIn direction="right" delay={0.2}>
        <motion.div
          className="relative"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl 
            border border-slate-200 dark:border-slate-700 group cursor-pointer
            h-56 sm:h-72 md:h-[420px] lg:h-[520px]">

            <motion.video
              src={backgroundVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
            />

            <div className="absolute inset-0 bg-gradient-to-t 
              from-slate-900/60 via-transparent to-transparent 
              group-hover:from-slate-900/40 transition-all duration-500">
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
      <section className="relative py-24 bg-white dark:bg-slate-900 overflow-hidden transition-colors duration-300">
        {/* Subtle Animated Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIzMjMyMyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
        </motion.div>

        {/* Glowing Accent Orb */}
        <motion.div
          className="absolute -top-32 right-0 w-72 h-72 bg-[#01d3ff]/20 rounded-full blur-3xl opacity-40"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
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
              <h2 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900 dark:text-white drop-shadow-md transition-colors duration-300">
                <span className="bg-gradient-to-r from-[#245592] to-[#01d3ff] bg-clip-text text-transparent">
                  NeoCloudz
                </span>{" "}
                – The Next Generation of Compute-as-a-Service
              </h2>
            </FadeIn>

            {/* Description */}
            <FadeIn delay={0.3} direction="up">
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto transition-colors duration-300">
                Launching in <span className="text-[#01b4e5] font-medium">2026</span>,{" "}
                <strong className="text-gray-900 dark:text-white">NeoCloudz</strong> is the consumer and enterprise-facing arm of
                <strong className="text-[#245592] dark:text-[#01d3ff]"> DigiPowerX</strong>. It offers on-demand GPU and AI compute directly from our Tier III infrastructure —
                empowering developers, startups, and enterprises with sustainable U.S.-based high-performance computing power.
              </p>
            </FadeIn>

            {/* Highlights */}
            <StaggerContainer staggerDelay={0.15} className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left text-gray-600 dark:text-gray-300 text-sm md:text-base mt-6 transition-colors duration-300">
              {[
                "Instant GPU rentals through a cloud interface",
                "Backed by DigiPowerX Tier III data centers",
                "Competitive, U.S.-based, low-latency compute",
                "API access for AI, rendering, and scientific workloads",
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <motion.div
                    className="flex items-start space-x-3 bg-gray-100 dark:bg-slate-800 rounded-xl p-4 border border-[#01d3ff]/20 hover:border-[#01d3ff]/40 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer"
                    whileHover={{ scale: 1.02, translateY: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className="w-2 h-2 mt-2 rounded-full bg-[#01d3ff]"></div>
                    <p>{item}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Sign-Up Form */}
            <FadeIn delay={0.5} direction="up">
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-10">
                <Input
                  placeholder="Enter your email"
                  className="bg-gray-50 border-[#01d3ff]/40 text-gray-900 placeholder:text-gray-400 rounded-xl focus:border-[#01d3ff]/60 focus:ring-2 focus:ring-[#01d3ff]/40"
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="lg"
                    className="rounded-xl bg-gradient-to-r from-[#245592] to-[#01d3ff] hover:from-[#01b4e5] hover:to-[#334152] text-white font-semibold whitespace-nowrap shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Sign Up for Updates
                  </Button>
                </motion.div>
              </div>
            </FadeIn>

            {/* Teaser Text */}
            <FadeIn delay={0.6} direction="up">
              <p className="text-sm text-gray-500 italic mt-4 tracking-wide">
                Launching Soon — Be the first to experience the power of NeoCloudz.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* About Section with Enhanced Stats */}
      <section id="about" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="container mx-auto px-6">
          {/* Heading */}
          <FadeIn direction="up" className="max-w-4xl mx-auto text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
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
         <div className="flex justify-center ">
  <StaggerContainer
    staggerDelay={0.2}
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 text-center w-full max-w-6xl"
  >
    <StaggerItem>
      <div className="h-full flex">
        <StatCard
          value="3"
          label="United States-based mining sites"
          delay={0}
        />
      </div>
    </StaggerItem>
    <StaggerItem>
      <div className="h-full flex">
        <StatCard
          value="11.8k+"
          label="miners under our domain"
          delay={100}
        />
      </div>
    </StaggerItem>
    <StaggerItem>
      <div className="h-full flex">
        <StatCard
          value="100"
          label="megawatts of developed electrical infrastructure"
          delay={200}
        />
      </div>
    </StaggerItem>
  </StaggerContainer>
</div>

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




     {/* ✅ PROJECTS SECTION (Replaces Data Center Network Section) */}
<section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
 
 
    {/* ✅ Call the Projects Component */}
<Projects />
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
                  Every site we develop adheres to{" "}
                  <strong className="text-[#245592]">TIA-942 Tier III standards</strong>,
                  guaranteeing redundancy, uptime, and energy efficiency across our entire operational network.
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
                    src="public/aboutus.jpeg"
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

   <StaggerContainer staggerDelay={0.15} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
  {[
    {
      icon: Zap,
      title: "Lightning-Fast Deployment",
      description: "Modular Architecture: Our ARMS 200 pods deliver 200 kW – 5 MW units that scale seamlessly.",
      delay: 0,
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Tier III Certified Design: Concurrent maintainability and fault-tolerant infrastructure.",
      delay: 100,
    },
    {
      icon: Network,
      title: "Carrier-Neutral Connectivity",
      description: "Power Advantage: Direct connection to high-voltage substations and on-site generation.",
      delay: 200,
    },
    {
      icon: Boxes,
      title: "Modular Scalability",
      description: "Speed to Market: From permitting to commissioning in under 12 months.",
      delay: 300,
    },
    {
      icon: Leaf,
      title: "Sustainable Operations",
      description: "Sustainable Build Philosophy: Low PUE designs with optimized water and air systems.",
      delay: 400,
    },
    {
      icon: Zap,
      title: "AI-Optimized Infrastructure",
      description: "Purpose-built for AI workloads with high-density compute, GPU support, and ultra-low latency networking.",
      delay: 500,
    },
  ].map((feature, idx) => (
    <StaggerItem key={idx} className="flex">
      <FeatureCard
        icon={feature.icon}
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
      <section id="technology" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
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
                Revolutionary modular pod architecture designed for the AI era. Each ARMS 200 unit delivers
                200kW of computing power in a compact, rapidly deployable package.
              </p>

              <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                The <strong className="text-gray-900">ARMS 200</strong> is DigiPowerX's proprietary modular data-center platform.
                Each module delivers up to <strong className="text-[#01b4e5]">200 kW</strong> of critical IT load and is designed for
                <strong className="text-[#245592]"> Tier III redundancy</strong> (concurrent maintainability). The system's prefabricated
                architecture allows rapid on-site assembly and integration with chilled-water or direct-to-chip cooling systems.
              </p>

              {/* ARMS 200 Advantages */}
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
                            <div className="w-2 h-2 rounded-full bg-[#01d3ff]"></div>
                          </div>
                          <span className="text-justify">{item}</span>
                        </motion.li>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </FadeIn>
            </SlideIn>

            {/* RIGHT IMAGE / DIAGRAM */}
            <SlideIn direction="right" className="flex justify-center lg:justify-end">
              <motion.div
                className="w-full max-w-xl relative rounded-2xl overflow-hidden border-gray-200 transition-transform duration-500"
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                whileHover={{
                  scale: 1.08,
                  rotateY: 15,
                  rotateX: 5,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut"
                  }
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {/* Image */}
                <img
                  src="public/usdc200.png"
                  alt="DigiPowerX Data Center"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent rounded-2xl"></div>
              </motion.div>
            </SlideIn>
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
                  src="src/assets/image.jpeg"
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

      {/* Partnerships Section */}
      <section
  id="partners"
  className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300"
>
<div className="container mx-auto px-6">
<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
 
      {/* LEFT: TEXT CONTENT */}
<FadeIn direction="up" className="space-y-8">
<div>
<h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
            Trusted{" "}
<span className="bg-gradient-to-r from-[#245592] to-[#01d3ff] bg-clip-text text-transparent">
              Partners
</span>
</h2>
 
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
            DigiPowerX is actively collaborating with global technology and
            infrastructure leaders to accelerate the deployment of our
            Tier III NeoCloud™ AI platform.  
<br /><br />
            Following our recent acquisition of Supermicro systems powered by
            NVIDIA B200 GPUs, we are expanding strategic alliances that enable
            high-density, energy-efficient AI compute within our ARMS 200
            modular infrastructure pods.
<br /><br />
            If you are an energy producer, investor, or technology partner,
<span className="text-[#245592] font-semibold"> DigiPowerX</span>
            offers co-development opportunities that include joint ventures,
            GPU cloud-compute revenue models, power-purchase agreements, and
            colocation partnerships designed for scalable AI growth.
<br /><br />
            Join us as we build the next generation of sustainable, modular
            AI infrastructure.
</p>
</div>
 
        {/* CTA Button */}
<FadeIn delay={0.3} direction="up">
<motion.div
            whileHover={{ scale: 1.05, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="inline-block"
>
<Button
              size="lg"
              className="bg-gradient-to-r from-[#245592] to-[#01d3ff] hover:from-[#01b4e5] hover:to-[#334152] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4"
>
              Become a Partner
</Button>
</motion.div>
</FadeIn>
</FadeIn>
 
      {/* RIGHT: IMAGE */}
<FadeIn direction="right">
<img
          src="public/image.jpg"
          alt="Partner Collaboration"
          className="w-full h-auto rounded-2xl shadow-xl object-cover"
        />
</FadeIn>
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