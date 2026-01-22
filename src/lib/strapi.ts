// Centralized Strapi configuration
// All Strapi URLs should reference this file instead of hardcoding

export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://thankful-miracle-1ed8bdfdaf.strapiapp.com';
export const STRAPI_MEDIA_URL = process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL || 'https://thankful-miracle-1ed8bdfdaf.media.strapiapp.com';

// API endpoints
export const STRAPI_API = {
    pressReleases: `${STRAPI_URL}/api/press-releases`,
    secFilings: `${STRAPI_URL}/api/sec-filings`,
    careers: `${STRAPI_URL}/api/careers`,
    openPositions: `${STRAPI_URL}/api/open-positions`,
    emailAlerts: `${STRAPI_URL}/api/email-alerts`,
    contactForms: `${STRAPI_URL}/api/contact-forms`,
    partners: `${STRAPI_URL}/api/partners`,
    notifyMe: `${STRAPI_URL}/api/notify-mes`,
};

// Helper to prepend Strapi URL to relative paths
export function toAbsoluteStrapiUrl(path: string | null | undefined): string | null {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${STRAPI_URL}${path}`;
}
