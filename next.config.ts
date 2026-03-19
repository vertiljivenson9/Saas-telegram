import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NO especificar output - Vercel lo maneja automáticamente
  // Para otros deployments usar standalone
  
  // Disable image optimization for faster builds
  images: {
    unoptimized: true,
  },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // React strict mode
  reactStrictMode: false,
};

export default nextConfig;
