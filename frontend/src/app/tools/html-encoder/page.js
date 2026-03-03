import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import HtmlEncoderTool from '../../components/tools/HtmlEncoderTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'HTML Encoder/Decoder — The Tool Guru',
  description: 'Encode or decode HTML entities and special characters. Free online HTML encoder/decoder tool.',
  keywords: ['html encoder', 'html decoder', 'entities', 'escape html', 'online tool'],
  alternates: {
    canonical: 'https://thetool.guru/tools/html-encoder',
  },
  openGraph: {
    title: 'HTML Encoder/Decoder — The Tool Guru',
    description: 'Encode or decode HTML entities and special characters. Free online HTML encoder/decoder tool.',
    url: 'https://thetool.guru/tools/html-encoder',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'HTML Encoder/Decoder — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HTML Encoder/Decoder — The Tool Guru',
    description: 'Encode or decode HTML entities and special characters. Free online HTML encoder/decoder tool.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default HtmlEncoderPage;


