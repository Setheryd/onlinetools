import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import TemperatureConverterTool from '../../components/tools/TemperatureConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Temperature Converter — The Tool Guru',
  description: 'Convert between Celsius, Fahrenheit, and Kelvin quickly and accurately.',
  keywords: ['temperature', 'converter', 'celsius', 'fahrenheit', 'kelvin', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/temperature-converter',
  },
  openGraph: {
    title: 'Temperature Converter — The Tool Guru',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin quickly and accurately.',
    url: 'https://thetool.guru/tools/temperature-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Temperature Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Temperature Converter — The Tool Guru',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin quickly and accurately.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default TemperatureConverterPage;


