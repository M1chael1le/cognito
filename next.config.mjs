/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mammoth"],
  },
  webpack: (config) => {
    // pdfjs-dist tries to require 'canvas' which doesn't exist in browser
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
