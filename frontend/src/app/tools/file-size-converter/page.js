import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import FileSizeConverterTool from '../../components/tools/FileSizeConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'File Size Converter — The Tool Guru',
  description: 'Convert between Bytes, KB, MB, GB, and TB. Free online file size converter tool.',
  keywords: ['file size', 'converter', 'kb', 'mb', 'gb', 'tb', 'bytes'],
  alternates: {
    canonical: 'https://thetool.guru/tools/file-size-converter',
  },
  openGraph: {
    title: 'File Size Converter — The Tool Guru',
    description: 'Convert between Bytes, KB, MB, GB, and TB. Free online file size converter tool.',
    url: 'https://thetool.guru/tools/file-size-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'File Size Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'File Size Converter — The Tool Guru',
    description: 'Convert between Bytes, KB, MB, GB, and TB. Free online file size converter tool.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default FileSizeConverterPage;


