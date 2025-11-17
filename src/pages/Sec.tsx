import { useInfiniteQuery } from "@tanstack/react-query";
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

interface PaginationMeta {
  page: number;
  pageCount: number;
  total: number;
}

interface SecQueryPage {
  items: Filing[];
  meta: PaginationMeta;
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

async function fetchSecFilings(pageParam: number): Promise<SecQueryPage> {
  const params = new URLSearchParams();
  params.set("populate", "*");
  params.set("sort", "date:desc");
  params.set("pagination[page]", pageParam.toString());
  params.set("pagination[pageSize]", PAGE_SIZE.toString());

  const res = await fetch(`${API_BASE}?${params.toString()}`);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const json = await res.json();
  const formatted = mapFilings(json.data || []);
  const meta: PaginationMeta = json.meta?.pagination || {
    page: pageParam,
    pageCount: 1,
    total: formatted.length,
  };

  return {
    items: formatted,
    meta,
  };
}

export default function Sec() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isPending,
    isError,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery<SecQueryPage, Error>({
    queryKey: ["sec-filings"],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => fetchSecFilings(pageParam),
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.meta;
      return page < pageCount ? page + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });

  const filings = data?.pages.flatMap((page) => page.items) ?? [];
  const totalCount = data?.pages?.[0]?.meta.total ?? filings.length;
  const loadError = isError ? error?.message ?? "Failed to load filings" : null;

  const loadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
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
      <section className="py-24 px-6 max-w-7xl mx-auto">
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
            Displaying {filings.length} filing{filings.length !== 1 ? 's' : ''}
          </p>
        <StaggerContainer
          key={filings.length}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filings.map((filing) => (
            <StaggerItem key={filing.id}>
              <motion.div whileHover={{ y: -8, scale: 1.02 }} className="h-full">

                <Card className="group h-full border border-gray-200 dark:border-slate-700 shadow-md
                                 hover:shadow-2xl rounded-2xl p-6 bg-white dark:bg-slate-900
                                 transition-all duration-500 relative overflow-hidden z-10">

                  {/* Hover Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 to-brand-navy/0 
                                  group-hover:from-brand-cyan/10 group-hover:to-brand-navy/10 
                                  transition-all duration-500 pointer-events-none z-0" />

                  <CardContent className="space-y-5 p-0 relative z-10">

                    {/* DATE */}
                    <div className="flex items-center gap-2 mb-4">
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
                      <p className="text-xs text-slate-500 dark:text-slate-400">Description</p>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {filing.desc}
                      </p>
                    </div>

                    {/* DOWNLOAD BUTTON */}
                    {filing.link ? (
                      <a href={filing.link} target="_blank" rel="noopener noreferrer">
                        <motion.div whileHover={{ scale: 1.02 }}>
                          <Button className="w-full flex items-center justify-center gap-2 rounded-xl shadow-md 
                                              bg-gradient-to-r from-brand-navy to-brand-cyan text-white py-6">
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

                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Loading More Indicator */}
        {isFetchingNextPage && (
          <div className="flex justify-center items-center py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin" />
              <p className="text-slate-600 dark:text-slate-300">Loading more filings...</p>
            </div>
          </div>
        )}
        </div>
        )}

        {/* LOAD MORE */}
        {!isPending && !loadError && filings.length > 0 && (
        <FadeIn delay={0.6}>
          <div className="text-center mt-16">
            {/* Show current count and total */}
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Showing {filings.length} of {totalCount} filings
            </p>

            {hasNextPage && (
              <Button
                onClick={loadMore}
                disabled={isFetchingNextPage}
                className="bg-gradient-to-r from-brand-navy to-brand-cyan text-white px-10 py-6 text-lg rounded-full shadow-xl disabled:opacity-50"
              >
                {isFetchingNextPage ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Loading...
                  </>
                ) : (
                  <>
                    <FileDown className="w-5 h-5 mr-2" />
                    Load More Filings
                  </>
                )}
              </Button>
            )}

            {!hasNextPage && (
              <p className="text-slate-500 dark:text-slate-400 italic">
                All filings loaded
              </p>
            )}
          </div>
        </FadeIn>
        )}
      </section>

      <Footer />
    </div>
  );
}
