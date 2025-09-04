import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PdfSplitterTool from '../../components/tools/PdfSplitterTool';

export const metadata = {
  title: 'PDF Splitter - Split PDF Files into Multiple Documents',
  description: 'Split PDF files into multiple smaller documents by page ranges, every N pages, or custom page selection.',
  keywords: ['pdf splitter', 'split pdf', 'pdf pages', 'page ranges', 'pdf document', 'split files'],
  alternates: {
    canonical: 'https://thetool.guru/tools/pdf-splitter',
  },
  openGraph: {
    title: 'PDF Splitter - Split PDF Files into Multiple Documents',
    description: 'Split PDF files into multiple smaller documents by page ranges, every N pages, or custom page selection.',
    url: 'https://thetool.guru/tools/pdf-splitter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'PDF Splitter - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Splitter - Split PDF Files into Multiple Documents',
    description: 'Split PDF files into multiple smaller documents by page ranges, every N pages, or custom page selection.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
};

const PdfSplitterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <PdfSplitterTool />
      </Body>
      <Footer />
    </div>
  );
};

export default PdfSplitterPage;
