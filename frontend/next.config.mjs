/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  async redirects() {
    return [
      // Blog tag pages never existed; send to blog index (fixes Search Console 404s)
      { source: '/blog/tag/:path*', destination: '/blog', permanent: true },
      // Old search template URL (literal {search_term_string}) — send to tools
      { source: '/search', destination: '/tools', permanent: true },
    ];
  },
};

export default nextConfig;
