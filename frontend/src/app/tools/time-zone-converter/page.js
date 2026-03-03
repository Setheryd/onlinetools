import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import TimeZoneConverterTool from '../../components/tools/TimeZoneConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Time Zone Converter — The Tool Guru',
  description: 'Convert a date and time between time zones using your browser.',
  keywords: ['time zone', 'converter', 'utc', 'pst', 'est', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/time-zone-converter',
  },
  openGraph: {
    title: 'Time Zone Converter — The Tool Guru',
    description: 'Convert a date and time between time zones using your browser.',
    url: 'https://thetool.guru/tools/time-zone-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Time Zone Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Time Zone Converter — The Tool Guru',
    description: 'Convert a date and time between time zones using your browser.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default TimeZoneConverterPage;


