
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from "@/components/Navigation";
import { Calendar, Search, Filter, Newspaper, ArrowRight, Download } from 'lucide-react';
import Footer from "@/components/Footer";
import GradientText from "@/components/GradientText";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
 
interface PressRelease {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  pdfUrl: string | null;
}
 
export default function PressRelease() {
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
 
  // ✅ Fetch Strapi Data
  useEffect(() => {
    fetch("https://thankful-miracle-1ed8bdfdaf.strapiapp.com/api/press-releases?fields=title,date,content&populate[pdf_file][fields]=url,name&sort[0]=date:desc")
      .then(res => res.json())
      .then(data => {
        const formatted = data.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          date: item.date,
          category: "Corporate Update",
          excerpt: item.content || "Click to view the full official press release PDF.",
          pdfUrl: item.pdf_file?.url || null
        }));
        setPressReleases(formatted);
      });
  }, []);
 
  const years = ["All", "2022", "2023", "2024", "2025"];
  const categories = [
    "All", "Corporate Update", "Financial", "Leadership",
    "Strategy", "Expansion", "Technology", "Awards", "Partnership", "Product Update"
  ];
 
  // ✅ Category Colors
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Corporate Update": "from-blue-500 to-cyan-500",
      "Financial": "from-green-500 to-teal-500",
      "Leadership": "from-purple-500 to-pink-500",
      "Strategy": "from-orange-500 to-red-500",
      "Expansion": "from-indigo-500 to-blue-500",
      "Technology": "from-cyan-500 to-blue-500",
      "Awards": "from-yellow-500 to-orange-500",
      "Partnership": "from-pink-500 to-rose-500",
      "Product Update": "from-violet-500 to-purple-500",
    };
    return colors[category] || "from-gray-500 to-slate-500";
  };
 
  // ✅ Filters
  const filteredReleases = pressReleases.filter(release => {
    const matchesYear = selectedYear === "All" || release.date.includes(selectedYear);
    const matchesCategory = selectedCategory === "All" || release.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      release.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      release.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
 
    return matchesYear && matchesCategory && matchesSearch;
  });
 
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <Navigation />
 
      {/* ✅ HERO SECTION */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 overflow-hidden">
 
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-brand-cyan/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
 
        <motion.div
          className="absolute bottom-20 right-20 w-72 h-72 bg-brand-navy/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
 
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <FadeIn delay={0.2}>
            <motion.div
              className="inline-block p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-lg mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <Newspaper className="w-12 h-12 text-brand-cyan" />
            </motion.div>
          </FadeIn>
 
          <FadeIn delay={0.3}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <GradientText>Press Releases</GradientText>
            </h1>
          </FadeIn>
 
          <FadeIn delay={0.4}>
            <div className="w-40 h-1.5 bg-gradient-to-r from-brand-navy to-brand-cyan rounded-full mx-auto mb-8" />
          </FadeIn>
 
          <FadeIn delay={0.5}>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-10">
              Stay updated with the latest official announcements and updates.
            </p>
          </FadeIn>
        </div>
      </section>
 
      {/* ✅ Filters Section */}
     <section className="py-12 px-6 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
  <div className="max-w-7xl mx-auto">
    <FadeIn delay={0.2}>
      <div className="grid md:grid-cols-3 gap-6">

        {/* Search */}
        <div className="relative flex items-center w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

          {/* If your Input is a custom component it will accept className */}
          <Input
            type="text"
            placeholder="Search press releases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={
              "w-full pl-12 pr-4 h-14 rounded-xl border-2 bg-white dark:bg-slate-900 " +
              "text-slate-800 dark:text-white text-sm leading-tight focus:outline-none"
            }
          />
        </div>

        {/* Year */}
        <div className="relative flex items-center w-full">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className={
              "w-full pl-12 pr-10 h-14 rounded-xl border-2 bg-white dark:bg-slate-900 " +
              "text-slate-800 dark:text-white text-sm leading-tight appearance-none focus:outline-none"
            }
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* Right chevron to match native arrow and stay consistent */}
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Category */}
        <div className="relative flex items-center w-full">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={
              "w-full pl-12 pr-10 h-14 rounded-xl border-2 bg-white dark:bg-slate-900 " +
              "text-slate-800 dark:text-white text-sm leading-tight appearance-none focus:outline-none"
            }
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>

      </div>
    </FadeIn>
  </div>
