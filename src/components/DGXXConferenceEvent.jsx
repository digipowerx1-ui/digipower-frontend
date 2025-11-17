import { motion } from "framer-motion";
import GradientText from "@/components/GradientText";
import { Calendar, Clock, Users, ArrowRight, ExternalLink } from "lucide-react";

export default function DGXXConferenceEvent() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 rounded-3xl shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-500"
        >
          {/* Gradient Top Accent */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-navy via-brand-cyan to-brand-navy bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />

          {/* Background Decorative Elements */}
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl group-hover:bg-brand-cyan/10 transition-all duration-500" />
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-brand-navy/5 rounded-full blur-3xl group-hover:bg-brand-navy/10 transition-all duration-500" />

          {/* Content */}
          <div className="relative z-10 p-8 md:p-12">
            {/* Header Section */}
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-2 bg-gradient-to-r from-brand-navy/10 to-brand-cyan/10 border border-brand-cyan/20 rounded-full mb-4"
              >
                <span className="text-sm font-bold text-brand-cyan">Featured Event</span>
              </motion.div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                <GradientText>DGXX Conference Presentation</GradientText>
              </h2>

              <p className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-2">
                AI Infra Summit (San Francisco)
              </p>
              <p className="text-base md:text-lg font-medium text-brand-cyan">
                iAccess Alpha Winter Conference 2025
              </p>
            </div>

            {/* Description */}
            <div className="mb-10 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base md:text-lg">
                DigiPowerX (<span className="font-semibold text-slate-900 dark:text-white">NASDAQ: DGXX / TSXV: DGX</span>) will present groundbreaking AI infrastructure innovations at the{" "}
                <span className="font-semibold text-brand-cyan">AI Infra Summit in San Francisco</span>.
                DGXX is also featured at the{" "}
                <span className="font-semibold text-slate-900 dark:text-white">
                  iAccess Alpha Virtual Best Ideas Winter Investment Conference 2025
                </span>, showcasing the company's leadership in scalable AI-ready infrastructure.
              </p>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
              {/* Date */}
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                className="flex items-center gap-4 p-4 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-cyan/10">
                  <Calendar className="w-6 h-6 text-brand-cyan" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Date</p>
                  <p className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
                    December 9, 2025
                  </p>
                </div>
              </motion.div>

              {/* Time */}
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                className="flex items-center gap-4 p-4 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-cyan/10">
                  <Clock className="w-6 h-6 text-brand-cyan" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Time</p>
                  <p className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
                    9:00 AM ET
                  </p>
                </div>
              </motion.div>

              {/* Event */}
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                className="flex items-center gap-4 p-4 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-cyan/10">
                  <Users className="w-6 h-6 text-brand-cyan" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Event</p>
                  <p className="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                    Winter Investment Conference
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Live Webcast Button */}
              <motion.a
                href="https://www.webcaster5.com/Webcast/Page/3148/53192"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 w-full sm:flex-1 px-8 py-4 rounded-xl text-white font-bold text-base md:text-lg bg-gradient-to-r from-brand-navy to-brand-cyan shadow-lg hover:shadow-xl hover:shadow-brand-cyan/30 transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5" />
                Live Webcast
                <ArrowRight className="w-5 h-5" />
              </motion.a>

              {/* Registration Button */}
              <motion.a
                href="https://www.iaccessalpha.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 w-full sm:flex-1 px-8 py-4 rounded-xl font-bold text-base md:text-lg border-2 border-brand-cyan text-brand-cyan bg-white dark:bg-slate-900 hover:bg-brand-cyan/10 dark:hover:bg-brand-cyan/10 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Register / More Info
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
