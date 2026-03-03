import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import UrlEncoderTool from '../../components/tools/UrlEncoderTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'URL Encoder/Decoder — The Tool Guru',
  description: 'Encode or decode URLs to handle special characters. Free online URL encoder/decoder tool.',
  keywords: ['url encoder', 'url decoder', 'percent encoding', 'online tool', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/url-encoder',
  },
  openGraph: {
    title: 'URL Encoder/Decoder — The Tool Guru',
    description: 'Encode or decode URLs to handle special characters. Free online URL encoder/decoder tool.',
    url: 'https://thetool.guru/tools/url-encoder',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'URL Encoder/Decoder — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'URL Encoder/Decoder — The Tool Guru',
    description: 'Encode or decode URLs to handle special characters. Free online URL encoder/decoder tool.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default UrlEncoderPage;


