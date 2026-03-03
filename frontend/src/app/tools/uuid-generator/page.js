import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import UuidGeneratorTool from '../../components/tools/UuidGeneratorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'UUID Generator — The Tool Guru',
  description: 'Generate RFC 4122 v4 UUIDs. Free online UUID generator tool.',
  keywords: ['uuid', 'guid', 'generator', 'rfc4122', 'unique id', 'online tool'],
  alternates: {
    canonical: 'https://thetool.guru/tools/uuid-generator',
  },
  openGraph: {
    title: 'UUID Generator — The Tool Guru',
    description: 'Generate RFC 4122 v4 UUIDs. Free online UUID generator tool.',
    url: 'https://thetool.guru/tools/uuid-generator',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'UUID Generator — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UUID Generator — The Tool Guru',
    description: 'Generate RFC 4122 v4 UUIDs. Free online UUID generator tool.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default UuidGeneratorPage;


