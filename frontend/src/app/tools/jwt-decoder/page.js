import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import JwtDecoderTool from '../../components/tools/JwtDecoderTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'JWT Decoder — The Tool Guru',
  description: 'Decode JSON Web Tokens to view header and payload. No verification performed.',
  keywords: ['jwt', 'decoder', 'json web token', 'decode jwt', 'header', 'payload'],
  alternates: {
    canonical: 'https://thetool.guru/tools/jwt-decoder',
  },
  openGraph: {
    title: 'JWT Decoder — The Tool Guru',
    description: 'Decode JSON Web Tokens to view header and payload. No verification performed.',
    url: 'https://thetool.guru/tools/jwt-decoder',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'JWT Decoder — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JWT Decoder — The Tool Guru',
    description: 'Decode JSON Web Tokens to view header and payload. No verification performed.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default JwtDecoderPage;


