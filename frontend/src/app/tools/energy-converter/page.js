import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import EnergyConverterTool from '../../components/tools/EnergyConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Energy Converter — The Tool Guru',
  description: 'Convert between joules, watt-hours, calories, BTU, and more.',
  keywords: ['energy', 'converter', 'joules', 'watt hours', 'kwh', 'calories', 'btu'],
  alternates: {
    canonical: 'https://thetool.guru/tools/energy-converter',
  },
  openGraph: {
    title: 'Energy Converter — The Tool Guru',
    description: 'Convert between joules, watt-hours, calories, BTU, and more.',
    url: 'https://thetool.guru/tools/energy-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Energy Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Energy Converter — The Tool Guru',
    description: 'Convert between joules, watt-hours, calories, BTU, and more.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default EnergyConverterPage;


