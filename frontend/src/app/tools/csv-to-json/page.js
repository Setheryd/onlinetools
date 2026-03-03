import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import CsvJsonConverterTool from '../../components/tools/CsvJsonConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'CSV ⇄ JSON Converter — The Tool Guru',
  description: 'Convert CSV to JSON and JSON to CSV in your browser. Handles quotes and custom delimiters.',
  keywords: ['csv', 'json', 'convert', 'parser', 'delimiter', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/csv-to-json',
  },
  openGraph: {
    title: 'CSV ⇄ JSON Converter — The Tool Guru',
    description: 'Convert CSV to JSON and JSON to CSV in your browser. Handles quotes and custom delimiters.',
    url: 'https://thetool.guru/tools/csv-to-json',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'CSV ⇄ JSON Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSV ⇄ JSON Converter — The Tool Guru',
    description: 'Convert CSV to JSON and JSON to CSV in your browser. Handles quotes and custom delimiters.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default CsvJsonPage;


