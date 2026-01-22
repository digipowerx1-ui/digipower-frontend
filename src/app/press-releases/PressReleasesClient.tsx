"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    Calendar,
    Search,
    Filter,
    Newspaper,
    ArrowRight,
    Download,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import GradientText from "@/components/GradientText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface PressRelease {
    id: number | string;
    title: string;
    date: string;
    category: string;
    excerpt: string;
    pdfUrl: string | null;
}

interface PressReleasesClientProps {
    initialPressReleases: PressRelease[];
}

export default function PressReleasesClient({ initialPressReleases }: PressReleasesClientProps) {
    const router = useRouter();
    const pressReleases = initialPressReleases;
    const [selectedYear, setSelectedYear] = useState<string>("All");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Pagination
    const PAGE_SIZE = 9;
    const [currentPage, setCurrentPage] = useState<number>(1);

    // ---------------------------------------
    // Filters
    // ---------------------------------------
    const years = ["All", "2022", "2023", "2024", "2025"];
    const categories = [
        "All",
        "Corporate Update",
        "Financial",
        "Leadership",
        "Strategy",
        "Expansion",
        "Technology",
        "Awards",
        "Partnership",
        "Product Update",
    ];

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            "Corporate Update": "from-blue-500 to-cyan-500",
            Financial: "from-green-500 to-teal-500",
            Leadership: "from-purple-500 to-pink-500",
            Strategy: "from-orange-500 to-red-500",
            Expansion: "from-indigo-500 to-blue-500",
            Technology: "from-cyan-500 to-blue-500",
            Awards: "from-yellow-500 to-orange-500",
            Partnership: "from-pink-500 to-rose-500",
            "Product Update": "from-violet-500 to-purple-500",
        };
        return colors[category] || "from-gray-500 to-slate-500";
    };

    const filteredReleases = useMemo(() => {
        return pressReleases.filter((r) => {
            const matchesYear =
                selectedYear === "All" || (r.date && r.date.includes(selectedYear));
            const matchesCategory =
                selectedCategory === "All" || r.category === selectedCategory;
            const matchesSearch =
                searchQuery === "" ||
                r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesYear && matchesCategory && matchesSearch;
        });
    }, [pressReleases, selectedYear, selectedCategory, searchQuery]);

    // reset page on filter change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedYear, selectedCategory, searchQuery]);

    // pagination logic
    const totalItems = filteredReleases.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(totalPages);
    }, [totalPages]);

    const paginatedReleases = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return filteredReleases.slice(start, start + PAGE_SIZE);
    }, [filteredReleases, currentPage]);

    const handleGoToPage = (p: number) => {
        const newPage = Math.max(1, Math.min(p, totalPages));
        setCurrentPage(newPage);

        // Scroll to the press releases section
        const pressSection = document.getElementById("press-releases-section");
        if (pressSection) {
            const offset = 100; // Offset from top for better visibility
            const elementPosition = pressSection.getBoundingClientRect().top;
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
                <span key={`ellipsis-${idx}`} className="px-3 text-slate-400">
                    …
                </span>
            ) : (
                <Button
                    key={`page-${b}`}
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
        <>
            {/* HERO */}
            <section className="relative py-32 px-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 overflow-hidden">
                <motion.div className="absolute top-20 left-20 w-72 h-72 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
                <motion.div className="absolute bottom-20 right-20 w-72 h-72 bg-brand-navy/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-block p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-lg mb-6">
                        <Newspaper className="w-12 h-12 text-brand-cyan" />
                    </div>

                    <h1 className="text-6xl font-bold mb-6 text-slate-900 dark:text-white">
                        <GradientText>Press Releases</GradientText>
                    </h1>

                    <h2 className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
                        Stay updated with the latest official announcements and updates.
                    </h2>
                </div>
            </section>

            {/* FILTERS */}
            <section className="py-12 px-6 bg-white dark:bg-slate-900 border-b">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-4 text-slate-400 pointer-events-none" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search press releases..."
                            className="w-full pl-12 h-14 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition-all"
                        />
                    </div>

                    {/* Year */}
                    <div className="relative">
                        <Filter className="absolute left-4 top-4 text-slate-400 pointer-events-none" />
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="w-full pl-12 h-14 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white text-slate-900 dark:bg-slate-900 dark:text-white focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition-all cursor-pointer"
                        >
                            {years.map((y) => (
                                <option key={y} value={y} className="text-slate-900 dark:text-white">
                                    {y}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Category */}
                    <div className="relative">
                        <Filter className="absolute left-4 top-4 text-slate-400 pointer-events-none" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full pl-12 h-14 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white text-slate-900 dark:bg-slate-900 dark:text-white focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition-all cursor-pointer"
                        >
                            {categories.map((c) => (
                                <option key={c} value={c} className="text-slate-900 dark:text-white">
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </section>

            {/* CARDS */}
            <section id="press-releases-section" className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {totalItems > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {paginatedReleases.map((r) => (
                                    <motion.article
                                        key={r.id}
                                        onClick={() => router.push(`/press-releases/${r.id}`)}
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        className="group relative bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 shadow-md hover:shadow-2xl cursor-pointer transition-all duration-500 flex flex-col h-full"
                                    >
                                        {/* Hover gradient background */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 to-brand-navy/0
                                    group-hover:from-brand-cyan/5 group-hover:to-brand-navy/5
                                    transition-all duration-500 pointer-events-none rounded-2xl" />

                                        {/* Content wrapper with flex-grow */}
                                        <div className="flex-grow relative z-10">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="p-2 bg-brand-cyan/10 rounded-lg group-hover:bg-brand-cyan/20 transition-colors">
                                                    <Calendar className="w-4 h-4 text-brand-cyan" />
                                                </div>
                                                <span className="text-sm text-slate-700 dark:text-slate-300">
                                                    {r.date}
                                                </span>
                                            </div>

                                            <span
                                                className={`inline-block mb-3 px-3 py-1.5 text-xs text-white font-bold rounded-full bg-gradient-to-r ${getCategoryColor(
                                                    r.category
                                                )}`}
                                            >
                                                {r.category}
                                            </span>

                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-cyan transition-colors">
                                                {r.title}
                                            </h3>

                                            <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-3 mb-4">
                                                {r.excerpt}
                                            </p>
                                        </div>

                                        {/* Bottom button - Fixed position */}
                                        <div className="relative z-10 pt-4 border-t border-slate-100 dark:border-slate-700 mt-auto">
                                            <div className="flex items-center gap-2 text-brand-cyan font-semibold group-hover:gap-3 transition-all">
                                                Read full release <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>

                                        {r.pdfUrl && (
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (r.pdfUrl) window.open(r.pdfUrl, "_blank");
                                                }}
                                                className="absolute top-4 right-4 p-2 bg-white dark:bg-slate-900 rounded-lg shadow-md cursor-pointer hover:bg-brand-cyan/10 transition-colors z-20"
                                            >
                                                <Download className="w-4 h-4 text-brand-cyan" />
                                            </div>
                                        )}
                                    </motion.article>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
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
                            )}
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <Search className="w-16 h-16 mx-auto text-gray-400" />
                            <h3 className="text-xl font-bold mt-4 text-slate-900 dark:text-white">
                                No press releases found
                            </h3>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
