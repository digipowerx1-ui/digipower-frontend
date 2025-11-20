import React, { useState } from "react";
import {
  Users,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Layers,
  Cpu,
  Share2,
  Handshake,
  Plug,
} from "lucide-react";


import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function PartnerPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    companyName: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(
        "https://thankful-miracle-1ed8bdfdaf.strapiapp.com/api/partners",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              name: formData.name,
              email: formData.email,
              phoneNumber: formData.phoneNumber,
              companyName: formData.companyName,
            },
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await res.json();
      console.log("Submission result:", result);

      setMessage("✅ Thank you! Your partnership request has been submitted.");
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        companyName: "",
      });

      // auto close popup after 2 seconds
      setTimeout(() => {
        setIsPopupOpen(false);
        setMessage("");
      }, 2000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const partnerLogos = [
    { src: "/banner-logo.png", alt: "IBM" },
    { src: "/supermicro.png", alt: "NVIDIA" },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
      alt: "AWS",
    },
    {
      src: "https://res.cloudinary.com/digitalrealty/image/upload/f_auto,c_limit,w_1920,q_auto/dlr-website%2FLogos%2FPartners%2FLogo%20Grid%2FDT_Auth_Systems_Integrator_Blue-transp-v4_y0jw8u",
      alt: "USDC",
    },
  ];

  const partnershipModels = [
    {
      title: "Technology Alliance",
      desc: "Collaborate on modern digital infrastructure and AI-driven cloud innovations to transform industries.",
    },
    {
      title: "Channel Partner",
      desc: "Co-sell and co-market advanced technology solutions for shared global success.",
    },
    {
      title: "Strategic Partner",
      desc: "Shape the future through deep collaboration and mutual growth strategies.",
    },
    {
      title: "Integration Partner",
      desc: "Integrate our technologies to deliver seamless, end-to-end enterprise solutions.",
    },
  ];

  const benefits = [
    "Access to the latest AI and data infrastructure technologies",
    "Joint marketing and brand visibility across global networks",
    "Dedicated partner growth and enablement programs",
    "Comprehensive training and technical certifications",
    "Revenue growth through co-developed solutions",
    "24/7 support from our global success team",
  ];

  const successStories = [
  {
  company: "SuperMicro",
  story:
    "SuperMicro accelerated its AI and HPC performance by 40% through our optimized infrastructure solutions.",
  logo: "/supermicro.png",
},

    {
      company: "AWS Global Connect",
      story:
        "Together with AWS, we built high-speed hybrid infrastructure, cutting latency by 60%.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    },
    {
      company: "NVIDIA Edge AI",
      story:
        "DigiPowerX and NVIDIA co-developed scalable edge clusters powering next-gen analytics.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
    },
  ];

  return (
    <>
      {/* ✅ NAVIGATION BAR */}
      <Navigation />

      {/* ===================== HERO SECTION ===================== */}
      <section className="relative w-full overflow-hidden min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 bg-no-repeat bg-right bg-cover opacity-40 dark:opacity-30"
          style={{
            backgroundImage: "url('/HANDS.png')",
          }}
        ></div>

        {/* Gradient Overlay for Better Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/60 dark:from-slate-950/95 dark:via-slate-950/85 dark:to-slate-950/60"></div>

        {/* Animated Accent Blur Elements */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-[#01d3ff]/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>

        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-[#245592]/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>

        {/* Content Container */}
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center py-24 px-6 lg:px-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900 dark:text-white mb-6 max-w-4xl drop-shadow-sm"
          >
            Partner with{" "}
            <span className="bg-gradient-to-r from-[#245592] via-[#3b82f6] to-[#01d3ff] bg-clip-text text-transparent drop-shadow-lg">
              DigiPowerX
            </span>{" "}
            to Build Tomorrow
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-800 dark:text-slate-200 leading-relaxed mb-10 max-w-2xl font-medium drop-shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            We collaborate with visionary organizations to deliver intelligent,
            scalable, and future-ready solutions that transform industries and
            empower innovation.
          </motion.p>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              onClick={() => setIsPopupOpen(true)}
              className="bg-gradient-to-r from-[#245592] via-[#3b82f6] to-[#01d3ff]
              text-white px-10 py-6 text-lg font-semibold rounded-full shadow-lg
              hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-transparent"
            >
              Become a Partner
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ✅ POPUP MODAL */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-10 w-[90%] max-w-lg relative"
            >
              <h3 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                Become a Partner
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                />
                <input
                  name="phoneNumber"
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                />
                <input
                  name="companyName"
                  type="text"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                />

                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-[#245592] via-[#3b82f6] to-[#01d3ff] 
                  text-white font-semibold rounded-full py-3 mt-2"
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </form>

              {message && (
                <p className="text-center mt-4 text-gray-700 dark:text-slate-300 font-medium">
                  {message}
                </p>
              )}

              <button
                onClick={() => setIsPopupOpen(false)}
                className="absolute top-4 right-5 text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-white text-2xl font-bold"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================== LOGO STRIP ===================== */}
 

      {/* ===================== WHY PARTNER ===================== */}
  {/* ===================== WHY PARTNER ===================== */}
<section className="py-24 bg-gray-50 dark:bg-slate-900 relative overflow-hidden">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-[#245592] to-[#01d3ff] bg-clip-text text-transparent">
      Why Partner With Us
    </h2>

    <p className="text-gray-600 dark:text-slate-300 max-w-3xl mx-auto mb-16 text-lg leading-relaxed">
      Our partnership model is built on trust, innovation, and mutual success — enabling you to scale faster,
      reach wider audiences, and deliver greater impact.
    </p>

    {/* Icons mapped according to benefits */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {benefits.map((b, i) => {
        const icons = [
          ShieldCheck,    // Access to AI and data infra
          Users,          // Joint marketing & visibility
          Rocket,         // Partner growth programs
          Layers,         // Training & certifications
          TrendingUp,     // Revenue growth
          Handshake       // 24/7 partner support
        ];
        const IconComp = icons[i];

        return (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-10 shadow-md hover:shadow-xl hover:border-[#01d3ff]/50 transition-all duration-500 relative overflow-hidden"
          >
            <div className="flex flex-col items-center gap-4 text-center">
              {/* Icon wrapper */}
              <div className="w-16 h-16 rounded-xl bg-[#01d3ff]/10 flex items-center justify-center shadow-sm">
                <IconComp className="w-8 h-8 text-[#01d3ff]" />
              </div>

              {/* Benefit text */}
              <p className="relative z-10 text-gray-800 dark:text-slate-200 font-medium text-lg leading-snug">
                {b}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>

  {/* Background Effects */}
  <motion.div
    className="absolute -bottom-20 left-10 w-[400px] h-[400px] bg-[#01d3ff]/10 rounded-full blur-[120px]"
    animate={{ y: [0, 20, 0] }}
    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
  ></motion.div>

  <motion.div
    className="absolute -top-32 right-16 w-[300px] h-[300px] bg-[#245592]/10 rounded-full blur-[120px]"
    animate={{ y: [0, -20, 0] }}
    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
  ></motion.div>
</section>


      {/* ===================== PARTNERSHIP MODELS ===================== */}
   <section className="py-24 bg-white dark:bg-slate-950">
  <div className="max-w-7xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-[#245592] via-[#3b82f6] to-[#01d3ff] bg-clip-text text-transparent">
      Partnership Models
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      {partnershipModels.map((m, i) => {
        const icons = [
          Cpu,      // Technology Alliance
          Share2,   // Channel Partner
          Handshake,// Strategic Partner
          Plug      // Integration Partner
        ];

        const IconComp = icons[i];

        return (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-10 shadow-md hover:shadow-xl hover:border-[#01d3ff]/50 transition-all duration-500"
          >
            <div className="flex flex-col items-center gap-4 text-center">

              {/* ICON (same style as Why Partner With Us) */}
              <div className="w-16 h-16 rounded-xl bg-[#01d3ff]/10 flex items-center justify-center shadow-sm">
                <IconComp className="w-8 h-8 text-[#01d3ff]" />
              </div>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {m.title}
              </h3>

              <p className="text-gray-600 dark:text-slate-300 text-[15px] leading-relaxed">
                {m.desc}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>



      {/* ===================== SUCCESS STORIES ===================== */}
      {/* <section className="py-24 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-[#245592] via-[#3b82f6] to-[#01d3ff] bg-clip-text text-transparent animate-gradient-x">
            Partner Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {successStories.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all"
              >
              <img
  src={s.logo}
  alt={s.company}
  className="h-20 mx-auto mb-6 object-contain"
/>

                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  {s.company}
                </h3>
                <p className="text-gray-600 dark:text-slate-300">{s.story}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ===================== CTA SECTION ===================== */}
      <section className="relative py-28 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 text-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(200,200,200,0.15),_transparent_70%)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        ></motion.div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6"
          >
            Let’s Build the Future — Together
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-slate-300 mb-12 leading-relaxed"
          >
            Join our global network of innovators, strategists, and technology
            leaders. Let’s shape the next era of digital infrastructure together.
          </motion.p>

          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            <div className="flex justify-center">
              <Button
                onClick={() => setIsPopupOpen(true)}
                className="flex justify-center items-center text-center text-white
                bg-gradient-to-r from-[#245592] via-[#3b82f6] to-[#01d3ff]
                text-lg font-semibold rounded-full shadow-lg
                hover:shadow-2xl hover:scale-105 transition-all duration-300
                border border-transparent mt-8 mb-8 mx-auto px-10 py-6"
              >
                Apply for Partnership
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gray-300/10 rounded-full blur-[120px]"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
        <motion.div
          className="absolute -top-32 -left-32 w-[450px] h-[450px] bg-gray-400/10 rounded-full blur-[140px]"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
      </section>

      {/* ✅ FOOTER */}
      <Footer />
    </>
  );
}
