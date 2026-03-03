import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import TimestampConverterTool from '../../components/tools/TimestampConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Timestamp Converter — The Tool Guru',
  description: 'Convert between Unix timestamps and human-readable dates. Free online timestamp converter tool.',
  keywords: ['timestamp converter', 'unix time', 'epoch', 'date converter', 'online tool'],
  alternates: {
    canonical: 'https://thetool.guru/tools/timestamp-converter',
  },
  openGraph: {
    title: 'Timestamp Converter — The Tool Guru',
    description: 'Convert between Unix timestamps and human-readable dates. Free online timestamp converter tool.',
    url: 'https://thetool.guru/tools/timestamp-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Timestamp Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Timestamp Converter — The Tool Guru',
    description: 'Convert between Unix timestamps and human-readable dates. Free online timestamp converter tool.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default TimestampConverterPage;


