import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PercentageCalculatorTool from '../../components/tools/PercentageCalculatorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Percentage Calculator — The Tool Guru',
  description: 'Compute X% of Y, find what percent X is of Y, and percentage change.',
  keywords: ['percentage', 'calculator', 'percent change', 'percent of', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/percentage-calculator',
  },
  openGraph: {
    title: 'Percentage Calculator — The Tool Guru',
    description: 'Compute X% of Y, find what percent X is of Y, and percentage change.',
    url: 'https://thetool.guru/tools/percentage-calculator',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Percentage Calculator — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Percentage Calculator — The Tool Guru',
    description: 'Compute X% of Y, find what percent X is of Y, and percentage change.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default PercentageCalculatorPage;


