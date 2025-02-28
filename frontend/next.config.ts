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
    remotePatterns : [
      {
        pathname: '/**',
        hostname : 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        port: '',
        protocol: 'https'
      },
      {
        pathname : '/photos/**',
        hostname: 'api.unsplash.com',
        port : '',
        protocol : 'https'
      }
    ],
    domains:['https://hebbkx1anhila5yf.public.blob.vercel-storage.com','https://api.unsplash.com','images.unsplash.com']
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/assets')],
  },

};

export default nextConfig;
