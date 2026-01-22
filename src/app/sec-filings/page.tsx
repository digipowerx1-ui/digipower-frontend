import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SecFilingsClient, { Filing } from "./SecFilingsClient";
import { Metadata } from "next";
import { toLocalMediaUrl } from "@/lib/media-url";
import { STRAPI_API, toAbsoluteStrapiUrl } from "@/lib/strapi";

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

const API_BASE = STRAPI_API.secFilings;

const mapFilings = (items: StrapiFilingItem[]): Filing[] =>
    items.map((item) => {
        let pdfUrl = item.pdf_file?.url || "";

        // If URL is relative, prepend the Strapi base URL first
        pdfUrl = toAbsoluteStrapiUrl(pdfUrl) || "";

        // Convert to local proxy URL
        pdfUrl = toLocalMediaUrl(pdfUrl) || "";

        return {
            id: item.id,
            date: item.date || "",
            form: item.form_type?.trim() || "N/A",
            desc: item.description || "",
            link: pdfUrl,
        };
    });

export const metadata: Metadata = {
    title: "DigiPowerX SEC Filings | AI Cloud & Infrastructure Disclosures",
    description: "DigiPowerX SEC Filings | Transparent Financial Statements, Regulatory Disclosures & Compliance Updates for AI and Cloud Infrastructure Investors.",
};

// Static generation with ISR - page is pre-built and revalidated every hour
export const dynamic = 'force-static';
export const revalidate = 3600;

async function fetchAllSecFilings(): Promise<Filing[]> {
    const pageSize = 100;
    const buildURL = (page: number) =>
        `${API_BASE}?populate=*&sort=date:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

    let allFilings: StrapiFilingItem[] = [];

    try {
        // Fetch first page to get total page count - use ISR to cache for 1 hour
        const firstResponse = await fetch(buildURL(1), { next: { revalidate: 3600 } });
        if (!firstResponse.ok) {
            console.error(`HTTP error! status: ${firstResponse.status}`);
            return [];
        }

        const firstJson = await firstResponse.json();
        const firstData = firstJson.data || [];
        const pageCount = firstJson.meta?.pagination?.pageCount || 1;
        allFilings.push(...firstData);

        // Fetch remaining pages with ISR caching
        if (pageCount > 1) {
            const promises = [];
            for (let p = 2; p <= pageCount; p++) {
                promises.push(fetch(buildURL(p), { next: { revalidate: 3600 } }).then(r => r.json()));
            }

            const results = await Promise.all(promises);
            results.forEach(json => {
                if (json && json.data) {
                    allFilings.push(...json.data);
                }
            });
        }

        return mapFilings(allFilings);
    } catch (error) {
        console.error("Error fetching SEC filings:", error);
        return [];
    }
}

export default async function SecFilings() {
    const filings = await fetchAllSecFilings();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
            <Navigation />
            <SecFilingsClient initialFilings={filings} />
            <Footer />
        </div>
    );
}
