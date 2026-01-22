/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.prod.website-files.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
