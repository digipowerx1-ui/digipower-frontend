import { useState } from "react";
import { FileDown, Newspaper, TrendingUp, LineChart, Mail, Building2, Calendar, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart as RechartsLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GradientText from "@/components/GradientText";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideIn } from "@/components/animations/SlideIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PressRelease {
  date: string;
  title: string;
}

interface StockDataPoint {
  date: string;
  price: number;
  volume: number;
}

export default function InvestorRelations() {
  const [chartPeriod, setChartPeriod] = useState<'1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'>('1M');

  // Sample stock data - Replace with real API data
  // You can fetch this from your API: fetch('/api/stock-data?period=' + chartPeriod)
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
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border-2 border-brand-cyan/20 transition-colors duration-300">
          <p className="text-sm text-slate-600 dark:text-gray-300 mb-1 transition-colors duration-300">{payload[0].payload.date}</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white transition-colors duration-300">
            ${payload[0].value.toFixed(2)}
          </p>
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 transition-colors duration-300">
            Volume: {(payload[0].payload.volume / 1000000).toFixed(2)}M
          </p>
        </div>
      );
    }
    return null;
  };

  const pressReleases: PressRelease[] = [
    {
      date: "November 3, 2025",
      title: "Digi Power X Strengthens Balance Sheet to Support 2026 AI Infrastructure Development Plan",
    },
    {
      date: "October 30, 2025",
      title: "Digi Power X to Announce 2025 Q3 Financial Results on November 13th",
    },
    {
      date: "October 22, 2025",
      title: "Digi Power X Appoints Wealth Management Leader Ajay Gupta to its Board of Directors",
    },
    {
      date: "October 21, 2025",
      title: "Digi Power X Announces Strategic Initiatives, Including Expansion of ARMS-200 Modules and Development of Retail Compute Platform",
    },
  ];

  const investorLinks = [
    {
      icon: LineChart,
      title: "Stock Information",
      description: "Real-time quote and performance chart for DigiPowerX stock.",
      link: "#stock-info",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FileDown,
      title: "SEC Filings",
      description: "Access financial statements, reports, and compliance documents.",
      link: "/sec",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Calendar,
      title: "Events & Presentations",
      description: "View upcoming events, webcasts, and investor presentations.",
      link: "/presentations-events",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: Newspaper,
      title: "Press Releases",
      description: "Latest news and announcements from DigiPowerX.",
      link: "/press-release",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Building2,
      title: "Corporate Governance",
      description: "Learn about our board, committees, and governance practices.",
      link: "/leadership-committees",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: Mail,
      title: "Contact IR",
      description: "Get in touch with our investor relations team.",
      link: "/contact-us",
      color: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white scroll-smooth transition-colors duration-300">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-32 text-center overflow-hidden transition-colors duration-300">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-brand-cyan/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-brand-navy/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <GradientText>Investor Relations</GradientText>
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="w-40 h-1.5 bg-gradient-to-r from-brand-navy to-brand-cyan rounded-full mx-auto mt-6 mb-10" />
          </FadeIn>

          <FadeIn delay={0.6}>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto mb-4 transition-colors duration-300">
              <span className="text-brand-cyan font-bold text-2xl">Nasdaq: DGXX</span>
            </p>
            <p className="text-lg text-slate-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 transition-colors duration-300">
              Leader in Energy Assets and Data Center Infrastructure
            </p>
          </FadeIn>

          <FadeIn delay={0.8}>
            <Link to="/presentations-events">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-brand-navy to-brand-cyan hover:from-brand-cyan hover:to-brand-navy text-white font-semibold px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <FileDown className="w-5 h-5 mr-2" />
                  Download Investor Presentation
                </Button>
              </motion.div>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Stock Information Section */}
      <section id="stock-info" className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <GradientText>Stock Information</GradientText>
            </h2>
            <p className="text-center text-slate-600 dark:text-gray-300 text-lg mb-16 max-w-2xl mx-auto transition-colors duration-300">
              Track DigiPowerX's real-time stock performance and key financial metrics
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            <StaggerItem>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-700"
              >
                <DollarSign className="w-10 h-10 text-green-500 mb-3" />
                <p className="text-sm text-slate-500 dark:text-gray-400 mb-1 transition-colors duration-300">Stock Price</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white transition-colors duration-300">$24.50</p>
                <p className="text-sm text-green-500 mt-2">+2.5% Today</p>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-700"
              >
                <TrendingUp className="w-10 h-10 text-blue-500 mb-3" />
                <p className="text-sm text-slate-500 dark:text-gray-400 mb-1 transition-colors duration-300">Market Cap</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white transition-colors duration-300">$450M</p>
                <p className="text-sm text-slate-600 dark:text-gray-300 mt-2 transition-colors duration-300">As of today</p>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-700"
              >
                <LineChart className="w-10 h-10 text-purple-500 mb-3" />
                <p className="text-sm text-slate-500 dark:text-gray-400 mb-1 transition-colors duration-300">52 Week High</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white transition-colors duration-300">$32.15</p>
                <p className="text-sm text-slate-600 dark:text-gray-300 mt-2 transition-colors duration-300">52W Low: $18.40</p>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-700"
              >
                <Building2 className="w-10 h-10 text-orange-500 mb-3" />
                <p className="text-sm text-slate-500 dark:text-gray-400 mb-1 transition-colors duration-300">Volume</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white transition-colors duration-300">2.5M</p>
                <p className="text-sm text-slate-600 dark:text-gray-300 mt-2 transition-colors duration-300">Avg: 1.8M</p>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>

          <FadeIn delay={0.4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 max-w-6xl mx-auto border border-gray-100 dark:border-slate-700 transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 md:mb-0 transition-colors duration-300">Stock Performance</h3>

                {/* Time Period Selector */}
                <div className="flex gap-2 flex-wrap">
                  {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const).map((period) => (
                    <motion.button
                      key={period}
                      onClick={() => setChartPeriod(period)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                        chartPeriod === period
                          ? 'bg-gradient-to-r from-brand-navy to-brand-cyan text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {period}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Chart */}
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={stockData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
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
                      fill="url(#colorPrice)"
                      animationDuration={1000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700 transition-colors duration-300">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="text-sm text-slate-500 dark:text-gray-400 transition-colors duration-300">
                    <span className="inline-block w-3 h-3 bg-brand-cyan rounded-full mr-2"></span>
                    Live data powered by market providers
                  </p>
                  <p className="text-xs text-slate-400 dark:text-gray-500 transition-colors duration-300">
                    Last updated: {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>

              {/* API Integration Note */}
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 rounded-xl border border-brand-cyan/20 transition-colors duration-300">
                <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                  <strong className="text-brand-navy dark:text-brand-cyan transition-colors duration-300">📊 API Integration Ready:</strong> Replace the <code className="px-2 py-0.5 bg-white dark:bg-slate-700 rounded text-brand-cyan font-mono text-xs transition-colors duration-300">generateStockData()</code> function with your API endpoint (e.g., <code className="px-2 py-0.5 bg-white dark:bg-slate-700 rounded text-brand-cyan font-mono text-xs transition-colors duration-300">fetch('/api/stock-data?period=' + chartPeriod)</code>) to display real-time stock data.
                </p>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <FadeIn direction="left">
              <h2 className="text-4xl md:text-5xl font-bold">
                <GradientText>Latest Press Releases</GradientText>
              </h2>
            </FadeIn>
            <FadeIn direction="right">
              <Link to="/press-release">
                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-brand-cyan hover:text-brand-navy font-semibold flex items-center gap-2 transition-colors duration-300"
                >
                  View all press releases
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </Link>
            </FadeIn>
          </div>

          <StaggerContainer className="grid gap-6 md:grid-cols-2 max-w-7xl mx-auto">
            {pressReleases.map((release, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="group p-8 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer relative overflow-hidden"
                >
                  {/* Animated background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 to-brand-navy/0 group-hover:from-brand-cyan/5 group-hover:to-brand-navy/5 transition-all duration-500" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="w-5 h-5 text-brand-cyan" />
                      <p className="text-sm text-slate-500 dark:text-gray-400 font-medium transition-colors duration-300">{release.date}</p>
                    </div>
                    <h3 className="font-bold text-xl leading-snug text-slate-900 dark:text-white group-hover:text-brand-navy dark:group-hover:text-brand-cyan transition-colors duration-300">
                      {release.title}
                    </h3>
                    <motion.div
                      className="mt-4 text-brand-cyan font-semibold flex items-center gap-2"
                      whileHover={{ x: 5 }}
                    >
                      Read more →
                    </motion.div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Investor Links */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <GradientText>Investor Resources</GradientText>
              </h2>
              <p className="text-lg text-slate-600 dark:text-gray-300 transition-colors duration-300">
                Explore comprehensive resources and stay informed about DigiPowerX's growth journey
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {investorLinks.map((item, index) => (
              <StaggerItem key={index}>
                <Link to={item.link}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group h-full p-8 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer relative overflow-hidden"
                  >
                    {/* Animated background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 to-brand-navy/0 group-hover:from-brand-cyan/10 group-hover:to-brand-navy/10 transition-all duration-500" />

                    <motion.div
                      className={`mb-6 w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} bg-opacity-10 flex items-center justify-center relative z-10`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="font-bold text-2xl mb-3 text-slate-900 dark:text-white relative z-10 group-hover:text-brand-navy dark:group-hover:text-brand-cyan transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-gray-300 leading-relaxed relative z-10 transition-colors duration-300">{item.description}</p>

                    <motion.div
                      className="mt-6 text-brand-cyan font-semibold flex items-center gap-2 relative z-10"
                      whileHover={{ x: 5 }}
                    >
                      Learn more →
                    </motion.div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <Footer />
    </div>
  );
}
