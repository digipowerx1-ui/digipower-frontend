"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Download, Share2, X, Facebook, Twitter, Linkedin, Mail, Link as LinkIcon } from 'lucide-react';
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PressRelease {
    id: string;
    title: string;
    date: string;
    category: string;
    content: string;
    pdfUrl: string | null;
}

interface PressReleaseDetailClientProps {
    pressRelease: PressRelease;
}

export default function PressReleaseDetailClient({ pressRelease }: PressReleaseDetailClientProps) {
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    // Share functionality - use window.location only on client
    const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://www.digipowerx.com/press-releases/${pressRelease.id}`;
    const shareTitle = pressRelease.title;

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareTitle)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
        email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`Check out this press release: ${currentUrl}`)}`
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(currentUrl);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    return (
        <>
            {/* Header Section */}
            <section className="relative py-12 px-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 mt-10">
                <div className="max-w-7xl mx-auto">
                    <FadeIn delay={0.1}>
                        <Link href="/press-releases">
                            <Button variant="outline" className="mb-6">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Press Releases
                            </Button>
                        </Link>
                    </FadeIn>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1">
                            <FadeIn delay={0.2}>
                                <div className="flex items-center gap-2 mb-4">
                                    <Calendar className="w-5 h-5 text-brand-cyan" />
                                    <span className="text-sm text-slate-700 dark:text-slate-300">
                                        {pressRelease.date}
                                    </span>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.3}>
                                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                                    {pressRelease.title}
                                </h1>
                            </FadeIn>

                            <FadeIn delay={0.4}>
                                <span className="inline-block px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-md">
                                    {pressRelease.category}
                                </span>
                            </FadeIn>
                        </div>

                        {/* Share and Download Buttons */}
                        <FadeIn delay={0.5}>
                            <div className="flex gap-3 relative">
                                {/* Download Button */}
                                {pressRelease.pdfUrl && (
                                    <motion.button
                                        onClick={() => window.open(pressRelease.pdfUrl!, "_blank")}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-slate-700"
                                        title="Download PDF"
                                    >
                                        <Download className="w-5 h-5 text-brand-cyan" />
                                    </motion.button>
                                )}

                                {/* Share Button */}
                                <motion.button
                                    onClick={() => setShowShareMenu(!showShareMenu)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-3 bg-gradient-to-r from-brand-navy to-brand-cyan text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                                    title="Share"
                                >
                                    <Share2 className="w-5 h-5" />
                                </motion.button>

                                {/* Share Menu Dropdown */}
                                {showShareMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 p-4 z-50"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="font-semibold text-slate-900 dark:text-white">Share this article</h3>
                                            <button
                                                onClick={() => setShowShareMenu(false)}
                                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="space-y-2">
                                            {/* Facebook */}
                                            <a
                                                href={shareLinks.facebook}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                                            >
                                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                                    <Facebook className="w-4 h-4 text-white" fill="currentColor" />
                                                </div>
                                                <span className="text-sm text-slate-700 dark:text-slate-300">Share on Facebook</span>
                                            </a>

                                            {/* Twitter */}
                                            <a
                                                href={shareLinks.twitter}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                                            >
                                                <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
                                                    <Twitter className="w-4 h-4 text-white" fill="currentColor" />
                                                </div>
                                                <span className="text-sm text-slate-700 dark:text-slate-300">Share on Twitter</span>
                                            </a>

                                            {/* LinkedIn */}
                                            <a
                                                href={shareLinks.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                                            >
                                                <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                                                    <Linkedin className="w-4 h-4 text-white" fill="currentColor" />
                                                </div>
                                                <span className="text-sm text-slate-700 dark:text-slate-300">Share on LinkedIn</span>
                                            </a>

                                            {/* Email */}
                                            <a
                                                href={shareLinks.email}
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                                            >
                                                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                                                    <Mail className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="text-sm text-slate-700 dark:text-slate-300">Share via Email</span>
                                            </a>

                                            {/* Copy Link */}
                                            <button
                                                onClick={handleCopyLink}
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors w-full text-left"
                                            >
                                                <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                                                    <LinkIcon className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="text-sm text-slate-700 dark:text-slate-300">
                                                    {copySuccess ? 'Link Copied!' : 'Copy Link'}
                                                </span>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* PDF Viewer Section */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <FadeIn delay={0.6}>
                        {pressRelease.pdfUrl ? (
                            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-slate-700">
                                <iframe
                                    src={`${pressRelease.pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                                    className="w-full h-[800px] md:h-[1000px]"
                                    title={pressRelease.title}
                                    style={{ border: 'none' }}
                                />

                                {/* Fallback link if iframe doesn't work */}
                                <div className="p-4 bg-gray-50 dark:bg-slate-800 text-center border-t border-gray-200 dark:border-slate-700">
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                        Having trouble viewing the PDF?
                                    </p>
                                    <a
                                        href={pressRelease.pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-brand-cyan hover:underline font-medium"
                                    >
                                        Open PDF in new tab
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-12 text-center border border-gray-200 dark:border-slate-700">
                                <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
                                    {pressRelease.content || "PDF not available for this press release."}
                                </p>
                            </div>
                        )}
                    </FadeIn>
                </div>
            </section>
        </>
    );
}
