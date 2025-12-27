/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-popover', '@radix-ui/react-tooltip', '@radix-ui/react-dialog'],
  },
};

export default nextConfig;

