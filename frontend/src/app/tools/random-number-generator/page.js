import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import RandomNumberGeneratorTool from '../../components/tools/RandomNumberGeneratorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Random Number Generator — The Tool Guru',
  description: 'Generate random numbers within a range, with optional uniqueness and count.',
  keywords: ['random', 'number', 'generator', 'rng', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/random-number-generator',
  },
  openGraph: {
    title: 'Random Number Generator — The Tool Guru',
    description: 'Generate random numbers within a range, with optional uniqueness and count.',
    url: 'https://thetool.guru/tools/random-number-generator',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Random Number Generator — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Random Number Generator — The Tool Guru',
    description: 'Generate random numbers within a range, with optional uniqueness and count.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default RandomNumberGeneratorPage;


