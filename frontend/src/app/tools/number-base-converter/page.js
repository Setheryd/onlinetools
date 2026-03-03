import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import NumberBaseConverterTool from '../../components/tools/NumberBaseConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Number Base Converter — Binary, Hex, Decimal, Octal | The Tool Guru',
  description: 'Free number base converter. Convert between binary, hexadecimal, decimal, octal (bases 2–36). Instant results in your browser.',
  keywords: ['number base converter', 'binary to decimal', 'hex to decimal', 'decimal to hex', 'octal', 'radix', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/number-base-converter',
  },
  openGraph: {
    title: 'Number Base Converter — Binary, Hex, Decimal, Octal | The Tool Guru',
    description: 'Free number base converter. Convert between binary, hex, decimal, octal (bases 2–36).',
    url: 'https://thetool.guru/tools/number-base-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Number Base Converter - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Number Base Converter — Binary, Hex, Decimal, Octal | The Tool Guru',
    description: 'Free number base converter. Convert between binary, hex, decimal, octal.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default NumberBaseConverterPage;


