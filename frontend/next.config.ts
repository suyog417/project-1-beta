import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    localPatterns: [
      {
        pathname: '/assets/**',
        search: '',
      },
    ],
    remotePatterns: [
      {
        pathname: '/**',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        port: '',
        protocol: 'https'
      },
      {
        pathname: '/**',
        hostname: 'cdn.corporatefinanceinstitute.com',
        port: '',
        protocol: 'https'
      },
      {
        pathname: '/**',
        hostname: 'media.istockphoto.com',
        port: '',
        protocol: 'https'
      },
      {
        pathname: '/photos/**',
        hostname: 'api.unsplash.com',
        port: '',
        protocol: 'https'
      }
    ],
    domains: ['https://hebbkx1anhila5yf.public.blob.vercel-storage.com', 'https://api.unsplash.com', 'images.unsplash.com', 'cdn.corporatefinanceinstitute.com', 'media.istockphoto.com']
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/assets')],
  },
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during the build
  },
  typescript: {
    ignoreBuildErrors: true, // Disable TypeScript errors during the build (if applicable)
  },
};

export default nextConfig;
