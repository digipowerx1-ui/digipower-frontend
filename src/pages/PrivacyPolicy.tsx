import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import GradientText from "@/components/GradientText";
//  ADD THIS IMPORT
import { Helmet } from "react-helmet-async";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
        {/* ⭐ PAGE TITLE ADDED HERE */}
            <Helmet>
              <title>Privacy Policy | DigiPowerX Cloud Solutions & Data Protection

      </title>
              <meta
                name="description"
                content="Explore DigiPowerX’s Tier III U.S. data centers powering AI and high-density compute workloads."
              />
            </Helmet>
      <Navigation />

      {/* ================= HERO SECTION ================= */}
      <section className="py-24 px-6 text-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-4"
        >
          <GradientText>Privacy Policy</GradientText>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg text-gray-300 max-w-2xl mx-auto"
        >
          Learn how DigiPowerX collects, uses, and protects your information.
        </motion.p>
      </section>

      {/* ================= CONTENT SECTION ================= */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 shadow-xl rounded-2xl p-10 leading-relaxed text-slate-700 dark:text-slate-300">

          <p className="mb-6">
            DigiPowerX, Inc. (“DigiPowerX,” “we,” “our,” or “us”) values your privacy.
            This Privacy Policy explains how we collect, use, and share information when you 
            visit or interact with our website, DigiPowerX.com (the “Site”). By using the Site, 
            you agree to the practices described here.
          </p>

          {/* SECTION 1 */}
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-3">
            1. Information We Collect
          </h2>

          <h3 className="font-semibold mb-1">a) Information You Provide</h3>
          <p className="mb-4">
            • Name, email address, phone number, or other details submitted through forms or inquiries.<br />
            • Any information you voluntarily provide to us.
          </p>

          <h3 className="font-semibold mb-1">b) Automatically Collected Information</h3>
          <p className="mb-4">
            • <b>Log data:</b> IP address, browser type, operating system, referring pages, and access times.<br />
            • <b>Cookies:</b> Used to improve the Site experience and understand usage behaviors.
          </p>

          {/* SECTION 2 */}
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-3">
            2. How We Use Your Information
          </h2>

          <p className="mb-4">
            We use collected information to:
          </p>

          <ul className="list-disc ml-6 mb-4 space-y-1">
            <li>Operate, maintain, and improve the Site.</li>
            <li>Respond to inquiries and provide support.</li>
            <li>Communicate updates, events, or services (if you opt in).</li>
            <li>Enhance security and prevent fraudulent activity.</li>
            <li>Comply with legal and regulatory obligations.</li>
          </ul>

          {/* SECTION 3 */}
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-3">
            3. Sharing of Information
          </h2>

          <p className="mb-4">
            We do <b>not</b> sell your personal information. We may share information:
          </p>

          <ul className="list-disc ml-6 mb-4 space-y-1">
            <li>With service providers such as hosting, analytics, or IT support partners.</li>
            <li>When required by law, subpoena, or regulatory authorities.</li>
            <li>If DigiPowerX undergoes a merger, acquisition, or asset transfer.</li>
          </ul>

          {/* SECTION 4 */}
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-3">
            4. Cookies and Tracking
          </h2>

          <p className="mb-4">
            We use cookies and tracking technologies to:
          </p>

          <ul className="list-disc ml-6 mb-4 space-y-1">
            <li>Improve Site functionality.</li>
            <li>Understand traffic and user behavior.</li>
            <li>Enhance your overall browsing experience.</li>
          </ul>

          <p className="mb-4">
            You may disable cookies through your browser settings, but certain features of the Site may not work properly.
          </p>

          {/* SECTION 5 */}
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-3">
            5. Data Security
          </h2>

          <p className="mb-4">
            We implement reasonable administrative, technical, and physical safeguards to protect your personal data.
            However, no security system is completely secure, and we cannot guarantee absolute protection.
          </p>

          {/* SECTION 6 */}
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-3">
            6. Your Rights
          </h2>

          <p className="mb-4">Depending on your location, you may have rights such as:</p>

          <ul className="list-disc ml-6 mb-4 space-y-1">
            <li>Requesting access to your information.</li>
            <li>Correcting or deleting your data.</li>
            <li>Opting out of email communications.</li>
            <li>Restricting or objecting to certain processing activities.</li>
            <li>Requesting a portable copy of your data.</li>
          </ul>

          <p className="mb-4">
            To exercise these rights, please contact us.
          </p>

          {/* SECTION 7 */}
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-3">
            7. Third-Party Links
          </h2>

          <p className="mb-4">
            Our Site may contain links to third-party websites. We are not responsible for their privacy practices or content.
          </p>

          {/* SECTION 8 */}
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-3">
            8. Children’s Privacy
          </h2>

          <p className="mb-4">
            The Site is not intended for children under 13. We do not knowingly collect information from children.
          </p>

          {/* SECTION 9 */}
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-3">
            9. Changes to This Privacy Policy
          </h2>

          <p className="mb-4">
            We may update this Privacy Policy from time to time. Revised versions will be posted on this page with an updated effective date.
          </p>

        </div>
      </section>

      <Footer />
    </div>
  );
}
