import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import CurlTool from '../../components/tools/CurlTool';

export const metadata = {
  title: 'cURL Tool - HTTP Request Builder & API Tester',
  description: 'Make HTTP requests, test APIs, and generate cURL commands with an intuitive interface designed for developers. Support for all HTTP methods, authentication, and advanced options.',
  keywords: ['curl', 'http', 'request', 'api', 'test', 'method', 'rest', 'developer', 'tool'],
  alternates: {
    canonical: 'https://thetool.guru/tools/curl-tool',
  },
  openGraph: {
    title: 'cURL Tool - HTTP Request Builder & API Tester',
    description: 'Make HTTP requests, test APIs, and generate cURL commands with an intuitive interface designed for developers. Support for all HTTP methods, authentication, and advanced options.',
    url: 'https://thetool.guru/tools/curl-tool',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'cURL Tool - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'cURL Tool - HTTP Request Builder & API Tester',
    description: 'Make HTTP requests, test APIs, and generate cURL commands with an intuitive interface designed for developers. Support for all HTTP methods, authentication, and advanced options.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
};

const CurlToolPage = () => {
  return (
    <>
      <Header />
      <Body>
        <CurlTool />
      </Body>
      <Footer />
    </>
  );
};

export default CurlToolPage;
