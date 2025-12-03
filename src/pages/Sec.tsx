import { useQuery } from "@tanstack/react-query";
import { Download, Calendar, FileText, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GradientText from "@/components/GradientText";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/FadeIn";
import { Helmet } from "react-helmet-async";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

interface Filing {
  id: number;
  date: string;
  form: string;
  desc: string;
  link: string;
}

interface PdfFile {
  id: number;
  documentId: string;
  name: string;
  url: string;
  mime: string;
  size: number;
}

interface StrapiFilingItem {
  id: number;
  documentId: string;
  date?: string;
  form_type?: string;
  description?: string;
  pdf_file?: PdfFile;
}

const PAGE_SIZE = 9;
const API_BASE = "https://thankful-miracle-1ed8bdfdaf.strapiapp.com/api/sec-filings";

const mapFilings = (items: StrapiFilingItem[]): Filing[] =>
  items.map((item) => {
    const pdfUrl = item.pdf_file?.url || "";
    return {
      id: item.id,
      date: item.date || "",
      form: item.form_type?.trim() || "N/A",
      desc: item.description || "",
      link: pdfUrl,
    };
  });

async function fetchAllSecFilings(): Promise<Filing[]> {
  const pageSize = 100;
  const buildURL = (page: number) =>
    `${API_BASE}?populate=*&sort=date:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

  let allFilings: StrapiFilingItem[] = [];

  // Fetch first page to get total page count
  const firstResponse = await fetch(buildURL(1));
  if (!firstResponse.ok) {
    throw new Error(`HTTP error! status: ${firstResponse.ok}`);
  }

  const firstJson = await firstResponse.json();
  const firstData = firstJson.data || [];
  const pageCount = firstJson.meta?.pagination?.pageCount || 1;
  allFilings.push(...firstData);

  // Fetch remaining pages
  for (let p = 2; p <= pageCount; p++) {
    const response = await fetch(buildURL(p));
    if (response.ok) {
      const json = await response.json();
      allFilings.push(...(json.data || []));
    }
  }

  return mapFilings(allFilings);
}

export default function Sec() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data: filings = [],
    error,
    isPending,
    isError,
    refetch,
  } = useQuery<Filing[], Error>({
    queryKey: ["sec-filings"],
    queryFn: fetchAllSecFilings,
    staleTime: 5 * 60 * 1000,
  });

  const loadError = isError ? error?.message ?? "Failed to load filings" : null;

  // Pagination logic
  const totalItems = filings.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const paginatedFilings = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filings.slice(start, start + PAGE_SIZE);
  }, [filings, currentPage]);

  const handleGoToPage = (p: number) => {
    const newPage = Math.max(1, Math.min(p, totalPages));
    setCurrentPage(newPage);

    // Scroll to the filings section
    const filingsSection = document.getElementById("filings-section");
    if (filingsSection) {
      const offset = 100; // Offset from top for better visibility
      const elementPosition = filingsSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const renderPageButtons = () => {
    const btns: (number | -1)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) btns.push(i);
    } else {
      const left = Math.max(2, currentPage - 1);
      const right = Math.min(totalPages - 1, currentPage + 1);

      btns.push(1);
      if (left > 2) btns.push(-1);
      for (let i = left; i <= right; i++) btns.push(i);
      if (right < totalPages - 1) btns.push(-1);
      btns.push(totalPages);
    }

    return btns.map((b, idx) =>
      b === -1 ? (
        <span key={idx} className="px-3 text-slate-400">
          …
        </span>
      ) : (
        <Button
          key={b}
          size="sm"
          onClick={() => handleGoToPage(b)}
          className={
            currentPage === b
              ? "bg-gradient-to-r from-brand-navy to-brand-cyan text-white"
              : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
          }
        >
          {b}
        </Button>
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
         {/* ⭐ PAGE TITLE ADDED HERE */}
                  <Helmet>
                    <title>DigiPowerX SEC Filings | AI Cloud & Infrastructure Disclosures

      
            </title>
                    <meta
                      name="description"
                      content="DigiPowerX SEC Filings | Transparent Financial Statements, Regulatory Disclosures & Compliance Updates for AI and Cloud Infrastructure Investors
."
                    />
                  </Helmet>
      <Navigation />

      {/* HERO SECTION */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-blue-50 via-white to-blue-100
                          dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 overflow-hidden">

        {/* BACKGROUND ANIMATION FIX - z-0 + pointer-events-none */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none z-0"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-64 h-64 bg-brand-navy/10 rounded-full blur-3xl pointer-events-none z-0"
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.6, 0.3, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* HERO CONTENT */}
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-lg mb-6"
              >
                <FileText className="w-12 h-12 text-brand-cyan" />
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <GradientText>SEC Filings</GradientText>
              </h1>
              <div className="w-40 h-1.5 bg-gradient-to-r from-brand-navy to-brand-cyan rounded-full mx-auto mb-6" />
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Access our complete collection of Securities and Exchange Commission filings.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* GRID SECTION */}
      <section id="filings-section" className="py-24 px-6 max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Recent Filings
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              View and download our latest filings.
            </p>
          </div>
        </FadeIn>

        {/* LOADING STATE */}
        {isPending && (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin" />
              <p className="text-slate-600 dark:text-slate-300">Loading filings...</p>
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {loadError && !isPending && (
          <div className="text-center py-20">
            <div className="inline-block p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl mb-4">
              <FileText className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
              Error Loading Filings
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">{loadError}</p>
            <Button
              onClick={() => refetch()}
              className="bg-gradient-to-r from-brand-navy to-brand-cyan text-white px-6 py-3 rounded-lg"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!isPending && !loadError && filings.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-4">
              <FileText className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              No Filings Available
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Check back later for new SEC filings.
            </p>
          </div>
        )}

        {/* FILINGS GRID */}
        {!isPending && !loadError && filings.length > 0 && (
        <div>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-6">
            Displaying {paginatedFilings.length} of {totalItems} filing{totalItems !== 1 ? 's' : ''}
          </p>
        <StaggerContainer
          key={currentPage}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {paginatedFilings.map((filing) => (
            <StaggerItem key={filing.id}>
              <motion.div whileHover={{ y: -8, scale: 1.02 }} className="h-full">

                <Card className="group h-full border border-gray-200 dark:border-slate-700 shadow-md
                                 hover:shadow-2xl rounded-2xl p-6 bg-white dark:bg-slate-900
                                 transition-all duration-500 relative overflow-hidden z-10 flex flex-col">

                  {/* Hover Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 to-brand-navy/0
                                  group-hover:from-brand-cyan/10 group-hover:to-brand-navy/10
                                  transition-all duration-500 pointer-events-none z-0" />

                  <CardContent className="flex flex-col h-full p-0 relative z-10">

                    {/* Content wrapper with flex-grow */}
                    <div className="flex-grow space-y-4">
                      {/* DATE */}
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-brand-cyan/10 rounded-lg">
                          <Calendar className="w-5 h-5 text-brand-cyan" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Filing Date</p>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            {filing.date ? (
                              new Date(filing.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            ) : (
                              <span className="text-slate-400 dark:text-slate-500 italic">Date not available</span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* FORM TYPE */}
                      <div className="bg-gradient-to-r from-brand-navy/5 to-brand-cyan/5
                                      dark:from-brand-navy/20 dark:to-brand-cyan/20
                                      rounded-xl p-4 border border-brand-cyan/20">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Form Type</p>
                        <p className="text-2xl font-bold bg-gradient-to-r from-brand-navy to-brand-cyan
                                        bg-clip-text text-transparent">
                          {filing.form}
                        </p>
                      </div>

                      {/* DESCRIPTION */}
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Description</p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium line-clamp-3">
                          {filing.desc}
                        </p>
                      </div>
                    </div>

                    {/* DOWNLOAD BUTTON - Fixed at bottom */}
                    <div className="mt-5">
                      {filing.link ? (
                        <a href={filing.link} target="_blank" rel="noopener noreferrer">
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <Button className="w-full flex items-center justify-center gap-2 rounded-xl shadow-md
                                                bg-gradient-to-r from-brand-navy to-brand-cyan text-white py-6 hover:shadow-lg transition-shadow">
                              <Download className="w-5 h-5" />
                              Download PDF
                              <ExternalLink className="w-4 h-4 ml-1" />
                            </Button>
                          </motion.div>
                        </a>
                      ) : (
                        <Button disabled className="w-full rounded-xl py-6 opacity-60">
                          No PDF Available
                        </Button>
                      )}
                    </div>

                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        </div>
        )}

        {/* PAGINATION */}
        {!isPending && !loadError && filings.length > 0 && totalPages > 1 && (
        <FadeIn delay={0.6}>
          <div className="flex flex-col items-center gap-6 mt-16">
            {/* Page Info */}
            <p className="text-slate-600 dark:text-slate-300">
              Page {currentPage} of {totalPages}
            </p>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {/* Previous Button */}
              <Button
                size="sm"
                onClick={() => handleGoToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {/* Page Numbers */}
              {renderPageButtons()}

              {/* Next Button */}
              <Button
                size="sm"
                onClick={() => handleGoToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </FadeIn>
        )}
      </section>

      <Footer />
    </div>
  );
}