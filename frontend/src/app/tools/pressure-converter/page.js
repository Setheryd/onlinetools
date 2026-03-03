import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PressureConverterTool from '../../components/tools/PressureConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Pressure Converter — The Tool Guru',
  description: 'Convert between Pa, kPa, MPa, bar, atm, and psi.',
  keywords: ['pressure', 'converter', 'psi', 'bar', 'kpa', 'atm', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/pressure-converter',
  },
  openGraph: {
    title: 'Pressure Converter — The Tool Guru',
    description: 'Convert between Pa, kPa, MPa, bar, atm, and psi.',
    url: 'https://thetool.guru/tools/pressure-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Pressure Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pressure Converter — The Tool Guru',
    description: 'Convert between Pa, kPa, MPa, bar, atm, and psi.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default PressureConverterPage;


