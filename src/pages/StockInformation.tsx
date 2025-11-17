import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import GradientText from "@/components/GradientText";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

export default function StockInformation() {
  // Test stock data for the last 6 months
  const [timeRange, setTimeRange] = useState("6M");

  const stockData = {
    "1M": [
      { date: "Oct 15", price: 4.20 },
      { date: "Oct 18", price: 4.15 },
      { date: "Oct 21", price: 4.30 },
      { date: "Oct 24", price: 4.25 },
      { date: "Oct 27", price: 4.10 },
      { date: "Oct 30", price: 3.95 },
      { date: "Nov 2", price: 3.85 },
      { date: "Nov 5", price: 3.75 },
      { date: "Nov 8", price: 3.67 },
      { date: "Nov 11", price: 3.59 },
      { date: "Nov 14", price: 3.21 },
    ],
    "3M": [
      { date: "Aug 15", price: 5.20 },
      { date: "Aug 25", price: 5.10 },
      { date: "Sep 5", price: 4.95 },
      { date: "Sep 15", price: 4.80 },
      { date: "Sep 25", price: 4.65 },
      { date: "Oct 5", price: 4.50 },
      { date: "Oct 15", price: 4.20 },
      { date: "Oct 25", price: 4.10 },
      { date: "Nov 5", price: 3.75 },
      { date: "Nov 14", price: 3.21 },
    ],
    "6M": [
      { date: "May", price: 6.50 },
      { date: "Jun", price: 6.20 },
      { date: "Jul", price: 5.80 },
      { date: "Aug", price: 5.40 },
      { date: "Sep", price: 4.90 },
      { date: "Oct", price: 4.15 },
      { date: "Nov", price: 3.21 },
    ],
    "1Y": [
      { date: "Nov '24", price: 8.50 },
      { date: "Dec '24", price: 8.20 },
      { date: "Jan '25", price: 7.80 },
      { date: "Feb '25", price: 7.50 },
      { date: "Mar '25", price: 7.20 },
      { date: "Apr '25", price: 6.80 },
      { date: "May '25", price: 6.50 },
      { date: "Jun '25", price: 6.20 },
      { date: "Jul '25", price: 5.80 },
      { date: "Aug '25", price: 5.40 },
      { date: "Sep '25", price: 4.90 },
      { date: "Oct '25", price: 4.15 },
      { date: "Nov '25", price: 3.21 },
    ],
  };

  const currentData = stockData[timeRange as keyof typeof stockData];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {payload[0].payload.date}
          </p>
          <p className="text-lg font-bold text-brand-cyan">
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Navigation />

      {/* ======================= HERO SECTION ======================= */}
      <section className="py-24 px-6 text-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-4"
        >
          <GradientText>Stock Information</GradientText>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg text-gray-300 max-w-2xl mx-auto"
        >
          Stay up to date with DigiPowerX (Nasdaq: DGXX) stock performance, trends, and key trading metrics.
        </motion.p>
      </section>

      {/* ======================= STOCK CARDS ======================= */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          {/* CARD 1 – Price */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Nasdaq: DGXX</h3>
            <p className="text-4xl font-bold text-brand-cyan">$3.21</p>
            <p className="text-gray-400 text-sm mt-2">As of 11/14/2025 4:00 PM</p>
          </motion.div>

          {/* CARD 2 – Price Change */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Price Change</h3>
            <p className="text-3xl font-bold text-red-500">▼ -$0.46</p>
            <p className="text-gray-400 text-sm mt-2">-12.53%</p>
          </motion.div>

          {/* CARD 3 – Volume */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Volume</h3>
            <p className="text-4xl font-bold text-brand-cyan">6,135,229</p>
            <p className="text-gray-400 text-sm mt-2">Shares Traded Today</p>
          </motion.div>

        </div>

        {/* SECOND ROW */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mt-10">

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-8"
          >
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">Today's High</h3>
            <p className="text-3xl font-bold text-brand-cyan">$3.75</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-8"
          >
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">Today's Low</h3>
            <p className="text-3xl font-bold text-brand-cyan">$3.19</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-8"
          >
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">Open</h3>
            <p className="text-3xl font-bold text-brand-cyan">$3.59</p>
          </motion.div>

        </div>
      </section>

      {/* ======================= CHART SECTION ======================= */}
      <section className="py-16 px-6 bg-gray-100 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-4xl font-bold">
            <GradientText>Stock Performance Chart</GradientText>
          </h2>
          <p className="text-gray-500 dark:text-gray-300 max-w-2xl mx-auto mt-2">
            DGXX stock price trends over recent months.
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="max-w-4xl mx-auto mb-6 flex justify-center gap-2">
          {["1M", "3M", "6M", "1Y"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                timeRange === range
                  ? "bg-gradient-to-r from-brand-navy to-brand-cyan text-white shadow-lg"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-gray-300 dark:border-slate-700 hover:border-brand-cyan"
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-2xl shadow-xl p-6"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-slate-700" />
                <XAxis
                  dataKey="date"
                  stroke="#94a3b8"
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  stroke="#94a3b8"
                  style={{ fontSize: "12px" }}
                  domain={['dataMin - 0.5', 'dataMax + 0.5']}
                  tickFormatter={(value) => `$${value.toFixed(2)}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  fill="url(#colorPrice)"
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Chart Legend */}
          <div className="mt-4 flex justify-between items-center border-t border-gray-200 dark:border-slate-700 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand-cyan"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Stock Price (USD)</span>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 dark:text-slate-400">Last Updated</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Nov 14, 2025 4:00 PM</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ======================= CTA SECTION ======================= */}
      <section className="py-20 px-6 bg-slate-900 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Want Real-Time DGXX Alerts?
        </h2>
        <p className="max-w-xl mx-auto text-gray-300 mb-8">
          Sign up to receive instant email notifications about price updates and press releases.
        </p>
        <a
          href="/email-alerts"
          className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-brand-navy to-brand-cyan text-white font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          Sign up for Email Alerts
        </a>
      </section>

      <Footer />
    </div>
  );
}
