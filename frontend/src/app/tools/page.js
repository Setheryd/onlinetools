import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Body from '../components/layout/Body';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { categories, getBuiltTools, getUnbuiltTools } from '@/lib/tools';
import ToolsPageClient from './ToolsPageClient';

export const metadata = {
  title: 'All Tools - The Tool Guru',
  description: 'Browse our complete collection of free online tools including password generators, encoders, calculators, image processors, and more. All tools are free to use with no registration required.',
  keywords: 'online tools, free tools, password generator, base64, json formatter, calculators, image tools, web utilities, the tool guru',
  alternates: {
    canonical: 'https://thetool.guru/tools',
  },
  openGraph: {
    title: 'All Tools - The Tool Guru',
    description: 'Browse our complete collection of free online tools including password generators, encoders, calculators, image processors, and more.',
    url: 'https://thetool.guru/tools',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'The Tool Guru - All Tools',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Tools - The Tool Guru',
    description: 'Browse our complete collection of free online tools including password generators, encoders, calculators, image processors, and more.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
};

const ToolsIndexPage = () => {
  const builtTools = getBuiltTools();
  const unbuiltTools = getUnbuiltTools();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ToolsPageClient 
        builtTools={builtTools}
        unbuiltTools={unbuiltTools}
        categories={categories}
      />
      <Footer />
    </div>
  );
};

export default ToolsIndexPage;


