import { STRAPI_URL, STRAPI_MEDIA_URL } from "@/lib/strapi";

/**
 * Converts a Strapi media URL to a local proxy URL
 *
 * Example:
 * Input: https://thankful-miracle-1ed8bdfdaf.media.strapiapp.com/Digi_Power_X_Secures_7f23854537.pdf
 * Output: /api/media/Digi_Power_X_Secures_7f23854537.pdf
 *
 * This allows PDFs to be served through your domain:
 * - Local: http://localhost:3000/api/media/...
 * - Production: https://digipowerx.com/api/media/...
 */

// Extract hostnames from the centralized config
const STRAPI_MEDIA_HOSTS = [
  new URL(STRAPI_MEDIA_URL).hostname,
  new URL(STRAPI_URL).hostname,
];

export function toLocalMediaUrl(strapiUrl: string | null | undefined): string | null {
  if (!strapiUrl) return null;

  try {
    const url = new URL(strapiUrl);

    // Check if this is a Strapi media URL
    if (STRAPI_MEDIA_HOSTS.some(host => url.hostname === host)) {
      // Extract the path and return as local proxy URL
      return `/api/media${url.pathname}`;
    }

    // If it's a relative URL from Strapi (starts with /uploads/)
    if (strapiUrl.startsWith('/uploads/')) {
      return `/api/media${strapiUrl}`;
    }

    // Return the original URL if it's not a Strapi media URL
    return strapiUrl;
  } catch {
    // If URL parsing fails, check if it's a relative path
    if (strapiUrl.startsWith('/')) {
      return `/api/media${strapiUrl}`;
    }
    return strapiUrl;
  }
}

/**
 * Builds a full Strapi media URL from a relative path
 */
export function toStrapiMediaUrl(relativePath: string): string {
  if (relativePath.startsWith('http')) {
    return relativePath;
  }

  return `${STRAPI_URL}${relativePath.startsWith('/') ? '' : '/'}${relativePath}`;
}
