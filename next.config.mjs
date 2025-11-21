import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Shim react-router-dom so existing components can run under Next.js routing.
    config.resolve.alias['react-router-dom'] = path.join(__dirname, 'src/lib/react-router-dom-shim.tsx');
    return config;
  },
};

export default nextConfig;
