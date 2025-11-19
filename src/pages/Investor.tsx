import { useState, useEffect } from "react";
import {
  FileDown,
  Newspaper,
  TrendingUp,
  LineChart,
  Mail,
  Building2,
  Calendar,
  DollarSign,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GradientText from "@/components/GradientText";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PressRelease {
  id: number;
  date: string;
  title: string;
  pdf: string;
}

interface StockDataPoint {
  date: string;
  price: number;
  volume: number;
}

export default function InvestorRelations() {
  const [chartPeriod, setChartPeriod] = useState<
    "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL"
  >("1M");

  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);

  // ✅ LIVE FETCH — TOP 4 PRESS RELEASES FROM STRAPI
  useEffect(() => {
    const fetchPressReleases = async () => {
      try {
        const res = await fetch(
          "https://thankful-miracle-1ed8bdfdaf.strapiapp.com/api/press-releases?populate=*"
        );
        const json = await res.json();

        const sorted = json.data.sort(
          (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        const topFour = sorted.slice(0, 4);

        const cleaned = topFour.map((item: any) => ({
          id: item.id,
          title: item.title,
          date: item.date,
          pdf: item.pdf_file?.url || "",
        }));

        setPressReleases(cleaned);
      } catch (err) {
        console.error("Error fetching press releases:", err);
      }
    };

    fetchPressReleases();
  }, []);

  // ✅ Dummy stock generator
  const generateStockData = (period: string): StockDataPoint[] => {
    const basePrice = 24.5;
    const dataPoints: StockDataPoint[] = [];

    const configs: any = {
      "1D": {
        points: 24,
        format: (i: number) =>
          `${9 + Math.floor(i / 2)}:${i % 2 === 0 ? "00" : "30"}`,
      },
      "1W": {
        points: 7,
        format: (i: number) =>
          ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
      },
      "1M": {
        points: 30,
        format: (i: number) => `Day ${i + 1}`,
      },
      "3M": {
        points: 90,
        format: (i: number) => `Day ${i + 1}`,
      },
      "1Y": {
        points: 52,
        format: (i: number) => `Week ${i + 1}`,
      },
      ALL: {
        points: 100,
        format: (i: number) => `Period ${i + 1}`,
      },
    };

    const config = configs[period];

    for (let i = 0; i < config.points; i++) {
      const variation = (Math.random() - 0.45) * 2;
      const price = basePrice + variation + i * 0.05;

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
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border-2 border-brand-cyan/20">
          <p className="text-sm text-slate-600 dark:text-gray-300 mb-1">
            {payload[0].payload.date}
          </p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            ${payload[0].value.toFixed(2)}
          </p>
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
            Volume: {(payload[0].payload.volume / 1_000_000).toFixed(2)}M
          </p>
        </div>
      );
    }
    return null;
  };

  const investorLinks = [
    {
      icon: LineChart,
      title: "Stock Information",
      description: "Real-time quote and performance chart for DigiPowerX stock.",
      link: "/stock-information",
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
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <Navigation />

      {/* ✅ HERO SECTION */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-20 md:py-32 text-center px-4">
        <FadeIn delay={0.2}>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
            <GradientText>Investor Relations</GradientText>
          </h1>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="w-32 md:w-40 h-1.5 bg-gradient-to-r from-brand-navy to-brand-cyan rounded-full mx-auto mt-6 mb-10" />
        </FadeIn>

        <FadeIn delay={0.6}>
          <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            <span className="text-brand-cyan font-bold text-xl md:text-2xl">Nasdaq: DGXX</span>
          </p>
          <p className="text-base md:text-lg text-slate-600 dark:text-gray-300 max-w-2xl mx-auto mt-4 px-4">
            Leader in Energy Assets and Data Center Infrastructure
          </p>
        </FadeIn>

        <FadeIn delay={0.8}>
          <Link to="/presentations-events">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button className="mt-8 bg-gradient-to-r from-brand-navy to-brand-cyan text-white px-6 md:px-8 py-4 md:py-6 text-base md:text-lg rounded-full shadow-xl">
                <FileDown className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Latest Investor Presentation
              </Button>
            </motion.div>
          </Link>
        </FadeIn>
      </section>

      {/* ✅ STOCK INFORMATION */}
      <section
        id="stock-info"
        className="py-12 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-slate-900"
      >
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4">
              <GradientText>Stock Information</GradientText>
            </h2>
            <p className="text-center text-slate-600 dark:text-gray-300 text-base md:text-lg mt-4 mb-8 md:mb-16 px-4">
              Track DigiPowerX's real-time stock performance and key financial metrics
            </p>
          </FadeIn>

          {/* Stock Overview Cards */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto mb-12 px-4">
            <StaggerItem>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-4 md:p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-700"
              >
                <DollarSign className="w-8 h-8 md:w-10 md:h-10 text-green-500 mb-3" />
                <p className="text-xs md:text-sm text-slate-500 dark:text-gray-400 mb-1">Stock Price</p>
                <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">$24.50</p>
                <p className="text-xs md:text-sm text-green-500 mt-2">+2.5% Today</p>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-4 md:p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-700"
              >
                <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-blue-500 mb-3" />
                <p className="text-xs md:text-sm text-slate-500 dark:text-gray-400 mb-1">Market Cap</p>
                <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">$450M</p>
                <p className="text-xs md:text-sm text-slate-600 dark:text-gray-300 mt-2">As of today</p>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-4 md:p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-700"
              >
                <LineChart className="w-8 h-8 md:w-10 md:h-10 text-purple-500 mb-3" />
                <p className="text-xs md:text-sm text-slate-500 dark:text-gray-400 mb-1">52 Week High</p>
                <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">$32.15</p>
                <p className="text-xs md:text-sm text-slate-600 dark:text-gray-300 mt-2">52W Low: $18.40</p>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-4 md:p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-700"
              >
                <Building2 className="w-8 h-8 md:w-10 md:h-10 text-orange-500 mb-3" />
                <p className="text-xs md:text-sm text-slate-500 dark:text-gray-400 mb-1">Volume</p>
                <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">2.5M</p>
                <p className="text-xs md:text-sm text-slate-600 dark:text-gray-300 mt-2">Avg: 1.8M</p>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>

          {/* Stock Chart */}
          <FadeIn delay={0.4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-4 md:p-8 max-w-6xl mx-auto border border-gray-100 dark:border-slate-700"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">Stock Performance</h3>

                {/* Time Period Selector */}
                <div className="flex gap-2 flex-wrap w-full md:w-auto">
                  {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const).map((period) => (
                    <motion.button
                      key={period}
                      onClick={() => setChartPeriod(period)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 md:px-4 py-2 rounded-lg font-semibold text-xs md:text-sm transition-all duration-300 ${
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
              <div className="h-[300px] md:h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={stockData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
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
                      style={{ fontSize: '10px' }}
                      interval={Math.floor(stockData.length / (window.innerWidth < 768 ? 4 : 6))}
                    />
                    <YAxis
                      stroke="#64748b"
                      style={{ fontSize: '10px' }}
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

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-xs md:text-sm text-slate-500 dark:text-gray-400 flex items-center">
                    <span className="inline-block w-3 h-3 bg-brand-cyan rounded-full mr-2"></span>
                    Live data powered by market providers
                  </p>
                  <p className="text-xs text-slate-400 dark:text-gray-500">
                    Last updated: {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>

              {/* API Integration Note */}
              <div className="mt-4 p-3 md:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 rounded-xl border border-brand-cyan/20">
                <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
                  <strong className="text-brand-navy dark:text-brand-cyan">📊 API Integration Ready:</strong> Replace the <code className="px-2 py-0.5 bg-white dark:bg-slate-700 rounded text-brand-cyan font-mono text-xs">generateStockData()</code> function with your API endpoint to display real-time stock data.
                </p>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* ✅ PRESS RELEASES — UPDATED WITH LIVE API FETCH */}
     <section className="py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950">
  <div className="container mx-auto px-4 md:px-6">

    {/* Heading + Link */}
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 gap-4">
      <FadeIn direction="left">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          <GradientText>Latest Press Releases</GradientText>
        </h2>
      </FadeIn>

      <FadeIn direction="right">
        <Link to="/press-release">
          <motion.button
            whileHover={{ x: 5 }}
            className="text-brand-cyan hover:text-brand-navy font-semibold flex items-center gap-2 text-sm md:text-base"
          >
            View all press releases →
          </motion.button>
        </Link>
      </FadeIn>
    </div>

    {/* Cards */}
    <StaggerContainer className="grid gap-4 md:gap-6 md:grid-cols-2 max-w-7xl mx-auto">

      {pressReleases.map((release) => (
        <StaggerItem key={release.id}>
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            onClick={() => release.pdf && window.open(release.pdf, "_blank")}
            className="
              group
              p-6 md:p-8
              bg-white dark:bg-slate-800
              rounded-2xl
              border border-gray-200 dark:border-slate-700
              shadow-md
              cursor-pointer
              relative
              overflow-hidden
              flex flex-col
              h-full
            "
          >
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 to-brand-navy/0 group-hover:from-brand-cyan/5 group-hover:to-brand-navy/5 transition-all duration-500" />

            <div className="relative z-10 flex flex-col h-full">

              {/* Date */}
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 text-brand-cyan" />
                <p className="text-xs md:text-sm text-slate-500 dark:text-gray-400">
                  {release.date}
                </p>
              </div>

              {/* Title */}
              <h3 className="font-bold text-lg md:text-xl leading-snug text-slate-900 dark:text-white group-hover:text-brand-navy dark:group-hover:text-brand-cyan">
                {release.title}
              </h3>

              {/* Spacer pushes button down */}
              <div className="flex-grow" />

              {/* Read More */}
              <motion.div
                className="mt-6 text-brand-cyan font-semibold flex items-center gap-2 text-sm md:text-base"
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


      {/* ✅ INVESTOR RESOURCES */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center mb-8 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 px-4">
                <GradientText>Investor Resources</GradientText>
              </h2>
              <p className="text-base md:text-lg text-slate-600 dark:text-gray-300 px-4">
                Explore comprehensive resources and stay informed about DigiPowerX's growth
                journey.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-7xl mx-auto">
            {investorLinks.map((item, index) => (
              <StaggerItem key={index}>
                <Link to={item.link}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group h-full p-6 md:p-8 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-lg cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 to-brand-navy/0 group-hover:from-brand-cyan/10 group-hover:to-brand-navy/10 transition-all" />

                    <motion.div
                      className={`mb-4 md:mb-6 w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}
                    >
                      <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </motion.div>

                    <h3 className="font-bold text-xl md:text-2xl mb-2 md:mb-3 text-slate-900 dark:text-white group-hover:text-brand-navy dark:group-hover:text-brand-cyan">
                      {item.title}
                    </h3>

                    <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed">
                      {item.description}
                    </p>

                    <motion.div
                      className="mt-4 md:mt-6 text-brand-cyan font-semibold flex items-center gap-2 text-sm md:text-base"
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