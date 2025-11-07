import { FileDown, Download, Calendar, FileText, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GradientText from "@/components/GradientText";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

interface Filing {
  date: string;
  form: string;
  desc: string;
  link: string;
}

export default function Sec() {
  const filings: Filing[] = [
    { date: "Nov 3, 2025", form: "6-K", desc: "Current Report", link: "https://s3.amazonaws.com/sec.irpass.cc/2998/0001213900-25-104911.pdf" },
    { date: "Oct 30, 2025", form: "6-K", desc: "Current Report", link: "https://s3.amazonaws.com/sec.irpass.cc/2998/0001213900-25-104116.pdf" },
    { date: "Oct 22, 2025", form: "6-K", desc: "Current Report", link: "https://s3.amazonaws.com/sec.irpass.cc/2998/0001213900-25-100990.pdf" },
    { date: "Oct 21, 2025", form: "6-K", desc: "Current Report", link: "https://s3.amazonaws.com/sec.irpass.cc/2998/0001213900-25-100538.pdf" },
    {
      date: "Oct 17, 2025",
      form: "SCHEDULE 13G",
      desc: "Statement of Beneficial Ownership by Certain Investors",
      link: "/pdfs/schedule-13g.pdf",
    },
    { date: "Oct 14, 2025", form: "6-K", desc: "Current Report", link: "https://s3.amazonaws.com/sec.irpass.cc/2998/0001104659-25-100497.pdf" },
    { date: "Oct 1, 2025", form: "6-K", desc: "Current Report", link: "https://s3.amazonaws.com/sec.irpass.cc/2998/0001213900-25-098872.pdf" },
    { date: "Sep 16, 2025", form: "6-K", desc: "Current Report", link: "https://s3.amazonaws.com/sec.irpass.cc/2998/0001213900-25-087929.pdf" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 scroll-smooth transition-colors duration-300">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 overflow-hidden transition-colors duration-300">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-brand-cyan/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-64 h-64 bg-brand-navy/10 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-lg mb-6 transition-colors duration-300"
              >
                <FileText className="w-12 h-12 text-brand-cyan" />
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <GradientText>SEC Filings</GradientText>
              </h1>
              <div className="w-40 h-1.5 bg-gradient-to-r from-brand-navy to-brand-cyan rounded-full mx-auto mb-6" />
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto transition-colors duration-300">
                Access our complete collection of Securities and Exchange Commission filings, financial reports, and regulatory documents
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {/* <Button
                  variant="outline"
                  className="bg-white dark:bg-slate-900 hover:bg-gray-50 dark:bg-slate-950 border-2 border-brand-cyan text-brand-navy font-semibold px-6 py-3 rounded-full transition-colors duration-300"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Filter by Date
                </Button> */}
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {/* <Button
                  variant="outline"
                  className="bg-white dark:bg-slate-900 hover:bg-gray-50 dark:bg-slate-950 border-2 border-brand-cyan text-brand-navy font-semibold px-6 py-3 rounded-full transition-colors duration-300"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Filter by Form Type
                </Button> */}
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Filings Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">Recent Filings</h2>
            <p className="text-slate-600 dark:text-slate-300 transition-colors duration-300">
              View and download our latest SEC filings and regulatory documents
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filings.map((filing, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-full"
              >
                <Card className="group h-full border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-2xl rounded-2xl p-6 bg-white dark:bg-slate-900 transition-all duration-500 cursor-pointer relative overflow-hidden">
                  {/* Animated background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 to-brand-navy/0 group-hover:from-brand-cyan/10 group-hover:to-brand-navy/10 transition-all duration-500" />

                  <CardContent className="space-y-5 p-0 relative z-10">
                    {/* Date Badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <motion.div
                        className="p-2 bg-brand-cyan/10 rounded-lg"
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Calendar className="w-5 h-5 text-brand-cyan" />
                      </motion.div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium transition-colors duration-300">Filing Date</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white transition-colors duration-300">{filing.date}</p>
                      </div>
                    </div>

                    {/* Form Type */}
                    <div className="bg-gradient-to-r from-brand-navy/5 to-brand-cyan/5 dark:from-brand-navy/20 dark:to-brand-cyan/20 rounded-xl p-4 border border-brand-cyan/20 dark:border-brand-cyan/30 transition-colors duration-300">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 transition-colors duration-300">Form Type</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-brand-navy to-brand-cyan bg-clip-text text-transparent">
                        {filing.form}
                      </p>
                    </div>

                    {/* Description */}
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 transition-colors duration-300">Description</p>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium transition-colors duration-300">{filing.desc}</p>
                    </div>

                    {/* Download Button */}
                    <a href={filing.link} target="_blank" rel="noopener noreferrer">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button className="w-full flex items-center justify-center gap-2 rounded-xl shadow-md hover:shadow-xl bg-gradient-to-r from-brand-navy to-brand-cyan hover:from-brand-cyan hover:to-brand-navy text-white border-none font-semibold py-6 transition-all duration-300">
                          <Download className="w-5 h-5" />
                          Download PDF
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </Button>
                      </motion.div>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Load More Section */}
        <FadeIn delay={0.6}>
          <div className="text-center mt-16">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-brand-navy to-brand-cyan hover:from-brand-cyan hover:to-brand-navy text-white font-semibold px-10 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <FileDown className="w-5 h-5 mr-2" />
                View All Filings
              </Button>
            </motion.div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-4 transition-colors duration-300">
              Or visit our{" "}
              <a
                href="https://www.sec.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-cyan hover:text-brand-navy dark:hover:text-brand-cyan font-semibold underline"
              >
                SEC.gov profile
              </a>
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Info Banner */}
      <section className="py-16 px-6 bg-gradient-to-r from-brand-navy/5 to-brand-cyan/5 dark:from-brand-navy/20 dark:to-brand-cyan/20 border-y border-brand-cyan/20 dark:border-brand-cyan/30 transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <motion.div
                className="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-lg transition-colors duration-300"
                whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <FileText className="w-16 h-16 text-brand-cyan" />
              </motion.div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 transition-colors duration-300">
                  Need Help Finding a Specific Filing?
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 transition-colors duration-300">
                  Our investor relations team is here to assist you with any questions or document requests.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {/* <Button
                    variant="outline"
                    className="border-2 border-brand-cyan text-brand-navy hover:bg-brand-cyan hover:text-white font-semibold"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Investor Relations
                  </Button> */}
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
