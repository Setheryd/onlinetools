import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import SquareUnitPriceCalculatorTool from '../../components/tools/SquareUnitPriceCalculatorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Price per Square Meter & Square Foot Calculator — The Tool Guru',
  description: 'Calculate price per square meter, price per square foot, or total cost from area/volume and unit price. Free calculator for real estate and materials.',
  keywords: ['price per square meter', 'price per square foot', 'square unit price', 'area cost calculator', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/square-unit-price-calculator',
  },
  openGraph: {
    title: 'Price per Square Meter & Square Foot Calculator — The Tool Guru',
    description: 'Calculate price per square meter, price per square foot, or total cost from area/volume and unit price.',
    url: 'https://thetool.guru/tools/square-unit-price-calculator',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Square Unit Price Calculator - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Price per Square Meter & Square Foot Calculator — The Tool Guru',
    description: 'Calculate price per square meter, price per square foot, or total cost from area/volume and unit price.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default SquareUnitPriceCalculatorPage;
