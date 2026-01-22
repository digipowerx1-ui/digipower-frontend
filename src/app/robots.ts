import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://www.digipowerx.com';

    return {
        rules: [
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/api/', '/_next/'],
            },
            {
                userAgent: 'Bingbot',
                allow: '/',
                disallow: ['/api/', '/_next/'],
            },
            {
                userAgent: 'Twitterbot',
                allow: '/',
            },
            {
                userAgent: 'facebookexternalhit',
                allow: '/',
            },
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
