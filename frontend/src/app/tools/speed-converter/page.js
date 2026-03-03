import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import SpeedConverterTool from '../../components/tools/SpeedConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Speed Converter — The Tool Guru',
  description: 'Convert between m/s, km/h, mph, knots, and ft/s.',
  keywords: ['speed', 'converter', 'mph', 'kmh', 'knots', 'mps', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/speed-converter',
  },
  openGraph: {
    title: 'Speed Converter — The Tool Guru',
    description: 'Convert between m/s, km/h, mph, knots, and ft/s.',
    url: 'https://thetool.guru/tools/speed-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Speed Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Speed Converter — The Tool Guru',
    description: 'Convert between m/s, km/h, mph, knots, and ft/s.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default SpeedConverterPage;


