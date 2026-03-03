import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import AreaConverterTool from '../../components/tools/AreaConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Area Converter — The Tool Guru',
  description: 'Convert between square meters, feet, acres, hectares, and more.',
  keywords: ['area', 'converter', 'square feet', 'square meters', 'acre', 'hectare', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/area-converter',
  },
  openGraph: {
    title: 'Area Converter — The Tool Guru',
    description: 'Convert between square meters, feet, acres, hectares, and more.',
    url: 'https://thetool.guru/tools/area-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Area Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Area Converter — The Tool Guru',
    description: 'Convert between square meters, feet, acres, hectares, and more.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default AreaConverterPage;


