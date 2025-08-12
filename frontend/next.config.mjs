/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow importing from directories outside the Next.js app root (monorepo "shared" folder)
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
