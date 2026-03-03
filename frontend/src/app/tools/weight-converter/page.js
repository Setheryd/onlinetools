import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import WeightConverterTool from '../../components/tools/WeightConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Weight Converter — The Tool Guru',
  description: 'Convert between kilograms, grams, pounds, ounces, and tons.',
  keywords: ['weight', 'converter', 'kg', 'lb', 'oz', 'grams', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/weight-converter',
  },
  openGraph: {
    title: 'Weight Converter — The Tool Guru',
    description: 'Convert between kilograms, grams, pounds, ounces, and tons.',
    url: 'https://thetool.guru/tools/weight-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Weight Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Converter — The Tool Guru',
    description: 'Convert between kilograms, grams, pounds, ounces, and tons.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default WeightConverterPage;


