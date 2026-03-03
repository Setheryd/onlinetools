import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import VolumeConverterTool from '../../components/tools/VolumeConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Volume Converter — The Tool Guru',
  description: 'Convert between liters, gallons, cubic units, and more.',
  keywords: ['volume', 'converter', 'liters', 'gallons', 'cups', 'cubic', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/volume-converter',
  },
  openGraph: {
    title: 'Volume Converter — The Tool Guru',
    description: 'Convert between liters, gallons, cubic units, and more.',
    url: 'https://thetool.guru/tools/volume-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Volume Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Volume Converter — The Tool Guru',
    description: 'Convert between liters, gallons, cubic units, and more.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default VolumeConverterPage;


