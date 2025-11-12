import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function PartnerPage() {
  const partnerLogos = [
    { src: "public/banner-logo.png", alt: "IBM" },
    { src: "public/supermicro.png", alt: "NVIDIA" },
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
      company: "IBM Cloud",
      story:
        "Partnering with DigiPowerX enabled IBM to enhance its AI-driven cloud infrastructure by 40% efficiency.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
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

  // ✅ FORM STATES
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ SUBMIT HANDLER
  const handleSubmit = async () => {
    if (!name || !email || !phoneNumber || !companyName) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        data: {
          name,
          email,
          phoneNumber,
          companyName,
        },
      };

      const res = await fetch(
        "https://thankful-miracle-1ed8bdfdaf.strapiapp.com/api/partners",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();
      console.log("📩 PARTNER SUBMIT RESULT:", result);

      if (res.ok && result?.data) {
        alert("✅ Thank you! Your partnership request was submitted successfully.");
        setName("");
        setEmail("");
        setPhoneNumber("");
        setCompanyName("");
        setShowForm(false);
      } else {
        console.error("❌ Strapi error:", result);
        alert("❌ Submission failed. Check console for details.");
      }
    } catch (err) {
      console.error("🚨 Submission error:", err);
      alert("❌ Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <>
      <Navigation />

      {/* ===================== HERO SECTION ===================== */}
      <section className="relative w-full overflow-hidden min-h-screen flex items-center justify-center bg-white">
        <div
          className="absolute inset-0 bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: "url('public/HANDS.png')",
            filter: "brightness(0.85) contrast(1.1)",
          }}
        ></div>

        <motion.div
          className="absolute inset-0 bg-[url('https://media.istockphoto.com/id/1293808248/photo/digital-information-travels-through-fiber-optic-cables-through-the-network-and-data-servers.webp?a=1&b=1&s=612x612&w=0&k=20&c=IVCvHW7JWDcSigm3iUgiDYwhtIDF11YdqrUz-mIIMek=')] bg-no-repeat bg-[position:center_top] bg-cover opacity-30"
          style={{
            filter: "brightness(0.9) contrast(1.05)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        ></motion.div>

        <div className="absolute inset-0 bg-white/65 backdrop-blur-[2px]"></div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center py-24 px-6 lg:px-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900 mb-6 max-w-4xl"
          >
            Partner with{" "}
            <span className="bg-gradient-to-r from-[#245592] via-[#3b82f6] to-[#01d3ff] bg-clip-text text-transparent">
              DigiPowerX
            </span>{" "}
            to Build Tomorrow
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10 max-w-2xl"
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
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-[#245592] via-[#3b82f6] to-[#01d3ff] text-white px-10 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-transparent"
            >
              Become a Partner
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ✅ PARTNER FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-slate-950 rounded-3xl shadow-2xl p-10 w-full max-w-lg relative border dark:border-slate-800"
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl"
            >
              ×
            </button>

            <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
              Become a Partner
            </h3>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#01d3ff] focus:outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#01d3ff] focus:outline-none"
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-4 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#01d3ff] focus:outline-none"
              />

              <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full p-4 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#01d3ff] focus:outline-none"
              />

              <div className="text-center pt-4">
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-10 py-4 rounded-full bg-gradient-to-r from-[#245592] to-[#01d3ff] hover:from-[#01d3ff] hover:to-[#245592] text-white font-semibold transition-all duration-300"
                >
                  {loading ? "Submitting..." : "Submit Partnership Request"}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Rest of your sections (logos, benefits, stories, CTA, footer) */}
      <Footer />
    </>
  );
}
