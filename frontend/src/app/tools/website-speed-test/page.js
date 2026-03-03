import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import WebsiteSpeedTest from '../../components/tools/WebsiteSpeedTest';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Website Speed Test — The Tool Guru',
  description: 'Test your internet connection speed, ping, and website performance metrics. Get detailed speed analysis with download/upload speeds and server response times.',
  keywords: ['speed test', 'internet speed', 'ping test', 'website performance', 'download speed', 'upload speed', 'network test', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/website-speed-test',
  },
  openGraph: {
    title: 'Website Speed Test — The Tool Guru',
    description: 'Test your internet connection speed, ping, and website performance metrics. Get detailed speed analysis with download/upload speeds and server response times.',
    url: 'https://thetool.guru/tools/website-speed-test',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Website Speed Test — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Speed Test — The Tool Guru',
    description: 'Test your internet connection speed, ping, and website performance metrics. Get detailed speed analysis with download/upload speeds and server response times.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default WebsiteSpeedTestPage;
