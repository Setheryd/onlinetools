import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import MetaTagGeneratorTool from '../../components/tools/MetaTagGeneratorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Meta Tag Generator — The Tool Guru',
  description: 'Generate SEO and social meta tags (Open Graph, Twitter) for your pages.',
  keywords: ['meta tags', 'open graph', 'twitter cards', 'seo', 'generator'],
  alternates: {
    canonical: 'https://thetool.guru/tools/meta-tag-generator',
  },
  openGraph: {
    title: 'Meta Tag Generator — The Tool Guru',
    description: 'Generate SEO and social meta tags (Open Graph, Twitter) for your pages.',
    url: 'https://thetool.guru/tools/meta-tag-generator',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Meta Tag Generator — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meta Tag Generator — The Tool Guru',
    description: 'Generate SEO and social meta tags (Open Graph, Twitter) for your pages.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default MetaTagGeneratorPage;


