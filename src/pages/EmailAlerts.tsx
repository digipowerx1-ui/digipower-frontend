import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import GradientText from "@/components/GradientText";

export default function EmailAlerts() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    press: false,
    sec: false,
    stock: false,
    unsubscribe: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Navigation />

      {/* ======================= HERO SECTION ======================= */}
      <section className="py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <GradientText>Email Alerts</GradientText>
          </h1>

          <p className="text-lg text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
            Sign up to receive important updates, press releases, and SEC filings from DigiPowerX.
          </p>
        </motion.div>
      </section>

      {/* ======================= FORM SECTION ======================= */}
      <section className="py-10 px-6">
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-10">
          <h2 className="text-2xl font-bold mb-6 text-center text-brand-cyan">
            Stay Updated with DigiPowerX
          </h2>

          <form className="space-y-6">

            {/* EMAIL */}
            <div>
              <label className="block font-semibold mb-2 text-slate-700 dark:text-gray-300">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 
                bg-white dark:bg-slate-800 text-slate-800 dark:text-white 
                focus:ring-2 focus:ring-brand-cyan outline-none"
                placeholder="Enter your email"
              />
            </div>

            {/* FIRST NAME */}
            <div>
              <label className="block font-semibold mb-2 text-slate-700 dark:text-gray-300">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 
                bg-white dark:bg-slate-800 text-slate-800 dark:text-white 
                focus:ring-2 focus:ring-brand-cyan outline-none"
                placeholder="Enter your first name"
              />
            </div>

            {/* LAST NAME */}
            <div>
              <label className="block font-semibold mb-2 text-slate-700 dark:text-gray-300">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 
                bg-white dark:bg-slate-800 text-slate-800 dark:text-white 
                focus:ring-2 focus:ring-brand-cyan outline-none"
                placeholder="Enter your last name"
              />
            </div>

            {/* COMPANY */}
            <div>
              <label className="block font-semibold mb-2 text-slate-700 dark:text-gray-300">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 
                bg-white dark:bg-slate-800 text-slate-800 dark:text-white 
                focus:ring-2 focus:ring-brand-cyan outline-none"
                placeholder="Enter your company name"
              />
            </div>

            {/* ===================== CHECKBOX OPTIONS ===================== */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-4 text-brand-cyan">
                Subscribe to:
              </h3>

              <div className="space-y-4">

                {/* Press Releases */}
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="press"
                    checked={formData.press}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />
                  <span className="text-slate-700 dark:text-gray-300">Press Releases</span>
                </label>

                {/* SEC Filings */}
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="sec"
                    checked={formData.sec}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />
                  <span className="text-slate-700 dark:text-gray-300">All SEC Filings</span>
                </label>

                {/* Stock End of Day */}
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="stock"
                    checked={formData.stock}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />
                  <span className="text-slate-700 dark:text-gray-300">Stock Detail – End of Day</span>
                </label>

                {/* Unsubscribe */}
                <label className="flex items-center gap-3 mt-4">
                  <input
                    type="checkbox"
                    name="unsubscribe"
                    checked={formData.unsubscribe}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />
                  <span className="text-red-500 font-semibold">
                    Unsubscribe from all email communications
                  </span>
                </label>

              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-4 px-6 rounded-xl 
              bg-gradient-to-r from-brand-navy to-brand-cyan 
              text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Submit
            </motion.button>

          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
