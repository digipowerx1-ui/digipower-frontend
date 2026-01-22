"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col transition-colors duration-300">
            <Navigation />
            <main className="flex-grow flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900 px-4 transition-colors duration-300">
                <div className="max-w-2xl w-full text-center">
                    <div className="mb-8">
                        <h1 className="text-9xl font-bold bg-gradient-to-r from-[#334152] to-[#01d3ff] bg-clip-text text-transparent">
                            404
                        </h1>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                        Page Not Found
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300">
                        Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button asChild size="lg">
                            <Link href="/">Go to Homepage</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="dark:border-slate-600 dark:text-white dark:hover:bg-slate-800 transition-colors duration-300">
                            <Link href="/contact-us">Contact Support</Link>
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
