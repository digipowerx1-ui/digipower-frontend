import { motion } from "framer-motion";
import GradientText from "@/components/GradientText";
import { Calendar, Clock, Users, ArrowRight } from "lucide-react";

export default function DGXXConferenceEvent() {
  return (
    <div className="max-w-8xl mx-auto px-6 md:px-10 my-32"> 
      {/* ⬆️ ADDED CLEAN OUTER SPACING */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-white dark:bg-slate-900 
                   border border-gray-200 dark:border-slate-700 
                   rounded-3xl shadow-xl p-12 overflow-hidden"
      >
        {/* Gradient Top Accent */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-navy to-brand-cyan" />

        {/* Background Glows */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl" />
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-navy/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Title */}
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">
            <GradientText>DGXX Conference Presentation</GradientText>
          </h2>

          {/* Subtitle */}
          <p className="text-xl font-semibold text-brand-cyan mb-6">
            AI Infra Summit (San Francisco) & iAccess Alpha Winter Conference 2025
          </p>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-10">
            DigiPowerX (NASDAQ: DGXX / TSXV: DGX) will present groundbreaking AI
            infrastructure innovations at the{" "}
            <span className="font-semibold text-brand-cyan">
              AI Infra Summit in San Francisco
            </span>. DGXX is also featured at the{" "}
            <span className="font-semibold">
              iAccess Alpha Virtual Best Ideas Winter Investment Conference 2025
            </span>, showcasing the company’s leadership in scalable AI-ready infrastructure.
          </p>

          {/* Details Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {/* Date */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-brand-cyan/10">
                <Calendar className="w-6 h-6 text-brand-cyan" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Date</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  December 9, 2025
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-brand-cyan/10">
                <Clock className="w-6 h-6 text-brand-cyan" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Time</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  9:00 AM ET
                </p>
              </div>
            </div>

            {/* Event */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-brand-cyan/10">
                <Users className="w-6 h-6 text-brand-cyan" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Event</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  Winter Investment Conference
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            {/* Webcast */}
            <motion.a
              href="https://www.webcaster5.com/Webcast/Page/3148/53192"
              target="_blank"
              whileHover={{ scale: 1.04 }}
              className="flex items-center gap-2 justify-center w-full sm:w-auto
                         px-7 py-4 rounded-xl text-white font-semibold text-lg
                         bg-gradient-to-r from-brand-navy to-brand-cyan shadow-lg
                         hover:shadow-brand-cyan/30 transition-all"
            >
              Live Webcast
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            {/* Registration */}
            <motion.a
              href="https://www.iaccessalpha.com"
              target="_blank"
              whileHover={{ scale: 1.04 }}
              className="flex items-center gap-2 justify-center w-full sm:w-auto
                         px-7 py-4 rounded-xl font-semibold text-lg
                         border border-brand-cyan text-brand-cyan 
                         bg-white dark:bg-slate-900 shadow-md hover:bg-brand-cyan/10 
                         transition-all"
            >
              Register / More Info
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
