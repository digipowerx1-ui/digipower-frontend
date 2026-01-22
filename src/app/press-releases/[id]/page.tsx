import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toLocalMediaUrl } from "@/lib/media-url";
import { STRAPI_API, toAbsoluteStrapiUrl } from "@/lib/strapi";
import PressReleaseDetailClient from "./PressReleaseDetailClient";

// Static generation with ISR
export const dynamic = 'force-static';
export const revalidate = 3600;

interface PressRelease {
    id: string;
    title: string;
    date: string;
    category: string;
    content: string;
    pdfUrl: string | null;
}

// Generate static params for all press releases
export async function generateStaticParams() {
    try {
        const res = await fetch(
            `${STRAPI_API.pressReleases}?fields=id&pagination[pageSize]=100`,
            { next: { revalidate: 3600 } }
        );
        const json = await res.json();
        const data = json.data || [];

        return data.map((item: { id: number; documentId?: string }) => ({
            id: String(item.documentId || item.id),
        }));
    } catch {
        return [];
    }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const pressRelease = await fetchPressRelease(id);

    if (!pressRelease) {
        return {
            title: 'Press Release Not Found | DigiPowerX',
        };
    }

    return {
        title: `${pressRelease.title} | DigiPowerX Press Release`,
        description: pressRelease.content?.slice(0, 160) || 'Read the official press release from DigiPowerX.',
    };
}

async function fetchPressRelease(id: string): Promise<PressRelease | null> {
    try {
        const res = await fetch(
            `${STRAPI_API.pressReleases}/${id}?fields=title,date,content&populate[pdf_file][fields]=url,name`,
            { next: { revalidate: 3600 } }
        );

        if (!res.ok) return null;

        const data = await res.json();

        if (!data.data) return null;

        const item = data.data;
        let pdfUrl = item.pdf_file?.url || null;

        // If URL is relative, prepend the Strapi base URL first
        pdfUrl = toAbsoluteStrapiUrl(pdfUrl);

        // Convert to local proxy URL (e.g., /api/media/...)
        pdfUrl = toLocalMediaUrl(pdfUrl);

        return {
            id: String(item.documentId || item.id),
            title: item.title || 'Untitled',
            date: item.date || '',
            category: "Corporate Update",
            content: item.content || "",
            pdfUrl: pdfUrl
        };
    } catch {
        return null;
    }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const pressRelease = await fetchPressRelease(id);

    if (!pressRelease) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900">
                <Navigation />
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Press Release Not Found</h2>
                        <Link href="/press-releases">
                            <Button>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Press Releases
                            </Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900">
            <Navigation />
            <PressReleaseDetailClient pressRelease={pressRelease} />
            <Footer />
        </div>
    );
}
