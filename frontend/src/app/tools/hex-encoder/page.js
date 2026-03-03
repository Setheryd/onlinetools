import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import HexEncoderTool from '../../components/tools/HexEncoderTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Hex Encoder/Decoder — The Tool Guru',
  description: 'Convert text to hexadecimal and decode hex back to text. UTF-8, client-side.',
  keywords: ['hex', 'encoder', 'decoder', 'convert', 'utf-8', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/hex-encoder',
  },
  openGraph: {
    title: 'Hex Encoder/Decoder — The Tool Guru',
    description: 'Convert text to hexadecimal and decode hex back to text. UTF-8, client-side.',
    url: 'https://thetool.guru/tools/hex-encoder',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Hex Encoder/Decoder — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hex Encoder/Decoder — The Tool Guru',
    description: 'Convert text to hexadecimal and decode hex back to text. UTF-8, client-side.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default HexEncoderPage;


