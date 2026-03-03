import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import BinaryEncoderTool from '../../components/tools/BinaryEncoderTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Binary Encoder/Decoder — The Tool Guru',
  description: 'Convert text to binary and decode binary back to text. Client-side, UTF-8.',
  keywords: ['binary', 'encoder', 'decoder', 'convert', 'utf-8', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/binary-encoder',
  },
  openGraph: {
    title: 'Binary Encoder/Decoder — The Tool Guru',
    description: 'Convert text to binary and decode binary back to text. Client-side, UTF-8.',
    url: 'https://thetool.guru/tools/binary-encoder',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Binary Encoder/Decoder — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Binary Encoder/Decoder — The Tool Guru',
    description: 'Convert text to binary and decode binary back to text. Client-side, UTF-8.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default BinaryEncoderPage;


