import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PressReleasesClient, { PressRelease } from "./PressReleasesClient";
import { Metadata } from "next";
import { toLocalMediaUrl } from "@/lib/media-url";
import { STRAPI_API, toAbsoluteStrapiUrl } from "@/lib/strapi";

export const metadata: Metadata = {
    title: "DigiPowerX Press Releases | Latest News & Announcements",
    description: "Latest Updates & Press Releases from DigiPowerX. Stay Informed on AI Cloud Infrastructure Developments & Strategic Milestones.",
};

// Static generation with ISR - page is pre-built and revalidated every hour
export const dynamic = 'force-static';
export const revalidate = 3600;

async function fetchPressReleases(): Promise<PressRelease[]> {
    const baseURL = STRAPI_API.pressReleases;
    const pageSize = 100; // fetch 100 per page

    const buildURL = (page: number) =>
        `${baseURL}?fields=title,date,content&populate[pdf_file][fields]=url,name&sort[0]=date:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

    try {
        let all: any[] = [];

        // first page - use ISR to cache for 1 hour instead of fetching fresh every time
        const first = await fetch(buildURL(1), { next: { revalidate: 3600 } }).then((r) => r.json());
        const firstData = first?.data || [];
        const pageCount = first?.meta?.pagination?.pageCount || 1;
        all.push(...firstData);

        // fetch remaining pages with ISR caching
        const remainingPromises = [];
        for (let p = 2; p <= pageCount; p++) {
            remainingPromises.push(fetch(buildURL(p), { next: { revalidate: 3600 } }).then((r) => r.json()));
        }

        const remaining = await Promise.all(remainingPromises);
        remaining.forEach(r => all.push(...(r?.data || [])));

        // normalize formatting
        const formatted = all.map((item: any) => {
            const attrs = item.attributes ?? item;
            const id = item.documentId ?? item.id ?? attrs.id;

            let pdfUrl: string | null = null;
            try {
                if (attrs.pdf_file?.data?.attributes?.url)
                    pdfUrl = attrs.pdf_file.data.attributes.url;
                else if (attrs.pdf_file?.url) pdfUrl = attrs.pdf_file.url;
                else if (item.pdf_file?.url) pdfUrl = item.pdf_file.url;

                // If URL is relative, prepend the Strapi base URL first
                pdfUrl = toAbsoluteStrapiUrl(pdfUrl);

                // Convert to local proxy URL
                pdfUrl = toLocalMediaUrl(pdfUrl);
            } catch { }

            return {
                id,
                title: attrs.title ?? "Untitled",
                date: attrs.date ?? "",
                category: "Corporate Update",
                excerpt:
                    attrs.content ??
                    "Click to view the full official press release PDF.",
                pdfUrl,
            } as PressRelease;
        });

        return formatted;
    } catch {
        return [];
    }
}

export default async function Page() {
    const pressReleases = await fetchPressReleases();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-white">
            <Navigation />
            <PressReleasesClient initialPressReleases={pressReleases} />
            <Footer />
        </div>
    );
}
