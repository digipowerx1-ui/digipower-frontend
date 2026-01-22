import { MetadataRoute } from 'next';
import { STRAPI_API } from '@/lib/strapi';

const BASE_URL = 'https://www.digipowerx.com';

interface StrapiPressRelease {
    id: number;
    documentId?: string;
    date?: string;
    updatedAt?: string;
}

interface StrapiResponse {
    data: StrapiPressRelease[];
}

async function getPressReleases(): Promise<StrapiPressRelease[]> {
    try {
        const response = await fetch(
            `${STRAPI_API.pressReleases}?fields=id,date,updatedAt&pagination[pageSize]=100`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );
        if (!response.ok) return [];
        const json: StrapiResponse = await response.json();
        return json.data || [];
    } catch {
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static pages with their priorities and change frequencies
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/investor-relations`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/stock-information`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/press-releases`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/sec-filings`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/presentations-events`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/leadership-committees`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/projects`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/arms`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/career`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/contact-us`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/partner`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/email-alerts`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/document`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.4,
        },
        {
            url: `${BASE_URL}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/terms-of-use`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    // Dynamic press release pages
    const pressReleases = await getPressReleases();
    const pressReleasePages: MetadataRoute.Sitemap = pressReleases.map((pr) => ({
        url: `${BASE_URL}/press-releases/${pr.documentId || pr.id}`,
        lastModified: pr.updatedAt ? new Date(pr.updatedAt) : (pr.date ? new Date(pr.date) : new Date()),
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    return [...staticPages, ...pressReleasePages];
}
