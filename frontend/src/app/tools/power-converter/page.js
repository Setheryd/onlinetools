import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PowerConverterTool from '../../components/tools/PowerConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Power Converter — The Tool Guru',
  description: 'Convert between Watts, kilowatts, horsepower, and dBm.',
  keywords: ['power', 'converter', 'watt', 'kilowatt', 'horsepower', 'dbm'],
  alternates: {
    canonical: 'https://thetool.guru/tools/power-converter',
  },
  openGraph: {
    title: 'Power Converter — The Tool Guru',
    description: 'Convert between Watts, kilowatts, horsepower, and dBm.',
    url: 'https://thetool.guru/tools/power-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Power Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Power Converter — The Tool Guru',
    description: 'Convert between Watts, kilowatts, horsepower, and dBm.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default PowerConverterPage;


