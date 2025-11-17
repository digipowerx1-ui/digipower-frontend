import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import GradientText from "@/components/GradientText";

export default function TermsOfUse() {
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
          <GradientText>Terms of Use</GradientText>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg text-gray-300 max-w-2xl mx-auto"
        >
          Please read these Terms carefully before using DigiPowerX.com.
        </motion.p>
      </section>

      {/* ======================= CONTENT SECTION ======================= */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-200 dark:border-slate-700 p-10 md:p-14">
          
          {/* Intro */}
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-10">
            Welcome to DigiPowerX.com (the “Site”). DigiPowerX, Inc. (“DigiPowerX,” “we,” “our,” or “us”) 
            provides this Site for informational purposes and access to certain services. By using the Site, 
            you (“User,” “you,” or “your”) agree to be bound by these Terms of Use (“Terms”). If you do not 
            agree, you must not use the Site.
          </p>

          {/* ======================= SECTION 1 ======================= */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-brand-cyan mb-3">1. Use of the Site</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              The Site is provided for general information about DigiPowerX and our services. You may only 
              use the Site for lawful purposes and in accordance with these Terms. You agree not to:
              <br /><br />
              • Attempt to gain unauthorized access to the Site or related systems.<br />
              • Use the Site to transmit harmful code, spam, or malicious content.<br />
              • Interfere with or disrupt the Site’s operation or security.
            </p>
          </div>

          {/* ======================= SECTION 2 ======================= */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-brand-cyan mb-3">2. Intellectual Property</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              All content, logos, graphics, designs, images, software, and materials on the Site are the 
              property of DigiPowerX or its licensors and are protected by intellectual property laws. You 
              may not copy, distribute, modify, or use any content without written permission, except for 
              personal, non-commercial use.
            </p>
          </div>

          {/* ======================= SECTION 3 ======================= */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-brand-cyan mb-3">3. No Investment or Professional Advice</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              All content on the Site is provided for informational purposes only. Nothing on the Site 
              constitutes legal, financial, investment, or technical advice.
            </p>
          </div>

          {/* ======================= SECTION 4 ======================= */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-brand-cyan mb-3">4. Third-Party Links</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              The Site may include links to third-party websites. These are provided for convenience and do 
              not imply endorsement. DigiPowerX is not responsible for third-party content or practices.
            </p>
          </div>

          {/* ======================= SECTION 5 ======================= */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-brand-cyan mb-3">5. Disclaimer of Warranties</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              The Site and all content are provided “as is” and “as available” without any warranties. 
              DigiPowerX does not guarantee the Site will be uninterrupted, error-free, or secure.
            </p>
          </div>

          {/* ======================= SECTION 6 ======================= */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-brand-cyan mb-3">6. Limitation of Liability</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              DigiPowerX and its affiliates shall not be liable for any damages arising from your use of the 
              Site, including direct, indirect, incidental, or consequential damages.
            </p>
          </div>

          {/* ======================= SECTION 7 ======================= */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-brand-cyan mb-3">7. Indemnification</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              You agree to indemnify and hold DigiPowerX harmless against any claims or losses arising from 
              your use of the Site or violation of these Terms.
            </p>
          </div>

          {/* ======================= SECTION 8 ======================= */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-brand-cyan mb-3">8. Privacy</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Your use of the Site is governed by our Privacy Policy.
            </p>
          </div>

          {/* ======================= SECTION 9 ======================= */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-brand-cyan mb-3">9. Changes to the Terms</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              DigiPowerX may update these Terms at any time. Updates are effective upon posting. Continued 
              use of the Site means you accept the updated Terms.
            </p>
          </div>

          {/* ======================= SECTION 10 ======================= */}
          <div>
            <h3 className="text-2xl font-bold text-brand-cyan mb-3">10. Governing Law</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              These Terms are governed by the laws of the State of Delaware. Any disputes must be resolved 
              in state or federal courts located in Delaware.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
