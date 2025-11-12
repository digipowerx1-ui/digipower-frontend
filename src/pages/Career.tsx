import React, { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Briefcase,
  Rocket,
  ShieldCheck,
  Users,
  Search,
  MapPin,
} from "lucide-react";

export default function Career() {
  // ✅ Fetch Jobs from Strapi
  const [jobs, setJobs] = useState<any[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(
          "https://thankful-miracle-1ed8bdfdaf.strapiapp.com/api/open-positions"
        );
        const data = await res.json();
        setJobs(data.data || []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
      setLoadingJobs(false);
    };

    fetchJobs();
  }, []);

  // ✅ JOB SEARCH STATES
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ FILTER JOBS
  const filteredJobs = jobs.filter((job) => {
    const title = job.title?.toLowerCase() || "";
    const location = job.location?.toLowerCase() || "";

    const matchesMainQuery =
      title.includes(searchQuery.toLowerCase()) ||
      location.includes(searchQuery.toLowerCase());

    return (
      matchesMainQuery &&
      title.includes(searchTitle.toLowerCase()) &&
      location.includes(searchLocation.toLowerCase())
    );
  });

  // ✅ FORM REF
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ FORM STATES
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ SUBMIT FORM
  const handleSubmit = async () => {
    if (!fullName || !email || !role || !phone || !portfolioLink) {
      alert("Please fill all fields including your portfolio link.");
      return;
    }

    setLoading(true);

    try {
      // ✅ Strapi expects JSON payload for text fields
      const payload = {
        data: {
          fullName,
          email,
          interstedRole: role,
          phone,
          portfolio_Link: portfolioLink, // ✅ Correct field name from Strapi
        },
      };

      const res = await fetch(
        "https://thankful-miracle-1ed8bdfdaf.strapiapp.com/api/careers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();
      console.log("📩 STRAPI RESPONSE:", result);

      if (res.ok && result?.data) {
        alert("✅ Your details were submitted successfully!");
        setFullName("");
        setEmail("");
        setRole("");
        setPhone("");
        setPortfolioLink("");
      } else {
        console.error("❌ Strapi error:", result);
        alert(
          "❌ Submission failed. Check console for details (possibly wrong field name or validation)."
        );
      }
    } catch (err) {
      console.error("🚨 Submission error:", err);
      alert("❌ Something went wrong. Check console.");
    }

    setLoading(false);
  };

  return (
    <>
      <Navigation />

      {/* ✅ HERO SECTION */}
      <section className="relative py-36 bg-gradient-to-b from-white via-gray-100 to-gray-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-[#245592]/20 blur-[140px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-[#01d3ff]/20 blur-[140px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-block px-6 py-2 rounded-full bg-white/60 dark:bg-white/10 border shadow-lg text-gray-900 dark:text-white text-lg font-medium backdrop-blur-xl"
          >
            We’re Building the Future of Compute
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-8 text-5xl md:text-7xl font-extrabold leading-tight text-gray-900 dark:text-white"
          >
            Careers at{" "}
            <span className="bg-gradient-to-r from-[#245592] to-[#01d3ff] bg-clip-text text-transparent">
              DigiPowerX
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            Join a global mission powering the world’s data, AI workloads, and
            next-generation sustainable infrastructure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1 }}
            className="mt-12"
          >
            <Button
              size="lg"
              onClick={() =>
                document
                  .getElementById("open-positions")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="px-10 py-6 text-lg font-semibold rounded-full shadow-xl bg-gradient-to-r from-[#245592] to-[#01d3ff]"
            >
              Explore Opportunities
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ✅ CAREER PATHWAYS SECTION */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-4xl md:text-6xl font-bold text-center text-gray-900 dark:text-white">
            Career Pathways
          </h2>
          <p className="mt-4 text-lg text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Whether you innovate, design, build, or support—your skills will
            shape the next generation of infrastructure.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
            {[
              {
                icon: Rocket,
                title: "Engineering",
                desc: "Create scalable systems powering global compute.",
              },
              {
                icon: ShieldCheck,
                title: "Security",
                desc: "Design secure, resilient infrastructure.",
              },
              {
                icon: Users,
                title: "Operations",
                desc: "Ensure mission-critical systems run smoothly.",
              },
              {
                icon: Briefcase,
                title: "Corporate",
                desc: "Lead strategy and growth initiatives.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <Card className="rounded-3xl shadow-xl hover:scale-[1.03] transition bg-white dark:bg-slate-900 border dark:border-slate-800">
                  <CardContent className="p-8 text-center space-y-4">
                    <item.icon className="w-14 h-14 mx-auto text-[#245592]" />
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.desc}
                    </p>
                    <Button className="mt-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#245592] to-[#01d3ff]">
                      Explore {item.title}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ SEARCH BAR SECTION */}
      <section className="py-20 bg-gray-100 dark:bg-slate-900">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-white dark:bg-slate-950 shadow-2xl rounded-3xl p-10 border dark:border-slate-800">
            <h3 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
              Search Open Roles
            </h3>

            <div className="flex items-center bg-white dark:bg-slate-800 rounded-full shadow-lg border dark:border-slate-700 overflow-hidden max-w-4xl mx-auto">
              <div className="flex items-center gap-3 px-4 py-3 w-1/2">
                <Search className="text-gray-400 w-5 h-5" />
                <input
                  placeholder="Job title, keywords, or company"
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
                />
              </div>

              <div className="w-px h-8 bg-gray-300 dark:bg-slate-600"></div>

              <div className="flex items-center gap-3 px-4 py-3 w-1/2">
                <MapPin className="text-gray-400 w-5 h-5" />
                <input
                  placeholder='City, state, zip code, or "remote"'
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
                />
              </div>

              <Button className="rounded-none rounded-r-full bg-gradient-to-r from-[#245592] to-[#01d3ff] hover:from-[#01d3ff] hover:to-[#245592] text-white px-8 py-6 font-semibold h-full transition-all duration-300">
                Find Jobs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ OPEN POSITIONS SECTION */}
      <section className="py-20 bg-gray-100 dark:bg-slate-900">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2
            id="open-positions"
            className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
          >
            Open Positions
          </h2>

          {loadingJobs && (
            <p className="text-center text-gray-500">Loading positions...</p>
          )}

          {!loadingJobs && filteredJobs.length === 0 && (
            <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
              No jobs found.
            </p>
          )}

          <div className="space-y-10">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Card className="rounded-3xl shadow-xl border dark:border-slate-800 bg-white dark:bg-slate-950 hover:scale-[1.01] transition">
                  <CardContent className="p-8 flex flex-col md:flex-row justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-semibold dark:text-white">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        {job.location} • {job.jobType}
                      </p>
                    </div>

                    <Button
                      onClick={scrollToForm}
                      className="mt-6 md:mt-0 px-8 py-4 rounded-full bg-gradient-to-r from-[#245592] to-[#01d3ff]"
                    >
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ TALENT NETWORK FORM */}
      <section ref={formRef} className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Join the DigiPowerX Talent Network
          </h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Stay connected for future opportunities & updates.
          </p>

          <div className="mt-12 bg-gray-100 dark:bg-slate-900 p-10 rounded-3xl shadow-xl border dark:border-slate-800">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full p-4 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-black dark:border-gray-600 focus:ring-2 focus:ring-[#01d3ff] focus:outline-none"
              />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full p-4 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-black dark:border-gray-600 focus:ring-2 focus:ring-[#01d3ff] focus:outline-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Interested Role (e.g., Frontend Developer)"
                className="w-full p-4 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-black dark:border-gray-600 focus:ring-2 focus:ring-[#01d3ff] focus:outline-none"
              />

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full p-4 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-black dark:border-gray-600 focus:ring-2 focus:ring-[#01d3ff] focus:outline-none"
              />
            </div>

            {/* ✅ Portfolio Link Input */}
            <div className="mt-6">
              <input
                value={portfolioLink}
                onChange={(e) => setPortfolioLink(e.target.value)}
                placeholder="Portfolio Link (e.g., https://yourwebsite.com)"
                className="w-full p-4 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-black dark:border-gray-600 focus:ring-2 focus:ring-[#01d3ff] focus:outline-none"
              />
            </div>

            <div className="mt-8 text-center">
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="px-10 py-4 rounded-full bg-gradient-to-r from-[#245592] to-[#01d3ff] hover:from-[#01d3ff] hover:to-[#245592] text-white font-semibold transition-all duration-300"
              >
                {loading ? "Submitting..." : "Join Network"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}