</section>

      {/* ✅ Press Release Cards */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredReleases.length > 0 ? (
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 
                {filteredReleases.map((release) => (
                  <StaggerItem key={release.id}>
                    <motion.article
                      onClick={() => release.pdfUrl && window.open(release.pdfUrl, "_blank")}
                      whileHover={{ y: -8, scale: 1.01 }}
                      className="group relative h-full bg-white dark:bg-slate-900 border border-gray-200
                      dark:border-slate-700 rounded-2xl p-6 shadow-md hover:shadow-2xl cursor-pointer overflow-hidden"
                    >
 
                      {/* ✅ No overlay dimming */}
                      <div className="absolute inset-0 bg-transparent pointer-events-none" />
 
                      <div className="relative z-10">
 
                        {/* ✅ Date */}
                        <div className="flex items-center gap-2 mb-4">
                          <motion.div
                            className="p-2 bg-brand-cyan/10 rounded-lg"
                            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                          >
                            <Calendar className="w-4 h-4 text-brand-cyan" />
                          </motion.div>
 
                          <span className="text-sm text-slate-700 dark:text-slate-300">
                            {release.date}
                          </span>
                        </div>
 
                        {/* ✅ Category */}
                        <span className={`inline-block px-3 py-1.5 text-xs font-bold text-white
                        bg-gradient-to-r ${getCategoryColor(release.category)} rounded-full shadow-md mb-4`}>
                          {release.category}
                        </span>
 
                        {/* ✅ Title (ALWAYS VISIBLE) */}
                        <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                          {release.title}
                        </h3>
 
                        {/* ✅ Excerpt */}
                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed line-clamp-3 mb-4">
                          {release.excerpt}
                        </p>
 
                        {/* ✅ Read More */}
                        <motion.div
                          onClick={(e) => {
                            e.stopPropagation();
                            release.pdfUrl && window.open(release.pdfUrl, "_blank");
                          }}
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-2 text-brand-cyan font-semibold text-sm cursor-pointer"
                        >
                          Read full release <ArrowRight className="w-4 h-4" />
                        </motion.div>
 
                      </div>
 
                      {/* ✅ Download Button */}
                      <motion.div
                        onClick={(e) => {
                          e.stopPropagation();
                          release.pdfUrl && window.open(release.pdfUrl, "_blank");
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-4 right-4 p-2 bg-white dark:bg-slate-900 rounded-lg shadow-md
                        opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <Download className="w-4 h-4 text-brand-cyan" />
                      </motion.div>
 
                    </motion.article>
                  </StaggerItem>
                ))}
 
              </StaggerContainer>
            ) : (
              <div className="text-center py-20">
                <Search className="w-16 h-16 text-gray-400 mx-auto" />
                <h3 className="text-2xl font-bold mt-4">No press releases found</h3>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
 
      {/* ✅ Newsletter Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-brand-navy/5 to-brand-cyan/5 border-y border-brand-cyan/20">
        <div className="max-w-4xl mx-auto text-center">
 
          <motion.div
            className="inline-block p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-lg mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Newspaper className="w-12 h-12 text-brand-cyan" />
          </motion.div>
 
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <GradientText>Stay Informed</GradientText>
          </h2>
 
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
            Subscribe to get the latest updates straight to your inbox.
          </p>
 
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input type="email" placeholder="Your email address" className="flex-1 py-6" />
            <Button
              size="lg"
              className="bg-gradient-to-r from-brand-navy to-brand-cyan text-white px-8 py-6"
            >
              Subscribe Now
            </Button>
          </div>
 
        </div>
      </section>
 
      <Footer />
    </div>
  );
}
 