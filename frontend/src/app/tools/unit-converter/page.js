import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import UnitConverterTool from '../../components/tools/UnitConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Unit Converter — The Tool Guru',
  description: 'Convert units across categories like length, weight, temperature, volume, and more.',
  keywords: ['unit converter', 'length', 'weight', 'temperature', 'volume', 'conversion', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/unit-converter',
  },
  openGraph: {
    title: 'Unit Converter — The Tool Guru',
    description: 'Convert units across categories like length, weight, temperature, volume, and more.',
    url: 'https://thetool.guru/tools/unit-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Unit Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unit Converter — The Tool Guru',
    description: 'Convert units across categories like length, weight, temperature, volume, and more.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default UnitConverterPage;


