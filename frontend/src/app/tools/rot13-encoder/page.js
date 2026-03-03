import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import Rot13EncoderTool from '../../components/tools/Rot13EncoderTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'ROT13 Encoder/Decoder — The Tool Guru',
  description: 'Encode or decode text with the ROT13 cipher instantly in your browser.',
  keywords: ['rot13', 'encode', 'decode', 'cipher', 'caesar', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/rot13-encoder',
  },
  openGraph: {
    title: 'ROT13 Encoder/Decoder — The Tool Guru',
    description: 'Encode or decode text with the ROT13 cipher instantly in your browser.',
    url: 'https://thetool.guru/tools/rot13-encoder',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'ROT13 Encoder/Decoder — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROT13 Encoder/Decoder — The Tool Guru',
    description: 'Encode or decode text with the ROT13 cipher instantly in your browser.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default Rot13Page;


