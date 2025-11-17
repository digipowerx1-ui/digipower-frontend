import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import GradientText from "@/components/GradientText";

export default function StockInformation() {
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

        {/* Chart Placeholder */}
        <div className="max-w-4xl mx-auto h-80 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-2xl shadow-inner flex items-center justify-center text-gray-400">
          <p className="text-sm">Chart will display here (use Chart.js or API data)</p>
        </div>
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
