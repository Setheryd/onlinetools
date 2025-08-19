import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import BlogPageClient from './BlogPageClient';

export const metadata = {
  title: 'Blog - The Tool Guru',
  description: 'Discover expert tips, comprehensive tutorials, and cutting-edge insights about web tools, productivity, and modern development practices.',
  keywords: 'blog, tutorials, web tools, development, productivity, programming, the tool guru',
  alternates: {
    canonical: 'https://thetool.guru/blog',
  },
  openGraph: {
    title: 'Blog - The Tool Guru',
    description: 'Discover expert tips, comprehensive tutorials, and cutting-edge insights about web tools, productivity, and modern development practices.',
    url: 'https://thetool.guru/blog',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'The Tool Guru Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - The Tool Guru',
    description: 'Discover expert tips, comprehensive tutorials, and cutting-edge insights about web tools, productivity, and modern development practices.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
};

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <BlogPageClient />
      <Footer />
    </div>
  );
};

export default BlogPage;
