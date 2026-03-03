import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import DiceRollerTool from '../../components/tools/DiceRollerTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Dice Roller — The Tool Guru',
  description: 'Roll dice of various sizes with cryptographically strong randomness where available.',
  keywords: ['dice', 'roller', 'd6', 'd20', 'rng', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/dice-roller',
  },
  openGraph: {
    title: 'Dice Roller — The Tool Guru',
    description: 'Roll dice of various sizes with cryptographically strong randomness where available.',
    url: 'https://thetool.guru/tools/dice-roller',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Dice Roller — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dice Roller — The Tool Guru',
    description: 'Roll dice of various sizes with cryptographically strong randomness where available.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default DiceRollerPage;


